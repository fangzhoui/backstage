<template>
	<div>
		<el-card>
			<div slot="header">
				<el-button type="success" @click="addItem">新增</el-button>
			</div>
			<el-table
			    :data="tableData"
			    stripe
			    style="width: 100%">
			    <el-table-column
			      	prop="phone"
			      	label="电话"
			      	width="180">
			    </el-table-column>
			    <el-table-column
			      	prop="description"
			      	label="描述"
			      	width="180">
			    </el-table-column>
			    <el-table-column
			      	prop="id"
			      	width="100"
			      	label="ID">
			    </el-table-column>
			    <el-table-column
			      	prop="createAt"
			      	label="时间">
			    </el-table-column>
			    <el-table-column
			      	prop="todo"
			      	label="操作">
			      	<template scope="scope">
			      		<el-button size="small" @click="deleteItem(scope.row.id)">删除</el-button>
			      	</template>
			    </el-table-column>
			</el-table>

			<!-- 对话框 -->
			<el-dialog title="新增黑名单记录" :visible.sync="dialog">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form label-width="80px" :model="addItemForm" ref="addItemForm" :rules="rules">
							<el-form-item label="电话" prop="phone">
								<el-input v-model="addItemForm.phone"></el-input>
							</el-form-item>
							<el-form-item label="描述" prop="description">
								<el-input v-model="addItemForm.description"></el-input>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<span slot="footer">
					<el-button @click="dialog=false">取消</el-button>
					<el-button type='primary' @click="saveItem">确定</el-button>
				</span>
			</el-dialog>
		</el-card>
	</div>
</template>



<script>
import api_user from 'api/user'

export default {
	name: 'black-list',
	data(){
		return {
			tableData: [],
			dialog: false,
			addItemForm: {
				phone: '',
				description: '',
			},
			rules: {
				phone: [
					{required: true, message: '请输入电话', trigger: 'blur'},
				],
				description: [
					{required: true, message: '请输入描述', trigger: 'blur'}
				],
			}
		}
	},
	methods: {
		time(val){
			let date = new Date(val)
			let y = date.getFullYear()
			let m = (date.getMonth()+1<10 ? `0${date.getMonth()+1}` : date.getMonth()+1)
			let d = date.getDate()<10 ? `0${date.getDate()}` : date.getDate()
			let h = date.getHours()<10? `0${date.getHours()}` : date.getHours()
			let min = date.getMinutes()<10 ? `0${date.getMinutes()}` : date.getMinutes()
			let sec = date.getSeconds()<10 ? `0${date.getSeconds()}` : date.getSeconds()
			return (`${y}-${m}-${d} ${h}:${min}:${sec}`)
		},
		getList(){
			api_user.blackList().then(res=> {
				// this.tableData = res.data.data
				let data = res.data.data
				let arr = []
				for(let a of data){
					let obj = {
						phone: a.phone,
						description: a.description,
						id: a.id,
						createAt: this.time(a.createAt)
					}
					arr.push(obj)
				}
				this.tableData = arr
			})
		},
		deleteItem(val){
			this.$confirm('是否要删除这个黑名单人物？').then(()=> {
				api_user.blackDelete({id: val}).then(res=> {
					if(res.data.code==0){
						this.$message('您已成功删除了一条黑名单记录')
						this.getList()
					}
				}).catch(()=> {
					return
				})
			})
		},
		addItem(){
			this.dialog = true
		},
		saveItem(){
			this.$refs.addItemForm.validate(valid=> {
				if(valid){
					api_user.blackInsert(this.addItemForm).then(res=> {
						if(res.data.code==0){
							this.getList()
							this.$refs.addItemForm.resetFields()
							this.$message('新增了一条黑名单记录')
							this.dialog = false
						}else {
							this.$message('当前网络不佳，请稍后再试')
							return 
						}
					})
				}else {
					this.$message('请输入完整信息')
					return
				}
			})
		}
	},
	mounted(){
		this.getList()
	}
}
</script>