<template>
  <div class="gWidth">

    <el-card>
      <el-tabs type="border-card"
               v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="总盘"
                     name="all"></el-tab-pane>
        <el-tab-pane label="主场盘路"
                     name="home"></el-tab-pane>
        <el-tab-pane label="客场盘路"
                     name="guest"></el-tab-pane>
      </el-tabs>

      <el-table :data="tableData"
                border
                size="mini"
                :header-cell-style="{'background':'#f5f7fa'}"
                style="width: 100%;margin-top:-30px">
        <el-table-column align="center"
                         width="100%">
          <template slot="header">
            {{tit}}
          </template>
          <el-table-column align="center"
                           prop="sclassName"
                           label="赛事"
                           width="">

          </el-table-column>
          <el-table-column align="center"
                           prop="matchtime"
                           label="开赛时间"
                           sortable
                           sort-by="matchtime"
                           width="">

          </el-table-column>
          <el-table-column align="center"
                           prop="result"
                           label="盘路"
                           width="">
            <template slot-scope="scope">
              <span v-if="scope.row.result == '赢'"
                    style="font-weight: 900;"
                    :style="{'color':scope.row.result == '赢'?'rgb(255, 0, 0)':''}">{{scope.row.result}}</span>
              <span v-else-if="scope.row.result == '输'"
                    style="font-weight: 900;"
                    :style="{'color':scope.row.result == '输'?'rgb(51, 102, 255)':''}">{{scope.row.result}}</span>
              <span v-else
                    style="font-weight: 900;">{{scope.row.result}}</span>

            </template>

          </el-table-column>
          <el-table-column align="center"
                           prop="hometeamName"
                           label="主场球队"
                           width="">
            <template slot-scope="scope">
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:scope.row.hometeamID}}">
                <span :style="{'color':scope.row.hometeamID == teamID?'rgb(136, 0, 0)':''}">{{scope.row.hometeamName}}</span>
              </router-link>
            </template>

          </el-table-column>
          <el-table-column align="center"
                           prop="goal_real"
                           label="盘口"
                           width="">

          </el-table-column>
          <el-table-column align="center"
                           prop="homeScore"
                           label="比分"
                           width="">
            <template slot-scope="scope">
              {{scope.row.homeScore}}-{{scope.row.guestScore}}
            </template>

          </el-table-column>
          <el-table-column align="center"
                           prop="guestteamName"
                           label="客场球队"
                           width="">
            <template slot-scope="scope">
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:scope.row.guestteamID}}">
                <span :style="{'color':scope.row.guestteamID == teamID?'rgb(136, 0, 0)':''}">{{scope.row.guestteamName}}</span>
              </router-link>
            </template>

          </el-table-column>
          <el-table-column align="center"
                           prop="homeHalfScore"
                           label="半场"
                           width="">
            <template slot-scope="scope">
              {{scope.row.homeHalfScore}}-{{scope.row.guestHalfScore}}
            </template>

          </el-table-column>

        </el-table-column>

      </el-table>
    </el-card>

  </div>
</template>
<script >
export default {

  data () {
    return {
      datas: [],
      activeName: 'all',
      tableDatas: [],
      tableData: [],
      matchSeason: '',
      sclassName: '',
      teamName: '',
      teamID: '',
      tit: ''
    };
  },
  created () {
    this.tableDataList('all');
  },
  methods: {
    handleClick (tab, event) {
      this.tableDataList(tab.name)

    },
    async tableDataList (styV) {
      var YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      var YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      var YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];
      var styResult = { 1: '赢', 2: '走', 3: '输' }
      if (!this.tableDatas.length) {
        let obj = this.$route.query
        if (sessionStorage.getItem('subsClassID')) {
          obj.subsClassID = sessionStorage.getItem('subsClassID')
        }

        const res = await this.$http.get(`odds/teamLetgoal/`, { params: obj });
        if (res.status !== 200) return console.log('让盘球获取失败');

        res.data.teamLetgoal.forEach(item => {
          item.goal_real = this.Goal2GoalCn(item.goal_real, YzStyle, YzStyle3, YzStyle2)
          item.result = styResult[item.result]
        })

        this.matchSeason = res.data.dataInfo.matchSeason
        this.sclassName = res.data.dataInfo.sclassName
        this.teamName = res.data.dataInfo.teamName
        this.teamID = res.data.dataInfo.teamID
        this.tableDatas = res.data.teamLetgoal
        // console.log(res.data)

      }


      if (styV) {
        if (styV == 'home') {
          this.tit = this.matchSeason + `(` + this.teamName + `)` + '主场盘路'
          this.tableData = this.tableDatas.filter(item => {
            return item.hometeamID === this.teamID

          })
        } else if (styV == 'guest') {
          this.tit = this.matchSeason + `(` + this.teamName + `)` + '客场盘路'
          this.tableData = this.tableDatas.filter(item => {
            return item.guestteamID === this.teamID
          })
        } else {
          this.tit = this.matchSeason + `(` + this.teamName + `)` + '全场盘路'
          this.tableData = this.tableDatas
        }

      }
      // console.log(this.tableData)

      // console.log(res.data.dataInfo.matchSeason, res.data.dataInfo.sclassName, res.data.dataInfo.teamName, res.data.dataInfo.teamID)
    },
    // 盘口转换
    Goal2GoalCn (firstGoal, YzStyle, YzStyle3, YzStyle2) { //数字盘口转汉汉字	
      if (firstGoal == null || firstGoal + "" == "")
        return "";
      else {
        if (firstGoal > 10 || firstGoal < -10) return firstGoal + "球";
        if (firstGoal >= 0) return YzStyle[parseInt(firstGoal * 4)];
        else return "受" + YzStyle[Math.abs(parseInt(firstGoal * 4))];
      }
    },


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
</style>