<template>
	<div class="package_wrap">
		<div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-sold-out"></i> 礼包管理</el-breadcrumb-item>
                <el-breadcrumb-item>礼包领取</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
            <el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <el-input placeholder="礼包名称" v-model="packageName"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-input placeholder="账号" v-model="userId"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围"></el-date-picker>
                        </el-col>
                        <el-col :span="4">
                            <el-button type='primary' @click="search">查询</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" stripe style="width: 100%">
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="packageName" width="240" label="礼包名称"></el-table-column>
                        <el-table-column prop="nickname" width="180" label="领取人"></el-table-column>
                        <el-table-column prop="userName" width="180" label="账号"></el-table-column>
                        <el-table-column prop="cdkey" label="兑换码"></el-table-column>
                        <el-table-column prop="createAt" label="领取时间"></el-table-column>
                    </el-table>
                </div>

                <div class="pagenation_pane">
                    <el-pagination
                      @current-change="giftCurrentChange"
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
import giftApi from 'api/package'
import {formatDate, formatDate2} from 'js/date'
export default {
	name: "package-list",
	data(){
		return {
			loading: false,
			page: '',
			pageSize: 10,
			packageName: '',
			userId: '',
			time: '',
			dataTotal: 0,
			tableData: []
		}
	},
	created(){
		this.getList({pageSize: this.pageSize})
	},
	methods:{
		getList(obj){
			this.loading = true;
			giftApi.findCdKey(obj).then(res => {
				if(res.data.code == '0'){
					console.log(res)
					let data = res.data.data.list;
					data.forEach((item) => {
						let time = new Date(item.createAt);
						item.createAt = formatDate(time, 'yyyy-MM-dd')
					});
					this.tableData = res.data.data.list;
					this.dataTotal = res.data.data.count;
					this.loading = false;
				}
			})
		},
		search(){
			let obj = {
				page: 1,
				pageSize: this.pageSize
			}
			let newObj = this.choseObj();
			Object.assign(obj, newObj);
			this.getList(obj);
		},
		giftCurrentChange(a){
			let obj = {
				page: a,
				pageSize: this.pageSize
			}
			let newObj = this.choseObj();
			Object.assign(obj, newObj);
			this.getList(obj)
		},
		choseObj(){
            let obj = {};
            if( this.time != '' && this.time != null && this.time != undefined ){
                let time = formatDate2(this.time);
                obj.timeBegin = time.begin;
                obj.timeEnd = time.end;
            }
            if(!!this.packageName && this.packageName != ''){
				obj.packageName = this.packageName.trim()
			}
			if(!!this.userId && this.userId != ''){
				obj.phone = this.userId.trim()
			}
            return obj;
        }
	}
}
</script>

<style scoped>
.package_wrap{

}

.history_body {
    margin-top: 20px;
}
</style>
