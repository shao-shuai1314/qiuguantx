<template>
  <div class="gWidth">
    <div class="left_box fl">
      <el-card>
        <div class="player_header">
          <div class="player_header_left">
            <h3>{{headerData.name_j}}</h3>
            <p>{{headerData.name_e}}</p>
            <div class="details">
              <dl>
                <dd v-if="headerData.place">俱乐部：{{headerData.place[0].teamID__name_j}}</dd>
                <dd v-if="headerData.place">位置：{{headerData.place[0].place}}</dd>
                <dd v-if="headerData.place">号码：{{headerData.place[0].number}}号</dd>
              </dl>
              <dl>
                <dd>国籍：{{headerData.country}}</dd>
                <dd>年龄：31岁</dd>
                <dd>生日：{{headerData.birthday}}</dd>
              </dl>
              <dl>
                <dd>身高：{{headerData.tallness}}CM</dd>
                <dd>体重：{{headerData.weight}}KG</dd>
                <dd>惯用脚：右脚</dd>
              </dl>
            </div>
          </div>
          <div class="player_header_right"
               v-if="headerData.photo">
            <el-image :src="`http://qiuguantx.com/img/player/${headerData.photo}`"></el-image>
          </div>

        </div>
      </el-card>
      <!-- 左下内容 -->
      <el-card class="left_box_bottom">

        <div>
          <!-- 比赛数据 -->
          <el-divider content-position="left">
            <h6>比赛数据</h6>
          </el-divider>

          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="总计"
                         name="3"></el-tab-pane>
            <el-tab-pane label="联赛"
                         name="1"></el-tab-pane>
            <el-tab-pane label="杯赛"
                         name="2"></el-tab-pane>
          </el-tabs>
          <div>
            <div style="margin-bottom:10px"
                 class="fr">
              <el-select v-model="timeListVe"
                         size="mini"
                         @change="OnTime"
                         placeholder="请选择">
                <el-option v-for="item in timeList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </div>

            <table width="100%"
                   border="0"
                   cellpadding="0"
                   cellspacing="0"
                   align="center"
                   class="table_NeiRong">
              <tr align="center"
                  class="table_NeiRong_one">
                <td width="">
                  <b>赛事</b>
                </td>
                <td width="">
                  <b>比赛时间</b>
                </td>
                <td width="">
                  <b>主队</b>
                </td>
                <td width="5%">
                  <b>比分</b>
                </td>
                <td width="">
                  <b>客队</b>
                </td>
                <td width="">
                  <b>是否首发</b>
                </td>
                <td width="5%">
                  <b>进球</b>
                </td>
                <td width="5%">
                  <b>点球</b>
                </td>
                <td width="8%">
                  <b>乌龙球</b>
                </td>
                <td width="5%">
                  <b>助攻</b>
                </td>
                <td width="5%">
                  <b>黄牌</b>
                </td>
                <td width="5%">
                  <b>红牌</b>
                </td>
                <td width="5%">
                  <b>评分</b>
                </td>

              </tr>
              <tr align="center"
                  v-for="(item,index) in playerTechStatistics"
                  :key="index"
                  class="">
                <td>{{item.sclassName}}</td>
                <td>{{item.matchtime.slice(0,10)}}</td>
                <td>
                  <router-link target="_blank"
                               :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>
                </td>
                <td>{{item.homeScore}}-{{item.guestScore}}</td>
                <td>
                  <router-link target="_blank"
                               :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
                </td>
                <td>
                  <span v-if="item.isFirstTeam">是</span>
                  <span v-else>否</span>
                </td>
                <td>{{item.notPenaltyGoals}}</td>
                <td>{{item.penaltyGoals}}</td>
                <td>{{item.owngoals}}</td>
                <td>{{item.assist}}</td>
                <td>{{item.yellow}}</td>
                <td>{{item.red}}</td>
                <td>{{item.rating}}</td>

              </tr>
            </table>

            <el-pagination small
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page.sync="currentPage1"
                           layout="prev, pager, next"
                           :hide-on-single-page="hideOnsingle"
                           :page-size="10"
                           :total="this.playerTechStatistics_len.length">
            </el-pagination>

          </div>

        </div>

        <div class="kua">
          <!-- 获得荣誉 -->
          <el-divider content-position="left">
            <h6>获得荣誉</h6>
          </el-divider>
          <div class="wusj"> 暂无数据</div>
        </div>

        <div class="kua zhuanh">
          <!-- 转会 -->
          <el-divider content-position="left">
            <h6>转会</h6>
          </el-divider>
          <dl>

            <dd v-for="(item,index) in playerTransfer"
                :key="index">
              <p>{{item.transfertime}}</p>
              <p>
                <el-image :src="'http://qiuguantx.com/img/league_match/'+item.fromTeamImg"></el-image>
                {{item.fromTeamName}} &nbsp;&nbsp;&nbsp;
                <i class="el-icon-right"></i>&nbsp;&nbsp;&nbsp; {{item.toTeamName}}
                <el-image :src="'http://qiuguantx.com/img/league_match/'+item.toTeamImg"></el-image>
              </p>
              <p>转会（{{item.money}}万欧元）</p>
            </dd>
          </dl>
          <div v-if="playerTransfer.length == 0"
               class="wusj"> 暂无数据</div>
        </div>

      </el-card>

    </div>

    <!-- 右边内容 -->
    <el-card class="right_box fr">
      <h6>相关队员</h6>
      <!-- 前锋 -->
      <dl>
        <dd class="dd-h">
          <p>前锋</p>
          <p>进球</p>
          <p>国籍</p>
        </dd>
        <dd v-for="item in 6"
            :key="item">
          <p>
            <el-image></el-image>
            <router-link to="">莱万特朵夫斯基</router-link>
          </p>
          <p>40</p>
          <p>
            <el-image></el-image>
          </p>
        </dd>
      </dl>
      <!-- 中长 -->
      <dl>
        <dd class="dd-h">
          <p>中场</p>
          <p>进球</p>
          <p>国籍</p>
        </dd>
        <dd v-for="item in 6"
            :key="item">
          <p>
            <el-image></el-image>
            <router-link to="">莱万特朵夫斯基</router-link>
          </p>
          <p>40</p>
          <p>
            <el-image></el-image>
          </p>
        </dd>
      </dl>

      <!-- 后卫 -->
      <dl>
        <dd class="dd-h">
          <p>后卫</p>
          <p>进球</p>
          <p>国籍</p>
        </dd>
        <dd v-for="item in 6"
            :key="item">
          <p>
            <el-image></el-image>
            <router-link to="">莱万特朵夫斯基</router-link>
          </p>
          <p>40</p>
          <p>
            <el-image></el-image>
          </p>
        </dd>
      </dl>
    </el-card>

  </div>
</template>
<script >
export default {
  data () {
    return {

      activeName: '3',

      timeList: [],
      timeListVe: '全部',
      currentPage1: 1,
      hideOnsingle: false,

      headerData: [],
      playerTransfer: [],
      playerTechStatistics: [],
      playerTechStatistics_g: [],
      playerTechStatistics_len: [],
      // 联赛杯赛
      ls: [],
      bs: [],
      zs: [],
      sclass_list: [],
    };
  },
  created () {
    this.scheduleID = this.$route.params.playerID
    // console.log(this.$route.name)
    this.dataList1()
    this.dataList2()
    this.dataList3()


    // 时间获取
    let ii = 0
    for (let i = 2014; i <= new Date().getFullYear(); i++) {
      this.timeList[ii] = {}
      this.timeList[ii].value = i
      this.timeList[ii].label = i
      ii++
    }
    this.timeList[0].value = '全部'
    this.timeList[0].label = '全部'

  },
  methods: {

    //  球员基本信息
    async dataList1 () {
      const res = await this.$http.get('teamInfo/player/' + this.scheduleID);
      this.headerData = res.data
    },

    async dataList2 () {
      const res = await this.$http.get(`teamInfo/player/${this.scheduleID}/playerTransfer/`);
      this.playerTransfer = res.data.playerTransfer
    },

    async dataList3 () {
      const res = await this.$http.get(`teamInfo/player/${this.scheduleID}/playerTechStatistics`);
      this.playerTechStatistics = res.data.playerTechStatistics
      this.playerTechStatistics_g = res.data.playerTechStatistics

      this.playerTechStatistics_len = res.data.playerTechStatistics

      this.fyList(this.playerTechStatistics_len)
      // console.log(this.playerTechStatistics_len)


      // 联赛杯赛划分
      // this.zs = res.data.sclass_list
      // this.zs.forEach(item => {
      //   this.checkedCities.push(item.sclassID)
      // })
      // 筛选框显示
      if (this.timeListVe == '全部') {
        this.sclass_list = this.zs
      }

    },
    // 分页数组
    fyList (list) {
      var chunk = 10;
      var len = list;
      var result = [];
      for (let i = 0; i < len.length; i += chunk) {
        result.push(len.slice(i, i + chunk)) // 每10项分成一组        
      }
      this.result = result
      this.playerTechStatistics = this.result[0]

      if (this.result.length == 0) {
        this.hideOnsingle = true
      }
    },

    // 时间点击
    OnTime (v) {
      // 杯赛联赛时间选择
      this.checkedCities = []
      this.zs.forEach(item => {
        this.checkedCities.push(item.sclassID)
      })
      if (this.activeName != 3) {
        this.playerTechStatistics_len = this.playerTechStatistics_g.filter((item, i) => {
          return item.matchtime.slice(0, 4) == v && item.kind == this.activeName
        })
        if (v == '全部') {
          this.playerTechStatistics_len = this.playerTechStatistics_g
        }
      } else {
        this.playerTechStatistics_len = this.playerTechStatistics_g.filter((item, i) => {
          return item.matchtime.slice(0, 4) == v
        })
        if (v == '全部') {
          this.playerTechStatistics_len = this.playerTechStatistics_g
        }
      }


      this.fyList(this.playerTechStatistics_len)
      this.currentPage1 = 1
    },
    // 页码
    handleSizeChange (val) {
      this.playerTechStatistics = this.result[val - 1]
    },
    // 页码
    handleCurrentChange (val) {
      this.playerTechStatistics = this.result[val - 1]
    },

    // 联赛选着
    handleClick (tab, event) {
      this.checkedCities = []
      this.zs.forEach(item => {
        this.checkedCities.push(item.sclassID)
      })

      if (this.timeListVe == '全部') {
        if (tab.label == '联赛') {
          this.sclass_list = []

          this.playerTechStatistics_len = this.playerTechStatistics_g.filter((item, i) => {
            return item.kind == 1
          })
        } else if (tab.label == '杯赛') {
          this.sclass_list = []
          this.playerTechStatistics_len = this.playerTechStatistics_g.filter((item, i) => {
            return item.kind == 2
          })
        } else {
          this.sclass_list = this.zs
          this.playerTechStatistics_len = this.playerTechStatistics_g
        }
      } else {
        if (tab.label == '联赛') {
          this.sclass_list = []
          this.playerTechStatistics_len = this.playerTechStatistics_g.filter((item, i) => {
            return item.kind == 1 && item.matchtime.slice(0, 4) == this.timeListVe
          })
        } else if (tab.label == '杯赛') {
          this.sclass_list = []
          this.playerTechStatistics_len = this.playerTechStatistics_g.filter((item, i) => {
            return item.kind == 2 && item.matchtime.slice(0, 4) == this.timeListVe
          })
        } else {
          this.sclass_list = this.zs
          this.playerTechStatistics_len = this.playerTechStatistics_g.filter((item, i) => {
            return item.matchtime.slice(0, 4) == this.timeListVe
          })
        }
      }



      this.fyList(this.playerTechStatistics_len)
      this.currentPage1 = 1

    }
  }
}
</script>
<style lang = 'less' scoped >
.el-card {
  margin-bottom: 10px;
  width: 872px;
}
.player_header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .player_header_left {
    width: 530px;
    h3 {
      font-size: 26px;
      color: #25180b;
      line-height: 38px;
      font-weight: 600;
    }
    p {
      color: #a8a5a4;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .details {
      width: 100%;
      display: flex;
      justify-content: space-between;
      dl {
        dd {
          line-height: 28px;
          color: #050200;
        }
      }
    }
  }
  .player_header_right {
    width: 150px;
    height: 150px;
    .el-image {
      width: 80%;
      height: 100%;
    }
  }
}

.left_box_bottom {
  h6 {
    font-size: 18px;
    font-weight: 600;
  }
  .wusj {
    text-align: center;
  }
  .kua {
    padding: 20 px;
  }
  .table_NeiRong {
    color: #555;
    tr {
      height: 30px;
      font-size: 14px;
      /* &:nth-child(2n) {
        background: #f7f7f7;
      } */
    }
    td {
      border-bottom: 1px solid #ececec;
    }
    .table_NeiRong_one {
      background: #f3f4ef;
      font-size: 16px;
      /* height: 50px; */
    }
    .table_NeiRong_two {
      &:hover {
        background: #f3f4ef;
      }
    }
  }
  .zhuanh {
    dl {
      dd {
        border-bottom: 1px solid #ececec;
        height: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        p {
          font-size: 14px;
          width: 33.33%;
          text-align: center;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .el-image {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }
}
/* 右边内容 */
.right_box {
  width: 316px;
  /* height: 1000px; */
  h6 {
    font-size: 18px;
    font-weight: 600;
  }
  dl {
    dd {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ececec;
      p {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 40px;
        &:nth-child(1) {
          width: 60%;
          .el-image {
            width: 20px;
            height: 24px;
            margin-right: 6px;
          }
        }
        &:nth-child(2) {
          width: 20%;
        }
        &:nth-child(3) {
          width: 20%;
          .el-image {
            width: 24px;
            height: 10px;
          }
        }
        font-size: 14px;
      }
    }
    .dd-h {
      background: #f3f4ef;
      margin-top: 20px;
      p {
        font-weight: 600;
      }
    }
  }
}

.el-pagination {
  text-align: center;
}
</style>