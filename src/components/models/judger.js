import {SkuCode} from "./skuCode"
import {Cell} from "./cell"
import {CellStatus} from "../../utils/enum"

class Judger {
	
	fenceGroup
	pathDict = []
	skuPending
	
	constructor(fenceGroup) {
		this.fenceGroup = fenceGroup
		this._initPathDict()
	}
	
	/**
	 * 获取潜在路径
	 * */
	_initPathDict() {
		// code: 2$1-45#3-9#4-14
		this.fenceGroup.spu.sku_list.forEach(s => {
			const skuCode = new SkuCode(s.code)
			this.pathDict = this.pathDict.concat(skuCode.totalSegments)
		})
	}
	
	judge(data) {
		this._changeCellStatus(data)
	}
	
	_changeCellStatus(data) {
		const { cell, x, y } = data
		if (cell.status === CellStatus.WAITING) {
			this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
		} else if (cell.status === CellStatus.SELECTED) {
			this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
		}
	}
}

export {
	Judger
}
