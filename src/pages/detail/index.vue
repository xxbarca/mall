<template>
	<div id="detail">

		<van-popup :lazy-render='false' position="bottom" v-model="showRealm">
			<Realm v-bind:spu="spu" />
		</van-popup>

		<div class="tabbar">
			<van-goods-action>
				<van-goods-action-icon color="#157658" icon="chat-o" text="首页" @click="onGoToHome" />
				<van-goods-action-icon color="#157658" icon="cart-o" text="购物车" @click="onGoToCart" />
				<van-goods-action-button color="#157658" type="warning" text="加入购物车" @click="onAddToCart" />
				<van-goods-action-button color="#333333" type="danger" text="立即购买" @click="onBuy" />
			</van-goods-action>
		</div>
	</div>
</template>

<script>
	import {Spu} from "../../models/spu"
	import Realm from  '../../components/realm'
	import Navbar from '../../components/navbar'

	export default {
		name: "Detail",
		data() {
			return {
				pid: '',
				spu: {},
				showRealm: false,
				lazyRender: false
			}
		},
		components: {
			Realm,
			Navbar
		},
		methods: {
			async getData(id) {
				const spu = await Spu.getDetail(id)
				this.spu = spu
			},

			onGoToHome() {},

			onGoToCart() {

			},

			onAddToCart() {
				this.showRealm = true
			},

			onBuy() {
				this.showRealm = true
			}
		},
		mounted() {
			this.pid = this.$route.params.id
			this.getData(this.pid)
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
