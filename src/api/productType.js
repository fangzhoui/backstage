import http from './request'

const path = {
	// 游戏分类
	gameInsert: 'management/api/gameCategory/insert',
	gameList: 'management/api/gameCategory/list',
	gameUpdate: 'management/api/gameCategory/update',
	gameDelete: 'management/api/gameCategory/delete',

	// 电商分类
	businessInsert: 'management/api/businessCategory/insert',
	businessList: 'management/api/businessCategory/list',
	businessUpdate: 'management/api/businessCategory/update',
	businessDelete: 'management/api/businessCategory/delete',
}

export default {
	// game
	gameInsert(params){
		return http.post(path.gameInsert, params)
	},
	gameList(params){
		return http.get(path.gameList, params)
	},
	gameUpdate(params){
		return http.post(path.gameUpdate, params)
	},
	gameDelete(params){
		return http.post(path.gameDelete, params)
	},

	// business
	businessInsert(params){
		return http.post(path.businessInsert, params)
	},
	businessList(params){
		return http.get(path.businessList, params)
	},
	businessUpdate(params){
		return http.post(path.businessUpdate, params)
	},
	businessDelete(params){
		return http.post(path.businessDelete, params)
	}
}