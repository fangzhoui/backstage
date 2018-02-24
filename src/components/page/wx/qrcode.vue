<template>
    <div>
        <div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 微信公众号管理</el-breadcrumb-item>
                <el-breadcrumb-item>二维码管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="history_body">
        	<el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-button type='primary' @click='addQr'>添加</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" stripe style="width: 100%" max-height="450">
                    	<el-table-column prop="name" width="120"  label="标题" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="greeting"  label="回复内容" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="qrcodeUrl" label="二维码地址" :show-overflow-tooltip="false">
							<template slot-scope="scope">
							<el-popover trigger="hover" placement="top">
								<img :src="scope.row.qrcodeUrl" class="qrcode_size">
								<div slot="reference" class="name-wrapper">
									<el-tag size="medium">{{ scope.row.qrcodeUrl }}</el-tag>
								</div>
							</el-popover>
							</template>
                        </el-table-column>
                        <el-table-column  prop="pinter" width='240' label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click.stop="qrCodeEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" @click.stop="collectPacks" v-clipboard="scope.row.qrcodeUrl">复制</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>
        <el-dialog title="编辑" :visible.sync="qrDialogVisible" width="60%" :before-close="handleClose">
            <el-form ref="qrFrom" :model="qrFrom" label-width="80px" :rules="qrRules">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="qrFrom.name" :disabled="!!id"></el-input>
                </el-form-item>
                <el-form-item label="回复内容" prop="greeting">
                    <el-input type="textarea" :rows="9" v-model="qrFrom.greeting"></el-input>
                </el-form-item>
                <p><a href="http://link.ipaiban.com/#" target="view_window">超链接生成请点击此处</a></p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelQrWordFn('qrFrom')">取 消</el-button>
                <el-button type="primary" @click="saveQrWordFn('qrFrom')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import api_wx from 'api/wx'
export default {
    data(){
        return {
        	tableData: [],
        	qrDialogVisible: false,
        	loading: false,
        	qrFrom: {
        		name: '',
        		greeting: ''
        	},
        	qrRules: {
                name: [
                    { required: true, message: '请输入关键词', trigger: 'blur' },
                ],
                greeting: [
                    { required: true, message: '请输入回复内容', trigger: 'blur' },
                ],
            },
            id: null,
        }
    },
    created(){
    	this.getQrList();
    },
    methods: {
    	getQrList(){
    		api_wx.wxQrlist().then(res => {
    			if(res.data.code == '0'){
		    		this.tableData = res.data.data;
    			}
	    	})
    	},
    	addQr(){
    		this.qrDialogVisible = true;
    		this.id = null;
    	},
    	qrCodeEdit(index, row){
    		this.id = row.id;
    		this.qrFrom.name = row.name;
    		this.qrFrom.greeting = row.greeting;
    		this.qrDialogVisible = true;
    	},
    	cancelQrWordFn(formName){
    		this.qrFrom = {
                name: '',
                greeting: ''
            };
            this.id = null;
    		this.qrDialogVisible = false;
    	},
    	saveQrWordFn(formName){
    		this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!!this.id){
                        let obj = {
                            id: this.id,
                            greeting : this.qrFrom.greeting,
                        }
                        api_wx.wxQrUpdate(obj).then(res => {
                            if(res.data.code == '0'){
                                this.getQrList();
                                this.qrFrom = {
					                name: '',
					                greeting: ''
					            };
					            this.id = null;
                                this.qrDialogVisible = false;
                            }else{
                                this.$message(res.data.userMessage);
                            }
                        })
                    }else{
                        let obj = {
                            name : this.qrFrom.name ,
                            greeting: this.qrFrom.greeting
                        }
                        api_wx.wxQrInsert(obj).then(res => {
                            if(res.data.code == '0'){
                                this.getQrList();
                                this.qrFrom = {
					                name: '',
					                greeting: ''
					            };
                                this.qrDialogVisible = false;  
                            }else{
                                this.$message(res.data.userMessage);
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
    	},
    	handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                this.qrFrom = {
                    name: '',
                    greeting: ''
                };
                this.id = null;
                done();
            }).catch(_ => {});
        },
        collectPacks(){
            this.$message({
                message: '复制成功',
                type: 'success'
            });
        },
    }
}
</script>

<style scoped>
.history_body {
    margin-top: 20px;
}
.qrcode_size{
	width: 150px;
	height: 150px;
}
</style>