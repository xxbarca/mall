<template>
    <div id="cart">
        <Navbar />
        cart
        <Tabbar />
    </div>
</template>

<script>
	import Tabbar from '../../components/tabbar'
    import Navbar from '../../components/navbar'

	export default {
		name: "index",
        components: {
			Tabbar,
            Navbar
        }
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
