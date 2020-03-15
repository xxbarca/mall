<template>
    <div id="navbar">
        <slot name="back"></slot>
        <span class="title">商城</span>
        <slot name="moreAction"></slot>
    </div>
</template>

<script>
	export default {
		name: "Navbar"
	}
</script>

<style lang="scss" scoped>
    @import "./index";
</style>
