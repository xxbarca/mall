import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Http from './utils/http'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.$http = Http

new Vue({
    render: h => h(App),
	router
}).$mount('#app')
