<template>
	<div>
		<!-- 添加模块 -->
		<div class="add_item_pane" v-if="addItemPane">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-form label-width="100px" :model="addItemForm" :rules="addItemRules" ref="addItemForm">
						<el-form-item label="链接" prop="action">
					    	<el-input v-model="addItemForm.action"></el-input>
					    </el-form-item>
					    <el-form-item label="权重" prop="weight">
					    	<el-input type='number' v-model="addItemForm.weight"></el-input>
					    </el-form-item>
					    <el-form-item label="是否有效">
					    	<el-switch v-model="addItemForm.enable"></el-switch>
							</el-switch>
					    </el-form-item>
					</el-form>
					<div class="upload_btn_pane">
						<el-button type="primary" @click.native="submitForm('addItemForm')">提交保存</el-button>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="img_upload_pane">
						<upload-img-item></upload-img-item>
					</div>
				</el-col>
			</el-row>
		</div>   <!-- 添加模块结束 -->

	</div>
</template>



<script>
import UploadImgItem from 'components/common/UploadImgItem'
import api_web from 'api/webAdmin'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'web-banner-add-item',
	components: {
		'upload-img-item': UploadImgItem,
	},
	data(){
		return {
			addItemForm: {
				action: '',
				weight: null,
				enable: true
			},
			addItemRules: {
				action: [
					{required: true, message: '请输入链接内容', trigger: 'blur'}
				],
				weight: [
					{required: true, message: '请输入权重', trigger: 'blur'}
				],
			},
		}
	},
	props: {
		addItemPane: {
			type: Boolean,
			default: true,
		},
		section: {
			type: String,
			default: ''
		}
	},
	computed: {
		...mapGetters([
			'get_banner_img',
		]),
	},
	methods: {
		...mapActions([
			'set_banner_img',
		]),
		submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          	if (valid) {
	            	let imgurl = this.get_banner_img
	            	if(!!imgurl.path){
	            		let obj = {
		            		weight: this.addItemForm.weight,
		            		action: this.addItemForm.action,
		            		section: this.section,
		            		image: imgurl.path,
		            		enable: this.addItemForm.weight ? 1 : 0 
		            	}
		            	api_web.bannerInsert(obj).then(res=> {
		            		if(res.data.code==0){
		            			this.addItemForm = {
		            				weight: '',
		            				action: '',
		            				enable: true
		            			}
		            			this.set_banner_img({})
		            			this.$emit('hidePane')
		            			this.$message.success('新增成功')
		            		}
		            	})
	            	}else{
	            		this.$message.error('上传图片不能为空')
	            		return
	            	}
	          	} else {
	            	return false;
	          	}
	        });
	    },

	}
}
</script>



<style scoped>

.add_item_pane {
	border: 1px solid #ddd;
	padding: 10px;
	margin: 10px 0;
	border-radius: 5px;
}
.upload_btn_pane {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
</style>