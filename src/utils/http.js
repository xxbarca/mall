import {config} from '../config/config'
import Axios from 'axios'

class Http {
	static async request({url, data, method = 'get'}) {
		const res = await new Promise((resolve, reject) => {
			Axios({
				method: method,
				url: `${url}`,
				params: data,
				headers: {
					appkey: config.appkey,
					clientkey: config.clientkey
				},
			}).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
		return res.data
	}
}

export {
	Http
}
