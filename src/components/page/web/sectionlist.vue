<template>
	<div>
		<page-wrap v-loading.body.lock="loading">
			<div slot="sideLeft" v-loading.body.sync="leftLoading">
				<div style="margin-top: 15px;">
					<el-button type="primary" @click.stop="addTopic">新增专题</el-button>
				</div>
				<div style="margin-top: 15px;">
					<el-input placeholder="请输入专题名称" v-model="searchTopName">
						<el-button slot="append" icon="el-icon-search"  @click.stop="searchTopic"></el-button>
					</el-input>
				</div>
				<product-item
					v-for="item in topList"
					:index="item.id"
					:name="item.name"
					:code="topicId"
					:showListType="false"
					:showDetailParent = "true"
					@deleteItem="deleteTopic(item.id)"
					@lookDetail="updateTopic(item.id)"
					@click.native="pickTopic(item.id)">
					<img :src="(preUrl+ '/' + item.imageBig)">
				</product-item>
			</div>
			<div slot="sideRight">
				<div style="width: 40%" v-if="listShow">
					<div style="margin-top: 15px;">
						<el-button type="primary" @click.stop="addGame">新增游戏</el-button>
					</div>
					<product-item
						v-for="item in gameList"
						:index="item.id"
						:name="item.name"
						:code="gameId"
						:showListType="false"
						:showDetailParent = "true"
						@deleteItem="deleteGame(item.id)"
						@lookDetail="updateGame(item.id)">
						<img :src="(preUrl+ '/' + item.imageBig)">
					</product-item>
				</div>
			</div>
		</page-wrap>
		<el-dialog title="专题" :visible.sync="topicDialogFormVisible" width="60%">
			<el-form :model="topicForm" :rules="topicFormRules" ref="topicFormForm">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-col :span="12">
							<el-form-item label="标题" prop="name" label-width="80px">
	                            <el-input v-model="topicForm.name" placeholder="请输入标题"></el-input>
	                        </el-form-item>
							<el-form-item label="简介" prop="subName" label-width="80px">
								<el-input v-model="topicForm.subName" placeholder="请输入简介"></el-input>
							</el-form-item>
							<el-form-item label="是否有效" required label-width="80px">
	                            <el-switch v-model="topicForm.enable">
	                            </el-switch> 
	                        </el-form-item>
	                        <el-form-item label="是否置顶" required label-width="80px">
	                            <el-switch v-model="topicForm.fixedTop">
	                            </el-switch> 
	                        </el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="主图" prop="imageBig" label-width="80px">
								<add-img-item group="game" @callbackFn="callbackImage" v-if="switchImage"></add-img-item>
	                            <image-card :showTitle="false" v-else @deleteItem="deleteImageFn()">
	                                <img :src="(preUrl+'/'+topicForm.imageBig)">
	                            </image-card>
							</el-form-item>
						</el-col>
					</el-col>
					<el-col :span="24">
						<el-col :span="13">
						    <el-form-item label="标签" label-width="80px">
						    	<div class="label_wrap">
						    		<span class="label_item" v-for="(tag, index) in tagsOptions">{{tag}}<span class="el-icon-error" @click.stop="removeLabel(index)"></span></span>
						    	</div>
						    </el-form-item>
					    </el-col>
					    <el-col :span="4">
					    	<el-button type="primary" icon="el-icon-edit" @click.stop="addLabel"></el-button>
					    </el-col>
				    </el-col>
			    </el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelTopic">取 消</el-button>
				<el-button type="primary" @click="saveTopic('topicFormForm')">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="游戏" :visible.sync="gameDialogFormVisible" width="60%">
			<el-form :model="gameFormForm" :rules="gameFormFormRules" ref="gameFormForm">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-col :span="12">
							<el-form-item label="名称" prop="name" label-width="80px">
	                            <el-input v-model="gameFormForm.name" placeholder="请输入名称"></el-input>
	                        </el-form-item>
	                        <el-form-item label="链接" prop="linkUrl" label-width="80px">
	                            <el-input v-model="gameFormForm.linkUrl" placeholder="请输入链接"></el-input>
	                        </el-form-item>
							<el-form-item label="简介" label-width="80px">
								<el-input type="textarea" :rows="6" v-model="gameFormForm.description" placeholder="请输入简介"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="主图" prop="imageBig" label-width="80px">
								<add-img-item group="game" @callbackFn="callbackGameImage" v-if="switchImage"></add-img-item>
	                            <image-card :showTitle="false" v-else @deleteItem="deleteGameImageFn()">
	                                <img :src="(preUrl+'/'+gameFormForm.imageBig)">
	                            </image-card>
							</el-form-item>
						</el-col>
					</el-col>
			    </el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancelGame">取 消</el-button>
				<el-button type="primary" @click="saveGame('gameFormForm')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import ProductItem from 'components/common/ProductItem'
import ImgCard from 'components/common/ImgCard'
import AddImgItem from 'components/common/AddImgItem'
import { mapGetters, mapActions } from 'vuex'
import apiAdmin from 'api/webAdmin'
export default {
	name: 'priduct-game',
	components: {
		'product-item': ProductItem,
		'image-card': ImgCard,
		'add-img-item': AddImgItem,
	},
	data(){
		 var imageLogofn = (rule, value, callback) => {
            if (!value) {
               callback(new Error('图片不能为空'));
            }else{
                callback()
            }
        };
		return {
			topicDialogFormVisible: false,
			gameDialogFormVisible: false,
			switchImage: true,
			preUrl: sessionStorage.getItem('imageUrl'),
			leftLoading: false,
			loading: false,
			listTotal: 0,
			pageSize: 20,
			currentpage: 1,
			topList: [],
			gameList: [],
			topicId: '',
			gameId: '',
			searchTopName: '',
			tagsOptions: [],
			listShow: false,
			topicForm: {
				name: '',
				subName: '',
				imageBig: '',
				enable: true,
				fixedTop: true
			},
			topicFormRules: {
                name: [
                    {required: true, message: '请输入标题', trigger: 'blur'},
                    { min: 1, max: 40, message: '不超过40个字符', trigger: 'blur' }
                ],
                subName: [
                    {required: true, message: '请输入副标题', trigger: 'blur'},
                    { min: 1, max: 40, message: '不超过40个字符', trigger: 'blur' }
                ],
                imageBig: [
                    { required: true, validator: imageLogofn, trigger: 'blur' }
                ]
            },
            gameFormForm: {
				name: '',
				linkUrl: '',
				imageBig: '',
				description: '',
			},
			gameFormFormRules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                    { min: 1, max: 40, message: '不超过40个字符', trigger: 'blur' }
                ],
                linkUrl: [
                    {required: true, message: '请输入链接', trigger: 'blur'},
                ],
                imageBig: [
                    { required: true, validator: imageLogofn, trigger: 'blur' }
                ]
            },
		}
	},
	computed: {
		...mapGetters([
			'get_banner_img',
		]),
	},
	methods: {
		...mapActions([
			'set_banner_img',
		]),
		getSectionList(obj){
			apiAdmin.h5TopicList(obj).then(res => {
				if(res.data.code == '0'){
					this.topList = res.data.data;
				}
			})
		},
		searchTopic(){
			let obj = {}
			if(!!this.searchTopName && this.searchTopName != ''){
				obj.name = this.searchTopName
			}
			this.getSectionList(obj);
		},
		addTopic(){
			this.topicId = "";
			this.switchImage = true;
			this.topicDialogFormVisible = true;
			this.listShow = false;
		},
		addGame(){
			this.gameId = "";
			this.switchImage = true;
			this.gameDialogFormVisible = true;
		},
		callbackImage(){
            this.switchImage = false;
            this.topicForm.imageBig = this.get_banner_img.path;
            this.set_banner_img({});
        },
        deleteImageFn(){
        	this.$set(this.topicForm, 'imageBig', '' );
            this.switchImage = true;
        },
        callbackGameImage(){
            this.switchImage = false;
            this.gameFormForm.imageBig = this.get_banner_img.path;
            this.set_banner_img({});
        },
        deleteGameImageFn(){
        	this.$set(this.gameFormForm, 'imageBig', '' );
            this.switchImage = true;
        },
        removeLabel(i){
			this.tagsOptions.splice(i, 1)
		},
		addLabel(){
			this.$prompt('请输入标签', {
          		confirmButtonText: '确定',
          		cancelButtonText: '取消',
	        }).then(({ value }) => {
	          	this.tagsOptions.push(value)
	        }).catch(() => {
	              
	        });
		},
		cancelTopic(){
			this.topicDialogFormVisible = false;
			this.switchImage = true;
			this.tagsOptions = [];
			this.topicForm = {
				name: '',
				subName: '',
				imageBig: '',
				enable: true,
				fixedTop: true,
			};
		},
		saveTopic(name){
			this.$refs[name].validate(valid=> {
				if(valid){
					let obj = {
						name: this.topicForm.name,
						subName: this.topicForm.subName,
						imageBig: this.topicForm.imageBig,
						enable: !!this.topicForm.enable ? 1 : 0,
						fixedTop: !!this.topicForm.fixedTop ? 1 : 0,
					}
					if(!!this.tagsOptions && this.tagsOptions.length > 0){
						obj.tags = JSON.stringify(this.tagsOptions);
					}
					if(!!this.topicId && this.topicId != ''){
						obj.id = this.topicId;
						apiAdmin.h5TopicUpdate(obj).then(res => {
							if(res.data.code == '0'){
								this.cancelTopic();
								let jjj = {};
								if(!!this.searchTopName && this.searchTopName != ''){
									jjj.name = this.searchTopName
								}
								this.getSectionList(jjj);
							}
						})
					}else {	
						apiAdmin.h5TopicInsert(obj).then(res => {
							if(res.data.code == '0'){
								this.cancelTopic();
								let jjj = {};
								if(!!this.searchTopName && this.searchTopName != ''){
									jjj.name = this.searchTopName
								}
								this.getSectionList(jjj);
							}
						})
					}
				}else{
					this.$message('信息不完整')
				}
			})
		},
		cancelGame(){
			this.gameDialogFormVisible = false;
			this.switchImage = true;
			this.gameFormForm = {
				name: '',
				linkUrl: '',
				imageBig: '',
				description: '',
			};
		},
		saveGame(name){
			this.$refs[name].validate(valid=> {
				if(valid){
					let obj = {
						name: this.gameFormForm.name,
						linkUrl: this.gameFormForm.linkUrl,
						imageBig: this.gameFormForm.imageBig,
						topicId: this.topicId,
					}
					if(!!this.gameFormForm.description){
						obj.description = this.gameFormForm.description
					}
					if(!!this.gameId && this.gameId != ''){
						obj.id = this.gameId;
						apiAdmin.h5ContentUpdate(obj).then(res => {
							if(res.data.code == '0'){
								this.cancelGame();
								this.pickTopic(this.topicId);
							}
						})
					}else {	
						apiAdmin.h5ContentInsert(obj).then(res => {
							if(res.data.code == '0'){
								this.cancelGame();
								this.pickTopic(this.topicId);
							}
						})
					}
				}else{
					this.$message('信息不完整')
				}
			})
		},
		updateTopic(id){
			this.topicId = id;
			apiAdmin.h5Topicdetail({id: id}).then(res => {
				if(res.data.code == '0'){
					let data = res.data.data;
					this.topicForm = {
						name: data.name,
						subName: data.subName,
						enable: !!data.enable ? true : false,
						fixedTop: !!data.fixedTop ? true : false,
					};
					if(!!data.imageBig && data.imageBig!='null'){
						this.topicForm.imageBig = data.imageBig;
						this.switchImage = false;
					}
					try{
						this.tagsOptions = JSON.parse(data.tags);
						if(!this.tagsOptions){
							this.tagsOptions = [];
						}
					}catch(err){
						this.tagsOptions = [];
					}
					this.topicDialogFormVisible = true;
				}
			})
		},
		pickTopic(id){
			this.topicId = id;
			apiAdmin.h5ContentList({topicId: id}).then(res => {
				if(res.data.code == '0'){
					this.gameList = res.data.data;
					this.listShow = true;
				}
			})
		},
		updateGame(id){
			this.gameId = id;
			apiAdmin.h5Contentdetail({id: id}).then(res => {
				if(res.data.code == '0'){
					let data = res.data.data;
					console.log(data)
					this.gameFormForm = {
						name: data.name,
						linkUrl: data.linkUrl,
					};
					if(!!data.imageBig && data.imageBig != 'null'){
						this.gameFormForm.imageBig = data.imageBig;
						this.switchImage = false;
					}
					if(!!data.description){
						this.gameFormForm.description = data.description;
					}
					this.gameDialogFormVisible = true;
				}
			})
		},
		deleteTopic(id){
			this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
				apiAdmin.h5TopicDelete({id: id}).then(res => {
					if(res.data.code == '0'){
						let jjj = {};
						if(!!this.searchTopName && this.searchTopName != ''){
							jjj.name = this.searchTopName
						}
						this.getSectionList(jjj);
						this.gameList = [];
						this.topicId = '';
						this.gameId = '';
						this.listShow = false;
					}
				})
			}).catch(()=> {
				return
			})
		},
		deleteGame(id){
			this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
				apiAdmin.h5ContentDelete({id: id}).then(res => {
					if(res.data.code == '0'){
						this.pickTopic(this.topicId);
					}
				})
			}).catch(()=> {
				return
			})
		}
	},
	created(){
		this.getSectionList({})
	}
}
</script>

<style scoped>
.label_wrap{
	min-width: 100%;
	background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8dce5;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: inherit;
    min-height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
}
.label_item{
	box-sizing: border-box;
    margin: 3px 0 3px 6px;
    border-color: hsla(220,4%,58%,.2);
    background-color: rgba(64,158,255,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
}
</style>
