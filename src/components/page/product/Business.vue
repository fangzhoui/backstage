<template>
	<div>
		<page-wrap v-loading.body.lock="loading">
			<div slot="sideLeft">
				<product-item 
					v-for="item in businessList" 
					:index="item.id" 
					:code="code" 
					:name="item.name"
					:listType="typeComputed(item.categoryId)"
					@deleteItem="deleteItemList(item.id)"
					@click.native="pick(item.id)">
					<img :src="(preUrl+'/'+item.imageLogo)">
				</product-item>
				<!-- 分页 -->
				<el-pagination
				  	small
				  	layout="prev, pager, next"
				  	:page-size="pageSize"
				  	@current-change="handleCurrentChange"
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
							off-color="#13ce66"
							v-model="switchTurn">
						</el-switch>
					</div>
					<div>
						<el-form  label-width="80px" :model="businessItemForm" :rules="businessItemRules" ref="businessItemForm">
							<el-row :gutter="20">

								<!-- 基本信息 -->
								<el-col :span="12">
									<el-form-item label="标题" prop="name">
								    	<el-input v-model="businessItemForm.name"></el-input>
								    </el-form-item>
								    <el-form-item label="副标题" prop="subName">
								    	<el-input v-model="businessItemForm.subName"></el-input>
								    </el-form-item>
								    <el-form-item label="权重" >
								    	<el-input type="number" v-model="businessItemForm.weight"></el-input>
								    </el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="Logo">
								    	<add-img-item group="business" @callbackFn="callbackFn" v-if="switchLogo"></add-img-item>
								    	<image-card :showTitle="false" v-else @deleteItem="deleteLogoFn()">
								    		<img :src="(preUrl+'/'+businessItemForm.imageLogo)">
								    	</image-card>
								    </el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="价格">
								    	<el-input type="number" v-model="businessItemForm.price"></el-input>
								    </el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="头信息">
								    	<el-input v-model="businessItemForm.header" placeholder="请输入头信息，如 [包邮]"></el-input>
								    </el-form-item>
								</el-col>
								<el-col :span="24">
									<el-form-item label="描述" prop="description">
								    	<el-input v-model="businessItemForm.description"></el-input>
								    </el-form-item>
								    <el-form-item label="链接" prop="redirectUrl">
								    	<el-input v-model="businessItemForm.redirectUrl"></el-input>
								    </el-form-item>
								</el-col>

								<!-- 其他信息 -->
								<el-col :span="6">
									<el-form-item label="是否可用">
								    	<el-switch v-model="businessItemForm.enable" :on-value="1" :off-value="0"></el-switch>
								    </el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="是否置顶">
								    	<el-switch v-model="businessItemForm.fixedTop" :on-value="1" :off-value="0"></el-switch>
								    </el-form-item>
								</el-col>
								<el-col :span="10">
									<el-form-item label="分类">
								    	<el-select v-model="businessItemForm.categoryId">
								    		<el-option v-for="item in businessTypeList" :label="item.name" :value="item.id"></el-option>
								    	</el-select>
								    </el-form-item>
								</el-col>
								<!-- 标签 -->
								<el-col :span="12">
									<el-form-item label="标签">
								    	<el-input v-model="tagLabel" placeholder="Tip:请不要超过3个">
								    		<el-button slot="append" @click="tagLabelFn">添加</el-button>
								    	</el-input>
								    </el-form-item>
								</el-col>
								<el-col :span="12">
									<div class="tag_label">
										<tag-label v-for="(item, index) in tagLabelList" :title="item" @deleteItem='deleteItemTag(index)'></tag-label>
									</div>
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
		'product-img-item': ProductImgItem,
		'tag-label': TagLabel,
	},
	data(){
		return {
			loading: false,
			businessList: [],
			listTotal: 0,
			pageSize: 20,
			currentpage: 1,
			code: '',  // 验证是否选中
			switchTurn: false,   // 详情&新增切换
			businessTypeList: [],  // 游戏分类列表
			preUrl: sessionStorage.getItem('imageUrl'),
			tagLabel: '',
			tagLabelList: [],
			switchLogo: true,
			imageLogoData: {},
			// 表单信息
			businessItemForm: {  
				name: '',
				subName: '',
				description: '',
				fixedTop: '',
				imageLogo: '',
				weight: '',
				redirectUrl: '',
				enable: '',
				tag: '',
				categoryId: '',
				header: '',
				price: null,
			},
			// 验证信息
			businessItemRules: {
				name: [
					{required: true, message: '请输入标题', trigger: 'blur'}
				],
				subName: [
					{required: true, message: '请输入副标题', trigger: 'blur'}
				],
				description: [
					{required: true, message: '请输入描述', trigger: 'blur'}
				],
				redirectUrl: [
					{required: true, message: '请输入链接', trigger: 'blur'}
				],
				price: [
					{ required: true, message: '请输入价格', trigger: 'blur'}
				],
				weight: [
					{required: true, message: '请输入权重', trigger: 'blur'}
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
				api_product.businessDetail({id: this.code}).then(res=> {
				if(res.data.code==0){
					this.switchLogo = false
					this.businessItemForm = res.data.data
					this.tagLabelList = JSON.parse(res.data.data.tag)
				}
			})
			}else {
				// 新增
				this.$refs.businessItemForm.resetFields()
				this.businessItemForm.weight = ''
				this.businessItemForm.price = ''
				this.set_banner_img({})
				this.switchLogo = true
				this.businessItemForm.header = ''
				this.tagLabelList = []
			}
		}
	},
	methods: {
		...mapActions([
			'set_banner_img',
		]),
		// 分页
		handleCurrentChange(page){
			api_product.businessList({page:page, pageSize: this.pageSize}).then(res=> {
				if(res.data.code==0){
					this.businessList = res.data.data.list
					this.listTotal = res.data.data.total
				}
			})
		},
		// logo
		callbackFn(){
			this.businessItemForm.imageLogo = this.get_banner_img.path
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
			api_product.businessDetail({id: id}).then(res=> {
				this.businessItemForm = res.data.data
				this.switchLogo = false
				let arr = JSON.parse(res.data.data.tag)
				this.tagLabelList = arr
			})
		},
		// 获取分类列表
		getType(){
			api_type.businessList().then(res=> {
				this.businessTypeList = res.data.data
			})
		},
		getProductList(){
			api_product.businessList().then(res=> {
				if(res.data.code==0){
					this.businessList = res.data.data.list
					this.listTotal = res.data.data.total
					this.currentpage = 1
				}
			})
		},
		typeComputed(val){
			for(let a of this.businessTypeList){
				if(a.id==val){
					return a.name
				}
			}
		},
		deleteItemList(id){
			this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
				api_product.businessDelete({id: id}).then(res=> {
					if(res.data.code==0){
						this.$message('您已经删除了一条电商产品')
						this.handleCurrentChange()
						// this.getProductList()
					}else{
						this.$message('当前网络不佳，请稍后重试')
					}
				})
			}).catch(()=> {
				return 
			})
		},
		tagLabelFn(){
			if(this.tagLabelList==null){
				this.tagLabelList = []
				if(this.tagLabelList.length<3){
					this.tagLabelList.push(this.tagLabel)
					this.tagLabel = ''
				}else {
					this.$message.error('是不是已经提示你不要超过3个了')
					this.tagLabel = ''
					return
				}
			}else {
				if(this.tagLabelList.length<3){
					this.tagLabelList.push(this.tagLabel)
					this.tagLabel = ''
				}else {
					this.$message.error('是不是已经提示你不要超过3个了')
					this.tagLabel = ''
					return
				}
			}
		},
		deleteItemTag(index){
			this.tagLabelList.splice(index, 1)
		},
		// 提交
		submitFn(){
			let logoImg = ''
			this.$refs.businessItemForm.validate(valid=> {
				if(valid){
					if(this.switchTurn){
						// 更新
						if(this.businessItemForm.imageLogo!=''){
							let obj = this.businessItemForm
							obj.tag = JSON.stringify(this.tagLabelList)
							this.loading = true
							api_product.businessUpdate(obj).then(res=> {
								if(res.data.code==0){
									this.$message.success('更新了一条电商产品')
									this.tagLabelList = []
									this.getProductList()
									this.handleCurrentChange(this.currentpage)
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
						if(this.businessItemForm.imageLogo!=''){
							let obj = this.businessItemForm
							obj.tag = JSON.stringify(this.tagLabelList)
							this.loading = true
							api_product.businessInsert(obj).then(res=> {
								if(res.data.code==0){
									this.$message.success('新增了一条电商产品')
									this.handleCurrentChange(this.currentpage)
									this.tagLabelList = []
									// this.getProductList()
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
		this.getType()  // 获取游戏分类列表
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