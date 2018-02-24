<template>
	<div class="upload_img_wrap">
		<transition name="silde-fade">
			<div class="upload_img_pane" v-if="noUpload">
				<i class="el-icon-plus" v-if="showIcon"></i>
				<i class="el-icon-loading" v-else></i>
				<input type="file" ref="imgUpload" class="upload_file" name="" @change="uploadFn()">
			</div>
			<image-card v-else :showTitle="false" @deleteItem="deleteItem(id)">
				<img :src="imgUrl">
			</image-card>
		</transition>
	</div>
</template>



<script>
import ImgCard from 'components/common/ImgCard'
import api_resource from 'api/resource'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'upload-img-pane',
	components: {
		'image-card': ImgCard,
	},
	data(){
		return {
			imageUrl: '',
			id: '',
			noUpload: true,
			showIcon: true,
		}
	},
	computed: {
		...mapGetters([
			'get_banner_img',
		]),
		imgUrl: function(){
			return `${sessionStorage.getItem('imageUrl')}/${this.get_banner_img.path}`
		}
	},
	props: {
		group: {
			type: String,
			default: 'common'
		}
	},
	methods: {
		...mapActions([
			'set_banner_img',
		]),
		uploadFn(){
			this.showIcon = false
			if(this.$refs.imgUpload.files.length>0){
				let file = this.$refs.imgUpload.files[0]
				let pre = file.name.split('.')
				let name = pre[0]
				let a = {
					name: name,
					group: this.group,
					file: file
				}
				api_resource.insert(a).then(res=> {
					if(res.data.code==0){
						this.noUpload = false
						this.showIcon = true
						this.$message.success('上传成功')
						this.set_banner_img(res.data.data)
						console.log(this.get_banner_img)
						this.imageUrl = res.data.data.path
						this.id = res.data.data.id
						this.$emit('callback', this.imageUrl)
					}else {
						this.$message.error('当期网络不佳，请重试')
					}
				})
			}else {
				this.showIcon = true
			}
			
		},
		deleteItem(id){
			api_resource.delete({id: id}).then(res=> {
				if(res.data.code==0){
					this.set_banner_img({})
					this.noUpload = true
					this.id = ''
					this.imageUrl = ''
				}
			})
		}
	}
}
</script>



<style scoped>
	
.upload_img_pane {
	width: 150px;
	height: 150px;
	border-radius: 5px;
	border: 1px dashed #dcdcdc;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	background: #fbfdff;
	font-size: 24px;
	color: #666;
}
.upload_img_pane:hover {
	border:1px dashed #2196f3;
}
.upload_file {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
/*动画效果*/
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>