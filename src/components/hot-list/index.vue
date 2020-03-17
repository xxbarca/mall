<template>
    <div id="hot-list">
        <img :src="banner.img" class="title" />
        <div class="inner-container">
            <div>
                <img :src="left.img" class="left" />
            </div>
            <div class="right-container">
                <img :src="rightTop.img" class="right-size" />
                <img :src="rightBottom.img" class="right-size" />
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "HotList",
        props: {
			banner: {
				type: Object,
                default: {}
            }
        },
        data() {
			return {
				left: {},
				rightTop: {},
				rightBottom: {}
            }
        },
        mounted() {
			const banner = this.banner
	        if(!banner) {
		        return
	        }

	        if(banner.items.length === 0) {
		        return
	        }
            this.left = banner.items.find(t => t.name === 'left')
	        this.rightTop = banner.items.find(t => t.name === 'right-top')
	        this.rightBottom = banner.items.find(t => t.name === 'right-bottom')
        }
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
