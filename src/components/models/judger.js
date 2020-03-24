import {SkuCode} from "./skuCode"

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
	 * 潜在路径
	 * */
	_initPathDict() {
		// code: 2$1-45#3-9#4-14
		this.fenceGroup.spu.sku_list.forEach(s => {
			const skuCode = new SkuCode(s.code)
			this.pathDict.concat(skuCode.totalSegments)
		})
	}
	
	// TODO _initSkuPending
	_initSkuPending() {
	
	}
}

export {
	Judger
}
