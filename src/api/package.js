import http from './request'

const path = {
	cancelAfter: 'management/api/package/cancelAfter',
	cdKeyInsert: 'management/api/package/cdKeyInsert',
	cdKeyList: 'management/api/package/cdKeyList',
	cdKeysDelete: 'management/api/package/cdKeysDelete',
	packageDelete: 'management/api/package/delete',
	packageDetail: 'management/api/package/detail',
	packageExport: 'management/api/package/cdkeyExport',
	findCdKey: 'management/api/package/findCdKey',
	packageInsert: 'management/api/package/insert',
	packageList: 'management/api/package/list',
	packagesAndDownloads: '/management/api/package/packagesAndDownloads',
	packageUpdate: 'management/api/package/update',
	gameList: 'management/api/game/gameList',
}



export default {
	cancelAfter(params){
		return http.post(path.cancelAfter, params)
	},
	cdKeyInsert(params){
		return http.post(path.cdKeyInsert, params)
	},
	cdKeyList(params){
		return http.get(path.cdKeyList, params)
	},
	cdKeysDelete(params){
		return http.post(path.cdKeysDelete, params)
	},
	packageDelete(params){
		return http.post(path.packageDelete, params)
	},
	packageDetail(params){
		return http.get(path.packageDetail, params)
	},
	packageExport(params){
		return http.get(path.packageExport, params)
	},
	findCdKey(params){
		return http.get(path.findCdKey, params)
	},
	packageInsert(params){
		return http.post(path.packageInsert, params)
	},
	packageList(params){
		return http.get(path.packageList, params)
	},
	packagesAndDownloads(params){
		return http.get(path.packagesAndDownloads, params)
	},
	packageUpdate(params){
		return http.post(path.packageUpdate, params)
	},
	gameList(params){
		return http.get(path.gameList, params)
	},
}