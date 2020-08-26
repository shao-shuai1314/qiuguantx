<template>
  <!-- 主场球路-->
  <div class="qiululist">
    <table cellspacing="0"
           cellpadding="0"
           width="1160px"
           align="center"
           border="0"
           style="margin:10px 0">
      <tr>
        <td :colspan="homeSchedule.length+1"
            style="font-weight: 600;background-color: #83A2CA;">
          <h1 style="line-height:40px">
            <b class="fl"
               style="margin-left:10px">{{matchSeason}}赛季
              <span style="color:#fff">({{homeTeamName}})</span>球路走势图</b>
            <span class="fr"
                  style="font-size:14px;color: #f00;margin-right:10px">
              <b>说明：所分析的球队比分在前，▲表示主场，●表示客场</b>
            </span>
          </h1>
        </td>
      </tr>
      <tr align="center">
        <td style="white-space:nowrap;padding:0 6px;">
          <b>全</b>
        </td>
        <td style="white-space:nowrap;"
            v-for="(item,i) in homeSchedule"
            :key="i">
          <router-link target="_blank"
                       :to="{name:'history',params:{scheduleID:item.scheduleID}}">
            <span v-if="item.matchState == '-1'">
              <span v-if="item.hometeamID == hometeamID">{{item.homeScore}}-{{item.guestScore}}</span>
              <span v-else>{{item.guestScore}}-{{item.homeScore}}</span>
            </span>
            <span v-else
                  class="he_sp">
              <span v-if="item.hometeamID == hometeamID">
                <el-image src="../../static/sj.png"></el-image>
              </span>
              <span v-else-if="item.hometeamID != hometeamID">
                <el-image src="../../static/yuan.png"></el-image>
              </span>
            </span>
          </router-link>
        </td>
      </tr>
      <tr align="center">
        <td>
          <div class="teamtxt">
            <b>对手</b>
          </div>
        </td>
        <td v-for="(item,i) in homeSchedule"
            :key="i">
          <div class="teamtxt active_jl_dd">
            <span v-if="item.hometeamID == hometeamID">
              {{item.guestTeamName}}
            </span>
            <span v-else>
              {{item.homeTeamName}}
            </span>
            <router-link target="_blank"
                         class="active_jl"
                         v-if='item.coachID!="未知"'
                         :to="{name:'playerDetails',params:{playerID:item.coachID}}">{{item.coachName}}</router-link>

          </div>
        </td>

      </tr>
      <tr align="center">
        <td>
          <b>轮</b>
        </td>
        <td v-for="(item,i) in homeSchedule"
            :key="i">{{i+1}}</td>
      </tr>
      <tr>
        <td class="spf">
          <b>胜</b>
          <b>平</b>
          <b>负</b>
        </td>
        <td :colspan="homeSchedule.length"
            class="zk_td">
          <div class="zk_box">
            <div class="zk_div"
                 :style="{'width':this.tdLengthZ+'px'}">
              <p class="zk_p"
                 :class="item.num == 0?'zk_p0':''"
                 :style="{'margin-top':item.num == 2?'-40px':''}"
                 v-for="(item,i) in homeSchedule"
                 :key="i">

                <span v-if="item.matchState == '-1'">
                  <span class="zk_span zhuchang"
                        v-if="item.hometeamID == hometeamID">
                    <el-image src="../../static/sj.png"></el-image>
                  </span>
                  <span class="zk_span kechang"
                        v-else>
                    <el-image src="../../static/yuan.png"></el-image>
                  </span>
                </span>
                <span class="zk_span"
                      v-else></span>
              </p>
            </div>
          </div>
          <div id="main"
               style="height:130px;"></div>
        </td>
      </tr>
    </table>
    <!-- ----------------------------------------------------------? -->
    <!-- 客场球路 -->
    <table cellspacing="0"
           cellpadding="0"
           width="1160px"
           align="center"
           border="0"
           style="margin:10px 0">
      <tr>
        <td :colspan="guestSchedule.length+1"
            style="font-weight: 600;background-color: #83A2CA;">
          <h1 style="line-height:40px">
            <b class="fl"
               style="margin-left:10px">{{matchSeason}}赛季
              <span style="color:#fff">({{guestTeamName}})</span>球路走势图</b>
            <span class="fr"
                  style="font-size:14px;color: #f00;margin-right:10px">
              <b>说明：所分析的球队比分在前，▲表示主场，●表示客场</b>
            </span>
          </h1>

        </td>
      </tr>
      <tr align="center">
        <td style="white-space:nowrap;padding:0 6px;">
          <b>全</b>
        </td>
        <td style="white-space:nowrap;"
            v-for="(item,i) in guestSchedule"
            :key="i">
          <router-link target="_blank"
                       :to="{name:'history',params:{scheduleID:item.scheduleID}}">
            <span v-if="item.matchState == '-1'">
              <span v-if="item.hometeamID == guestteamID">{{item.homeScore}}-{{item.guestScore}}</span>
              <span v-else>{{item.guestScore}}-{{item.homeScore}}</span>
            </span>
            <span v-else
                  class="he_sp">
              <span v-if="item.hometeamID == guestteamID">
                <el-image src="../../static/sj.png"></el-image>
              </span>
              <span v-else-if="item.hometeamID != guestteamID">
                <el-image src="../../static/yuan.png"></el-image>
              </span>
            </span>
          </router-link>
        </td>
      </tr>
      <tr align="center">
        <td>
          <div class="teamtxt">
            <b>对手</b>
          </div>
        </td>
        <td v-for="(item,i) in guestSchedule"
            :key="i">
          <div class="teamtxt active_jl_dd">
            <span v-if="item.hometeamID == guestteamID">{{item.guestTeamName}}</span>
            <span v-else>{{item.homeTeamName}}</span>
            <router-link target="_blank"
                         class="active_jl"
                         v-if='item.coachID!="未知"'
                         :to="{name:'playerDetails',params:{playerID:item.coachID}}">{{item.coachName}}</router-link>
          </div>
        </td>

      </tr>
      <tr align="center">
        <td>
          <b>轮</b>
        </td>
        <td v-for="(item,i) in guestSchedule"
            :key="i">{{i+1}}</td>

      </tr>

      <tr>
        <td class="spf">
          <b>胜</b>
          <b>平</b>
          <b>负</b>
        </td>
        <td :colspan="guestSchedule.length"
            class="zk_td">

          <div class="zk_box">
            <div class="zk_div"
                 :style="{'width':this.tdLengthK+'px'}">
              <p class="zk_p"
                 :class="item.num == 0?'zk_p0':''"
                 :style="{'margin-top':item.num == 2?'-40px':''}"
                 v-for="(item,i) in guestSchedule"
                 :key="i">
                <span v-if="item.matchState  == '-1'">
                  <span class="zk_span zhuchang"
                        v-if="item.hometeamID == guestteamID">
                    <el-image src="../../static/sj.png"></el-image>
                  </span>
                  <span class="zk_span kechang"
                        v-else>
                    <el-image src="../../static/yuan.png"></el-image>
                  </span>
                </span>
                <span class="zk_span"
                      v-else></span>
              </p>
            </div>
          </div>

          <div id="main1"
               style="width: 1120px;height:130px;"></div>
        </td>
      </tr>
    </table>

    <!-- 主场盘路-->
    <table cellspacing="0"
           cellpadding="0"
           width="1160px"
           align="center"
           border="0"
           style="margin:10px 0">
      <tr>
        <td :colspan="homeSchedule.length+1"
            style="font-weight: 600;background-color: #83A2CA;">
          <h1 style="line-height:40px">
            <b class="fl"
               style="margin-left:10px">{{matchSeason}}赛季
              <span style="color:#fff">({{homeTeamName}})</span>盘路走势图</b>
            <span class="fr"
                  style="font-size:14px;color: #f00;margin-right:10px">
              <b>说明：所分析的球队比分在前，▲表示主场，●表示客场</b>
            </span>
          </h1>
        </td>
      </tr>
      <tr align="center">
        <td style="white-space:nowrap;padding:0 6px">
          <b>全</b>
        </td>
        <td style="white-space:nowrap;"
            v-for="(item,i) in homeSchedule"
            :key="i">
          <span v-if="item.matchState == '-1'">
            <span v-if="item.hometeamID == hometeamID">{{item.homeScore}}-{{item.guestScore}}</span>
            <span v-else>{{item.guestScore}}-{{item.homeScore}}</span>
          </span>
          <span v-else
                class="he_sp">
            <span v-if="item.hometeamID == hometeamID">
              <el-image src="../../static/sj.png"></el-image>
            </span>
            <span v-else-if="item.hometeamID != hometeamID">
              <el-image src="../../static/yuan.png"></el-image>
            </span>
          </span>

        </td>
      </tr>
      <tr align="center">
        <td>
          <div class="teamtxt">
            <b>终盘</b>
          </div>
        </td>
        <td v-for="(item,i) in homeTrends"
            :key="i">
          <div class="teamtxt sss">
            <!-- <span v-if="item.hometeamID == hometeamID">{{item.guestTeamName}}</span>
            <span v-else>{{item.homeTeamName}}</span> -->
            <span class="sz">{{item.goal_real}}</span>
            <p v-if="item.result"
               class="ss">{{item.firstGoal}}</p>
          </div>
        </td>

      </tr>
      <tr align="center">
        <td>
          <div class="teamtxt">
            <b>对手</b>
          </div>
        </td>
        <td v-for="(item,i) in homeSchedule"
            :key="i">
          <div class="teamtxt active_jl_dd">
            <span v-if="item.hometeamID == hometeamID">
              {{item.guestTeamName}}
            </span>
            <span v-else>
              {{item.homeTeamName}}
            </span>
            <router-link target="_blank"
                         class="active_jl"
                         v-if='item.coachID!="未知"'
                         :to="{name:'playerDetails',params:{playerID:item.coachID}}">{{item.coachName}}</router-link>

          </div>
        </td>

      </tr>
      <tr align="center">
        <td>
          <b>轮</b>
        </td>
        <td v-for="(item,i) in homeSchedule"
            :key="i">{{i+1}}</td>

      </tr>

      <tr>
        <td class="spf">
          <b>赢</b>
          <b>走</b>
          <b>输</b>
        </td>
        <td :colspan="homeSchedule.length"
            class="zk_td">
          <div class="zk_box">
            <div class="zk_div"
                 :style="{'width':this.tdLengthK+'px'}">
              <p class="zk_p"
                 :class="item.result == 3?'zk_p0':''"
                 :style="{'margin-top':item.result == 1?'-40px':''}"
                 v-for="(item,i) in homeTrends"
                 :key="i">
                <span v-if="item.result">
                  <span class="zk_span zhuchang"
                        v-if="item.hometeamID == hometeamID">
                    <el-image src="../../static/sj.png"></el-image>
                  </span>
                  <span class="zk_span kechang"
                        v-else>
                    <el-image src="../../static/yuan.png"></el-image>
                  </span>
                </span>
                <span class="zk_span"
                      v-else></span>
              </p>
            </div>
          </div>

          <div id="main2"
               style="width: 1120px;height:130px;"></div>
        </td>
      </tr>
    </table>

    <!-- ----------------------------------------------------------? -->
    <!-- 客场盘路 -->
    <table cellspacing="0"
           cellpadding="0"
           width="1160px"
           align="center"
           border="0"
           style="margin:10px 0">
      <tr>
        <td :colspan="guestSchedule.length+1"
            style="font-weight: 600;background-color: #83A2CA;">
          <h1 style="line-height:40px">
            <b class="fl"
               style="margin-left:10px">{{matchSeason}}赛季
              <span style="color:#fff">({{guestTeamName}})</span>盘路走势图</b>
            <span class="fr"
                  style="font-size:14px;color: #f00;margin-right:10px">
              <b>说明：所分析的球队比分在前，▲表示主场，●表示客场</b>
            </span>
          </h1>
        </td>
      </tr>
      <tr align="center">
        <td style="white-space:nowrap;padding:0 6px">
          <b>全</b>
        </td>
        <td style="white-space:nowrap;"
            v-for="(item,i) in guestSchedule"
            :key="i">
          <span v-if="item.matchState == '-1'">
            <span v-if="item.hometeamID == guestteamID">{{item.homeScore}}-{{item.guestScore}}</span>
            <span v-else>{{item.guestScore}}-{{item.homeScore}}</span>
          </span>
          <span v-else
                class="he_sp">
            <span v-if="item.hometeamID == guestteamID">
              <el-image src="../../static/sj.png"></el-image>
            </span>
            <span v-else-if="item.hometeamID != guestteamID">
              <el-image src="../../static/yuan.png"></el-image>
            </span>
          </span>

        </td>
      </tr>
      <tr align="center">
        <td>
          <div class="teamtxt">
            <b>终盘</b>
          </div>
        </td>
        <td v-for="(item,i) in guestTrends"
            :key="i">
          <div class="teamtxt sss">
            <!-- <span v-if="item.hometeamID == hometeamID">{{item.guestTeamName}}</span>
            <span v-else>{{item.homeTeamName}}</span> -->
            <span class="sz">{{item.goal_real}}</span>
            <p v-if="item.result"
               class="ss">{{item.firstGoal}}</p>
          </div>
        </td>

      </tr>
      <tr align="center">
        <td>
          <div class="teamtxt">
            <b>对手</b>
          </div>
        </td>
        <td v-for="(item,i) in guestSchedule"
            :key="i">
          <div class="teamtxt active_jl_dd">
            <span v-if="item.hometeamID == guestteamID">{{item.guestTeamName}}</span>
            <span v-else>{{item.homeTeamName}}</span>
            <router-link target="_blank"
                         class="active_jl"
                         v-if='item.coachID!="未知"'
                         :to="{name:'playerDetails',params:{playerID:item.coachID}}">{{item.coachName}}</router-link>
          </div>
        </td>

      </tr>
      <tr align="center">
        <td>
          <b>轮</b>
        </td>
        <td v-for="(item,i) in guestSchedule"
            :key="i">{{i+1}}</td>
      </tr>

      <tr>
        <td class="spf">
          <b>胜</b>
          <b>平</b>
          <b>负</b>
        </td>
        <td :colspan="guestSchedule.length"
            class="zk_td">
          <div class="zk_box">
            <div class="zk_div"
                 :style="{'width':this.tdLengthK+'px'}">
              <p class="zk_p"
                 :class="item.result == 3?'zk_p0':''"
                 :style="{'margin-top':item.result == 1?'-40px':''}"
                 v-for="(item,i) in guestTrends"
                 :key="i">
                <span v-if="item.result">
                  <span class="zk_span zhuchang"
                        v-if="item.hometeamID == guestteamID">
                    <el-image src="../../static/sj.png"></el-image>
                  </span>
                  <span class="zk_span kechang"
                        v-else>
                    <el-image src="../../static/yuan.png"></el-image>
                  </span>
                </span>
                <span class="zk_span"
                      v-else></span>
              </p>
            </div>
          </div>

          <div id="main3"
               style="width: 1120px;height:130px;"></div>
        </td>
      </tr>
    </table>
    <!-- ----------------------------------------------------------? -->

  </div>
</template>
<script >
// 导入 1. echarts
import echarts from 'echarts'
export default {
  data () {
    return {
      tdLength: '',
      // 走势图
      // id参数
      scheduleID: '',
      // 时间
      matchSeason: "",
      // 主队id
      hometeamID: '',
      // 客队id
      guestteamID: '',
      // 主场名字
      homeTeamName: '',
      // 客场名字
      guestTeamName: '',
      // 走势list
      homeSchedule: [],
      guestSchedule: [],
      // 主客队长度
      homeScheduleLength: [],
      guestScheduleLength: [],

      // 比分结果
      myChart1_Ylist1: [],
      myChart1_Ylist2: [],

      myChart1_Ylist3: [],
      myChart1_Ylist4: [],

      // 盘路图
      // 盘路list
      homeTrends: [],
      guestTrends: [],


      tdLengthZ: '',
      tdLengthK: '',
    };
  },
  created () {
  },
  mounted () {
    // 掉接口
    this.scheduleID = this.$route.params.scheduleID
    this.OnListG()
  },

  methods: {
    // 亚赔
    Goal2GoalCn (firstGoal, YzStyle, YzStyle3, YzStyle2) { //数字盘口转汉汉字	
      if (firstGoal == null || firstGoal + "" == "")
        return "";
      else {
        if (firstGoal > 10 || firstGoal < -10) return firstGoal + "球";
        if (firstGoal >= 0) return YzStyle[parseInt(firstGoal * 4)];
        else return "受" + YzStyle[Math.abs(parseInt(firstGoal * 4))];
      }
    },

    async OnListG () {
      const res = await this.$http.get('soccer/matchInfo/' + this.scheduleID + '/trends/');
      if (res.status !== 200) return console.log('球队阵容信息取失败');
      // console.log(res.data)
      // this.dataList = res.data
      // 对照参数
      this.matchSeason = res.data.matchInfo.matchSeason
      this.hometeamID = res.data.matchInfo.hometeamID
      this.guestteamID = res.data.matchInfo.guestteamID
      this.homeTeamName = res.data.matchInfo.homeTeamName
      this.guestTeamName = res.data.matchInfo.guestTeamName




      //  亚指判断
      let YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      let YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      let YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];



      //  主场
      res.data.homeTrends.forEach((item, i) => {
        item.index = i + 1
        if (item.matchState == '-1') {
          if (item.hometeamID == this.hometeamID) {
            if (item.homeScore > item.guestScore) {
              item.num = 2
            } else if (item.homeScore == item.guestScore) {
              item.num = 1
            } else {
              item.num = 0
            }
          } else {
            if (item.homeScore > item.guestScore) {
              item.num = 0
            } else if (item.homeScore == item.guestScore) {
              item.num = 1
            } else {
              item.num = 2
            }
          }

          if (item.result) {
            if (item.result == 1) {
              item.ss = 2
            } else if (item.result == 2) {
              item.ss = 1
            } else {
              item.ss = 0
            }
          }
        }

        this.homeScheduleLength.push(i + 1)
        this.myChart1_Ylist1.push(item.num)
        item.firstGoal = this.Goal2GoalCn(item.goal_real, YzStyle, YzStyle3, YzStyle2)
        this.myChart1_Ylist3.push(item.ss)

      })
      // 客场
      res.data.guestTrends.forEach((item, i) => {
        if (item.matchState == '-1') {
          if (item.hometeamID == this.guestteamID) {
            if (item.homeScore > item.guestScore) {
              item.num = 2
            } else if (item.homeScore == item.guestScore) {
              item.num = 1
            } else {
              item.num = 0
            }
          } else {
            if (item.homeScore > item.guestScore) {
              item.num = 0
            } else if (item.homeScore == item.guestScore) {
              item.num = 1
            } else {
              item.num = 2
            }
          }

          if (item.result) {
            if (item.result == 1) {
              item.ss = 2
            } else if (item.result == 2) {
              item.ss = 1

            } else {
              item.ss = 0
            }
          }

        }



        this.guestScheduleLength.push(i + 1)
        this.myChart1_Ylist2.push(item.num)
        item.firstGoal = this.Goal2GoalCn(item.goal_real, YzStyle, YzStyle3, YzStyle2)
        this.myChart1_Ylist4.push(item.ss)
      })
      // console.log(res.data.guestTrends, 111)
      // ----------------------------------------------------------------------------------图表区

      // 主场客场走势图
      this.homeSchedule = res.data.homeTrends

      this.guestSchedule = res.data.guestTrends

      // 主客场盘路
      this.homeTrends = res.data.homeTrends
      this.guestTrends = res.data.guestTrends



      // 3基于准备好的dom，初始化echarts实例
      var myChart1 = echarts.init(document.getElementById('main'));
      var myChart2 = echarts.init(document.getElementById('main1'));
      var myChart3 = echarts.init(document.getElementById('main2'));
      var myChart4 = echarts.init(document.getElementById('main3'));


      // 设置长度
      // td长度
      // console.log((1160 / (res.data.allSchedule.homeSchedule.length + 1)).toFixed(2))
      this.tdLengthZ = 1160 - Math.floor(1160 / (res.data.homeTrends.length - 1))
      this.tdLengthK = 1160 - Math.floor(1160 / (res.data.guestTrends.length - 1))


      document.getElementById('main').style.width = this.tdLengthZ + 'px';
      document.getElementById('main1').style.width = this.tdLengthK + 'px';
      document.getElementById('main2').style.width = this.tdLengthZ + 'px';
      document.getElementById('main3').style.width = this.tdLengthK + 'px';

      myChart1.resize();
      myChart2.resize();
      myChart3.resize();
      myChart4.resize();





      // 轮次数据
      var myChart_lunci1 = this.homeScheduleLength
      var myChart_lunci2 = this.guestScheduleLength

      // 盘路
      var myChart_lunci3 = this.homeScheduleLength
      var myChart_lunci4 = this.guestScheduleLength



      // y轴胜平负
      var myChart1_Ylist1 = this.myChart1_Ylist1
      var myChart1_Ylist2 = this.myChart1_Ylist2

      // 盘路
      var myChart1_Ylist3 = this.myChart1_Ylist3
      var myChart1_Ylist4 = this.myChart1_Ylist4


      let jLlint = [], jLlint1 = [], jLlint2 = [], jLlint3 = []
      this.xxList(res.data.home_coach, this.homeSchedule, jLlint)
      this.xxList(res.data.guest_coach, this.guestSchedule, jLlint1)



      var myChart1_jiaolian1 = jLlint
      var myChart1_jiaolian2 = jLlint1





      this.aa(myChart1, myChart_lunci1, myChart1_Ylist1, jLlint)
      this.aa(myChart2, myChart_lunci2, myChart1_Ylist2, jLlint1)
      // 盘路
      this.aa(myChart3, myChart_lunci3, myChart1_Ylist3, jLlint)
      this.aa(myChart4, myChart_lunci4, myChart1_Ylist4, jLlint1)

    },
    // 教练信息
    xxList (coachList, Schedule, jLlint) {
      coachList.forEach((item, i) => {
        Schedule.forEach(it => {
          if (it.coachID == item.playerId) {
            it.index1 = i
          }
        })
        jLlint[i] = []
        jLlint[i].push({}, {})
        jLlint[i][0].name = item.coachName
        jLlint[i][0].xAxis = `${this.kjfn(Schedule, i)[0] + 1}`
        jLlint[i][1].xAxis = `${this.kjfn(Schedule, i)[1] + 1}`

        jLlint[i][0].url = item.playerId
        //  随机颜色
        jLlint[i][0].itemStyle = { color: `rgba(${Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256)},0.5)` }

      })

    },

    // 轮次筛选
    kjfn (nums, target) {
      var arr = [];
      for (let i = 0; i < nums.length; i++) {
        if (nums[i].index1 == target) {
          arr.push(i)
        }
      }
      if (arr.length < 1) {
        return [-1, -1]
      }
      else if (arr.length < 2) {
        return [arr[0], arr[0]]
      }
      return [arr[0], arr[arr.length - 1]]
    },

    // 图表
    aa (echarts_name, lunci, Ylist, jiaolianList) {

      //4. 指定图表的配置项和数据
      var option = {

        // 固定高度
        "grid": { "left": "-10px", "right": "10px", "bottom": "10px", "containLabel": true, "height": 100, },
        // x设置
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: lunci
        },
        // y设置
        yAxis: {
          type: 'category',
          boundaryGap: false,
          splitLine: { show: true },
          axisLine: { onZero: false },
          axisLine: { show: false },
          axisTick: { show: false },
          data: [0, 1, 2]
        },
        series: [
          {
            type: 'line',
            data: Ylist,
            symbol: 'none',
            symbolSize: 10,

            itemStyle: {
              borderColor: '#000',
              color: '#000'
            },
            markArea: {
              data: jiaolianList
            }
          }
        ]
      };
      //5. 使用刚指定的配置项和数据显示图表。
      echarts_name.setOption(option);
      echarts_name.on("click", function (e) {
        if (e.data.url) {

          window.open(`http://qiuguantx.com/#/soccer/team/player/${e.data.url}`)
          window.isCancel=true;
        }
        // console.log(`http://192.168.3.51:8080/#/soccer/team/playerDetails/${e.data.url}`)
        

      })
    }

  }
}
</script>
<style lang = 'less' scoped >
table {
  border: 1px solid #689ede;
  text-align: center;
  color: #474747;
  border-collapse: separate;
  background-color: #ebf8ff;
}
.qiululist {
  /* margin-left: -1160px;
  -webkit-transform: translateX(20px);
  transform: translateX(50%); */
}
tr {
  background-color: #ebf8ff;
  font-size: 12px;
}
.qiululist td {
  /* text-align: center; */
  word-wrap: break-word;
  white-space: normal;
}
td,
th {
  height: 27px;
  line-height: 27px;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: normal;
  /* border-left: 1px solid #73b1ec; */
  border-bottom: 1px solid #d5e4f5;
  border-top: 1px solid #d5e4f5;
}
td {
  width: 30px;
  &:hover .ss {
    display: block;
  }
}
td div {
  margin: 0 auto;
  width: 13px;
  word-wrap: break-word;
  white-space: normal;
  line-height: 15px;
  padding: 10px 0;
}
.spf {
  height: 106px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 18px;
}
.sz {
  width: 8px;
  display: block;
  margin: 0 auto;
  line-height: 24px;
  font-size: 12px;
  word-wrap: break-word;
}
.sss {
  position: relative;
}
.ss {
  word-wrap: normal;
  width: 56px;
  padding: 6px 10px;
  position: absolute;
  top: 60%;
  right: 8px;
  border: 1px solid #689ede;
  background: #eee;
  display: none;
  z-index: 999;
}

.zk_box {
  width: 100%;
height: 150px;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
}
.zk_td {
  /* width: 100%; */
  position: relative;
  .zk_div {
    width: 100%;
    display: flex;
    position: absolute;
        bottom: 36%;
    /* margin-bottom: -22px; */
    left: -2px;
    /* z-index: 9; */
    justify-content: space-between;
    .zk_p {
      position: relative;
      z-index: 99;
          left: 0;
      .zk_span {
        display: flex;
        width: 16px;
        height: 16px;
        align-items: center;
        justify-content: center;
        /* background: #474747; */
        .el-image {
          width: 100%;
        }
      }
    }
    .zk_p0 {
      position: relative;
      bottom: -40px;
      left: 0;
    }
  }
}

.he_sp {
  span {
    display: flex;
    align-items: center;
  }
}
a {
  display: block;
  width: 100%;
  &:hover {
    color: #409eff;
  }
}

.active_jl {
  display: none;
  position: absolute;
  top: 20px;
  padding: 4px;
  background: #fff;
  right: 12px;
  z-index: 99;
}
.active_jl_dd {
  position: relative;
  &:hover .active_jl {
    display: block;
  }
}
</style>