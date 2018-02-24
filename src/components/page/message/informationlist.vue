<template>
	<div class="information_list">
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 资讯管理</el-breadcrumb-item>
                <el-breadcrumb-item>资讯列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-input placeholder="标题" v-model="informationTitle"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="informationEnable" placeholder="状态">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in informationStatus" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="8">
                            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"></el-date-picker>
                        </el-col>
                        <el-col :span="4">
                            <el-button type='primary' @click="search">查询</el-button>
                            <el-button @click='addInformation'>添加</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="name" label="标题"></el-table-column>
                        <el-table-column prop="createAt" label="创建时间"></el-table-column>
                        <el-table-column prop="updateAt" label="修改时间"></el-table-column>
                        <el-table-column prop="enable" width="120" label="状态"></el-table-column>
                        <el-table-column  prop="pinter" width='160' label="操作">
                            <template slot-scope="scope">
                                <el-dropdown size="small" split-button type="primary">
                                    <span @click.stop="informationEdit(scope.$index, scope.row)">编辑</span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native.stop="informationDetail(scope.$index, scope.row)">查看评论</el-dropdown-item>
                                        <el-dropdown-item @click.native.stop="informationDelete(scope.$index, scope.row)">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="pagenation_pane">
                    <el-pagination
                      @current-change="informationCurrentChange"
                      :page-size="pageSize"
                      layout="prev, pager, next, jumper"
                      :total="dataTotal">
                    </el-pagination>
                </div>
            </el-card>
        </div>
	</div>
</template>

<script>
import commonApi from 'api/common'
import {formatDate, formatDate2} from 'js/date'
export default {
	name: "information-list",
	data(){
		return {
            loading: false,
            currentpage: 1,
            pageSize: 10,
            dataTotal: 100,
            time: '',
            informationEnable: '',
            informationTitle: '',
            tableData: [],
            informationStatus: [{name: '有效', id: '1'}, {name: '无效', id: '0'}],
        }
	},
    created(){
        this.getInformationList({page: 1, pageSize: this.pageSize});
    },
    methods: {
        getInformationList(obj){
            commonApi.articleList(obj).then(res => {
                if(res.data.code == '0'){
                    this.dataTotal = res.data.data.count;
                    let data = res.data.data.list;
                    let table = [];
                    data.forEach((item) => {
                        let newObj = {};
                        newObj = {
                            id: item.id,
                            name: item.name,
                            createAt: formatDate(new Date(item.createAt), 'yyyy-MM-dd hh:mm:ss') || '',
                            enable: !!item.enable ? '有效' : '无效'
                        }
                        if(!!item.updateAt){
                            newObj.updateAt = formatDate(new Date(item.updateAt), 'yyyy-MM-dd hh:mm:ss')
                        }else{
                            newObj.updateAt = ''
                        }
                        table.push(newObj)
                    })
                    this.tableData = table;
                }
            })
        },
        informationCurrentChange(page){
            let obj = {
                page: page,
                pageSize: this.pageSize,
            }
            let newObj = this.choseObj();
            Object.assign(obj, newObj);
            this.getInformationList(obj);
            this.currentpage = page;
        },
        search(){
            let obj = {
                page: 1,
                pageSize: this.pageSize,
            }
            let newObj = this.choseObj();
            Object.assign(obj, newObj);
            this.getInformationList(obj);
        },
        addInformation(){
            this.$router.push({path: '/informationedit'});
        },
        informationEdit(index, row){
            this.$router.push({path: '/informationedit', query: {id: row.id}});
        },
        informationDetail(index, row){
            this.$message('评论模块还未开通')
        },
        informationDelete(index, row){
            let obj = {
                id: row.id
            }
            this.$confirm('删除后将无法恢复，是否确定删除?').then(()=> {
                commonApi.articleDelete(obj).then(res => {
                    if(res.data.code == '0'){
                        this.$message.success('删除成功');
                        let jjj = {
                            page: this.currentpage,
                            pageSize: this.pageSize
                        }
                        let newObj = this.choseObj();
                        Object.assign(jjj, newObj);
                        this.getInformationList(jjj);
                    }
                })
            }).catch(()=> {
                return 
            })
        },
        choseObj(){
            let obj = {};
            if( this.time != '' && !!this.time ){
                let time = formatDate2(this.time);
                obj.timeBegin = time.begin;
                obj.timeEnd = time.end;
            }
            if( !!this.informationEnable && this.informationEnable != '' && this.informationEnable != 'all'){
                obj.enable = Number(this.informationEnable)
            }
            if( !!this.informationTitle && this.informationTitle != ''){
                obj.name = this.informationTitle
            }
            return obj
        }
    }
}
</script>

<style scoped>
.history_body {
    margin-top: 20px;
}
</style>
