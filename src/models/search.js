import {Paging} from "../utils/paging"

class Search {
	static search(q) {
		return new Paging({
			url: `/v1/search?q=${q}`
		})
	}
}

export {
	Search
}
