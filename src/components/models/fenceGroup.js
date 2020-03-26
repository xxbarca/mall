import {Matrix} from "./matrix"
import {Fence} from "./fence"

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
	
	eachCell(cb) {
		for (let i = 0; i < this.fences.length; i++) {
			for (let j = 0; j < this.fences[i].cells.length; j++) {
				const cell = this.fences[i].cells[j]
				cb(cell, i, j)
			}
		}
	}
}

export {
	FenceGroup
}
