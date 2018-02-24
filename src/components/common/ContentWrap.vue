<template>
	<div class="wrap">
		<div class="side_left" :style="{width: sideLeftW}">
			<!-- <el-button type="primary" @click="toggleFn">toggle</el-button> -->
			<slot name="sideLeft">
				<p>我是左边的哟</p>
			</slot>
		</div>
		<div class="side_right" :style="{width: sideRightW}">
			<slot name="sideRight">
				<p>这里什么都没有你看着办！</p>
			</slot>
		</div>
	</div>
</template>




<script>
	
export default {
	name: "content-wrap",
	data(){
		return {
			sideLeftW: `28%`,
			sideRightW: '72%'
		}
	},
	methods: {
		toggleFn(){
			if(this.sideLeftW=='5%'){
				this.sideLeftW = '28%'
				this.sideRightW = '72%'
			}else {
				this.sideLeftW = '5%'
				this.sideRightW = '95%'
			}
		}
	}
}

</script>




<style scoped>
	
.wrap {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	bottom: 0;
	height: 100%;
	display: flex;
}
.side_left {
	position: relative;
	left: 0;
	width: 28%;
	/*height: 100%;*/
	padding: 20px;
	border: 1px solid #eee;
	overflow: auto;
}
.side_right {
	position: relative;
	width: 72%;
	top: 0;
	bottom: 0;
	/*height: 100%;*/
	padding: 20px;
	overflow: auto;
}


</style>