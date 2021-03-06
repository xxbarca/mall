import { Http } from "../utils/http"

class Spu {
	
	// 是否无规格
	static isNoSpec(spu) {
		if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
			return true
		}
		return false
	}
	
	static async getDetail(id) {
		return await Http.request({
			url: `/v1/spu/id/${id}/detail`
		})
	}
}

export {
	Spu
}
