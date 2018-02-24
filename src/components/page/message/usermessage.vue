<template>
<div class="user-message">
	<page-wrap>
        <div slot="sideLeft" v-loading.body.sync="leftLoading">
			<ul class="message_list">
				<li class="message_item" v-for="o in messageList" @click.stop="messageDteail(o.id)">
					<el-card :body-style="{ padding: '10px' }">
						<p class="item_title">
							{{o.name}}
						</p>
						<img :src="preUrl + '/' + o.image" class="image">
						<div style="padding: 6px;">
							<span style="font-size: 14px">{{o.subName}}</span>
							<div class="bottom clearfix">
								<el-button type="text" class="button" @click.stop="removeMessage(o.id)">删除</el-button>
								<span class="sendStatus" :class="{noSend: !o.sendState}">{{!!o.sendState ? '已发送' : '未发送'}}</span>
							</div>
						</div>
					</el-card>
				</li>
			</ul>
        </div>

        <div slot="sideRight">
			<el-card>
				<div slot="header">
					<el-switch
						active-text="详情"
						inactive-text="新增"
						off-color="#13ce66"
						v-model="switchTurn"
						:disabled = "isCode"
						>
					</el-switch>
				</div>
				<div>
					<el-form  label-width="80px" :model="messageFrom" :rules="messageFromRules" ref="messageFrom">
	                    <el-col :span="24">
	                        <el-col :span="20">
	                            <el-form-item label="标题" prop="name">
	                                <el-input v-model="messageFrom.name" placeholder="请输入标题"></el-input>
	                            </el-form-item>
	                        </el-col>
	                    </el-col>
	                    <el-col :span="24">
	                        <el-col :span="20">
	                            <el-form-item label="副标题" prop="subName">
	                                <el-input v-model="messageFrom.subName" placeholder="请输入副标题"></el-input>
	                            </el-form-item>
	                        </el-col>
	                    </el-col>
                        <el-col :span="24">
                        	<el-col :span="8">
	                            <el-form-item label="封面" prop="image">
	                                <add-img-item group="game" @callbackFn="callbackImage" v-if="switchImage"></add-img-item>
	                                <image-card :showTitle="false" v-else @deleteItem="deleteImageFn()">
	                                    <img :src="(preUrl+'/'+messageFrom.image)">
	                                </image-card>
	                            </el-form-item> 
                            </el-col>
                        </el-col>
	                    <el-col :span="24">
	                        <el-col :span="20">
	                            <el-form-item label="内容" prop="webContent">
	                                <quill-editor v-model="messageFrom.webContent"
	                                    ref="myQuillEditor"
	                                    :config="editorOption">
	                                </quill-editor>
	                                <input style="display: none" id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg">
	                            </el-form-item>
	                        </el-col>
	                    </el-col>
	                    <el-col :span="24">
	                        <el-form-item>
	                            <el-button type="primary" @click="submitmessageFrom('messageFrom')">保存</el-button>
	                            <el-button type="primary" @click="submitmessageFrom('messageFrom', 'send')">发送</el-button>
	                        </el-form-item>
	                    </el-col>
	                </el-form>
				</div>
			</el-card>
        </div>
    </page-wrap>
</div>
</template>

<script>
import apiwx from 'api/wx'
import api_resource from 'api/resource'
import ImgCard from 'components/common/ImgCard'
import AddImgItem from 'components/common/AddImgItem'
import { mapGetters, mapActions } from 'vuex'
import { Quill, quillEditor } from 'vue-quill-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
var Size = Quill.import('attributors/style/size')
var Align = Quill.import('attributors/style/align')
Size.whitelist = ['10px', '14px', '18px', '32px'];
Quill.register(Size, true)
Quill.register(Align, true)
export default {
	name: 'user-message',
	data(){
		var image = (rule, value, callback) => {
            if (!value) {
               callback(new Error('图片不能为空'));
            }else{
                callback()
            }
        };
		return {
			editorOption: {
                theme: 'snow',
                placeholder: "请输入内容",
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{'size': ['10px', '14px', '18px', '32px']}],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'align': [] }],
                        ['link', 'image'],
                        ['clean']
                    ],
                    history: {
                        delay: 1000,
                        maxStack: 50,
                        userOnly: false
                    },
                    imageDrop: true,
                    imageResize: {
                        displayStyles: {
                            backgroundColor: 'black',
                            border: 'none',
                            color: 'white'
                        },
                        modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                    }
                },
            },
			leftLoading: false,
			switchTurn: false,
			messageList: [],
			isCode: true,
			code: '',
			preUrl: sessionStorage.getItem('imageUrl'),
			switchImage: true,
			messageFrom: {
                name: '',
                webContent: '',
                image: '',
                subName: ''
            },
			messageFromRules: {
				name: [
                    {required: true, message: '请输入标题', trigger: 'blur'}
                ],
                subName: [
                    {required: true, message: '请输入副标题', trigger: 'blur'}
                ],
                webContent: [
                    {required: true, message: '请输入内容', trigger: 'blur'}
                ],
                image: [
                    { required: true, validator: image, trigger: 'blur' }
                ]
			}
		}
	},
	watch: {
		'switchTurn'(f, n){
			if(!f){
				this.code = '';
				this.isCode = true;
				this.switchImage = true;
				this.messageFrom = {
	                name: '',
	                sendState: false,
	                webContent: '',
	                image: '',
	                subName: ''
	            }
			}
		}
	},
	methods: {
		...mapActions([
            'set_banner_img',
        ]),
		getList(){
			apiwx.messageList().then(res => {
				if(res.data.code == '0'){
					this.messageList = res.data.data
				}
			})
		},
		removeMessage(i){
			let obj = {
				id: i
			};
			this.$confirm('是否删除, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning'
	        }).then(() => {
				apiwx.messageDelete(obj).then((res) => {
					if(res.data.code == '0'){
						this.getList();
						this.switchTurn = false;
						this.messageFrom = {
			                name: '',
			                sendState: false,
			                webContent: '',
			                image: '',
			                subName: ''
			            }
			            this.code = '';
						this.isCode = true;
						this.switchImage = true;
					}

				})
	        	this.$message({
	            	type: 'success',
	            	message: '删除成功!'
	          	});
	        }).catch(() => {
	         
	        });

		},
		messageDteail(i){
			this.code = i;
			this.isCode = false;
			let obj = {
				id: i
			}
			apiwx.messageDetail(obj).then((res) => {
				if(res.data.code == '0'){
                    let data = res.data.data;
                    this.messageFrom = {
                        name: data.name,
                        sendState: !!data.sendState ? true : false,
                        webContent: data.webContent,
                        image: data.image,
                        subName: data.subName
                    }
                    this.switchImage = false;
					this.switchTurn = true;
				}
			})
		},
		submitmessageFrom(name, type){
			this.$refs[name].validate(valid=> {
                if(valid){
                    let obj = {
                        name: this.messageFrom.name,
                        webContent: this.messageFrom.webContent,
                        image: this.messageFrom.image,
                        subName: this.messageFrom.subName
                    }
                    if(!!this.code && !!this.code != ''){
                        obj.id = this.code;
                    }
                    if(type == 'send'){
                    	obj.sendState = 1
                    }
                    apiwx.saveAndSendMessage(obj).then(res => {
                        if(res.data.code == '0'){
                            if(type == 'send'){
                            	this.$message.success('发送成功')
                            }else{
                            	this.$message.success('保存成功')
                            }
                            this.getList();
                            this.switchTurn = false;
							this.messageFrom = {
				                name: '',
				                sendState: false,
				                webContent: '',
				                image: '',
				                subName: ''
				            }
				            this.code = '';
							this.isCode = true;
							this.switchImage = true;
                        }else{
                            this.$message.error('当前网络不佳，请稍后重试')
                        }
                    })
                }else{
                    this.$message('信息不完整')
                }
            })
		},
		onEditorChange({ quill, html, text }) {
            this.webContent = html
        },
		imgClick () {
            var fileInput = document.getElementById('uniqueId')
            fileInput.click()
        },
        uploadImg(){
            var fileInput = document.getElementById('uniqueId')
            if(fileInput.files.length > 0){
                let Exeflie = fileInput.files[0];
                let pre = Exeflie.name.split('.')
                let name = pre[0]
                let a = {
                    name: name,
                    group: 'common',
                    file: Exeflie
                }
                api_resource.insert(a).then(res=> {
                    if(res.data.code==0){
                        let b = res.data.data
                        let u = `${this.preUrl}/${b.path}`;
                        let offset = this.editor.selection.savedRange.index;
                        this.editor.insertEmbed(offset, 'image', u);
                    }
                })
            }
        },
        callbackImage(){
            this.switchImage = false;
            this.messageFrom.image = this.get_banner_img.path;
            this.set_banner_img({})
        },
        deleteImageFn(){
            this.messageFrom.image = '',
            this.switchImage = true
        },
	},
	created(){
		this.getList()
	},
	mounted() {
        this.editor.getModule('toolbar').addHandler('image', this.imgClick);
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quillEditor
        },
        ...mapGetters([
            'get_banner_img',
        ]),
    },
    components: {
        'quill-editor': quillEditor,
        'image-card': ImgCard,
        'add-img-item': AddImgItem,
    }
}
</script>

<style scoped>
.user-message{
	
}
.message_list{
	list-style: none;
}
.message_item{
	margin-bottom: 20px;
}
.image{
	width: 100%;
}
.item_title{
	width: 100%;
	text-align: center;
	padding: 8px;
	box-sizing: border-box;
}
.sendStatus{
	padding-left: 15px;
	font-size: 14px;
	color: #34dbbf;
}
.noSend{
	color: red;
}
</style>