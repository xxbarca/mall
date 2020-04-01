import {Matrix} from "./matrix"
import {Fence} from "./fence"
import {CellStatus} from "../../utils/enum"

class FenceGroup {
	spu
	skuList = []
	fences = []
	
	constructor(spu) {
		this.spu = spu
		this.skuList = spu.sku_list
	}
	
	/**
	 * 根据default_sku_id获取默认sku
	 * */
	getDefaultSku() {
		const default_sku_id = this.spu.default_sku_id
		if (!default_sku_id) {
			return
		}
		return this.skuList.find(s => s.id === default_sku_id)
	}
	
	/**
	 *
	 * */
	getSku(skuCode) {
		const fullSkuCode = `${this.spu.id}$${skuCode}`
		const sku = this.spu.sku_list.find(s => s.code === fullSkuCode)
		return sku ? sku : null
	}
	/**
	 * 通过 id 改变cell的状态
	 * */
	setCellStatusBuyId(cellId, status) {
		this.eachCell((cell, x, y) => {
			if (cell.id === cellId) {
				cell.status = status
			}
		})
	}
	
	/**
	 * 通过 x, y 改变cell的状态
	 * */
	setCellStatusByXY(x, y, status) {
		this.fences[x].cells[y].status = status
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
			// 设置可视规格
			if (this._hasSketchFence() && this._isSketchFence(fence.id)) {
				fence.setFenceSketch(this.skuList)
			}
			fences.push(fence)
		})
		this.fences = fences
	}
	
	/**
	 * 是否有可视规格
	 * sketch_spec_id
	 * */
	_hasSketchFence() {
		return this.spu.sketch_spec_id ? true : false
	}
	
	/**
	 * 确定可视规格
	 * */
	_isSketchFence(fenceId) {
		return this.spu.sketch_spec_id === fenceId
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
