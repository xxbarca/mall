<template>
	<div id="realm">
		<div class="sku-preview">
			<img class="sku-img" src="">
			<div class="sku-description">
				<span class="title">测试sku</span>
				<div>
					<div class="price-row">
						<span>777</span>
						<span>999</span>
					</div>
					<div class="sku-pending">
						<span>请选择:</span>
					</div>
				</div>
			</div>
		</div>

		<div class="hr"></div>

		<div class="inner-container">
			<Fence v-for="(item, index) in fences" :key="index" :fence="item" :x="index" />
		</div>
		<div class="counter-container"></div>
	</div>
</template>

<script>
	import {FenceGroup} from '../models/fenceGroup'
	import {Judger} from "../models/judger"
	import Fence from  '../fence'
	import EventBus from '../../utils/eventBus'

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
			},
			initEventBus() {
				/**
				 *
				 * 点击cell, 切换状态, 并重新绑定数据
				 * */
				EventBus.$on('celltap', (data) => {
					this.judger.judge(data)
					this.bindFenceGroupData(this.judger.fenceGroup)
				});
			}
		},

		watch: {
			spu: function (spu) {
				if (!spu) {
					return
				}
				const fencesGroup = new FenceGroup(spu)
				fencesGroup.initFences()

				this.judger = new Judger(fencesGroup)

				this.bindFenceGroupData(fencesGroup)

			}
		},
		mounted() {
			this.initEventBus()
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
