<template>
	<div id="fence">
		<div class="title">{{fence.title}}</div>
		<div class="row-container">
			<Cell v-for="(item, index) in fence.cells"
				  :key="index"
				  :x="x" :y="index"
				  class="cell" :cell="item"></Cell>
			<div class="hr"></div>
		</div>
	</div>
</template>

<script>
	import Detail from "../../pages/detail/index"
	import Cell from  '../Cell'
	export default {
		name: "index",
		components: {
			Cell
		},
		props: ["fence", "x"],
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
