import {Cell} from "./cell"

class Fence {
	
	cells = []
	specs
	
	title
	id
	/**
	 * specs
	 * [{
	 *     key_id: 1,
	 *     key: "颜色",
	 *     value_id: 45,
	 *     value: "金属灰"
	 * }, {}, {}]
	 *
	 * */
	constructor(specs) {
		this.specs = specs
		this.title = specs[0].key
		this.id = specs[0].key_id
	}
	
	init() {
		this._initCells()
	}
	
	_initCells() {
		this.specs.forEach(s => {
			const exist = this.cells.some(c => {
				return c.id === s.value_id
			})
			if (exist) {
				return
			}
			
			const cell = new Cell(s)
			this.cells.push(cell)
		})
	}
	
	/**
	 * 设置cell的可视规格
	 * */
	setFenceSketch(skuList) {
		this.cells.forEach(cell => {
			this._setCellSkuImg(cell, skuList)
		})
	}
	
	_setCellSkuImg(cell, skuList) {
		const specCode = cell.getCellCode()
		const matchedSku = skuList.find(s => s.code.includes(specCode))
		if (matchedSku) {
			cell.skuImg = matchedSku.img
		}
		
	}
}

export {
	Fence
}
