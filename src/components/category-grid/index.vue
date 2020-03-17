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
	export default {
		name: "CategoryGrid",
        components: {

        },
		props: {
			grid: {
				type: Array,
				default: []
			}
		},
        mounted() {
        }
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
