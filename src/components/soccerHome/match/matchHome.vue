<template>
  <div class="gWidth">
    <el-card>

      <!-- 头部公共 -->
      <el-card>
        <div class="match_top">
          <div class="lunci">
            <br/> {{headerList.matchSeason}}
            <br/> {{headerList.subsclassName}}
            <br/>
            <span v-if="headerList.round">第{{headerList.round}}轮</span> <br/> {{headerList.grouping}}
          </div>
          <div class="left">
            <h2>
              <router-link target="_blank"
                           v-if="headerList.hometeamID"
                           :to="{name:'information',params:{teamID:headerList.hometeamID}}">{{headerList.homeTeamName}}</router-link>
            </h2>
            <p>{{headerList.homeTeamName_E}}</p>
            <div class="img_tit"
                 v-if="headerList.homeTeamFlag">
              <el-image :src="`http://qiuguantx.com/img/team/${headerList.homeTeamFlag}`"></el-image>
              <p>
                <router-link target="_blank"
                             v-if="headerList.homeTeamCoachID"
                             :to="{name:'playerDetails',params:{playerID:headerList.homeTeamCoachID}}">{{headerList.homeTeamCoachName}}</router-link>
              </p>
            </div>
          </div>

          <div class="content">
            <h2 v-if="headerList.matchState"
                style="color:#ed5565">{{headerList.homeScore}}-{{headerList.guestScore}}</h2>
            <h2 v-else>vs</h2>
            <p>开赛事件：{{`${headerList.matchtime}`.replace('T',' &nbsp;')}}</p>
            <p>场地：{{headerList.location}} </p>
            <p>天气：{{headerList.weather}}&nbsp;&nbsp; 温度：{{headerList.temperature}}</p>
          </div>

          <div class="right">
            <h2>
              <router-link target="_blank"
                           v-if="headerList.guestteamID"
                           :to="{name:'information',params:{teamID:headerList.guestteamID}}">{{headerList.guestTeamName}}</router-link>
            </h2>
            <p>{{headerList.guestTeamName_E}}</p>
            <div class="img_tit"
                 v-if="headerList.guestTeamFlag">
              <el-image :src="`http://qiuguantx.com/img/team/${headerList.guestTeamFlag}`"></el-image>
              <p>
                <router-link target="_blank"
                             v-if="headerList.guestTeamCoachID"
                             :to="{name:'playerDetails',params:{playerID:headerList.guestTeamCoachID}}">{{headerList.guestTeamCoachName}}</router-link>
              </p>
            </div>
          </div>
        </div>

      </el-card>
      <!-- 选项卡公共 -->
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="欧赔"
                     name="odds"></el-tab-pane>
        <el-tab-pane label="亚盘"
                     name="subPanel"></el-tab-pane>
        <el-tab-pane label="比赛历史"
                     name="history"></el-tab-pane>
        <el-tab-pane label="教练对阵"
                     name="coachConfrontation"></el-tab-pane>
        <el-tab-pane label="球路盘路"
                     name="diskDrive"></el-tab-pane>
        <el-tab-pane label="技术统计"
                     name="statistics"></el-tab-pane>
        <el-tab-pane label="伤停统计"
                     name="linuepStatistics"></el-tab-pane>
        <el-tab-pane label="交易盈亏"
                     name="exchanges"></el-tab-pane>
        <el-tab-pane label="球冠指数"
                     name="exponent"></el-tab-pane>
        <!-- <el-tab-pane label="比赛预测"
                     name="exponent"></el-tab-pane> -->
        <el-tab-pane label="球队位置"
                     name="TeamPosition"></el-tab-pane>
      </el-tabs>

      <!-- 路由占位符 -->
      <!-- <router-view></router-view> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-card>
  </div>
</template>
<script >
export default {
  data () {
    return {
      activeName: 'history',
      scheduleID: '',
      headerList: {},
    };
  },
  watch: {
    '$route' (to, from) {
      if (to.params.scheduleID !== from.params.scheduleID) {
        this.$router.go(0);
      }
    }
  },
  created () {
    // console.log(this.$route.params.scheduleID)
    this.scheduleID = this.$route.params.scheduleID
    // console.log(this.scheduleID)
    this.OnHeaderG()
    // 判断初始选项卡位置
    if (this.$route.name) return this.activeName = this.$route.name
    // this.OnHeaderG()


  },
  methods: {
    // 跳转链接
    handleClick (tab, event) {
      // console.log(tab.name);
      // this.$router.push(tab.name)
      this.$router.push({ path: '/soccer/match/' + tab.name + '/' + this.scheduleID }).catch(err => err);
    },
    //  头部公用接口
    async OnHeaderG () {
      const res = await this.$http.get('soccer/matchInfo/' + this.scheduleID);
      if (res.status !== 200) return console.log('对阵头部信息取失败');
      // console.log(res.data)
      this.headerList = res.data
    }
  }
}
</script>
<style lang = 'less' scoped >
.Gheader {
  min-width: 1200px;
}

.match_top {
  display: flex;
  justify-content: space-around;
  background: #fff;
  position: relative;
  height: 170px;
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 30%;
    h2 {
      font-size: 30px;
      font-weight: bold;
    }
    p {
      font-size: 12px;
      a {
        color: #3680d8;
      }
    }
    .img_tit {
      width: 100%;
      text-align: center;
      .el-image {
        width: 100px;
        height: 100px;
      }
    }
  }
  .right {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    h2 {
      font-size: 30px;
      font-weight: bold;
    }
    p {
      font-size: 12px;
      a {
        color: #3680d8;
      }
    }
    .img_tit {
      width: 100%;
      text-align: center;
      .el-image {
        width: 100px;
        height: 100px;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
      font-size: 72px;
      font-weight: bold;
    }
  }
}

/* 选项卡 */
.el-tabs {
  background: #fff;
  height: 40px;
}

.lunci {
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: 16px;
  text-align: center;
}
</style>