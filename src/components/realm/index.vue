<template>
	<div id="realm">
		<div class="sku-preview">
			<img class="sku-img" :src="previewImg">
			<div class="sku-description">
				<span class="title">{{title}}</span>
				<div>
					<div class="price-row">
						<span>{{price}}</span>
						<span>{{discountPrice}}</span>
						<span v-if="stock && stock >= 10" class="stock">库存: {{stock}} 件</span>
						<span v-if="stock && stock < 10 && stock != 0" class="stock-pinch">仅剩 {{stock}} 件</span>
					</div>
					<div class="sku-pending">
						<span>请选择:</span>
					</div>
				</div>
			</div>
		</div>

		<div class="hr"></div>

		<div class="inner-container">
			<Fence v-for="(item, index) in fences" :key="index" :fence="item" :x="index" />
		</div>
		<div class="counter-container"></div>
	</div>
</template>

<script>
	import {FenceGroup} from '../models/fenceGroup'
	import {Judger} from "../models/judger"
	import Fence from  '../fence'
	import EventBus from '../../utils/eventBus'
	import {Spu} from "../../models/spu"

	export default {
		name: "index",
		props: ['spu'],
		components: {
			Fence
		},
		data() {
			return {
				judger: {},
				fences: [],
				previewImg: '',
				title: '',
				price: '',
				discountPrice: '',
				// spu情况下不显示, sku情况下显示
				stock: '',
				// 是否无规格
				noSpec: false
			}
		},
		methods: {
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
			initEventBus() {
				/**
				 * 点击cell, 切换状态, 并重新绑定数据
				 * */
				EventBus.$on('celltap', (data) => {
					this.judger.judge(data)
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
					this.noSpec = true
					this.bindSkuData(spu.sku_list[0])
					return
				}

				const fencesGroup = new FenceGroup(spu)
				fencesGroup.initFences()
				this.judger = new Judger(fencesGroup)

				//
				const defaultSku = fencesGroup.getDefaultSku()
				if (defaultSku) {
					this.bindSkuData(defaultSku)
				} else {
					this.bindSpuData()
				}

				this.bindFenceGroupData(fencesGroup)

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
