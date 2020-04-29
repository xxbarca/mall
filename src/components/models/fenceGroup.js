import {Matrix} from "./matrix"
import {Fence} from "./fence"

/**
 * {
 *     fences: [Fence, Fence, Fence],
 *     skuList: [],
 *     spu: {}
 * }
 *
 * */

class FenceGroup {
	spu
	skuList = []
	fences = []
	
	constructor(spu) {
		this.spu = spu
		this.skuList = spu.sku_list
	}
	
	/**
	 * AT
	 * [{颜色} {颜色} {颜色} {颜色}]
	 * [{图案} {图案} {图案} {颜色}]
	 * [{尺码} {尺码} {尺码} {颜色}]
	 * */
	
	initFences() {
		const matrix = this._createMatrix(this.skuList)
		const fences = []
		const AT = matrix.transpose()
		AT.forEach(r => {
			const fence = new Fence(r)
			fence.init()
			
			// TODO 设置可视规格
			
			fences.push(fence)
		})
		this.fences = fences
		
	}
	
	_createMatrix(skuList) {
		const m = []
		skuList.forEach(sku => {
			m.push(sku.specs)
		})
		return new Matrix(m)
	}
	
	getDefaultSku() {
		const defaultSkuId = this.spu.default_sku_id
		if (!defaultSkuId) {
			return
		}
		return this.skuList.find(s => s.id === defaultSkuId)
	}
}

export {
	FenceGroup
}
