import {SkuCode} from "./skuCode"
import {Cell} from "./cell"
import {CellStatus} from "../../utils/enum"
import {SkuPending} from "./sku-pending"
import {Joiner} from "../../utils/joiner"

class Judger {
	
	fenceGroup
	pathDict = []
	skuPending
	
	constructor(fenceGroup) {
		this.fenceGroup = fenceGroup
		this._initPathDict()
		this._initSkuPending()
	}
	
	/**
	 *
	 * */
	_initSkuPending() {
		const specsLength = this.fenceGroup.fences.length
		this.skuPending = new SkuPending(specsLength)
		this._getDefaultSku()
	}
	
	/**
	 * 获取确定的sku
	 * */
	getDeterminateSku() {
		const code = this.skuPending.getSkuCode()
		const sku = this.fenceGroup.getSku(code)
		return sku
	}
	/**
	 * 是否选择了完整路径
	 * */
	isSkuIntact() {
		return this.skuPending.isIntact()
	}
	
	/**
	 * 获取未选择的规格值
	 * */
	getCurrentValues() {
		return this.skuPending.getCurrentSpecValues()
	}
	
	/**
	 * 获取未选择的规格名
	 * */
	getMissingKeys() {
		const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
		return missingKeysIndex.map(i => {
			return this.fenceGroup.fences[i].title
		})
	}
	/**
	 * 获取并设置默认sku
	 * */
	_getDefaultSku() {
		const defaultSku = this.fenceGroup.getDefaultSku()
		if (!defaultSku) {
			return
		}
		this.skuPending.init(defaultSku)
		this._setSelectedCell()
		this.judge({}, true)
	}
	
	/**
	 * 设置默认sku的选中状态
	 * */
	_setSelectedCell() {
		this.skuPending.pending.forEach(c => {
			this.fenceGroup.setCellStatusBuyId(c.id, CellStatus.SELECTED)
		})
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
	
	
	/**
	 * isInit = true: 是初始化的时候调用, 此时是设置默认sku
	 * isInit = false: 是手动点击cell的时候调用
	 * */
	judge(data, isInit = false) {
		if (!isInit) {
			this._changeCurrentCellStatus(data)
		}
		this._changeOtherCellStatus()
	}
	/**
	 * 判断路径是否在潜在路径里面
	 * */
	_isInDict(path) {
		return this.pathDict.includes(path)
	}
	
	/**
	 * 改变其他行cell的状态
	 * @param: x - 行号
	 * @param: y - 列号
	 * */
	_changeOtherCellStatus() {
		this.fenceGroup.eachCell((cell, x, y) => {
			const path  = this._findPotentialPath(cell, x, y)
			if (!path) {
				return
			}
			const isIn = this._isInDict(path)
			if (isIn) {
				// this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
				this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
			} else {
				// this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
				this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
			}
		})
	}
	
	/**
	 * 1. 当前的cell, 不需要再判断潜在路径
	 * 2. 对于某个cell, 潜在路径是它自己加上其它行的已选cell
	 * 3. 对于某个cell, 不需要考虑当前行其他cell是否已选
	 * */
	_findPotentialPath(cell, x, y) {
		const joiner = new Joiner('#')
		for (let i = 0; i < this.fenceGroup.fences.length; i ++) {
			// const selected = this.skuPending.findSelectedCellByX(i)
			if (x === i) {
				// 当前行
				// cell id 1-42
				
				if (this.skuPending.isSelected(cell, x)) {
					// 如果当前行的元素是已选状态, 那么跳过
					return
				}
				
				const cellCode = this._getCellCode(cell.spec)
				joiner.join(cellCode)
			} else {
				const selected = this.skuPending.findSelectedCellByX(i)
				// 非当前行
				if (selected) {
					const selectedCellCode = this._getCellCode(selected.spec)
					joiner.join(selectedCellCode)
				}
			}
		}
		return joiner.getStr()
	}
	
	/**
	 * 获取cellCode
	 * */
	_getCellCode(spec) {
		return spec.key_id + '-' + spec.value_id
	}
	
	/**
	 * 改变当前cell的状态
	 * 状态变成 selected 需要插入到skupending
	 * 状态变成 waiting  需要从skupending删除
	 * */
	_changeCurrentCellStatus(data) {
		const { cell, x, y } = data
		if (cell.status === CellStatus.WAITING) {
			// this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
			this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
			// 进入skupending
			this.skuPending.insertCell(cell, x)
		} else if (cell.status === CellStatus.SELECTED) {
			// this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
			this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
			// 退出skupending
			this.skuPending.removeCell(x)
		}
	}
}

export {
	Judger
}
