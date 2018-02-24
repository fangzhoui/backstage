<template>
    <div class="down-load-count">
        <div>
            <el-breadcrumb>
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 下载排行</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <el-input placeholder="游戏名称" v-model="gameName"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button type='primary' @click="search">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" style="width: 100%">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="name" label="游戏名称"></el-table-column>
                        <el-table-column prop="downloadCount" label="实际下载量"></el-table-column>
                        <el-table-column prop="dummyCount" label="虚拟下载量">
                            <template scope="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" v-if="scope.row.show">
                                    {{scope.row.dummyCount}}
                                </el-button>
                                <el-input placeholder="请输入内容" v-model="scope.row.dummyCount" class="input-with-select" v-else>
                                    <el-button slot="append" icon="el-icon-edit" @click="handleSave(scope.$index, scope.row)"></el-button>
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="总下载量">
                            <template scope="scope">
                                {{Number(scope.row.downloadCount) + Number(scope.row.dummyCount)}}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="pagenation_pane">
                    <el-pagination
                      @current-change="countCurrentChange"
                      :page-sizes="[10]"
                      :page-size="pageSize"
                      :current-page="currentpage"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="dataTotal">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import downLoad from 'api/count' 

export default {
    data: function(){
        return {
            loading: false,
            pageSize: 10,
            currentpage: 1,
            page: '',
            gameName: '',
            input5: '',
            tableData: [],
            dataTotal: null,
        }
    },
    created(){
        this.downLoadList({name: '', pageSize: 10});
    },
    methods: {
        downLoadList(obj){
            this.loading = true
            downLoad.gameDownloadCount(obj).then(res => {
                if(res.data.code == '0'){
                    this.dataTotal = res.data.data.count;
                    res.data.data.list.forEach((item) => {
                        item.show = true;
                    })
                    this.tableData = res.data.data.list;
                    this.loading = false;
                }
            })
        },
        search(){
            let obj = {
                page: 1,
                pageSize: this.pageSize
            }
            if(!!this.gameName){
                obj.name = this.gameName.trim()
            }else{
                obj.name = ''
            }
            this.downLoadList(obj)
        },
        countCurrentChange(a){
            this.page = a;
            let obj = {
                page: a,
                pageSize: this.pageSize
            }
            if(!!this.gameName){
                obj.name = this.gameName  
            }else{
                obj.name = ''
            }
            this.downLoadList(obj)
        },
        handleEdit(index, row){
            this.$set(row, 'show', false)
        },
        handleSave(index, row){
            if(!row.dummyCount || row.dummyCount == null || row.dummyCount == undefined ){
                this.$set(row, 'dummyCount', 0)
            }
            this.$set(row, 'show', true)
            let obj = {
                gameId: row.id,
                dummyCount: row.dummyCount
            };
            downLoad.changeDownloadCount(obj).then(res => {});
        }
    }
}
</script>

<style scoped>
.history_body {
    margin-top: 20px;
}
.Input_Text{
    width: 50px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
}
</style>