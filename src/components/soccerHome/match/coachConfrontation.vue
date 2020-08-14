<template>
  <div>
    <el-table :data="tableData"
              border
              :header-cell-style="{
    'color': '#303133',
    'font-weight:':900,
    'font-size':'14px',
}"
              style="width: 100%">
      <el-table-column prop="date"
                       align="center"
                       width="">
        <template slot="header">
          <div class="tableData-header">
            <b>{{TeamNameInfo[0]}} &nbsp; &nbsp; &nbsp; &nbsp;VS&nbsp; &nbsp; &nbsp; &nbsp; {{TeamNameInfo[2]}}</b>
          </div>
        </template>
        <el-table-column prop="date"
                         align="center"
                         width="">
          <template slot="header">
            <div class="tableData-xheader">
              <b>{{TeamNameInfo[0]}} ： {{CoachNameInfo[0]}}</b>
              <b>
                <span>{{Win}}胜</span>
                <span>{{flat}}平</span>
                <span>{{load}}负</span>
              </b>
              <b>{{TeamNameInfo[2]}} ： {{CoachNameInfo[2]}}</b>
            </div>
          </template>
          <el-table-column prop="classname"
                           label="赛季"
                           align="center"
                           width="">
            <template slot-scope="scope">
              <span>
                {{scope.row.classname}} ({{scope.row.matchSeason}})
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="matchtime"
                           label="比赛时间"
                           align="center"
                           width="">
          </el-table-column>
          <el-table-column prop="homeName"
                           align="center"
                           label="主队">
            <template slot-scope="scope">
              <span>
                <router-link target="_blank"
                             class="span"
                             :to="{name:'information',params:{teamID:scope.row.hometeamID}}">
                  {{scope.row.homeName}}
                </router-link>
                <router-link target="_blank"
                             class="span"
                             :style="{'color':(scope.row.colors)}"
                             :to="{name:'playerDetails',params:{playerID:scope.row.homeCoachId}}">
                  ({{scope.row.homeCoachName}})
                </router-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="address"
                           align="center"
                           label="比分">
            <template slot-scope="scope">
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:scope.row.scheduleID}}">
                {{scope.row.homeScore}} - {{scope.row.guestScore}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="guestName"
                           align="center"
                           label="客队">
            <template slot-scope="scope">
              <span class="span">
                <router-link target="_blank"
                             class="span"
                             :to="{name:'information',params:{teamID:scope.row.guestteamID}}">
                  {{scope.row.guestName}}
                </router-link>
                <router-link target="_blank"
                             class="span"
                             :style="{'color':(scope.row.colorss)}"
                             :to="{name:'playerDetails',params:{playerID:scope.row.guestCoachId}}">
                  ({{scope.row.guestCoachName}})
                </router-link>
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script >
export default {
  data () {
    return {
      tableData: [],
      TeamNameInfo: [],
      CoachNameInfo: [],
      Win: 0,
      flat: 0,
      load: 0
    };
  },
  created () {
    this.onDataList()
  },
  methods: {
    async onDataList () {
      const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/coachAgainst/`);
      this.TeamNameInfo = sessionStorage.getItem('TeamName').split(',')
      this.CoachNameInfo = sessionStorage.getItem('CoachName').split(',')
      // 添加颜色
      res.data.match_list.forEach(item => {
        item.matchtime = item.matchtime.replace('T', ' ')
        if (item.homeCoachId == this.CoachNameInfo[1]) {
          if (item.homeScore > item.guestScore) {
            item.colors = '#ff0000'
          } else if (item.homeScore < item.guestScore) {
            item.colors = '#36F'
          } else {
            item.colors = '#444'
          }
        } else if (item.guestCoachId == this.CoachNameInfo[1]) {
          if (item.guestScore > item.homeScore) {
            item.colorss = '#ff0000'
          } else if (item.guestScore < item.homeScore) {
            item.colorss = '#36F'
          } else {
            item.colorss = '#444'
          }
        }
      })
      // 胜平负
      this.Win = res.data.match_list.filter(item => {
        return item.colors == '#ff0000' || item.colorss == '#ff0000'
      }).length
      this.flat = res.data.match_list.filter(item => {
        return item.colors == '#444' || item.colorss == '#444'
      }).length
      this.load = res.data.match_list.filter(item => {
        return item.colors == '#36F' || item.colorss == '#36F'
      }).length
      this.tableData = res.data.match_list

    }
  }
}
</script>
<style lang = 'less' scoped >
.tableData-header {
  font-size: 18px;
  color: rgb(248, 51, 71);
}
.tableData-xheader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #000;
  b {
    margin: 0 20px;
  }
}
.span {
  color: #878a90;
  font-weight: 900;
}
a {
  display: block;
  &:hover {
    color: #409eff;
  }
}
</style>