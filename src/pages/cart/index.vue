<template>
    <div id="cart">
        <Navbar />
        <div class="container" v-if="!isEmpty">
			<CartItem v-for="(item, index) in cartItems" />
		</div>
		<div class="empty-container" v-if="isEmpty">
			<Empty show-btn show text="购物车空空的, 去逛逛吧" />
 		</div>
        <Tabbar />
    </div>
</template>

<script>
	import Tabbar from '../../components/tabbar'
    import Navbar from '../../components/navbar'
	import CartItem from '../../components/cart-item'
	import {Cart} from "../../models/cart"
	import Empty from '../../components/empty'

	export default {
		name: "index",
        components: {
			Tabbar,
            Navbar,
			CartItem,
			Empty
        },
		data() {
			return {
				cartItems: [],
				isEmpty: false,
				showBtn: true,
				show: true
			}
		},

		methods: {
			setEmpty() {
				this.isEmpty = true
			},
		},

		mounted() {
			const cart = new Cart()
			const cartItems = cart.getAllCartItemFromLocal().items
			if (cart.isEmpty()) {
				this.setEmpty()
				return
			}
			this.cartItems = cartItems
        }
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
