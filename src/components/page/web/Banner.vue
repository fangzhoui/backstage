<template>
	<div>
		<page-wrap>
			<div slot="sideLeft">
				<el-card>
					<div>
						<el-breadcrumb separator="/">
			                <el-breadcrumb-item><i class="el-icon-setting"></i> 网页管理</el-breadcrumb-item>
			                <el-breadcrumb-item>网页内容</el-breadcrumb-item>
			            </el-breadcrumb>
					</div>
					<el-menu theme="light" unique-opened>
			            <el-menu-item v-for="(item,index) in bannerList" :index="index.toString()" @click.native.stop="pickBanner(item)">
			               {{item.name}}
			            </el-menu-item>
			        </el-menu>
				</el-card>
			</div>

			<div slot="sideRight">
				<el-card>
					<div slot="header" class="header_pane">
						<span>{{label}}</span>
						<el-button :disabled="!pickState" @click="addItemBtnFn" type="success">添加</el-button>
					</div>
					<div v-if="pickState">
						<web-banner-item :section="section" :addItemPane="addItemPane" @hidePane="hidePane"></web-banner-item>
						<div>
							<banner-content :section="section" :update="update"></banner-content>
						</div>
					</div>
				</el-card>
			</div>
		</page-wrap>
	</div>
</template>

<script>
import resource from 'api/resource'
import WebBannerItem from 'components/common/WebBannerItem'
import api_web from 'api/webAdmin'
import BannerContent from 'components/page/web/BannerContent'

export default {
	name: "web-banner",
	components: {
		'web-banner-item': WebBannerItem,
		'banner-content': BannerContent,
	},
	data(){
		return {
			label: '内容',
			bannerList: [],
			pickState: false,      // 选中的状态
			addItemPane: false,   // 添加面板
			update: false,    // 是否更新
			bannerDetail: [],
			section: '',
	    }
	},
	methods: {
		pickBanner(item){
			this.pickState = true;
			this.section = item.section;
		},
		addItemBtnFn(){
			this.addItemPane = !this.addItemPane
			this.update = false
		},
        hidePane(){
        	this.addItemPane = false
        	this.update = true
        },
        getList(){
        	let obj = {
        		type: 1
        	}
        	api_web.sectionList(obj).then(res => {
				if(res.data.code == "0"){
					this.bannerList = res.data.data;
				}
			})
        }
	},
	created(){
		this.getList();
	}
}
</script>




<style scoped>

.header_pane {
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
}
.btn_class{
	margin: 10px 0 0;
}
</style>


