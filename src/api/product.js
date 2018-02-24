import http from './request'

const path = {
	// game
	gameInsert: 'management/api/game/insert',
	gameDetail: 'management/api/game/detail',
	gameDelete: 'management/api/game/delete',
	gameList: 'management/api/game/list',
	gameUpdate: 'management/api/game/update',
	searchByName: 'management/api/game/searchByName',

	// live
	liveInsert: 'management/api/live/insert',
	liveDetail: 'management/api/live/detail',
	liveDelete: 'management/api/live/delete',
	liveUpdate: 'management/api/live/update',
	liveList: '/management/api/live/list',

	// business
	businessInsert: 'management/api/business/insert',
	businessDetail: 'management/api/business/detail',
	businessDelete: 'management/api/business/delete',
	businessList: 'management/api/business/list',
	businessUpdate: 'management/api/business/update',

	// convenience
	convenienceInsert: 'management/api/convenience/insert',
	convenienceDelete: 'management/api/convenience/delete',
	convenienceList: 'management/api/convenience/list',
	convenienceUpdate: 'management/api/convenience/update',

	// hotkey
	hotList: 'management/api/search/list',
	hotDelete: 'management/api/search/delete',
	hotInsert: 'management/api/search/insert',
	hotUpdate: 'management/api/search/update',

	// hotnovel
	novelList: 'management/api/novel/list',
	novelDetail: 'management/api/novel/detail',
	novelInsert: 'management/api/novel/insert',
	novelDelete: 'management/api/novel/delete',
	novelUpdate: 'management/api/novel/update',

	//cartoon
	cartoonList: 'management/api/cartoon/list',
	cartoonDetail: 'management/api/cartoon/detail',
	cartoonInsert: 'management/api/cartoon/insert',
	cartoonDelete: 'management/api/cartoon/delete',
	cartoonUpdate: 'management/api/cartoon/update',
	
}


export default {
	// game
	gameInsert(params){
		return http.post(path.gameInsert, params)
	},
	gameDetail(params){
		return http.get(path.gameDetail, params)
	},
	gameDelete(params){
		return http.post(path.gameDelete, params)
	},
	gameList(params){
		return http.get(path.gameList, params)
	},
	gameUpdate(params){
		return http.post(path.gameUpdate, params)
	},
	searchByName(params){
		return http.get(path.searchByName, params)
	},

	// live
	liveInsert(params){
		return http.post(path.liveInsert, params)
	},
	liveDetail(params){
		return http.get(path.liveDetail, params)
	},
	liveDelete(params){
		return http.post(path.liveDelete, params)
	},
	liveList(params){
		return http.get(path.liveList, params)
	},
	liveUpdate(params){
		return http.post(path.liveUpdate, params)
	},

	// business
	businessInsert(params){
		return http.post(path.businessInsert, params)
	},
	businessDetail(params){
		return http.get(path.businessDetail, params)
	},
	businessDelete(params){
		return http.post(path.businessDelete, params)
	},
	businessList(params){
		return http.get(path.businessList, params)
	},
	businessUpdate(params){
		return http.post(path.businessUpdate, params)
	},

	// convenience
	convenienceInsert(params){
		return http.post(path.convenienceInsert, params)
	},
	convenienceList(params){
		return http.get(path.convenienceList, params)
	},
	convenienceUpdate(params){
		return http.post(path.convenienceUpdate, params)
	},
	convenienceDelete(params){
		return http.post(path.convenienceDelete, params)
	},

	// hotkey
	hotList(params){
		return http.get(path.hotList, params)
	},
	hotDelete(params){
		return http.post(path.hotDelete, params)
	},
	hotInsert(params){
		return http.post(path.hotInsert, params)
	},
	hotUpdate(params){
		return http.post(path.hotUpdate, params)
	},
	
	// hotnovel
	novelList(params){
		return http.get(path.novelList, params)
	},
	novelDetail(params){
		return http.get(path.novelDetail, params)
	},
	novelInsert(params){
		return http.post(path.novelInsert, params)
	},
	novelDelete(params){
		return http.post(path.novelDelete, params)
	},
	novelUpdate(params){
		return http.post(path.novelUpdate, params)
	},

	// cartoon
	cartoonList(params){
		return http.get(path.cartoonList, params)
	},
	cartoonDetail(params){
		return http.get(path.cartoonDetail, params)
	},
	cartoonInsert(params){
		return http.post(path.cartoonInsert, params)
	},
	cartoonDelete(params){
		return http.post(path.cartoonDelete, params)
	},
	cartoonUpdate(params){
		return http.post(path.cartoonUpdate, params)
	},
}