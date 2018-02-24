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
				<div v-if="showContent">
					<el-form>
						<el-form-item :label="label">
						    <el-input :autosize="{ minRows: 10}" type="textarea" v-model="content"></el-input>
						</el-form-item>
						<el-form-item label="是否有效">
						    <el-switch v-model="enable"></el-switch>
						</el-form-item>
					</el-form>
					<el-button type="primary" @click.native="submitFn">保存提交</el-button>
				</div>
			</div>
		</page-wrap>
	</div>
</template>



<script>
import api_web from 'api/webAdmin'

export default {
	name: "web-content",
	data(){
		return {
			label: '内容',
			content: '',
			showContent: false,
			section: '',
			bannerList: [],
			enable: true
		}
	},
	methods: {
		pickBanner(item){
			this.showContent = true;
			this.section = item.section;
			this.getContent();
		},
		getList(){
        	let obj = {
        		type: 2
        	}
        	api_web.sectionList(obj).then(res => {
				if(res.data.code == "0"){
					this.bannerList = res.data.data;
					console.log(this.bannerList)
				}
			})
        },
		getContent(){
			api_web.contentGet({section: this.section}).then(res=> {
				if(res.data.code==0){
					this.content = ''
					this.content = res.data.data.content
					this.enable = !!res.data.data.enable ? true : false
				}else {
					this.$message('该项暂时还没有内容')
					this.content = ''
				}
			})
		},
		submitFn(){
			api_web.contentGet({section: this.section}).then(res=> {
				if(res.data.data!=null){
					// 更新
					let obj = {
						section: this.section,
						content: this.content,
						id: res.data.data.id,
						enable: !!this.enable ? 1 : 0
					}
					api_web.contentInsert(obj).then(data=> {
						if(data.data.code==0){
							this.$message.success('更新成功')
							this.content = '';
							this.showContent = false;
							this.section = '';
							this.enable = true;
						}
					})
				}else {
					// 新增
					let obj = {
						section: this.section,
						content: this.content,
						enable: !!this.enable ? 1 : 0
					}
					api_web.contentInsert(obj).then(data=> {
						if(data.data.code==0){
							this.$message.success('添加成功')
							this.content = '';
							this.showContent = false;
							this.section = '';
							this.enable = true;
						}
					})
				}
			})
		}
	},
	created(){
		this.getList()
	}
}
</script>
