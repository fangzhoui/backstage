export default {
	state: {
		itemData: {},
	},
	mutations: {
		SET_ITEMDATA(state, obj){
			state.itemData = obj
		},
	},
	actions: {
		set_itemData(state, obj){
			state.commit('SET_ITEMDATA', obj)
		},
	},
	getters: {
		get_itemData(state){
			return state.itemData
		}
	}
}