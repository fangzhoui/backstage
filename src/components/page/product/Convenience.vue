<template>
	<div>
		<page-wrap  v-loading.body.lock="loading">
			<div slot="sideLeft">
				<product-item 
					v-for="(item, index) in convenienceList" 
					:index="item.id" 
					:code="code" 
					:name="item.name"
					listType=""
					@deleteItem="deleteItemList(item.id)"
					@click.native="pick(item.id)">
					<img :src="(preUrl+'/'+item.imageLogo)">
				</product-item>
			</div>

			<div slot="sideRight">
				<el-card>
					<div slot="header">
						<el-switch 
							active-text="详情"
							inactive-text="新增"
							off-color="#13ce66"
							v-model="switchTurn">
						</el-switch>
					</div>
					<div>
						<el-form  label-width="80px" :model="convenienceItemForm" :rules="convenienceItemRules" ref="convenienceItemForm">
							<el-row :gutter="20">

								<!-- 基本信息 -->
								<el-col :span="12">
									<el-form-item label="标题" prop="name">
								    	<el-input v-model="convenienceItemForm.name"></el-input>
								    </el-form-item>
								    <el-form-item label="副标题" prop="subName">
								    	<el-input v-model="convenienceItemForm.subName"></el-input>
								    </el-form-item>
								    <el-form-item label="权重">
								    	<el-input type="number" v-model="convenienceItemForm.weight"></el-input>
								    </el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="Logo">
								    	<add-img-item group="convenience" @callbackFn="callbackFn" v-if="switchLogo"></add-img-item>
								    	<image-card :showTitle="false" v-else @deleteItem="deleteLogoFn()">
								    		<img :src="(preUrl+'/'+convenienceItemForm.imageLogo)">
								    	</image-card>
								    </el-form-item>
								</el-col>
								
								<el-col :span="24">
								    <el-form-item label="链接" prop="redirectUrl">
								    	<el-input v-model="convenienceItemForm.redirectUrl"></el-input>
								    </el-form-item>
								</el-col>

								<!-- 其他信息 -->
								<el-col :span="6">
									<el-form-item label="是否可用">
								    	<el-switch v-model="convenienceItemForm.enable"></el-switch>
								    </el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="是否置顶">
								    	<el-switch v-model="convenienceItemForm.fixedTop"></el-switch>
								    </el-form-item>
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
import api_type from 'api/productType'
import api_product from 'api/product'
import { mapGetters, mapActions } from 'vuex'
import TagLabel from 'components/common/TagLabel'

export default {
	name: 'priduct-game',
	components: {
		'product-item': ProductItem,
		'image-card': ImgCard,
		'add-img-item': AddImgItem,
		'tag-label': TagLabel,
	},
	data(){
		return {
			loading: false,
			convenienceList: [],
			code: '',  // 验证是否选中
			switchTurn: false,   // 详情&新增切换
			preUrl: sessionStorage.getItem('imageUrl'),
			switchLogo: true,
			imageLogoData: {},
			// 表单信息
			convenienceItemForm: {  
				name: '',
				subName: '',
				fixedTop: false,
				imageLogo: '',
				weight: '',
				redirectUrl: '',
				enable: false,
			},
			// 验证信息
			convenienceItemRules: {
				name: [
					{required: true, message: '请输入标题', trigger: 'blur'}
				],
				subName: [
					{required: true, message: '请输入副标题', trigger: 'blur'}
				],
				redirectUrl: [
					{required: true, message: '请输入链接', trigger: 'blur'}
				],
				weight: [
					{type: 'number', required: true, message: '请输入权重', trigger: 'blur'}
				],
			}
		}
	},
	computed: {
		...mapGetters([
			'get_banner_img',
		]),
	},
	watch: {
		switchTurn: function(n, o){
			if(n){
				// this.getProductList()
				api_product.convenienceList().then(res=> {
					if(res.data.code==0){
						this.convenienceList = res.data.data
						this.pick(this.code)
					}
				})
				this.switchLogo = false
			}else {
				// 新增
				this.$refs.convenienceItemForm.resetFields()
				this.convenienceItemForm.weight = ''
				this.set_banner_img({})
				this.switchLogo = true
			}
		}
	},
	methods: {
		...mapActions([
			'set_banner_img',
		]),
		// logo
		callbackFn(){
			this.convenienceItemForm.imageLogo = this.get_banner_img.path
			this.imageLogoData = this.get_banner_img
			this.switchLogo = false
		},
		deleteLogoFn(){
			this.switchLogo = true
		},
		// 选中
		pick(id){
			this.code = id
			this.switchTurn = true
			this.switchLogo = false
			let data = this.convenienceList
			for(let a of data){
				if(a.id==id){
					this.convenienceItemForm = a
				}
			}
		},
		getProductList(){
			api_product.convenienceList().then(res=> {
				if(res.data.code==0){
					this.convenienceList = res.data.data
					if(!!res.data.data.fixedTop){
						this.convenienceList.fixedTop = true
					}else{
						this.convenienceList.fixedTop = false
					}
					if(!!res.data.data.enable){
						this.convenienceList.enable = true
					}else{
						this.convenienceList.enable = false
					}
				}
			})
		},
		deleteItemList(id){
			this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
				api_product.convenienceDelete({id: id}).then(res=> {
					if(res.data.code==0){
						this.$message('您已经删除了一条便民产品')
						this.getProductList()
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
			let logoImg = ''
			this.$refs.convenienceItemForm.validate(valid=> {
				if(valid){
					if(this.switchTurn){
						// 更新
						if(this.convenienceItemForm.imageLogo!=''){
							let obj = this.convenienceItemForm;
							if(!!obj.fixedTop){
								obj.fixedTop = 1
							}else{
								obj.fixedTop = 0
							}
							if(!!obj.enable){
								obj.enable = 1
							}else{
								obj.enable = 0
							}
							// 发起请求
							this.loading = true
							api_product.convenienceUpdate(obj).then(res=> {
								if(res.data.code==0){
									this.$message.success('更新了一条便民产品')
									this.getProductList()
									this.loading = false
								}else {
									this.loading = false
									this.$message('当前网络不佳，请稍后重试')
									return
								}
							})
						}else{
							this.$message.error('请选择图片，不然完成不了哦')
							return 
						}
					}else {
						// 新增
						if(this.convenienceItemForm.imageLogo!=''){
							let obj = this.convenienceItemForm
							if(!!obj.fixedTop){
								obj.fixedTop = 1
							}else{
								obj.fixedTop = 0
							}
							if(!!obj.enable){
								obj.enable = 1
							}else{
								obj.enable = 0
							}
							// 发起请求
							this.loading = true
							api_product.convenienceInsert(obj).then(res=> {
								if(res.data.code==0){
									this.$message.success('新增了一条便民产品')
									this.getProductList()
									this.loading = false
								}else {
									this.loading = false
									this.$message('当前网络不佳，请稍后重试')
									return
								}
							})
						}else{
							this.$message.error('请选择图片，不然完成不了哦')
							return 
						}
					}
				}else{
					this.$message('no')
				}
			})
		}
	},
	mounted(){
		this.getProductList()
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