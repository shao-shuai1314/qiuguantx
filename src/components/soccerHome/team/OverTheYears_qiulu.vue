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
        <td :colspan="items.match_data.length+1"
            style="font-weight: 600;background-color: #83A2CA;">
          <!-- <h2 class="">{{items.matchSeason}}{{items.sclassName}}
            <span style="color: #409EFF">{{itemTeamName}}</span>
          </h2>
          <span class="fr"
                style="display:flex;align-items:center;color: #f00;margin-right:10px">
            说明：
            <el-image src="../../static/sj.png"></el-image>表示主场
            <el-image src="../../static/yuan.png"></el-image>表示客场
          </span> -->
          <h1 style="line-height:40px">
            <b class="fl"
               style="margin-left:10px">{{items.matchSeason}}{{items.sclassName}}
              <span style="color:#fff">({{itemTeamName}})</span>
            </b>
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
            v-for="(item,i) in items.match_data"
            :key="i">
          <span v-if="item.matchState == '-1'">
            <router-link target="_blank"
                         :to="{name:'history',params:{scheduleID:item.scheduleID}}">
              <span v-if="item.hometeamID == teamID">
                {{item.homeScore}}-{{item.guestScore}}
              </span>
              <span v-else>{{item.guestScore}}-{{item.homeScore}}</span>
            </router-link>
          </span>
          <span v-else
                class="he_sp">
            <span v-if="item.hometeamID == teamID">
              <el-image src="/static/sj.png"></el-image>
            </span>
            <span v-else>
              <el-image src="/static/yuan.png"></el-image>
            </span>
          </span>

        </td>
      </tr>
      <tr align="center">
        <td>
          <div class="teamtxt">
            <b>对手</b>
          </div>
        </td>
        <td v-for="(item,i) in items.match_data"
            :key="i">
          <div class="teamtxt active_jl_dd">
            <span v-if="item.hometeamID == teamID">
              {{item.guestteamName}}
            </span>
            <span v-else>
              {{item.hometeamName}}
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
        <td v-for="(item,i) in items.match_data"
            :key="i">{{i+1}}</td>
      </tr>

      <tr>
        <td class="spf">
          <b>胜</b>
          <b>平</b>
          <b>负</b>
        </td>
        <td :colspan="items.match_data.length"
            class="zk_td">
          <!-- <div ref="main"
               style="height:130px;"></div> -->

          <div class="zk_box">
            <div class="zk_div"
                 :style="{'width':1160 - Math.floor(1160 / (items.match_data.length - 1))+'px'}">
              <p class="zk_p"
                 :class="item.num == 0?'zk_p0':''"
                 :style="{'margin-top':item.num == 2?'-40px':''}"
                 v-for="(item,i) in items.match_data"
                 :key="i">
                <span v-if="item.matchState=='-1'">
                  <span class="zk_span zhuchang"
                        v-if="item.hometeamID == teamID">
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
                  :lengths="items.match_data"
                  :jLlint="jLlint"></Gqiulu>
        </td>
      </tr>
    </table>

  </div>
</template>
<script >
import Gqiulu from '.././Gqiulu';
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
      itemTeamName: '',
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
      myChart1_Ylist: [],
      tdLengthZ: '',
      myChart_lunci1: '',
      dataLists: [],
      num: 4,

      // 时间
      matchSeason: '',
      teamID: ''
    };
  },
  mounted () {
    this.onList()
    window.addEventListener('scroll', this.menu)
  },

  methods: {
    // 滑动加载
    menu () {
      if (this.num > this.dataLists.length) return
      this.num = this.num + 1
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
        if (jLlint[i][0].xAxis == 0 && jLlint[i][1].xAxis == 0) {
          jLlint[i][0].name = ''
        }
        //  随机颜色
        jLlint[i][0].itemStyle = { color: `${coachList[i][coachList[i].playerId]}` }
        // jLlint[i][0].itemStyle = { color: `rgba(${Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256)},0.5)` }

      })

    },

    // 教练轮次筛选
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

    async onList () {
      const res = await this.$http.get(`/teamInfo/${this.$route.params.teamID}/qiulu/`)

      //  教练
      let jLlint = {}, cor = {}
      res.data.match_coach.forEach(item => {
        item[item.playerId] = `rgba(${Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256)},0.5)`
      })
      res.data.qiulu_data.forEach((item, i) => {
        jLlint[`jLlint${i}`] = []
        this.xxList(res.data.match_coach, res.data.qiulu_data[i].match_data, jLlint[`jLlint${i}`])
      })
      // let jLlint = []
      this.jLlint = jLlint



      // 获取球队名字
      let itemTeamName = res.data.qiulu_data[0].match_data.find(item => {
        return item.hometeamID == this.$route.params.teamID
      })
      this.itemTeamName = itemTeamName.hometeamName
      // 参照id
      this.teamID = this.$route.params.teamID

      let homeScheduleLength = {}
      let myChart1_Ylist = {}
      res.data.qiulu_data.forEach((items, ii) => {
        homeScheduleLength[ii] = []
        myChart1_Ylist[ii] = []
        res.data.qiulu_data[ii].match_data.forEach((item, i) => {
          if (item.matchState == '-1') {
            if (item.hometeamID == this.teamID) {
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
          }

          homeScheduleLength[ii].push(i + 1)
          myChart1_Ylist[ii].push(item.num)
        })

      })


      // ----------------------------------------------------------------------------------图表区

      // 主场客场走势图
      // 球路data
      this.dataLists = res.data.qiulu_data
      this.homeScheduleLength = homeScheduleLength
      this.myChart1_Ylist = myChart1_Ylist

      // 时间
      this.matchSeason = sessionStorage.getItem('matchSeason')
    }


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
    justify-content: space-between;
    .zk_p {
      position: relative;
      z-index: 99;
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
    }
  }
}

.he_sp {
  span {
    display: flex;
    align-items: center;
  }
}

.active_jl {
  display: none;
  position: absolute;
  top: 20px;
  padding: 4px;
  background: #fff;
  right: 12px;
}
.active_jl_dd {
  position: relative;
  z-index: 99;
  &:hover .active_jl {
    display: block;
  }
}
a {
  display: block;
  width: 100%;
  &:hover {
    color: #409eff;
  }
}
</style>