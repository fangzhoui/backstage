import http from './request'

const path  = {
	usersScores: 'management/commodity/usersScores',
	scoreFind: 'management/commodity/scoreFind',
	scoresDetail: 'management/commodity/scoresDetail',
	goodsList: 'management/commodity/list',
	searchCommodity: 'management/commodity/searchCommodity',
	goodsDelete: 'management/commodity/batch/delete',
	goodsDown: 'management/commodity/batch/down',
	goodsUp: 'management/commodity/batch/up',
	goodsDetail: 'management/commodity/detail',
	goodsInsert: 'management/commodity/insert',
	goodsUpdate: 'management/commodity/update',
	orderList: 'management/commodity/orderList',
	expressList:'management/commodity/expressList',
	getcdkey: 'management/commodity/cdKeyList',
	changeOrder: 'management/commodity/changeOrder',
	orderFind: 'management/commodity/orderFind',
	usersExport: 'management/commodity/usersExport', //积分统计导出
	ordersExport: 'management/commodity/ordersExport',
	cdKeyList: 'management/commodity/cdKeyList', // cdklist
	cdkInsert: 'management/commodity/packageBatch/insert', // cdk导入
	cdKeysDelete: 'management/commodity/cdKeysDelete', //CDK删除
	outputCdk: 'management/commodity/packageBatch/output'
}



export default {
	usersScores(params){
		return http.get(path.usersScores, params)
	},
	scoreFind(params){
		return http.get(path.scoreFind, params)
	},
	scoresDetail(params){
		return http.get(path.scoresDetail, params)
	},
	goodsList(params){
		return http.get(path.goodsList, params)
	},
	searchCommodity(params){
		return http.get(path.searchCommodity, params)
	},
	goodsDelete(params){
		return http.post(path.goodsDelete, params)
	},
	goodsDown(params){
		return http.post(path.goodsDown, params)
	},
	goodsUp(params){
		return http.post(path.goodsUp, params)
	},
	goodsDetail(params){
		return http.get(path.goodsDetail, params)
	},
	goodsInsert(params){
		return http.post(path.goodsInsert, params)
	},
	goodsUpdate(params){
		return http.post(path.goodsUpdate, params)
	},
	orderList(params){
		return http.get(path.orderList, params)
	},
	expressList(params){
		return http.get(path.expressList, params)
	},
	getcdkey(params){
		return http.get(path.getcdkey, params)
	},
	changeOrder(params){
		return http.post(path.changeOrder, params)
	},
	orderFind(params){
		return http.get(path.orderFind, params)
	},
	usersExport(params){
		return http.get(path.usersExport, params)
	},
	ordersExport(params){
		return http.get(path.ordersExport, params)
	},
	cdKeyList(params){
		return http.get(path.cdKeyList, params)
	},
	cdkInsert(params){
		return http.post(path.cdkInsert, params)
	},
	cdKeysDelete(params){
		return http.post(path.cdKeysDelete, params)
	},
	outputCdk(params){
		return http.get(path.outputCdk, params)
	},
}