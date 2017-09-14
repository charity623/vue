const mutations = {
	getMsg (state, payload) {
		state.msg = payload.data.data.msg;
	},
	updateIndex (state, payload) {
	  state.curIndex = payload.curIndex
	},
	updateSysList (state, payload) {
	  state.sysList = payload.sysList
	},
	updateIrrWaterPlanList (state, payload) {
	  state.sysList[state.curIndex].irrWaterPlanList = payload.irrWaterPlanList
	},
	updateLoadingStatus (state, payload) {
	  state.isLoading = payload.isLoading
	},
}

export default mutations;