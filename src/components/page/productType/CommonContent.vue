<template>
	<div>
		<el-card>
			<div slot="header">
				<el-switch
				  	v-model="switchTurn"
				  	on-text="详情"
				  	off-text="新增"
				  	off-color="#13ce66"
				  	>
				</el-switch>
			</div>
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form label-width="70px" :model="typeItemForm" :rules="typeItemRules" ref="typeItemForm">
						<el-form-item label="标题" prop="name">
					    	<el-input v-model="typeItemForm.name"></el-input>
					    </el-form-item>
						<el-form-item label="副标题" prop="subName">
					    	<el-input v-model="typeItemForm.subName"></el-input>
					    </el-form-item>
					    <el-form-item label="权重" prop="weight">
					    	<el-input type='number' v-model="typeItemForm.weight"></el-input>
					    </el-form-item>
					</el-form>
					<div class="upload_btn_pane">
						<el-button type="primary" @click="saveBtnFn">保存</el-button>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="img_upload_pane">
						<image-card v-if="showImg" @deleteItem="deleteItem" :showTitle="false">
							<img :src="(perUrl+'/'+typeItemForm.image)">
						</image-card>
						<upload-img-item v-else></upload-img-item>
					</div>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>




<script>
import UploadImgItem from 'components/common/UploadImgItem'
import AddImgItem from 'components/common/AddImgItem'
import ImgCard from 'components/common/ImgCard'
import { mapGetters, mapActions } from 'vuex'
import api_proType from 'api/productType'

export default {
	name: 'type-common-pane',
	components: {
		'upload-img-item': UploadImgItem,
		'image-card': ImgCard,
		'add-img-item': AddImgItem,
	},
	props: {
		section: String,
		state: {
			type: String,
			default: 'none',
		},
	},
	computed: {
		...mapGetters([
			'get_itemData',
			'get_banner_img',
		]),
		perUrl: function(){
			return sessionStorage.getItem('imageUrl')
		}
	},
	data(){
		return {
			switchTurn: false,
			typeItemForm: {
				name: '',
				weight: '',
				subName: '',
				image: '',
			},
			typeItemRules: {
				name: [
					{required: true, message: '请输入标题', trigger: 'blur'}
				],
				weight: [
					{required: true, message: '请输入权重', trigger: 'blur'}
				],
				subName: [
					{required: true, message: '请输入副标题', trigger: 'blur'}
				],
			},
			showImg: false,
		}
	},
	watch: {
		switchTurn: function(n, o){
			if(n){
				this.showImg = true
				let a = this.get_itemData
				this.typeItemForm = {
					name: a.name,
					subName: a.subName,
					weight: a.weight,
					image: a.image
				}
			}else {
				this.showImg = false
				this.typeItemForm = {
					name: '',
					subName: '',
					weight: '',
				}
			}
		},
		get_itemData: function(n, o){
			let a = this.get_itemData
			this.typeItemForm = {
				name: a.name,
				subName: a.subName,
				weight: a.weight,
				image: a.image
			}
		},
		state: function(n, o){
			if(n=='pick'){
				this.switchTurn = true
			}else if(n=='none'){
				this.switchTurn = false
			}
		}
	},
	methods: {
		...mapActions([
			'set_banner_img',
			'set_itemData',
		]),
		deleteItem(){
			this.showImg = false
		},
		saveBtnFn(){
			if(this.section=='game'){
				if(this.switchTurn){
					// 更新
					let a = this.get_itemData
					let b = this.typeItemForm
					let image_url = ''
					if(this.showImg){
						// 使用原来图片
						image_url = a.image
					}else {
						let img_URL = this.get_banner_img
						if(!!img_URL.path){
							image_url = img_URL.path
						}else {
							this.$message.error('图片不能为空')
							return 
						}
					}
					let obj = {
						id: a.id,
						name: b.name,
						subName: b.subName,
						weight: b.weight,
						image: image_url
					}
					api_proType.gameUpdate(obj).then(res=> {
						if(res.data.code==0){
							this.$message.success('更新成功')
							this.$emit('submitFn')
							this.showImg = true
							this.switchTurn = true
							this.set_itemData({})
						}
					})
				}else {
					// 新增
					let b = this.typeItemForm
					let image_url = ''
					let img_URL = this.get_banner_img
					if(!!img_URL.path){
						image_url = img_URL.path
					}else {
						this.$message.error('图片不能为空')
						return 
					}
					let obj = {
						name: b.name,
						subName: b.subName,
						weight: b.weight,
						image: image_url
					}
					api_proType.gameInsert(obj).then(res=> {
						this.$message.success('新增成功')
						this.$emit('submitFn')
						this.showImg = true
						this.switchTurn = true
						this.set_itemData({})
					})
				}
			}else if(this.section=='business'){
				if(this.switchTurn){
					// 更新
					let a = this.get_itemData
					let b = this.typeItemForm
					let image_url = ''
					if(this.showImg){
						// 使用原来图片
						image_url = a.image
					}else {
						let img_URL = this.get_banner_img
						if(!!img_URL.path){
							image_url = img_URL.path
						}else {
							this.$message.error('图片不能为空')
							return 
						}
					}
					let obj = {
						id: a.id,
						name: b.name,
						subName: b.subName,
						weight: b.weight,
						image: image_url
					}
					api_proType.businessUpdate(obj).then(res=> {
						if(res.data.code==0){
							this.$message.success('更新成功')
							this.$emit('submitFn')
							this.showImg = true
							this.switchTurn = true
							// this.set_itemData({})
						}
					})
				}else {
					// 新增
					let b = this.typeItemForm
					let image_url = ''
					let img_URL = this.get_banner_img
					if(!!img_URL.path){
						image_url = img_URL.path
					}else {
						this.$message.error('图片不能为空')
						return 
					}
					let obj = {
						name: b.name,
						subName: b.subName,
						weight: b.weight,
						image: image_url
					}
					api_proType.businessInsert(obj).then(res=> {
						this.$message.success('新增成功')
						this.$emit('submitFn')
						this.showImg = true
						this.switchTurn = true
						// this.set_itemData({})
					})
				}
			}
		}
	},
	mounted(){
		let a = this.get_itemData
		this.typeItemForm = {
			name: a.name,
			subName: a.subName,
			weight: a.weight,
			image: a.image
		}
	},
}
</script>