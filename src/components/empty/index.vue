<template>
	<div v-if="show" class="container">
		<img class="img" src="../imgs/empty.png" />
		<label class="text">{{text}}</label>
		<van-button v-if="showBtn" @click="onTap" color="#157658">{{btnText}}</van-button>
	</div>

</template>

<script>
	export default {
		name: "index",
		props: {
			text: {
				type: String,
				default: "暂无相关商品"
			},
			btnText: {
				type: String,
				default: '去逛逛'
			},
			show: {
				type: Boolean
			},
			showBtn: {
				type: Boolean
			}
		},
		methods: {
			onTap() {}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
