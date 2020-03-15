import { Http } from '../utils/http'

class Theme {
	static locationA = 't-1'
	static locationE = 't-2'
	static locationF = 't-3'
	static locationH = 't-4'
	
	themes = []
	
	async getThemes() {
		const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
		this.themes = await Http.request({
			url: `/v1/theme/by/names`,
			data: {
				names
			}
		})
	}
	
	getHomeLocationA() {
		return this.themes.find(t => t.name === Theme.locationA)
	}
	
	getHomeLocationE() {
		return this.themes.find(t => t.name === Theme.locationE)
	}
	
	getHomeLocationF() {
		return this.themes.find(t => t.name === Theme.locationF)
	}
	
	getHomeLocationH() {
		return this.themes.find(t => t.name === Theme.locationH)
	}
	
}

export {
	Theme
}
