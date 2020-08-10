module.exports = {
	devServer: {
		proxy: {
			"/v1": {
				// target: "https://api.sleeve.7yue.pro",
				target: "http://localhost:8080",
				changOrigin: true,
			}
		},
	},
	lintOnSave: false
}
