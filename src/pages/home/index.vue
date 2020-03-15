<template>
    <div id="home">
        <Navbar />
        home
        <Tabbar />
    </div>
</template>

<script>
	import Tabbar from '../../components/tabbar'
	import Navbar from '../../components/navbar'
	import {Theme} from "@/models/theme"

	export default {
		name: "index",
        components: {
			Tabbar,
            Navbar
        },
        mounted() {
            this.initAllData()
        },
        methods: {
			initAllData() {
				const theme = new Theme()
				theme.getThemes()
            }
        }
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
