<template>
	<div @click="onTap" id="cell" :class="[statusStyle(cell.status).outer]">
		<div :class="['inner-container', statusStyle(cell.status).inner]">
			<label>{{cell.title}}</label>
		</div>
	</div>
</template>

<script>
	import {CellStatus} from "../../utils/enum"

	export default {
		name: "index",
		props: ['x', 'y', 'cell'],
		methods: {
			onTap: function () {

			},
			statusStyle: function (status) {
				if (status === CellStatus.FORBIDDEN) {
					return {
						outer: 'forbidden',
						inner: ''
					}
				}
				if (status === CellStatus.SELECTED) {
					return {
						outer: 's-outer',
						inner: 's-inner'
					}
				}
				if (status === CellStatus.WAITING) {
					return {
						outer: '',
						inner: ''
					}
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
