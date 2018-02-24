<template>
	<div>
		<page-wrap v-loading.body.lock="loading">
			<div slot="sideLeft" v-loading.body.sync="leftLoading">
				<div>
					<el-breadcrumb separator="/">
		                <el-breadcrumb-item><i class="el-icon-setting"></i> 主题管理</el-breadcrumb-item>
		                <el-breadcrumb-item>主题</el-breadcrumb-item>
		            </el-breadcrumb>
				</div>
				<product-item
					v-for="item in allTopicList"
					:index="item.id"
					:code="code"
					:name="item.name"
					:showListType='false'
					@deleteItem="deleteTop(item.id)"
					@click.native="pick(item.id)">
					<img :src="(preUrl+'/'+item.imageLogo)" v-if="!!item.imageLogo">
				</product-item>
			</div>

			<div slot="sideRight">
				<el-card>
					<div slot="header">
						<el-switch
							active-text="详情"
							inactive-text="新增"
							off-color="#13ce66"
							v-model="switchTurn"
							:disabled = "isCode"
							>
						</el-switch>
					</div>
					<div>
						<el-form  label-width="80px" :model="gameItemForm" :rules="gameItemRules" ref="gameItemForm">
							<el-row :gutter="20">
								<!-- 基本信息 -->
								<el-col :span="24">
									<el-col :span="13">
										<el-form-item label="名称" prop="name">
									    	<el-input v-model="gameItemForm.name"></el-input>
									    </el-form-item>
									    <el-form-item label="副标题">
									    	<el-input v-model="gameItemForm.subName"></el-input>
									    </el-form-item>
									    <el-form-item label="权重" prop="weight" required>
									    	<el-input type="number" v-model="gameItemForm.weight"></el-input>
									    </el-form-item>
									</el-col>
								</el-col>
								<!-- <el-col :span="24">
									<el-form-item label="颜色">
								    	 <el-color-picker v-model="gameItemForm.color"></el-color-picker>
								    </el-form-item>
								</el-col> -->
								<!-- 大图 -->
								<el-col :span="24">
									<el-col :span="12">
										<el-form-item label="图标">
											<add-img-item group="game" @callbackFn="callbackFn()" v-if="switchLogo"></add-img-item>
									    	<image-card :showTitle="false" v-else @deleteItem="deleteLogoFn()">
									    		<img :src="(preUrl+'/'+gameItemForm.imageLogo)">
									    	</image-card>
										</el-form-item>
									</el-col>
									<!-- <el-col :span="12">
										<el-form-item label="背景" prop="backImage">
											<div class="logo_pane">
												<add-img-item group="game" @callbackFn="callbackFn('image')" v-if="switchBackImage"></add-img-item>
										    	<image-card :showTitle="false" v-else @deleteItem="deleteBackFn()">
										    		<img :src="(preUrl+'/'+gameItemForm.backImage)">
										    	</image-card>
											</div>
										</el-form-item>
									</el-col> -->
								</el-col>
							</el-row>
						</el-form>
						<div class="save_btn">
							<el-button type="primary" @click.native="submitFn('gameItemForm')">保存提交</el-button>
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
import { mapGetters, mapActions } from 'vuex'
import apiTopic from 'api/topic'
import api_resource from 'api/resource'

export default {
	name: 'topic',
	components: {
		'product-item': ProductItem,
		'image-card': ImgCard,
		'add-img-item': AddImgItem,
		'product-img-item': ProductImgItem,
	},
	data(){
		var imageLogoFn = (rule, value, callback) => {
            if (!value) {
               callback(new Error('背景图片不能为空'));
            }else{
                callback()
            }
        };
		return {
			leftLoading: false,
			loading: false,
			allTopicList: [],
			code: '',  				// 验证是否选中
			switchTurn: false,   	// 详情&新增切换
			switchLogo: true,    	// 切换logo
			switchBackImage: true,
			preUrl: sessionStorage.getItem('imageUrl'),
			// 表单信息
			gameItemForm: {
				name: '',
				subName: '',
				imageLogo: '',
				// backImage: '',
				// color: '',
				// sections: [],
				// type: '0',
				weight: 50,
				// enable: true,
			},
			// 验证信息
			gameItemRules: {
				name: [
					{required: true, message: '请输入标题', trigger: 'blur'}
				],
				// subName: [
				// 	{required: true, message: '请输入副标题', trigger: 'blur'}
				// ],
				imageLogo: [
					{ required: true, validator: imageLogoFn, trigger: 'blur' }
				],
				// backImage: [
				// 	{ required: true, validator: imageLogoFn, trigger: 'blur' }
				// ]
			}
		}
	},
	computed: {
		...mapGetters([
			'get_banner_img',
			'get_product_list',
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
			if(!n){
				this.resetAll('gameItemForm')
				this.set_banner_img({});
            	this.set_product_list([]);
			}
		}
	},
	methods: {
		...mapActions([
			'set_banner_img',
			'set_product_list',
		]),
		resetAll(formName){
            this.$refs[formName].resetFields();
            this.gameItemForm = {
				name: '',
				subName: '',
				imageLogo: '',
				weight: 50,
			};
            this.code = '';
			this.switchLogo = true;
			this.switchBackImage = true;
            this.set_banner_img({});
            this.set_product_list([]);
        },
		pick(id){
			this.code = id;
			this.switchTurn = true;
			let obj = {
				id: id
			}
			this.getTopicDetail(obj)
		},
		getAllTopicList(){
			apiTopic.allTopicList().then((res) => {
				if(res.data.code == '0'){
					this.allTopicList = res.data.data;
				}
			})
		},
		getTopicDetail(obj){
			apiTopic.topicDetail(obj).then((res) => {
				if(res.data.code == '0'){
					let data = res.data.data.topic;
					this.gameItemForm = {
						name: data.name,
						subName: data.subName,
						// color: data.color,
						// type: data.type.toString(),
						weight: data.weight,
						// enable: !!data.enable ? true : false
					}
					if(!!data.imageLogo){
						this.switchLogo = false;
						this.gameItemForm.imageLogo = data.imageLogo;
					}
					// if(!!data.backImage){
					// 	this.switchBackImage = false;
					// 	this.gameItemForm.backImage = data.backImage;
					// }
				}
			})
		},
		deleteLogoFn(){
			this.switchLogo = true;
			this.gameItemForm.imageLogo = '';
		},
		// deleteBackFn(){
		// 	this.switchBackImage = true;
		// 	this.gameItemForm.backImage = '';
		// },
		callbackFn(){
			// if(type == 'logo'){
				this.switchLogo = false
				this.gameItemForm.imageLogo = this.get_banner_img.path
			// }else{
			// 	this.switchBackImage = false
			// 	this.gameItemForm.backImage = this.get_banner_img.path
			// }
			
		},
		submitFn(name){
			this.$refs[name].validate(valid=> {
                if(valid){
                    let obj = {
                        name: this.gameItemForm.name,
                        // subName: this.gameItemForm.subName,
                        // imageLogo: this.gameItemForm.imageLogo,
                        // backImage: this.gameItemForm.backImage,
                        // color: this.gameItemForm.color,
                        // sections: JSON.stringify(this.gameItemForm.sections),
                        // type: this.gameItemForm.type,
                        weight: this.gameItemForm.weight,
                        // enable: !!this.gameItemForm.enable ? 1 : 0,
                    }
                    if(!!this.gameItemForm.imageLogo){
                    	obj.imageLogo = this.gameItemForm.imageLogo
                    }
                    if(!!this.gameItemForm.subName){
                    	obj.subName = this.gameItemForm.subName
                    }
                    if(!!this.code && !!this.code != ''){
                        obj.id = this.code;
                        apiTopic.topicUpdate(obj).then(res => {
                            if(res.data.code == '0'){
                                this.$message.success('更新成功')
                                this.switchTurn = false;
                                this.resetAll('gameItemForm');
                                this.getAllTopicList();
                            }else{
                                this.$message.error('当前网络不佳，请稍后重试')
                            }
                        })
                    } else { 
                        apiTopic.topicInsert(obj).then(res => {
                            if(res.data.code == '0'){
                                this.$message.success('新增成功');
                                this.resetAll('gameItemForm');
                                this.getAllTopicList();
                            }else{
                                this.$message.error('当前网络不佳，请稍后重试')
                            }
                        })
                    }
                }else{
                    this.$message('信息不完整')
                }
            })
		},
		deleteTop(id){
			this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
				apiTopic.topicDelete(obj).then(res => {
	                if(res.data.code == '0'){
	                    this.$message.success('删除成功');
	                    this.resetAll('gameItemForm');
	                    this.getAllTopicList();
	                }else{
	                    this.$message.error('当前网络不佳，请稍后重试')
	                }
	            })
			}).catch(()=> {
				return
			})
			let obj = {
				id: id
			}
		}
	},
	created(){
		this.getAllTopicList();
	}
}
</script>



<style scoped>

</style>
