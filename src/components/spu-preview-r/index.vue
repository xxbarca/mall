<template>
	<div id="spuPreviewR">
		<img :src="data.img">
		<span class="title">{{data.title}}</span>
	</div>
</template>

<script>
	export default {
		name: "index",
		props: ['data']
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
