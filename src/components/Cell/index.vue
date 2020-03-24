<template>
	<div id="cell">
		<div class="inner-container">
			<label>{{cell.title}}</label>
		</div>
	</div>
</template>

<script>
	export default {
		name: "index",
		props: ['x', 'y', 'cell'],
		mounted() {
		}

	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
