<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 统计管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户统计</el-breadcrumb-item>
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
                            <el-input placeholder="手机号" v-model="phone"></el-input>
                        </el-col>
                        <el-col :span="3">
                             <el-select v-model="fromKey" placeholder="来源">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in fromKeySelect" :label="item" :value="item"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="3">
                             <el-select v-model="avatarSelect" placeholder="角色">
                                <el-option label="全部" value="all"></el-option>
                                <el-option v-for="(item, index) in avatarList" :label="item.label" :value="item.value"></el-option>
                             </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-button type='primary' @click="search">搜索</el-button>
                            <el-button @click='exportFn'>导出</el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="userName" label="用户名">
                        </el-table-column>
                        <el-table-column prop="phone" label="电话">
                        </el-table-column>
                        <el-table-column prop="role" width="180" label="角色">
                        </el-table-column>
                        <el-table-column prop="fromKey" width="180" label="来源">
                        </el-table-column>
                        <el-table-column  prop="createAt" width="240" label="时间">
                        </el-table-column>
                        <el-table-column width='120' label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" size="medium" @click="getDetail(scope.$index, scope.row)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagenation_pane">
                    <el-pagination
                        small
                        layout="total, prev, pager, next"
                        :page-size="pageSize"
                        @current-change="userCurrentChange"
                        :current-page="currentpage"
                        :total="dataTotal">
                    </el-pagination>
                </div>
            </el-card>
        </div>
         <el-dialog :visible.sync="userDetail">
            <h3 class="table_title">基本资料</h3>
            <table class="user_table" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="tdT" width='80'>用户名</td>
                  <td class="tdC" width='240'>{{userDetailMes.userName}}</td>
                  <td class="tdT" width='80'>来源</td>
                  <td class="tdC" width='240'>{{userDetailMes.fromKey}}</td>
                </tr>   
                <tr>
                  <td class="tdT" width='80'>手机号</td>
                  <td class="tdC" width='240'>{{userDetailMes.phone}}</td>
                  <td class="tdT" width='80'>注册时间</td>
                  <td class="tdC" width='240'>{{userDetailMes.createAt}}</td>
                </tr>
                <tr>
                  <td class="tdT" width='80'>角色</td>
                  <td class="tdC" width='240'>{{userDetailMes.userType}}</td>
                  <td class="tdT" width='80'></td>
                  <td class="tdC" width='240'></td>
                </tr>
                <tr>
                  <td class="tdT" width='80'>微信</td>
                  <td class="tdC" width='240'>{{userDetailMes.wxid}}</td>
                  <td class="tdT" width='80'>微信昵称</td>
                  <td class="tdC" width='240'>{{userDetailMes.nickName}}</td>
                </tr>
            </table>
            <h3 class="table_title paT">地址</h3>
            <div class="table_adress">
                <div class="table_item" v-for="item in userDetailMes.adressList">
                    <p class="adress_item">地址: {{item.adress}}</p>
                    <p class="adress_item">
                        <span class="item_span">收件人: {{item.user}}</span>
                        <span class="item_span">手机: {{item.phone}}</span>
                    </p>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="hideUserDetail">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api_count from 'api/count'
import {formatDate, formatDate2} from 'js/date'
export default {
    name: 'history-page',
    data(){
        return {
            userDetail: false,
            loading: false,
            pageSize: 10,
            page: '',
            time: '',
            phone: '',
            fromKey: '',
            currentpage: 1,
            tableData: [],
            dataTotal: null,
            timeState: false,
            searchState: false,
            fromKeySelect: [],
            avatarSelect: '',
            avatarList: [{value: '0', label: '注册用户'}, {value: '1', label: '管理员'}, {value: '2', label: '游客'}],
            userDetailMes: {
                userName: '',
                fromKey: '',
                phone: '',
                createAt: '',
                userType: '',
                wxid: '',
                nickName: '',
                adressList: []
            }
        }
    },
    watch: {
        'userDetail'(f, n){
            if(!f){
                this.userDetailMes = {
                    userName: '',
                    fromKey: '',
                    phone: '',
                    createAt: '',
                    userType: '',
                    wxid: '',
                    nickName: '',
                    adressList: []
                }
            }
        }
    },
    methods: {
        getFromkey(){
            api_count.fromKeyList().then(res=> {
                this.fromKeySelect = res.data.data
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
            api_count.userList(getObj).then(res=> {
                let arr = [];
                let data = res.data.data.list;
                for(let a of data){
                    let createdTime = new Date(a.createAt)
                    let obj = {
                        id: a.id,
                        createAt: formatDate(createdTime, 'yyyy-MM-dd'),
                        phone: a.phone,
                    }
                    try{
                        obj.userName = a.profile.nickname;
                    }catch(err){
                        obj.userName = a.username;
                    }
                    try{
                        obj.fromKey = a.profile.fromKey;
                    }catch(err){
                        obj.fromKey = '';
                    }
                    if(a.role == 0){
                        obj.role = '注册用户';
                    }else if(a.role == 1){
                        obj.role = '管理员';
                    }else if(a.role == 2){
                        obj.role = '游客';
                    }
                    arr.push(obj);
                };
                this.loading = false;
                this.tableData = arr;
                this.dataTotal = res.data.data.total;
            })
        },
        userCurrentChange(page){
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
            api_count.export(obj).then( ()=> {
                this.$confirm('是否下载？').then((res)=> {
                    let u = sessionStorage.getItem('exportUrl')
                    window.location.href = u
                }).catch(()=> {return})
            });
        },
        getDetail(index, row){ //查看详情
            let obj = {id: row.id};
            api_count.userDetail(obj).then((res) => {
                if(res.data.code == '0'){
                    let data = res.data.data;
                    if(data.user.role == 0 || data.user.role == 1){
                        this.userDetailMes.userName = data.user.username;                        
                    } else {
                        try{
                            this.userDetailMes.userName = data.user.profile.nickname;
                        }catch(err){
                            this.userDetailMes.userName = '';
                        }
                    }
                    try{
                        this.userDetailMes.fromKey = data.user.profile.fromKey;
                    }catch(err){
                        this.userDetailMes.fromKey = '';
                    }
                    this.userDetailMes.phone = data.user.phone;
                    this.userDetailMes.createAt = data.user.createAtString;
                    if(data.user.role == 0){
                        this.userDetailMes.userType = '注册用户';
                    }else if(data.user.role == 1){
                        this.userDetailMes.userType = '管理员';
                    }else if(data.user.role == 2){
                        this.userDetailMes.userType = '游客';
                    }
                    if(data.user.role == 2) {
                        this.userDetailMes.wxid = data.user.username;
                        try{
                            this.userDetailMes.nickName = data.user.profile.nickname;
                        }catch(err){
                            this.userDetailMes.nickName = '';
                        }
                    }
                    data.addressList.forEach((item) => {
                        let a = {
                            adress: item.provinceName + item.cityName + item.districtName + item.address + ',' + item.cityId,
                            user: item.receiver,
                            phone: item.phone
                        }
                        this.userDetailMes.adressList.push(a);
                    })
                    this.userDetail = true;
                }
            })
        },
        hideUserDetail(){ // 关闭详情
            this.userDetail = false;
        },
        choseObj(){
            let obj = {};
            if(this.phone != ''){
                this.phone = this.phone.trim();
                if(this.phone.match(/^1[35678]\d{9}$/g)){
                    let pObj = {phone: this.phone}
                    Object.assign(obj, pObj)
                }else {
                    this.$message('这不是正确的电话号码哦')
                    this.phone = ''
                    return
                }
            }
            if(this.fromKey != '' && this.fromKey != 'all'){
                obj.fromKey = this.fromKey;
            }
            if(this.avatarSelect != '' && this.avatarSelect != 'all'){
                obj.role = Number(this.avatarSelect);
            }
            if( this.time != '' && !!this.time ){
                let time = formatDate2(this.time);
                obj.timeBegin = time.begin;
                obj.timeEnd = time.end;
            }
            return obj;
        }
    },
    mounted(){
        this.getList({pageSize: this.pageSize})
        this.getFromkey()
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
