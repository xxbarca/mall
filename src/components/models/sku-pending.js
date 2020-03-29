import {Cell} from "./cell"
import {CellStatus} from "../../utils/enum"
import {Joiner} from "../../utils/joiner"

/**
 * 选择完整的路径可以确定一个sku
 * 记录已选的cell
 * */
class SkuPending {
	
	pending = []
	size
	
	constructor(size) {
		this.size = size
	}
	
	init(sku) {
		for (let i = 0; i < sku.specs.length; i++) {
			const cell = new Cell(sku.specs[i])
			this.insertCell(cell, i)
		}
	}
	
	/**
	 * 获取当前已选的规格值
	 * */
	getCurrentSpecValues() {
		return this.pending.map(cell => {
			return cell ? cell.spec.value : null
		})
	}
	
	/**
	 * 获取未选的规格名
	 * */
	getMissingSpecKeysIndex() {
		const keysIndex = []
		for (let i = 0; i < this.size; i++) {
			if (!this.pending[i]) {
				keysIndex.push(i)
			}
		}
		return keysIndex
	}
	
	/**
	 * 获取skuCode码
	 * */
	getSkuCode() {
		const joiner = new Joiner("#")
		this.pending.forEach(cell => {
			const cellCode = cell.getCellCode()
			joiner.join(cellCode)
		})
		return joiner.getStr()
	}
	
	/**
	 * 是否确认了完整的sku
	 *      1. true: 用户已经确认了完整的sku
	 *      2. false: 用户没有确认完整的sku
	 * */
	isIntact() {
		if (this.size !== this.pending.length) {
			return false
		}
		
		for (let i = 0; i < this.size; i++) {
			if (this._isEmptyPart(i)) {
				return  false
			}
		}
		return true
	}
	
	/**
	 * 如果存在值不为 undefined
	 * */
	_isEmptyPart(index) {
		return this.pending[index] ? false : true
	}
	
	insertCell(cell, x) {
		this.pending[x] = cell
	}
	
	removeCell(x) {
		this.pending[x] = null
	}
	
	findSelectedCellByX(x) {
		return this.pending[x]
	}
	
	isSelected(cell, x) {
		const pendingCell = this.pending[x]
		if (!pendingCell) {
			return false
		}
		return cell.id === pendingCell.id
	}
	
}

export {
	SkuPending
}
