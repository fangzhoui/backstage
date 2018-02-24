<template>
	<div>
		<page-wrap v-loading.body.lock="loading">
			<div slot="sideLeft">
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入漫画名称" v-model="searchNovel">
						<el-button slot="append" icon="el-icon-search"  @click.stop="searchNovelDetail"></el-button>
					</el-input>
				</div>
				<product-item 
					v-for="item in novelList" 
					:index="item.id" 
					:code="code" 
					:name="item.name"
					listType=""
					@deleteItem="deleteItemList(item.id)"
					@click.native="pick(item.id)">
					<img :src="(preUrl+'/'+item.image)">
				</product-item>
				<!-- 分页 -->
				<el-pagination
				  	small
				  	layout="prev, pager, next"
				  	:page-size="pageSize"
				  	@current-change="novelCurrentChange"
				  	:current-page="currentpage"
				  	:total="listTotal">
				</el-pagination>
			</div>

			<div slot="sideRight">
				<el-card>
					<div slot="header">
						<el-switch
							active-text="详情"
							inactive-text="新增"
							v-model="switchTurn"
							:disabled = "isCode">
						</el-switch>
					</div>
					<div>
						<el-form  label-width="80px" :model="novelFrom" :rules="novelFromRules" ref="novelFrom">
							<el-row :gutter="20">
								<!-- 基本信息 -->
								<el-col :span="12">
									<el-form-item label="标题" prop="name">
								    	<el-input v-model="novelFrom.name"></el-input>
								    </el-form-item>
								    <el-form-item label="作者" prop="author">
								    	<el-input v-model="novelFrom.author"></el-input>
								    </el-form-item>
								    <el-form-item label="权重" prop="weight">
								    	<el-input type="number" v-model="novelFrom.weight"></el-input>
								    </el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="Logo" prop="image">
								    	<add-img-item group="business" @callbackFn="callbackFn" v-if="switchLogo"></add-img-item>
								    	<image-card :showTitle="false" v-else @deleteItem="deleteLogoFn()">
								    		<img :src="(preUrl + '/' + novelFrom.image)">
								    	</image-card>
								    </el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="描述">
								    	<el-input maxLength="300" v-model="novelFrom.subName"></el-input>
								    </el-form-item>
								    <el-form-item label="链接" prop="linkUrl">
								    	<el-input v-model="novelFrom.linkUrl"></el-input>
								    </el-form-item>
								    <el-form-item label="介绍">
								    	<el-input type="textarea" maxLength="300" v-model="novelFrom.description"></el-input>
								    </el-form-item>
								</el-col>
								<!-- 其他信息 -->
								<el-col :span="24">
									<el-col :span="6">
										<el-form-item label="是否可用">
									    	<el-switch v-model="novelFrom.enable"></el-switch>
									    </el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="是否置顶">
									    	<el-switch v-model="novelFrom.isTop"></el-switch>
									    </el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="APP显示">
									    	<el-switch v-model="novelFrom.appShow"></el-switch>
									    </el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="H5显示">
									    	<el-switch v-model="novelFrom.h5Show"></el-switch>
									    </el-form-item>
									</el-col>
								</el-col>
							</el-row>
						</el-form>
						<div class="save_btn">
							<el-button type="primary" @click.native="submitFn">保存提交</el-button>
						</div>
					</div>
				</el-card>
			</div>
		</page-wrap>
	</div>
</template>

<script>
import ProductItem from 'components/common/ProductItem'
import ImgCard from 'components/common/ImgCard'
import AddImgItem from 'components/common/AddImgItem'
import ProductImgItem from 'components/common/ProductImgItem'
import api_product from 'api/product'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'hot-novel',
	components: {
		'product-item': ProductItem,
		'image-card': ImgCard,
		'add-img-item': AddImgItem,
		'product-img-item': ProductImgItem,
	},
	data(){
		var image = (rule, value, callback) => {
            if (!value) {
               	callback(new Error('背景图片不能为空'));
            }else{
                callback()
            }
        };
		return {
			loading: false,
			listTotal: 0,
			pageSize: 20,
			currentpage: 1,
			code: '',  // 验证是否选中
			switchTurn: false,   // 详情&新增切换
			novelList: [],  // 游戏分类列表
			preUrl: sessionStorage.getItem('imageUrl'),
			switchLogo: true,
			imageLogoData: {},
			searchNovel: '',
			// 表单信息
			novelFrom: {  
				name: '',
				author: '',
				weight: '',
				subName: '',
				image: '',
				linkUrl: '',
				description: '',
				enable: true,
				isTop: false,
				appShow: true,
				h5Show: true
			},
			// 验证信息
			novelFromRules: {
				name: [
					{required: true, message: '请输入标题', trigger: 'blur'}
				],
				author: [
					{required: true, message: '请输入作者', trigger: 'blur'}
				],
				weight: [
					{required: true, message: '请输入权重', trigger: 'blur'}
				],
				image: [
					{ required: true, validator: image, trigger: 'blur' }
				],
				linkUrl: [
					{ required: true, message: '请输入链接', trigger: 'blur' }
				]
			}
		}
	},
	computed: {
		...mapGetters([
			'get_banner_img',
		]),
		isCode(){
			if(!!this.code && this.code != ''){
				return false
			}else{
				return true
			}
		}
	},
	watch: {
		switchTurn: function(n, o){
			if(n){
				let id = this.code;
				this.pick(id)
			}else {
				// 新增
				this.novelFrom = {  
					name: '',
					author: '',
					weight: '',
					subName: '',
					image: '',
					linkUrl: '',
					description: '',
					enable: true,
					isTop: false,
				}
				this.set_banner_img({})
				this.switchLogo = true
			}
		}
	},
	methods: {
		...mapActions([
			'set_banner_img',
		]),
		// 分页
		novelCurrentChange(page){
			let obj = {page: page, pageSize: this.pageSize};
			this.getType(obj);
		},
		// logo
		callbackFn(){
			this.imageLogoData = this.get_banner_img
			this.novelFrom.image = this.get_banner_img.path
			this.switchLogo = false
		},
		deleteLogoFn(){
			this.$confirm('是否删除').then(()=> {
				this.switchLogo = true;
				this.$set(this.novelFrom, 'image', '')
				this.imageLogoData = {};
				this.set_banner_img({});
			})
		},
		// 选中
		pick(id){
			this.code = id
			this.switchTurn = true
			api_product.cartoonDetail({id: id}).then(res=> {
				let data = res.data.data;
				this.novelFrom = {  
					name: data.name,
					author: data.author,
					weight: data.weight,
					subName: data.subName,
					image: data.image,
					linkUrl: data.linkUrl,
					description: data.description,
					enable: !!data.enable ? true : false,
					isTop: !!data.isTop ? true : false,
					appShow: !!data.isShowApp ? true : false,
					h5Show: !!data.isShowH5 ? true : false
				}
				this.switchLogo = false
			})
		},
		// 获取列表
		getType(obj){
			api_product.cartoonList(obj).then(res=> {
				this.novelList = res.data.data.cartoonList;
				
				this.listTotal = res.data.data.cartoonCount;
			})
		},
		deleteItemList(id){
			this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
				api_product.cartoonDelete({id: id}).then(res=> {
					if(res.data.code==0){
						this.$message('您已经删除了一条小说');
						this.resetFn();
						let c = {page: this.currentpage, pageSize: this.pageSize};
						this.getType(c);
					}else{
						this.$message('当前网络不佳，请稍后重试')
					}
				})
			}).catch(()=> {
				return 
			})
		},
		// 提交
		submitFn(){
			let _self = this;
			this.$refs.novelFrom.validate(valid=> {
				if(valid){
					let obj = {};
					obj = {
						name: _self.novelFrom.name,
						author: _self.novelFrom.author,
						linkUrl: _self.novelFrom.linkUrl,
						subName: _self.novelFrom.subName,
						weight: Number(_self.novelFrom.weight),
						image: _self.novelFrom.image,
						enable: _self.novelFrom.enable ? 1 : 0,
						isTop: _self.novelFrom.isTop ? 1 : 0,
						isShowApp: _self.novelFrom.appShow ? 1 : 0,
						isShowH5: _self.novelFrom.h5Show ? 1 : 0,
					}
					if(!!_self.novelFrom.description){
						obj.description = _self.novelFrom.description
					}
					if(!!_self.switchTurn){
						obj.id = _self.code;
						api_product.cartoonUpdate(obj).then(res=> {
							if(res.data.code == '0'){
								_self.switchTurn = false;
								_self.$message({
						          message: '更新成功',
						          type: 'success'
						        });
								let c = {page: _self.currentpage, pageSize: _self.pageSize};
								_self.getType(c)
							}
						})
					}else{
						api_product.cartoonInsert(obj).then(res=> {
							if(res.data.code == '0'){
								_self.$message({
						          message: '新增成功',
						          type: 'success'
						        });
						        _self.resetFn();
								let c = {page: _self.currentpage, pageSize: _self.pageSize};
								_self.getType(c);
							}
						})
					}
				}else{
					_self.$message('请正确填写')
				}
			})
		},
		resetFn(){
			this.novelFrom = {  
				name: '',
				author: '',
				weight: '',
				subName: '',
				image: '',
				linkUrl: '',
				description: '',
				enable: true,
				isTop: false,
				appShow: true,
				h5Show: true
			}
			this.code = '';
			this.set_banner_img({});
			this.switchLogo = true;
			this.switchTurn = false;
		},
		searchNovelDetail(){
			let obj = {
				page: 1,
				pageSize: this.pageSize,
				name: this.searchNovel
			}
			this.getType(obj)
		}
	},
	mounted(){
		this.getType({page: 1, pageSize: 10})  // 获取游戏分类列表
	}
}
</script>



<style scoped>

.save_btn {
	display: flex;
	justify-content: center;
}
.tag_label {
	display: flex;
}
</style>