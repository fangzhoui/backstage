<template>
	<div>
		<page-wrap>
			<div slot="sideLeft">
				<list-item 
					v-for="(item, index) in adminList" 
					:index="index" 
					:code="code" 
					@click.native="pick(index)" 
					@deleteItem="deleteItem(item.id)">
					<p>{{item.realName}}【{{item.phone}}】</p>
				</list-item>
			</div>
			<div slot="sideRight">
				<el-card>
					<!-- <div slot="header">
						<el-switch 
							on-text="详情"
							off-text="新增"
							off-color="#13ce66"
							v-model="switchTurn">
						</el-switch>
					</div> -->
					<div>
						<el-row>
							<el-col :span="18">
								<el-form :model="adminForm" label-width="80px" :rules="adminRules" ref="adminForm">
									<el-form-item label="姓名" prop="name">
										<el-input v-model="adminForm.name"></el-input>
									</el-form-item>
									<el-form-item label="电话" prop="phone">
										<el-input v-model="adminForm.phone"></el-input>
									</el-form-item>
								</el-form>
								<div class="save_btn">
									<el-button type="primary" @click='submitFn'>保存</el-button>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</div>
		</page-wrap>
	</div>
</template>




<script>
import api_admin from 'api/user'
import ListItem from 'components/common/ListItem'

export default {
	name: 'admin-page',
	components: {
		'list-item': ListItem,
	},
	data(){
		return {
			adminList: [],
			code: null,
			// switchTurn: true,
			adminForm: {
				name: '',
				phone: '',
			},
			adminRules: {
				name: [
					{required: true, message: '请输入名称', trigger: 'blur'},
				],
				phone: [
					{required: true, message: '请输入电话', trigger: 'blur'}
				],
			}
		}
	},
	// watch: {
	// 	switchTurn: function(n, o){
	// 		if(n){

	// 		}else {
	// 			this.$refs.adminForm.resetFields()
	// 		}
	// 	}
	// },
	methods: {
		// 获取管理员列表
		getList(){
			api_admin.managerList().then(res=> {
				this.adminList = res.data.data
			})
		},
		// 选中
		pick(index){
			this.code = index
			this.switchTurn = true
		},
		submitFn(){
			this.$refs.adminForm.validate(valid=> {
				if(valid){
					let obj = this.adminForm
					api_admin.managerInsert(obj).then(res=> {
						if(res.data.code==0){
							this.getList()
							this.$message.success('您已新增了一名管理员')
							this.$refs.adminForm.resetFields()
						}
					})
				}else {
					this.$message('信息不完整，请查看')
				}
			})
		},
		deleteItem(id){
			this.$confirm('是否确定要删除这个管理员？').then(()=> {
				api_admin.managerDelete({id: id}).then(res=> {
					if(res.data.code==0){
						this.message('您已删除了一名管理员')
					}
				})
			}).catch(()=> {
				return 
			})
		}
	},
	mounted(){
		this.getList()
	}
}

</script>



<style scoped>
	
.save_btn {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>