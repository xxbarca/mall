<template>
	<div id="spuDescription">
		<div class="left">
			<label>{{spu.title}}</label>
			<div class="tags">
				<span class="tag" v-for="(item, index) in tags" :key="index">
					{{item}}
				</span>
			</div>
			<span class="subtitle">{{spu.subtitle}}</span>
			<div class="price-row">
				<span>{{spu.price}}</span>
				<span v-if="spu.discount_price">{{spu.discount_price}}</span>
				<span v-if="spu.discount_price" class="discountTag">折扣</span>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "index",
		props: ['spu'],
		data() {
			return {
				tags: []
			}
		},
		watch: {
			spu: function (spu) {
				if (!spu) {
					return
				}
				if (!spu.tags) {
					return
				}
				this.tags = spu.tags.split('$')
			}
		},
		mounted() {
			// console.log(this.spu)
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
