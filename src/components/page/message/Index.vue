<template>
	<div>
		<el-card>
			<el-form label-width="80px" :model="message" :rules="msgRules" ref="message">
				<el-form-item label="内容" prop="content">
					<el-input type="textarea" :rows="4" v-model="message.content"></el-input>
				</el-form-item>

				<el-form-item label="电话" prop="phones">
					<el-input type="textarea" :rows="6" v-model="message.phones" placeholder="使用回车分割"></el-input>
				</el-form-item>
			</el-form>
			<div class="save_btn">
				<el-button type="primary" @click="sendMsg">发送</el-button>
			</div>
		</el-card>
	</div>
</template>



<script>
import api_msg from 'api/common'

export default {
	name: 'message-page',
	data(){
		return {
			message: {
				content: '',
				phones: ''
			},
			msgRules: {
				content: [
					{required: true, message: '请输入内容', trigger: 'blur'}
				],
				phones: [
					{required: true, message: '请输入电话', trigger: 'blur'}
				],
			}
		}
	},
	methods: {
		sendMsg(){
			let phoneArr = this.message.phones.trim()
			// 去重前
			let arr = phoneArr.split('\n')
			let lenOri = arr.length
			let newArr = []
			for(let [k, v] of arr.entries()){
				if(v.match(/^1[35678]\d{9}$/g)){
					continue
				}else {
					this.$message(`第${k+1}条数据【${v}】不符合手机格式`)
					return
				}
			}
			let a = new Set(arr)
			newArr = [...a]
			this.$refs.message.validate(valid=> {
				if(valid){
					let obj  = {
						content: this.message.content,
						phones: JSON.stringify(newArr)
					}
					api_msg.message(obj).then(res=> {
						if(res.data.code==0){
							this.$refs.message.resetFields()
							this.$notify.success('发送成功')
						}
					})
				}else {
					this.$message('请输入完整信息')
					return
				}
			})
		}
	}
}
</script>




<style scoped>

.save_btn {
	display: flex;
	justify-content: center;
}
</style>