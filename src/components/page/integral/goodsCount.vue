<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 积分商城</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-input placeholder="商品名称" v-model="goodName"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-select v-model="typeSelectKey" placeholder="商品类型">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in typeSelect" :label="item.name" :value="item.type"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                             <el-select v-model="goodsTypeSelectKey" placeholder="商品分类">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in goodsTypeSelect" :label="item.name" :value="item.type"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="4">
                             <el-select v-model="goodsScore" placeholder="商品积分">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in goodsScoreSelect" :label="item" :value="item"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="4">
                             <el-select v-model="goodsPrice" placeholder="商品价格">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in goodsPriceSelect" :label="item" :value="item"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-button type='primary' @click="search">查询</el-button>
                            <el-button @click='addGoods'>添加</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" stripe style="width: 100%" @selection-change="goodsSelectionChange">
                        <el-table-column type="selection" width="100" fixed></el-table-column>
                        <el-table-column prop="name" width="180" label="商品名称"></el-table-column>
                        <el-table-column prop="type" width="180" label="商品类型"></el-table-column>
                        <el-table-column prop="goodsType" width="160" label="商品分类"></el-table-column>
                        <el-table-column prop="quantity" width="160" label="单份数量"></el-table-column>
                        <el-table-column prop="unit" width="160" label="单位"></el-table-column>
                        <el-table-column prop="needScoreCount" width="120" label="积分"></el-table-column>
                        <el-table-column prop="price" width="160" label="价格/元"></el-table-column>
                        <el-table-column prop="enable" width="120" label="状态"></el-table-column>
                        <el-table-column prop="stock" width="120" label="库存"></el-table-column>
                        <el-table-column  prop="pinter" width='120' label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" size="medium" @click="goodsEdit(scope.$index, scope.row)">查看详情</el-button>
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
                      :current-page="currentpage"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="dataTotal">
                    </el-pagination>
                </div>
                <div class="btn_wrap">
                  <el-button type="primary" @click="goodsDelect">批量删除</el-button>
                  <el-button type="primary" @click="goodsUp">批量上架</el-button>
                  <el-button type="primary" @click="goodsDown">批量下架</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>



<script>
import api_integral from 'api/integral'

export default {
    name: 'goods-count',
    data(){
        return {
            loading: false,
            pageSize: 10,
            currentpage: 1,
            page: '',
            time: '',
            tableData: [],
            dataTotal: null,
            typeSelect: [{name: '流量', type: '0'}, {name: '兑奖码', type: '1'}, {name: '实物寄送', type: '2'}],
            goodsTypeSelect: [{name:'销售类', type: '0'}, {name:'抽奖类', type: '1'}],
            goodsScoreSelect: ['0-1000', '1001-2000'],
            goodsPriceSelect: ['0-100', '101-200'],
            goodName: '', // 查询商品名称
            typeSelectKey: '',
            goodsTypeSelectKey:'',
            goodsScore: '',
            goodsPrice: '',
            goodSelection: [], //选中的项目
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
            if(this.goodName != ''){
                obj.name = this.goodName;
            }
            if(this.typeSelectKey != '' && this.typeSelectKey != 'all'){
                obj.type = Number(this.typeSelectKey);
            }
            if(this.goodsTypeSelectKey != '' && this.goodsTypeSelectKey != 'all'){
                obj.position = Number(this.goodsTypeSelectKey);
            }
            if(this.goodsScore != '' && this.goodsScore != 'all'){
                obj.lowScore = Number(this.goodsScore.split('-')[0]);
                obj.topScore = Number(this.goodsScore.split('-')[1]);
            }
            if(this.goodsPrice != '' && this.goodsPrice != 'all'){
                obj.lowPrice = Number(this.goodsPrice.split('-')[0]);
                obj.topPrice = Number(this.goodsPrice.split('-')[1]);
            }
            this.searchFn(obj)
        },
        goodsSelectionChange(val) {
            this.goodSelection = val;
        },
        search(){ // 查询
            let obj = {};
            if(this.goodName != ''){
                obj.name = this.goodName;
            }
            if(this.typeSelectKey != '' && this.typeSelectKey != 'all'){
                obj.type = Number(this.typeSelectKey);
            }
            if(this.goodsTypeSelectKey != '' && this.goodsTypeSelectKey != 'all'){
                obj.position = Number(this.goodsTypeSelectKey);
            }
            if(this.goodsScore != '' && this.goodsScore != 'all'){
                obj.lowScore = Number(this.goodsScore.split('-')[0]);
                obj.topScore = Number(this.goodsScore.split('-')[1]);
            }
            if(this.goodsPrice != '' && this.goodsPrice != 'all'){
                obj.lowPrice = Number(this.goodsPrice.split('-')[0]);
                obj.topPrice = Number(this.goodsPrice.split('-')[1]);
            }
            this.searchFn(obj)
        },
        searchFn(obj){
            let _self = this;
            this.loading = true;
            api_integral.searchCommodity(obj).then(res=> {
                let arr = [];
                let data = res.data.data.commodityList;
                for(let a of data){
                    let type = '';
                    switch(a.type){
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
                    let obj = {
                        name: a.name,
                        type: type,
                        goodsType: a.position==0? '销售类' : '抽奖类',
                        quantity: a.quantity,
                        unit: a.unit,
                        needScoreCount: a.needScoreCount,
                        price: a.price,
                        enable: a.enable == 0 ? '下架': '上架',
                        stock: a.stock,
                        id: a.id
                    }
                    arr.push(obj)
                }
                this.loading = false;
                this.tableData = arr;
                this.dataTotal = res.data.data.count;
            })
        },
        goodsEdit(index, row){ //操作详情
            this.$router.push({path: '/goods-detail', query: {id: row.id}})
        },
        addGoods(){
            this.$router.push({path: '/goods-detail'})
        },
        goodsDelect(){ // 批量删除
            let _self = this;
            let arr = [];
            let obj = {};
            if(_self.goodSelection.length <= 0){
                _self.$message({
                  message: '您未选择任何商品',
                  type: 'warning'
                });
                return
            }
            _self.$confirm('确定删除选中项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _self.goodSelection.forEach((item) => {
                    arr.push(item.id)
                });
                obj.id = JSON.stringify(arr);
                api_integral.goodsDelete(obj).then(res=> {
                    if(res.data.code == '0'){
                        let obj = {
                            pageSize: _self.pageSize
                        }
                        _self.searchFn(obj);
                    }
                })
            })
        },
        goodsUp(){
            let _self = this;
            let arr = [];
            let obj = {};
            if(_self.goodSelection.length <= 0){
                _self.$message({
                  message: '您未选择任何商品',
                  type: 'warning'
                });
                return
            }
            _self.$confirm('确定删除选中项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _self.goodSelection.forEach((item) => {
                    arr.push(item.id)
                });
                obj.id = JSON.stringify(arr);

                api_integral.goodsUp(obj).then(res=> {
                    if(res.data.code == '0'){
                        let obj = {
                            pageSize: _self.pageSize
                        }
                        _self.searchFn(obj);
                    }
                })
            })
        },
        goodsDown(){
            let _self = this;
            let arr = [];
            let obj = {};
            if(_self.goodSelection.length <= 0){
                _self.$message({
                  message: '您未选择任何商品',
                  type: 'warning'
                });
                return
            }
            _self.$confirm('确定删除选中项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _self.goodSelection.forEach((item) => {
                    arr.push(item.id)
                });
                obj.id = JSON.stringify(arr);
                api_integral.goodsDown(obj).then(res=> {
                    if(res.data.code == '0'){
                        let obj = {
                            pageSize: _self.pageSize
                        }
                        _self.searchFn(obj);
                    }
                })
            })
        }
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
</style>
