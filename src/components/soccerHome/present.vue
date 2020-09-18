<template>
  <div class="gWidth present_s_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/soccer' }">足球中心</el-breadcrumb-item>
      <el-breadcrumb-item>联赛详细介绍</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左边 -->
    <navigation :datas=[...datas]></navigation>

    <el-card style="width:942px;"
             class="fr">

      <el-table :data="teamList"
                :row-class-name="tabRowClassName"
                border
                :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px',
}"
                size="mini">
        <el-table-column prop="matchSeason"
                         align="center">
          <template slot="header"
                    slot-scope="scope">
            <span style="color:rgb(248, 51, 71);font-size: 18px;">
              {{datas[0]}}俱乐部简介
            </span>
          </template>
          <el-table-column align="center"
                           prop="count"
                           label="序号"
                           width="40">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop="name_j"
                           label="球队队标"
                           width="60">
            <template slot-scope="scope">
              <div class="present_s_img">
                <el-image :src="`http://qiuguantx.com/img/team/${scope.row.flag}`"></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop="name_j"
                           label="球队"
                           width="">
            <template slot-scope="scope">
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:scope.row.teamID}}">{{scope.row.name_j}}</router-link>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop="area"
                           label="所在城市"
                           width="">
          </el-table-column>
          <el-table-column align="center"
                           prop="found_date"
                           label="创建日期"
                           sortable
                           width="82">
          </el-table-column>
          <el-table-column align="center"
                           prop="found_date"
                           label="成立至今(年)"
                           width="85">
            <template slot-scope="scope">
              <div>
                {{myDate.getFullYear()-scope.row.found_date.slice(0,4)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop="teamValues"
                           label="俱乐部身价(万欧)"
                           sortable
                           width="134">
          </el-table-column>
          <el-table-column align="center"
                           prop="venuesName"
                           label="球场"
                           width="">
          </el-table-column>
          <el-table-column align="center"
                           prop="venuesCapacity"
                           label="容纳人数"
                           width="60">
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
      teamList: [],
      myDate: new Date()
    };
  },
  created () {
    var temp = sessionStorage.getItem("seasonList")
    let seasonList = JSON.parse(temp);
    this.datas = [sessionStorage.getItem('sclassName'), sessionStorage.getItem('sclass_rule'), sessionStorage.getItem('matchSeason'), seasonList, sessionStorage.getItem('sclass_pic')]
    // console.log(this.$route)
    this.teamList_s()
  },
  methods: {

    async teamList_s () {
      let obj = {}
      if (sessionStorage.getItem('subsClassID')) {
        obj.subsClassID = sessionStorage.getItem('subsClassID')
      }
      obj.matchSeason = sessionStorage.getItem('matchSeason')
      const res = await this.$http.get(`/soccer/sclass/${this.$route.params.sclassID}/teamList/`, { params: obj })
      this.teamList = res.data.teamList
      // console.log(res.data)
    },
    tabRowClassName ({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 0) {
        return 'warning-row'
      }
    },

  }
}
</script>
<style lang = 'less' >
.present_s_box .el-table .warning-row {
  background: rgba(160, 189, 226, 0.2) !important;
}
.present_s_box a {
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;
  &:hover {
    color: #409eff;
  }
}
.present_s_box .el-table--mini td,
.present_s_box .el-table--mini th {
  padding: 0 !important;
}
.present_s_box .el-table .cell {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 36px !important;
}
.present_s_box .cell span {
  display: flex;
  align-items: center;
  display: block;
}
.present_s_box .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(160, 189, 226, 0.5);
}

.present_s_img {
  .el-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>