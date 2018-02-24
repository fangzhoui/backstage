import http from './request'

const path = {
	activeNameInsert: 'management/api/activityName/insert',
	activeDelete: 'management/api/activityName/delete',
	activeList: 'management/api/activityName/list',

	itemInsert: 'management/api/activityItem/insert',
	itemDelete: 'management/api/activityItem/delete',
	itemList: 'management/api/activityItem/list',

	countList: 'management/api/statistics/list',
	countStatics: 'management/api/statistics/statistics',
	countExport: 'management/api/statistics/export',
}


export default {
	activeInsert(params){
		return http.post(path.activeNameInsert, params)
	},
	activeDelete(params){
		return http.post(path.activeDelete, params)
	},
	activeList(params){
		return http.get(path.activeList, params)
	},

	itemList(params){
		return http.get(path.itemList, params)
	},
	itemDelete(params){
		return http.post(path.itemDelete, params)
	},
	itemInsert(params){
		return http.post(path.itemInsert, params)
	},

	countList(params){
		return http.get(path.countList, params)
	},
	countStatics(params){
		return http.get(path.countStatics, params)
	},
	countExport(params){
		return http.get(path.countExport, params)
	},
}