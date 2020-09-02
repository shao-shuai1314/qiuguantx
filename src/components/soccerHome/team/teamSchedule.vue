<template>
  <div class="gWidth">
    <el-table :data="dataList"
              border
               size="mini"
              :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px',
    'height':'50px'
}"
              style="width: 1160px">
      <el-table-column prop="sclassName"
                       align="center"
                       label="赛事">
      </el-table-column>
      <el-table-column prop="matchtime"
                       align="center"
                       width="180"
                       label="时间">
        <template slot-scope="scope">
          {{scope.row.matchtime.replace('T','&nbsp;&nbsp;&nbsp;&nbsp;')}}
        </template>
      </el-table-column>
      <el-table-column prop="homeTeamName"
                       align="center"
                       label="主场">
        <template slot-scope="scope">
          <router-link target="_blank"
                       :to="{name:'information',params:{teamID:scope.row.hometeamID}}">
            {{scope.row.homeTeamName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="homeScore"
                       align="center"
                       label="比分">
        <template slot-scope="scope">
          <span v-if="scope.row.matchState">{{scope.row.homeScore}}-{{scope.row.guestScore}}</span>
          <span v-else>vs</span>
        </template>
      </el-table-column>
      <el-table-column prop="guestTeamName"
                       align="center"
                       label="客场">
        <template slot-scope="scope">
          <router-link target="_blank"
                       :to="{name:'information',params:{teamID:scope.row.guestteamID}}">
            {{scope.row.guestTeamName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="date"
                       align="center"
                       label="半场">
        <template slot-scope="scope">
          <span v-if="scope.row.matchState">{{scope.row.homeHalfScore}}-{{scope.row.guestHalfScore}}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="让球">
        <template slot-scope="scope">
          <span v-if="scope.row.matchState">
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
          <span v-if="scope.row.matchState">
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
          <span v-if="scope.row.matchState">
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
            析
          </router-link>
          <router-link target="_blank"
                       :to="{name:'odds',params:{scheduleID:scope.row.scheduleID}}">
            欧
          </router-link>
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
      pageMax: 0
    };
  },
  created () {
    this.scheduleID = this.$route.params.teamID
    this.OnListG(this.currentPage)
  },
  methods: {
    async OnListG (page) {
      const res = await this.$http.get('teamInfo/' + this.scheduleID + '/schedule/', { params: { page } });
      if (res.status !== 200) return console.log('对阵头部信息取失败');
      // console.log(res.data)
      this.dataList = res.data.dataObj.teamSchedule
      this.pageMax = res.data.pageMax
      this.letgoal = res.data.dataObj.letgoal
      this.totalScore = res.data.dataObj.totalScore

      // this.currentPage = res.data.page_number
      // console.log(res.data.dataObj)

    },

    // 分页
    handleCurrentChange (val) {
      this.OnListG(val)
    }
  }
}
</script>
<style lang = 'less' scoped >
a {
  &:hover {
    color: #409eff;
  }
}
.block_f {
  text-align: center;
}
</style>