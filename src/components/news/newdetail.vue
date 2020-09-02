<template>
  <div class="gWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/news' }">新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="gWidth box_new">
      <h2>{{li.title}}</h2>
      <h6> &nbsp; {{li.publicTime}} {{li.reprinted}} </h6>
      <el-divider></el-divider>
      <div class="box_new_p">
        <p v-html="li.content"></p>
      </div>

    </el-card>
  </div>

</template>
<script >
export default {
  data () {
    return {
      li: []
    };
  },
  created () {
    this.list()

  },
  methods: {
    async list () {
      const { data: res } = await this.$http.get(`/showJournalism/${this.$route.params.recordId}/`);
      res.content = res.content.slice(res.content.indexOf('</h1>') + 5)
      this.li = res
      console.log(res.content)

    },

  }
}
</script>
<style lang = 'less' scoped >
.box_new {
  background: #fff;
  h2 {
    width: 100%;
    text-align: center;
    line-height: 50px;
  }
  h6 {
    text-align: center;
    font-size: 16px;
  }
  .box_new_p {
    width: 1000px;
    margin-left: 80px;
  }
}
</style>
<style>
.box_new p {
  text-indent: 2em;
  line-height: 26px;
  /* width: 98%; */
}
.box_new img {
  width: 700px !important;
  transform: translateX(100px) !important;
  margin: 20px 0 !important;
}
</style>　