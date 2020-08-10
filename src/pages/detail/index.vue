<template>
	<div id="detail">
		<div>
			<van-swipe :autoplay="3000" indicator-color="#157658">
				<van-swipe-item v-for="(item, index) in spu.spu_img_list" :key="index">
					<img class="swiper" v-lazy="item.img" />
				</van-swipe-item>
			</van-swipe>
		</div>

		<SpuDescription :spu="spu" />

		<div v-if="!specs.noSpec" class="sku-pending" @click="onAddToCart">
			<div class="specs">
				<span v-if="!specs.skuIntact">请选择:</span>
				<span v-else>已选:</span>
				<span v-if="!specs.skuIntact">{{specs.missingKeys}}</span>
				<span v-else>{{specs.currentValues}}</span>
			</div>
			<van-icon name="arrow" color="#157658" />
		</div>

		<div class="explain">
			<Sale_Explain :texts="saleExplain" />
		</div>

		<div class="detail-img-container">
			<img class="detail-img" :src="item.img" v-for="(item, index) in spu.spu_img_list" :key="index">
		</div>

		<van-popup :lazy-render='false' position="bottom" v-model="showRealm">
			<Realm @specChange="specChange" @shopping="onShopping"  :orderWay="orderWay" v-bind:spu="spu" />
		</van-popup>

		<div class="tabbar">
			<van-goods-action>
				<van-goods-action-icon color="#157658" icon="chat-o" text="首页" @click="onGoToHome" />
				<van-goods-action-icon color="#157658" icon="cart-o" text="购物车" badge="5" @click="onGoToCart" />
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
	import {ShoppingWay} from "../../utils/enum"
	import SpuDescription from '../../components/spu-description'
	import Sale_Explain from '../../components/sale-explain'
	import {SaleExplain} from "../../models/saleExplain"

	export default {
		name: "Detail",
		data() {
			return {
				pid: '',
				spu: {},
				showRealm: false,
				lazyRender: false,
				/**
				 * 方式
				 * 	1. 加入购物车
				 * 	2. 立即购买
				 * */
				orderWay: '',
				//
				specs: {},
				//
				saleExplain: []
			}
		},
		components: {
			Realm,
			Navbar,
			SpuDescription,
			Sale_Explain
		},
		methods: {
			async getData(id) {
				const spu = await Spu.getDetail(id)
				const explain = await SaleExplain.getFixed()
				this.spu = spu
				this.saleExplain = explain
			},

			onShopping(data) {
				const {orderWay, skuCount, sku, spuId} = data
				if (orderWay === ShoppingWay.CART) { // 加入购物车

				}

			},

			specChange(detail) {
				this.specs = detail
			},

			onGoToHome() {
				this.$router.push('/')
			},

			onGoToCart() {
				this.$router.push('/cart')
			},

			onAddToCart() {
				this.showRealm = true
				this.orderWay = ShoppingWay.CART
			},

			onBuy() {
				this.showRealm = true
				this.orderWay = ShoppingWay.BUY
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
