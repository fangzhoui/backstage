
import Vue from 'vue'
import Vuex from 'vuex'
import IndexHome from './IndexHome'
import Image from './Image'
import ProductType from './ProductType'
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		IndexHome,
		Image,
		ProductType,
		common,
	},
	state: {
		token: null,
		data: {
			id: '',
			phone: '',
			enable: '',
			superManager: '',
			uid: '',
		},
		userName: '',
	},
	mutations: {
		INDEX_MUT_SET_TOKEN(state, data){
			localStorage.token = data
			state.token = data
		},
		INDEX_MUT_SIGN_OUT(state){
			localStorage.removeItem('token')
			localStorage.removeItem('realName')
			localStorage.removeItem('superManager')
			localStorage.removeItem('phone')
			state.token = null
			state.data = {
				id: '',
				phone: '',
				enable: '',
				superManager: '',
				uid: '',
			}
		},
		INDEX_SET_SIGN_IN(state, data){
			state.data = data
			localStorage.realName = data.realName
			localStorage.superManager = data.superManager
			localStorage.phone = data.phone
		}
	},
	actions: {
		index_act_set_token(state, data){
			state.commit('INDEX_MUT_SET_TOKEN', data)
		},
		index_act_sign_out(state){
			state.commit('INDEX_MUT_SIGN_OUT')
		},
		index_set_signIn(state, data){
			state.commit('INDEX_SET_SIGN_IN', data)
		},
	},
	getters: {
		index_get_token(state){
			return state.token
		},
		index_get_signIn(state){
			return state.data
		}
	},
})