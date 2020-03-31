<template>
	<div>
		<div id="realm">
			<div class="sku-preview">
				<img class="sku-img" :src="previewImg">
				<div class="sku-description">
					<span class="title">{{title}}</span>
					<div>
						<div class="price-row">
							<span>{{price}}</span>
							<span v-show="discountPrice">{{discountPrice}}</span>
							<span v-if="stock && stock >= 10" class="stock">库存: {{stock}} 件</span>
							<span v-if="stock && stock < 10 && stock != 0" class="stock-pinch">仅剩 {{stock}} 件</span>
						</div>
						<div v-if="!noSpec" class="sku-pending">
							<span v-if="!skuIntact">请选择:</span>
							<span v-else>已选:</span>
							<span v-if="!skuIntact">{{missingKeys}}</span>
							<span v-else>{{currentValues}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="hr"></div>

			<div class="inner-container">
				<Fence v-for="(item, index) in fences" :key="index" :fence="item" :x="index" />
			</div>
			<div class="counter-container">
				<span>购买数量</span>
				<Counter @onSelectCount="onSelectCount" />
			</div>
		</div>
		<div v-if="!outStock" class="bottom-btn">
			<span v-if="orderWay === 'cart'">加入购物车</span>
			<span v-else>立即购买</span>

		</div>
		<div v-else class="bottom-btn out-stock">
			<span>暂时缺货</span>
		</div>

	</div>

</template>

<script>
	import {FenceGroup} from '../models/fenceGroup'
	import {Judger} from "../models/judger"
	import Fence from  '../fence'
	import EventBus from '../../utils/eventBus'
	import {Spu} from "../../models/spu"
	import Counter from '../counter/index'
	import {Cart} from "../../models/cart"

	export default {
		name: "index",
		props: ['spu', 'orderWay'],
		components: {
			Fence,
			Counter
		},
		data() {
			return {
				count: 5,
				judger: {},
				fences: [],
				previewImg: '',
				title: '',
				price: '',
				discountPrice: '',
				// 是否缺货
				outStock: false,
				// spu情况下不显示, sku情况下显示
				stock: '',
				// 是否无规格
				noSpec: false,
				// 是否选择了完整路径
				skuIntact: false,
				// 已选择的规格值
				currentValues: '',
				// 未选择的规格名
				missingKeys: '',
				// 当前购买数量
				currentSkuCount: Cart.SKU_MIN_COUNT
			}
		},
		methods: {
			/**
			 * 获取当前的购买数量
			 * */
			onSelectCount(count) {
				this.currentSkuCount = count
				if (this.judger.isSkuIntact()) {
					const sku = this.judger.getDeterminateSku()
					this.setStockStatus(sku.stock, count)
				}
			},
			/**
			 * 绑定cell表格数据
			 * */
			bindFenceGroupData(fencesGroup) {
				this.fences = fencesGroup.fences
			},
			/**
			 * 不存在默认sku, 则绑定spu数据
			 * */
			bindSpuData() {
				const spu = this.spu
				this.previewImg = spu.img
				this.title = spu.title
				this.price = spu.price
				this.discountPrice = spu.discount_price
			},
			/**
			 * 如果有默认sku, 则绑定默认数据
			 * */
			bindSkuData(sku) {
				this.previewImg = sku.img
				this.title = sku.title
				this.price = sku.price
				this.discountPrice = sku.discount_price
				this.stock = sku.stock
			},
			/**
			 * 绑定是否选择整个路径数据
			 * */
			bindTipData() {
				this.skuIntact = this.judger.isSkuIntact()
				this.currentValues = this.judger.getCurrentValues().join(" ")
				this.missingKeys = this.judger.getMissingKeys().join(' ')
			},

			/**
			 * 处理无规格的情况
			 * */
			processNoSpec(spu) {
				this.noSpec = true
				this.bindSkuData(spu.sku_list[0])
				this.setStockStatus(spu.stock, this.currentSkuCount)
			},

			/**
			 * 处理有规格的情况
			 * */
			processHasSpec(spu) {
				const fencesGroup = new FenceGroup(spu)
				fencesGroup.initFences()
				this.judger = new Judger(fencesGroup)
				//
				const defaultSku = fencesGroup.getDefaultSku()
				if (defaultSku) {
					this.bindSkuData(defaultSku)
					this.setStockStatus(defaultSku.stock, this.currentSkuCount)
				} else {
					this.bindSpuData()
				}
				this.bindTipData()
				this.bindFenceGroupData(fencesGroup)
			},

			//
			setStockStatus(stock, currentCount) {
				this.outStock = this.isOutOfStock(stock, currentCount)
			},

			/**
			 * 是否缺货
			 * */
			isOutOfStock(stock, currentCount) {
				return stock < currentCount
			},

			initEventBus() {
				/**
				 * 点击cell, 切换状态, 并重新绑定数据
				 * */
				EventBus.$on('celltap', (data) => {
					this.judger.judge(data)
					const skuIntact = this.judger.isSkuIntact()
					// 如果此次点击产生了一个完整的sku
					if (skuIntact) {
						const currentSku = this.judger.getDeterminateSku()
						this.bindSkuData(currentSku)
						this.setStockStatus(currentSku.stock, this.currentSkuCount)
					}
					//
					this.bindTipData()
					//
					this.bindFenceGroupData(this.judger.fenceGroup)
				});
			}
		},

		watch: {
			spu: function (spu) {
				if (!spu) {
					return
				}
				// 是否无规格
				if (Spu.isNoSpec(spu)) {
					this.processNoSpec(spu)
				} else {
					this.processHasSpec(spu)
				}
			}
		},
		mounted() {
			this.initEventBus()
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
