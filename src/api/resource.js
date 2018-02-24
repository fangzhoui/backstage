import axios from './index'
import http from './request'

const path = {
	insert: 'management/api/resource/insert',
	groupList: 'management/api/resource/group/list',
	list: 'management/api/resource/list',
	delete: 'management/api/resource/delete'
}

export default {
	insert(params){
		return http.post(path.insert, params)
	},
	groupList(params){
		return http.get(path.groupList, params)
	},
	list(params){
		return http.get(path.list, params)
	},
	delete(params){
		return http.get(path.delete, params)
	}
}