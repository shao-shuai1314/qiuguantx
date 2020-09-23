<template>
  <div class="gWidth schedule_boxss">
    <el-table :data="dataList"
              border
              size="mini"
              :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px',
    'height':'36px',
    'line-height': '36px'
}"
              :row-class-name="tabRowClassName"
              style="width: 1160px">
      <el-table-column prop="sclassName"
                       align="center"
                       label="赛事">
        <template slot-scope="scope">
          <div>
            {{scope.row.sclassName}}
            <span style="padding: 0px 2px; font-size: 10px; color: rgb(170, 167, 167); display: inline-block;">
              {{scope.row.round}}
            </span>
          </div>

        </template>
      </el-table-column>
      <el-table-column prop="matchtime"
                       align="center"
                       width="180"
                       label="时间">
        <template slot-scope="scope">
          <div :style="`background-color:${color_s[scope.row.matchSeason]}`">
            <p>
              <b>{{scope.row.matchSeason}}</b>
            </p>
            {{scope.row.matchtime.replace('T','&nbsp;&nbsp;&nbsp;&nbsp;')}}
          </div>

        </template>
      </el-table-column>
      <el-table-column prop="homeTeamName"
                       align="center"
                       label="主场">
        <template slot-scope="scope">
          <router-link target="_blank"
                       :style="[{'color':(scope.row.hometeamID == teamID ? scope.row.color_sty:'')},{'font-weight':scope.row.hometeamID == teamID && scope.row.matchState == -1 ? '900':''}]"
                       :to="{name:'information',params:{teamID:scope.row.hometeamID}}">
            {{scope.row.homeTeamName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="homeScore"
                       align="center"
                       label="比分">
        <template slot-scope="scope">
          <span v-if="scope.row.matchState == -1">{{scope.row.homeScore}}-{{scope.row.guestScore}}</span>
          <span v-else>vs</span>
        </template>
      </el-table-column>
      <el-table-column prop="guestTeamName"
                       align="center"
                       label="客场">
        <template slot-scope="scope">
          <router-link target="_blank"
                       :style="[{'color':(scope.row.guestteamID == teamID ? scope.row.color_sty:'')},{'font-weight':scope.row.guestteamID == teamID && scope.row.matchState == -1  ? '900':''}]"
                       :to="{name:'information',params:{teamID:scope.row.guestteamID}}">
            {{scope.row.guestTeamName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="date"
                       align="center"
                       label="半场">
        <template slot-scope="scope">
          <span v-if="scope.row.matchState == -1">{{scope.row.homeHalfScore}}-{{scope.row.guestHalfScore}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="让球">
        <template slot-scope="scope">
          <span v-if="scope.row.matchState == -1">
            <span style="color:rgb(255, 0, 0);font-weight: 900;"
                  v-if="letgoal[scope.row.scheduleID] == 1">赢</span>
            <span style="font-weight: 900;"
                  v-else-if="letgoal[scope.row.scheduleID] == 2">走</span>
            <span style="color:rgb(51, 102, 255);font-weight: 900;"
                  v-else>输</span>
          </span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="date"
                       align="center"
                       label="大小">
        <template slot-scope="scope">
          <span v-if="scope.row.matchState == -1">
            <span style="color:rgb(255, 0, 0);font-weight: 900;"
                  v-if="totalScore[scope.row.scheduleID] < (scope.row.homeScore+scope.row.guestScore)">大</span>
            <span style="font-weight: 900;"
                  v-else-if="totalScore[scope.row.scheduleID] == (scope.row.homeScore+scope.row.guestScore)">走</span>
            <span style="color:rgb(51, 102, 255);font-weight: 900;"
                  v-else>小</span>
          </span>
          <span v-else>-</span>
        </template>

      </el-table-column>
      <el-table-column align="center"
                       label="胜负">
        <template slot-scope="scope">
          <span v-if="scope.row.matchState == -1">
            <span v-if="scope.row.homeScore > scope.row.guestScore"
                  style="color:rgb(255, 0, 0);font-weight: 900;">赢</span>
            <span v-else-if="scope.row.homeScore == scope.row.guestScore"
                  style="font-weight: 900;">平</span>
            <span v-else
                  style="color:rgb(51, 102, 255);font-weight: 900;">输</span>
          </span>
          <span v-else>-</span>
        </template>

      </el-table-column>
      <el-table-column prop="date"
                       align="center"
                       label="资料">
        <template slot-scope="scope">
          <router-link target="_blank"
                       :to="{name:'history',params:{scheduleID:scope.row.scheduleID}}">
            <b>分 析</b>
          </router-link>
          <!-- <router-link target="_blank"
                       :to="{name:'odds',params:{scheduleID:scope.row.scheduleID}}">
            欧
          </router-link> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <div v-if="dataList.length"
         class="block_f">
      <el-pagination @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-size="25"
                     layout="prev, pager, next, jumper"
                     :total="pageMax*25">
      </el-pagination>
    </div>
  </div>

</template>
<script >
export default {
  name: 'HelloWorld',
  data () {
    return {
      dataList: [],
      letgoal: [],
      teamSchedule: [],
      currentPage: 1,
      page_number: 0,
      pageMax: 0,
      teamID: '',
      color_s: {}

    };
  },
  created () {
    this.scheduleID = this.$route.params.teamID
    this.OnListG(this.currentPage)
  },
  methods: {
    async OnListG (page) {
      const res = await this.$http.get('teamInfo/' + this.scheduleID + '/schedule/', { params: { page } });
      // console.log(res.data.dataObj.teamSchedule)
      // console.log(this.$route.params.teamID)
      this.teamID = this.$route.params.teamID
      // var color_s = ['rgba(190,76,89,0.5)', 'rgba(100,76,89,0.5)', 'rgba(180,16,89,0.5)', 'rgba(110,106,89,0.5)', 'rgba(170,76,29,0.5)', 'rgba(190,76,89,0.5)', 'rgba(100,76,89,0.5)', 'rgba(180,16,89,0.5)']
      let color_list = {}
      res.data.dataObj.teamSchedule.forEach((item, i) => {
        color_list[item.matchSeason] = `rgba(${Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256)},0.4)`

        // console.log(item.matchState == -1)
        if (item.matchState == -1) {
          if (item.guestteamID == this.$route.params.teamID) {
            if (item.guestScore > item.homeScore) {
              item.color_sty = '#ff0000'
            } else if (item.guestScore < item.homeScore) {
              item.color_sty = '#36F'
            } else {
              item.color_sty = '#444'
            }
          } else {
            if (item.guestScore > item.homeScore) {
              item.color_sty = '#36F'
            } else if (item.guestScore < item.homeScore) {
              item.color_sty = '#ff0000'
            } else {
              item.color_sty = '#444'
            }
          }
        }

      })
      this.color_s = color_list
      this.dataList = res.data.dataObj.teamSchedule
      this.pageMax = res.data.pageMax
      this.letgoal = res.data.dataObj.letgoal
      this.totalScore = res.data.dataObj.totalScore
      // this.currentPage = res.data.page_number
      // console.log(res.data.dataObj)

    },
    tabRowClassName ({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 0) {
        return 'warning-row'
      }
    },

    // 分页
    handleCurrentChange (val) {
      this.OnListG(val)
    }
  }
}
</script>

<style lang = 'less'  >
.schedule_boxss .el-table .warning-row {
  background: rgba(160, 189, 226, 0.1) !important;
}
.schedule_boxss .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(160, 189, 226, 0.5);
}
.schedule_boxss a {
  display: block;
  width: 100%;
  height: 100%;
  &:hover {
    color: #409eff;
  }
}
.schedule_boxss .el-table--mini td,
.el-table--mini th {
  padding: 0 !important;
}
.schedule_boxss .el-table .el-table__row .cell {
  height: 100%;
  line-height: 18px !important;
}
.schedule_boxss .cell span {
  display: block;
}
</style>