<template>
	<div>
		<table>
			<tr class="table_header_wrap">
				<th class="table_header table_img"><span>图片</span></th>
				<th class="table_header table_weight"><span>权重</span></th>
				<th class="table_header table_link"><span>链接</span></th>
				<th class="table_header table_action"><span>状态</span></th>
				<th class="table_header table_action"><span>操作</span></th>
			</tr>
			<tr v-for="(item, index) in bannerList" :key="index">
				<td class="body table_img">
					<img :src="(preUrl+'/'+item.image)">
				</td>
				<td class="body table_weight">{{item.weight}}</td>
				<td class="body table_link">{{item.action}}</td>
				<td class="body table_action">{{!!item.enable?"有效":"无效"}}</td>
				<td class="body table_action">
					<el-button size="mini" @click.native="refreshFn(item)">修改</el-button>
					<el-button size="mini" @click.native="deleteItemFn(item.id)">删除</el-button>
				</td>
			</tr>
		</table>

		<el-dialog
		  	title="修改banner内容"
		  	:visible.sync="dialogVisible"
		>
		  	<div>
		  		<el-row :gutter="20">
		  			<el-col :span="12">
		  				<el-form label-width="100px" :model="saveItemForm" :rules="saveItemRules" ref="saveItemForm">
							<el-form-item label="APP链接" prop="action">
						    	<el-input v-model="saveItemForm.action"></el-input>
						    </el-form-item>
						    <el-form-item label="H5链接" prop="appAction">
						    	<el-input v-model="saveItemForm.appAction"></el-input>
						    </el-form-item>
						    <el-form-item label="权重" prop="weight">
						    	<el-input type='number' v-model="saveItemForm.weight"></el-input>
						    </el-form-item>
						    <el-form-item label="是否有效">
					    		<el-switch v-model="saveItemForm.enable"></el-switch>
							</el-switch>
					    </el-form-item>
						</el-form>
		  			</el-col>

		  			<el-col :span="12">
		  				<image-item v-if="showImg" @deleteItem="deleteItemImg" :showTitle="false">
		  					<img :src="imageUrl">
		  				</image-item>
		  				<upload-img-item @callback="callback" v-else></upload-img-item>
		  			</el-col>
		  		</el-row>
		  	</div>
		  	<span slot="footer" class="dialog-footer">
		    	<el-button @click="dialogVisible=false">取 消</el-button>
		    	<el-button type="primary" @click="saveBtnFn">确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>



<script>
import api_web from 'api/webAdmin'
import ImgCard from 'components/common/ImgCard'
import UploadImgItem from 'components/common/UploadImgItem'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'web-banner-content',
	components: {
		'image-item': ImgCard,
		'upload-img-item': UploadImgItem,
	},
	data(){
		return {
			bannerList: [],
			dialogVisible: false,
			itemObj: {},
			saveItemForm: {
				action: '',
				appAction: '',
				weight: null,
				enable: true
			},
			saveItemRules: {
				action: [
					{required: true, message: '请输入链接内容', trigger: 'blur'}
				],
				appAction: [
					{required: true, message: '请输入链接内容', trigger: 'blur'}
				],
				weight: [
					{required: true, message: '请输入权重', trigger: 'blur'}
				],
			},
			imageUrl: '',
			showImg: true,
		}
	},
	props: {
		section: {
			type: String,
			default: ''
		},
		update: {
			type: Boolean,
			default: false,
		}
	},
	computed: {
		...mapGetters([
			'get_banner_img',
		]),
		preUrl: function(){
			return sessionStorage.getItem('imageUrl')
		}
	},
	watch: {
		section: function(n, o){
			this.getList()
		},
		update: function(n, o){
			if(n){
				this.getList()
			}else {
				return
			}
		}
	},
	methods: {
		getList(){
			api_web.bannerList({section: this.section}).then(res=> {
				this.bannerList = res.data.data
			})
		},
		deleteItemFn(id){
			this.$confirm('删除后将不能恢复，是否确定').then(()=> {
				api_web.bannerDelete({id: id}).then(res=> {
					if(res.data.code==0){
						this.getList()
						this.$message.success('更新成功')
					}else {
						this.$message.error('当前网络不佳，请稍后重试')
					}
				})
			}).catch(()=> {
				return 
			})		
		},
		refreshFn(item){
			this.showImg = true
			this.dialogVisible = true
			this.itemObj = item
			this.saveItemForm = {
				weight: item.weight,
				action: item.action,
				enable: !!item.enable ? true : false
			}
			this.imageUrl = `${this.preUrl}/${item.image}`
		},
		deleteItemImg(){
			this.showImg = false;
		},
		callback(url){
			this.showImg = true;
			this.itemObj.image = url;
			this.imageUrl = `${this.preUrl}/${url}`;
		},
		saveBtnFn(){
			let obj = {
				id: this.itemObj.id,
				weight: this.saveItemForm.weight,
				action: this.saveItemForm.action,
				section: this.section,
				enable: this.saveItemForm.enable ? 1 : 0
			}
			if(!!this.showImg){
				obj.image = this.itemObj.image || this.get_banner_img.path;
			}else{
				this.$message('未上传图片')
				return
			}
			api_web.bannerInsert(obj).then(res=> {
				if(res.data.code==0){
					this.$message.success('更新成功')
					this.getList()
					this.dialogVisible = false
				}else {
					this.$message.info('当前网络不佳，请稍后重试')
					this.dialogVisible = false
				}
			})
		}
	},
	mounted(){
		this.getList()
	}
}
</script>



<style scoped>

table {
	width: 100%;
}
tr {
	width: 100%;
	display: flex;
	background: #eef1f6;
}
.table_header_wrap {
	border-radius: 5px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	height: 40px;
}
td {
	height: 60px;
	background: #fff;
	border-bottom: 1px solid #ddd;
	display: flex;
	align-items: center;
	padding: 5px;
	font-size: 13px;
}
.table_header {
	font-size: 16px;
	font-weight: lighter;
	display: flex;
	align-items: center;
	padding: 5px 5px;
}
.table_img {
	width: 80px;
	overflow: hidden;
}
.table_img img {
	width: 100%;
	height: 100%;
}
.table_weight {
	width: 15%;
}
.table_link {
	width: 40%;
}
.table_action {
	width: 20%;
}
</style>