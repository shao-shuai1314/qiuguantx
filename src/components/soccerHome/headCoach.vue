<template>
  <div class="gWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/soccer' }">足球中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{name:'league',params:{sclassID}}">{{this.matchSeason}}{{this.datas[0]}}</el-breadcrumb-item>
      <el-breadcrumb-item>教练履历</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左边 -->
    <navigation :datas=[...datas]></navigation>

    <el-card style="width:942px;"
             class="fr">
      <el-image v-if='subsClassID'
                :src="`http://qiuguantx.com/img/sclassCoach/${sclassID}_${subsClassID}_${matchSeason}.jpg`"></el-image>
      <el-image v-else
                :src="`http://qiuguantx.com/img/sclassCoach/${sclassID}_${matchSeason}.jpg`"></el-image>
    </el-card>

  </div>
</template>
<script >
import navigation from './SideNavigation';
export default {
  components: {
    navigation
  },
  data () {
    return {
      datas: [],
      sclassID: sessionStorage.getItem('sclassID'),
      matchSeason: sessionStorage.getItem('matchSeason'),
      subsClassID: sessionStorage.getItem('subsClassID')
    };
  },
  created () {
    var temp = sessionStorage.getItem("seasonList")
    let seasonList = JSON.parse(temp);
    this.datas = [sessionStorage.getItem('sclassName'), sessionStorage.getItem('sclass_rule'), sessionStorage.getItem('matchSeason'), seasonList, sessionStorage.getItem('sclass_pic')]
    document.title = `${this.matchSeason} - ${this.datas[0]} -  赛季主教练`

  },
  methods: {
  }
}
</script>
<style lang = 'less' scoped >
.gWidth_s {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>