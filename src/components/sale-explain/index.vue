<template>
	<div id="saleExplain">
		<span v-for="(item, index) in texts" :key="index">
			{{item}}
		</span>
	</div>
</template>

<script>
	export default {
		name: "index",
		props: ['texts'],

	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
