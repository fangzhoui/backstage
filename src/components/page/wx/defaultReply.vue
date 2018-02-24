<template>
	<div>
		<div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 微信公众号管理</el-breadcrumb-item>
                <el-breadcrumb-item>默认回复</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="defaultpart">默认回复</el-menu-item>
			<el-menu-item index="followpart">关注回复</el-menu-item>
		</el-menu>
		<div class="reply">
			<transition name="move" mode="out-in">
            	<component :is="activeIndex"></component>
            </transition>
        </div>
	</div>
</template>

<script>
import api_wx from 'api/wx'
import defaultp from 'components/page/wx/defaultpart'
import followp from 'components/page/wx/followpart'

export default {
	name: "wx-defaultreply",
	data(){
		return {
			activeIndex: 'defaultpart',
		}
	},
	components: {
		'defaultpart': defaultp,
		'followpart': followp
	},
	methods: {
		handleSelect(key, keyPath) {
	        this.activeIndex = key
	    }
	},
	created(){
	},
}
</script>

<style scoped>
.reply{
	padding: 20px;
}
</style>


