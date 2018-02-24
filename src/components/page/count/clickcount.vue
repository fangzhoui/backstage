<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品点击统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"></el-date-picker>
                        </el-col>
                        <el-col :span="2">
                             <el-select v-model="groupName" placeholder="选择模块">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in groupSelect" :label="item.name" :value="item.id"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="2">
                             <el-select v-model="linkName" placeholder="选择详情">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in linkSelect" :label="item.linkName" :value="item.linkId"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="2">
                             <el-select v-model="deveiceName" placeholder="访问设备">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in deveiceSelect" :label="item.name" :value="item.id"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="3">
                            <el-select v-model="fromKeyName" placeholder="访问来源">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in fromKeySelect" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-button type='primary' @click="search">搜索</el-button>
                            <el-button @click='exportFn'>导出</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="pageDetail" stripe style="width: 100%">
                        <el-table-column prop="timePart" label="时间">
                        </el-table-column>
                        <el-table-column prop="groupPart" label="页面名称">
                        </el-table-column>
                        <el-table-column prop="clickPart" label="按键">
                        </el-table-column>
                        <el-table-column prop="linkPart" label="产品名">
                        </el-table-column>
                        <el-table-column  prop="deveicePart" label="设备">
                        </el-table-column>
                        <el-table-column  prop="eventPart" label="事件">
                        </el-table-column>
                        <el-table-column  prop="countPart" label="数量">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagenation_pane">
                    <el-pagination
                        small
                        layout="total, prev, pager, next"
                        :page-size="pageSize"
                        @current-change="pageCurrentChange"
                        :current-page="currentpage"
                        :total="dataTotal">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import api_count from 'api/count'
import {formatDate, formatDate2} from 'js/date'
export default {
    name: 'click-count',
    data(){
        return {
            loading: false,
            pageSize: 10,
            page: '',
            currentpage: 1,
            time: '',
            groupName: '',
            groupSelect: [],
            linkName: '',
            linkSelect: [],
            fromKeyName: '',
            fromKeySelect: [],
            deveiceName: '',
            deveiceSelect: [{name: 'android', id: '1'}, {name: 'ios', id: '2'}, {name: 'web', id: '3'}],
            dataTotal: 10,
            pageDetail: []
        }
    },
    watch: {
       'groupName'(f, n){
            let d;
            this.groupSelect.forEach((item) => {
                if(item.id == f){
                    d = item.category;
                }
            })
            this.linkSelect = [];
            this.linkName = '';
            this.getClickList({category: d});
        } 
    },
    methods: {
        getFromkey(){
            api_count.pageCountFromKeyList().then(res=> {
                if(res.data.code == '0'){
                    this.fromKeySelect = res.data.data
                }
            })
        },
        getProductClickList(){
            api_count.productClickList().then(res=> {
                if(res.data.code == '0'){
                    this.groupSelect = res.data.data
                }
            }) 
        },
        getClickList(obj){
            api_count.productList(obj).then(res=> {
                if(res.data.code == '0'){
                    this.linkSelect = res.data.data
                }
            }) 
        },
        search(){
            let obj = {
                pageSize: this.pageSize,
            }
            let newObj = this.choseObj();
            Object.assign(obj, newObj);
            this.getList(obj)
        },
        getList(getObj){
            this.loading = true;
            api_count.productRecordList(getObj).then(res=> {
                if(res.data.code == '0'){
                    let arr = [];
                    let data = res.data.data.list;
                    for(let a of data){
                        let createdTime = new Date(a.createAt)
                        let obj = {
                            id: a.id,
                            timePart: formatDate(createdTime, 'yyyy-MM-dd'),
                            groupPart: a.groupName,
                            eventPart: !!a.event ? '点击' : '',
                            countPart: a.count,
                            clickPart: a.clickName,
                            linkPart: a.linkName
                        }
                        if(a.deviceType == 1){
                            obj.deveicePart = 'android'
                        }else if(a.deviceType == 2){
                            obj.deveicePart = 'ios'
                        }else if(a.deviceType == 3){
                            obj.deveicePart = 'web'
                        }
                        arr.push(obj);
                    };
                    this.loading = false;
                    this.pageDetail = arr;
                    this.dataTotal = res.data.data.total;
                }
            })
        },
        pageCurrentChange(page){
            this.page = page;
            let obj = {
                page: page,
                pageSize: this.pageSize,
            }
            let newObj = this.choseObj();
            Object.assign(obj, newObj);
            this.getList(obj)
        },
        exportFn(){
            let obj = {};
            let newObj = this.choseObj();
            Object.assign(obj, newObj);
            api_count.productRecordExport(obj).then( ()=> {
                this.$confirm('是否下载？').then((res)=> {
                    let u = sessionStorage.getItem('productRecordUrl')
                    window.location.href = u
                }).catch(()=> {return})
            });
        },
        choseObj(){
            let obj = {};
            if(this.fromKeyName != '' && this.fromKeyName != 'all'){
                obj.fromKey = this.fromKeyName;
            }
            if( this.time != '' && this.time != null && this.time != undefined ){
                let time = formatDate2(this.time);
                obj.timeBegin = time.begin;
                obj.timeEnd = time.end;
            }
            if(this.groupName != '' && this.groupName != 'all'){
                obj.clickId = this.groupName;
            }
            if(this.linkName != '' && this.linkName != 'all'){
                obj.linkId = this.linkName;
            }
            if(this.deveiceName != '' && this.deveiceName != 'all'){
                obj.deviceType = Number(this.deveiceName);
            }
            return obj;
        }
    },
    mounted(){
        this.getList({pageSize: this.pageSize});
        this.getProductClickList();
        this.getFromkey();
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
.user_table{
   margin: 0 auto;
}
.user_table{border-right:1px solid #333;border-bottom:1px solid #333}
.user_table td{border-left:1px solid #333;border-top:1px solid #333}
.table_title{
    width: 640px;
    margin: 0 auto;
}
.paT{
    padding-top: 20px;
}
.user_table td{
    height: 32px;
    background: #FFF;
}
.user_table .tdT{
    background: #eee;
    text-align: center;
}
.user_table .tdC{
    text-indent: 1em;
}
.table_adress{
    max-width: 640px;
    max-height: 160px;
    overflow-y: auto;
    margin: 0 auto;
}
.table_item{
  border: 1px solid #999;
  padding: 10px; 
}
.item_span{
   padding-right: 20px; 
}
</style>
