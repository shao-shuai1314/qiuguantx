<template>
  <el-card class="gWidth box_new">
   <h2>{{li.title}}</h2>
   <h6> &nbsp;  {{li.publicTime}}   {{li.reprinted}}    ({{li.userName}})</h6>
   <el-divider></el-divider>

   <p v-html="li.content"></p>
  </el-card>
</template>
<script >
export default {
  data () {
    return {
     li:[]
    };
  },
  created () {
   this.list()
    
  },
  methods: {
    async list(){
      const { data: res } = await this.$http.get(`/showJournalism/${this.$route.params.recordId}/`);
     res.content  = res.content.slice(res.content.indexOf('</h1>')+5)
      this.li = res
      console.log(res.content.slice(res.content.indexOf('</h1>')+5))
    }
   
  }
}
</script>
<style lang = 'less' scoped >
.box_new{
  background: #fff;
  h2{
    width: 100%;
    text-align: center;
    line-height: 50px;
  }
  h6{
    text-align: center;
    font-size: 16px
  }
  p{
    text-indent:2em;
    line-height: 26px;
  }
  img{
    width: 80%;
    margin-left: 20px
  }
}
</style>