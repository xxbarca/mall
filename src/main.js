import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Http from './utils/http'
import Axios from 'axios'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.$http = Http
Vue.prototype.$axios = Axios

new Vue({
    render: h => h(App),
	router
}).$mount('#app')
