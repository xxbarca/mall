<template>
    <div id="tabbar">
        <div class="tab_item" v-for="(item ,index) in tabBarImg" :key="index" @click="switchToTab(item.path)">
            <img :src="$route.path === item.path ? item.icon : item.normal" alt="">
            <span :class="$route.path === item.path ? 'active' : ''">{{item.title}}</span>
        </div>
    </div>
</template>

<script>
	export default {
		name: "Tabbar",
        data() {
			return {
				tabBarImg: [{
					path: '/',
                    title: "首页",
                    normal: require("../../imgs/tabbar/home@dis.png"),
                    icon: require("../../imgs/tabbar/home.png")
                }, {
					path: '/category',
                    title: '分类',
                    normal: require("../../imgs/tabbar/category@dis.png"),
                    icon: require("../../imgs/tabbar/category.png")
                }, {
					path: "/cart",
                    title: "购物车",
                    normal: require("../../imgs/tabbar/cart@dis.png"),
                    icon: require("../../imgs/tabbar/cart.png")
                }, {
					path: "/my",
                    title: "我的",
                    normal: require("../../imgs/tabbar/my@dis.png"),
                    icon: require("../../imgs/tabbar/home.png")
                }]
            }
        },
        methods: {
            // eslint-disable-next-line no-mixed-spaces-and-tabs
	        switchToTab(path) {
				console.log(path)
                this.$router.replace(path)
            }
        }
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
