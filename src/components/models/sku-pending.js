
/**
 * 选择完整的路径可以确定一个sku
 * 记录已选的cell
 * */
class SkuPending {
	
	pending = []
	
	constructor() {
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
