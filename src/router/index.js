import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home'
import Category from '../pages/category'
import My from '../pages/my'
import Cart from '../pages/cart'
import Detail from '../pages/detail'
import Search from '../pages/search'

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
	}, {
		path: '/detail/:id',
		name: 'Detail',
		component: Detail
	}, {
		path: '/search',
		name: 'Search',
		component: Search
	}, {
		path: '/spuList',
		name: 'SpuList',
		component: () => import('../components/spu-list')
	}]
})
