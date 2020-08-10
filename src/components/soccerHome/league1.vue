<template>
  <div class="league_box gWidth">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/soccer' }">足球中心</el-breadcrumb-item>
      <el-breadcrumb-item>赛事积分榜</el-breadcrumb-item>

    </el-breadcrumb>
    <!-- 左边 -->
    <navigation :datas=[sclassName,sclass_rule,seasonListValue]></navigation>
    <!-- 右边数据积分榜 -->
    <el-card class="league_box_right fr">
      <div class="top">
        <!-- 标题 -->
        <h2>{{sclassName}}</h2>
        <!-- 赛季选择 -->
        <el-select v-model="seasonListValue"
                   style="margin:10px"
                   size="mini"
                   :placeholder="seasonList[0]"
                   @change="Onseason">
          <el-option v-for="item in seasonList"
                     :key="item"
                     :label="item"
                     :value="item">
          </el-option>
        </el-select>
        <!-- 是否二级选项卡 -->
        <el-tabs type="border-card"
                 v-if="subsClassList.length"
                 v-model="currentSubsClass"
                 @tab-click="handleClick">
          <el-tab-pane :label="item.subsclassname"
                       :name="item.subsClassID+''"
                       v-for="(item,index) in subsClassList"
                       :key="index"></el-tab-pane>
        </el-tabs>
        <!-- 分组小组赛 -->
        <div class="xiaozu"
             v-if="groupList.length != 0">
          <el-tag v-for="item in groupList"
                  :key="item"
                  @click="Onxiaoz(item)"
                  :type="item == xiaozuItemType?'success':'info'">{{item}}</el-tag>
        </div>
        <!-- 轮次选择000 -->
        <div class="table_box">
          <!-- 分页 -->
          <table width="100%"
                 cellpadding="2"
                 cellspacing="0"
                 class="table_FenYe"
                 style="table-layout: fixed;">
            <tr align="center">
              <td class=""
                  v-for="item in pagingUp"
                  :key="item"
                  @click="OnPaging(item)">
                <router-link to=""
                             :class="item == paginAtv?'atv':''">{{item}}</router-link>
              </td>
            </tr>
            <tr align="center">
              <td class=""
                  v-for="item in pagingDown"
                  :key="item+pagingUp"
                  @click="OnPaging(item+pagingUp)">
                <router-link to=""
                             :class="item+pagingUp == paginAtv?'atv':''">{{item+pagingUp}}</router-link>
              </td>
            </tr>
          </table>
          <!-- 分页内容 -->
          <table width="100%"
                 border="0"
                 cellpadding="0"
                 cellspacing="0"
                 align="center"
                 class="table_NeiRong">
            <tr align="center"
                class="table_NeiRong_one">
              <td width="15%">时间</td>
              <td width="20%">主队</td>
              <td width="10%">比分</td>
              <td width="20%">客队</td>
              <td colspan="3"
                  width="25%">
                <div class="peilv">
                  <el-radio-group v-model="radioOdds"
                                  size="mini"
                                  @change="OnRadioOdds">
                    <el-radio :label="1">亚指</el-radio>
                    <el-radio :label="2">大小</el-radio>
                    <el-radio :label="3">欧指</el-radio>
                  </el-radio-group>
                  <el-select v-model="OddsValue"
                             style="margin:10px"
                             size="mini"
                             placeholder="res.data[0].name_cn"
                             @change="OnItemOddsList">
                    <el-option v-for="item in OddsList"
                               :key="item.companyID"
                               :label="item.name_cn"
                               :value="item.companyID">
                    </el-option>
                  </el-select>

                </div>
              </td>
              <td width="5%">分析</td>
            </tr>
            <tr align="center"
                class="table_NeiRong_two"
                v-for="(item,index) in MatchList"
                :key="index">
              <td width="20%">{{item.matchtime.replace('T',' &nbsp; &nbsp; &nbsp;')}}</td>
              <td width="20%">
                <router-link target="_blank"
                             :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.homeTeamName}}</router-link>
              </td>
              <td width="10%">
                <router-link target="_blank"
                             :to="{name:'history',params:{scheduleID:item.scheduleID}}">
                  <strong v-if="item.matchState"
                          style="color:#f46859">
                    {{item.homeScore}}-{{item.guestScore}}
                  </strong>
                  <strong v-else>
                    vs
                  </strong>

                </router-link>
              </td>
              <td width="20%">
                <router-link target="_blank"
                             :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestTeamName}}</router-link>
              </td>

              <td width="6.67%"
                  v-if="myfilter(item.scheduleID)">
                {{myfilter(item.scheduleID).firstUpOdds}}
              </td>
              <td width="6.67%"
                  v-else>
                -
              </td>
              <td width="6.67%"
                  v-if="myfilter(item.scheduleID)">
                {{myfilter(item.scheduleID).firstGoal}}
              </td>
              <td width="6.67%
                  "
                  v-else>
                -
              </td>
              <td width="6.67%
                  "
                  v-if="myfilter(item.scheduleID)
                  ">
                {{myfilter(item.scheduleID).firstDownOdds}}
              </td>
              <td width="6.67%
                  "
                  v-else>
                -
              </td>

              <td>
                <router-link target="_blank"
                             :to="{name:'odds',params:{scheduleID:item.scheduleID}}">欧/析</router-link>
              </td>
            </tr>
          </table>

        </div>
      </div>

      <!-- 积分榜 -->
      <div class="bottom"
           v-if="LeagueList.length">
        <el-divider></el-divider>
        <!-- 标题 -->
        <h2>积分榜</h2>
        <!-- 赛季选择 -->
        <!-- 积分榜近期状态 -->
        <el-select v-model="jF_jQValue
                  "
                   style="margin:10px
                  "
                   size="mini
                  "
                   :placeholder="jF_jQValue
                  "
                   @change="OnjFJq
                  ">
          <el-option v-for="(item,i)
                  in
                  League_jfList
                  "
                     :key="i
                  "
                     :label="item.labe
                  "
                     :value="item.value
                  ">
          </el-option>
        </el-select>
        <!-- 主客场 -->
        <el-select v-model="zKValue
                  "
                   style="margin:10px
                  "
                   size="mini
                  "
                   :placeholder="zKValue
                  "
                   @change="OnZk
                  ">
          <el-option v-for="(item,i)
                  in
                  League_zkList
                  "
                     :key="i
                  "
                     :label="item.labe
                  "
                     :value="item.value
                  ">
          </el-option>
        </el-select>

        <table width="100%
                  "
               border="0
                  "
               cellpadding="0
                  "
               cellspacing="0
                  "
               align="center
                  "
               class="table_NeiRong
                  ">
          <tr align="center
                  "
              class="table_NeiRong_one
                  ">
            <td width="8%
                  ">排名</td>
            <td width="
                  ">球队</td>
            <td width="6%
                  ">场次</td>
            <td width="6%
                  ">胜</td>
            <td width="6%
                  ">平
            </td>
            <td width="6%
                  ">负
            </td>
            <td width="6%
                  ">进球
            </td>
            <td width="6%
                  ">失球</td>
            <td width="7%
                  ">净胜球</td>
            <td width="6%
                  ">胜率</td>
            <td width="6%
                  ">平率</td>
            <td width="6%
                  ">负率</td>
            <td width="6%
                  ">均得</td>
            <td width="6%
                  ">均失</td>
            <td width="6%
                  ">积分</td>

          </tr>
          <tr align="center
                  "
              v-for="(item,i)
                  in
                  LeagueList
                  "
              :key="i
                  "
              class="table_NeiRong_two
                  ">
            <td :class="{
                  'active_red':
                  item
                  <=3
                  ,
                  'active_green':
                  item==4
                  ,
                  'active_grey':
                  item>=18 }"
                width="">{{item.rank}}
            </td>
            <td width="">
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:item.teamID}}">{{item.teamName}}</router-link>
            </td>
            <td>{{item.allCount}}</td>
            <td>{{item.win_score}}</td>
            <td width="">{{item.flat_score}}
            </td>
            <td width="">{{item.fail_score}}
            </td>
            <td width="">{{item.totalHomeScore}}
            </td>
            <td width="">{{item.totalGutstScore}}</td>
            <td width="">{{item.goalDifference}}</td>
            <td width="">{{item.winProbability}}</td>
            <td width="">{{item.flatProbability}}</td>
            <td width="">{{item.failProbability}}</td>
            <td width="">{{item.obtainAvg}}</td>
            <td width="">{{item.loseAvg}}</td>
            <td width="">{{item.allScore}}</td>

          </tr>

        </table>
        <div class="jianj">
          <div class="icon_tit"
               style="display:none">
            <div>
              <i class="active_red"></i>冠军杯</div>
            <div>
              <i class="active_green"></i>欧罗巴</div>
            <div>
              <i class="active_grey"></i>降级</div>
          </div>

          <!-- 文字简介 -->
          <div class="tit"
               v-if="remarks">
            {{remarks}}
          </div>
          <div class="tit"
               v-if="violationsList.length">
            <p v-for="item in violationsList"
               :key="item.teamID">
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:item.teamID}}">"{{item.teamName}}"</router-link>{{item.cause}}</p>
          </div>

        </div>

      </div>

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
      // 赛事比分数据
      // 赛事
      sclassName: '',
      // 赛季年份
      seasonList: [],
      seasonListValue: '',
      // 联赛介绍
      sclass_rule: '',
      // 赛程数据
      MatchList: [],
      // 上分页
      pagingUp: 0,
      // 下分页
      pagingDown: 0,
      // 当前轮次
      paginAtv: 1,
      // 二级联赛ID
      subsClassID: '',

      // 是否二级联赛
      subsClassList: [],
      // 二级联赛首选项
      currentSubsClass: "",
      // 分组赛
      groupList: [],
      // 小组id
      xiaozuID: '',
      // 当前点击的小组
      xiaozuItemType: '',




      // 积分榜数据
      LeagueList: [],
      // 所有球队
      allTeam: [],
      // 积分榜近期状态
      League_jfList: [
        {
          label: 1,
          value: '积分榜'
        },
        // {
        //   label: 2,
        //   value: '近期状态'
        // },
      ],
      // 首选项
      jF_jQValue: '积分榜',
      // 主客场
      League_zkList: [
        {
          label: 'all',
          value: '全部场地'
        },
        {
          label: 'home',
          value: '主场'
        },
        {
          label: 'guest',
          value: '客场'
        },
      ],
      zKValue: '全部场地',
      // 备注
      remarks: '',
      violationsList: '',

      // 赔率类型
      radioOdds: 1,
      // 赔率加工数组
      OddsList: [],
      OddsList1: [],
      OddsList2: [],
      OddsList0: [],


      // 赔率公司id
      OddsValue: 1,
      // 多个比赛id(1552513,1552514,1552517)
      scheduleIDlist: '',
      // 赔率加工后的数组
      oddsLists: [],
    };
  },

  watch: {
    '$route' (to, from) {
      this.$router.go(0);
    }
  },
  // 初始数据
  async created () {
    // 积分榜
    // this.getLeagueList(this.$route.params.sclassID)
    // 赛事积分
    if (this.$route.params.sclassID == sessionStorage.getItem('sclassID')) {
      this.seasonListValue = sessionStorage.getItem('matchSeason')
      this.getMatchListOne(this.$route.params.sclassID, sessionStorage.getItem('matchSeason'))
    } else if (this.$route.params.sclassID != sessionStorage.getItem('sclassID')) {
      this.getMatchListOne(this.$route.params.sclassID)
    }
    // console.log(this.$route.params.sclassID, 111, sessionStorage.getItem('sclassID'))

    this.OnOddsList()

  },
  computed: {

    myfilter () {
      return function (index) {
        return this.oddsLists.find(item => {
          return item.scheduleID == index
        })
      }
    }
  },
  methods: {
    // 赛事比分数据

    // 二级联赛数据
    async handleClick (tab, event) {
      // 分页初始数据0
      this.pagingUp = 0;
      this.pagingDown = 0;
      // 当前年份
      let sj = this.seasonListValue
      if (sj == '') {
        sj = this.seasonList[0]
      }
      // console.log(tab.name)
      // 获取二级联赛id
      this.subsClassID = Number(tab.name);
      console.log(this.subsClassID)

      sessionStorage.setItem('subsClassID', this.subsClassID)
      // 掉接口
      let obj = { sclassID: this.$route.params.sclassID, matchSeason: sj, subsClassID: Number(tab.name) }
      const res = await this.$http.get('soccer/schedule/', { params: obj });
      if (res.status !== 200) return console.log('赛事数据获取失败');
      // this.getSchedule(obj)
      // console.log(this.subsClassID)
      // 判断上下分分页
      if (res.data.maxRound) {
        if (res.data.maxRound % 2 === 0) {
          this.pagingUp = res.data.maxRound / 2;
          this.pagingDown = res.data.maxRound / 2;
        } else {
          this.pagingUp = Math.floor(res.data.maxRound / 2)
          this.pagingDown = Math.ceil(res.data.maxRound / 2)
        }
        // 当前轮次
        this.paginAtv = res.data.currentRound;

        // 积分榜数据清除
        this.LeagueList = [];
        this.zKValue = '全部场地';
        this.jF_jQValue = '积分榜';
        this.remarks = '';
        // 积分榜
        this.getLeagueList(this.$route.params.sclassID)
      }
      // 积分榜数据清除
      this.LeagueList = [];
      this.zKValue = '全部场地';
      this.jF_jQValue = '积分榜';
      this.remarks = '';
      this.violationsList = [];

      // 当前数据
      this.MatchList = res.data.matchList;
      // 是否有小组赛
      try {
        if (res.data.groupList.length || res.data.groupList != 'undefined' || res.data.groupList) {
          this.groupList = res.data.groupList;
        }
      }
      catch (err) {
        // console.log(err)
      }
      // 分组比赛首选项
      if (res.data.leagueData.isGroup) {
        this.xiaozuID = Number(tab.name);
        this.xiaozuItemType = res.data.currentGroup;
        if (res.data.currentGroup != null) {
          // 积分榜
          // 如果有值跳过
          // console.log(this.LeagueList.length)
          if (!this.LeagueList.length) {
            this.getLeagueList(this.$route.params.sclassID)
          }
        }
      }
      // console.log(res.data)


      // 赔率
      // 获取多组比赛id
      let scheduleIDlist = []
      res.data.matchList.forEach(io => {
        scheduleIDlist.push(io.scheduleID)
      })
      scheduleIDlist = scheduleIDlist.join(",")
      this.OnOdds(scheduleIDlist)
      this.scheduleIDlist = scheduleIDlist
    },


    // 小组赛数据
    async Onxiaoz (i) {
      // console.log(i)
      this.xiaozuItemType = i
      let sj = this.seasonListValue
      if (sj == '') {
        sj = this.seasonList[0]
      }
      let obj = { sclassID: this.$route.params.sclassID, matchSeason: sj, subsClassID: this.xiaozuID, groupName: i }
      const res = await this.$http.get('soccer/schedule/', { params: obj });
      if (res.status !== 200) return console.log('赛事数据获取失败');
      // this.getSchedule(obj);
      // 当前数据
      this.MatchList = res.data.matchList;

      // 积分榜
      // 积分榜数据清除
      this.LeagueList = [];
      this.zKValue = '全部场地';
      this.jF_jQValue = '积分榜';
      this.remarks = '';
      this.violationsList = [];
      this.getLeagueList(this.$route.params.sclassID)

      // 赔率
      // 获取多组比赛id
      let scheduleIDlist = []
      res.data.matchList.forEach(io => {
        scheduleIDlist.push(io.scheduleID)
      })
      scheduleIDlist = scheduleIDlist.join(",")
      this.OnOdds(scheduleIDlist)
      this.scheduleIDlist = scheduleIDlist

    },



    // 初始数据
    async getMatchListOne (sclassID, matchSeason, round, subsClassID) {

      // 初始判断
      let obj = { sclassID }
      if (matchSeason) {
        obj.matchSeason = matchSeason
      }
      // console.log(matchSeason)
      if (round) {
        obj.round = round
      }
      if (subsClassID) {
        obj.subsClassID = subsClassID
      }
      const res = await this.$http.get('soccer/schedule/', { params: obj });
      if (res.status !== 200) return console.log('赛事数据获取失败');


      // 判断二级联赛
      if (res.data.leagueData.ifHavesub) {
        // console.log(res.data.subsClassList)
        // 二级联赛数组
        this.subsClassList = res.data.subsClassList;
        // console.log(this.subsClassList)
        // 二级联赛首选项
        this.currentSubsClass = res.data.currentSubsClass + '';
        // console.log(this.currentSubsClass)
        sessionStorage.setItem('subsClassID', this.currentSubsClass)
      } else {
        sessionStorage.setItem('subsClassID', '')

      }
      // 是否有小组赛
      if (res.data.groupList) {
        this.groupList = res.data.groupList;
      }

      // 判断上下分分页
      if (res.data.maxRound) {
        if (res.data.maxRound % 2 === 0) {
          this.pagingUp = res.data.maxRound / 2;
          this.pagingDown = res.data.maxRound / 2;
        } else {
          this.pagingUp = Math.floor(res.data.maxRound / 2)
          this.pagingDown = Math.ceil(res.data.maxRound / 2)
        }
        // 当前轮次
        this.paginAtv = res.data.currentRound;
        // 积分榜
        // 如果有值跳过
        // console.log(this.LeagueList.length)
        if (!this.LeagueList.length) {
          this.getLeagueList(this.$route.params.sclassID)
        }

      }
      // console.log(res.data.matchList, 333)
      // 当前数据
      this.MatchList = res.data.matchList;
      // 赛事
      this.sclassName = res.data.leagueData.sclassName;
      // 赛季年份
      this.seasonList = res.data.seasonList;
      // 联赛介绍
      this.sclass_rule = res.data.leagueData.sclassRule;

      // 浏览器储存
      sessionStorage.setItem('sclassID', this.$route.params.sclassID)


      sessionStorage.setItem('sclassName', res.data.leagueData.sclassName)
      sessionStorage.setItem('sclass_rule', res.data.leagueData.sclassRule)
      // 时间
      if (this.seasonListValue == '') {
        this.seasonListValue = this.seasonList[0]
        sessionStorage.setItem('matchSeason', this.seasonListValue)
      } else {
        sessionStorage.setItem('matchSeason', this.seasonListValue)
      }

      // 分组比赛首选项
      if (res.data.leagueData.isGroup) {
        // this.xiaozuID = Number(tab.name);
        this.xiaozuItemType = res.data.currentGroup;
        // console.log(this.xiaozuItemType)
        // 积分榜
        // 如果有值跳过
        if (!this.LeagueList.length) {
          this.getLeagueList(this.$route.params.sclassID)
        }
      }

      // console.log(res.data)
      // 获取多组比赛id
      let scheduleIDlist = []
      res.data.matchList.forEach(io => {
        scheduleIDlist.push(io.scheduleID)
      })
      scheduleIDlist = scheduleIDlist.join(",")
      this.OnOdds(scheduleIDlist)
      this.scheduleIDlist = scheduleIDlist
    },


    // 赛事比分年份选择
    Onseason () {
      // 比分数据
      this.getMatchListOne(this.$route.params.sclassID, this.seasonListValue)


      this.groupList = []
      // console.log(this.seasonListValue)
      // 清除上一年份初始数据
      this.subsClassList = [];
      this.pagingUp = 0;
      this.pagingDown = 0;
      this.paginAtv = 0;
      this.currentSubsClass = '';
      this.groupList = [];
      this.xiaozuID = '';
      this.violationsList = [];


      // 积分榜数据清除
      this.LeagueList = [];
      this.zKValue = '全部场地';
      this.jF_jQValue = '积分榜'

    },

    // 分页
    OnPaging (index) {
      if (this.seasonListValue == '') {
        this.getMatchListOne(this.$route.params.sclassID, this.seasonList[0], index, this.subsClassID)
        this.paginAtv = index
      } else {
        this.getMatchListOne(this.$route.params.sclassID, this.seasonListValue, index, this.subsClassID)
        this.paginAtv = index
      }
    },







    // 积分榜

    async getLeagueList (sclassID, currentSubsClass) {
      // 积分榜数据清除
      // this.LeagueList = [];
      // this.zKValue = '全部场地';
      // this.jF_jQValue = '积分榜';
      // this.remarks = '';
      // console.log(this.xiaozuID, 111)
      // id
      let obj = {
        sclassID
      }
      // 时间
      if (this.seasonListValue == '') {
        obj.matchSeason = this.seasonList[0]
        sessionStorage.setItem('matchSeason', this.seasonList[0])
      } else {
        obj.matchSeason = this.seasonListValue
        sessionStorage.setItem('matchSeason', this.seasonListValue)
      }
      // home/guest
      if (this.zKValue == "全部场地") {
        obj.homeOrGuest = ''
      } else if (this.zKValue == "主场") {
        obj.homeOrGuest = "home"
      } else {
        obj.homeOrGuest = "guest"
      }
      // 1:所有积分榜 、2:近期状态
      if (this.jF_jQValue == "积分榜") {
        obj.leagueStatus = 1
      } else {
        obj.leagueStatus = 2
      }
      // 子联赛id
      // console.log(this.currentSubsClass, currentSubsClass)
      if (this.currentSubsClass || currentSubsClass) {
        obj.subsClassID = this.currentSubsClass || currentSubsClass
      }
      // 分组id
      if (this.xiaozuItemType) {
        obj.groupName = this.xiaozuItemType
      }
      this.LeagueList = []
      const res = await this.$http.get('soccer/league/', { params: obj });
      if (res.status !== 200) return console.log('积分榜数据获取失败');
      // console.log(res.data, 22)
      if (res.data.remarks) {
        this.remarks = res.data.remarks
      }
      if (res.data.violationsList) {
        this.violationsList = res.data.violationsList
      }
      this.LeagueList = res.data.leagueList
      // console.log(res.data)
    },

    // 积分榜近期状态
    OnjFJq () {
      this.LeagueList = []
      this.getLeagueList(this.$route.params.sclassID, this.currentSubsClass)

    },
    // 主客场
    OnZk () {
      this.LeagueList = [];
      this.getLeagueList(this.$route.params.sclassID, this.currentSubsClass)
      // console.log(this.currentSubsClass)
    },





    // 赔率
    async OnOddsList () {
      // this.OddsValue = this.OddsList[0].companyID
      const res = await this.$http.get('odds/shceduleCompany/');
      if (res.status !== 200) return console.log('赔率列表获取失败');
      // console.log(res.data)
      this.OddsList0 = [];
      this.OddsList1 = [];
      this.OddsList2 = [];

      res.data.forEach(item => {
        if (item.isLetgoal) {
          this.OddsList0.push(item)
        }
      })
      res.data.forEach(item => {
        if (item.isTotalScore) {
          this.OddsList1.push(item)
        }
      })
      res.data.forEach(item => {
        if (item.isStandard) {
          this.OddsList2.push(item)
        }
      })
      // console.log(this.OddsList0, this.OddsList1, this.OddsList2)
      this.OddsList = this.OddsList0;
      this.OddsValue = this.OddsList[0].companyID

      this.OnRadioOdds(1)

    },
    async OnRadioOdds (e) {
      // const res = await this.$http.get('odds/shceduleCompany/');
      // if (res.status !== 200) return console.log('赔率列表获取失败');
      // console.log(res.data)
      // this.OddsList = [];
      if (e == 1) {
        this.OddsList = this.OddsList0;
      } else if (e == 2) {
        this.OddsList = this.OddsList1;
      } else {
        this.OddsList = this.OddsList2;
      }
      // // 清空数据
      // this.oddsLists = [];
      // this.OddsValue = this.OddsList[0].companyID
      // console.log(res.data)
      this.OnOdds(this.scheduleIDlist, this.OddsValue, e)
    },
    // 点击公司
    OnItemOddsList (e) {
      // console.log(e)
      // 清空数据
      this.oddsLists = [];

      this.OddsValue = e;
      this.OnOdds(this.scheduleIDlist, e, this.radioOdds)
    },
    //  赔率函数
    async OnOdds (scheduleIDs, companyID, oddsType) {
      let obj = { scheduleIDs, companyID, oddsType }
      if (!scheduleIDs) {
        obj.scheduleIDs = this.scheduleIDlist
      }
      if (!companyID) {
        obj.companyID = this.OddsValue
      }
      if (!oddsType) {
        obj.oddsType = this.radioOdds
      }
      if (obj.scheduleIDs.length == 0 || obj.companyID.length || obj.oddsType.length) return
      const res = await this.$http.get('odds/shceduleOdds/', { params: obj });
      if (res.status !== 200) return console.log('赔率数据获取失败');
      // console.log(res.data.oddsList)
      //  亚指判断
      let YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      let YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      let YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];
      if (oddsType == 1 || this.radioOdds == 1) {
        res.data.oddsList.forEach(item => {
          item.firstGoal = this.Goal2GoalCn(item.firstGoal, YzStyle, YzStyle3, YzStyle2)
        })
      }



      this.oddsLists = res.data.oddsList


    },
    Goal2GoalCn (firstGoal, YzStyle, YzStyle3, YzStyle2) { //数字盘口转汉汉字	
      if (firstGoal == null || firstGoal + "" == "")
        return "";
      else {
        if (firstGoal > 10 || firstGoal < -10) return firstGoal + "球";
        if (firstGoal >= 0) return YzStyle[parseInt(firstGoal * 4)];
        else return "受" + YzStyle[Math.abs(parseInt(firstGoal * 4))];
      }
    }

  }
}
</script>



<style lang = 'less' scoped >
/* 二级联赛样式 */
.el-tabs--border-card {
  height: 40px;
  overflow: hidden;
}

.xiaozu {
  padding: 20px;
  .el-tag {
    cursor: pointer;
    margin: 0 6px;
  }
}

/* 右边 */
.league_box_right {
  width: 940px;
  background: #fff;
  .top {
    text-align: center;
    h2 {
    }
    .el-select {
      width: 120px;
      .el-option {
      }
    }
    .table_box {
      /* margin-top: -30px; */
      /* 伦次分页 */
      .table_FenYe {
        background: #f3f4ef;
        a {
          display: inline-block;
          width: 100%;
          height: 23px;
          box-sizing: border-box;
          &:hover {
            border-bottom: 2px solid #3680d8;
          }
        }
        .atv {
          border-bottom: 2px solid #3680d8;
          color: #3680d8;
        }
      }
      /* 轮次内容 */
      .table_NeiRong {
        td {
          a {
            &:hover {
              color: #3680d8;
            }
          }
        }
        tr {
          height: 30px;
          font-size: 14px;
          &:nth-child(2n) {
            background: #f7f7f7;
          }
        }
        .table_NeiRong_one {
          background: #fff;
          font-size: 18px;
          height: 50px;
        }
        .table_NeiRong_two {
          &:hover {
            background: #f3f4ef;
          }
        }
      }
    }
  }
  .bottom {
    text-align: center;
    .active_red {
      background: #ff0000;
    }
    .active_green {
      background: #00c1a3;
    }
    .active_grey {
      background: #999999;
    }
    /* 底部简介信息 */
    .jianj {
      padding: 20px;
      background: #f8f8f8;
      font-size: 14px;
      font-weight: 600;
      .icon_tit {
        display: flex;
      }
      .tit {
        flex-flow: column;
        align-items: flex-start;
        p {
          font-weight: 600;
          a {
            &:hover {
              color: #3680d8;
            }
          }
        }
      }
      div {
        display: flex;
        align-items: center;
        i {
          width: 50px;
          height: 20px;
          display: inline-block;
          margin: 10px;
        }
      }
    }
    h2 {
    }
    .el-select {
      width: 120px;
    }
    .table_NeiRong {
      tr {
        height: 30px;
        font-size: 14px;
      }
      .table_NeiRong_one {
        background: #fff;
        font-size: 18px;
        height: 50px;
        background: #f7f7f7;
      }
      .table_NeiRong_two {
        td {
          border-bottom: 1px solid #f3f4ef !important;
          a {
            &:hover {
              color: #3680d8;
            }
          }
        }
        &:hover {
          background: #f3f4ef;
        }
      }
    }
  }
}

.peilv {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: 6px 0;
  .el-radio {
    margin-right: 10px !important;
    margin-bottom: 6px;
  }
  .el-radio-group {
    display: flex;
    justify-content: center;
  }
  .el-select--mini {
    margin: 0 !important;
  }
}
</style>