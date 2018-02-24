import http from './request'

const path = {
	feedList: 'management/api/suggestion/list',
	feedDetail: 'management/api/suggestion/detail',
	feedUpdate: 'management/api/suggestion/update',
}


export default {
	feedList(params){
		return http.get(path.feedList, params)
	},
	feedDetail(params){
		return http.get(path.feedDetail, params)
	},
	feedUpdate(params){
		return http.post(path.feedUpdate, params)
	},
}