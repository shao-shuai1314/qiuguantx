<template>
  <div id="app"
       :key="Key">
    <router-view/>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
  <!-- <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div> -->
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      Key: ''
    };
  },
  // watch: {
  //   $route: function (newUrl, oldUrl) {
  //     this.Key = new Date().getTime();
  //   }
  // }
  // watch: {
  //   '$route' (to, from) {
  //     this.$router.go(0);
  //   }
  // },
}
</script>

<style>
</style>
