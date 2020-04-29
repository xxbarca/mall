import {SkuCode} from "./skuCode"

class Judger {
	
	fenceGroup
	pathDict = []
	skuPending
	
	constructor(fenceGroup) {
		this.fenceGroup = fenceGroup
		this._initPathDict()
	}
	
	/**
	 * 潜在路径
	 * */
	_initPathDict() {
		// code: 2$1-45#3-9#4-14
		this.fenceGroup.spu.sku_list.forEach(s => {
			const skuCode = new SkuCode(s.code)
			// console.log(skuCode.totalSegments)
			this.pathDict = this.pathDict.concat(skuCode.totalSegments)
		})
	}
}

export {
	Judger
}
