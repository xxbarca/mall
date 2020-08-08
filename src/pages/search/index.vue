<template>
	<div id="search">
		<NavBar @back="handleOnBack" title="搜索" />
		<van-search
				v-model="keyword"
				show-action
				placeholder="请输入搜索关键词"
				@search="onSearch"
				@cancel="onCancel"
		/>
		<div class="container">
			<div>
				<div class="history-container" v-if="historyTags.length !== 0">
					<div class="history-title">
						<label class="slide"></label>
						<label class="title">历史搜索</label>
						<van-icon @click="onDeleteHistory" class="icon" name="https://tva1.sinaimg.cn/large/007S8ZIlly1ghjdjhsbw4j305k05kdfl.jpg" />
					</div>
					<div class="history-tags">
						<label class="tag" v-for="(item, index) in historyTags" :key="index">
							<van-tag color="#F3F3F3" text-color="#7F7F7F">{{item}}</van-tag>
						</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from '../../components/nav-bar'
	import {HistoryKeyword} from "../../models/history-keyword"
	const history = new HistoryKeyword()
	export default {
		name: "index",
		components: {
			NavBar
		},
		data() {
			return {
				keyword: '',
				historyTags: []
			}
		},
		mounted() {
			this.historyTags = history.get()
		},
		methods: {
			handleOnBack() {
				this.$router.go(-1)
			},

			onDeleteHistory() {
				history.clear()
				this.historyTags = history.get()
			},

			onSearch() {
				history.save(this.keyword)
			},
			onCancel() {}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
