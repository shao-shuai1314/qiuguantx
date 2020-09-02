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
               <span v-if="mingC.length" style="color: #999;font-size:14px;margin-left:10px">[{{mingC[0].index}}]</span>
            </h2>
            <p v-if="headerList.homeTeamInfo">{{headerList.homeTeamInfo.homeTeamName_E}}</p>
            <div class="img_tit"
                 v-if="headerList.homeTeamInfo">
              <el-image :src="`http://qiuguantx.com/img/team/${headerList.homeTeamInfo.homeTeamFlag}`"></el-image>
              <p>
                <router-link target="_blank"
                             v-if="headerList.homeTeamCoachInfo.homeTeamCoachID"
                             :to="{name:'playerDetails',params:{playerID:headerList.homeTeamCoachInfo.homeTeamCoachID}}">{{headerList.homeTeamCoachInfo.homeTeamCoachName}}</router-link>
              </p>
            </div>
          </div>

          <div class="content">
            <h2 v-if="headerList.matchState ==-1"
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
              <span v-if="mingC.length" style="color: #999;font-size:14px;margin-left:10px">[{{mingC[1].index}}]</span>
            </h2>
            <p v-if="headerList.guestTeamInfo">{{headerList.guestTeamInfo.homeTeamName_E}}</p>
            <div class="img_tit"
                 v-if="headerList.guestTeamInfo">
              <el-image :src="`http://qiuguantx.com/img/team/${headerList.guestTeamInfo.homeTeamFlag}`"></el-image>
              <p>
                <router-link target="_blank"
                             v-if="headerList.guestTeamCoachInfo.guestTeamCoachID"
                             :to="{name:'playerDetails',params:{playerID:headerList.guestTeamCoachInfo.guestTeamCoachID}}">{{headerList.guestTeamCoachInfo.guestTeamCoachName}}</router-link>
              </p>
            </div>
          </div>
        </div>

      </el-card>
      <!-- 选项卡公共 -->
      <div class="tabs_box">
        <ul>
          <li>
            <div @click="handleClick1(0,'exponent','球冠指数')"
                 :class="activeIndex==0?'active':''">
              <span>{{activeName1}}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <dl>
              <dd>
                <span @click="handleClick2(0,'欧赔','odds')">欧赔</span>
              </dd>
              <dd>
                <span @click="handleClick2(0,'亚赔','subPanel')">亚赔</span>
              </dd>
              <dd>
                <span>交易盈亏</span>
              </dd>
              <dd>
                <span @click="handleClick2(0,'球冠指数','exponent')">球冠指数</span>
              </dd>
            </dl>
          </li>
          <li>
            <div @click="handleClick1(1,'coachConfrontation')"
                 :class="activeIndex==1?'active':''">
              <span>{{activeName2}}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <dl>
              <dd>
                <span @click="handleClick3(1,'教练对阵','coachConfrontation')">教练对阵</span>
              </dd>
              <dd>
                <span @click="handleClick3(1,'球员转会','PlayerTransfer')">球员转会</span>
              </dd>
            </dl>
          </li>
          <li>
            <div @click="handleClick1(2,'statistics')"
                 :class="activeIndex==2?'active':''">
              <span>{{activeName3}}</span>
              <i class="el-icon-arrow-down"></i>
            </div>
            <dl>
              <dd>
                <span @click="handleClick4(2,'技术统计','statistics')">技术统计</span>
              </dd>
              <dd>
                <span @click="handleClick4(2,'伤停统计','linuepStatistics')">伤停统计</span>
              </dd>
              <dd>
                <span @click="handleClick4(2,'文字直播','textLive')">文字直播</span>
              </dd>
            </dl>
          </li>
          <li>
            <span class="tabs-span"
                  @click="handleClick1(3,'history')"
                  :class="activeIndex==3?'active':''">比赛历史</span>
          </li>
          <li>
            <span class="tabs-span"
                  @click="handleClick1(4,'diskDrive')"
                  :class="activeIndex==4?'active':''">球路盘路</span>
          </li>
          <li>
            <span class="tabs-span"
                  @click="handleClick1(5,'TeamPosition')"
                  :class="activeIndex==5?'active':''">地理位置</span>
          </li>
          <li>
            <span class="tabs-span"
                  @click="handleClick1(6,'analyse')"
                  :class="activeIndex==6?'active':''">赛前分析</span>
          </li>

        </ul>

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
      activeName1: '球冠指数',
      activeName2: '教练对阵',
      activeName3: '技术统计',
      activeIndex: 0,

      scheduleID: '',
      headerList: {},
      // 选项卡第一个名
      name_tabs: '球冠指数',
      clocks: false,
      name_tabs1: '',

      mingC:[]
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
    this.scheduleID = this.$route.params.scheduleID
    this.OnHeaderG()
    // 判断初始选项卡位置
    if (this.$route.name) {
      let styles = { 'exponent': [0, '球冠指数'], 'odds': [0, '欧赔'], 'subPanel': [0, '亚赔'], 'coachConfrontation': [1, '教练对阵'], 'PlayerTransfer': [1, '球员转会'], 'statistics': [2, '技术统计'], 'textLive': [2, '文字直播'], 'linuepStatistics': [2, '伤停统计'], 'history': [3, '比赛历史'], 'diskDrive': [4, '球路盘路'], 'TeamPosition': [5, '球队位置'], 'analyse': [6, '赛事分析'] }

      // this.activeName = this.$route.name
      this.activeIndex = styles[this.$route.name][0]
      if (this.activeIndex == 0) {
        this.activeName1 = styles[this.$route.name][1]
      } else if (this.activeIndex == 1) {
        this.activeName2 = styles[this.$route.name][1]
      } else if (this.activeIndex == 2) {
        this.activeName3 = styles[this.$route.name][1]
      }
    }
  //  console.log(JSON.parse(temp))


  },
  methods: {
    //  头部公用接口
    async OnHeaderG () {
      const res = await this.$http.get('soccer/matchInfo/' + this.scheduleID);
      this.headerList = res.data
      let TeamName = [res.data.homeTeamInfo.homeTeamName, res.data.homeTeamInfo.hometeamID, res.data.guestTeamInfo.homeTeamName, res.data.guestTeamInfo.hometeamID]
      let CoachName = [res.data.homeTeamCoachInfo.homeTeamCoachName, res.data.homeTeamCoachInfo.homeTeamCoachID, res.data.guestTeamCoachInfo.guestTeamCoachName, res.data.guestTeamCoachInfo.guestTeamCoachID]
      sessionStorage.setItem('TeamName', TeamName)
      sessionStorage.setItem('CoachName', CoachName)
       sessionStorage.setItem('matchState', res.data.matchState)
      sessionStorage.setItem('Score', `${res.data.homeScore}-${res.data.guestScore}`)

      // 名次

      const ss = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/league/`);

     ss.data.all_league.forEach((item,index)=>item.index = index+1)
      let home_m =  ss.data.all_league.find(item=>item.teamID == TeamName[1])
      let guest_m = ss.data.all_league.find(item=>item.teamID == TeamName[3])

      if(home_m == undefined ){
        home_m = {index:''}
      }
      if(guest_m == undefined){
         guest_m = {index:''}
      }

      // 名次
    //     var temp = sessionStorage.getItem("mingC")
     this.mingC = [home_m,guest_m]

    },
    handleClick1 (index, href) {

      if (index == 0) {
        if (this.activeName1 != '球冠指数') return
      } else if (index == 1) {
        if (this.activeName2 != '教练对阵') return
      } else if (index == 2) {
        if (this.activeName3 != '技术统计') return
      }

      this.activeName1 = '球冠指数'
      this.activeName2 = '教练对阵'
      this.activeName3 = '技术统计'
      this.activeIndex = index
      this.$router.push({ path: '/soccer/match/' + href + '/' + this.scheduleID })

    },
    gg (index, href) {
      this.activeName1 = '球冠指数'
      this.activeName2 = '教练对阵'
      this.activeName3 = '技术统计'
      this.activeIndex = index
      this.$router.push({ path: '/soccer/match/' + href + '/' + this.scheduleID })
    },
    handleClick2 (index, name, href) {
      this.gg(index, href)
      this.activeName1 = name
    },
    handleClick3 (index, name, href) {
      this.gg(index, href)
      this.activeName2 = name
    },
    handleClick4 (index, name, href) {
      this.gg(index, href)
      this.activeName3 = name

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

.tabs_box {
  .active {
    border-bottom: 2px solid #409eff;
    color: #409eff;
    font-weight: 600;
    transition: 0.3s;
  }
  ul {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    border-bottom: 2px solid #eee;
    li {
      height: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      margin-right: 40px;
      font-size: 14px;
      cursor: pointer;
      .tabs-span {
        cursor: pointer;
        width: 100%;
        height: 40px;
        line-height: 40px;
        display: inline-block;
      }
      div {
        height: 40px;
        line-height: 40px;
      }
      &:hover dl {
        display: block;
        transition: 0.3s;
      }
      &:hover i {
        transform: rotate(180deg);
        color: #409eff;
        transition: 0.3s;
      }
      &:hover div span {
        color: #409eff;
      }
      dl {
        position: absolute;
        top: 36px;
        left: 0;
        background: #fff;
        border: 1px solid #eee;
        z-index: 9999999;
        display: none;
        width: 70px;
        dd {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          span {
            margin-left: 6px;
            width: 100%;
            display: inline-block;
            &:hover {
              color: #409eff;
            }
          }
          &:hover {
            background: #eee;
          }
        }
      }
    }
  }
}
</style>