<template>
	<div class="management_wap">
        <page-wrap v-loading.body.lock="loading">
            <div slot="sideLeft" v-loading.body.sync="leftLoading">
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入礼包名称" v-model="searchGift">
                    <el-button slot="append" icon="el-icon-search"  @click.stop="searchGiftDetail"></el-button>
                </el-input>
                </div>
                <product-item
                    v-for="item in giftList"
                    :index="item.id"
                    :name="typeComputed(item.name, item.id)"
                    :showListType="true"
                    :listType="item.gameName"
                    @deleteItem="deleteItem(item.id)"
                    @click.native="pick(item.id)">
                    <img :src="(preUrl+'/'+item.gameLogo)">
                </product-item>
                <el-pagination
                    small
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    @current-change="giftHandleCurrentChange"
                    :current-page="currentpage"
                    :total="listTotal">
                </el-pagination>
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
                        <el-form  label-width="80px" :model="giftItemForm" :rules="giftItemRules" ref="giftItemForm">
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="名称" prop="name">
                                        <el-input v-model="giftItemForm.name" placeholder="请输入礼包名称"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="产品" prop="gameGift">
                                        <el-select v-model="giftItemForm.gameGift" filterable placeholder="请选择">
                                            <el-option v-for="item in gameOptions" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="兑奖码" prop="name">
                                        <el-col :span="24" v-if="!isCode">
                                            <span>兑奖码数量: {{giftItemForm.useAble}}/{{giftItemForm.sum}}</span>
                                        </el-col>
                                        <el-col :span="24">
                                            <el-button type="primary" size="mini" @click.stop="CDKInset" :disabled="!code">导入Excel</el-button>
                                            <el-button type="text"  v-if="!isCode" @click.stop="showCDKdetail">查看</el-button>
                                            <el-button type="text"  v-if="!isCode" @click.stop="exportCDK">导出</el-button>
                                        </el-col>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="9">
                                    <el-form-item label="权重" required>
                                        <el-input type="number" v-model="giftItemForm.weight"></el-input>
                                    </el-form-item>  
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="领取方式" prop="drawMethod">
                                        <el-select v-model="giftItemForm.drawMethod" placeholder="请选择">
                                            <el-option v-for="item in drawMethodOptions" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="礼包时间" required>
                                    <el-col :span="8">
                                        <el-form-item prop="beginAt">
                                            <el-date-picker type="date" placeholder="开始时间" v-model="receiveBeginAt" style="width: 100%;" :disabled="!!giftItemForm.isLong"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="line" :span="2">-</el-col>
                                    <el-col :span="8">
                                        <el-form-item prop="endAt">
                                            <el-date-picker type="date" placeholder="结束时间" v-model="receiveEndAt" style="width: 100%;" :disabled="!!giftItemForm.isLong"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="line" :span="4">
                                        <el-form-item>
                                            <el-checkbox v-model="giftItemForm.isLong">长期</el-checkbox>
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="礼包内容" prop="subName">
                                    <el-input v-model="giftItemForm.subName" type="textarea" :rows="4" placeholder="请输入礼包内容"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="12">
                                    <el-form-item label="兑换说明" prop="usageMethod">
                                        <el-input v-model="giftItemForm.usageMethod" placeholder="请输入兑换说明"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-col :span="6">
                                    <el-form-item label="是否可用" prop="enable">
                                        <el-switch v-model="giftItemForm.enable"></el-switch>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="是否置顶" prop="fixedTop">
                                        <el-switch v-model="giftItemForm.fixedTop"></el-switch>
                                    </el-form-item>
                                </el-col>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="详情图片" prop="image">
                                    <add-img-item v-if='showImg' @callbackFn='callbackFnImg'></add-img-item>
                                    <image-card :showTitle='false' v-else @deleteItem='deleteItemImg'>
                                        <img :src="(preUrl + '/' + giftItemForm.image)">
                                    </image-card>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item>
                                    <el-button type="primary" @click="submitGiftForm('giftItemForm')">保存</el-button>
                                    <!-- <el-button @click="resetGiftForm('giftItemForm')">重置</el-button> -->
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </page-wrap>
        <el-dialog title="查看兑奖码" :visible.sync="cdkDataShow">
            <p class="gridTitle">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <p>已兑换：{{used}}</p>
                    </el-col>
                    <el-col :span="6">
                        <p>未兑换：{{notUsed}}</p>
                    </el-col>
                </el-row>
            </p>
            <el-table :data="cdkData" @selection-change="cdkSelectionChange" v-loading.body.lock="cdkDataloading" stripe style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="80"></el-table-column>
                <el-table-column prop="createAtString" label="导入时间"></el-table-column>
                <el-table-column prop="cdkey" label="兑换码"></el-table-column>
                <el-table-column prop="used" label="状态"></el-table-column>
            </el-table>
            <el-button type="primary" @click="cdkDelete">批量删除</el-button>
            <div slot="footer">
                <el-pagination
                  @current-change="cdkCurrentChange"
                  :page-size="pageSize"
                  :page-sizes="[10]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="cdyTotal">
                </el-pagination>
            </div>
        </el-dialog>
	</div>
</template>

<script>
import giftApi from 'api/package'
import apiProduct from 'api/product'
import AddImgItem from 'components/common/AddImgItem'
import ImgCard from 'components/common/ImgCard'
import { mapGetters, mapActions } from 'vuex'
import ProductItem from 'components/common/ProductItem'
import { formatDate } from 'js/date'
import { Loading } from 'element-ui'
export default {
	name: "management-gift",
    components: {
        'product-item': ProductItem,
        'add-img-item': AddImgItem,
        'image-card': ImgCard
    },
	data(){
        var image = (rule, value, callback) => {
            if (!value) {
                callback(new Error('礼包图片不能为空'));
            }else{
                callback()
            }
        };
		return {
            preUrl: sessionStorage.getItem('imageUrl'),
            showImg: true,
            loading: false,
            leftLoading: false,
            cdkDataShow: false,
            cdkDataloading: false,
            cdyTotal: 0,
            cdkData: [],
            used: 0,
            notUsed: 0,
            currentpage: 1,
            cdkCurrentPage: 1,
            pageSize: 10,
            searchGift: '',
            switchTurn: false,
            code: '',
            giftList: [],
            preUrl: sessionStorage.getItem('imageUrl'),
            listTotal: 0,
            gameOptions: [],
            imgData: {},
            receiveBeginAt: '',
            receiveEndAt: '',
            drawMethodOptions: [{name: '登录', id: '0'}],
            cdkSelection: [],
            giftItemForm: {
                name: '',
                gameGift: '',
                weight: 50,
                drawMethod: '0',
                isLong: 0,
                subName: '',
                usageMethod: '',
                enable: true,
                fixedTop: true,
                image: '',
                useAble: 0,
                sum: 0
            },
            giftItemRules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'}
                ],
                gameGift: [
                    {required: true, message: '请选择产品', trigger: 'blur'}
                ],
                drawMethod: [
                    {required: true, message: '请输入领取方式', trigger: 'blur'}
                ],
                subName: [
                    {required: true, message: '请输入礼包内容', trigger: 'blur'}
                ],
                usageMethod: [
                    {required: true, message: '请输入领取方式', trigger: 'blur'}
                ],
                enable: [
                    { required: true, message: '请选择状态', trigger: 'change'}
                ],
                fixedTop: [
                    { required: true, message: '请选择状态', trigger: 'change'}
                ],
                image: [
                    { required: true, validator: image, trigger: 'blur' }
                ],
            }
        }
	},
    created(){
        this.getGiftList({pageSize: this.pageSize, page: 1});
        this.getGameOptions();
    },
    computed: {
        ...mapGetters([
            'get_banner_img',
            'get_product_list',
        ]),
        isCode(){
            if(!!this.code && this.code != ''){
                return false
            }else{
                return true
            }
        }
    },
    watch: {
        switchTurn: function(n, o){
            if(n){
            }else {
               this.resetAll('giftItemForm');
            }
        }
    },
    methods:{
        ...mapActions([
            'set_banner_img',
            'set_product_list',
        ]),
        getGiftList(obj){
            this.leftLoading = true;
            giftApi.packageList(obj).then(res => {
                if(res.data.code == '0'){
                    this.giftList = res.data.data.list;
                    this.listTotal = res.data.data.count;
                    this.leftLoading = false;
                }
            })
        },
        getGameOptions(){
            giftApi.gameList().then(res=> {
                if(res.data.code==0){
                    this.gameOptions = res.data.data;
                }
            })
        },
        typeComputed(val, id){
           return val
        },
        giftHandleCurrentChange(page){
            let obj = {
                page: page,
                pageSize: this.pageSize
            }
            if(!!this.searchGift){
                obj.packageName = this.searchGift
            }
            this.getGiftList(obj);
            this.currentpage = page;
        },
        deleteItem(id){
            this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
                giftApi.packageDelete({id: id}).then(res => {
                    if(res.data.code == '0'){
                        this.giftHandleCurrentChange(this.currentpage);
                        this.loading = false;
                        this.switchTurn = false;
                        this.set_banner_img({});
                        this.set_product_list([]);
                        this.code = '';
                    }else{
                        this.$message('当前网络不佳，请稍后重试')
                    }
                })
            }).catch(()=> {
                return
            })  
        },
        searchGiftDetail(){
            let obj = {
                page: 1,
                pageSize: this.pageSize
            }
            if(!!this.searchGift){
                obj.packageName = this.searchGift
            }
            this.getGiftList(obj);
        },
        pick(id){
            this.code = id
            this.switchTurn = true
            this.getGiftDetail({id: id});
        },
        getGiftDetail(obj){
            giftApi.packageDetail(obj).then(res => {
                if(res.data.code == '0'){
                    let a = res.data.data;
                    this.giftItemForm = {
                        name: a.name,
                        gameGift: a.gameId,
                        weight: a.weight,
                        isLong: !!a.isLong ? true : false,
                        subName: a.subName,
                        usageMethod: a.usageMethod,
                        enable: !!a.enable ? true : false,
                        fixedTop: !!a.fixedTop ? true : false,
                        useAble: a.useAble,
                        sum: a.sum
                    }
                    let beginAt;
                    let endAt;
                    if(!!a.isLong){
                        this.receiveBeginAt = '';
                        this.receiveEndAt = '';
                    }else{
                        this.receiveBeginAt = a.receiveBeginAt;
                        this.receiveEndAt = a.receiveEndAt;
                    }
                    if(!!a.image && a.image != "null"){
                        this.giftItemForm.image = a.image;
                        this.showImg = false;
                    }else{
                        this.showImg = true;
                    }
                    if(a.drawMethod == 0 || !a.drawMethod){
                        this.giftItemForm.drawMethod = '0'
                    }
                }
            })
        },
        submitGiftForm(name){
            this.$refs[name].validate(valid=> {
                if(valid){
                    let obj = {
                        name: this.giftItemForm.name,
                        gameId: this.giftItemForm.gameGift,
                        weight: this.giftItemForm.weight,
                        drawMethod: Number(this.giftItemForm.drawMethod),
                        isLong: !!this.giftItemForm.isLong ? 1 : 0,
                        subName: this.giftItemForm.subName,
                        usageMethod: this.giftItemForm.usageMethod,
                        enable: !!this.giftItemForm.enable ? 1 : 0,
                        fixedTop: !!this.giftItemForm.fixedTop ? 1 : 0,
                        image: this.giftItemForm.image,
                    }
                    if(!this.giftItemForm.isLong){
                        let eB =  new Date(this.receiveBeginAt);
                        let eD =  new Date(this.receiveEndAt);
                        obj.receiveBeginAt = formatDate(eB, 'yyyy-MM-dd hh:mm:ss');;
                        obj.receiveEndAt = formatDate(eD, 'yyyy-MM-dd hh:mm:ss');;
                    }
                    if(!!this.code && !!this.code != ''){
                        obj.id = this.code;
                        giftApi.packageUpdate(obj).then(res => {
                            if(res.data.code == '0'){
                                this.$message.success('更新成功')
                                this.switchTurn = false;
                                let jjj = {
                                    pageSize: this.pageSize,
                                    page: this.currentpage,
                                }
                                this.getGiftList(jjj);
                            }else{
                                this.$message.error('当前网络不佳，请稍后重试')
                            }
                        })
                    } else { 
                        giftApi.packageInsert(obj).then(res => {
                            if(res.data.code == '0'){
                                this.$message.success('新增成功');
                                this.resetAll('giftItemForm');
                                let jjj = {
                                    pageSize: this.pageSize,
                                    page: this.currentpage,
                                }
                                this.getGiftList(jjj);
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
        callbackFnImg() { // 图片回调
            this.showImg = false;
            this.imgData = this.get_banner_img;
            this.giftItemForm.image = this.imgData.path;
        },
        deleteItemImg(type) { // 删除图片
            this.$confirm('确定删除选中项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.showImg = true;
                this.imgData = {};
                this.giftItemForm.image = null;
            })
        },
        resetAll(formName){
            this.$refs[formName].resetFields();
            this.code = '';
            this.set_banner_img({});
            this.set_product_list([]);
            this.showImg = true;
            this.receiveBeginAt = '';
            this.receiveEndAt = '';
        },
        CDKInset(){
            let obj = document.createElement('input');
            obj.type = "file";
            obj.accept = ".xls,.xlsx";
            obj.click();
            obj.addEventListener('change', (e) => {
                let Exeflie = obj.files[0];
                let jjj = {
                    packageId: this.code,
                    gameId: this.giftItemForm.gameGift,
                    file: Exeflie
                }
                let loadingInstance1 = Loading.service({ fullscreen: true, text: '上传CDK中...' });
                giftApi.cdKeyInsert(jjj).then(res => {
                    if(res.data.code == '0'){
                        loadingInstance1.close();
                        this.$message.success('CDK上传成功')
                        this.getGiftDetail({id: this.code});
                    }else{
                        this.$message.error(res.data.userMessage)
                    }
                })
            })
        },
        cdkSelectionChange(val){
            let a = [];
            val.forEach((item) => {
                a.push(item.id)
            })
            this.cdkSelection = a;
        },
        cdkDelete(){
            let obj = {
                id: JSON.stringify(this.cdkSelection)
            };
            giftApi.cdKeysDelete(obj).then(res => {
                if(res.data.code == '0'){
                    this.cdkSelection = [];
                    this.$message.success('删除成功');
                    this.cdkCurrentChange(this.cdkCurrentPage);
                    this.getGiftDetail({id: this.code});
                }
            })
        },
        showCDKdetail(){
            let obj = {
                packageId: this.code,
                gameId: this.giftItemForm.gameGift,
                pageSize: this.pageSize
            }
            this.getCDKlist(obj)
        },
        cdkCurrentChange(page){
            let obj = {
                packageId: this.code,
                gameId: this.giftItemForm.gameGift,
                pageSize: this.pageSize,
                page: page
            }
            this.cdkCurrentPage = page;
            this.getCDKlist(obj)
        },
        getCDKlist(obj){
            this.cdkDataShow = true;
            this.cdkDataloading = true;
            giftApi.cdKeyList(obj).then(res => {
                if(res.data.code == '0'){
                    let data = res.data.data.list;
                    this.notUsed = res.data.data.notUsed;
                    this.used = res.data.data.used;
                    this.cdyTotal = res.data.data.count;
                    data.forEach(item => {
                        item.used = (!!item.used) ? '已兑换' : '未兑换';
                    })
                    this.cdkData = data;
                    this.cdkDataloading = false;
                }
            })
        },
        exportCDK(){
            let obj = {
                packageId: this.code,
                gameId: this.giftItemForm.gameGift,
            }
           giftApi.packageExport(obj).then(res=> {
                this.$confirm('是否下载？').then(()=> {
                    let u = sessionStorage.getItem('cdkeyExportUrl');
                    window.location.href = u;
                }).catch(()=> {return})
            }) 
        },
    }
}
</script>

<style scoped>
.line{
    text-align: center;
}
</style>
