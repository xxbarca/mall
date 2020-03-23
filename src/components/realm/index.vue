<template>
	<div>Realm</div>
</template>

<script>
	import {Spu} from "../../models/spu"
	import {FenceGroup} from '../models/fenceGroup'

	export default {
		name: "index",
		props: ['spu'],
		methods: {
			processHasSpec(spu) {
				const fenceGroup = new FenceGroup(spu)
				fenceGroup.initFences()
			}
		},

		watch: {
			spu: function (spu) {
				if (!spu) {
					return
				}
				if (Spu.isNoSpec(spu)) {

				} else {
					// 处理有规格情况
					this.processHasSpec(spu)
				}
			}
		}
	}
</script>

<style scoped>

</style>
