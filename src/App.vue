<template>
  <div id="app">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>

export default {
	name: 'App',
    components: {
    }
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}
	#app {
		height: 100%;
		background: #ffffff;
	}
</style>
