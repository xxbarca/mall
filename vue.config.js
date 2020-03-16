module.exports = {
	devServer: {
		proxy: {
			"/v1": {
				target: "https://api.sleeve.7yue.pro"
			}
		}
	},
	lintOnSave: false
}
