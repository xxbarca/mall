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
			<div v-if="!search">
				<div class="history-container" v-if="historyTags.length !== 0">
					<div class="history-title">
						<label class="slide"></label>
						<label class="title">历史搜索</label>
						<van-icon @click="onDeleteHistory" class="icon" name="https://tva1.sinaimg.cn/large/007S8ZIlly1ghjdjhsbw4j305k05kdfl.jpg" />
					</div>
					<div class="history-tags">
						<label class="tag" v-for="(item, index) in historyTags" :key="index">
							<van-tag @click="tagSearch(item)" color="#F3F3F3" text-color="#7F7F7F">{{item}}</van-tag>
						</label>
					</div>
				</div>
				<div class="history-container">
					<div class="history-title">
						<label class="slide"></label>
						<label class="title">热门搜索</label>
					</div>
					<div class="history-tags">
						<label class="tag" v-for="(item, index) in hotTags" :key="index">
							<van-tag @click="tagSearch(item.title)" color="#F3F3F3" text-color="#7F7F7F">{{item.title}}</van-tag>
						</label>
					</div>
				</div>
			</div>
			<div v-else class="searchitems">
				<SpuPreviewR v-for="(item, index) in items" :data="item"></SpuPreviewR>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from '../../components/nav-bar'
	import {HistoryKeyword} from "../../models/history-keyword"
	import {Tag} from '../../models/tag'
	import {Search} from "../../models/search"
	import SpuPreviewR from '../../components/spu-preview-r'
	const history = new HistoryKeyword()
	export default {
		name: "index",
		components: {
			NavBar,
			SpuPreviewR
		},
		data() {
			return {
				keyword: '',
				historyTags: [],
				hotTags: [],
				search: false,
				items: []
			}
		},
		async mounted() {
			this.historyTags = history.get()
			this.hotTags = await Tag.getSearchTags()
		},
		methods: {
			handleOnBack() {
				this.onCancel()
				this.$router.go(-1)
			},

			onDeleteHistory() {
				history.clear()
				this.historyTags = history.get()
			},

			tagSearch(title) {
				this.keyword = title
				this.onSearch()
			},

			async onSearch() {
				if (this.keyword === '') {
					return
				}
				this.search = true
				history.save(this.keyword)
				this.historyTags = history.get()
				const paging = Search.search(this.keyword)
				const data = await paging.getMoreData()
				this.bindItems(data)
			},
			bindItems(data) {
				if (data.accumulator.length !== 0) {
					this.items = data.accumulator
				}
			},
			onCancel() {
				this.search = false
				this.items = []
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index";
</style>
