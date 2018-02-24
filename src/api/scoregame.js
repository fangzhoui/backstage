import http from './request'

const path  = {
	batchList: 'management/draw/batchList', // 列表及查询
	batchDetail: 'management/draw/batchDetail', // 详情
	commodityDraw: 'management/draw/commodityDraw', // 添加大转盘 
	deleteBatch: 'management/draw/deleteBatch', // 删除——游戏批次
	drawList: 'management/draw/drawList', //转盘奖品列表
	insertBatch: 'management/draw/insertBatch', //添加——游戏批次
	updateBatch: 'management/draw/updateBatch', //修改——游戏批次
	updateDraw: 'management/draw/commodityList', //修改——转盘奖品
}



export default {
	batchList(params){
		return http.get(path.batchList, params)
	},
	batchDetail(params){
		return http.get(path.batchDetail, params)
	},
	commodityDraw(params){
		return http.post(path.commodityDraw, params)
	},
	deleteBatch(params){
		return http.post(path.deleteBatch, params)
	},
	drawList(params){
		return http.get(path.drawList, params)
	},
	insertBatch(params){
		return http.post(path.insertBatch, params)
	},
	updateBatch(params){
		return http.post(path.updateBatch, params)
	},
	updateDraw(params){
		return http.post(path.updateDraw, params)
	},
}