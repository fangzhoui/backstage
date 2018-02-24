<template>
	<div>
		<page-wrap>
			<div slot="sideLeft">
				<el-card>
					<div slot="header">
						<el-switch 
							active-text="详情"
							inactive-text="新增"
							off-color="#13ce66"
							v-model="switchTurn">
						</el-switch>
					</div>
					<div>
						<el-form>
							<el-form-item label="热词">
								<el-input v-model="hotWord" placeholder="热词"></el-input>
							</el-form-item>
							<el-form-item label="权重">
								<el-input type="number" v-model="hotWeight" placeholder="权重"></el-input>
							</el-form-item>
							<el-form-item label="类型：">
								<el-radio-group v-model="hotType">
									<el-radio label="biz">电商</el-radio>
									<el-radio label="game">游戏</el-radio>
									<el-radio label="live">直播</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-form>
						<div class="save_btn">
							<el-button type="primary" @click="saveFn">保存</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<div slot="sideRight">
				<el-card>
					<div slot='header'>
						<el-select v-model="searchType" placeholder="选择分类" @change="dataChangeFn">
							<el-option label="全部" value="all"></el-option>
							<el-option label="电商" value="biz"></el-option>
							<el-option label="游戏" value="game"></el-option>
							<el-option label="直播" value="live"></el-option>
						</el-select>
						<el-select v-model="fixedTop" placeholder="选择来源" @change="dataChangeFn">
							<el-option label="全部" value="all"></el-option>
							<el-option label="配置" value="1"></el-option>
							<el-option label="热搜" value="0"></el-option>
						</el-select>
					</div>
					<div>
						<list-item v-for="item in hotkeyList" @deleteItem="deleteItem(item.searchType, item.searchKey)" @click.native="pick(item.id)">
							<div>
								<p :class="{fontGame:(item.searchType=='game'), fontLive: (item.searchType=='live'), fontBiz: (item.searchType=='biz')}">{{item.searchKey}}</p>
								<p >
									<span class="type_pane">类型：{{(item.searchType=='biz'?'电商':(item.searchType=='game'?'游戏': '直播'))}}</span>
									<span class="type_pane">【来源：{{(item.fixedTop==0?'热搜': '配置')}}】</span>
								</p>
							</div>
						</list-item>
					</div>
				</el-card>
			</div>
		</page-wrap>
	</div>
</template>



<script>
import api_hot from 'api/product'
import ListItem from 'components/common/ListItem'
import ProductItem from 'components/common/ProductItem'

export default {
	name: 'hot-page',
	components: {
		'list-item': ListItem,
		'product-item': ProductItem,
	},
	data(){
		return {
			switchTurn: false,
			hotkeyList: [],
			searchType: '',
			fixedTop: '',
			hotWord: '',
			hotWeight: '',
			hotType: 'biz',
			id: '',
		}
	},
	watch: {
		switchTurn: function(n, o){
			if(n){
				return
			}else {
				this.hotWord = ''
				this.hotWeight = ''
			}
		}
	},
	methods: {
		getList(){
			api_hot.hotList().then(res=> {
				if(res.data.code==0){
					this.hotkeyList = res.data.data
				}
			})
		},
		deleteItem(type, searchKey){
			api_hot.hotDelete({searchKey: searchKey, searchType: type}).then(res=> {
				if(res.data.code==0){
					this.dataChangeFn()
					this.$message('删除了一条数据')
				}
			})
		},
		add_hotKey(){
			api_hot.hotInsert({searchKey: this.hotWord, searchType: this.hotType, weight: this.hotWeight}).then(res=> {
				if(res.data.code==0){
					this.dataChangeFn()
					this.$message('您已新增了一条热词')
					this.hotWord = ''
					this.hotWeight = ''
				}
			})
		},
		update_key(){
			if(this.hotWord=='' || this.hotWeight==''){
				this.$message('请输入完整信息')
				return
			}else {
				api_hot.hotUpdate({id: this.id, searchKey: this.hotWord, searchType: this.hotType, weight: this.hotWeight}).then(res=> {
					if(res.data.code==0){
						this.dataChangeFn()
						this.$message('您已更新了一条热词')
						this.hotWord = ''
						this.hotWeight = ''
						this.switchTurn = false
					}
				})
			}
			
		},
		saveFn(){
			if(this.switchTurn){
				this.update_key()
			}else{
				this.add_hotKey()
			}
		},
		dataChangeFn(){
 			let obj = {}
			if(this.searchType!='all' && this.searchType!=''){
				let type = {searchType: this.searchType}
				Object.assign(obj, type)
			}
			if(this.fixedTop!='all' && this.fixedTop!=''){
				let top = {fixedTop: this.fixedTop}
				Object.assign(obj, top)
			}
			api_hot.hotList(obj).then(res=> {
				if(res.data.code==0){
					this.hotkeyList = res.data.data
				}
			})
		},
		pick(id){
			this.id = id
			this.switchTurn = true
			for(let a of this.hotkeyList){
				if(a.id==id){
					this.hotWord = a.searchKey
					this.hotWeight = a.weight
					this.hotType = a.searchType
				}
			}
		}
	},
	mounted(){
		this.getList()
	}
}
</script>



<style scoped>

.radio_pane {
	margin: 10px 0;
}
.type_pane {
	font-size: 12px;
}
.fontGame {
	color: #009688;
}
.fontLive {
	color: #ff9800;
}
.fontBiz {
	color: #2196f3;
}
.save_btn {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>