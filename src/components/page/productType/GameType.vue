<template>
	<div>
		<page-wrap>
			<div slot="sideLeft">
				<list-item 
					v-for="item in gameList" 
					:index="item.id" 
					:code="id" 
					@click.native="pick(item.id)" 
					@deleteItem="deleteItem(item.id)">
					<div>{{item.name}}</div>
				</list-item>
			</div>

			<div slot="sideRight">
				<common-content section="game" @submitFn="getList" :state="state"></common-content>
			</div>
		</page-wrap>
	</div>
</template>



<script>
import ListItem from 'components/common/ListItem'
import api_proType from 'api/productType'
import CommonContent from 'components/page/productType/CommonContent'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: "game-type",
	components: {
		'list-item': ListItem,
		'common-content': CommonContent,
	},
	data(){
		return {
			gameList: [],
			id: '',
			state: 'none',
		}
	},
	methods: {
		...mapActions([
			'set_itemData',
		]),
		getList(){
			api_proType.gameList().then(res=> {
				this.gameList = res.data.data
			})
		},
		pick(id){
			this.id = id
			this.state = 'pick'
			for(let a of this.gameList){
				if(a.id==id){
					this.set_itemData(a)
				}
				
			}
		},
		deleteItem(id){
			this.$confirm('是否确定删除该项？').then(()=> {
				api_proType.gameDelete({id: id}).then(res=> {
					if(res.data.code==0){
						this.$message.success('删除成功')
						this.getList()
						this.set_itemData(this.gameList[0])
					}
				})
			}).catch(()=> {
				return 
			})
		}
	},
	mounted(){
		this.getList()
	},
	destroyed(){
		this.set_itemData({})
	}
}
</script>




