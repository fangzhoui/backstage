<template>
	<div class="upload_img_wrap">
		<transition-group name="list">
			<image-card class="img_item_wrap list" v-for="(item, index) in get_product_list" @deleteItem="deleteItemFn(item.id, index)" :key="index">
				<img :src="(preUrl+'/'+item.path)">
			</image-card>
		</transition-group>
		
		<div class="upload_img_pane img_item_wrap">
			<i class="el-icon-plus" v-if="showIcon"></i>
			<i class="el-icon-loading" v-else></i>
			<input type="file" ref="imgUpload" class="upload_file" name="" @change="uploadFn()">
		</div>
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
			showIcon: true,
			imgList: [],
			preUrl: sessionStorage.getItem('imageUrl'),
		}
	},
	computed: {
		...mapGetters([
			'get_product_list',
		]),
		imgUrl: function(){
			return `${sessionStorage.getItem('imageUrl')}/${this.imageUrl}`
		}
	},
	props: {
		group: {
			type: String,
			default: 'common'
		},
		newState: {
			type: Boolean,
			default: false,
		},
	},
	// 实时监听图片变化
	watch: {
		imgList: function(n, o){
			this.set_product_list(n)
		},
	},
	methods: {
		...mapActions([
			'set_product_list', // 产品大图列表
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
						this.showIcon = true
						this.$message.success('上传成功')
						// this.imageUrl = res.data.data
						if(this.get_product_list.length>0){
							this.imgList.push(res.data.data)
							this.$emit('callbackFn')
						}else {
							this.imgList = []
							this.imgList.push(res.data.data)
							this.$emit('callbackFn')
						}
						
					}else {
						this.$message.error('当期网络不佳，请重试')
					}
					
				}).catch(()=> {
					this.showIcon = true
				})
			}else {
				this.showIcon = true
			}
		},
		deleteItemFn(id, index){
			api_resource.delete({id: id}).then(res=> {
				if(res.data.code==0){
					this.$message('已删除')
					this.imgList.splice(index, 1)
				}else{
					this.$message('当前网络不佳，请稍后重试')
					return 
				}
			})
		},
		shuffle: function () {
	      this.imgList = _.shuffle(this.imgList)
	    }
	},
	destroyed(){
		this.set_product_list([])
	},
}
</script>



<style scoped>

.upload_img_wrap {
	display: flex;
}
.img_item_wrap {
	margin: 5px 5px 5px 0;
}
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
.list {
  display: inline-block;
  margin-right: 10px;
}
.list-move {
	transition: transform 1s;
}
.list-enter-active, .list-leave-active {
    transition: all 0.6s;
}
.list-enter, .list-leave-to /* .list-leave-active for <2.1.8 */ {
    opacity: 0;
    transform: translateY(-20px);
}
</style>