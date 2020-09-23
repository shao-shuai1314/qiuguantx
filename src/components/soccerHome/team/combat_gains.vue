<template>
  <div class="gWidth combat_gains_boxss">
    <el-table :data="combat_gains"
              size="mini"
              border
              :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px',
}"
              :row-class-name="tabRowClassName"
              style="width: 1160px">
      <el-table-column prop="matchSeason"
                       align="center"
                       width="200"
                       label="赛季">
        <template slot-scope="scope">
          <span class="span"
                @click="getmatchSeason(scope.row.matchSeason,scope.row.sclassID)">
            {{scope.row.matchSeason}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sclassName"
                       align="center"
                       width="120"
                       label="赛事">
      </el-table-column>
      <el-table-column prop="rank"
                       align="center"
                       width="99"
                       label="名次">
        <template slot-scope="scope">
          <span v-if="scope.row.rank == 1"
                style="color:red">
            <b>冠军</b>
          </span>
          <span v-else
                style="color: rgba(15, 39, 119);">
            <b>{{scope.row.rank}}</b>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="totalGutstScore"
                       align="center"
                       width="100"
                       label="场次">
        <template slot-scope="scope">
          <span>{{scope.row.win_score+scope.row.flat_score+scope.row.fail_score}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="win_score"
                       align="center"
                       width="80"
                       label="胜">
      </el-table-column>
      <el-table-column prop="flat_score"
                       align="center"
                       width="80"
                       label="平">
      </el-table-column>
      <el-table-column prop="fail_score"
                       align="center"
                       width="100"
                       label="负">
      </el-table-column>
      <el-table-column prop="totalHomeScore"
                       align="center"
                       width="100"
                       label="得">
      </el-table-column>
      <el-table-column prop="totalGutstScore"
                       align="center"
                       width="100"
                       label="失">
      </el-table-column>
      <el-table-column prop="totalGutstScore"
                       align="center"
                       width="100"
                       label="净胜球">
        <template slot-scope="scope">
          <span>{{scope.row.totalHomeScore-scope.row.totalGutstScore}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="80"
                       label="积分">
        <template slot-scope="scope">
          <span style="color: rgba(15, 39, 119);">
            <b>{{scope.row.win_score*3+scope.row.flat_score}}</b>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script >
export default {
  data () {
    return {
      combat_gains: []
    };
  },
  created () {
    this.historyRecord()
  },
  methods: {
    async historyRecord () {
      const res = await this.$http.get(`/teamInfo/${this.$route.params.teamID}/historyRecord/`)
      this.combat_gains = res.data.data_list
      // console.log(res.data.data_list)
    },
    tabRowClassName ({ row, rowIndex }) {
      let index = rowIndex + 1;
      if (index % 2 == 0) {
        return 'warning-row'
      }
    },
    getmatchSeason (matchSeason, id) {
      // console.log(matchSeason)
      sessionStorage.setItem("matchSeason", matchSeason);

      let routeData = this.$router.resolve({ name: 'league', params: { sclassID: id } });
      window.open(routeData.href, '_blank');

      // this.$router.push({
      //   name: 'league',
      //   params: {
      //     sclassID: id
      //   }
      // })
    }
  }
}
</script>
<style lang = 'less' >
.combat_gains_boxss .el-table .warning-row {
  background: rgba(160, 189, 226, 0.2) !important;
}
.combat_gains_boxss .span {
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;
  &:hover {
    color: #409eff;
  }
}
.combat_gains_boxss .el-table--mini td,
.combat_gains_boxss .el-table--mini th {
  padding: 0 !important;
}
.combat_gains_boxss .el-table .cell {
  height: 100%;
  line-height: 36px !important;
}
.combat_gains_boxss .cell span {
  display: block;
}
.combat_gains_boxss .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(160, 189, 226, 0.5);
}
</style>