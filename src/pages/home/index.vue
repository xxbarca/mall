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
                <img :src="themeH.entrance_img" class="fashion"></img>
				<div class="spu-bottom">
					<img class="title-spu-bottom" src="../../imgs/home/title@interest.png">

				</div>
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
	import {SpuPaging} from "../../models/SpuPaging"

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
		        themeH: {},
                grid: [],
                flowItems: []
            }
        },
		mounted() {
            this.initAllData()
            this.initBottomSpuList()
        },
        methods: {
	        async initBottomSpuList() {
                const data = await SpuPaging.getLatestPaging()
                this.flowItems = data.items
	        },
			async initAllData() {
				const theme = new Theme()
				await theme.getThemes()
				this.themeA = theme.getHomeLocationA()
				this.bannerB = await Banner.getHomeLocationB()
                const activityD = await Activity.getHomeLocationD()
				this.bannerG = await Banner.getHomeLocationG()
				this.grid = await Category.getHomeLocationC()
				this.themeE = theme.getHomeLocationE()
				this.themeF = theme.getHomeLocationF()
				this.themeH = theme.getHomeLocationH()

				if (this.themeE.online) {
					const data = await Theme.getHomeLocationESpu()
					if (data) {
						this.themeESpu = data.spu_list.slice(0, 8)
					}
				}
                this.activityD = activityD
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
