class FenceGroup {
	spu
	skuList = []
	fences = []
	
	constructor(spu) {
		this.spu = spu
		this.skuList = spu.sku_list
	}
	
	initFences() {
	}
}

export {
	FenceGroup
}
