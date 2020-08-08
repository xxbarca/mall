<template>
	<div id="subCategory">
		<div class="container">
			<img :src="bannerImg" v-if="bannerImg" class="banner" alt="">
			<span class="title">- 全部分类 -</span>
			<div class="inner-container">
				<div v-for="item in categories" class="grid-item">
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
		watch: {
			categories: function (categories) {
				console.log(categories)
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./index.scss";
</style>
