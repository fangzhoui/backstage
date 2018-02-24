<template>
<div>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-star-on"></i> 积分商城</el-breadcrumb-item>
            <el-breadcrumb-item>积分统计</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="history_body">
        <el-card>
            <div slot="header">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-input placeholder="请输入要搜索的手机号" v-model="phone"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="请输入要搜索的昵称" v-model="wxid"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type='primary' @click="search">搜索</el-button>
                        <el-button @click="downLoadExcel">导出Excel</el-button>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-table v-loading.body.lock="loading" :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="phone" min-width='160' label="手机号">
                    </el-table-column>
                    <el-table-column prop="nickName" min-width='160' label="昵称">
                    </el-table-column>
                    <el-table-column prop="openId" min-width='220' label="微信识别码">
                    </el-table-column>
                    <el-table-column prop="current" min-width='160' label="当前积分">
                    </el-table-column>
                    <el-table-column prop="total" min-width='160' label="总积分">
                    </el-table-column>
                    <el-table-column prop="lastCostDate" min-width='220' label="最后消费时间">
                    </el-table-column>
                    <el-table-column prop="continueDay" min-width='160' label="连续签到">
                    </el-table-column>
                    <el-table-column prop="lastSignDate" min-width='220' label="最近签到时间">
                    </el-table-column>
                    <el-table-column  prop="pinter" min-width='120' label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="medium" @click="integralEdit(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagenation_pane">
                <el-pagination
                  @size-change="integralSizeChange"
                  @current-change="integralCurrentChange"
                  :page-sizes="[10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="dataTotal">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog title="积分流水" :visible.sync="gridDataShow">
            <p class="gridTitle">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <p>手机号：{{phoneName}}</p>
                    </el-col>
                    <el-col :span="6">
                        <p>微信号：{{wxName}}</p>
                    </el-col>
                </el-row>
            </p>
            <el-table :data="gridData" v-loading.body.lock="gridDataloading" stripe style="width: 100%">
                <el-table-column type="index" width="80"></el-table-column>
                <el-table-column prop="createAt" label="时间"></el-table-column>
                <el-table-column prop="name" label="类型"></el-table-column>
                <el-table-column prop="quantity" label="积分"></el-table-column>
                <el-table-column prop="currentScore" label="结余"></el-table-column>
            </el-table>
            <div slot="footer">
                <el-pagination
                  @size-change="integralSizeChange"
                  @current-change="integralCurrentChange"
                  :page-sizes="[10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="gridTotal">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</div>
</template>



<script>
import api_integral from 'api/integral'
import {formatDate} from 'js/date'

export default {
    name: 'integral-count',
    data() {
        return {
            loading: false,
            gridDataloading: false,
            pageSize: 10,
            uid: '', // 流水查询参数
            wxid: '', // 昵称查询
            phone: '', // 手机号查询
            timeState: false,
            searchState: false,
            gridDataShow: false,
            tableData: [], // 积分列表
            dataTotal: null,
            gridData: [], // 流水列表
            gridTotal: null,
            wxName: '', // 微信名字
            phoneName: '', // 手机名字
        }
    },
    watch: {
        'gridDataShow'(f, n){
            if(!f){
                this.gridData = []
            }
        }   
    },
    methods: {
        integralSizeChange(val) {
        },
        search() {
            let obj = {
                page: 1,
                pageSize: this.pageSize
            };
            let wx = this.wxid;
            let tel = this.phone;
            if(wx != ""){
                obj.name = wx;
            }
            if(tel != ""){
                if(tel.match(/^1[35678]\d{9}$/g)){
                    obj.phone = tel
                }else{
                    this.$message.error('请输入正确的手机号');
                    return
                }
            }
            this.scoreFind(obj)
        },
        // 手机号或者微信昵称查询
        scoreFind(obj){
            let _self = this;
            this.loading = true;
            api_integral.scoreFind(obj).then(res => {
                if (res.data.code == 0) {
                    let data = res.data.data.integralVOS;
                    let arr = [];
                    for (let a of data) {
                        let obj = {
                            uid: a.uid,
                            phone: a.phone,
                            nickName: a.nickName,
                            subName: a.subName,
                            openId: a.openId,
                            current: a.current? a.current : a.current = 0 ,
                            total: a.total? a.total : a.total = 0,
                            lastCostDate: a.lastCostDateString,
                            continueDay: a.continueDay? a.continueDay : a.continueDay = 0,
                            lastSignDate: a.lastSignDateString
                        }
                        arr.push(obj);
                    }
                    this.loading = false;
                    this.tableData = arr;
                    this.dataTotal = res.data.data.count;
                }else{
                    this.loading = false;
                }
            })
        },
        downLoadExcel(){
            let obj = {};
            let wx = this.wxid;
            let tel = this.phone;
            if(wx != ""){
                obj.name = wx;
            }
            if(tel != ""){
                if(tel.match(/^1[35678]\d{9}$/g)){
                    obj.phone = tel
                }else{
                    this.$message.error('请输入正确的手机号');
                    return
                }
            }
            api_integral.usersExport(obj).then(res=> {
                this.$confirm('是否下载？').then(()=> {
                    let u = sessionStorage.getItem('usersExportUrl');
                    window.location.href = u;
                }).catch(()=> {return})
            })
        },
        scoresDetail(obj){
            this.gridDataloading = true;
            api_integral.scoresDetail(obj).then((res) => {
                if(res.data.code == 0){
                    this.gridData = res.data.data.data.list;
                    this.gridData.forEach((item, index) => {
                        let createAt = new Date(item.createAt);
                        if(item.isIncrease){
                            item.quantity = '+' + item.quantity;
                        } else {
                            item.quantity = '-' + item.quantity;
                        }
                        if(!item.currentScore){
                           item.currentScore  = 0; 
                        }
                        item.createAt = formatDate(createAt, 'yyyy/MM/dd');
                    })
                    this.gridDataShow = true;
                    this.gridDataloading = false;
                    this.gridTotal = res.data.data.data.count;   // 流水总条数
                }else{
                    this.$message.error(res.data.message);
                }
            })
        },
        // 操作
        integralEdit(index, row) {
            this.phoneName = row.phone;
            this.wxName = row.nickName;
            this.uid = row.uid;
            let a = {
                uid: row.uid,
                pageSize: this.pageSize
            }
            this.scoresDetail(a);
        },
        hideGridData(){
            this.gridDataShow = false;
        },
        // 页面切换
        integralCurrentChange(page) {
            let obj = {
                page: page,
                pageSize: this.pageSize,
            }
            if(this.gridDataShow){
                obj.uid = this.uid;
                this.scoresDetail(obj);
            }else{
                let wx = this.wxid;
                let tel = this.phone;
                if(wx != ""){
                    obj.name = wx;
                }
                if(tel != ""){
                    if(tel.match(/^1[35678]\d{9}$/g)){
                        obj.phone = tel
                    }else{
                        this.$message.error('请输入正确的手机号');
                        return
                    }
                }
                this.scoreFind(obj);
            }
        } 
    },
    mounted() {
        this.scoreFind({pageSize: this.pageSize})
    }
}
</script>



<style scoped>
.history_body {
    margin-top: 20px;
    position: relative;
}
.pagenation_pane {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.gridData_wrap{
    position: absolute;
    top: 5px;
    left: 20px;
    right: 20px;
    bottom: 5px;
    z-index: 999;
    background: #fff;
}
.gridData_title{
    display: inline-block;
    margin-bottom: 10px;
}
.gridData_close{
    display: inline-block;
    margin-bottom: 10px;
    text-align: right;
    float: right;
    cursor: pointer;
}
.gridData_pagenation_pane{
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
}
.history_wrap{
    overflow-x: auto; 
}
.gridTitle{
    font-size: 14px;
    margin-bottom: 15px;
    color: #333;
}
</style>
