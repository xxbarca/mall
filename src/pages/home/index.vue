<template>
    <div id="home">
        <Navbar />
        <div class="holderTop"></div>
            <div class="container">
                <img class="top-theme" :src="themeA.entrance_img">
                <img class="activity" :src="activityD.entrance_img">
                <CategoryGrid :grid="grid" />
            </div>
        <Tabbar />
    </div>
</template>

<script>
	import Tabbar from '../../components/tabbar'
	import Navbar from '../../components/navbar'
	import {Theme} from "@/models/theme"
	import {Activity} from "@/models/activity"
	import {Banner} from "@/models/banner"
    import CategoryGrid from '../../components/category-grid'
	import {Category} from "@/models/category"


	export default {
		name: "index",
        components: {
			Tabbar,
            Navbar,
            CategoryGrid
        },

        data() {
	        return {
		        themeA: null,
		        activityD: null,
                bannerB: [],
                bannerG: [],
                grid: []
            }
        },
		mounted() {
            this.initAllData()
        },
        methods: {
			async initAllData() {
				const theme = new Theme()
				await theme.getThemes()
                const themeA = theme.getHomeLocationA()
                const bannerB = await Banner.getHomeLocationB()
                const activityD = await Activity.getHomeLocationD()
                const bannerG = await Banner.getHomeLocationG()
                const grid = await Category.getHomeLocationC()

				this.themeA = themeA
                this.bannerB = bannerB
                this.activityD = activityD
                this.bannerG = bannerG
                this.grid = grid
            }
        }
	}
</script>

<style lang="scss" scoped>

    @import "./index";
</style>
