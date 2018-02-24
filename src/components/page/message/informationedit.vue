<template>
	<div class="information_edit">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 资讯管理</el-breadcrumb-item>
                <el-breadcrumb-item>资讯编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <el-form  label-width="80px" :model="informationForm" :rules="informationRules" ref="informationForm">
                    <el-col :span="24">
                        <el-col :span="20">
                            <el-form-item label="标题" prop="name">
                                <el-input v-model="informationForm.name" placeholder="请输入标题"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="20">
                            <el-form-item label="副标题" prop="subName">
                                <el-input v-model="informationForm.subName" placeholder="请输入副标题"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="12">
                            <el-form-item label="作者" prop="author">
                                <el-input v-model="informationForm.author" placeholder="请输入作者"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="8">
                            <el-form-item label="时间" required>
                                <el-date-picker v-model="createAt" type="datetime" placeholder="选择日期时间">
                                </el-date-picker> 
                            </el-form-item>
                            <el-form-item label="分类" required>
                                <el-select v-model="informationForm.linkType" placeholder="请选择类型">
                                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select> 
                            </el-form-item>
                            <el-form-item label="是否有效" required>
                                <el-switch v-model="informationForm.enable">
                                </el-switch> 
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="icon"  prop="imageLogo">
                                <add-img-item group="game" @callbackFn="callbackIcon" v-if="switchIcon"></add-img-item>
                                <image-card :showTitle="false" v-else @deleteItem="deleteLogoFn()">
                                    <img :src="(preUrl+'/'+informationForm.imageLogo)">
                                </image-card>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="封面" prop="imageBig">
                                <add-img-item group="game" @callbackFn="callbackImage" v-if="switchImage"></add-img-item>
                                <image-card :showTitle="false" v-else @deleteItem="deleteImageFn()">
                                    <img :src="(preUrl+'/'+informationForm.imageBig)">
                                </image-card>
                            </el-form-item> 
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-col :span="20" v-show="informationForm.linkType == '5'">
                            <el-form-item label="内容" required>
                                <quill-editor v-model="informationForm.content"
                                    ref="myQuillEditor"
                                    :config="editorOption">
                                </quill-editor>
                                <input style="display: none" id="uniqueId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg">
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" v-show="informationForm.linkType != '0' && informationForm.linkType != '5'">
                            <el-form-item label="链接" required>
                                <el-input v-model="informationForm.linkUrl" placeholder="请输入作者"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="20" v-show="informationForm.linkType == '0'">
                            <el-form-item label="游戏" required>
                                <el-select v-model="informationForm.linkId" placeholder="请选择类型">
                                    <el-option v-for="item in gameList" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="submitInformationForm('informationForm')">保存</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-card>
        </div>
	</div>
</template>

<script>
import commonApi from 'api/common'
import api_resource from 'api/resource'
import ImgCard from 'components/common/ImgCard'
import AddImgItem from 'components/common/AddImgItem'
import { formatDate } from 'js/date'
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
	name: "information-edit",
	data(){
        var imageLogofn = (rule, value, callback) => {
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
            code: '',
            preUrl: sessionStorage.getItem('imageUrl'),
            createAt: '',
            switchIcon: true,
            switchImage: true,
            gameList: [],
            typeOptions: [{value: '0', label: '游戏'}, {value: '1', label: '直播'}, {value: '2', label: '电商'}, {value: '3', label: '小说'}, {value: '4', label: '漫画'}, {value: '5', label: '文章'}, {value: '6', label: 'H5游戏'}],
            informationForm: {
                name: '',
                subName: '',
                author: '',
                enable: true,
                linkType: '0',
                content: '',
                linkUrl: '',
                linkId : '',
                imageBig: '',
                imageLogo: '',
            },
            informationRules: {
                name: [
                    {required: true, message: '请输入标题', trigger: 'blur'}
                ],
                subName: [
                    {required: true, message: '请输入副标题', trigger: 'blur'}
                ],
                author: [
                    {required: true, message: '请输入作者', trigger: 'blur'}
                ],
                // content: [
                //     {required: true, message: '请输入内容', trigger: 'blur'}
                // ],
                // linkUrl: [
                //     {required: true, message: '请输入链接', trigger: 'blur'}
                // ],
                // linkId: [
                //     {required: true, message: '请选择游戏', trigger: 'blur, change'}
                // ],
                imageLogo: [
                    { required: true, validator: imageLogofn, trigger: 'blur' }
                ],
                imageBig: [
                    { required: true, validator: imageLogofn, trigger: 'blur' }
                ]
            },
        }
	},
    created(){
        let id = this.$route.query.id;
        if(!!id){
            this.code = id;
            this.getArticDetail({id: id});
        } else {
            this.createAt = new Date();
        }
        this.getGameList();
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
    methods: {
        ...mapActions([
            'set_banner_img',
        ]),
        getArticDetail(obj){
            commonApi.articleDetail(obj).then(res => {
                if(res.data.code == '0'){
                    console.log(res)
                    let data = res.data.data;
                    this.informationForm = {
                        name: data.name,
                        author: data.author,
                        enable: !!data.enable ? true : false,
                        linkType: data.linkType.toString(),
                        content: data.content,
                        linkUrl: data.linkUrl,
                        linkId: data.linkId,
                        imageBig: data.imageBig,
                        imageLogo: data.imageLogo,
                        subName: data.subName
                    }
                    this.switchIcon = false;
                    this.switchImage = false;
                    this.createAt = data.createAt;
                }
            })
        },
        getGameList(){
            commonApi.gameList().then((res) => {
                if(res.data.code == '0'){
                    this.gameList = res.data.data;
                }
            })
        },
        submitInformationForm(name){
            this.$refs[name].validate(valid=> {
                if(valid){
                    let obj = {
                        name: this.informationForm.name,
                        author: this.informationForm.author,
                        linkType: Number(this.informationForm.linkType),
                        enable: !!this.informationForm.enable ? 1 : 0,
                        imageLogo: this.informationForm.imageLogo,
                        imageBig: this.informationForm.imageBig,
                        subName: this.informationForm.subName
                    }
                    if(this.informationForm.linkType == '0'){
                        obj.linkId = this.informationForm.linkId;
                    }else if(this.informationForm.linkType == '5'){
                        obj.content = this.informationForm.content;
                    }else{
                        obj.linkUrl = this.informationForm.linkUrl;
                    }
                    let TcreatAt =  new Date(this.createAt);
                    obj.createAt = formatDate(TcreatAt, 'yyyy-MM-dd hh:mm:ss');
                    if(!!this.code && !!this.code != ''){
                        obj.id = this.code;
                        commonApi.articleUpdate(obj).then(res => {
                            if(res.data.code == '0'){
                                this.$message.success('更新成功')
                                this.$router.push({path: '/informationlist'})
                            }else{
                                this.$message.error('当前网络不佳，请稍后重试')
                            }
                        })
                    } else { 
                        commonApi.articleInsert(obj).then(res => {
                            if(res.data.code == '0'){
                                this.$message.success('新增成功');
                                this.$router.push({path: '/informationlist'})
                            }else{
                                this.$message.error('当前网络不佳，请稍后重试')
                            }
                        })
                    }
                }else{
                    this.$message('信息不完整')
                }
            })
        },
        onEditorChange({ quill, html, text }) {
            this.content = html
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
        imgClick () {
            var fileInput = document.getElementById('uniqueId')
            fileInput.click()
        },
        callbackIcon(){
            this.switchIcon = false;
            this.informationForm.imageLogo = this.get_banner_img.path;
            this.set_banner_img({})
        },
        callbackImage(){
            this.switchImage = false;
            this.informationForm.imageBig = this.get_banner_img.path;
            this.set_banner_img({})
        },
        deleteLogoFn(){
            this.informationForm.imageLogo = '',
            this.switchIcon = true
        },
        deleteImageFn(){
            this.informationForm.imageBig = '',
            this.switchImage = true
        },
    },
    components: {
        'quill-editor': quillEditor,
        'image-card': ImgCard,
        'add-img-item': AddImgItem,
    }
}
</script>

<style scoped>
.history_body {
    margin-top: 20px;
}
</style>
