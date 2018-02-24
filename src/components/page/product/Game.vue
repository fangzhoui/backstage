<template>
	<div>
		<page-wrap v-loading.body.lock="loading">
			<div slot="sideLeft" v-loading.body.sync="leftLoading">
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入游戏名称" v-model="searchGame">
					<el-button slot="append" icon="el-icon-search"  @click.stop="searchGameDetail"></el-button>
				</el-input>
				</div>
				<product-item
					v-for="item in gameList"
					:index="item.id"
					:code="code"
					:name="item.name"
					:listType="typeComputed(item.name, item.id)"
					@deleteItem="deleteItem(item.id)"
					@click.native="pick(item.id)">
					<img :src="(preUrl+'/'+item.imageLogo)">
				</product-item>
				<el-pagination
				  	small
				  	layout="prev, pager, next"
				  	:page-size="pageSize"
				  	@current-change="gameCurrentChange"
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
							v-model="switchTurn"
							:disabled = "isCode"
							>
						</el-switch>
					</div>
					<div>
						<el-form  label-width="100px" :model="gameItemForm" :rules="gameItemRules" ref="gameItemForm">
							<el-row :gutter="20">
								<!-- 基本信息 -->
								<el-col :span="24">
									<el-col :span="13">
										<el-form-item label="名称" prop="name">
									    	<el-input v-model="gameItemForm.name"></el-input>
									    </el-form-item>
									    <el-form-item label="副标题" prop="subName">
									    	<el-input v-model="gameItemForm.subName"></el-input>
									    </el-form-item>
									    <el-form-item label="权重" prop="weight">
									    	<el-input type="number" v-model="gameItemForm.weight"></el-input>
									    </el-form-item>
									</el-col>
									<el-col :span="11">
										<el-form-item label="图标" prop="imageLogo">
											<add-img-item group="game" @callbackFn="callbackFn" v-if="switchLogo"></add-img-item>
									    	<image-card :showTitle="false" v-else @deleteItem="deleteLogoFn()">
									    		<img :src="(preUrl+'/'+gameItemForm.imageLogo)">
									    	</image-card>
										</el-form-item>
									</el-col>
								</el-col>
								<el-col :span="24">
									<el-form-item label="分类" prop="categoryId">
								    	<el-select v-model="gameItemForm.categoryId">
								    		<el-option v-for="item in gameTypeList" :label="item.name" :value="item.id"></el-option>
								    	</el-select>
								    </el-form-item>
								</el-col>
								<el-col :span="24">
									<el-col :span="13">
									    <el-form-item label="标签">
									    	<div class="label_wrap">
									    		<span class="label_item" v-for="(tag, index) in tagsOptions">{{tag}}<span class="el-icon-error" @click.stop="removeLabel(index)"></span></span>
									    	</div>
									    </el-form-item>
								    </el-col>
								    <el-col :span="4">
								    	<el-button type="primary" icon="el-icon-edit" @click.stop="addLabel"></el-button>
								    </el-col>
							    </el-col>
								<!-- 其他信息 -->
								<el-col :span="24">
									<el-col :span="6">
										<el-form-item label="是否可用">
									    	<el-switch v-model="gameItemForm.enable"></el-switch>
									    </el-form-item>
									</el-col>
									<el-col :span="6">
										<el-form-item label="是否置顶">
									    	<el-switch v-model="gameItemForm.fixedTop"></el-switch>
									    </el-form-item>
									</el-col>
								</el-col>
								<el-col :span="24">
									<el-col :span="12">
									    <el-form-item label="ios下载(H5)">
									    	<el-input v-model="gameItemForm.downloadUrlIos">
									    	</el-input>
									    </el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="ios遮罩" prop="iosCover">
									    	<el-switch v-model="gameItemForm.iosCover"></el-switch>
									   </el-form-item>
									</el-col>
								</el-col>
								<el-col :span="24">
									<el-col :span="12">
									    <el-form-item label="安卓下载(H5)">
									    	<el-input v-model="gameItemForm.downloadUrlAndroid">
									    	</el-input>
									    </el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="安卓遮罩" prop="androidCover">
									    	<el-switch v-model="gameItemForm.androidCover"></el-switch>
									   </el-form-item>
									</el-col>
								</el-col>
								<el-col :span="24">
									<el-form-item label="现在就玩" prop="redirectUrl">
										<el-input v-model="gameItemForm.redirectUrl">
										</el-input>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<el-col :span="12">
									    <el-form-item label="ios包">
									    	<el-input v-model="gameItemForm.packageUrlIos">
									    	</el-input>
									    </el-form-item>
									</el-col>
									<el-col :span="6">
									    	<el-input placeholder="请输入安装包大小" v-model="gameItemForm.packageSizeIos" prop="packageSizeIos">
											</el-input>
									</el-col>
								</el-col>
								<el-col :span="24">
									<el-col :span="12">
									    <el-form-item label="安卓包">
									    	<el-input v-model="gameItemForm.packageUrlAndroid">
									    	</el-input>
									    </el-form-item>
									</el-col>
									<el-col :span="6">
									    <el-input placeholder="请输入安装包大小" v-model="gameItemForm.packageSizeAndroid"  prop="packageSizeAndroid">
										</el-input>
									</el-col>
								</el-col>
							
								<el-col :span="24">
									<el-form-item label="描述" prop="description">
								    	<el-input v-model="gameItemForm.description"></el-input>
								    </el-form-item>
								    <el-form-item label="游戏介绍">
								    	<el-input type="textarea" :rows="4" v-model="gameItemForm.contentDetail"></el-input>
								    </el-form-item>
								</el-col>
								<!-- 作者信息 -->
								<el-col :span="24">
									<el-col :span="12">
										<el-form-item label="创作者" prop="authName">
									    	<el-input v-model="gameItemForm.authName"></el-input>
									    </el-form-item>
									</el-col>
									<el-col :span="12">
									    <el-form-item label="官网">
									    	<el-input v-model="gameItemForm.website"></el-input>
									    </el-form-item>
									</el-col>
								</el-col>
								<el-col :span="24">
									<el-col :span="12">
									    <el-form-item label="作者邮箱">
									    	<el-input v-model="gameItemForm.authEmail"></el-input>
									    </el-form-item>
									</el-col>
									<el-col :span="12">
									    <el-form-item label="作者电话">
									    	<el-input v-model="gameItemForm.authPhone"></el-input>
									    </el-form-item>
									</el-col>
								</el-col>
								<!-- 大图 -->
								<el-col :span="24">
									<div class="logo_pane">
										<image-card
											:showTitle="false"
											v-for="(item, index) in gameImgList"
											class="big_img_item"
											@deleteItem="deleteBigImgFn(index)">
								    		<img :src="(preUrl+'/'+item)">
								    	</image-card>
								    	<product-img-item group="game"></product-img-item>
									</div>
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
			gameList: [],
			listTotal: 0,
			pageSize: 20,
			currentpage: 1,
			code: '',  				// 验证是否选中
			switchTurn: false,   	// 详情&新增切换
			switchLogo: true,    	// 切换logo
			logoData: {},
			gameTypeList: [],  		// 游戏分类列表
			gameImgList: [],   		// 更新获取的图片列表
			preUrl: sessionStorage.getItem('imageUrl'),
			searchGame: '',
			tagsOptions: [],
			// 表单信息
			gameItemForm: {
				name: '',
				subName: '',
				weight: 50,
				imageLogo: '',
				categoryId: '',
				enable: false,
				fixedTop: false,
				downloadUrlIos: '',
				iosCover: true, 	// ios遮罩
				downloadUrlAndroid: '',
				androidCover: true, // 安卓遮罩
				website: '', // 现在就玩
				packageUrlIos: '',
				packageSizeIos: '',
				packageUrlAndroid: '',
				packageSizeAndroid: '',
				description: '',
				contentDetail: '',
				authName: '',
				redirectUrl: '', // 官网
				authEmail: '',
				authPhone: '',
				imageBig: [],
				price: 0,
			},
			// 验证信息
			gameItemRules: {
				name: [
					{required: true, message: '请输入标题', trigger: 'blur'}
				],
				subName: [
					{required: true, message: '请输入副标题', trigger: 'blur'}
				],
				categoryId: [
					{type: 'number', required: true, message: '游戏分类不能为空', trigger: 'change'}
				],
				androidCover: [
					{required: true, message: '请选择是否开启安卓遮罩', trigger: 'change'}
				],
				iosCover: [
					{required: true, message: '请选择是否开启IOS遮罩', trigger: 'change'}
				],
				description: [
					{required: true, message: '请输入描述', trigger: 'blur'}
				],
				authName: [
					{required: true, message: '请输入创作者', trigger: 'blur'}
				],
				redirectUrl: [
					{required: true, message: '请输入网址', trigger: 'blur'}
				],
				imageLogo: [
					{ required: true, validator: imageLogoFn, trigger: 'blur' }
				]
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
			if(n){
			}else {
				// 新增
				this.$refs.gameItemForm.resetFields();
				this.set_banner_img({});
				this.set_product_list([]);
				this.gameImgList = [];
				this.tagsOptions = [];
				this.switchLogo = true;
				this.code = '';
				this.gameItemForm = {
					name: '',
					subName: '',
					weight: 50,
					imageLogo: '',
					categoryId: '',
					enable: false,
					fixedTop: false,
					downloadUrlIos: '',
					iosCover: true, 	// ios遮罩
					downloadUrlAndroid: '',
					androidCover: true, // 安卓遮罩
					website: '', // 现在就玩
					packageUrlIos: '',
					packageSizeIos: '',
					packageUrlAndroid: '',
					packageSizeAndroid: '',
					description: '',
					contentDetail: '',
					authName: '',
					redirectUrl: '', // 官网
					authEmail: '',
					authPhone: '',
					imageBig: [],
					price: 0,
				}
			}
		}
	},
	methods: {
		...mapActions([
			'set_banner_img',
			'set_product_list',
		]),
		// 选中
		pick(id){
			this.code = id
			this.switchTurn = true
			this.getGameDetail({id: id});
		},
		getGameDetail(obj){
			api_product.gameDetail(obj).then(res=> {
				if(res.data.code==0){
					this.switchLogo = false
					this.gameItemForm = res.data.data
					if(!!res.data.data.iosCover){
						this.gameItemForm.iosCover = true;
					}else{
						this.gameItemForm.iosCover = false;
					}
					if(!!res.data.data.androidCover){
						this.gameItemForm.androidCover = true;
					}else{
						this.gameItemForm.androidCover = false;
					}
					if(!!res.data.data.enable){
						this.gameItemForm.enable = true;
					}else{
						this.gameItemForm.enable = false;
					}
					if(!!res.data.data.fixedTop){
						this.gameItemForm.fixedTop = true;
					}else{
						this.gameItemForm.fixedTop = false;
					}
					if(!!res.data.data.label && res.data.data.label != 'null'){
						try{
							this.tagsOptions = JSON.parse(res.data.data.label)
						}catch(err){
							this.tagsOptions = []
						}
					}else{
						this.tagsOptions = []
					}
					this.gameItemForm.imageBig = res.data.data.imageBigList
					this.gameImgList = Array.from(res.data.data.imageBigList)
				}
			})
		},
		gameCurrentChange(page){
			let obj = {page: page, pageSize: this.pageSize};
			if(!!this.searchGame && this.searchGame != ''){
				obj.name = this.searchGame;
			}
			this.getProductList(obj);
			this.currentpage = page;
		},
		// 获取分类列表
		getType(){
			api_type.gameList().then(res=> {
				this.gameTypeList = res.data.data
			})
		},
		getProductList(obj){
			this.leftLoading =  true;
			api_product.searchByName(obj).then(res=> {
				if(res.data.code==0){
					this.gameList = res.data.data.list;
					this.listTotal = res.data.data.count;
					this.leftLoading = false;
				}
			})
		},
		typeComputed(val, id){
			for(let a of this.gameList){
				if(a.id==id){
					return `${a.name}--  id【${id}】`
				}
			}
		},
		// 列表删除
		deleteItem(id){
			this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
				api_product.gameDelete({id: id}).then(res=> {
					if(res.data.code==0){
						this.gameCurrentChange(this.currentpage)
						this.gameImgList = []
						this.set_banner_img({})
						this.set_product_list([])
						this.loading = false
						this.switchTurn = false
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
			this.gameImgList.splice(index, 1)
		},
		// logo上传回调
		callbackFn(){
			this.switchLogo = false
			this.gameItemForm.imageLogo = this.get_banner_img.path
			this.logoData = this.get_banner_img
		},
		// 提交
		submitFn(name){
			let logoImg = ''
			this.$refs[name].validate(valid=> {
				if(valid){
					if(this.switchTurn){
						// 更新
						if(this.gameItemForm.imageLogo!=''){
							if(this.gameImgList.length>0 || this.get_product_list.length>0){
								let obj = {
									id: this.gameItemForm.id
								}
								let newObj = this.saveObj();
								Object.assign(obj, newObj);
								// 发起请求
								this.loading = true
								api_product.gameUpdate(obj).then(res=> {
									if(res.data.code==0){
										this.$message.success('更新成功')
										this.gameImgList = []
										this.set_banner_img({})
										this.set_product_list([])
										this.gameCurrentChange(this.currentpage)
										this.loading = false
										this.switchTurn = false
										this.tagsOptions = []
									}else{
										this.loading = false
										this.$message.error('当前网络不佳，请稍后重试')
										return
									}
								})
							}else {
								this.$message.error('请选择图片，不然完成不了哦')
								return
							}
						}else{
							this.$message.error('请选择图片，不然完成不了哦')
							return
						}
					}else {
						// 新增
						if(!!this.get_banner_img.path && this.get_product_list.length>0){
							let obj = {};
							let newObj = this.saveObj();
							Object.assign(obj, newObj);
							api_product.gameInsert(obj).then(res=> {
								if(res.data.code==0){
									this.$message.success('添加成功')
									this.gameImgList = []
									this.gameCurrentChange(this.currentpage)
									this.$refs.gameItemForm.resetFields()
									this.gameItemForm.redirectUrl = ''
									this.gameItemForm.downloadUrlIos = ''
									this.gameItemForm.downloadUrlAndroid = ''
									this.set_banner_img({})
									this.set_product_list([])
									this.loading = false
									this.switchTurn = false
								}else{
									this.$message.error('当前网络不佳，请稍后重试')
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
					this.$message('信息不完整')
				}
			})
		},
		// 搜索游戏
		searchGameDetail(){
			let obj = {
				name: this.searchGame,
				page: 1,
				pageSize: this.pageSize
			}
			this.getProductList(obj)
		},
		removeLabel(i){
			this.tagsOptions.splice(i, 1)
		},
		addLabel(){
			this.$prompt('请输入标签', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
	        }).then(({ value }) => {
	          	this.tagsOptions.push(value)
	        }).catch(() => {
	              
	        });
		},
		saveObj(){
			let obj = {
				name: this.gameItemForm.name,
				subName: this.gameItemForm.subName,
				description: this.gameItemForm.description,
				imageLogo: this.gameItemForm.imageLogo,
				categoryId: this.gameItemForm.categoryId,
				authName: this.gameItemForm.authName,
				redirectUrl: this.gameItemForm.redirectUrl,
				price: this.gameItemForm.price
			}
			let bigImgList = []
			let newArr = []   // 合并两个数组(更新获取的大图和自己新增的大图)
			let arr = []
			if(!!this.gameItemForm.authEmail.trim()){
				obj.authEmail = this.gameItemForm.authEmail
			}

			if(!!this.gameItemForm.authPhone.trim()){
				obj.authPhone = this.gameItemForm.authPhone
			}

			if(!!this.gameItemForm.website.trim()){
				obj.website = this.gameItemForm.website
			}

			if(!!this.gameItemForm.contentDetail.trim()){
				obj.contentDetail = this.gameItemForm.contentDetail
			}

			if(this.get_product_list.length>0){
				for(let a of this.get_product_list){
					bigImgList.push(a.path)
				}
				arr = Array.from(this.gameImgList)
				newArr = [...bigImgList, ...arr]
			}else {
				newArr = Array.from(this.gameImgList)
			}
			obj.imageBig = JSON.stringify(newArr)
			if(!!this.gameItemForm.iosCover){
				obj.iosCover = 1;
			}else{
				obj.iosCover = 0;
			}
			if(!!this.gameItemForm.androidCover){
				obj.androidCover = 1;
			}else{
				obj.androidCover = 0;
			}
			if(!!this.gameItemForm.enable){
				obj.enable = 1;
			}else{
				obj.enable = 0;
			}
			if(!!this.gameItemForm.fixedTop){
				obj.fixedTop = 1;
			}else{
				obj.fixedTop = 0;
			}
			if(!!this.gameItemForm.weight && this.gameItemForm.weight != 'null'){
				obj.weight = this.gameItemForm.weight;
			}
			if(!!this.gameItemForm.downloadUrlIos && this.gameItemForm.downloadUrlIos != 'null'){
				obj.downloadUrlIos = this.gameItemForm.downloadUrlIos;
			}
			if(!!this.gameItemForm.downloadUrlAndroid && this.gameItemForm.downloadUrlAndroid != 'null'){
				obj.downloadUrlAndroid = this.gameItemForm.downloadUrlAndroid;
			}
			if(!!this.gameItemForm.packageUrlIos && this.gameItemForm.packageUrlIos != 'null'){
				obj.packageUrlIos = this.gameItemForm.packageUrlIos;
			}
			if(!!this.gameItemForm.packageUrlAndroid && this.gameItemForm.packageUrlAndroid != 'null'){
				obj.packageUrlAndroid = this.gameItemForm.packageUrlAndroid;
			}
			if(!!this.gameItemForm.packageSizeIos && this.gameItemForm.packageSizeIos != 'null'){
				obj.packageSizeIos = this.gameItemForm.packageSizeIos;
			}
			if(!!this.gameItemForm.packageSizeAndroid && this.gameItemForm.packageSizeAndroid != 'null'){
				obj.packageSizeAndroid = this.gameItemForm.packageSizeAndroid;
			}
			if(this.tagsOptions.length > 0 && this.tagsOptions != 'null' && !!this.tagsOptions){
				obj.label = JSON.stringify(this.tagsOptions)
			}
			return obj;
		}
	},
	created(){
		this.getType()  // 获取游戏分类列表
		this.getProductList({page: 1, pageSize: this.pageSize})
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
.label_wrap{
	min-width: 100%;
	background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    min-height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
}
.label_item{
	box-sizing: border-box;
    margin: 3px 0 3px 6px;
    border-color: hsla(220,4%,58%,.2);
    background-color: rgba(64,158,255,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
}
</style>
