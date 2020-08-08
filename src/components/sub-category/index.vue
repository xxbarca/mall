<template>
	<div id="subCategory">
		<div class="container">
			<img :src="bannerImg" v-if="bannerImg" class="banner" alt="">
			<span class="title">- 全部分类 -</span>
			<div class="inner-container">
				<div v-for="item in categories" class="grid-item" @click="onTapItem(item)">
					<img :src="item.img" class="image"/>
					<span>{{item.name}}</span>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: "subCategory",
		props: ["bannerImg", "categories"],
		methods: {
			onTapItem(item) {
				const id = item.id
				this.$emit('func', id)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
