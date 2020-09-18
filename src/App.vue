<template>
  <div id="app"
       :key="Key">
    <!-- {{$store.state.userInfo.is_editor}}
    <button @click="getuserinfo">123</button> -->
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
  methods: {
    // getuserinfo () {
    //   this.$store.dispatch('agetUserInfo')
    // }
  }

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
