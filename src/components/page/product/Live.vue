<template>
	<div>
		<page-wrap v-loading.body.lock="loading">
			<div slot="sideLeft">
				<product-item 
					v-for="item in liveList" 
					:index="item.id" 
					:code="code" 
					:name="item.name"
					listType=""
					@deleteItem="deleteItem(item.id)"
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
						<el-form  label-width="80px" :model="liveItemForm" :rules="liveItemRules" ref="liveItemForm">
							<el-row :gutter="20">

								<!-- 基本信息 -->
								<el-col :span="12">
									<el-form-item label="标题" prop="name">
								    	<el-input v-model="liveItemForm.name"></el-input>
								    </el-form-item>
								    <el-form-item label="副标题" prop="subName">
								    	<el-input v-model="liveItemForm.subName"></el-input>
								    </el-form-item>
								    <el-form-item label="权重" prop="weight">
								    	<el-input type="number" v-model="liveItemForm.weight"></el-input>
								    </el-form-item>
								</el-col>
								<el-col :span="12">
									<div class="logo_pane">
										<add-img-item group="live" @callbackFn="callbackFn" v-if="switchLogo"></add-img-item>
								    	<image-card v-else @deleteItem="deleteLogoFn()" :showTitle="false">
								    		<img :src="(preUrl+'/'+liveItemForm.imageLogo)">
								    	</image-card>
									</div>
								</el-col>
								<el-col :span="24">
									<el-form-item label="描述" prop="description">
								    	<el-input v-model="liveItemForm.description"></el-input>
								    </el-form-item>
								    <el-form-item label="链接">
								    	<el-input v-model="liveItemForm.redirectUrl"></el-input>
								    </el-form-item>
								    <el-form-item label="直播介绍" prop="contentDetail">
								    	<el-input type="textarea" :rows="4" v-model="liveItemForm.contentDetail"></el-input>
								    </el-form-item>
								</el-col>

								<!-- 其他信息 -->
								<el-col :span="6">
									<el-form-item label="是否可用">
								    	<el-switch v-model="liveItemForm.enable" :on-value="1" :off-value="0" ></el-switch>
								    </el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="是否置顶">
								    	<el-switch v-model="liveItemForm.fixedTop" :on-value="1" :off-value="0"></el-switch>
								    </el-form-item>
								</el-col>
								

								<!-- 作者信息 -->
								<el-col :span="12">
									<el-form-item label="创作者" prop="authName">
								    	<el-input v-model="liveItemForm.authName"></el-input>
								    </el-form-item>
								    <el-form-item label="创作邮箱" prop="authEmail">
								    	<el-input v-model="liveItemForm.authEmail"></el-input>
								    </el-form-item>
								    <el-form-item label="创作电话" prop="authPhone">
								    	<el-input v-model="liveItemForm.authPhone"></el-input>
								    </el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="官网" prop="website">
								    	<el-input v-model="liveItemForm.website"></el-input>
								    </el-form-item>
								    <el-form-item label="ios下载">
								    	<el-input v-model="liveItemForm.downloadUrlIos"></el-input>
								    </el-form-item>
								    <el-form-item label="安卓下载">
								    	<el-input v-model="liveItemForm.downloadUrlAndroid"></el-input>
								    </el-form-item>
								</el-col>

								<!-- 大图 -->
								<el-col :span="24">
									<h4>大图</h4>
									<div class="logo_pane">
										<image-card 
											:showTitle="false"
											v-for="(item, index) in liveImgList" 
											class="big_img_item" 
											@deleteItem="deleteBigImgFn(index)">
								    		<img :src="(preUrl+'/'+item)">
								    	</image-card>
								    	<product-img-item group="live"></product-img-item>
									</div>
									
								</el-col>

								<el-col :span="24">
									<el-card>
										<div slot="header">
											主播图
											<el-button type="success" size="mini" @click="showAnchorDialog">新增</el-button>
										</div>
										<div>
											<div class="underline anchors_wrap" v-for="(item, index) in anchorItemList">
												<el-row>
													<el-col :span="8">
												    	<image-card :showTitle="false">
												    		<img :src="(preUrl+'/'+item.image)">
												    	</image-card>
													</el-col>
													<el-col :span="10">
														<p class="anchors_descript">名称：{{item.name}}</p>
														<p class="anchors_descript">副标题：{{item.subName}}</p>
														<p class="anchors_descript">权重：{{item.weight}}</p>
													</el-col>
													<el-col :span="6">
														<el-button @click="modifyFn(index)">修改</el-button>
														<el-button>删除</el-button>
													</el-col>
												</el-row>
											</div>
										</div>
									</el-card>
								</el-col>
							</el-row>
						</el-form>
						<!-- 主播对话框 -->
						<el-dialog :visible.sync="anchorDialog" title="主播图">
							<div>
								<el-row :gutter="20">
									<el-col :span="12">
										<el-form label-width="80px" :model="anchorItemForm" ref="anchorItemForm" :rules="anchorItemRules">
											<el-form-item label="标题" prop="name">
												<el-input v-model="anchorItemForm.name"></el-input>
											</el-form-item>
											<el-form-item label="副标题" prop="subName">
												<el-input v-model="anchorItemForm.subName"></el-input>
											</el-form-item>
											<el-form-item label="权重" prop="weight">
												<el-input type="number" v-model="anchorItemForm.weight"></el-input>
											</el-form-item>
										</el-form>
									</el-col>
									<el-col :span="12">
										<add-img-item v-if="anchorImgAdd" @callbackFn="callbackDialog" group="live"></add-img-item>
										<image-card :showTitle="false" v-else @deleteItem="deleteDialogImgFn">
											<img :src="(preUrl+'/'+anchorItemForm.image)">
										</image-card>
									</el-col>
								</el-row>
							</div>
							<span slot="footer">
								<el-button @click="cancleDialog">取消</el-button>
								<el-button @click="saveDialog">确定</el-button>
							</span>
						</el-dialog>
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
import api_resource from 'api/resource'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'priduct-game',
	components: {
		'product-item': ProductItem,
		'image-card': ImgCard,
		'add-img-item': AddImgItem,
		'product-img-item': ProductImgItem,
	},
	data(){
		return {
			loading: false,
			liveList: [],
			listTotal: 0,
			pageSize: 20,
			currentpage: 1,
			code: '',  				// 验证是否选中
			switchTurn: false,   	// 详情&新增切换
			switchLogo: true,    	// 切换logo
			logoData: {},
			liveImgList: [],   		// 更新获取的图片列表
			anchorDialog: false,
			anchorAdd: false,    	// 主播图新增或修改
			anchorImgAdd: true,  	// 主播图上传或显示
			preUrl: sessionStorage.getItem('imageUrl'),
			// 表单信息
			liveItemForm: {  
				name: '',
				subName: '',
				description: '',
				contentDetail: '',
				fixedTop: '',
				imageLogo: '',
				weight: null,
				redirectUrl: '',
				enable: '',
				downloadUrlIos: '',
				downloadUrlAndroid: '',
				authName: '',
				authEmail: '',
				authPhone: '',
				website: '',
				imageBig: [],
				anchors: null,
			},
			// 验证信息
			liveItemRules: {
				name: [
					{required: true, message: '请输入标题', trigger: 'blur'}
				],
				subName: [
					{required: true, message: '请输入副标题', trigger: 'blur'}
				],
				description: [
					{required: true, message: '请输入描述', trigger: 'blur'}
				],
				authName: [
					{required: true, message: '请输入创作者', trigger: 'blur'}
				],
				authEmail: [
					{required: true, message: '请输入创作邮箱', trigger: 'blur'}
				],
				authPhone: [
					{required: true, message: '请输入创作电话', trigger: 'blur'}
				],
				website: [
					{required: true, message: '请输入网址', trigger: 'blur'}
				],
				downloadUrlAndroid: [
					{required: true, message: '请输入安卓下载链接', trigger: 'blur'}
				],
				downloadUrlIos: [
					{required: true, message: '请输入iOS下载链接', trigger: 'blur'}
				],
				contentDetail: [
					{required: true, message: '请输入直播介绍', trigger: 'blur'}
				],
				redirectUrl: [
					{required: true, message: '请输入链接', trigger: 'blur'}
				],
				// weight: [
				// 	{required: true, message: '请输入权重', trigger: 'blur'}
				// ],
				
			},
			anchorItemForm: {
				name: '',
				subName: '',
				weight: '',
				image: '',
			},
			anchorItemRules: {
				name: [
					{required: true, message: '请输入标题', trigger: 'blur'}
				],
				subName: [
					{required: true, message: '请输入副标题', trigger: 'blur'}
				],
				weight: [
					{required: true, message: '请输入权重', trigger: 'blur'}
				]
			},
			anchorItemList: [],
			anchorItemImgData: {},   // 获取的主播图片信息
			anchorItemIndex: null,
		}
	},
	computed: {
		...mapGetters([
			'get_banner_img',
			'get_product_list',
		]),
	},
	watch: {
		switchTurn: function(n, o){
			if(n){
				api_product.liveDetail({id: this.code}).then(res=> {
				if(res.data.code==0){
					this.switchLogo = false
					this.liveItemForm = res.data.data
					this.liveItemForm.imageBig = res.data.data.imageBigList
					this.liveImgList = Array.from(res.data.data.imageBigList)
					this.anchorItemList = res.data.data.liveAnchors
				}
			})
			}else {
				// 新增
				this.$refs.liveItemForm.resetFields()
				this.set_banner_img({})
				this.set_product_list([])
				this.liveImgList = []
				this.anchorItemList = []
				this.switchLogo = true	
				this.liveItemForm.redirectUrl = ''
				this.liveItemForm.downloadUrlIos = ''
				this.liveItemForm.downloadUrlAndroid = ''
			}
		}
	},
	methods: {
		...mapActions([
			'set_banner_img',
			'set_product_list',
		]),
		// 更换页码
		handleCurrentChange(page){
			api_product.liveList({page:page, pageSize: this.pageSize}).then(res=> {
				if(res.data.code==0){
					this.liveList = res.data.data.list
					this.listTotal = res.data.data.total
				}
			})
		},
		// 选中
		pick(id){
			this.code = id
			this.switchTurn = true
			api_product.liveDetail({id: id}).then(res=> {
				if(res.data.code==0){
					this.switchLogo = false
					this.liveItemForm = res.data.data
					this.liveItemForm.imageBig = res.data.data.imageBigList
					this.liveImgList = Array.from(res.data.data.imageBigList)
					this.anchorItemList = res.data.data.liveAnchors
				}else if(res.data.data==null){
					this.$message('该项没有数据，建议删除后重新设置')
				}
			})
		},
		// 获取列表
		getProductList(){
			api_product.liveList({page:this.currentpage, pageSize: this.pageSize}).then(res=> {
				if(res.data.code==0){
					this.liveList = res.data.data.list
					this.listTotal = res.data.data.total
					this.currentpage = 1
				}
			})
		},
		typeComputed(val){
			for(let a of this.liveTypeList){
				if(a.id==val){
					return a.name
				}
			}
		},
		// 列表删除
		deleteItem(id){
			this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
				api_product.liveDelete({id: id}).then(res=> {
					if(res.data.code==0){
						// this.getProductList()
						this.handleCurrentChange()
					}else{
						this.$message('当前网络不佳，请稍后重试')
					}
				})
			}).catch(()=> {
				return 
			})
		},
		// logo删除
		deleteLogoFn(){
			if(!!this.get_banner_img.path){
				api_resource.delete({id: this.logoData.id}).then(res=> {
					if(res.data.code==0){
						this.switchLogo = true
					}else {
						this.$message('当前网络不佳，请稍后重试')
						this.switchLogo = true
					}
				})
			}else {
				this.switchLogo = true
			}
		},
		// 删除大图列表
		deleteBigImgFn(index){
			this.liveImgList.splice(index, 1)
		},
		// logo上传回调
		callbackFn(){
			this.switchLogo = false
			this.liveItemForm.imageLogo = this.get_banner_img.path
			this.logoData = this.get_banner_img
		},
		// 新增对话框
		showAnchorDialog(){
			this.anchorDialog = true
			this.anchorAdd = true
			this.anchorImgAdd = true
			this.anchorItemForm = {
				name: '',
				weight: '',
				subName: '',
				image: '',			}
		},
		// 对话框取消按钮
		cancleDialog(){
			this.anchorDialog = false
		},
		// 对话框新增图片回调
		callbackDialog(){
			this.anchorItemForm.image = this.get_banner_img.path
			this.anchorItemImgData = this.get_banner_img
			this.anchorImgAdd = false
			this.set_banner_img({})
		},
		// 确定对话框
		saveDialog(){
			if(this.anchorAdd){
				// 新增主播图
				this.$refs.anchorItemForm.validate(valid=> {
					if(valid){
						if(this.anchorItemForm.image==''){
							this.$message.error('主播图是个美女，不能为空哦')
							return
						}else {
							let obj = {
								name: this.anchorItemForm.name,
								subName: this.anchorItemForm.subName,
								weight: this.anchorItemForm.weight,
								image: this.anchorItemForm.image,
							}
							this.anchorItemList.push(obj)
							this.anchorDialog = false
						}
						
					}else {
						this.$message('请输入完整信息')
						return
					}
				})
				
			}else {
				// 修改主播
				if(this.anchorItemForm.image==''){
					this.$message.error('主播图是个美女，不能为空哦')
					return
				}else {
					let obj = {
						name: this.anchorItemForm.name,
						subName: this.anchorItemForm.subName,
						weight: this.anchorItemForm.weight,
						image: this.anchorItemForm.image,
					}
					// this.anchorItemList.push(obj)
					this.anchorItemList[this.anchorItemIndex] = obj
					this.anchorDialog = false
				}
				
			}
		},
		// 修改
		modifyFn(index){
			this.anchorDialog = true
			this.anchorAdd = false
			this.anchorImgAdd = false
			this.anchorItemForm = this.anchorItemList[index]
			this.anchorItemIndex = index
		},
		// 删除主播图片
		deleteDialogImgFn(){
			this.anchorImgAdd = true
		},
		// 提交
		submitFn(){
			let logoImg = ''
			this.$refs.liveItemForm.validate(valid=> {
				if(valid){
					if(this.switchTurn){
						// 更新
						if(this.liveItemForm.imageLogo!=''){
							let bigImgList = []
							let newArr = []   // 合并两个数组(更新获取的大图和自己新增的大图)
							let arr = []
							if(this.get_product_list.length>0){
								for(let a of this.get_product_list){
									bigImgList.push(a.path)
								}
								arr = Array.from(this.liveImgList)
								newArr = [...bigImgList, ...arr]
							}else {
								newArr = Array.from(this.liveImgList)
							}
							let obj = this.liveItemForm
							obj.imageBig = JSON.stringify(newArr)
							obj.anchors = JSON.stringify(this.anchorItemList)
							// 发情请求
							this.loading =  true
							api_product.liveUpdate(obj).then(res=> {
								if(res.data.code==0){
									this.$message.success('更新成功')
									// this.getProductList()
									this.handleCurrentChange(this.currentpage)
									this.$refs.liveItemForm.resetFields()
									this.liveItemForm.redirectUrl = ''
									this.liveItemForm.downloadUrlIos = ''
									this.liveItemForm.downloadUrlAndroid = ''
									this.set_banner_img({})
									this.set_product_list([])
									this.anchorItemList = []
									this.loading = false
								}
							})
						}else{
							this.loading = false
							this.$message.error('请选择图片，不然完成不了哦')
							return 
						}
					}else {
						// 新增
						if(this.anchorItemForm.imageLogo!='' && this.get_product_list.length>0){
							let bigImgList = []
							for(let a of this.get_product_list){
								bigImgList.push(a.path)
							}
							let obj = this.liveItemForm
							obj.imageBig = JSON.stringify(bigImgList)
							obj.anchors = JSON.stringify(this.anchorItemList)
							// 发起请求
							this.loading = true
							api_product.liveInsert(obj).then(res=> {
								if(res.data.code==0){
									this.$message.success('添加成功')
									// this.getProductList()
									this.handleCurrentChange(this.currentpage)
									this.$refs.liveItemForm.resetFields()
									this.set_banner_img({})
									this.liveItemForm.redirectUrl = ''
									this.liveItemForm.downloadUrlIos = ''
									this.liveItemForm.downloadUrlAndroid = ''
									this.set_product_list([])
									this.anchorItemList = []
									this.loading = false
								}
							})
						}else{
							this.loading = false
							this.$message.error('请选择图片，不然完成不了哦')
							return 
						}
					}
				}else{
					this.$message('请输入完整信息')
					return
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

.logo_pane {
	display: flex;
	flex-wrap: wrap;
}
.big_img_item {
	margin: 5px;
}
.save_btn {
	display: flex;
	justify-content: center;
}
.anchors_wrap {
	padding: 10px 0;
}
.anchors_descript {
	margin-bottom: 15px;
}
</style>