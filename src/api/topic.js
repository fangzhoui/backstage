import http from './request'

const path = {
	topicInsert: 'management/api/topic/insert',
	topicUpdate: 'management/api/topic/update',
	allTopicList: 'management/api/topic/allTopicList',
	topicDelete: 'management/api/topic/delete',
	topicGameList: 'management/api/topic/gameList',
	topicDetail: 'management/api/topic/topicDetail',
	relInsert: 'management/api/topic/relInsert',
	relDelete: 'management/api/topic/relDelete'
}

export default {
	topicInsert(params){
		return http.post(path.topicInsert, params)
	},
	topicUpdate(params){
		return http.post(path.topicUpdate, params)
	},
	allTopicList(params){
		return http.get(path.allTopicList, params)
	},
	topicDelete(params){
		return http.post(path.topicDelete, params)
	},
	topicGameList(params){
		return http.get(path.topicGameList, params)
	},
	topicDetail(params){
		return http.get(path.topicDetail, params)
	},
	relInsert(params){
		return http.post(path.relInsert, params)
	},
	relDelete(params){
		return http.post(path.relDelete, params)
	}
}