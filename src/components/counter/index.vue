<template>
	<div id="counter">
		<span :class="['min', minClass]" @click="substractNum">-</span>
		<input class="number" v-model="count_" />
		<span :class="['add', maxClass]" @click="addNum">+</span>
	</div>
</template>

<script>
	import {Cart} from '../../models/cart'
	import {Toast} from 'vant'
	export default {
		name: "index",
		props: {
			count: {
				type: Number,
				default: Cart.SKU_MIN_COUNT
			},
			// 最小值
			min: {
				type: Number,
				default: Cart.SKU_MIN_COUNT
			},
			// 最大值
			max: {
				type: Number,
				default: Cart.SKU_MAX_COUNT
			}
		},
		data() {
			return {
				count_: Number
			}
		},
		computed: {
			minClass() {
				if (this.count_ <= this.min) {
					return 'disable'
				}
			},
			maxClass() {
				if (this.count_ >= this.max) {
					return 'disable'
				}
			},
		},
		watch: {
			count_: function (newCount, oldCount) {
				if (newCount === oldCount) {
					return
				}
				if (newCount > this.max) {
					Toast(`限购${this.max}件`);
					this.count_ = oldCount
					return
				}
				if (newCount < this.min) {
					this.count_ = oldCount
					Toast(`${this.min}件起首`);
					return
				}
				this.$emit('onSelectCount', newCount)

			}
		},
		methods: {
			substractNum() {
				if (this.count_ <= this.min) {
					Toast(`${this.min}件起首`);
					return
				}
				this.count_ -= 1
			},
			addNum() {
				if (this.count_ >= this.max) {
					Toast(`限购${this.max}件`);
					return
				}
				this.count_ +=  1
			},
			initCount() {
				this.count_ = this.min > this.count ? this.min : this.count
			}
		},
		mounted() {
			this.initCount()
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
