import {Http} from "../utils/http"

class SpuPaging {
	static async getLatestPaging() {
		return await Http.request({
			url: `/v1/spu/latest`,
		})
	}
}

export {
	SpuPaging
}
