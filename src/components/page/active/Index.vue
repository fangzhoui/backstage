<template>
	<page-wrap>
		<el-card slot='sideLeft'>
			<div slot='header'>
				<el-input v-model='activeName'>
					<el-button slot='append' type='success' size='mini' @click='addListFn' icon='plus'>新增</el-button>
				</el-input>
			</div>
			<div>
				<list-item
					v-for='item in activeList'
					:code='code'
					:index='item.id'
					@deleteItem='deleteList(item.id)'
					@click.native='pickFn(item)'>
					<p>{{item.name}}</p>
				</list-item>
			</div>
		</el-card>
		<el-card slot='sideRight'>
			<div slot='header' class="left_pane">
				<p>{{info.fromkey}}</p>
				<el-button type='success' @click='addItemFn'>新增</el-button>
			</div>
			<div>
				<add-item :section="fromKey" :addItemPane="addItemPane" @hidePane="hidePane"></add-item>
				<!-- 内容模块 -->
				<div>
					<item-content :section="fromKey" :update="update"></item-content>
				</div>
			</div>
		</el-card>
	</page-wrap>
</template>



<script>
import ListItem from 'components/common/ListItem'
import AddItem from 'components/page/active/AddItem'
import ItemContent from 'components/page/active/ItemContent'
import api from 'api/active'

export default {
	name: 'active-page',
	components: {
		'list-item': ListItem,
		'add-item': AddItem,
		'item-content': ItemContent,
	},
	data: ()=> ({
		code: null,
		info: {},
		activeName: '',
		activeList: [],
		fromKey: '',
		addItemPane: false,
		update: false,
	}),
	methods: {
		addListFn(){
			if(this.activeName!=''){
				api.activeInsert({name: this.activeName}).then(res=> {
					if(res.data.code==0){
						this.activeList = res.data.data
						this.getList()
						this.$message.success('您已新增了一条活动， 请前往添加活动内容')
					}
				})
				this.activeName = ''
			}else {
				this.$message('活动不能为空哦')
			}
		},
		addItemFn(){
			this.addItemPane = !this.addItemPane
			this.update = false
		},
		getList(){
			api.activeList().then(res=> {
				this.activeList = res.data
			})
		},
		deleteList(id){
			this.$confirm('一旦删除将无法恢复，是否确认').then(()=> {
				api.activeDelete({id: id}).then(res=> {
					if(res.data.code==0){
						this.getList()
					}
				})
			}).catch(()=> {
				return
			})
		},
		// 新增item
		hidePane(){
			this.addItemPane = false
			this.update = true
		},
		pickFn(val){
			this.info = val
			this.fromKey = val.fromkey
			this.code = val.id
		}
	},
	mounted(){
		this.getList()
	}
}
</script>



<style scoped>
.left_pane {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
