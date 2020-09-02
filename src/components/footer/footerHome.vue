<template>
  <el-card class="gWidth footer_box">
    <el-tabs :tab-position="tabPosition"
     @tab-click="handleClick"
      v-model="activeName"
             style="height: 600px;"
             type="border-card">
      <el-tab-pane label="关于我们" name="aboutus">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="法律声明" name="contract">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="侵权投诉">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="安全保障">
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="营业执照">
        <router-view></router-view>
      </el-tab-pane>

    </el-tabs>

  </el-card>
</template>
<script >
export default {
  data () {
    return {
      activeName: 'aboutus',
      tabPosition: 'left'
    };
  },
  created(){
    if (this.$route.path.slice(1)) return this.activeName = this.$route.path.slice(1)
  },
  methods: {
     handleClick (tab, event) {
      this.$router.push({ path: '/' + tab.name }).catch(err => err);
    },
  }
}
</script>
<style lang = 'less' scoped >
.footer_box {
  background: #fff;
}
</style>