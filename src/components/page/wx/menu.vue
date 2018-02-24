<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 微信公众号管理</el-breadcrumb-item>
                <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content_box">
            <el-container>
                <el-aside width="301px">
                    <div class="imgBox">
                        <ul class="theme_postion">
                            <li class="list_style" v-for="(btn, btnIndex) in menuList" @click.stop="modifyBtn(btn, btnIndex)">
                                <el-dropdown trigger="click" :hide-on-click="false" placement="top">
                                  <span class="el-dropdown-link center_style">
                                    {{btn.name}}
                                  </span>
                                  <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(subBtn, subBtnindex) in btn.sub_button" @click.native.stop="modifySubBtn(subBtn, btnIndex, subBtnindex)">{{subBtn.name}}</el-dropdown-item>
                                    <el-dropdown-item v-if="btn.sub_button.length<5" @click.native.stop="addSubBtn(btnIndex)">新增+</el-dropdown-item>
                                  </el-dropdown-menu>
                                </el-dropdown>
                            </li>
                        </ul>
                    </div>
                </el-aside>
                <el-main>
                    <div class="theme_box">
                        <el-card class="box-card" v-if="modifyType == 'btn'">
                            <div slot="header" class="clearfix">
                                <span>{{btnTitle}}</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click.stop="removeTheme">删除菜单</el-button>
                                <el-button style="float: right; padding: 3px 20px" type="text" @click.stop="saveBtn">保存</el-button>
                            </div>
                            <div class="card_size">
                                <el-row>
                                    <el-col :span="4"><label class="label_style">菜单名称</label></el-col>
                                    <el-col :span="12"><el-input v-model="btnName" placeholder="请输入菜单名称" :maxlength="4"></el-input></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="4"><div>&nbsp</div></el-col>
                                    <el-col :span="12"><p class="tips">最多4个字</p></el-col>
                                </el-row>
                            </div>
                        </el-card>
                        <el-card class="box-card" v-if="modifyType == 'subBtn'">
                            <div slot="header" class="clearfix">
                                <span>{{btnTitle}}</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click.stop="removeTheme">删除子菜单</el-button>
                                <el-button style="float: right; padding: 3px 20px" type="text" @click.stop="saveSubBtn">保存</el-button>
                            </div>
                            <div class="card_size">
                                <el-row>
                                    <el-col :span="5"><label class="label_style">子菜单名称</label></el-col>
                                    <el-col :span="12"><el-input v-model="subButton.name" placeholder="请输入菜单名称" :maxlength="8"></el-input></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="5"><div>&nbsp</div></el-col>
                                    <el-col :span="12"><p class="tips">最多8个字</p></el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="5"><label class="label_style">子菜单内容</label></el-col>
                                    <el-col :span="12"><div class="ridio_hight"><el-radio v-model="sbTypeRadio" label="view">跳转网页</el-radio></div></el-col>
                                </el-row>
                                <el-row>
                                    <div class="link_box">
                                        <p class="tips tips_padding">订阅者点击该子菜单会跳转到以下地址</p>
                                        <el-row>
                                            <el-col :span="3"><label class="label_style">链接</label></el-col>
                                            <el-col :span="16"><el-input v-model="subButton.url" placeholder="请输入链接"></el-input></el-col>
                                        </el-row>
                                    </div>
                                </el-row>
                            </div>
                        </el-card>
                    </div>
                    <div>
                        <!-- <el-button class="save_style" @click.stop="rank">菜单排序</el-button>  -->
                        <el-button type="success" class="save_style" @click.stop="saveAll">保存并发布</el-button>
                    </div>
                </el-main>
            </el-container>
        </div>
<!--         <el-dialog title="排序" :visible.sync="rankDialogVisible" width="60%" :before-close="handleClose">
            <div class="rank_box">
                <div class="backage_box">
                    <ul class="rank_btn_list">
                        <li v-for="(item,index) in menuList">
                            <ul class="rank_sbBtn_list">
                                <li v-for="(i,iIndex) in item.sub_button">
                                    <input v-model="iIndex"></input>
                                </li>
                            </ul>
                            <input v-model="index"></input>
                        </li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button>取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import api_wx from 'api/wx'
// import {dragItem} from 'js/drag'
export default {
    data(){
        return {
            menuList: [],
            modifyType: '',
            btnTitle: '',
            btnName: '',
            subButton: {
                name: '',
                type: 'view',
                url: ''
            },
            bindex: null,
            sbIndex: null,
            sbTypeRadio: 'view',
            isAddSbBtn: false,
            // rankDialogVisible: false
        }
    },
    methods: {
        removeTheme(){
            this.$confirm('此操作将永久删除菜单, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(!!this.sbIndex || this.sbIndex == 0 || this.sbIndex == 10){
                    if(!this.isAddSbBtn){
                        this.menuList[this.bindex].sub_button.splice(this.sbIndex, 1);
                        this.modifyType = '';
                    }else{
                        return
                    }
                }else{
                    this.menuList.splice(this.bindex, 1)
                    let len = this.menuList.length;
                    this.listLengthFn(len, this.menuList);
                    this.modifyType = '';
                }
            }).catch(() => {});
        },
        getMenuList(){
            api_wx.wxMenuList().then(res => {
                if(res.data.code == '0'){
                    let list = res.data.data.menu.button;
                    let len = list.length;
                    let a = this.listLengthFn(len, list);
                    this.menuList = a;
                }
            })
        },
        modifyBtn(btn, bindex){
            this.modifyType = 'btn';
            this.btnTitle = btn.name;
            if(btn.name != "新增+"){
                this.btnName = btn.name;
            }else{
                this.btnName = ""; 
            }
            this.bindex = bindex;
            this.sbIndex = null;
        },
        modifySubBtn(btn, bindex, sbIndex){
            this.modifyType = 'subBtn';
            this.btnTitle = btn.name;
            this.bindex = bindex;
            this.sbIndex = sbIndex;
            this.subButton = btn;
            this.isAddSbBtn = false; 
        },
        addSubBtn(bindex){
            this.modifyType = 'subBtn';
            this.btnTitle = '新增+';
            this.bindex = bindex;
            this.sbIndex = 10;
            this.isAddSbBtn = true;
            this.subButton = {
                name: '',
                type: 'view',
                url: ''
            }
        },
        listLengthFn(len, list){
            if(len < 3){
                let obj = {
                    name: "新增+",
                    sub_button: []
                }
                list.push(obj);
                len++;
                return this.listLengthFn(len, list)
            }else{
                return list;
            }
        },
        saveBtn(){
           if(!!this.btnName){
                this.$set(this.menuList[this.bindex], 'name', this.btnName);
                this.modifyType = '';
            }
        },
        saveSubBtn(){
            if(!this.subButton.name || !this.subButton.name.trim()){
                this.$message('请填写子标题');
                return;
            }
            if(!this.subButton.url || !this.subButton.url.trim()){
                this.$message('请填写跳转地址');
                return;
            }else{
                if(!this.isURL(this.subButton.url)){
                    this.$message('请填写正确跳转链接');
                    return
                }
            }
            if(this.isAddSbBtn){
                this.menuList[this.bindex].sub_button.push(this.subButton);
            }else{
                this.$set(this.menuList[this.bindex].sub_button[this.sbIndex], 'name', this.subButton.name.trim());
                this.$set(this.menuList[this.bindex].sub_button[this.sbIndex], 'url', this.subButton.url.trim());
            }
            this.modifyType = '';
        },
        saveAll(){
            let obj = {'button': []};
            for(let i = 0; i < this.menuList.length; i++){
                if(this.menuList[i].sub_button.length>0 && this.menuList[i].name == '新增+'){
                    let mes = `第${i+1}个菜单未修改名称`;
                    this.$alert(mes, 'tips', { confirmButtonText: '确定', callback: action => {}});
                    return;
                }else{
                    if(this.menuList[i].name != '新增+'){
                        if(this.menuList[i].sub_button.length > 0){
                            obj.button.push(this.menuList[i])
                        }else{
                            let mes = `第${i+1}个主菜单未添加子菜单`;
                            this.$alert(mes, 'tips', { confirmButtonText: '确定', callback: action => {}}); 
                            return; 
                        }
                    }
                }
            }
            let newObj = {
                menu: JSON.stringify(obj)
            };
            api_wx.wxMenuUpdate(newObj).then(res => {
                if(res.data.code == ''){
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.modifyType = ''
                }else{
                    this.$message.error(res.data.userMessage)
                }
            })
        },
        isURL(str_url) {// 验证url  
            let URLRexExp = new RegExp(/^[A-Za-z]+:\/\//); 
            return URLRexExp.test(str_url);  
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        // rank(){
        //     this.rankDialogVisible = true;
        // }
    },
    created(){
        this.getMenuList();
    },
    mounted(){
        
    }
}
</script>

<style scoped>
.imgBox{
    margin: 22px 0px;
    width: 295px;
    height: 599px;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    background: url('../../../assets/phone.png') no-repeat;
    background-size: 294px 598px;
    position: relative;
}
.theme_postion{
    position: absolute;
    bottom: 14px;
    left: 47px;
    list-style: none;
}
.list_style{
    display: inline-block;
}
.center_style{
    display: inline-block;
    width: 82px;
    text-align: center;
}
.theme_box{
    width: 675px;
    height: 530px;
    /*background-color: #F4F5F9;*/
}
.card_size{
    width: 100%;
    height: 430px;
}
.label_style{
    display: inline-block;
    height: 40px;
    line-height: 40px;
}
.save_style{
    margin-top: 15px;
    margin-left: 50px;
}
.tips{
    font-size: 12px;
    color: #999;
}
.ridio_hight{
    height: 40px;
    line-height: 40px;
}
.link_box{
    width: 80%;
    height: 100px;
    border: 1px solid #999;
    margin: 0 auto;
    padding: 13px 15px;
    box-sizing: border-box;
}
.tips_padding{
    margin-bottom: 13px;
}
label{
    font-size: 14px;
    color: #666;
}
.rank_box{
    height: 500px;
}
.backage_box{
    width: 240px;
    height: 498px;
    margin: 0 auto;
    background: url('../../../assets/phone.png') no-repeat;
    background-size: 100%;
    position: relative;
}
.rank_btn_list{
    position: absolute;
    bottom: 38px;
    left: 37px;
    list-style: none; 
}
.rank_btn_list li{
    display: inline-block;
    width: 65px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
}
.backage_box input{
    background: none;  
    outline: none;  
    border: 0px;
    width: 60px;
    text-indent: 2em;
}
</style>