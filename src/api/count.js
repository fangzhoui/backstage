import http from './request'

const path  = {
	history: 'management/api/historyRecord/list',
	// user control
	fromKeyList: 'management/api/user/fromKeyList',
	userList: 'management/api/user/list',
	export: 'management/api/user/export',
	userDetail: 'management/api/user/userDetail',
	// 页面统计
	groupList: 'management/api/click/groupList',
	recordList: 'management/api/click/recordList',
	clickList: 'management/api/click/clickList',
	pageCountFromKeyList: 'management/api/click/fromKeyList',
	pageCountExport: 'management/api/click/recordExport',
	// 关联统计
	productClickList: 'management/api/click/productClickList',
	productList: 'management/api/click/productList',
	productRecordExport: 'management/api/click/productRecordExport',
	productRecordList: 'management/api/click/productRecordList',
	// 二维码关注统计
	qrRecordList: 'management/api/attentionRecord/list',
	// 游戏下载排行
	gameDownloadCount: 'management/api/game/downloadCount',
	changeDownloadCount: 'management/api/game/changeDownloadCount'

}

export default {
	history(params){
		return http.get(path.history, params)
	},
	// user control
	fromKeyList(params){
		return http.get(path.fromKeyList, params)
	},
	userList(params){
		return http.get(path.userList, params)
	},
	export(params){
		return http.get(path.export, params)
	},
	userDetail(params){
		return http.get(path.userDetail, params)
	},
	groupList(params){
		return http.get(path.groupList, params)
	},
	recordList(params){
		return http.get(path.recordList, params)
	},
	clickList(params){
		return http.get(path.clickList, params)
	},
	pageCountFromKeyList(params){
		return http.get(path.pageCountFromKeyList, params)
	},
	pageCountExport(params){
		return http.get(path.pageCountExport, params)
	},
	productClickList(params){
		return http.get(path.productClickList, params)
	},
	productList(params){
		return http.get(path.productList, params)
	},
	productRecordExport(params){
		return http.get(path.productRecordExport, params)
	},
	productRecordList(params){
		return http.get(path.productRecordList, params)
	},
	qrRecordList(params){
		return http.get(path.qrRecordList, params)
	},
	gameDownloadCount(params){
		return http.get(path.gameDownloadCount, params)
	},
	changeDownloadCount(params){
		return http.post(path.changeDownloadCount, params)
	},
}