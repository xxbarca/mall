<template>
	<div id="realm">
		<div>
			<img src="">
		</div>
		<div class="inner-container">
			<Fence v-for="(item, index) in fences" :key="index" :fence="item" :x="index" />
		</div>
		<div class="counter-container"></div>
	</div>
</template>

<script>
	import {Spu} from "../../models/spu"
	import {FenceGroup} from '../models/fenceGroup'
	import {Judger} from "../models/judger"
	import Fence from  '../fence'

	export default {
		name: "index",
		props: ['spu'],
		components: {
			Fence
		},
		data() {
			return {
				judger: {},
				fences: []
			}
		},
		methods: {
			bindFenceGroupData(fencesGroup) {
				this.fences = fencesGroup.fences
			}
		},

		watch: {
			spu: function (spu) {
				if (!spu) {
					return
				}
				const fencesGroup = new FenceGroup(spu)
				fencesGroup.initFences()

				const judger = new Judger(fencesGroup)

				this.bindFenceGroupData(fencesGroup)

			}
		}
	}
</script>

<style scoped>
	@import "./index.scss";
</style>
