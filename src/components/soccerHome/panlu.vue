<template>

  <!-- 球路-->
  <div class="qiululist"
       style="overflow:auto">
    <!-- <div v-if="!dataLists.length">暂没数据</div> -->
    <table cellspacing="0"
           cellpadding="0"
           width="1160px"
           align="center"
           border="0"
           style="margin:10px 0"
           v-for="(items,indexs) in dataLists.slice(0,num)"
           :key="indexs">
      <tr>
        <td :colspan="items.qiulu.length+1"
            style="font-weight: 600;background-color: #83A2CA;">
          <h2 style="font-weight: 600;padding:10px 0">{{matchSeason}}赛季
            <span style="color:#fff">({{items.teamName}})</span>球路走势图</h2>
          <span style="margin-right:-170px">
            排名:{{items.rank}} &nbsp;&nbsp;&nbsp;&nbsp; 总分:{{items.allScore}} &nbsp;&nbsp;&nbsp;&nbsp;比赛次数:{{items.allCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进球:{{items.totalHomeScore}}&nbsp;&nbsp;&nbsp;&nbsp; 失球:{{items.totalGutstScore}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{items.win_score}}胜&nbsp;&nbsp;&nbsp; {{items.flat_score}}平&nbsp;&nbsp;&nbsp; {{items.fail_score}}负 </span>
          <span class="fr"
                style="display:flex;align-items:center;color: #f00;margin-right:10px">
            说明：
            <el-image src="/static/sj.png"></el-image>表示主场
            <el-image src="/static/yuan.png"></el-image>表示客场
          </span>
        </td>
      </tr>
      <tr align="center">
        <td style="white-space:nowrap;padding:0 6px">全</td>
        <td style="white-space:nowrap;"
            v-for="(item,i) in items.qiulu"
            :key="i">
          <span v-if="item.result">
            <span v-if="item.hometeamID == items.teamID">{{item.homeScore}}-{{item.guestScore}}</span>
            <span v-else>{{item.guestScore}}-{{item.homeScore}}</span>
          </span>
          <span v-else
                class="he_sp">
            <span v-if="item.hometeamID == items.teamID">
              <el-image src="/static/sj.png"></el-image>
            </span>
            <span v-else-if="item.hometeamID != teamID">
              <el-image src="/static/yuan.png"></el-image>
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
        <td v-for="(item,i) in items.qiulu"
            :key="i">
          <div class="teamtxt sss">
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
        <td v-for="(item,i) in items.qiulu"
            :key="i">
          <div class="teamtxt">
            <span v-if="item.hometeamID == items.teamID">
              <!-- <router-link target="_blank"
                           :to="{name:'diskDrive',params:{scheduleID:item.guestteamID}}"> -->
              {{item.guestteamName}}
              <!-- </router-link> -->
            </span>
            <span v-else>
              <!-- <router-link target="_blank"
                           :to="{name:'diskDrive',params:{scheduleID:item.hometeamID}}"> -->
              {{item.hometeamName}}
              <!-- </router-link> -->
            </span>

          </div>
        </td>

      </tr>
      <tr align="center">
        <td>
          <b>轮</b>
        </td>
        <td v-for="(item,i) in items.qiulu"
            :key="i">{{i+1}}</td>

      </tr>

      <tr>
        <td class="spf">
          <b>胜</b>
          <b>平</b>
          <b>负</b>
        </td>
        <td :colspan="items.qiulu.length"
            class="zk_td">
          <!-- <div ref="main"
               style="height:130px;"></div> -->

          <div class="zk_box">
            <div class="zk_div"
                 :style="{'width':1160 - Math.floor(1160 / (items.qiulu.length - 1))+'px'}">
              <p class="zk_p"
                 :class="item.num == 0?'zk_p0':''"
                 :style="{'margin-top':item.num == 2?'-40px':''}"
                 v-for="(item,i) in items.qiulu"
                 :key="i">
                <span v-if="item.result">
                  <span class="zk_span zhuchang"
                        v-if="item.hometeamID == items.teamID">
                    <el-image src="/static/sj.png"></el-image>
                  </span>
                  <span class="zk_span kechang"
                        v-else>
                    <el-image src="/static/yuan.png"></el-image>
                  </span>
                </span>
                <span class="zk_span"
                      v-else></span>
              </p>
            </div>
          </div>

          <Gqiulu :ids="`main${indexs}`"
                  :homeScheduleLength='homeScheduleLength'
                  :myChart1_Ylist="myChart1_Ylist"
                  :lengths="items.qiulu"></Gqiulu>
        </td>
      </tr>
    </table>
    <!-- ----------------------------------------------------------? -->

  </div>
</template>
<script >
// 导入 1. echarts
import echarts from 'echarts'
import Gqiulu from './Gqiulu';
export default {
  components: {
    Gqiulu
  },
  data () {
    return {
      tdLength: '',
      // 走势图
      // id参数
      scheduleID: '',
      // 时间
      matchSeason: "",
      // 主队id
      teamID: '',
      // 主场名字
      TeamName: '',
      // 走势list
      homeSchedule: [],
      // 主客队长度
      homeScheduleLength: [],

      // 比分结果
      myChart1_Ylist1: [],
      tdLengthZ: '',
      myChart_lunci1: '',
      dataLists: [],

      num: 4,

      // 时间
      matchSeason: '',


    };
  },
  props: ["datas"],
  async created () {
    // const res = await this.$http.get('/soccer/sclass/25/qiulu/', { params: { matchSeason: 2016, subsClassID: 1245 } });

  },
  mounted () {
    this.OnListG()

    window.addEventListener('scroll', this.menu)
  },

  methods: {


    menu () {
      // this.scroll = document.body.scrollTop;
      if (this.num > this.dataLists.length) return
      this.num = this.num + 1
      // console.log(111)
    },

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

      //  亚指判断
      let YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      let YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      let YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];


      let obj = {}
      if (sessionStorage.getItem('subsClassID')) {
        obj.subsClassID = sessionStorage.getItem('subsClassID')
      }
      obj.matchSeason = sessionStorage.getItem('matchSeason')
      const res = await this.$http.get(`/soccer/sclass/${this.$route.params.sclassID}/qiulu/`, { params: obj });
      if (res.status !== 200) return console.log('球队阵容信息取失败');
      // 对照参数
      // this.teamID = res.data[0].teamID
      // this.TeamName = res.data[0].teamName

      let homeScheduleLength = {}
      let myChart1_Ylist = {}
      res.data.forEach((items, ii) => {
        homeScheduleLength[ii] = []
        myChart1_Ylist[ii] = []
        res.data[ii].qiulu.forEach((item, i) => {
          if (item.result) {
            if (item.result == 1) {
              item.num = 2
            } else if (item.result == 2) {
              item.num = 1
            } else {
              item.num = 0
            }
          }


          item.firstGoal = this.Goal2GoalCn(item.goal_real, YzStyle, YzStyle3, YzStyle2)

          homeScheduleLength[ii].push(i + 1)
          myChart1_Ylist[ii].push(item.num)
        })

      })


      // ----------------------------------------------------------------------------------图表区

      // 主场客场走势图
      this.dataLists = res.data
      this.homeScheduleLength = homeScheduleLength
      this.myChart1_Ylist = myChart1_Ylist

      // 时间
      this.matchSeason = sessionStorage.getItem('matchSeason')
      console.log(this.dataLists)

    },



  }
}
</script>
<style lang = 'less' scoped >
.qiululist {
  width: 1162px;
  margin-left: 50%;
  transform: translateX(-580px);
}

table {
  border: 1px solid #689ede;
  text-align: center;
  color: #474747;
  border-collapse: separate;
  background-color: #ebf8ff;
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
  margin-top: 18px;
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
  width: 100px;
  padding: 6px 10px;
  position: absolute;
  top: 40%;
  left: 10px;
  border: 1px solid #689ede;
  background: #eee;
  display: none;
  z-index: 999;
}

.zk_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
}

.zk_td {
  /* width: 100%; */
  position: relative;
  .zk_div {
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 62px;
    z-index: 99999999;
    justify-content: space-between;
    .zk_p {
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
      /* .zhuchang {
        width: 0;
        height: 0;
        border-top: 12px solid transparent;
        border-right: 12px solid transparent;
        border-bottom: 12px solid #000;
        border-left: 12px solid transparent;
      }
      .kechang {
        width: 12px;
        height: 12px;
        background: #000;
        border-radius: 50%;
        margin-top: 12px;
      } */
    }
    .zk_p0 {
      position: relative;
      bottom: -40px;
    }
  }
}
.he_sp {
  span {
    display: flex;
    align-items: center;
  }
}
</style>