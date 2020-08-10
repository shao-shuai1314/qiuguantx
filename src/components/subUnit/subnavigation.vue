<template>
  <!-- 子导航 -->
  <div class="subnavigation_box">
    <ul class="subnavigation_xbox gWidth">
      <li>热门赛事&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:36}}">英超</router-link>

        <el-divider direction="vertical"></el-divider>
      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:31}}">西甲</router-link>
        <el-divider direction="vertical"></el-divider>
      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:34}}">意甲</router-link>
        <el-divider direction="vertical"></el-divider>
      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:8}}">德甲</router-link>
        <el-divider direction="vertical"></el-divider>
      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:11}}">法甲</router-link>
        <el-divider direction="vertical"></el-divider>

      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:60}}">中超</router-link>
        <el-divider direction="vertical"></el-divider>

      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:192}}">亚冠杯</router-link>
        <el-divider direction="vertical"></el-divider>

      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:103}}">欧冠杯</router-link>
        <el-divider direction="vertical"></el-divider>

      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:113}}">欧罗巴杯</router-link>
      </li>

    </ul>
  </div>

</template>
<script >
export default {
  data () {
    return {
    };
  },
  methods: {
  }
}
</script>
<style lang = 'less' scoped >
.subnavigation_box {
  height: 30px;
  width: 100%;
  background: #3680d8;
  margin: 10px 0 10px 0;
  .subnavigation_xbox {
    height: 30px;
    display: flex;
    align-items: center;
    li {
      margin-right: 10px;
      font-size: 16px;
      color: #fff;
      line-height: 30px;
      a {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>