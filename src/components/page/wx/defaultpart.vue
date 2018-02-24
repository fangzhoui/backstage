<template>
	<div  v-loading.body.loak="loading">
        <el-col :span="16">
    		<el-form ref="replayFrom" :model="replayFrom" label-width="80px" :rules="RepalyRules">
                <el-form-item label="回复内容" prop="replay">
                    <el-input type="textarea" :rows="9" v-model="replayFrom.replay"></el-input>
                </el-form-item>
                <p><a href="http://link.ipaiban.com/#" target="view_window">超链接生成请点击此处</a></p>
            </el-form>
            <el-button class="btn" type="primary" @click="addReplayWordFn('replayFrom')">确 定</el-button>
        </el-col>
    </div>
</template>

<script>
import api_wx from 'api/wx'
export default {
	name: "wx-followpart",
	data(){
		return {
            loading: false,
			replayFrom: {
				id: '',
				replay: '',
			},
			RepalyRules: {
                replay: [
                    { required: true, message: '请输入回复内容', trigger: 'blur' },
                ],
			}
		}
	},
	methods: {
		 addReplayWordFn(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let obj = {
                        id: this.replayFrom.id,
                        replyContent: this.replayFrom.replay
                    }
                    this.loading = true;
                    api_wx.keyUpdateDefault(obj).then(res => {
                        if(res.data.code == '0'){
                            this.loading = false;
                        	this.$message.success('更新成功');
                        }else{
                            this.$message(res.data.userMessage);
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        getQrDefault(){
            this.loading = true;
        	api_wx.keyGetDefault().then(res => {
                if(res.data.code == '0'){
                	this.replayFrom = {
                		id: res.data.data.id,
                		replay: res.data.data.replyContent,
                	}
                    this.loading = false;
                }else{
                    this.$message(res.data.userMessage);
                }
            })
        }
	},
	created(){
		this.getQrDefault();
	},
}
</script>

<style scoped>
.btn{
	margin-top: 10px;
}
</style>
