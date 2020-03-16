<template>
    <div id="container">
        <van-grid :column-num="3" :border="false">
            <van-grid-item
                    v-for="(item, index) in grid"
                    :key="index"
                    :icon="item.img"
                    :text="item.title"
            />
        </van-grid>
    </div>
</template>

<script>
	import { Grid, GridItem } from 'vant';
	export default {
		name: "CategoryGrid",
        components: {
			GridItem,
            Grid
        },
		props: {
			grid: {
				type: Array,
				default: []
			}
		},
        mounted() {
			console.log(this.grid)
        }
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
