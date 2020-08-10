<template>
  <div class="gWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/soccer' }">足球中心</el-breadcrumb-item>
      <el-breadcrumb-item>球员信息统计</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左边 -->
    <navigation :datas=[...datas]></navigation>

    <el-card style="width:942px;"
             class="fr">

      <el-tabs type="border-card"
               v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="射手榜"
                     name="Ss"></el-tab-pane>
        <el-tab-pane label="助攻榜"
                     name="Zg"></el-tab-pane>
        <el-tab-pane label="红黄牌"
                     name="Hh"></el-tab-pane>
        <el-tab-pane label="出场时间"
                     name="Cc"></el-tab-pane>
      </el-tabs>

      <el-table :data="tableData"
                border
                size="mini"
                :header-cell-style="{'background':'#f5f7fa'}"
                style="width: 100%;margin-top:-30px">

        <el-table-column prop="name"
                         align="center"
                         label="球员"
                         width="">
        </el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="球队"
                         width="">
        </el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="出场(首发)"
                         width="">
        </el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="是否缺阵"
                         width="">
        </el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="伤停原因"
                         width="">
        </el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="预计复出"
                         width="">
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
      activeName: 'Ss',
      tableData: []
    };
  },
  created () {
    this.datas = [sessionStorage.getItem('sclassName'), sessionStorage.getItem('sclass_rule'), sessionStorage.getItem('matchSeason')]


  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }

  }
}
</script>
<style lang = 'less' scoped >
</style>