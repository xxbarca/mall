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
				<van-sidebar class="scroll" v-model="activeKey">
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称" />
					<van-sidebar-item title="标签名称1" />
				</van-sidebar>
				<div class="right">
					33
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

	export default {
		name: "index",
        components: {
			Tabbar,
            Navbar
        },
		data() {
			return {
				activeKey: '',
				categories: {},
				defaultRootId: 2,
				roots: [],
				currentSubs: [],
				currentBannerImg: ''
			}
		},
		methods: {
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
