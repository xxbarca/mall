class HistoryKeyword {
	
	static MAX_ITEM_COUNT = 20
	
	static KEY = 'keywords'
	
	keywords = []
	
	constructor() {
		if (typeof HistoryKeyword.instance === 'object') {
			return HistoryKeyword.instance
		}
		HistoryKeyword.instance = this
		this.keywords = this._getLocalKeyWords()
		return this
	}
	
	save(keyword) {
		const items = this.keywords.filter(k => {
			return k === keyword
		})
		if (items.length !==0) {
			return
		}
		
		if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
			this.keywords.pop()
		}
		this.keywords.unshift(keyword)
		this._refreshLocal()
	}
	
	get() {
		return this.keywords
	}
	
	clear() {
		this.keywords = []
		this._refreshLocal()
	}
	
	_refreshLocal() {
		const keywords = JSON.stringify(this.keywords)
		localStorage.setItem(HistoryKeyword.KEY, keywords)
	}
	
	_getLocalKeyWords() {
		const keywords = localStorage.getItem(HistoryKeyword.KEY)
		if (!keywords) {
			localStorage.setItem(HistoryKeyword.KEY, JSON.stringify([]))
			return []
		}
		return JSON.parse(keywords)
	}
}

export {
	HistoryKeyword
}
