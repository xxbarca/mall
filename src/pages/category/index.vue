<template>
    <div id="category">
        <Navbar />
		<div class="container">
			<div class="search-container">
				<van-search
						@click="onGoToSearch"
						disabled
						placeholder="请输入搜索关键词"
				/>
			</div>
			<div class="main">
				<van-sidebar class="scroll" v-model="activeKey" @change="onChange">
					<div v-for="item in roots">
						<van-sidebar-item :title="item.name" :key="item.id" />
					</div>
				</van-sidebar>
				<div class="right">
					<SubCategory @func="onJumpToSpuList" :categories="currentSubs" :banner-img="currentBannerImg" />
				</div>
			</div>
		</div>
        <Tabbar />
    </div>
</template>

<script>
	import Tabbar from '../../components/tabbar'
	import Navbar from '../../components/navbar'
	import {Categories} from "../../models/categories"
	import SubCategory from '../../components/sub-category'
	import {SpuListType} from "../../utils/enum"

	export default {
		name: "index",
        components: {
			Tabbar,
            Navbar,
			SubCategory
        },
		data() {
			return {
				activeKey: 3,
				categories: {},
				defaultRootId: 2,
				roots: [],
				currentSubs: [],
				currentBannerImg: ''
			}
		},
		methods: {
			onJumpToSpuList(id) {
				this.$router.push({path: 'spuList', query: {cid: id, type: SpuListType.SUB_CATEGORY}})
			},
			onGoToSearch: function () {
				this.$router.push({path: '/search'})
			},
			async initCategoryData() {
				const categories = new Categories()
				this.categories = categories
				await categories.getAll()
				const roots = categories.getRoots()
				this.roots = roots
				const defaultRoot = this.getDefaultRoot(roots)
				this.currentSubs = categories.getSubs(defaultRoot.id)
				this.currentBannerImg = defaultRoot.img
			},
			getDefaultRoot(roots) {
				let defaultRoot = roots.find(r => r.id = this.defaultRootId)
				if (!defaultRoot) {
					defaultRoot = roots[0]
				}
				return defaultRoot
			},

			onChange(index) {
				this.defaultRoot = this.roots[index]
				this.currentSubs = this.categories.getSubs(this.defaultRoot.id)
				this.currentBannerImg = this.defaultRoot.img

			}
		},
		mounted() {
			this.initCategoryData()
		}
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
