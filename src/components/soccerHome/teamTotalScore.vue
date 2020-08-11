<template>
  <div class="gWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/soccer' }">足球中心</el-breadcrumb-item>
      <el-breadcrumb-item>大小球统计</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左边 -->
    <navigation :datas=[...datas]></navigation>

    <el-card style="width:942px;"
             class="fr">

      <el-tabs type="border-card"
               v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="总盘盘路"
                     name="all"></el-tab-pane>
        <el-tab-pane label="主场盘路"
                     name="home"></el-tab-pane>
        <el-tab-pane label="客场盘路"
                     name="guest"></el-tab-pane>
      </el-tabs>

      <el-table :data="tableData"
                border
                header-row-class-name="tableHead"
                size="mini"
                :header-cell-style="{'background':'#f5f7fa'}"
                style="width: 100%;margin-top:-30px">

        <el-table-column align="center"
                         label="排名"
                         width="60">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column prop="teamName"
                         align="center"
                         label="球队名称"
                         width="">
          <template slot-scope="scope">
            <router-link target="_blank"
                         :to="{name:'information',params:{teamID:scope.row.teamID}}">{{scope.row.teamName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column prop="count"
                         align="center"
                         label="赛"
                         width="60">
        </el-table-column>
        <el-table-column prop="big"
                         align="center"
                         label="大球"
                         width="60">
        </el-table-column>
        <el-table-column prop="flat"
                         align="center"
                         label="走"
                         width="60">
        </el-table-column>
        <el-table-column prop="small"
                         align="center"
                         label="小球"
                         width="60">
        </el-table-column>
        <el-table-column prop="win"
                         align="center"
                         label="大球(%)"
                         width="60">
          <template slot-scope="scope">
            {{(scope.row.big/scope.row.count*100).toFixed(2)}}%
          </template>
        </el-table-column>
        <el-table-column prop="flat"
                         align="center"
                         label="走(%)"
                         width="60">
          <template slot-scope="scope">
            {{(scope.row.flat/scope.row.count*100).toFixed(2)}}%
          </template>
        </el-table-column>
        <el-table-column prop="fail"
                         align="center"
                         label="小球(%)"
                         width="60">
          <template slot-scope="scope">
            {{(scope.row.small/scope.row.count*100).toFixed(2)}}%
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="详情"
                         width="60">
          <template slot-scope="scope">
            <router-link target="_blank"
                         :to="{name:'teamTotalScoreSubpage', query: {teamID:scope.row.teamID,sclassID,matchSeason}}">详情</router-link>
          </template>
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
      activeName: 'all',
      tableDatas: [],
      tableData: [],
      sclassID: "",
      matchSeason: ''
    };
  },
  created () {
    this.datas = [sessionStorage.getItem('sclassName'), sessionStorage.getItem('sclass_rule'), sessionStorage.getItem('matchSeason')]
    this.sclassID = this.$route.params.sclassID
    this.matchSeason = sessionStorage.getItem('matchSeason')
    this.tableDataList('all');
  },
  methods: {
    handleClick (tab, event) {
      this.tableDataList(tab.name);
      // let src = JSON.parse(JSON.stringify(this.tableData))
      // this.tableData = src
    },
    async tableDataList (sty) {
      if (!this.tableData.length) {
        if (sessionStorage.getItem('subsClassID')) {
          const res = await this.$http.get(`soccer/sclass/${this.$route.params.sclassID}/teamTotalScore/`, { params: { matchSeason: sessionStorage.getItem('matchSeason'), subsClassID: sessionStorage.getItem('subsClassID') } });
          if (res.status !== 200) return console.log('大小球获取失败');
          this.tableDatas = res.data
        } else {
          const res = await this.$http.get(`soccer/sclass/${this.$route.params.sclassID}/teamTotalScore/`, { params: { matchSeason: sessionStorage.getItem('matchSeason') } });
          if (res.status !== 200) return console.log('大小球获取失败');
          this.tableDatas = res.data
        }
      }
      this.tableData = this.tableDatas[sty]
      // console.log(this.tableData)
    }


  }
}
</script>
<style lang = 'less' scoped >
a {
  display: block;
  width: 100%;
  height: 100%;
  &:hover {
    color: #409eff;
  }
}
.tableHead {
  font-weight: 600;
  color: #303133;
  font-size: 14px;
  height: 50px;
}
</style>