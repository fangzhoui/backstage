<template>
	<div>
		<page-wrap>
			<div slot="sideLeft">
				<el-card>
					<div>
						<el-breadcrumb separator="/">
			                <el-breadcrumb-item><i class="el-icon-setting"></i> 主题管理</el-breadcrumb-item>
			                <el-breadcrumb-item>主题位置</el-breadcrumb-item>
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
						<el-button :disabled="!pickState" @click="addItemBtnFn" type="success">添加</el-button>
					</div>
					<table>
						<tr class="table_header_wrap">
							<th class="table_header table_img"><span>图片</span></th>
							<th class="table_header table_weight"><span>名称</span></th>
							<!-- <th class="table_header table_link"><span>位置</span></th> -->
							<!-- <th class="table_header table_action"><span>状态</span></th> -->
							<th class="table_header table_action"><span>操作</span></th>
						</tr>
						<tr v-for="(item, index) in sectionList" :key="index">
							<td class="body table_img">
								<img :src="(preUrl+'/'+item.imageLogo)">
							</td>
							<td class="body table_weight">{{item.name}}</td>
							<!-- <td class="body table_link">{{item.subName}}</td> -->
							<!-- <td class="body table_action">{{!!item.enable?"有效":"无效"}}</td> -->
							<td class="body table_action">
								<el-button size="mini" @click.native="deleteItemFn(item.id)">删除</el-button>
							</td>
						</tr>
					</table>
				</el-card>
			</div>
		</page-wrap>
		<el-dialog title="主题列表" :visible.sync="topicdialogVisible" width="60%">
			<ul class="topic_list">
				<li class="topic_item" v-for="(item,index) in allSectionList" :class="{cho: item.id == topicId}" @click.stop="choseTop(item.id,index)">
					<div class="topimg_box">
						<img :src="(preUrl+'/'+item.imageLogo)" width="100%" height="100%">
					</div>
					<p class="topic_text">{{item.name}}</p>
					<p class="topic_text">{{item.subName}}</p>
				</li>
			</ul>
			<span slot="footer" class="dialog-footer">
			<el-button @click="topicdialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="addTopic">确 定</el-button>
		</span>
		</el-dialog>
		
	</div>
</template>

<script>

import api_web from 'api/webAdmin'
import apiTopic from 'api/topic'

export default {
	name: "topic-section",
	data(){
		return {
			label: '内容',
			bannerList: [],
			sectionList: [],
			allSectionList: [],
			pickState: false,      // 选中的状态
			section: '',
			preUrl: sessionStorage.getItem('imageUrl'),
			topicdialogVisible: false,
			topicId: '',
			sectionId: '',

	    }
	},
	watch: {
		'topicdialogVisible'(f, n){
			if(!f){
				this.topicId = '';
			}
		}
	},
	methods: {
		pickBanner(item){
			this.pickState = true;
			this.section = item.section;
			this.sectionId = item.id;
			let obj = {
				section: item.section
			}
			this.getSectionList(obj);
		},
        getList(){
        	let obj = {
        		type: 0
        	}
        	api_web.sectionList(obj).then(res => {
				if(res.data.code == "0"){
					this.bannerList = res.data.data;
				}
			})
        },
        getSectionList(obj){
        	apiTopic.allTopicList(obj).then((res) => {
        		if(res.data.code == '0'){
        			this.sectionList = res.data.data;
        		}
        	})
        },
        getAllSectionList(){
        	apiTopic.allTopicList().then((res) => {
        		if(res.data.code == '0'){
        			this.allSectionList = res.data.data;
        		}
        	})
        },
        addItemBtnFn(){
        	this.topicdialogVisible = true;
        },
        addTopic(){
        	let obj = {
        		topicId: this.topicId,
        		sectionId: this.sectionId
        	}
        	api_web.addSectionTopic(obj).then((res) => {
        		if(res.data.code == '0'){
        			let c = {
						section: this.section
					};
        			this.getSectionList(c);
        			this.topicdialogVisible = false;
        		}
        	})
        },
        choseTop(item, index){
        	this.topicId = item;
        },
        deleteItemFn(id){
        	this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
	        	let obj = {
	        		topicId: id,
	        		sectionId: this.sectionId
	        	}
	        	api_web.delSectionTopic(obj).then((res) => {
	        		if(res.data.code == '0'){
	        			let c = {
							section: this.section
						};
	        			this.getSectionList(c);
	        		}
	        	})
			}).catch(()=> {
				return
			})
        }
	},
	created(){
		this.getList();
		this.getAllSectionList();
	}
}
</script>




<style scoped>


table {
	width: 100%;
}
tr {
	width: 100%;
	display: flex;
	background: #eef1f6;
}
.table_header_wrap {
	border-radius: 5px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	height: 40px;
}
td {
	height: 60px;
	background: #fff;
	border-bottom: 1px solid #ddd;
	display: flex;
	align-items: center;
	padding: 5px;
	font-size: 13px;
}
.table_header {
	font-size: 16px;
	font-weight: lighter;
	display: flex;
	align-items: center;
	padding: 5px 5px;
}
.table_img {
	width: 30%;
	overflow: hidden;
}
.table_img img {
	width: 60px;
	height: 60px;
}
.table_weight {
	width: 30%;
}
.table_link {
	width: 30%;
}
.table_action {
	width: 40%;
}
.topic_list{
	width: 100%;
	list-style: none;
	border: 1px solid #999;
	padding: 15px;
	border-radius: 2px;
	box-sizing: border-box;
	height: 350px;
	overflow-y: auto;
}
.topic_item{
	height: 40px;
	line-height: 40px;
	display: flex;
	margin: 5px 0;
	border: 1px solid #999;
}
.topimg_box{
	flex: 0 0 40px;
}
.topic_text{
	flex: 1;
	text-align: center;
}
.cho{
	background-color: #999;
	color: #fff;
}
</style>


