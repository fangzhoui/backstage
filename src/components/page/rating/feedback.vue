<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 评论反馈</el-breadcrumb-item>
                <el-breadcrumb-item>用户反馈</el-breadcrumb-item>
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
                            <el-input placeholder="查询内容" v-model="title"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type='primary' @click="search">查询</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="phone" label="账号"></el-table-column>>
                        <el-table-column prop="userName" label="用户"></el-table-column>
                        <el-table-column prop="content" label="反馈"></el-table-column>
                        <el-table-column prop="createAt" label="时间"></el-table-column>
                    </el-table>
                </div>
                <div class="pagenation_pane">
                    <el-pagination
                      @current-change="feedbackCurrentChange"
                      :page-size="pageSize"
                      layout="total, prev, pager, next, jumper"
                      :total="dataTotal">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>



<script>
import {formatDate, formatDate2} from 'js/date'
import apifeedback from 'api/ratingandfeed'
export default {
    name: 'feed-back',
    data(){
        return {
            loading: false,
            currentPage: 1,
            pageSize: 10,
            time: '',
            title: '',
            dataTotal: 100,
            tableData: [],
        }
    },
    methods: {
        feedbackCurrentChange(page){
            let obj = {
                page: page,
                pageSize: this.pageSize
            }
            let newObj = this.choseObj();
            Object.assign(obj, newObj);
            this.currentpage = page;
            this.getFeedBackList(obj);
        },
        search(){
            let obj = {
                page: 1,
                pageSize: this.pageSize
            }
            let newObj = this.choseObj();
            Object.assign(obj, newObj);
            this.getFeedBackList(obj);
        },
        getFeedBackList(obj){
            this.loading = true;
            apifeedback.feedList(obj).then((res) => {
                if(res.data.code == '0'){
                    this.dataTotal = res.data.data.count;
                    let data = res.data.data.list;
                    let array = [];
                    data.forEach(item => {
                        let obj = {
                            id: item.id,
                            phone: item.phone,
                            userName: item.userName,
                            content: item.content,
                            createAt: formatDate(new Date(item.createAt), 'yyyy-MM-dd hh:mm:ss'),
                        }
                        array.push(obj)
                    })
                    this.tableData = array;
                    this.loading = false;
                }
            })
        },
        choseObj(){
            let obj = {};
            if( this.time != '' && this.time != null && this.time != undefined ){
                let time = formatDate2(this.time);
                obj.timeBegin = time.begin;
                obj.timeEnd = time.end;
            }
            if(this.title != '' && this.title != 'all'){
                obj.content = this.title.trim();
            }
            return obj;
        }
    },
    created(){
        this.getFeedBackList({pageSize: this.pageSize, page: 1})
    }
}
</script>



<style scoped>

.history_body {
    margin-top: 20px;
}

</style>
