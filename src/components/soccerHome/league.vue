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
        <h2>
          <b>{{sclassName}}</b>
        </h2>
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
          <el-tab-pane :label="item.subSclassName"
                       :name="item.subsclassId+''"
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
              <td width="15%">
                <b>时间</b>
              </td>
              <td width="20%">
                <b>主队</b>
              </td>
              <td width="10%">
                <b>比分</b>
              </td>
              <td width="20%">
                <b>客队</b>
              </td>
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
              <td width="5%">
                <b>分析</b>
              </td>
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
                  <strong v-if="item.matchState == -1"
                          style="color:#f46859">
                    {{item.homeScore}}-{{item.guestScore}}
                  </strong>
                  <strong v-else>
                    {{zd_stype[item.matchState]}}
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
                             :to="{name:'odds',params:{scheduleID:item.scheduleID}}">欧</router-link>/
                <router-link target="_blank"
                             :to="{name:'history',params:{scheduleID:item.scheduleID}}">析</router-link>
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
        <h2>
          <b>积分榜</b>
        </h2>
        <!-- 赛季选择 -->
        <!-- 积分榜近期状态 -->
        <el-select v-model="
           jF_jQValue
           "
                   v-if="kind == 1"
                   style="margin:10px
           "
                   size="mini
           "
                   :placeholder="jF_jQValue
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
        <el-select v-if="kind == 1"
                   v-model="zKValue
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
           ">
              <b>排名</b>
            </td>
            <td width="
           ">
              <b>球队</b>
            </td>
            <td width="6%
           ">
              <b>场次</b>
            </td>
            <td width="6%
           ">
              <b>胜</b>
            </td>
            <td width="6%
           ">
              <b>平</b>
            </td>
            <td width="6%
           ">
              <b>负</b>
            </td>
            <td width="6%
           ">
              <b>进球</b>
            </td>
            <td width="6%
           ">
              <b>失球</b>
            </td>
            <td width="7%
           ">
              <b>净胜球</b>
            </td>
            <td v-if="kind == 1"
                width="6%
           ">
              <b>胜率</b>
            </td>
            <td v-if="kind == 1"
                width="6%
           ">
              <b>平率</b>
            </td>
            <td v-if="kind == 1"
                width="6%
           ">
              <b>负率</b>
            </td>
            <td v-if="kind == 1"
                width="6%
           ">
              <b>均进</b>
            </td>
            <td v-if="kind == 1"
                width="6%
           ">
              <b>均失</b>
            </td>
            <td width="6%
           ">
              <b>积分</b>
            </td>

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
            <td :style="{'background':item.colors}"
                width="">{{item.rank}}
            </td>
            <td width="">
              <router-link target="_blank"
                           :style="{'color':item.color}"
                           :to="{name:'information',params:{teamID:item.teamID}}">{{item.teamName}}</router-link>
            </td>
            <td>{{item.count}}</td>
            <td>{{item.win_score}}</td>
            <td width="">{{item.flat_score}}
            </td>
            <td width="">{{item.fail_score}}
            </td>
            <td width="">{{item.totalHomeScore}}
            </td>
            <td width="">{{item.totalGutstScore}}</td>
            <td width="">{{item.goalDifference}}</td>
            <td v-if="kind == 1"
                width="">
              <span v-if="isNaN((item.win_score/item.count*100).toFixed(2))">
                0
              </span>
              <span v-else>
                {{(item.win_score/item.count*100).toFixed(2)}}%
              </span>
            </td>
            <td v-if="kind == 1"
                width="">
              <span v-if="isNaN((item.flat_score/item.count*100).toFixed(2))">
                0
              </span>
              <span v-else>
                {{(item.flat_score/item.count*100).toFixed(2)}}%
              </span>
            </td>
            <td v-if="kind == 1"
                width="">
              <span v-if="isNaN((item.fail_score/item.count*100).toFixed(2))">
                0
              </span>
              <span v-else>
                {{(item.fail_score/item.count*100).toFixed(2)}}%
              </span>
            </td>
            <td v-if="kind == 1"
                width="">
              <span v-if="isNaN((item.totalHomeScore/item.count).toFixed(1))">
                0
              </span>
              <span v-else>
                {{(item.totalHomeScore/item.count).toFixed(1)}}
              </span>
            </td>
            <td v-if="kind == 1"
                width="">
              <span v-if="isNaN((item.totalGutstScore/item.count).toFixed(1))">
                0
              </span>
              <span v-else>
                {{(item.totalGutstScore/item.count).toFixed(1)}}
              </span>
            </td>

            <td width="">{{item.score}}</td>

          </tr>

        </table>
        <div class="jianj">
          <div class="icon_tit"
               v-if="color_data">
            <div v-for="(item,i) in color_data"
                 :key="i">
              <i :style="{'background':item.color}"></i>{{item.qualify}}</div>
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
          <div v-if="violationsLists">{{violationsLists}}</div>

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
      // 联赛杯赛
      kind: '',
      // 26英文字母
      A_Z: [],
      // 二级联赛ID
      subsClassID: '',
      // 是否二级联赛
      subsClassList: [],
      // 当前二级联赛名字
      subSclassName: '',
      // 二级联赛首选项
      currentSubsClass: "",
      // 分组赛
      groupList: [],
      // 小组id
      xiaozuID: '',
      fzdata: [],
      // 当前点击的小组
      xiaozuItemType: '',
      // 积分榜数据
      LeagueList: [],
      // 升降级
      color_data: [],
      // 所有球队
      allTeam: [],
      // 积分榜近期状态
      League_jfList: [
        {
          label: 1,
          value: '积分榜'
        },
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
      violationsList: [],
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
      // 判断字段
      zd_stype: {},
      violationsLists: ''
    };
  },

  watch: {
    '$route' (to, from) {
      this.$router.go(0);
    }
  },
  // 初始数据
  created () {

    // 赛事积分
    if (this.$route.params.sclassID == sessionStorage.getItem('sclassID')) {
      this.seasonListValue = sessionStorage.getItem('matchSeason')
      this.distance(sessionStorage.getItem('matchSeason'))
    } else {
      this.distance()
    }

    this.zd_stype = { '0': '未开', '1': '上半场', '2': '中场', '3': '下半场', '4': '加时', '5': '点球', '-1': '完场', '-10': '取消', '-11': '待定', '-12': '腰斩', '-13': '中断', '-14': '推迟' }

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
    // 赛程初始数据
    async distance (curr_season, subsclassId) {

      if (curr_season) {
        // 时间存储
        sessionStorage.setItem('matchSeason', curr_season)
        var res = await this.$http.get(`/soccer/sclass/${this.$route.params.sclassID}/schedule/`, { params: { matchSeason: curr_season } });
      } else {
        var res = await this.$http.get(`/soccer/sclass/${this.$route.params.sclassID}/schedule/`);
        sessionStorage.setItem('matchSeason', res.data.sclass_data.curr_season)
      }

      // 联赛介绍
      this.sclass_rule = res.data.sclass_data.sclass_rule
      // 联赛标题
      this.sclassName = res.data.sclass_data.sclassName
      // 赛季时间数组
      this.seasonList = res.data.sclass_data.seasonList
      // 赛程数组
      this.match_list = res.data.match_list
      // 联赛杯赛
      this.kind = res.data.sclass_data.kind
      // 积分榜
      this.leagues_data = res.data.sclass_data.leagues_data
      if (this.leagues_data.length == 0) {
        this.leagues_data = { all_score: [], color_data: [], guest_score: [], home_score: [], koufen: {} }

      }
      // 升降级颜色
      this.color_data = res.data.sclass_data.leagues_data.color_data

      // 浏览器储存
      sessionStorage.setItem('sclassID', this.$route.params.sclassID)
      sessionStorage.setItem('sclassName', this.sclassName)
      sessionStorage.setItem('sclass_rule', this.sclass_rule)
      // 26 个英文字母
      let A_Z = [];
      for (var i = 65; i < 91; i++) {
        A_Z.push(String.fromCharCode(i) + "");
      }
      this.A_Z = A_Z
      // 判断二级联赛
      if (res.data.sclass_data.subsclass_data.length) {
        // 二级联赛数组
        this.subsClassList = res.data.sclass_data.subsclass_data
        // 初始
        var round_ej = this.subsClassList[this.subsClassList.length - 1]
        this.currentSubsClass = `${this.subsClassList[this.subsClassList.length - 1].subsclassId}`
        // 数组分页
        this.onCount_round(round_ej.count_round, round_ej.curr_round)
        // 最新一轮
        this.paginAtv = round_ej.curr_round;
        this.subSclassName = round_ej.subSclassName
        //  联赛杯赛初始
        if (this.kind == 1) {
          this.MatchList = this.match_list.filter(item => item.subSclassName == round_ej.subSclassName)
          if (round_ej.count_round) {
            this.OnPaging(round_ej.curr_round)
          }

          // 积分榜
          this.leagues_data.forEach(item => {
            if (item.subclassId == this.currentSubsClass) {
              this.LeagueLists = item.leagues_list
              this.LeagueList = this.LeagueLists.all_score
              this.color_data = item.leagues_list.color_data
            }
          })
          //  升降级颜色
          function colors (list1, list2) {
            list1.forEach(items => {
              list2.forEach(item => {
                items.rank_data.forEach(it => {
                  if (item.rank == it) {
                    item.colors = items.color
                  }
                })
              })
            })
          }
          try {
            colors(this.color_data, this.LeagueLists.all_score)
            colors(this.color_data, this.LeagueLists.guest_score)
            colors(this.color_data, this.LeagueLists.home_score)
          } catch (err) {
          }
        } else {
          var round_ej = this.subsClassList.find(item => {
            return item.subsclassId == this.subsClassList[this.subsClassList.length - 1].subsclassId
          })

          // 是否分组
          if (round_ej.groupnum) {
            this.groupList = this.A_Z.slice(0, round_ej.groupnum)
            this.xiaozuItemType = 'A'
            this.MatchList = this.match_list.filter(item => item.grouping2 == this.xiaozuItemType)
          } else {
            this.groupList = []
            this.subSclassName = round_ej.subSclassName
            this.MatchList = this.match_list.filter(item => item.grouping == round_ej.subSclassName)
          }
          // 积分榜
          if (this.leagues_data.length) {
            this.fzdata = this.leagues_data.find(item => item.subclassId == round_ej.subsclassId)
            if (this.fzdata) {
              this.fzdata.leagues_list.forEach((items, index) => {
                items.LeagueList = []
                items.league.forEach((item, i) => {
                  items.LeagueList.push({ rank: item[0], teamID: item[1], teamName: item[2], count: item[3], win_score: item[4], flat_score: item[5], fail_score: item[6], totalHomeScore: item[7], totalGutstScore: item[8], goalDifference: item[9], score: item[10] })
                })
              })
              this.LeagueList = this.fzdata.leagues_list[0].LeagueList
              this.linecount = this.fzdata.leagues_list[0].linecount
              // 文字说明
              this.violationsLists = '备注：有颜色球队表示已出线球队'
              if (this.fzdata.leagues_list[0].linecount) {
                for (let i = 0; i < this.fzdata.leagues_list[0].linecount; i++) {
                  this.LeagueList[i].color = 'red'
                }
              }
            }
          }

          // 获取赔率id
          this.peilv()
        }
        // 文字说明
        if (this.LeagueLists) {
          this.violationsList = [...Object.values(this.LeagueLists.koufen)]
        }
      } else {
        // 不是二级联赛
        // 分上下页
        this.onCount_round(res.data.sclass_data.count_round, res.data.sclass_data.curr_round)
        // 赛程数据
        this.MatchList = this.onMatchList(this.match_list, this.paginAtv)
        // 文字说明
        if (this.leagues_data.koufen) {
          this.violationsList = [...Object.values(this.leagues_data.koufen)]
        }





        // 获取赔率id
        // 获取赔率id
        this.peilv()
        // 积分榜
        this.LeagueList = this.leagues_data.all_score
        //  升降级颜色
        function colors (list1, list2) {
          if (list1) {
            list1.forEach(items => {
              list2.forEach(item => {
                items.rank_data.forEach(it => {
                  if (item.rank == it) {
                    item.colors = items.color
                  }
                })
              })
            })
          }

        }
        colors(this.color_data, this.leagues_data.all_score)
        colors(this.color_data, this.leagues_data.guest_score)
        colors(this.color_data, this.leagues_data.home_score)
      }
    },
    // 二级联赛
    handleClick (tab, event) {
      // 找到对应的联赛数组
      var round_ej = this.subsClassList.find(item => {
        return item.subsclassId == tab.name
      })
      this.LeagueList = []
      if (this.kind == 1) {
        // 数组分页
        this.onCount_round(round_ej.count_round, round_ej.curr_round)
        // 最新一轮
        this.paginAtv = round_ej.curr_round;
        this.subSclassName = round_ej.subSclassName
        this.MatchList = this.match_list.filter(item => item.subSclassName == round_ej.subSclassName)


        if (round_ej.curr_round) {
          this.OnPaging(round_ej.curr_round)
        }


        // 积分榜
        this.LeagueList = []

        // 积分榜
        this.leagues_data.forEach(item => {
          if (item.subclassId == this.currentSubsClass) {
            this.LeagueLists = item.leagues_list
            this.LeagueList = this.LeagueLists.all_score
            this.color_data = item.leagues_list.color_data
          }
        })

        //  升降级颜色
        function colors (list1, list2) {
          list1.forEach(items => {
            list2.forEach(item => {
              items.rank_data.forEach(it => {
                if (item.rank == it) {
                  item.colors = items.color
                }
              })
            })
          })
        }
        try {
          colors(this.color_data, this.LeagueLists.all_score)
          colors(this.color_data, this.LeagueLists.guest_score)
          colors(this.color_data, this.LeagueLists.home_score)
        } catch (err) {
        }


      } else {

        // 是否分组
        if (round_ej.groupnum) {
          this.groupList = this.A_Z.slice(0, round_ej.groupnum)
          this.xiaozuItemType = 'A'
          this.MatchList = this.match_list.filter(item => item.grouping2 == this.xiaozuItemType)
          // 文字说明
          this.violationsLists = '备注：有颜色球队表示已出线球队'
        } else {
          this.groupList = []
          this.subSclassName = round_ej.subSclassName
          this.MatchList = this.match_list.filter(item => item.grouping == round_ej.subSclassName)
          // 文字说明
          this.violationsLists = ''
        }

        // 积分榜
        if (this.leagues_data.length) {
          this.fzdata = this.leagues_data.find(item => item.subclassId == round_ej.subsclassId)
          if (this.fzdata) {
            this.fzdata.leagues_list.forEach((items, index) => {
              items.LeagueList = []
              items.league.forEach((item, i) => {
                items.LeagueList.push({ rank: item[0], teamID: item[1], teamName: item[2], count: item[3], win_score: item[4], flat_score: item[5], fail_score: item[6], totalHomeScore: item[7], totalGutstScore: item[8], goalDifference: item[9], score: item[10] })
              })
            })
            this.LeagueList = this.fzdata.leagues_list[0].LeagueList
            this.linecount = this.fzdata.leagues_list[0].linecount
            if (this.fzdata.leagues_list[0].linecount) {
              for (let i = 0; i < this.fzdata.leagues_list[0].linecount; i++) {

                this.LeagueList[i].color = 'red'
              }
            }

          }
        }

        // 获取赔率id
        this.peilv()

      }
    },
    // 小组赛
    Onxiaoz (index) {
      this.xiaozuItemType = index
      this.MatchList = this.match_list.filter(item => item.grouping2 == index)
      // 获取赔率id
      this.peilv()
      this.LeagueList = this.fzdata.leagues_list.find(item => item.grouping == index).LeagueList
      if (this.fzdata.leagues_list.find(item => item.grouping == index).linecount) {
        for (let i = 0; i < this.fzdata.leagues_list.find(item => item.grouping == index).linecount; i++) {
          this.LeagueList[i].color = 'red'
        }
      }


    },


    // 赛程数据
    onMatchList (list, round) {
      return list.filter(item => {
        return item.round == round
      })
    },
    // 数组分页
    onCount_round (count_round, curr_round) {
      this.pagingUp = 0
      this.pagingDown = 0
      if (count_round) {
        if (count_round % 2 === 0) {
          this.pagingUp = count_round / 2;
          this.pagingDown = count_round / 2;
        } else {
          this.pagingUp = Math.floor(count_round / 2)
          this.pagingDown = Math.ceil(count_round / 2)
        }
        this.paginAtv = curr_round;
      }
    },

    // 轮次选择
    OnPaging (index) {
      if (this.subSclassName) {
        this.MatchList = this.match_list.filter(item => item.round == index && item.subSclassName == this.subSclassName)
      } else {
        this.MatchList = this.onMatchList(this.match_list, index)
      }
      this.paginAtv = index
      // 获取赔率id
      this.peilv()
    },
    // 赛季选择
    Onseason () {
      this.distance(this.seasonListValue)
      this.subsClassList = []

      // 积分榜
      this.LeagueList = []
      this.zKValue = '全部场地'

      //  小组赛空
      this.groupList = []
      // 文字说明
      this.violationsList = []
    },


    peilv () {
      // 获取赔率id
      let scheduleIDlist = []
      this.MatchList.forEach(item => {
        scheduleIDlist.push(item.scheduleID)
      })
      this.scheduleIDlist = scheduleIDlist.join(",")
      // this.OnOddsList()
      this.OnRadioOdds(1)
      // 赔率类型
      this.radioOdds = 1
    },

    // 赔率
    async OnOddsList () {
      const res = await this.$http.get('odds/shceduleCompany/');
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
      this.OddsList = this.OddsList0;
      this.OddsValue = this.OddsList[0].companyID

      // this.OnRadioOdds(1)

    },
    async OnRadioOdds (e) {
      if (e == 1) {
        this.OddsList = this.OddsList0;
      } else if (e == 2) {
        this.OddsList = this.OddsList1;
      } else {
        this.OddsList = this.OddsList2;
      }
      // // 清空数据
      this.OnOdds(this.scheduleIDlist, this.OddsValue, e)
    },
    // 点击公司
    OnItemOddsList (e) {
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
    },


    // 积分榜
    OnZk () {
      if (this.subsClassList.length) {
        let leagues_list = this.leagues_data.find(item => item.subclassId == this.currentSubsClass)
        if (this.zKValue == '主场') {
          this.LeagueList = leagues_list.leagues_list.home_score
        } else if (this.zKValue == '客场') {
          this.LeagueList = leagues_list.leagues_list.guest_score
        } else {
          this.LeagueList = leagues_list.leagues_list.all_score
        }

      } else {
        if (this.zKValue == '主场') {
          this.LeagueList = this.leagues_data.home_score
        } else if (this.zKValue == '客场') {
          this.LeagueList = this.leagues_data.guest_score
        } else {
          this.LeagueList = this.leagues_data.all_score
        }
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