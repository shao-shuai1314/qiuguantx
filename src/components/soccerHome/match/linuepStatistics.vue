<template>
  <div class="gWidth">
    <div class="linuep_box"
         style="width: 1160px;display:flex;justify-content: space-between;">
      <div>
        <el-table :data="linuepStatisticsList.home"
                  size="mini"
                  style="width: 570px">
          <el-table-column prop="date"
                           width="100%"
                           label="主场球员统计">
            <template slot="header">
              <div class="linue-header">
                <b>主场球员统计</b>
              </div>
            </template>

            <el-table-column prop="number"
                             label="球衣号码"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="place"
                             label="位置"
                             width="50px"
                             align="center">
              <template slot-scope="scope">
                <span style="width:100%;height:100%;display:block;"
                      :style="{'background':scope.row.colors}">{{scope.row.place}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="player_name"
                             label="出场"
                             width="70px"
                             align="center">
              <template slot-scope="scope">
                <router-link style="width:100%;height:100%;display:block;"
                             target="_blank"
                             :to="{name:'playerDetails',params:{playerID:scope.row.playerID}}">{{scope.row.player_name}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="country"
                             label="国籍"
                             width="70px"
                             align="center">
            </el-table-column>
            <el-table-column label="首替"
                             width="60px"
                             align="center">
              <template slot-scope="scope">
                <span>{{scope.row.first_count+scope.row.backup_count}}({{scope.row.first_count}}/{{scope.row.backup_count}})</span>

              </template>
            </el-table-column>
            <el-table-column prop="notPenaltyGoals"
                             label="进球"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="assist"
                             label="助攻"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="red"
                             label="红牌"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="yellow"
                             label="黄牌"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="penaltyGoals"
                             label="点球"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="expectedValue"
                             label="身价"
                             width="40px"
                             align="center">
            </el-table-column>
            <el-table-column prop="fromteamName"
                             label="上家俱乐部"
                             width="100px"
                             align="center">
              <template slot-scope="scope">
                <router-link style="width:100%;height:100%;display:block;"
                             v-if="scope.row.fromteamId"
                             target="_blank"
                             :to="{name:'information',params:{teamID:scope.row.fromteamId}}">{{scope.row.fromteamName}}</router-link>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-table :data="linuepStatisticsList.guest"
                  size="mini"
                  style="width: 570px">
          <el-table-column prop="date"
                           width="100%"
                           label="客场球员统计">
            <template slot="header">
              <div class="linue-header">
                <b>客场球员统计</b>
              </div>
            </template>
            <el-table-column prop="number"
                             label="球衣号码"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="place"
                             label="位置"
                             width="50px"
                             align="center">
              <template slot-scope="scope">
                <span style="width:100%;height:100%;display:block;"
                      :style="{'background':scope.row.colors}">{{scope.row.place}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="player_name"
                             label="出场"
                             width="70px"
                             align="center">
              <template slot-scope="scope">
                <router-link style="width:100%;height:100%;display:block;"
                             target="_blank"
                             :to="{name:'playerDetails',params:{playerID:scope.row.playerID}}">{{scope.row.player_name}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="country"
                             label="国籍"
                             width="70px"
                             align="center">
            </el-table-column>
            <el-table-column label="首替"
                             width="60px"
                             align="center">
              <template slot-scope="scope">
                <span>{{scope.row.first_count+scope.row.backup_count}}({{scope.row.first_count}}/{{scope.row.backup_count}})</span>

              </template>
            </el-table-column>
            <el-table-column prop="notPenaltyGoals"
                             label="进球"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="assist"
                             label="助攻"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="red"
                             label="红牌"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="yellow"
                             label="黄牌"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="penaltyGoals"
                             label="点球"
                             width="30px"
                             align="center">
            </el-table-column>
            <el-table-column prop="expectedValue"
                             label="身价"
                             width="40px"
                             align="center">
            </el-table-column>
            <el-table-column prop="fromteamName"
                             label="上家俱乐部"
                             width="100px"
                             align="center">
              <template slot-scope="scope">
                <router-link style="width:100%;height:100%;display:block;"
                             target="_blank"
                             v-if="scope.row.fromteamId"
                             :to="{name:'information',params:{teamID:scope.row.fromteamId}}">{{scope.row.fromteamName}}</router-link>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <div style="width: 1160px;display:flex;justify-content: space-between;">
      <div style="width:570px">
        <el-table :data="playerSuspend.home"
                  border
                  size="mini"
                  style="width: 100%">
          <el-table-column prop="date"
                           width="100%"
                           label="伤停">
            <template slot="header">
              <div class="linue-header">
                <b>主队伤停统计</b>
              </div>
            </template>
            <el-table-column prop="player_name"
                             label="球员"
                             width="285px"
                             align="center">
              <template slot-scope="scope">
                <router-link style="width:100%;height:100%;display:block;"
                             target="_blank"
                             :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">{{scope.row.player_name}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="injury"
                             label="伤停原因"
                             width="285px"
                             align="center">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>

      <div style="width:570px">
        <el-table :data="playerSuspend.guest"
                  border
                  size="mini"
                  style="width: 100%">
          <el-table-column prop="date"
                           width="100%"
                           label="伤停">
            <template slot="header">
              <div class="linue-header">
                <b>客队伤停统计</b>
              </div>
            </template>
            <el-table-column prop="player_name"
                             label="球员"
                             width="285px"
                             align="center">
              <template slot-scope="scope">
                <router-link style="width:100%;height:100%;display:block;"
                             target="_blank"
                             :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">{{scope.row.player_name}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="injury"
                             label="伤停原因"
                             width="285px"
                             align="center">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script >
export default {
  data () {
    return {
      linuepStatisticsList: [],
      playerSuspend: []
    };
  },
  created () {
    this.linuepStatistics()

  },
  methods: {
    async linuepStatistics () {


      const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/linuepStatistics/`);

      var Coachcolors = { '前锋': 'rgba(190,76,89,0.5)', '中场': 'rgba(100,76,89,0.5)', '后卫': 'rgba(180,16,89,0.5)', '守门员': 'rgba(110,106,89,0.5)', '替补': 'rgba(170,76,29,0.5)' }
      // 颜色
      function colors (list) {
        list.forEach((item) => {
          item.colors = Coachcolors[item.place]
        })
      }
      colors(res.data.linuepStatisticsList.home)
      colors(res.data.linuepStatisticsList.guest)

      this.linuepStatisticsList = res.data.linuepStatisticsList
      this.playerSuspend = res.data.playerSuspend

    }

  },

}
</script>
<style lang = 'less'  >
.linuep_box .el-table--mini td,
.el-table--mini th {
  padding: 0 !important;
}
.linuep_box .cell {
  height: 100%;
}
.linuep_box .cell span {
  padding: 6px 0;
}
.linue-header {
  height: 60px;
  line-height: 60px;
  font-weight: 600;
  text-align: center;
  font-size: 18px;
}
.linuep_box a {
  display: block;
  width: 100%;
  height: 100%;
  &:hover {
    color: #409eff;
  }
}
</style>