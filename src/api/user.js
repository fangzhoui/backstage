import axios from './index'
import http from './request'

const path = {
	createToken: 'api/user/token/create',
	login: 'management/api/manager/login',
	imageUrl: 'api/common/qiniuBaseUrl',
	managerList: 'management/api/manager/list',
	managerDelete: 'management/api/manager/delete',
	managerInsert: 'management/api/manager/insert',
	managerLogout: 'management/api/manager/logout',

	// 黑名单
	blackList: 'management/api/userDeny/list',
	blackInsert: 'management/api/userDeny/insert',
	blackDelete: 'management/api/userDeny/delete',
}

export default {
	createToken(params){
		return http.post(path.createToken, params)
	},
	login(params){
		return http.post(path.login, params)
	},
	imageUrl(params){
		return http.get(path.imageUrl, params)
	},
	managerList(params){
		return http.get(path.managerList, params)
	},
	managerDelete(params){
		return http.post(path.delete, params)
	},
	managerInsert(params){
		return http.post(path.managerInsert, params)
	},
	managerLogout(params){
		return http.post(path.managerLogout, params)
	},

	// 黑名单
	blackList(params){
		return http.get(path.blackList, params)
	},
	blackInsert(params){
		return http.post(path.blackInsert, params)
	},
	blackDelete(params){
		return http.post(path.blackDelete, params)
	},
}