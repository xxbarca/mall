<template>
    <div id="home">
        <Navbar />
        <div class="holderTop"></div>
            <div class="container">
                <img class="top-theme" :src="themeA.entrance_img">
                <van-swipe :autoplay="3000" indicator-color="#157658">
                    <van-swipe-item v-for="(item, index) in bannerB.items" :key="index">
                        <img class="swiper" v-lazy="item.img" />
                    </van-swipe-item>
                </van-swipe>
                <CategoryGrid :grid="grid" />
                <img class="activity" :src="activityD.entrance_img">
                <img :src="themeF.entrance_img" class="quality"></img>
                <HotList :banner="bannerG"/>
            </div>
        <Tabbar />
    </div>
</template>

<script>
	import Tabbar from '../../components/tabbar'
	import Navbar from '../../components/navbar'
	import {Theme} from "../../models/theme"
	import {Activity} from "../../models/activity"
	import {Banner} from "../../models/banner"
    import CategoryGrid from '../../components/category-grid'
	import {Category} from "../../models/category"
    import HotList from "../../components/hot-list"


	export default {
		name: "index",
        components: {
			Tabbar,
            Navbar,
            CategoryGrid,
	        HotList
        },

        data() {
	        return {
		        themeA: null,
		        activityD: null,
                bannerB: [],
                bannerG: [],
		        themeE: [],
		        themeESpu: [],
		        themeF: {},
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
				const themeE = theme.getHomeLocationE()
				const themeF = theme.getHomeLocationF()


				let themeESpu = []

				if (themeE.online) {
					const data = await Theme.getHomeLocationESpu()
					if (data) {
						themeESpu = data.spu_list.slice(0, 8)
					}
				}

				this.themeA = themeA
                this.bannerB = bannerB
                this.activityD = activityD
                this.bannerG = bannerG
                this.grid = grid
                this.themeE = themeE
                this.themeESpu = themeESpu
                this.themeF = themeF
            }
        }
	}
</script>

<style lang="scss" scoped>

    @import "./index";
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
</style>
