<template>
  <div class="gWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/soccer' }">足球中心</el-breadcrumb-item>
      <el-breadcrumb-item>球员最新伤停</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左边 -->
    <navigation :datas=[...datas]></navigation>

    <el-card style="width:942px;"
             class="fr">
      <el-table :data="tableData"
                border
                size="mini"
                style="width: 100%">
        <el-table-column prop="date"
                         label="英超 19/20最新伤停">
          <el-table-column prop="name"
                           label="球员"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="address"
                           label="球队"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="address"
                           label="出场(首发)"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="address"
                           label="是否缺阵"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="address"
                           label="伤停原因"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="address"
                           label="预计复出"
                           align="center"
                           width="">
          </el-table-column>
        </el-table-column>

      </el-table>
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
      tableData: []
    };
  },
  created () {
    this.datas = [sessionStorage.getItem('sclassName'), sessionStorage.getItem('sclass_rule'), sessionStorage.getItem('matchSeason')]


  },
  methods: {
    async linuepStatistics () {

      // const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.sclassID}/linuepStatistics/` );
      console.log(res.data)

    }
  }
}
</script>
<style lang = 'less' scoped >
</style>