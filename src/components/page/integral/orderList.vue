<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 积分商城</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"></el-date-picker>
                        </el-col>
                        <el-col :span="3">
                            <el-input placeholder="用户账号" v-model="userId"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-input placeholder="商品名称" v-model="goodName"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="typeSelectKey" placeholder="商品类型">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in typeSelect" :label="item.name" :value="item.type"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="sendSelectKey" placeholder="发货状态">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in sendSelect" :label="item.name" :value="item.type"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-button type='primary' @click="search">搜索</el-button>
                            <el-button @click='exportFn'>导出Excel</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" style="width: 100%" @selection-change="goodsSelectionChange">
                        <el-table-column prop="updateAt" width="150" label="交易时间"></el-table-column>
                        <el-table-column prop="phone" width="180" label="用户手机号"></el-table-column>
                        <el-table-column prop="name" width="160" label="商品名称"></el-table-column>
                        <el-table-column prop="commodityType" width="160" label="商品类型"></el-table-column>
                        <el-table-column prop="orderNumber" width="120" label="数量"></el-table-column>
                        <el-table-column prop="address" width="300" label="收货信息"></el-table-column>
                        <el-table-column prop="addressMsg" width="160" label="快递信息"></el-table-column>
                        <el-table-column prop="score" width="120" label="积分"></el-table-column>
                        <el-table-column prop="orderStatus" width="160" label="订单状态"></el-table-column>
                        <el-table-column prop="grantStatus" width="160" label="发放状态"></el-table-column>
                        <el-table-column  prop="operation" width='120' label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" size="medium" @click="orderEdit(scope.$index, scope.row)">{{scope.row.operation}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="pagenation_pane">
                    <el-pagination
                      @size-change="orderSizeChange"
                      @current-change="orderCurrentChange"
                      :page-sizes="[10]"
                      :page-size="pageSize"
                      :current-page="currentpage"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="dataTotal">
                    </el-pagination>
                </div>
            </el-card>
        </div>
        <el-dialog :visible.sync="orderVisible">
            <div class="addressTitle" slot="title">
                <h3>
                    {{orderVisibleTitle}}
                </h3>
            </div>
            <el-form :model="adressfrom" v-if="orderVisibleTitle == '添加快递信息'">
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-select v-model="adressfrom.region" placeholder="请选择快递公司">
                        <el-option v-for="(item, index) in expressListMap" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" :label-width="formLabelWidth">
                    <el-col :span="16">
                        <el-input v-model="adressfrom.name" auto-complete="off" placeholder="请输入快递单号"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <span v-else>{{cdkey}}</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="notAddAddress">取 消</el-button>
                <el-button type="primary" @click="addAddress">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api_integral from 'api/integral'
import {formatDate} from 'js/date'
export default {
    name: 'order-list',
    data(){
        return {
            loading: false,
            pageSize: 10,
            currentpage: 1,
            page: '',
            time: '', // 查询 选择的时间
            tableData: [],
            dataTotal: null,
            typeSelect: [{name: '流量', type: '0'}, {name: '兑奖码', type: '1'}, {name: '实物寄送', type: '2'}],
            sendSelect: [{name: '未发货', type: '0'}, {name: '已发货', type: '1'}, {name: '已充值', type: '2'}, {name: '已兑换', type: '3'}],
            userId: '', // 查询 用户账号
            goodName: '',// 查询 商品名称
            typeSelectKey:'', // 查询 商品类型
            sendSelectKey: '', // 查询 发货状态
            goodSelection: [], //选中的项目
            orderVisible: false, //弹出框
            orderVisibleTitle: '',
            adressfrom: {
              name: '',
              region: ''
            },
            expressListMap: [], // 快递列表
            formLabelWidth: '120px',
            cdkey: '',
            selectOrder: null,
        }
    },
    methods: {
        orderSizeChange(){ // 每页显示条数

        },
        orderCurrentChange(page){ // 页面切换
            this.page = page;
            let obj = {
                page: page,
                pageSize: this.pageSize,
            }
            if(this.goodName != ''){
                obj.name = this.goodName;
            }
            if(this.userId != ''){
                obj.phone = this.userId;
            }
            if(this.typeSelectKey != '' && this.typeSelectKey != 'all'){
                obj.type = Number(this.typeSelectKey);
            }
            if(this.sendSelectKey != '' && this.sendSelectKey != 'all'){
                obj.useState = Number(this.sendSelectKey);
            }
            if(this.time != '' && this.time != null && this.time != undefined){
                let t = this.time
                let y1 = t[0].getFullYear()
                let y2 = t[1].getFullYear()
                let m1 = ((t[0].getMonth() + 1) < 10 ? `0${(t[0].getMonth()+1)}` : (t[0].getMonth() + 1))
                let m2 = ((t[1].getMonth() + 1) < 10 ? `0${(t[1].getMonth()+1)}` : (t[1].getMonth() + 1))
                let d1 = (t[0].getDate() < 10 ? `0${t[0].getDate()}` : t[0].getDate())
                let d2 = (t[1].getDate() < 10 ? `0${t[1].getDate()}` : t[1].getDate())
                let tbegin = `${y1}-${m1}-${d1} 00:00:00`
                let tend = `${y2}-${m2}-${d2} 23:59:59`
                obj.timeBegin = tbegin
                obj.timeEnd = tend
            }
            this.searchFn(obj)
        },
        goodsSelectionChange(val) {
            this.goodSelection = val;
        },
        search(){ // 查询
            let obj = {
                pageSize: this.pageSize
            };
            if(this.goodName != ''){
                obj.name = this.goodName;
            }
            if(this.userId != ''){
                obj.phone = this.userId;
            }
            if(this.typeSelectKey != '' && this.typeSelectKey != 'all'){
                obj.type = Number(this.typeSelectKey);
            }
            if(this.sendSelectKey != '' && this.sendSelectKey != 'all'){
                obj.useState = Number(this.sendSelectKey);
            }
            if(this.time != '' && this.time != null && this.time != undefined){
                let t = this.time
                let y1 = t[0].getFullYear()
                let y2 = t[1].getFullYear()
                let m1 = ((t[0].getMonth() + 1) < 10 ? `0${(t[0].getMonth()+1)}` : (t[0].getMonth() + 1))
                let m2 = ((t[1].getMonth() + 1) < 10 ? `0${(t[1].getMonth()+1)}` : (t[1].getMonth() + 1))
                let d1 = (t[0].getDate() < 10 ? `0${t[0].getDate()}` : t[0].getDate())
                let d2 = (t[1].getDate() < 10 ? `0${t[1].getDate()}` : t[1].getDate())
                let tbegin = `${y1}-${m1}-${d1} 00:00:00`
                let tend = `${y2}-${m2}-${d2} 23:59:59`
                obj.timeBegin = tbegin
                obj.timeEnd = tend
            }
            this.searchFn(obj)
        },
        searchFn(obj){
            let _self = this;
            _self.loading = true;
            api_integral.orderFind(obj).then(res => {
                let arr = [];
                let data = res.data.data.commodityRecords;
                for(let a of data){
                    let createAt =  new Date(a.createAt);
                    let type = '';
                    switch(a.commodityType){
                        case 0:
                            type = '流量';
                            break;
                        case 1:
                            type = '兑奖码';
                            break;
                        case 2:
                            type = '实物寄送';
                            break;
                        case 3:
                            type = '抽奖机会';
                            break;
                    }
                    let grantStatus = '';
                    let operation = '';
                    switch(a.useState){
                        case 0:
                            grantStatus = '未发货';
                            operation = '发货';
                            break;
                        case 1:
                            grantStatus = '已发货';
                            operation = '物流';
                            break;
                        case 2:
                            grantStatus = '已充值';
                            operation = '';
                            break;
                        case 3:
                            grantStatus = '已兑换';
                            operation = '查看兑换码';
                            break;
                        case 4:
                            grantStatus = '已发货';
                            operation = '';
                            break;
                    }
                    let address = '';
                    if(a.userAddress != null){
                        if(a.userAddress.provinceName){
                            address = a.userAddress.provinceName;
                        }
                        if(a.userAddress.cityName){
                            address += a.userAddress.cityName
                        }
                        if(a.userAddress.districtName){
                            address += a.userAddress.districtName
                        }
                        if(a.userAddress.address){
                            address += a.userAddress.address
                        }
                        if(a.userAddress.postcode){
                            address += ',' + a.userAddress.postcode;
                        }
                        if(a.userAddress.receiver){
                            address += ',' + a.userAddress.receiver;
                        }
                        if(a.userAddress.phone){
                            address +=  ',' + a.userAddress.phone
                        }
                    }
                    let addressMsg = '';
                    if(a.expressName){
                        addressMsg = a.expressName
                    }
                    if(a.expressNo){
                        addressMsg += ',' + a.expressNo
                    }
                    let obj = {
                        updateAt: formatDate(createAt, 'yyyy-MM-dd hh:mm:ss'),
                        phone: a.phone,
                        name: a.name,
                        commodityType: type,
                        orderNumber: 1,
                        address: address,
                        addressMsg: addressMsg,
                        orderStatus: '交易成功',
                        grantStatus: grantStatus,
                        operation: operation,
                        cdkey: a.packageKey,
                        id: a.id
                    }
                    if(!!a.score && a.score != 'null' && a.score != 'undefined'){
                        obj.score = a.score + '分';
                    }else{
                        obj.score = 0 + '分';
                    }
                    arr.push(obj)
                }
                _self.loading = false;
                _self.tableData = arr;
                _self.dataTotal = res.data.data.count;
            })
        },
        orderEdit(index, row){ //操作详情
            this.selectOrder = row;
            if(row.operation == '物流'){
                window.open("http://www.kuaidi100.com/"); 
            }
            if(row.operation == '发货'){
                api_integral.expressList().then((res) => {
                    if(res.data.code == '0'){
                        let data = res.data.data;
                        let arr = [];
                        for(let a of data){
                            let obj = {
                                id: a.id,
                                name: a.name
                            }
                            arr.push(obj)
                        }
                        this.expressListMap = arr;
                        this.orderVisible = true;
                        this.orderVisibleTitle = '添加快递信息';
                    }
                })
            }
            if(row.operation == '查看兑换码'){
                this.orderVisible = true;
                this.orderVisibleTitle = '查看兑换码';
                this.cdkey = row.cdkey;
            }
        },
        addAddress(){
            if(this.orderVisibleTitle == '添加快递信息'){
                let obj = {
                    orderId: this.selectOrder.id
                }
                if(this.adressfrom.region != ""){
                    obj.expressId = this.adressfrom.region;
                }else{
                    this.$message.error('请选择快递公司');
                    return;
                }
                if(this.adressfrom.name != ""){
                    obj.expressNo = this.adressfrom.name.toString();
                }else{
                    this.$message.error('请输入快递单号');
                    return;
                }
                api_integral.changeOrder(obj).then((res) => {
                    if(res.data.code == 0){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.orderVisible = false;
                        this.adressfrom.name = '';
                        this.adressfrom.region = '';

                        let obj = {
                            page: this.page,
                            pageSize: this.pageSize
                        }
                        if(this.goodName != ''){
                            obj.name = this.goodName;
                        }
                        if(this.userId != ''){
                            obj.phone = this.userId;
                        }
                        if(this.typeSelectKey != '' && this.typeSelectKey != 'all'){
                            obj.type = Number(this.typeSelectKey);
                        }
                        if(this.sendSelectKey != '' && this.sendSelectKey != 'all'){
                            obj.useState = Number(this.sendSelectKey);
                        }
                        if(this.time != '' && this.time != null && this.time != undefined){
                            let t = this.time
                            let y1 = t[0].getFullYear()
                            let y2 = t[1].getFullYear()
                            let m1 = ((t[0].getMonth() + 1) < 10 ? `0${(t[0].getMonth()+1)}` : (t[0].getMonth() + 1))
                            let m2 = ((t[1].getMonth() + 1) < 10 ? `0${(t[1].getMonth()+1)}` : (t[1].getMonth() + 1))
                            let d1 = (t[0].getDate() < 10 ? `0${t[0].getDate()}` : t[0].getDate())
                            let d2 = (t[1].getDate() < 10 ? `0${t[1].getDate()}` : t[1].getDate())
                            let tbegin = `${y1}-${m1}-${d1} 00:00:00`
                            let tend = `${y2}-${m2}-${d2} 23:59:59`
                            obj.timeBegin = tbegin
                            obj.timeEnd = tend
                        }
                        this.searchFn(obj)
                    }
                })
            } else {
                this.orderVisible = false;
            }
        },
        notAddAddress(){
            this.orderVisible = false;
            this.adressfrom.name = '';
            this.adressfrom.region = '';
        },
        exportFn(){ //导出excel
            let obj = {};
            if(this.goodName != ''){
                obj.name = this.goodName.trim();
            }
            if(this.userId != ''){
                obj.phone = this.userId;
            }
            if(this.typeSelectKey != '' && this.typeSelectKey != 'all'){
                obj.type = Number(this.typeSelectKey);
            }
            if(this.sendSelectKey != '' && this.sendSelectKey != 'all'){
                obj.useState = Number(this.sendSelectKey);
            }
            if(this.time != '' && this.time != null && this.time != undefined){
                let t = this.time
                let y1 = t[0].getFullYear()
                let y2 = t[1].getFullYear()
                let m1 = ((t[0].getMonth() + 1) < 10 ? `0${(t[0].getMonth()+1)}` : (t[0].getMonth() + 1))
                let m2 = ((t[1].getMonth() + 1) < 10 ? `0${(t[1].getMonth()+1)}` : (t[1].getMonth() + 1))
                let d1 = (t[0].getDate() < 10 ? `0${t[0].getDate()}` : t[0].getDate())
                let d2 = (t[1].getDate() < 10 ? `0${t[1].getDate()}` : t[1].getDate())
                let tbegin = `${y1}-${m1}-${d1} 00:00:00`
                let tend = `${y2}-${m2}-${d2} 23:59:59`
                obj.timeBegin = tbegin
                obj.timeEnd = tend
            }
            api_integral.ordersExport(obj).then(res=> {
                this.$confirm('是否下载？').then(()=> {
                    let u = sessionStorage.getItem('ordersExportUrl');
                    window.location.href = u;
                }).catch(()=> {return})
            })
        },
    },
    mounted(){
        this.searchFn({pageSize: this.pageSize})
    }
}
</script>



<style scoped>

.history_body {
    margin-top: 20px;
}
.pagenation_pane {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn_wrap{
    padding-top: 20px;
}
.addressTitle{
    position: absolute;
    left: 15px;
    top: 15px;
}
</style>
