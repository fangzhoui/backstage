<template>
<div>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i> 统计管理</el-breadcrumb-item>
            <el-breadcrumb-item>浏览记录</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="history_body">
        <el-card class="gridData_wrap"  v-if="gridDataShow">
            <div slot="header">
                <el-row :gutter="20">
                    <el-col :span="20">
                        <strong class="gridData_title">积分流水</strong>
                    </el-col>
                    <el-col :span="4">
                        <i class="gridData_close el-icon-circle-close" @click.stop="hideGridData"></i>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <p>手机号：</p>
                    </el-col>
                    <el-col :span="6">
                        <p>微信号：</p>
                    </el-col>
                </el-row>
            </div>
            <div>
                <el-table :data="gridData" v-loading.body.lock="loading" stripe style="width: 100%">
                    <el-table-column prop="index" label="序号"></el-table-column>
                    <el-table-column prop="createAt" label="时间"></el-table-column>
                    <el-table-column prop="name" label="类型"></el-table-column>
                    <el-table-column prop="quantity" label="积分"></el-table-column>
                    <el-table-column prop="currentScore" label="结余"></el-table-column>
                </el-table>
            </div>
            <div class="gridData_pagenation_pane">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :page-size= 'pageSize'
                  layout="total, prev, pager, next, jumper"
                  :total="dataTotal"
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</div>
</template>



<script>
import api_integral from 'api/integral'
import {formatDate} from 'js/date'

export default {
    name: 'integralCount-page',
    data() {
        return {
            loading: false,
            pageSize: 10,
            page: '',
            time: '',
            phone: '',
            wxid: '',
            tableData: [],
            gridData: [],
            dataTotal: null,
            currentpage: 1,
            timeState: false,
            searchState: false,
            gridDataShow: false,
            uid: ''
        }
    },
    methods: {
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
                    let data = res.data.data;
                    let arr = [];
                    for (let a of data) {
                        let lastCostDate =  new Date(a.lastCostDate)
                        let lastSignDate =  new Date(a.lastSignDate)
                        let obj = {
                            phone: a.phone,
                            nickName: a.nickName,
                            subName: a.subName,
                            openId: a.openId,
                            current: a.current,
                            total: a.total,
                            lastCostDate: formatDate(lastCostDate, 'yyyy-MM-dd hh:mm:ss'),
                            continueDay: a.continueDay,
                            lastSignDate: formatDate(lastSignDate, 'yyyy-MM-dd hh:mm:ss')
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
        scoresDetail(obj){
            this.loading = true;
            api_integral.scoresDetail(obj).then((res) => {
                if(res.data.code == 0){
                    this.gridData = res.data.data;
                    this.gridData.forEach((item, index) => {
                        let createAt = new Date(item.createAt);
                        if(item.isIncrease){
                            item.quantity = '+' + item.quantity;
                        } else {
                            item.quantity = '-' + item.quantity;
                        }
                        item.index = index + 1;
                        item.createAt = formatDate(createAt, 'yyyy/MM/dd');
                    })
                    this.gridDataShow = true;
                    this.loading = false;
                    this.dataTotal = res.data.data.count;
                }else{
                    this.$message.error(res.data.message);
                }
            })
        },
        // 操作
        handleEdit(index, row) {
            this.uid = row.uid;
            let a = {
                uid: row.uid;
                // uid: '229572516673225702' || row.uid
            }
            console.log(a)
            this.scoresDetail(a);
        },
        hideGridData(){
            this.gridDataShow = false;
        },
        // 获取列表
        getList(obj) {
            let _self = this;
            this.loading = true;
            api_integral.usersScores(obj).then(res => {
                if (res.data.code == 0) {
                    let data = res.data.data.integralVOS;
                    let arr = [];
                    for (let a of data) {
                        let lastCostDate =  new Date(a.lastCostDate)
                        let lastSignDate =  new Date(a.lastSignDate)
                        let obj = {
                            phone: a.phone,
                            nickName: a.nickName,
                            subName: a.subName,
                            openId: a.openId,
                            current: a.current,
                            total: a.total,
                            lastCostDate: formatDate(lastCostDate, 'yyyy-MM-dd hh:mm:ss'),
                            continueDay: a.continueDay,
                            lastSignDate: formatDate(lastSignDate, 'yyyy-MM-dd hh:mm:ss'),
                            uid: a.uid
                        }
                        arr.push(obj);
                    }
                    this.loading = false;
                    this.tableData = arr;
                    this.dataTotal = res.data.data.count;
                }else{
                    this.loading = false;
                    this.$message.error(res.data.message);
                }
            })
        },
        // 页面切换
        handleCurrentChange(page) {
            let obj = {
                page: page,
                pageSize: this.pageSize,
            }
            if(this.gridDataShow){
                obj.uid = this.uid;
                this.scoresDetail(obj);
            }else{
                this.getList(obj);
            }
        } 
    },
    mounted() {
        this.getList({pageSize: this.pageSize})
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
</style>
