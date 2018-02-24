// 首页内容的全局状态

export default {
	state: {
		data: [
			{
				name: 'deskTop-top-gallery',
				content: [],
				toggleState: false,
			},
			{
				name: 'homepage-top-gallery',
				content: [],
				toggleState: false,
			},
			{
				name: 'homepage-under-loan',
				content: [],
				toggleState: false,
			},
			{
				name: 'loan-top-gallery',
				content: [],
				toggleState: false,
			},
			{
				name: 'loan-detail-bottom-gallery',
				content: [],
				toggleState: false,
			},
			{
				name: 'credit-top-gallery',
				content: [],
				toggleState: false,
			},
			{
				name: 'insurance-top-gallery',
				content: [],
				toggleState: false,
			},
			{
				name: 'splash-banner',
				content: [],
				toggleState: false,
			},
		],
		section: '',
		// toggleState: false,
	},
	mutations: {
		INDEXHOME_MUT_SET_SECTIONS(state, val){
			state.section = val
		},
		INDEXHOME_MUT_SET_DATA(state, content){
			let key = state.section
			for(let item of state.data){
				if(item.name == key){
					item.content = content
				}
			}
		},
		INDEXHOME_MUT_SET_TOGGLE(state){
			let key = state.section
			for(let item of state.data){
				if(item.name == key){
					item.toggleState = !item.toggleState
				}
			}
		},
	},
	actions: {
		indexHome_act_set_sections(state, val){
			state.commit('INDEXHOME_MUT_SET_SECTIONS', val)
		},
		indexHome_act_set_data(state, content){
			state.commit('INDEXHOME_MUT_SET_DATA', content)
		},
		indexHome_act_set_toggle(state){
			state.commit('INDEXHOME_MUT_SET_TOGGLE')
		}
	},
	getters: {
		idnexHome_get_sections(state){
			return state.section
		},
		indexHome_get_data(state){
			return state.data
		},
		indexHome_get_dataItem(state){
			let key = state.section
			for(let item of state.data){
				if(item.name == key ){
					
					return item.content
				}
			}
		},
		indexHome_get_toggleState(state){
			let key = state.section
			for(let item of state.data){
				if(item.name == key ){
					return item.toggleState
				}
			}
		}
	}
}