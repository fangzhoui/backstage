<template>
    <div class="goodsDetail_page">
        <el-form ref="goodsDetail" :model="goodsDetailFrom" :rules="rules" label-width="100px">
            <el-col :span="24">
                <div class="title">商品信息</div>
            </el-col>
            <el-form-item label="类型：" prop="type">
                <el-col :span="8">
                    <el-select v-model="goodsDetailFrom.type" placeholder="请选择商品类型">
                        <el-option v-for="(item, index) in type" :label="item.name" :value="item.type"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label=""  v-if="this.id != '' && goodsDetailFrom.type == 1 || goodsDetailFrom.type == '虚拟'">
                <el-col :span="4">
                    <el-button type="primary" @click.native="upExcel">导入Excel</el-button>
                    <input class="upExcel" ref="upExcel" type="file" accept=".csv, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                </el-col>
                <el-col :span="8">
                    <el-button type="text"  @click="cdkListShow = true">查看</el-button>
                    <el-button type="text" @click="exportFn">导出</el-button>
                </el-col>
            </el-form-item> 
            <el-form-item label="分类：" prop="position">
                <el-col :span="8">
                    <el-select v-model="goodsDetailFrom.position" placeholder="请选择商品分类">
                     <el-option v-for="(item, index) in position" :label="item.name" :value="item.type"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="名称：" prop="name">
                <el-col :span="8">
                    <el-input v-model="goodsDetailFrom.name" placeholder="请输入商品名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="排序：" prop="weight">
                <el-col :span="8">
                    <el-input type="Number" :maxlength=3 v-model="goodsDetailFrom.weight" placeholder="数字越大排序越靠前"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="单品数：">
                <el-col :span="8">
                    <el-input v-model="goodsDetailFrom.quantity" placeholder="请输入单品数目"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="单品单位：" prop="unit">
                <el-col :span="8">
                    <el-input v-model="goodsDetailFrom.unit" placeholder="请输入单品单位"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="说明：">
                <el-col :span="8">
                    <el-input type="textarea" :rows="3" v-model="goodsDetailFrom.description" placeholder="请输入商品描述"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="图片：" prop="icon">
                <el-col :span="8">
                    <add-img-item v-if='showImg' @callbackFn='callbackFnImg(0)'></add-img-item>
                    <image-card :showTitle='false' v-else @deleteItem='deleteItemImg(0)'>
                        <img :src="(preUrl+'/'+goodsDetailFrom.icon)">
                    </image-card>
                </el-col>
            </el-form-item>
            <el-form-item label="背景图：" prop="backImage">
                <el-col :span="8">
                    <add-img-item v-if='showbackImage' @callbackFn='callbackFnImg(1)'></add-img-item>
                    <image-card :showTitle='false' v-else @deleteItem='deleteItemImg(1)'>
                        <img :src="(preUrl+'/'+goodsDetailFrom.backImage)">
                    </image-card>
                </el-col>
            </el-form-item>
            <el-col :span="24">
                <div class="title">交易信息</div>
            </el-col>
            <el-form-item label="商品库存：" prop="stock">
                <el-col :span="8">
                    <el-input type="Number" v-model="goodsDetailFrom.stock" placeholder="请输入库存"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="兑换限制：" prop="once">
                <el-col :span="16">
                    <el-radio-group v-model="goodsDetailFrom.once">
                        <el-radio label="不限制"></el-radio>
                        <el-radio label="1次">
                            <!-- <el-input v-model="once" :disabled="goodsDetailFrom.once != '限制'"></el-input> -->
                        </el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="开始时间：">
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="选择日期" v-model="goodsDetailFrom.beginAt" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="结束时间：">
                <el-col :span="8">
                    <el-date-picker type="date" placeholder="选择日期" v-model="goodsDetailFrom.endAt" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="所需积分：" prop="needScoreCount">
                <el-col :span="8">
                    <el-input type="Number" v-model="goodsDetailFrom.needScoreCount" placeholder="请输入兑换商品所需的积分"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="状态：" prop="enable">
                <el-col :span="16">
                    <el-radio-group v-model="goodsDetailFrom.enable">
                        <el-radio label="0">下架</el-radio>
                        <el-radio label="1">上架</el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <!-- 其他信息 -->
            <el-form-item label="精品推荐">
                <el-switch v-model="goodsDetailFrom.isTop"></el-switch>
            </el-form-item>
            <el-form-item label="热门推荐">
                <el-switch v-model="goodsDetailFrom.isHot"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="goodsSubmitForm('goodsDetail')">提交</el-button>
                <el-button @click="goodsResetForm()">取消</el-button>
                <el-button @click="goodsRemove()">删除</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="查看兑换码" :visible.sync="cdkListShow">
            <div>
               <el-col :span="4">
                    已兑换: {{used}}
               </el-col>
               <el-col :span="4">
                    未兑换: {{notUsed}}
               </el-col>  
            </div>
            <el-table :data="cdkList" @selection-change="cdkSelectionChange" stripe style="width: 100%">
                <el-table-column type="selection" width="80"></el-table-column>
                <el-table-column type="index" label="序号" width="100"></el-table-column>
                <el-table-column property="createAtString" label="倒入时间" width="200"></el-table-column>
                <el-table-column property="cdkey" label="兑换码" width="200"></el-table-column>
                <el-table-column property="used" label="状态"></el-table-column>
            </el-table>
            <div class="pagenation_pane">
                <el-pagination
                  @size-change="cdkSizeChange"
                  @current-change="cdkCurrentChange"
                  :page-sizes="[10]"
                  :page-size="pageSize"
                  :current-page="currentpage"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="dataTotal">
                </el-pagination>
            </div>
            <div class="btn_wrap">
                <el-button type="primary" @click="cdkDelect">批量删除</el-button>
            </div>
        </el-dialog>
    </div>
</template>



<script>
import api_integral from 'api/integral'
import AddImgItem from 'components/common/AddImgItem'
import ImgCard from 'components/common/ImgCard'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'goods-detail',
    data(){
        var icon = (rule, value, callback) => {
            if (!value) {
                callback(new Error('商品图片不能为空'));
            }else{
                callback()
            }
        };
        var backImage = (rule, value, callback) => {
            if (!value) {
                callback(new Error('背景图片不能为空'));
            }else{
                callback()
            }
        };
        var weight = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('排序不能为空'));
            }
            setTimeout(() => {
                if (value < 0) {
                  callback(new Error('请输入大于0的整数'));
                } else {
                  callback();
                }
            }, 500);
        };
        var stock = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('库存不能为空'));
            }
            setTimeout(() => {
                if (value < 0) {
                  callback(new Error('请输入大于0的整数'));
                } else {
                  callback();
                }
            }, 500);
        };
        var needScoreCount = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('兑换积分不能为空'));
            }
            setTimeout(() => {
                if (value < 0) {
                  callback(new Error('请输入大于0的整数'));
                } else {
                  callback();
                }
            }, 500);
        };
        return{
            preUrl: sessionStorage.getItem('imageUrl'),
            showImg: true,
            showbackImage: true,
            cdkListShow: false, // 礼包列表
            id: '',
            type: [{name: '流量', type: '0'}, {name: '虚拟', type: '1'}, {name: '实物', type: '2'}, {name: '谢谢惠顾', type: '3'}],
            position: [{name:'销售类', type: '0'}, {name:'抽奖类', type: '1'}],
            goodsDetailFrom: {
                type: null,
                position: null,
                name: '',
                weight: null,
                quantity: null,
                unit: null,
                description: null,
                icon: null,
                backImage: null,
                stock: null,
                once: null,
                beginAt: null,
                endAt: null,
                needScoreCount: null,
                enable: null,
                isTop: false,
                isHot: false
            },
            cdkList: [], // dia
            pageSize: 10, //分页10
            currentpage: 1,
            dataTotal: null, //总条数
            notUsed: null, // 未使用
            used: null, // 已使用
            page: '',
            multCdkList: [],
            rules: {
                type: [
                    { required: true, message: '请选择商品类型', trigger: 'change' }
                ],
                position: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                ],
                unit: [
                    {required: true, message: '请输入单位', trigger: 'blur'}
                ],
                weight: [
                    {required: true, validator: weight, trigger: 'blur'}
                ],
                stock: [
                    {required: true, validator: stock, trigger: 'blur'}
                ],
                needScoreCount: [
                    {required: true, validator: needScoreCount, trigger: 'blur'}
                ],
                enable: [
                    { required: true, message: '确认商品是否上架', trigger: 'change' }
                ],
                once: [
                    { required: true, message: '请选择商品兑换次数', trigger: 'change' }
                ],
                icon: [
                    { required: true, validator: icon, trigger: 'blur' }
                ],
                backImage: [
                    { required: true, validator: backImage, trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        'cdkListShow'(f, n){
            if(f){
                let obj = {
                    pageSize: this.pageSize,
                    commodityId: Number(this.id)
                };
                api_integral.cdKeyList(obj).then((res) => {                   
                    if(res.data.code == '0'){
                        this.cdkList = res.data.data.list;
                        this.cdkList.forEach((item) => {
                            (item.used == 0) ? item.used = '未兑换' : '已兑换';
                            item.createAtString = item.createAtString.substring(0, 10);
                        })
                        this.dataTotal = res.data.data.count;
                        this.used = res.data.data.used;
                        this.notUsed = res.data.data.notUsed;
                    }else{
                        this.$message.error(res.data.message);
                    }
                }).catch(() => {

                })
            }
        }
    },
    mounted(){
        if(this.$route.query.id){
            this.id = this.$route.query.id;
            let obj = {
                id: this.id
            }
            this.getGoodsDetail(obj);
        }
    },
    computed: {
        ...mapGetters([
            'get_banner_img',
        ]),
    },
    methods: {
        getGoodsDetail(id){
            let _self = this;
            api_integral.goodsDetail(id).then((res) => {
                if(res.data.code == '0'){
                    let mes = res.data.data;
                    _self.goodsDetailFrom.id = _self.id;
                    switch(mes.type){
                        case 0:
                            _self.goodsDetailFrom.type = '流量';
                            break;
                        case 1:
                            _self.goodsDetailFrom.type = '虚拟';
                            break;
                        case 2:
                            _self.goodsDetailFrom.type = '实物';
                            break;
                        case 3:
                            _self.goodsDetailFrom.type = '谢谢惠顾';
                            break;
                    }
                    let beginAt;
                    let endAt;
                    if(mes.beginAt){
                        beginAt = new Date();
                        beginAt.setTime(Number(mes.beginAt));
                        beginAt.toDateString();
                    }
                    if(mes.endAt){
                        endAt = new Date();
                        endAt.setTime(Number(mes.endAt));
                        endAt.toDateString();
                    }

                    if(mes.once){
                        _self.goodsDetailFrom.once = '1次';
                    }else{
                        _self.goodsDetailFrom.once = '不限制';
                    }
                    _self.goodsDetailFrom.position = (mes.position==0)? '销售类' : '抽奖类';
                    _self.goodsDetailFrom.name = mes.name;
                    _self.goodsDetailFrom.weight = mes.weight;
                    _self.goodsDetailFrom.quantity = mes.quantity;
                    _self.goodsDetailFrom.unit = mes.unit;
                    _self.goodsDetailFrom.description = mes.description;
                    _self.goodsDetailFrom.icon = mes.icon;
                    _self.goodsDetailFrom.backImage = mes.backImage;
                    _self.goodsDetailFrom.stock = mes.stock;
                    _self.goodsDetailFrom.beginAt = beginAt;
                    _self.goodsDetailFrom.endAt = endAt;
                    _self.goodsDetailFrom.needScoreCount = mes.needScoreCount;
                    _self.goodsDetailFrom.enable = mes.enable.toString();
                    if(!!mes.isHot){
                        _self.goodsDetailFrom.isHot = true;
                    }else{
                        _self.goodsDetailFrom.isHot = false;
                    }
                    if(!!mes.isTop){
                        _self.goodsDetailFrom.isTop = true;
                    }else{
                        _self.goodsDetailFrom.isTop = false;
                    }
                    if( _self.goodsDetailFrom.icon != '' && _self.goodsDetailFrom.icon != null && _self.goodsDetailFrom.icon != 'null'){
                        _self.showImg = false;
                    }else{
                        _self.showImg = true;
                    }
                    if( _self.goodsDetailFrom.backImage != '' && _self.goodsDetailFrom.backImage != null && _self.goodsDetailFrom.backImage != 'null' ){
                        _self.showbackImage = false;
                    }else{
                        _self.showbackImage = true;
                    }
                }
            })
        },
        callbackFnImg(type) { // 图片回调
            if(type == 1){
                this.showbackImage = false;
                this.imgData2 = this.get_banner_img;
                this.goodsDetailFrom.backImage = this.imgData2.path;
            }else{
                this.showImg = false;
                this.imgData1 = this.get_banner_img;
                this.goodsDetailFrom.icon = this.imgData1.path;
            }
        },
        deleteItemImg(type) { // 删除图片
            this.$confirm('确定删除选中项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(type == 1){
                    this.showbackImage = true;
                    this.imgData2 = {};
                    this.goodsDetailFrom.backImage = null;
                }else{
                    this.showImg = true;
                    this.imgData1 = {};
                    this.goodsDetailFrom.icon = null;
                }
            })
        },
        goodsSubmitForm(obj){ //提交
            let _self = this;
            this.$refs[obj].validate((valid) => {
                if (valid) {
                    let obj = {};
                    if(_self.goodsDetailFrom.once == '不限制'){
                        obj.once = 0;
                    }else{
                        obj.once = 1;
                    }
                    if(!!_self.goodsDetailFrom.beginAt){
                        obj.beginAt = Date.parse(new Date(_self.goodsDetailFrom.beginAt)).toString();
                    }
                    if(!!_self.goodsDetailFrom.endAt){
                        obj.endAt = Date.parse(new Date(_self.goodsDetailFrom.endAt)).toString();
                    }
                    if(!!_self.goodsDetailFrom.quantity){
                        obj.quantity = Number(_self.goodsDetailFrom.quantity);
                    }
                    if(!!_self.goodsDetailFrom.description){
                        obj.description = _self.goodsDetailFrom.description;
                    }
                    if(_self.id != ''){
                        obj.id = Number(_self.id);
                    }
                    if(_self.goodsDetailFrom.type == '流量'){
                        obj.type = 0;
                    }else if(_self.goodsDetailFrom.type == '虚拟'){
                        obj.type = 1;
                    }else if(_self.goodsDetailFrom.type == '实物'){
                        obj.type = 2;
                    }else if(_self.goodsDetailFrom.type == '谢谢惠顾'){
                        obj.type = 3;
                    }else{
                       obj.type = Number(_self.goodsDetailFrom.type) 
                    }

                    if(_self.goodsDetailFrom.position == '销售类'){
                        obj.position = 0;
                    }else if(_self.goodsDetailFrom.position == '抽奖类'){
                        obj.position = 1;
                    }else{
                       obj.position = Number(_self.goodsDetailFrom.position) 
                    }

                    obj.name = _self.goodsDetailFrom.name;
                    obj.icon = _self.goodsDetailFrom.icon;
                    obj.needScoreCount = Number(_self.goodsDetailFrom.needScoreCount);
                    obj.stock = Number(_self.goodsDetailFrom.stock);
                    obj.enable = Number(this.goodsDetailFrom.enable);
                    obj.weight = Number(_self.goodsDetailFrom.weight);
                    obj.unit = _self.goodsDetailFrom.unit;
                    obj.backImage = _self.goodsDetailFrom.backImage;
                    if(!!_self.goodsDetailFrom.isTop){
                       obj.isTop = 1;
                    }else{
                        obj.isTop = 0;
                    }
                    if(!!_self.goodsDetailFrom.isHot){
                       obj.isHot = 1;
                    }else{
                        obj.isHot = 0;
                    }
                    _self.goodsStatus(obj);
                } else {
                    _self.$message('有必填项未填')
                    return false;
                }
            });
        },
        goodsStatus(obj){ // 添加或者更新
            let _self = this;
            if(this.id == ''){
                api_integral.goodsInsert(obj).then((res) => {
                    if(res.data.code == '0'){
                        _self.$router.push({path: '/goods-count'});
                    }else{
                        _self.$message(res.data.message);
                    }
                })
            } else {
                api_integral.goodsUpdate(obj).then((res) => {
                    if(res.data.code == '0'){
                        _self.$router.push({path: '/goods-count'});
                    }else{
                        _self.$message(res.data.message);
                    }
                })
            }
        },
        goodsResetForm(){ // 取消
            this.$router.push({path: '/goods-count'});
        },
        upExcel(){ // 导入cdk
            let _self = this;
            let loading;
            this.$refs.upExcel.click();
            this.$refs.upExcel.addEventListener('change', function(){
                let obj = {
                    commodityId: _self.id,
                    file: _self.$refs.upExcel.files[0]
                };
                loading = _self.$loading({
                    lock: true,
                    text: '文件导入中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                api_integral.cdkInsert(obj).then((res) => {
                    if(res.data.code == 0){
                        loading.close();
                        _self.$message({
                          message: '上传成功',
                          type: 'success'
                        });
                    }else{
                       _self.$message.error(res.data.message);
                    }
                });
            })
        },
        cdkSizeChange(){ // 每页显示条数

        },
        cdkCurrentChange(page){ // 页面切换
            let obj = {
                page: page,
                pageSize: this.pageSize,
                commodityId: Number(this.id)
            }
            this.getCdkeyList(obj)
        },
        getCdkeyList(obj){
            api_integral.cdKeyList(obj).then((res) => {                   
                if(res.data.code == '0'){
                    this.cdkList = res.data.data.list;
                    this.cdkList.forEach((item) => {
                        (item.used == 0) ? item.used = '未兑换' : '已兑换';
                        item.createAtString = item.createAtString.substring(0, 10);
                    })
                    this.dataTotal = res.data.data.count;
                    this.used = res.data.data.used;
                    this.notUsed = res.data.data.notUsed;
                }else{
                    this.$message.error(res.data.message);
                }
            }).catch(() => {

            })
        },
        cdkSelectionChange(val) {
            this.multCdkList = val;
        },
        cdkDelect(){ // 批量删除
            let _self = this;
            let arr = [];
            let obj = {};
            _self.$confirm('确定删除选中项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _self.multCdkList.forEach((item) => {
                    arr.push(item.id)
                });
                obj.id = JSON.stringify(arr);
                api_integral.cdKeysDelete(obj).then(res=> {
                    if(res.data.code == '0'){
                        let obj = {
                            pageSize: this.pageSize,
                            commodityId: Number(this.id)
                        }
                        _self.getCdkeyList(obj);
                    }
                })
            })
        },
        exportFn(){ // 导出cdk
            let obj = {
                commodityId: Number(this.id)
            }
            api_integral.outputCdk(obj).then((res) => {
                this.$confirm('是否下载？').then(()=> {
                    let u = sessionStorage.getItem('outputCdkUrl');
                    window.location.href = u;
                }).catch(()=> {return})
            })
        },
        goodsRemove(){
            let obj = {};
            let arr = [];
            this.$confirm('确定删除选中项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                arr.push(this.id)
                obj.id = JSON.stringify(arr);
                api_integral.goodsDelete(obj).then(res=> {
                    if(res.data.code == '0'){
                        this.$router.push({path: '/goods-count'});
                    }
                })
            })
        }
    },
    components: {
        'add-img-item': AddImgItem,
        'image-card': ImgCard
    },
}
</script>



<style scoped>
.goodsDetail_page{

}
.title{
    width: 100%;
    height: 36px;
    background: #eee;
    line-height: 36px;
    font-size: 20px;
    margin-bottom: 12px;
    text-indent: 2em;
}
.upExcel{
    display: none;
}
.pagenation_pane {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
