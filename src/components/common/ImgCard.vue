<template>
	<div class="image_card_wrap" @mouseenter="mouseIn">
		<div class="image_pane" :class="{image_pane_hideTitle: !showTitle}">
			<slot>
				<img src="http://oo6gk8wuu.bkt.clouddn.com/girl4.jpg">
			</slot>
		</div>
		<div class="text_pane" v-if="showTitle">
			<p>
				<slot name="title">title</slot>
			</p>
		</div>
		<div class="modal" @mouseleave="mouseOut" v-if="showIcon">
			<i class="el-icon-delete" @click="deleteItem"></i>
		</div>
	</div>
</template>




<script>

export default {
	name: 'image-item',
	data(){
		return {
			showIcon: false
		}
	},
	props: {
		showTitle: {
			type: Boolean,
			default: true
		},
	},
	methods: {
		deleteItem(){
			this.$emit('deleteItem')
		},
		mouseIn(){
			this.showIcon = true
		},
		mouseOut(){
			this.showIcon = false
		}
	}
}	

</script>



<style scoped>

.image_card_wrap {
	border-radius: 5px;
	border: 1px solid #ddd;
	width: 150px;
	position: relative;
}
.image_pane {
	width: 150px;
	height: 120px;
}
.image_pane_hideTitle {
	height: 150px;
}
.image_pane img {
	width: 100%;
	height: 100%;
	overflow: hidden;
	/*border-radius: 5px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;*/
}
.text_pane {
	display: flex;
	padding: 8px;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;
}
.text_pane p {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 120px;
}
.bg_color {
	background: #324157;
	color: #fff;
}
.modal {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 99;
	top: 0;
	left: 0;
	background: rgba(0,0,0,0.7);
	color: #fff;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
}
</style>