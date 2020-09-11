<template>
  <div id="app"
       :key="Key">
    <router-view/>
  </div>

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
