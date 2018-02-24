<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="5">
                        <el-col :span="8">
                            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="fromKey" placeholder='选择活动' @change='changeActiveFn'>
                                <el-option value='all' label="全部"></el-option>
                                <el-option v-for="item in fromKeyList" :value='item.fromkey' :label='item.name'></el-option>
                            </el-select>
                        </el-col>
                       <el-col :span="3">
                            <el-select v-model="productId" placeholder='选择产品'>
                                <el-option value='all' label="全部"></el-option>
                                <el-option v-for='item in productList' :value='item.id' :label='item.name'></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="device" placeholder='选择设备'>
                                <el-option value='all' label="全部"></el-option>
                                <el-option value='ANDROID' label="安卓"></el-option>
                                <el-option value='IOS' label="苹果"></el-option>
                                <el-option value='PC' label="PC"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="clickType" placeholder='访问方式'>
                                <el-option value='all' label="全部"></el-option>
                                <el-option value='0' label="页面访问"></el-option>
                                <el-option value='1' label="点击进入"></el-option>
                                <el-option value='2' label="点击更多"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2">
                            <el-button type='primary' @click="search">搜索</el-button>
                             <!-- <el-button type='primary' @click="search">导出</el-button> -->
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column
                            prop="title"
                            label="名称"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="fromKey"
                            label="产品"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="device"
                            label="设备">
                        </el-table-column>
                        <el-table-column
                            prop="clickType"
                            label="访问方式">
                        </el-table-column>
                        <el-table-column
                            prop="createAt"
                            width="220"
                            label="时间">
                        </el-table-column>
                    </el-table>
                </div>

                <div class="pagenation_pane">
                    <el-pagination
                        small
                        layout="total, prev, pager, next"
                        :page-size="pageSize"
                        @current-change="handleCurrentChange"
                        :current-page="currentpage"
                        :total="total">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>



<script>
import api from 'api/active'

export default {
    name: 'history-page',
    data(){
        return {
            pageSize: 10,
            page: '',
            time: '',
            productId: '',          // 产品
            device: '',             // 设备
            clickType: '',        // 访问方式
            timeState: false,       // 时间状态
            tableData: [],
            total: null,
            currentpage: 1,
            searchState: false,     // 搜索状态
            fromKeyList: [],
            fromKey: '',
            productList: [],        // 产品列表
        }
    },
    methods: {
        timeFn(val){
            let date = new Date(val)
            let y = date.getFullYear()
            let m = (date.getMonth()+1<10 ? `0${date.getMonth()+1}` : date.getMonth()+1)
            let d = date.getDate()<10 ? `0${date.getDate()}` : date.getDate()
            let h = date.getHours()<10? `0${date.getHours()}` : date.getHours()
            let min = date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes()
            let sec = date.getSeconds()<10 ? `0${date.getSeconds()}` : date.getSeconds()
            return (`${y}-${m}-${d} ${h}:${min}:${sec}`)
        },
        fromKeyListFn(){
            api.activeList().then(res=> {
                this.fromKeyList = res.data.data
            })
        },
        search(){
            this.searchState = true
            // 处理时间
            let obj = {
             page: 1,
             pageSize: this.pageSize
            }
            let t = this.time
            if(this.time != '' && this.time != null && this.time != undefined){
                if(t[0]!=null){
                    this.timeState = true
                    let y1 = t[0].getFullYear()
                    let y2 = t[1].getFullYear()
                    let m1 = ((t[0].getMonth()+1)<10 ? `0${(t[0].getMonth()+1)}`: (t[0].getMonth()+1))
                    let m2 = ((t[1].getMonth()+1)<10 ? `0${(t[1].getMonth()+1)}`: (t[1].getMonth()+1))
                    let d1 = (t[0].getDate()<10 ? `0${t[0].getDate()}` : t[0].getDate())
                    let d2 = (t[1].getDate()<10 ? `0${t[1].getDate()}` : t[1].getDate())
                    let tbegin = `${y1}-${m1}-${d1} 00:00:00`
                    let tend = `${y2}-${m2}-${d2} 23:59:59`
                    let timeobj = {
                        timeBegin: tbegin,
                        timeEnd: tend
                    }
                    Object.assign(obj, timeobj)
                }else {
                    // this.$message.error('您还没选择时间')
                    this.timeState = false
                }
            }else {
                // this.$message('请选择时间')
                this.timeState = false
            }
            if(this.productId!='all' && this.productId!=''){
                let proObj = {productId: `${this.productId}`}
                Object.assign(obj, proObj)
            }
            if(this.device!='all' && this.device!=''){
                let devObj = {device: this.device}
                Object.assign(obj, devObj)
            }
            if(this.clickType!='all' && this.clickType!=''){
                let cliObj = {clickType: this.clickType}
                Object.assign(obj, cliObj)
            }
            if(this.fromKey!='all' && this.fromKey!=''){
                let fObj = {fromKey: this.fromKey}
                Object.assign(obj, fObj)
            }
            this.getList(obj)

        },
        getList(obj={page:1, pageSize: this.pageSize}){
            api.countList(obj).then(res=> {
                let data = res.data.data.list
                this.total = res.data.data.count
                let arr = []
                for(let a of data){
                    let obj = {
                        title: a.title,
                        fromKey: a.fromKey,
                        device: a.device,
                        clickType: (a.clickType==0)?'页面访问': '点击进入',
                        createAt: this.timeFn(a.createAt)
                    }
                    arr.push(obj)
                }
                this.tableData = arr
            })
        },
        handleCurrentChange(page){
            let obj = {
                page: page,
                pageSize: this.pageSize,
            }
            if(this.searchState){
                if(this.timeState){
                    let t = this.time
                    let y1 = t[0].getFullYear()
                    let y2 = t[1].getFullYear()
                    let m1 = ((t[0].getMonth()+1)<10 ? `0${(t[0].getMonth()+1)}`: (t[0].getMonth()+1))
                    let m2 = ((t[1].getMonth()+1)<10 ? `0${(t[1].getMonth()+1)}`: (t[1].getMonth()+1))
                    let d1 = (t[0].getDate()<10 ? `0${t[0].getDate()}` : t[0].getDate())
                    let d2 = (t[1].getDate()<10 ? `0${t[1].getDate()}` : t[1].getDate())
                    let tbegin = `${y1}-${m1}-${d1} 00:00:00`
                    let tend = `${y2}-${m2}-${d2} 23:59:59`
                    let timeobj = {
                        timeBegin: tbegin,
                        timeEnd: tend
                    }
                    Object.assign(obj, timeobj)
                }
                if(this.productId!='all' && this.productId!=''){
                    let proObj = {productId: `${this.productId}`}
                    Object.assign(obj, proObj)
                }
                if(this.device!='all' && this.device!=''){
                    let devObj = {device: this.device}
                    Object.assign(obj, devObj)
                }
                if(this.clickType!='all' && this.clickType!=''){
                    let cliObj = {clickType: this.clickType}
                    Object.assign(obj, cliObj)
                }
                if(this.fromKey!='all' && this.fromKey!=''){
                    let fObj = {fromKey: this.fromKey}
                    Object.assign(obj, fObj)
                }
                this.getList(obj)
            }else {
             this.getList(obj)
            }
        },
        changeActiveFn(){
            this.productId = ''
            this.productList = []
            if(this.fromKey=='' || this.fromKey=='all'){
                this.productList = []
            }else {
                api.itemList({fromKey: this.fromKey}).then(res=> {
                    this.productList = res.data.data
                })
            }
        },
        getStatics(){
            api.countStatics().then(res=> {
                console.log(res.data)
            })
        }
    },
    mounted(){
        this.getList()
        this.fromKeyListFn()
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
</style>
