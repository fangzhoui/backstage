<template>
<div>
    <!-- 添加模块 -->
    <div class="add_item_pane" v-if="addItemPane">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form label-width="80px" :model="addItemForm" :rules="addItemRules" ref="addItemForm">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="addItemForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="权重" prop="weight">
                        <el-input type='number' v-model="addItemForm.weight"></el-input>
                    </el-form-item>
                    <!-- 链接 -->
                    <el-form-item label="链接">
                        <el-input v-model="addItemForm.action"></el-input>
                    </el-form-item>
                    <el-form-item label="安卓链接">
                        <el-input v-model="addItemForm.actionAndroid"></el-input>
                    </el-form-item>
                    <el-form-item label="ios链接">
                        <el-input v-model="addItemForm.actionIOS"></el-input>
                    </el-form-item>

                    <el-form-item label="是否上线">
                        <el-switch v-model="addItemForm.enable" :on-value='1' :off-value='0' on-text='上线' off-text='下架'></el-switch>
                    </el-form-item>
                </el-form>
                <div class="upload_btn_pane">
                    <el-button type="primary" @click.native="submitForm('addItemForm')">提交保存</el-button>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="img_upload_pane">
                    <add-img-item v-if='showImg' @callbackFn='callbackFnImg'></add-img-item>
                    <image-card :showTitle='false' v-else @deleteItem='deleteItemImg'>
                        <img :src="(preUrl+'/'+imgData.path)">
                    </image-card>
                </div>
            </el-col>
        </el-row>
    </div>
    <!-- 添加模块结束 -->
</div>
</template>



<script>
import UploadImgItem from 'components/common/UploadImgItem'
import AddImgItem from 'components/common/AddImgItem'
import ImgCard from 'components/common/ImgCard'
import api from 'api/active'
import api_res from 'api/resource'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'web-banner-add-item',
    components: {
        'upload-img-item': UploadImgItem,
        'add-img-item': AddImgItem,
        'image-card': ImgCard
    },
    data() {
        return {
            showImg: true,
            preUrl: sessionStorage.getItem('imageUrl'),
            imgData: {},
            btnData: {},
            addItemForm: {
                name: '',
                action: '',
                weight: null,
                actionAndroid: '',
                actionIOS: '',
                enable: 1,
            },
            addItemRules: {
                name: [{
                    required: true,
                    message: '请输入名称',
                    trigger: 'blur'
                }],
                action: [{
                    required: true,
                    message: '请输入链接内容',
                    trigger: 'blur'
                }],
                weight: [{
                    required: true,
                    message: '请输入权重',
                    trigger: 'blur'
                }],
            },
        }
    },
    props: {
        addItemPane: {
            type: Boolean,
            default: true,
        },
        section: {
            type: String,
            default: ''
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
        callbackFnImg() {
            this.showImg = false
            this.imgData = this.get_banner_img
        },
        deleteItemImg() {
            api_res.delete({
                id: this.imgData.id,
                key: this.imgData.path
            }).then(res => {
                if (res.data.code == 0) {
                    this.imgData = {}
                    this.showImg = true
                } else {
                    this.$message('当前网络不佳，请重试')
                }
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let imgurl = this.get_banner_img
                    if (!!this.imgData.path) {
                        let obj = {
                            name: this.addItemForm.name,
                            weight: this.addItemForm.weight,
                            action: this.addItemForm.action,
                            actionIOS: this.addItemForm.actionIOS,
                            actionAndroid: this.addItemForm.actionAndroid,
                            fromKey: this.section,
                            image: this.imgData.path,
                            enable: this.addItemForm.enable,
                        }
                        if (!!this.btnData.path) {
                            let btnobj = {
                                btnImage: this.btnData.path
                            }
                            Object.assign(obj, btnobj)
                        }
                        api.itemInsert(obj).then(res => {
                            if (res.data.code == 0) {
                                this.addItemForm = {
                                    name: '',
                                    weight: '',
                                    action: '',
                                    actionIOS: '',
                                    actionAndroid: '',
									enable: 0,
                                }
                                this.set_banner_img({})
                                this.$emit('hidePane')
                                this.$message.success('新增成功')
                                this.showImg = true
                            }
                        })
                    } else {
                        this.$message.error('上传图片不能为空')
                        return
                    }
                } else {
                    return false;
                }
            });
        },

    }
}
</script>



<style scoped>
.add_item_pane {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
}

.upload_btn_pane {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
