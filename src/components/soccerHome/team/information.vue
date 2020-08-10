<template>
  <div class="gWidth">
    <el-card v-html="dataList"
             class="information_box"></el-card>
  </div>
</template>
<script >
export default {
  name: 'HelloWorld',
  data () {
    return {
      dataList: ''
    };
  },
  created () {
    this.scheduleID = this.$route.params.teamID
    this.OnListG(this.currentPage)
  },
  methods: {
    async OnListG (page) {
      const res = await this.$http.get('teamInfo/' + this.scheduleID + '/introduce/');
      if (res.status !== 200) return console.log('球队简介信息取失败');
      this.dataList = res.data.introduce
      console.log(this.dataList)


    },
  }
}
</script>
<style lang = 'less' scoped >
.information_box {
  padding: 20px;
  margin-top: 10px;
  width: 1100px;
  p {
    font-size: 16px !important;
  }
}
</style>