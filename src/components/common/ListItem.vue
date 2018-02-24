<template>
	<div class="list_item_wrap underline" @mouseenter="mouseIn" @mouseleave="mouseOut">
		<div class="list_item_content" :class="{fontColor: state}">
			<slot>
				默认项
			</slot>
		</div>
		<div class="delete_icon" v-if="showIcon">
			<slot name="deleteIcon">
				<i class="el-icon-circle-close" @click="deleteItemFn"></i>
			</slot>
		</div>
	</div>
</template>



<script>

export default {
	name: 'list-item',
	data(){
		return {
			showIcon: false,
			state: false,
			indexlabel: ''
		}
	},
	props: {
		index: null,
		code: null,
	},
	watch: {
		code: function(n, o){
			if(n==this.index){
				this.state = true
			}else {
				this.state = false
			}
		},
	},
	methods: {
		mouseIn(){
			this.showIcon = true
		},
		mouseOut(){
			this.showIcon = false
		},
		deleteItemFn(){
			this.$emit('deleteItem')
		},
	}
}
</script>



<style scoped>
	
.list_item_wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
}
.list_item_wrap:hover {
	background: #eef1f6;
}
.fontColor {
	color: #2196f3;
}
</style>