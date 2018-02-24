<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计管理</el-breadcrumb-item>
                <el-breadcrumb-item>关注统计</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"></el-date-picker>
                        </el-col>
                        <el-col :span="4">
                             <el-select v-model="sceneKeys" placeholder="来源">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in sceneKeySelect" :label="item.name" :value="item.sceneKeys"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="5">
                            <el-button type='primary' @click="search">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="attentionDetail" stripe style="width: 100%">
                        <el-table-column prop="timePart" label="时间">
                        </el-table-column>
                        <el-table-column prop="sceneKeyPart" label="来源">
                        </el-table-column>
                        <el-table-column prop="attPart" label="新增关注数">
                        </el-table-column>
                        <el-table-column prop="reAttPart" label="取关数">
                        </el-table-column>
                        <el-table-column prop="increaseCount" label="净关注人数">
                        </el-table-column>
                        <el-table-column prop="totalCount" label="累计关注数">
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
import api_wx from 'api/wx'
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
            sceneKeys: '',
            sceneKeySelect: [],
            dataTotal: 10,
            attentionDetail: []
        }
    },
    methods: {
        getSceneKeys(){
            api_wx.wxQrlist().then(res=> {
                if(res.data.code == '0'){
                    this.sceneKeySelect = res.data.data;
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
            api_count.qrRecordList(getObj).then(res=> {
                if(res.data.code == '0'){
                    let arr = [];
                    let data = res.data.data.list;
                    for(let a of data){
                        let obj = {
                            timePart: a.days,
                            sceneKeyPart: a.sceneName,
                            attPart: a.subscribeCount,
                            reAttPart: a.unsubscribeCount,
                            increaseCount: a.increaseCount,
                            totalCount: a.totalCount
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
                    this.attentionDetail = arr;
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
        choseObj(){
            let obj = {};
            if(this.sceneKeys != '' && this.sceneKeys != 'all'){
                obj.sceneKeys = this.sceneKeys;
            }
            if( this.time != '' && this.time != null && this.time != undefined ){
                let time = formatDate2(this.time);
                obj.timeBegin = time.begin;
                obj.timeEnd = time.end;
            }
            return obj;
        }
    },
    mounted(){
        this.getList({pageSize: this.pageSize});
        this.getSceneKeys();
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
