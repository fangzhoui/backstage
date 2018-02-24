import http from './request'

const path  = {
	// 自动回复
	wxWordList: 'management/api/keywords/list',
	wxWordInsert: 'management/api/keywords/insert',
	wxWordUpdate: 'management/api/keywords/update',
	wxWordDelete: 'management/api/keywords/delete',
	// 二维码管理
	wxQrlist: 'management/api/qrcode/list',
	wxQrInsert: 'management/api/qrcode/insert',
	wxQrUpdate: 'management/api/qrcode/update',
	// 微信菜单
	wxMenuUpdate: 'management/api/wechat/menu/update',
	wxMenuList: 'management/api/wechat/menu/list',
	// 站内信
	messageDelete: 'management/api/message/delete',
	messageList: 'management/api/message/list',
	messageDetail: 'management/api/message/detail',
	saveAndSendMessage: 'management/api/message/saveAndSendMessage',

	//默认回复
	qrGetDefault: 'management/api/qrcode/getDefault',
	qrUpdateDefault: 'management/api/qrcode/updateDefault',
	keyGetDefault: 'management/api/keywords/getDefault',
	keyUpdateDefault: 'management/api/keywords/updateDefault',
}



export default {
	wxWordList(params){
		return http.get(path.wxWordList, params)
	},
	wxWordInsert(params){
		return http.post(path.wxWordInsert, params)
	},
	wxWordUpdate(params){
		return http.post(path.wxWordUpdate, params)
	},
	wxWordDelete(params){
		return http.get(path.wxWordDelete, params)
	},
	wxQrlist(params){
		return http.get(path.wxQrlist, params)
	},
	wxQrInsert(params){
		return http.post(path.wxQrInsert, params)
	},
	wxQrUpdate(params){
		return http.post(path.wxQrUpdate, params)
	},
	wxMenuUpdate(params){
		return http.post(path.wxMenuUpdate, params)
	},
	wxMenuList(params){
		return http.get(path.wxMenuList, params)
	},
	messageDelete(params){
		return http.post(path.messageDelete, params)
	},
	messageList(params){
		return http.get(path.messageList, params)
	},
	messageDetail(params){
		return http.get(path.messageDetail, params)
	},
	saveAndSendMessage(params){
		return http.post(path.saveAndSendMessage, params)
	},
	qrGetDefault(params){
		return http.get(path.qrGetDefault, params)
	},
	qrUpdateDefault(params){
		return http.post(path.qrUpdateDefault, params)
	},
	keyGetDefault(params){
		return http.get(path.keyGetDefault, params)
	},
	keyUpdateDefault(params){
		return http.post(path.keyUpdateDefault, params)
	},
}