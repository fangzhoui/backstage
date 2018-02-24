<template>
    <div class="goodsDetail_page">
        <el-form ref="goodsDetail" :model="goodsDetailFrom" :rules="rules" label-width="100px">
            <el-col :span="24">
                <div class="title">活动信息</div>
            </el-col>
            <el-form-item label="活动名称：" prop="name">
                <el-col :span="8">
                    <el-input v-model="goodsDetailFrom.name" placeholder="请输入活动名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="开始时间：" required>
                <el-col :span="8">
                    <el-form-item prop="beginAt">
                        <el-date-picker type="date" placeholder="选择日期" v-model="goodsDetailFrom.beginAt" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="8">
                    <el-form-item prop="endAt">
                        <el-date-picker type="date" placeholder="选择日期" v-model="goodsDetailFrom.endAt" style="width: 100%;" :disabled="checked"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="4">
                    <el-form-item>
                        <el-checkbox v-model="checked">长期</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="状态：" prop="enable">
                <el-col :span="8">
                    <el-radio-group v-model="goodsDetailFrom.enable">
                        <el-radio label="上架"></el-radio>
                        <el-radio label="下架"></el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-col :span="24">
                <div class="title">背景图片</div>
            </el-col>
            <el-form-item label="头部图片：" prop="headImage">
                <el-col :span="8"> 
                    <add-img-item v-if='showImgHeader' @callbackFn='callbackFnImg(0)'></add-img-item>
                    <image-card :showTitle='false' v-else @deleteItem='deleteItemImg(0)'>
                        <img :src="(preUrl+'/'+goodsDetailFrom.headImage)">
                    </image-card>
                </el-col>
                <el-col :span="8">
                    <span>图片大小：514*200px，大小不超过5M</span>
                </el-col>
            </el-form-item>
            <el-form-item label="底部图片：" prop="bottomImage">
                <el-col :span="8">     
                    <add-img-item v-if='showImgBottom' @callbackFn='callbackFnImg(1)'></add-img-item>
                    <image-card :showTitle='false' v-else @deleteItem='deleteItemImg(1)'>
                        <img :src="(preUrl+'/'+goodsDetailFrom.bottomImage)">
                    </image-card>
                </el-col>
                <el-col :span="8">
                    <span>图片大小：514，大小不超过5M</span>
                </el-col>
            </el-form-item>
            <el-form-item label="背景色：" prop="color">
                <el-col :span="8">
                    <el-color-picker v-model="goodsDetailFrom.color"></el-color-picker>
                </el-col>
            </el-form-item>
            <el-col :span="24">
                <div class="title">奖品设置</div>
            </el-col>
            <div v-for="(item, index) in drawListWrap">
                <el-form-item required>
                    <span slot="label">奖品{{index+1}}：</span>
                    <el-col :span="8">
                        <el-select v-model="item.commodityId" placeholder="从“商品管理”中选择抽奖类产品">
                            <el-option v-for="(option, index) in drawList" :label="option.name" :value="option.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="中奖率：" required>
                    <el-col :span="8">
                        <el-input v-model="item.quantity" :maxlength=2 :placeholder="winning"></el-input>
                    </el-col>
                </el-form-item>
            </div>
            <el-col :span="24">
                <div class="title">规则设置</div>
            </el-col>
            <el-form-item label="用户定义：" prop="userDefined">
                <el-col :span="12">
                    <el-radio-group v-model="goodsDetailFrom.userDefined">
                        <el-radio label="IP"></el-radio>
                        <el-radio label="用户Id"></el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="抽奖次数：" prop="limitType">
                <el-col :span="12">
                    <el-radio-group v-model="goodsDetailFrom.limitType">
                        <el-radio label="每日">每日<span v-if="goodsDetailFrom.limitType == '每日'"><input class="inputWidth" :disabled="goodsDetailFrom.limitType == 1" v-model="goodsDetailFrom.limitTimes"></input>次</span></el-radio>
                        <el-radio label="每用户">每用户<span v-if="goodsDetailFrom.limitType == '每用户'"><input :disabled="goodsDetailFrom.limitType == '每日'" class="inputWidth" v-model="goodsDetailFrom.limitTimes"></input>次</span></el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item label="积分扣除：" prop="drawType">
                <el-col :span="12">
                    <el-radio-group v-model="goodsDetailFrom.drawType">
                        <el-radio label="一次"><input class="inputWidth" :disabled="goodsDetailFrom.drawType == '无需积分'" v-model="goodsDetailFrom.drawScore"></input>积分</el-radio>
                        <el-radio label="无需积分"></el-radio>
                    </el-radio-group>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="goodsSubmitForm('goodsDetail')">提交</el-button>
                <el-button @click="goodsResetForm()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>



<script>
import api_scoregame from 'api/scoregame'
import api_integral from 'api/integral'
import AddImgItem from 'components/common/AddImgItem'
import ImgCard from 'components/common/ImgCard'
import { formatDate } from 'js/date'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'score-game-detail',
    data(){
        var headImage = (rule, value, callback) => {
            if (!value) {
                callback(new Error('商品图片不能为空'));
            }else{
                callback()
            }
        };
        var bottomImage = (rule, value, callback) => {
            if (!value) {
               callback(new Error('背景图片不能为空'));
            }else{
                callback()
            }
        };
        var endAt = (rule, value, callback) => {
            if (this.checked) {
                return callback();
            }else{
                if(!value){
                    callback(new Error('请选择日期'));
                }else{
                    callback()
                }
            }
        };
        return{
            preUrl: sessionStorage.getItem('imageUrl'),
            showImgHeader: true,
            showImgBottom: true,
            id: '',
            type: [{name: '流量', type: '0'}, {name: '虚拟', type: '1'}, {name: '实物', type: '2'}],
            position: [{name:'销售类', type: '0'}, {name:'抽奖类', type: '1'}],
            drawList: [],
            drawListWrap: [
                    {sequence: 1, commodityId: null, quantity: null}, 
                    {sequence: 2, commodityId: null, quantity: null}, 
                    {sequence: 3, commodityId: null, quantity: null},
                    {sequence: 4, commodityId: null, quantity: null},
                    {sequence: 5, commodityId: null, quantity: null},
                    {sequence: 6, commodityId: null, quantity: null},
                    {sequence: 7, commodityId: null, quantity: null},
                    {sequence: 8, commodityId: null, quantity: null}
                ],
            once: 1,
            checked: false,
            goodsDetailFrom: {
                name: '',
                beginAt: null,
                endAt: null,
                enable: null,
                headImage: null,
                bottomImage: null,
                color: '',
                userDefined: null,
                limitType: null,
                limitTimes: 1,
                drawType: null,
                drawScore: 1,
            },
            rules: {
                name: [
                    {required: true, message: '请输入活动名称', trigger: 'blur'}
                ],
                beginAt: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                endAt: [
                    { type: 'date', required: true, validator: endAt, trigger: 'change' }
                ],
                enable: [
                    { required: true, message: '请选择上架状态', trigger: 'change'}
                ],
                headImage: [
                    { required: true, validator: headImage, trigger: 'blur' }
                ],
                bottomImage: [
                    { required: true, validator: bottomImage, trigger: 'blur' }
                ],
                color: [
                    { required: true, message: '请选择背景色', trigger: 'change'}
                ],
                userDefined: [
                    { required: true, message: '请定义规则', trigger: 'change'}
                ],
                limitType: [
                    { required: true, message: '请定义抽奖次数', trigger: 'change'}
                ],
                drawType: [
                    { required: true, message: '请定义积分规则', trigger: 'change'}
                ]
            }
        }
    },
    mounted(){
        if(this.$route.query.id){
            this.id = this.$route.query.id;
            let obj = {
                id: this.id
            }
            this.getBatchDetail(obj);
        }
        this.getDrawList();
    },
    computed: {
        ...mapGetters([
            'get_banner_img',
        ]),
        winning(){
            let a = '请输入小于100的数字';
            let b = 0;
            let c;
            let d;
            this.drawListWrap.forEach((item) => {
                if(!!item.quantity && item.quantity != 0){
                    c = Number(item.quantity);
                } else {
                    c = 0;
                }
                b += c;
            })
            d = (100 - b).toString() + '%';
            return d
        }
    },
    methods: {
        getDrawList(){
            let obj = {
                position: 1
            }
            api_integral.goodsList(obj).then((res) => {
                if(res.data.code == '0'){
                    let arr = [];
                    let data = res.data.data.commodityList;
                    for(let a of data){
                        let obj = {
                            name: a.name,
                            id: a.id
                        }
                        arr.push(obj)
                    }
                    this.drawList = arr;
                }
            })
        },
        getBatchDetail(id){
            let _self = this;
            api_scoregame.batchDetail(id).then((res) => {
                if(res.data.code == '0'){
                    let mes = res.data.data;
                    _self.goodsDetailFrom.name = mes.name;
                    let beginAt;
                    let endAt;
                    if(mes.beginAt){
                        beginAt = new Date();
                        beginAt.setTime(Number(mes.beginAt));
                        beginAt.toDateString();
                        _self.goodsDetailFrom.beginAt = beginAt;
                    }
                    if(mes.forever){
                        this.checked = true
                    }else{
                        if(mes.endAt){
                            endAt = new Date();
                            endAt.setTime(Number(mes.endAt));
                            endAt.toDateString();
                            _self.goodsDetailFrom.endAt = endAt;
                        }
                    }
                    if(mes.enable){
                        _self.goodsDetailFrom.enable = '上架'
                    }else{
                        _self.goodsDetailFrom.enable = '下架'
                    }
                    if(mes.headImage){
                        _self.goodsDetailFrom.headImage = mes.headImage;
                        _self.showImgHeader = false;
                    }
                    if(mes.bottomImage){
                        _self.goodsDetailFrom.bottomImage = mes.bottomImage;
                        _self.showImgBottom = false;
                    }
                    if(mes.color){
                        _self.goodsDetailFrom.color = mes.color;
                    }
                    if(mes.drawList.length > 0){
                        _self.drawListWrap = mes.drawList;
                    }
                    switch(mes.userDefined){
                        case 0:
                            _self.goodsDetailFrom.userDefined = 'IP';
                            break;
                        case 1: 
                            _self.goodsDetailFrom.userDefined = '用户Id';
                            break;
                    }
                    if(mes.limitType){
                        _self.goodsDetailFrom.limitType = '每用户';
                    }else{
                        _self.goodsDetailFrom.limitType = '每日';
                    }
                    if(mes.limitTimes){
                        _self.goodsDetailFrom.limitTimes = mes.limitTimes;
                    }

                    if(!mes.drawType){
                        _self.goodsDetailFrom.drawType = '无需积分';
                    }else{
                        _self.goodsDetailFrom.drawType = '一次';
                        if(mes.drawScore){
                            _self.goodsDetailFrom.drawScore = mes.drawScore;
                        }
                    }
                }
            })
        },
        callbackFnImg(type) { // 图片回调
            if(type == 1){
                this.showImgBottom = false;
                this.imgData2 = this.get_banner_img;
                this.goodsDetailFrom.bottomImage = this.imgData2.path;
            }else{
                this.showImgHeader = false;
                this.imgData1 = this.get_banner_img;
                this.goodsDetailFrom.headImage = this.imgData1.path;
            }
        },
        deleteItemImg(type) { // 删除图片
            this.$confirm('确定删除选中项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(type == 1){
                    this.showImgBottom = true;
                    this.imgData2 = {};
                    this.goodsDetailFrom.bottomImage = null;
                }else{
                    this.showImgHeader = true;
                    this.imgData1 = {};
                    this.goodsDetailFrom.headImage = null;
                }
            })
        },
        goodsSubmitForm(obj){ //提交
            let _self = this;
            this.$refs[obj].validate((valid) => {
                if (valid) {
                    let xx = false;
                    _self.drawListWrap.forEach((item) => {
                        if(!item.commodityId){
                            _self.$message('请填完整奖品设置');
                            xx = true;
                            return;
                        }
                        if(!item.quantity){
                            _self.$message('请填完整奖品设置');
                            xx = true;
                            return;
                        }
                    })
                    if(xx){
                        return
                    }
                    let a ={}
                    if(_self.id != ''){
                        a.id = _self.id;
                    }
                    a.name = _self.goodsDetailFrom.name;
                    let bD = new Date(_self.goodsDetailFrom.beginAt);
                    a.beginAt = formatDate(bD, 'yyyy-MM-dd hh:mm:ss');
                    if(_self.checked){
                        a.endAt = a.beginAt;
                        a.forever = 1;
                    }else{
                        let eD =  new Date(_self.goodsDetailFrom.endAt);
                        a.endAt = formatDate(eD, 'yyyy-MM-dd hh:mm:ss');
                        a.forever = 0;
                    }
                    if(_self.goodsDetailFrom.enable == '下架' || _self.goodsDetailFrom.enable == 0){
                        a.enable = 0;
                    }
                    if(_self.goodsDetailFrom.enable == '上架' || _self.goodsDetailFrom.enable == 1){
                        a.enable = 1;
                    }
                    a.headImage = _self.goodsDetailFrom.headImage;
                    a.bottomImage = _self.goodsDetailFrom.bottomImage;
                    a.color = _self.goodsDetailFrom.color;

                    if(_self.goodsDetailFrom.userDefined == 'IP' || _self.goodsDetailFrom.userDefined == 0){
                        a.userDefined = 0;
                    }
                    if(_self.goodsDetailFrom.userDefined == '用户Id' || _self.goodsDetailFrom.userDefined == 1){
                        a.userDefined = 1;
                    }
                    if(_self.goodsDetailFrom.limitType == '每日' || _self.goodsDetailFrom.limitType == 0){
                        a.limitType = 0;
                    }
                    if(_self.goodsDetailFrom.limitType == '每用户' || _self.goodsDetailFrom.limitType == 1){
                        a.limitType = 1;
                    }
                    a.limitTimes = Number(_self.goodsDetailFrom.limitTimes);
                    if(_self.goodsDetailFrom.drawType == '一次' || _self.goodsDetailFrom.drawType == 1){
                        a.drawType = 1;
                        a.drawScore = Number(_self.goodsDetailFrom.drawScore);
                    }
                    if(_self.goodsDetailFrom.drawType == '无需积分' || _self.goodsDetailFrom.drawType == 0){
                        a.drawType = 0;
                    }
                    a.drawList = JSON.stringify(_self.drawListWrap);
                    _self.goodsStatus(a);
                } else {
                    _self.$message('有必填项未填')
                    return false;
                }
            });
        },
        goodsStatus(obj){ // 添加或者更新
            let _self = this;
            if(this.id == ''){
                api_scoregame.insertBatch(obj).then((res) => {
                    if(res.data.code == '0'){
                        _self.$router.push({path: '/score-game'});
                    }else{
                        _self.$message(res.data.userMessage);
                    }
                })
            } else {
                obj.id = this.id;
                api_scoregame.updateBatch(obj).then((res) => {
                    if(res.data.code == '0'){
                        _self.$router.push({path: '/score-game'});
                    }else{
                        _self.$message(res.data.userMessage);
                    }
                })
            }
        },
        goodsResetForm(){ // 取消
            this.$router.push({path: '/score-game'});
        },
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
.line{
    text-align: center;
}
.inputWidth{
    height: 100%;
    width: 40px;
    margin: 0 10px;
}
</style>
