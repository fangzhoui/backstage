import http from './request'

const path = {
	message: 'management/api/phoneMessage/sendMessage',
	articleList: 'management/api/article/list',
	articleDelete: 'management/api/article/delete',
	articleDetail: 'management/api/article/detail',
	articleInsert: 'management/api/article/insert',
	articleUpdate: 'management/api/article/update',
	gameList: 'management/api/game/gameList'
}



export default {
	// 发送短信
	message(params){
		return http.post(path.message, params)
	},
	articleList(params){
		return http.get(path.articleList, params)
	},
	articleDelete(params){
		return http.post(path.articleDelete, params)
	},
	articleDetail(params){
		return http.get(path.articleDetail, params)
	},
	articleInsert(params){
		return http.post(path.articleInsert, params)
	},
	articleUpdate(params){
		return http.post(path.articleUpdate, params)
	},
	gameList(params){
		return http.get(path.gameList, params)
	}
}