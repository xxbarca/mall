<template>
	<div id="nav-bar">
		<van-nav-bar
				:title="title"
				left-text="返回"
				left-arrow
				@click-left="onClickLeft"
		/>
	</div>
</template>

<script>
	export default {
		name: "NavBar",
		props: {
			title: {
				type: String,
				default: "首页"
			}
		},
		methods: {
			onClickLeft() {
				this.$emit('back')
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
