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
                           v-if="headerList.homeTeamInfo"
                           :to="{name:'information',params:{teamID:headerList.homeTeamInfo.hometeamID}}">{{headerList.homeTeamInfo.homeTeamName}}</router-link>
            </h2>
            <p v-if="headerList.homeTeamInfo">{{headerList.homeTeamInfo.homeTeamName_E}}</p>
            <div class="img_tit"
                 v-if="headerList.homeTeamInfo">
              <el-image :src="`http://qiuguantx.com/img/team/${headerList.homeTeamInfo.homeTeamFlag}`"></el-image>
              <p>
                <router-link target="_blank"
                             :to="{name:'playerDetails',params:{playerID:headerList.homeTeamCoachInfo.homeTeamCoachID}}">{{headerList.homeTeamCoachInfo.homeTeamCoachName}}</router-link>
              </p>
            </div>
          </div>

          <div class="content">
            <h2 v-if="headerList.matchState"
                style="color:#ed5565">{{headerList.homeScore}}-{{headerList.guestScore}}</h2>
            <h2 v-else>vs</h2>
            <p>开赛时间：{{`${headerList.matchtime}`.replace('T',' &nbsp;')}}</p>
            <p v-if="headerList.venueInfo">场地：{{headerList.venueInfo.venue_name}} </p>
            <p>天气：{{headerList.weather}}&nbsp;&nbsp; 温度：{{headerList.temperature}}</p>
          </div>

          <div class="right">
            <h2>
              <router-link target="_blank"
                           v-if="headerList.guestTeamInfo"
                           :to="{name:'information',params:{teamID:headerList.guestTeamInfo.hometeamID}}">{{headerList.guestTeamInfo.homeTeamName}}</router-link>
            </h2>
            <p v-if="headerList.guestTeamInfo">{{headerList.guestTeamInfo.homeTeamName_E}}</p>
            <div class="img_tit"
                 v-if="headerList.guestTeamInfo">
              <el-image :src="`http://qiuguantx.com/img/team/${headerList.guestTeamInfo.homeTeamFlag}`"></el-image>
              <p>
                <router-link target="_blank"
                             :to="{name:'playerDetails',params:{playerID:headerList.guestTeamCoachInfo.guestTeamCoachID}}">{{headerList.guestTeamCoachInfo.guestTeamCoachName}}</router-link>
              </p>
            </div>
          </div>
        </div>

      </el-card>
      <!-- 选项卡公共 -->
      <div class="tabs_box">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane :name="name_tabs1">
            <span slot="label">
              <span class="tabs_box_span"
                    @mouseenter="mouseOver"
                    @mouseleave="mouseLeave">
                {{name_tabs}}
                <span class="tabs_box_icon">
                  <i v-if="clocks"
                     class="el-icon-arrow-up"></i>
                  <i v-else
                     class="el-icon-arrow-down"></i>
                </span>
              </span>
            </span>
          </el-tab-pane>
          <el-tab-pane label="教练对阵"
                       name="coachConfrontation"></el-tab-pane>
          <el-tab-pane label="球员转会"
                       name="coachConfrontation11"></el-tab-pane>
          <el-tab-pane label="球路盘路"
                       name="diskDrive"></el-tab-pane>
          <el-tab-pane label="比赛历史"
                       name="history"></el-tab-pane>
          <el-tab-pane label="技术统计"
                       name="statistics"></el-tab-pane>
          <el-tab-pane label="伤停统计"
                       name="linuepStatistics"></el-tab-pane>
          <el-tab-pane label="球队位置"
                       name="TeamPosition"></el-tab-pane>
          <el-tab-pane label="赛事分析"
                       name="exponent11"></el-tab-pane>
        </el-tabs>
        <div class="tabs_box_dl"
             :style="{'border':clocks?'':'0px'}"
             @mouseenter="mouseOver"
             @mouseleave="mouseLeave">
          <dl v-if="clocks">
            <dd>
              <span @click="handleClick2('欧赔','odds')">欧赔</span>
            </dd>
            <dd>
              <span @click="handleClick2('亚盘','subPanel')">亚盘</span>
            </dd>
            <dd>
              <span @click="handleClick2('交易盈亏','exchanges')">交易盈亏</span>
            </dd>
            <dd>
              <span @click="handleClick2('球冠指数','exponent')">球冠指数</span>
            </dd>
          </dl>
        </div>

      </div>

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
      // 选项卡第一个名
      name_tabs: '球冠指数',
      clocks: false,
      name_tabs1: '',
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
    if (this.$route.name == 'odds' || this.$route.name == 'subPanel' || this.$route.name == 'exchanges' || this.$route.name == 'exponent') {
      let name_tabs1 = { odds: '欧赔', subPanel: '亚盘', exchanges: '交易盈亏', exponent: '球冠指数' }
      this.activeName = this.$route.name
      this.name_tabs1 = this.$route.name
      this.name_tabs = name_tabs1[this.$route.name]
    }
    // 判断初始选项卡位置
    if (this.$route.name) {
      this.activeName = this.$route.name
    }


  },
  methods: {
    //  头部公用接口
    async OnHeaderG () {
      const res = await this.$http.get('soccer/matchInfo/' + this.scheduleID);
      if (res.status !== 200) return console.log('对阵头部信息取失败');
      this.headerList = res.data
    },
    // 跳转链接
    handleClick (tab, event) {
      if (tab.name != 'exponent') {
        // 初始
        this.name_tabs = '球冠指数'
        this.name_tabs1 = 'exponent'
      }
      this.$router.push({ path: '/soccer/match/' + tab.name + '/' + this.scheduleID }).catch(err => err);


    },
    handleClick2 (name, href) {
      this.name_tabs = name
      this.activeName = this.name_tabs1
      this.$router.push({ path: '/soccer/match/' + href + '/' + this.scheduleID }).catch(err => err);
    },
    // 移入移除
    mouseOver () {
      this.clocks = true
    },
    mouseLeave () {
      this.clocks = false
    },
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
      margin-top: -20px;
    }
    p {
      line-height: 30px;
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
/* .tabs_box {
  display: flex;
} */

.tabs_box {
  position: relative;
  .tabs_box_span {
    .tabs_box_icon {
      .i1 {
        &:hover {
          transform: rotate(180deg);
        }
      }
    }
  }
}
.tabs_box_dl {
  position: absolute;
  top: 30px;
  width: 70px;
  background: #fff;
  border: 1px solid #ddd;
  z-index: 999999999999999;

  dd {
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    &:hover {
      background: #eee;
    }
    span {
      padding-left: 6px;
      cursor: pointer;
      width: 100%;
      display: inline-block;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>