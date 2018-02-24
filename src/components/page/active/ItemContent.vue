<template>
<div class="table_wrap">
    <table>
        <tr class="table_header_wrap">
            <th class="table_header table_img"><span>图片</span></th>
            <th class="table_header table_name"><span>名称</span></th>
            <th class="table_header table_weight"><span>权重</span></th>
            <th class="table_header table_link"><span>链接</span></th>
            <th class="table_header table_action"><span>操作</span></th>
        </tr>
        <tr v-for="(item, index) in bannerList" :key="index">
            <td class="body table_img">
                <img :src="(preUrl+'/'+item.image)">
            </td>
            <td class="body table_name">{{item.name}}</td>
            <td class="body table_weight">{{item.weight}}</td>
            <td class="body table_link">{{urlFn(item)}}</td>
            <td class="body table_action">
                <el-button size="mini" @click.native="refreshFn(item)">修改</el-button>
                <el-button size="mini" @click.native="deleteItemFn(item.id)">删除</el-button>
                <switch-turn :state="(item.enable==0?false:true)"></switch-turn>
            </td>
        </tr>
    </table>

    <el-dialog title="修改banner内容" :visible.sync="dialogVisible">
        <div>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form label-width="80px" :model="saveItemForm" :rules="saveItemRules" ref="saveItemForm">
                        <el-form-item label="名称" prop="name">
                            <el-input v-model="saveItemForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="权重" prop="order">
                            <el-input type='number' v-model="saveItemForm.weight"></el-input>
                        </el-form-item>
												<!-- 链接 -->
												<el-form-item label="链接">
                            <el-input v-model="saveItemForm.action"></el-input>
                        </el-form-item>
												<el-form-item label="安卓链接">
                            <el-input v-model="saveItemForm.actionAndroid"></el-input>
                        </el-form-item>
												<el-form-item label="ios链接">
                            <el-input v-model="saveItemForm.actionIOS"></el-input>
                        </el-form-item>
                        <el-form-item label="是否上线">
                            <el-switch v-model="saveItemForm.enable" on-text='上线' off-text='下架'></el-switch>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <div class="img_upload_pane">
                        <span>产品</span>
                        <add-img-item v-if='showImgupload' @callbackFn='callbackFnImg'></add-img-item>
                        <image-card :showTitle='false' v-else @deleteItem='deleteItemImg'>
                            <img :src="(preUrl+'/'+imgData.path)">
                        </image-card>
                    </div>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
		    	<el-button @click="dialogVisible=false">取 消</el-button>
		    	<el-button type="primary" @click="saveBtnFn">确 定</el-button>
		  	</span>
    </el-dialog>
</div>
</template>



<script>
import api from 'api/active'
import AddImgItem from 'components/common/AddImgItem'
import ImgCard from 'components/common/ImgCard'
import UploadImgItem from 'components/common/UploadImgItem'
import { mapGetters, mapActions } from 'vuex'
import SwitchTurn from 'components/common/SwitchTurn'
import common from 'js/common'

export default {
    name: 'web-banner-content',
    components: {
        'image-card': ImgCard,
        'add-img-item': AddImgItem,
        'upload-img-item': UploadImgItem,
        SwitchTurn,
    },
    data() {
        return {
            showImgupload: false,
            preUrl: sessionStorage.getItem('imageUrl'),
            imgData: {},
            bannerList: [],
            dialogVisible: false,
            itemObj: {},
            saveItemForm: {
                name: '',
                action: '',
                weight: null,
                actionAndroid: '',
                actionIOS: '',
                enable: true,
            },
            saveItemRules: {
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
            imageUrl: '',
            showImg: false
        }
    },
    props: {
        section: {
            type: String,
            default: ''
        },
        update: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapGetters([
            'get_banner_img',
        ]),

    },
    watch: {
        section: function(n, o) {
            this.getList()
        },
        update: function(n, o) {
            if (n) {
                this.getList()
            } else {
                return
            }
        }
    },
    methods: {
        urlFn: function(val) {
            let value = val.action
            if (!common.isNull(val.action) || (!common.isNull(val.actionAndroid) && !common.isNull(val.actionIOS))) {
                value = `【全部】${val.action}`
            } else {
                if (!common.isNull(val.actionAndroid)) {
                    // 仅安卓
                    value = `【仅安卓】${val.actionAndroid}`
                } else if (!common.isNull(val.actionIOS)) {
                    // 仅ios
                    value = `【仅ios】${val.actionIOS}`
                } else {
                    value = `【无效】${val.action}`
                }
            }
            return value
        },
        getList() {
            api.itemList({
                fromKey: this.section
            }).then(res => {
                this.bannerList = res.data.data
            })
        },
        deleteItemFn(id) {
            this.$confirm('删除后将不能恢复，是否确定').then(() => {
                api.itemDelete({
                    id: id
                }).then(res => {
                    if (res.data.code == 0) {
                        this.getList()
                        this.$message.success('更新成功')
                    } else {
                        this.$message.error('当前网络不佳，请稍后重试')
                    }
                })
            }).catch(() => {
                return
            })

        },
        refreshFn(item) {
            this.showImg = true
            this.dialogVisible = true
            this.itemObj = item
            this.saveItemForm = {
                name: item.name,
                weight: item.weight,
                action: item.action,
                enable: !!item.enable ? true : false,
                actionIOS: item.actionIOS,
                actionAndroid: item.actionAndroid,
            }
            this.imgData = {
                path: item.image
            }
        },
        callbackFnImg() {
            this.showImgupload = false
            this.imgData = this.get_banner_img
        },
        deleteItemImg() {
            this.showImgupload = true
            this.imgData = {}
        },
        saveBtnFn() {
            if (this.showImg) {
                let obj = {
                    id: this.itemObj.id,
                    name: this.saveItemForm.name,
                    weight: this.saveItemForm.weight,
                    action: this.saveItemForm.action,
					actionIOS: this.saveItemForm.actionIOS,
		            actionAndroid: this.saveItemForm.actionAndroid,
                    fromKey: this.section,
                    image: this.imgData.path,
                    enable: !!this.saveItemForm.enable ? 1 : 0,
                }
                api.itemInsert(obj).then(res => {
                    if (res.data.code == 0) {
                        this.$message.success('更新成功')
                        this.getList()
                        this.dialogVisible = false
                    } else {
                        this.$message.info('当前网络不佳，请稍后重试')
                        this.dialogVisible = false
                    }
                })
            } else {
                if (!!this.get_banner_img.path) {
                    let obj = {
                        id: this.itemObj.id,
                        name: this.saveItemForm.name,
                        weight: this.saveItemForm.weight,
                        action: this.saveItemForm.action,
						actionIOS: this.saveItemForm.actionIOS,
				        actionAndroid: this.saveItemForm.actionAndroid,
                        fromKey: this.section,
                        image: this.imgData.path,
                        enable: !!this.saveItemForm.enable ? 1 : 0,
                    }

                    api.itemInsert(obj).then(res => {
                        if (res.data.code == 0) {
                            this.$message.success('更新成功')
                            this.getList()
                            this.dialogVisible = false
                        } else {
                            this.$message.info('当前网络不佳，请稍后重试')
                            this.dialogVisible = false
                        }
                    })
                } else {
                    this.$message.error('还未选中图片，请选择')
                    return
                }
            }
        }
    },
    mounted() {
        this.getList()
    }
}
</script>



<style scoped>
.table_wrap {
    width: 100%;
}

table {
    width: 100%;
}

tr {
    width: 100%;
    display: flex;
    background: #eef1f6;
}

td {
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    padding: 5px;
    font-size: 13px;
    flex-grow: 0;
}

.table_header_wrap {
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: 40px;
    width: 100%;
}

.table_header {
    font-size: 12px;
    font-weight: lighter;
    display: flex;
    align-items: center;
    padding: 5px 5px;
}

.body {
    overflow: hidden;
}

.table_img {
    width: 20%;
}

.table_img img {
    width: 80%;
    height: 60px;
}

.table_name {
    width: 10%;
}

.table_weight {
    width: 10%
}

.table_link {
    width: 35%;
    max-width: 280px;
    overflow: hidden;
    white-space: nowrap;
}

.table_action {
    width: 25%;
}
</style>
