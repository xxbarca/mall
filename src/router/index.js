import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Category from '../pages/category'
import My from '../pages/my'
import Cart from '../pages/cart'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: Home
	}, {
		path: '/category',
		name: 'Category',
		component: Category
	}, {
		path: '/my',
		name: 'My',
		component: My
	}, {
		path: '/cart',
		name: 'Cart',
		component: Cart
	}]
})
