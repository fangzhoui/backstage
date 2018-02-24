<template>
<div>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i> 统计管理</el-breadcrumb-item>
            <el-breadcrumb-item>浏览记录</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="history_body">
        <el-card>
            <div slot="header">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期范围">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="6">
                        <el-input placeholder="请输入要搜索的电话" v-model="phone"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type='primary' @click="search">搜索</el-button>
                    </el-col>
                </el-row>
            </div>

            <div>
                <el-table v-loading.body.lock="loading" :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="name" label="名称" width="200">
                    </el-table-column>
                    <el-table-column prop="subName" label="副标题">
                    </el-table-column>
                    <el-table-column prop="linkType" width="180" label="类型">
                    </el-table-column>
                    <el-table-column prop="fromKey" width="180" label="来源">
                    </el-table-column>
                    <el-table-column prop="createAt" label="时间">
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagenation_pane">
                <el-pagination small layout="total,prev, pager, next" :page-size="pageSize" @current-change="handleCurrentChange" :current-page="currentpage" :total="dataTotal">
                </el-pagination>
            </div>
        </el-card>
    </div>
</div>
</template>



<script>
import api_count from 'api/count'

export default {
    name: 'history-page',
    data() {
        return {
            loading: false,
            pageSize: 10,
            page: '',
            time: '',
            phone: '',
            tableData: [],
            dataTotal: null,
            currentpage: 1,
            timeState: false,
            searchState: false,
        }
    },
    methods: {
        timeFn(val) {
            let date = new Date(val)
            let y = date.getFullYear()
            let m = (date.getMonth() + 1 < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1)
            let d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
            let h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
            let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
            let sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
            return (`${y}-${m}-${d} ${h}:${min}:${sec}`)
        },
        search() {
            // 处理时间
            let t = this.time
            if (t.length > 0) {
                // 时间不为空
                if (t[0] != null) {
                    let y1 = t[0].getFullYear()
                    let y2 = t[1].getFullYear()
                    let m1 = ((t[0].getMonth() + 1) < 10 ? `0${(t[0].getMonth()+1)}` : (t[0].getMonth() + 1))
                    let m2 = ((t[1].getMonth() + 1) < 10 ? `0${(t[1].getMonth()+1)}` : (t[1].getMonth() + 1))
                    let d1 = (t[0].getDate() < 10 ? `0${t[0].getDate()}` : t[0].getDate())
                    let d2 = (t[1].getDate() < 10 ? `0${t[1].getDate()}` : t[1].getDate())
                    let tbegin = `${y1}-${m1}-${d1} 00:00:00`
                    let tend = `${y2}-${m2}-${d2} 23:59:59`
                    this.timeState = true
                    if (this.phone == '') {
                        // 电话为空
                        let obj = {
                            timeBegin: tbegin,
                            timeEnd: tend,
                        }
                        api_count.history(obj).then(res => {
                            // this.tableData = res.data.data.list
                            let data = res.data.data.list
                            let arr = []
                            for (let a of data) {
                                let obj = {
                                    name: a.name,
                                    subName: a.subName,
                                    linkType: a.linkType,
                                    fromKey: a.fromKey,
                                    createAt: this.timeFn(a.createAt)
                                }
                                arr.push(obj)
                            }
                            this.tableData = arr
                            this.dataTotal = res.data.data.total
                        })
                    } else {
                        // 电话不为空
                        let obj = {
                            timeBegin: tbegin,
                            timeEnd: tend,
                            phone: this.phone
                        }
                        api_count.history(obj).then(res => {
                            // this.tableData = res.data.data.list
                            let data = res.data.data.list
                            let arr = []
                            for (let a of data) {
                                let obj = {
                                    name: a.name,
                                    subName: a.subName,
                                    linkType: a.linkType,
                                    fromKey: a.fromKey,
                                    createAt: this.timeFn(a.createAt)
                                }
                                arr.push(obj)
                            }
                            this.tableData = arr
                            this.dataTotal = res.data.data.total
                        })
                    }
                } else {
                    // 时间为空
                    this.timeState = false
                    if (this.phone == '') {
                        this.$message('请输入要搜索的关键字段')
                        this.getList()
                        return
                    } else {
                        if (this.phone.match(/^1[35678]\d{9}$/g)) {
                            api_count.history({
                                phone: this.phone
                            }).then(res => {
                                // this.tableData = res.data.data.list
                                let data = res.data.data.list
                                let arr = []
                                for (let a of data) {
                                    let obj = {
                                        name: a.name,
                                        subName: a.subName,
                                        linkType: a.linkType,
                                        fromKey: a.fromKey,
                                        createAt: this.timeFn(a.createAt)
                                    }
                                    arr.push(obj)
                                }
                                this.tableData = arr
                                this.dataTotal = res.data.data.total
                            })
                        } else {
                            this.$message('请输入正确的电话号码')
                            return
                        }

                    }
                }
            } else {
                // 时间为空
                this.timeState = false
                if (this.phone == '') {
                    this.$message('请输入要搜索的关键字段')
                    this.getList()
                    return
                } else {
                    if (this.phone.match(/^1[35678]\d{9}$/g)) {
                        api_count.history({
                            phone: this.phone
                        }).then(res => {
                            // this.tableData = res.data.data.list
                            let data = res.data.data.list
                            let arr = []
                            for (let a of data) {
                                let obj = {
                                    name: a.name,
                                    subName: a.subName,
                                    linkType: a.linkType,
                                    fromKey: a.fromKey,
                                    createAt: this.timeFn(a.createAt)
                                }
                                arr.push(obj)
                            }
                            this.tableData = arr
                            this.dataTotal = res.data.data.total
                        })
                    } else {
                        this.$message('请输入正确的电话号码')
                        return
                    }

                }
            }
        },
        getList() {
            api_count.history({
                pageSize: this.pageSize
            }).then(res => {
                // this.tableData = res.data.data.list
                let data = res.data.data.list
                let arr = []
                for (let a of data) {
                    let obj = {
                        name: a.name,
                        subName: a.subName,
                        linkType: a.linkType,
                        fromKey: a.fromKey,
                        createAt: this.timeFn(a.createAt)
                    }
                    arr.push(obj)
                }
                this.tableData = arr
                this.dataTotal = res.data.data.total
            })
        },
        handleCurrentChange(page) {
            if (this.timeState) {
                let t = this.time
                let y1 = t[0].getFullYear()
                let y2 = t[1].getFullYear()
                let m1 = ((t[0].getMonth() + 1) < 10 ? `0${(t[0].getMonth()+1)}` : (t[0].getMonth() + 1))
                let m2 = ((t[1].getMonth() + 1) < 10 ? `0${(t[1].getMonth()+1)}` : (t[1].getMonth() + 1))
                let d1 = (t[0].getDate() < 10 ? `0${t[0].getDate()}` : t[0].getDate())
                let d2 = (t[1].getDate() < 10 ? `0${t[1].getDate()}` : t[1].getDate())
                let tbegin = `${y1}-${m1}-${d1} 00:00:00`
                let tend = `${y2}-${m2}-${d2} 23:59:59`
                if (this.phone == '') {
                    let obj = {
                        timeBegin: tbegin,
                        timeEnd: tend,
                        page: page,
                        pageSize: this.pageSize
                    }
                    this.loading = true
                    api_count.history(obj).then(res => {
                        if (res.data.code == 0) {
                            // this.tableData = res.data.data.list
                            let data = res.data.data.list
                            let arr = []
                            for (let a of data) {
                                let obj = {
                                    name: a.name,
                                    subName: a.subName,
                                    linkType: a.linkType,
                                    fromKey: a.fromKey,
                                    createAt: this.timeFn(a.createAt)
                                }
                                arr.push(obj)
                            }
                            this.tableData = arr
                            this.dataTotal = res.data.data.total
                            this.loading = false
                        } else {
                            this.loading = false
                        }
                    })
                } else {
                    let obj = {
                        timeBegin: tbegin,
                        timeEnd: tend,
                        phone: this.phone,
                        page: page,
                        pageSize: this.pageSize
                    }
                    this.loading = true
                    api_count.history(obj).then(res => {
                        if (res.data.code == 0) {
                            // this.tableData = res.data.data.list
                            let data = res.data.data.list
                            let arr = []
                            for (let a of data) {
                                let obj = {
                                    name: a.name,
                                    subName: a.subName,
                                    linkType: a.linkType,
                                    fromKey: a.fromKey,
                                    createAt: this.timeFn(a.createAt)
                                }
                                arr.push(obj)
                            }
                            this.tableData = arr
                            this.dataTotal = res.data.data.total
                            this.loading = false
                        } else {
                            this.loading = false
                        }
                    })
                }
            } else {
                if (this.phone == '') {
                    let obj = {
                        page: page,
                        pageSize: this.pageSize
                    }
                    this.loading = true
                    api_count.history(obj).then(res => {
                        if (res.data.code == 0) {
                            // this.tableData = res.data.data.list
                            let data = res.data.data.list
                            let arr = []
                            for (let a of data) {
                                let obj = {
                                    name: a.name,
                                    subName: a.subName,
                                    linkType: a.linkType,
                                    fromKey: a.fromKey,
                                    createAt: this.timeFn(a.createAt)
                                }
                                arr.push(obj)
                            }
                            this.tableData = arr
                            this.dataTotal = res.data.data.total
                            this.loading = false
                        } else {
                            this.loading = false
                        }
                    })
                } else {
                    let obj = {
                        phone: this.phone,
                        page: page,
                        pageSize: this.pageSize
                    }
                    this.loading = true
                    api_count.history(obj).then(res => {
                        if (res.data.code == 0) {
                            // this.tableData = res.data.data.list
                            let data = res.data.data.list
                            let arr = []
                            for (let a of data) {
                                let obj = {
                                    name: a.name,
                                    subName: a.subName,
                                    linkType: a.linkType,
                                    fromKey: a.fromKey,
                                    createAt: this.timeFn(a.createAt)
                                }
                                arr.push(obj)
                            }
                            this.tableData = arr
                            this.dataTotal = res.data.data.total
                            this.loading = false
                        } else {
                            this.loading = false
                        }
                    })
                }
            }

        }
    },
    mounted() {
        this.getList()
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
