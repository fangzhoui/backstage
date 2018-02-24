<template>
	<div>
		<div>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-star-on"></i> 微信公众号管理</el-breadcrumb-item>
                <el-breadcrumb-item>自动回复</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="history_body">
        	<el-card>
                <div slot="header">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-button type='primary' @click='addReplayWord'>添加</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div>
                    <el-table v-loading.body.loak="loading" :data="tableData" stripe style="width: 100%" max-height="450">
                        <el-table-column prop="keywords" width='180' label="关键词"></el-table-column>
                        <el-table-column prop="replyContent" label="回复内容" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column  prop="pinter" width='240' label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="wordReplayEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="mini" type="danger" @click="wordReplayDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>
        <el-dialog title="编辑" :visible.sync="replayDialogVisible" width="60%" :before-close="handleClose">
            <el-form ref="replayFrom" :model="replayFrom" label-width="80px" :rules="RepalyRules">
                <el-form-item label="关键词" prop="word">
                    <el-input v-model="replayFrom.word"></el-input>
                </el-form-item>
                <el-form-item label="回复内容" prop="replay">
                    <el-input type="textarea" :rows="9" v-model="replayFrom.replay"></el-input>
                </el-form-item>
                <p><a href="http://link.ipaiban.com/#" target="view_window">超链接生成请点击此处</a></p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelReplayWordFn">取 消</el-button>
                <el-button type="primary" @click="addReplayWordFn('replayFrom')">确 定</el-button>
            </span>
        </el-dialog>
	</div>
</template>

<script>
import api_wx from 'api/wx'
export default {
	name: "wx-autoreply",
	data(){
		return {
			searchContent: '',
			tableData: [],
            loading: false,
            replayDialogVisible: false,
            replayFrom: {
                word: '',
                replay: ''
            },
            RepalyRules: {
                word: [
                    { required: true, message: '请输入关键词', trigger: 'blur' },
                ],
                replay: [
                    { required: true, message: '请输入回复内容', trigger: 'blur' },
                ],
            },
            id: null,
	    }
	},
	methods: {
        addReplayWord(){
            this.id = null;
            this.replayDialogVisible = true;
        },
        addReplayWordFn(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(!!this.id){
                        let obj = {
                            id: this.id,
                            keywords: this.replayFrom.word,
                            replyContent: this.replayFrom.replay
                        }
                        api_wx.wxWordUpdate(obj).then(res => {
                            if(res.data.code == '0'){
                                this.getWordList();
                                this.replayFrom = {
                                    word: '',
                                    replay: ''
                                };
                                this.replayDialogVisible = false;
                            }else{
                                this.$message(res.data.userMessage);
                            }
                        })
                    }else{
                        let obj = {
                            keywords: this.replayFrom.word,
                            replyContent: this.replayFrom.replay
                        }
                        api_wx.wxWordInsert(obj).then(res => {
                            if(res.data.code == '0'){
                                this.getWordList();
                                this.replayFrom = {
                                    word: '',
                                    replay: ''
                                };
                                this.replayDialogVisible = false;   
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
        cancelReplayWordFn(){
            this.replayFrom = {
                word: '',
                replay: ''
            };
           this.replayDialogVisible = false; 
        },
        wordReplayEdit(index, row){
            this.id = row.id;
            this.replayFrom.word = row.keywords;
            this.replayFrom.replay = row.replyContent;
            this.replayDialogVisible = true;
        },
        wordReplayDelete(index, row){
            this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let obj = {
                    id: row.id
                }
                api_wx.wxWordDelete(obj).then(res => {
                    if(res.data.code == '0'){
                        this.$message('删除成功');
                        this.tableData.splice(index, 1)
                    }else{
                        this.$message(res.data.userMessage);
                    }
                })
            }).catch(() => {});
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                this.replayFrom = {
                    word: '',
                    replay: ''
                };
                done();
            }).catch(_ => {});
        },
        getWordList(){
            api_wx.wxWordList().then(res => {
                if(res.data.code == "0"){
                    this.tableData = res.data.data;
                }
            })
        }
	},
    created(){
        this.getWordList()
    },
}
</script>




<style scoped>
.history_body {
    margin-top: 20px;
}
.hidden_text{
}
.hidden_text .cell{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>


