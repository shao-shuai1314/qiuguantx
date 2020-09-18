<template>
  <div class="">
    <h2>我的钱包</h2>
    <el-card style="margin-top:10px">
      <div>
        <b>账户余额：</b>
        <b style="color:rgb(232, 75, 91);margin-right:10px">{{QiuGuanBi}} 个球冠币</b>
        <router-link target="_blank"
                     style="color:#409EFF"
                     :to="{name:'money'}">充值球冠币 </router-link>
      </div>
    </el-card>
    <el-divider content-position="left">
      <b style="font-size:16px">交易明细</b>
    </el-divider>
    <el-card v-if="QiuGuanBi">
      查看近期交易
    </el-card>
    <el-card v-else>
      您还没有购买过球冠币，来一发呗。
    </el-card>

  </div>
</template>
<script >
export default {
  data () {
    return {
      QiuGuanBi: 0
    };
  },
  async created () {
    var temp = sessionStorage.getItem("user_g")
    let user_g = JSON.parse(temp);
    this.QiuGuanBi = user_g.data.QiuGuanBi
  },
  methods: {
  }
}
</script>
<style lang = 'less' scoped >
</style>