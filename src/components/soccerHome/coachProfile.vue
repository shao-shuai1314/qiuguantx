<template>
  <div class="gWidth present_s_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/soccer' }">足球中心</el-breadcrumb-item>
      <el-breadcrumb-item>联赛教练简表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 左边 -->
    <navigation :datas=[...datas]></navigation>

    <el-card style="width:942px;"
             class="fr">

      <el-table :data="coachList"
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
              {{datas[0]}}教练简表
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
                           prop="coachName"
                           label="教练"
                           width="">
            <template slot-scope="scope">
              <router-link target="_blank"
                           :to="{name:'playerDetails',params:{playerID:scope.row.coachId}}">{{scope.row.coachName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop="coachCountry"
                           label="国籍"
                           sortable
                           width="">
          </el-table-column>
          <el-table-column align="center"
                           prop="teamName"
                           label="执教球队"
                           width="">
          </el-table-column>
          <el-table-column align="center"
                           prop="coachBirthday"
                           label="生日"
                           sortable
                           width="130">
          </el-table-column>
          <el-table-column align="center"
                           prop="age"
                           sortable
                           label="年龄"
                           width="80">
            <!-- <template slot-scope="scope">
              <div>
                {{myDate.getFullYear()-scope.row.found_date.slice(0,4)}}
              </div>
            </template> -->
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
      coachList: [],
      myDate: new Date()
    };
  },
  created () {
    var temp = sessionStorage.getItem("seasonList")
    let seasonList = JSON.parse(temp);
    this.datas = [sessionStorage.getItem('sclassName'), sessionStorage.getItem('sclass_rule'), sessionStorage.getItem('matchSeason'), seasonList, sessionStorage.getItem('sclass_pic')]
    // console.log(this.$route)
    this.coachList_s()
  },
  methods: {

    async coachList_s () {
      let obj = {}
      if (sessionStorage.getItem('subsClassID')) {
        obj.subsClassID = sessionStorage.getItem('subsClassID')
      }
      obj.matchSeason = sessionStorage.getItem('matchSeason')
      const res = await this.$http.get(`/soccer/sclass/${this.$route.params.sclassID}/coachList/`, { params: obj })
      let coachCountry = {}
      res.data.data_list.forEach(item => {
        coachCountry[item.coachCountry] = `rgba(${Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256)},0.4)`
        if (item.coachBirthday) {
          var csrq = item.coachBirthday;
          var age = '';
          var d = new Date();
          var year = d.getFullYear();
          var month = d.getMonth() + 1;
          var day = d.getDate();
          if (month < 10) {
            month = '0' + month;
          }
          if (day < 10) {
            day = '0' + day;
          }
          var now = year + '-' + month + '-' + day;
          if (now.substring(0, 4) >= csrq.substring(0, 4) && now.substring(5, 7) >= csrq.substring(5, 7)
            && now.substring(8, 10) >= csrq.substring(8, 10)) {
            age = year - parseInt(csrq.substring(0, 4));
          } else {
            age = year - parseInt(csrq.substring(0, 4)) - 1;
          }
          item.age = age
        }

        //alert(age);
      })


      this.coachList = res.data.data_list
      console.log(res.data)
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