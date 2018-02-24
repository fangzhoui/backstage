<template>
	<div class="tag_label_wrap">
		<div>
			{{title}}
		</div>
		<i class="el-icon-circle-close" @click="deleteItem"></i>
	</div>
</template>



<script>

export default {
	name: 'tag-label',
	props: {
		title: {
			type: String,
			default: "默认",
		}
	},
	methods: {
		deleteItem(){
			this.$emit('deleteItem')
		}
	}
}
</script>



<style scoped>
	
.tag_label_wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 35px;
	padding: 0 5px;
	border-radius: 30px;
	width: 100px;
	background: #eef1f6;
	margin-right: 10px;
}
.tag_label_wrap:hover {
	background: #48576a;
	color: #fff;
}
</style>