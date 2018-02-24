<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 统计管理</el-breadcrumb-item>
                <el-breadcrumb-item>浏览记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-input placeholder="活动名称" v-model="gameName"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="gameStatusKey" placeholder="状态">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in gameStatus" :label="item.name" :value="item.type"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-button type='primary' @click="search">查询</el-button>
                            <el-button @click='addScoreGame'>添加</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="name" width="240" label="活动名称"></el-table-column>
                        <el-table-column prop="beginAt" width="180" label="开始时间"></el-table-column>
                        <el-table-column prop="endAt" width="180" label="结束时间"></el-table-column>
                        <el-table-column prop="drawUrl" label="抽奖地址"></el-table-column>
                        <el-table-column prop="enable" width="120" label="状态"></el-table-column>
                        <el-table-column  prop="pinter" width='120' label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="medium" @click="scoreGameEdit(scope.$index, scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="pagenation_pane">
                    <el-pagination
                      @size-change="goodsSizeChange"
                      @current-change="goodsCurrentChange"
                      :page-sizes="[10]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="dataTotal">
                    </el-pagination>
                </div>
            </el-card>
        </div>
    </div>
</template>



<script>
import api_scoregame from 'api/scoregame'
import {formatDate} from 'js/date'

export default {
    name: 'score-game',
    data(){
        return {
            loading: false,
            pageSize: 10,
            page: '',
            tableData: [],
            dataTotal: null,
            gameStatus: [{name: '上架', type: '1'}, {name: '下架', type: '0'}],
            gameStatusKey: '', // 搜索状态
            gameName: '' // 搜索名字
        }
    },
    methods: {
        goodsSizeChange(){ // 每页显示条数

        },
        goodsCurrentChange(page){ // 页面切换
            let obj = {
                page: page,
                pageSize: this.pageSize,
            }
            if(this.gameName != ''){
                obj.name = this.gameName;
            }
            if(this.gameStatusKey != ''){
                obj.enable = this.gameStatusKey;
            }
            this.getList(obj)
        },
        getList(obj){
            let _self = this;
            this.loading = true;
            api_scoregame.batchList(obj).then(res=> {
                let arr = [];
                let data = res.data.data.list;
                for(let a of data){
                    let beginAt;
                    let endAt;
                    if(a.beginAt != null){
                        beginAt =  formatDate(new Date(a.beginAt), 'yyyy-MM-dd')
                    }else{
                        beginAt = a.beginAt;
                    }
                    if(a.endAt != a.beginAt && a.endAt != null){
                        endAt =  formatDate(new Date(a.endAt), 'yyyy-MM-dd')
                    }else{
                        endAt = '长期';
                    }
                    let obj = {
                        name: a.name,
                        beginAt: beginAt,
                        endAt: endAt,
                        drawUrl: `http://we818.com/#/draw${a.drawUrl}`,
                        enable: (a.enable == 0) ? '下架' : '上架',
                        id: a.id
                    }
                    arr.push(obj)
                }
                this.loading = false;
                this.tableData = arr;
                this.dataTotal = res.data.data.count;
            })
        },
        search(){ // 查询
            let obj = {
                pageSize: this.pageSize
            };
            if(this.gameName != ''){
                obj.name = this.gameName;
            }
            if(this.gameStatusKey != '' && this.gameStatusKey != 'all'){
                obj.enable = this.gameStatusKey;
            }
            this.getList(obj)
        },
        scoreGameEdit(index, row){ //修改积分游戏
            this.$router.push({path: '/score-game-detail', query: {id: row.id}})
        },
        addScoreGame(){ //添加积分游戏
            this.$router.push({path: '/score-game-detail'})
        }
    },
    mounted(){
        this.getList({pageSize: this.pageSize})
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
</style>
