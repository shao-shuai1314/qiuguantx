<template>
  <div class="place_box">
    <h3>点击图片查看大图</h3>
    <div class="place_box1">
      <el-image style="margin-right:10px"
                :src="`http://qiuguantx.com/img/qiuchang/${$route.params.teamID}_city.png`"
                :preview-src-list="srcList"></el-image>
      <el-image :src="`http://qiuguantx.com/img/qiuchang/${$route.params.teamID}.png`"
                :preview-src-list="srcList"></el-image>
    </div>
  </div>
</template>
<script >
export default {
  data () {
    return {
      srcList: [
        `http://qiuguantx.com/img/qiuchang/${this.$route.params.teamID}_city.png`,
        `http://qiuguantx.com/img/qiuchang/${this.$route.params.teamID}.png`
      ]
    };
  },
  created () {
    console.log(this.$route.params.teamID)
  },
  methods: {

  }
}
</script>

<style lang = 'less' scoped >
.place_box {
  .place_box1 {
    display: flex;
    justify-content: center;
    .el-image {
      margin-top: 10px;
    }
  }
}
</style>