<template>
	<div id="detail">
		<Realm v-bind:spu="spu" />
	</div>
</template>

<script>
	import {Spu} from "../../models/spu"
	import Realm from  '../../components/realm'
	import Navbar from '../../components/navbar'

	export default {
		name: "Detail",
		data() {
			return {
				pid: '',
				spu: {}
			}
		},
		components: {
			Realm,
			Navbar
		},
		methods: {
			async getData(id) {
				const spu = await Spu.getDetail(id)
				this.spu = spu
			}
		},
		mounted() {
			this.pid = this.$route.params.id
			this.getData(this.pid)
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
