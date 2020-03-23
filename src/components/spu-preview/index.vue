<template>
	<div>
		<img @load="onImageLoad" :src="data.img">
	</div>
</template>

<script>
	export default {
		name: "index",
		props: ['data'],

		data() {
			return {
				tags: []
			}
		},
		methods: {
			onImageLoad(event) {
				const {width, height} = event.path[0]
				console.log(width, height)
			}
		},
		mounted() {
			if (!this.data) {
				return
			}

			if (!this.data.tags) {
				return
			}
			this.tags = this.data.tags.split("$")
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
