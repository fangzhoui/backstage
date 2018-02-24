import axios from './index'
import http from './request'

const path = {
	// banner
	bannerInsert: 'management/api/banner/insert',
	bannerDelete: 'management/api/banner/delete',
	bannerList: 'management/api/banner/list',

	// content
	contentInsert: 'management/api/webContent/insert',
	contentGet: 'management/api/webContent/content',

	// 主题
	sectionList: 'management/api/section/sectionList',
	sectionDetail: 'management/api/section/sectionDetail',
	sectionUpdate: 'management/api/section/update',
	sectionInsert: 'management/api/section/insert',
	sectionDelete: 'management/api/section/delete',
	delSectionTopic: 'management/api/section/delSectionTopic',
	addSectionTopic: 'management/api/section/addSectionTopic',
	detailBySection: 'management/api/section/detailBySection',

	// 专题
	h5TopicList: 'management/api/h5Topic/list',
	h5TopicInsert: 'management/api/h5Topic/insert',
	h5TopicUpdate: 'management/api/h5Topic/update',
	h5TopicDelete: 'management/api/h5Topic/delete',
	h5Topicdetail: 'management/api/h5Topic/detail',

	//专题内容
	h5ContentList: 'management/api/h5Content/list',
	h5ContentInsert: 'management/api/h5Content/insert',
	h5ContentUpdate: 'management/api/h5Content/update',
	h5ContentDelete: 'management/api/h5Content/delete',
	h5Contentdetail: 'management/api/h5Content/detail',
}


export default {
	// banner
	bannerInsert(params){
		return http.post(path.bannerInsert, params)
	},
	bannerDelete(params){
		return http.post(path.bannerDelete, params)
	},
	bannerList(params){
		return http.get(path.bannerList, params)
	},

	// content
	contentInsert(params){
		return http.post(path.contentInsert, params)
	},
	contentGet(params){
		return http.get(path.contentGet, params)
	},

	// zhuti
	sectionList(params){
		return http.get(path.sectionList, params)
	},
	sectionDetail(params){
		return http.get(path.sectionDetail, params)
	},
	sectionUpdate(params){
		return http.post(path.sectionUpdate, params)
	},
	sectionInsert(params){
		return http.post(path.sectionInsert, params)
	},
	sectionDelete(params){
		return http.post(path.sectionDelete, params)
	},
	delSectionTopic(params){
		return http.post(path.delSectionTopic, params)
	},
	addSectionTopic(params){
		return http.post(path.addSectionTopic, params)
	},
	detailBySection(params){
		return http.get(path.detailBySection, params)
	},
	h5TopicList(params){
		return http.get(path.h5TopicList, params)
	},
	h5TopicInsert(params){
		return http.post(path.h5TopicInsert, params)
	},
	h5TopicUpdate(params){
		return http.post(path.h5TopicUpdate, params)
	},
	h5TopicDelete(params){
		return http.post(path.h5TopicDelete, params)
	},
	h5Topicdetail(params){
		return http.get(path.h5Topicdetail, params)
	},
	h5ContentList(params){
		return http.get(path.h5ContentList, params)
	},
	h5ContentInsert(params){
		return http.post(path.h5ContentInsert, params)
	},
	h5ContentUpdate(params){
		return http.post(path.h5ContentUpdate, params)
	},
	h5ContentDelete(params){
		return http.post(path.h5ContentDelete, params)
	},
	h5Contentdetail(params){
		return http.get(path.h5Contentdetail, params)
	},
	
}
