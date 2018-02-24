export default {
	state: {
		bannerImg: {},
		productImgList: [],  // 产品大图
	},
	mutations: {
		SET_BANNER_IMG(state, obj){
			state.bannerImg = obj
		},
		// 产品图片大图
		SET_PRODUCT_LIST(state, list){
			state.productImgList = list
		}
	},
	actions:{
		set_banner_img(state, obj){
			state.commit('SET_BANNER_IMG', obj)
		},
		set_product_list(state, list){
			state.commit('SET_PRODUCT_LIST', list)
		}
	},
	getters: {
		get_banner_img(state){
			return state.bannerImg
		},
		get_product_list(state){
			return state.productImgList
		}
	}
}