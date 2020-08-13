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
                <dd v-if="headerData.place">
                  <b>俱乐部：</b>{{headerData.place[0].teamID__name_j}}</dd>
                <dd v-if="headerData.place">
                  <b>位置：</b>{{headerData.place[0].place}}</dd>
                <dd v-if="headerData.place">
                  <b>号码：</b>{{headerData.place[0].number}}号</dd>
                <dd v-if="headerData.place">
                  <b>预计身价：</b>{{headerData.expectedValue}}万英镑</dd>
              </dl>
              <dl>
                <dd>
                  <b>国籍：</b>{{headerData.country}}</dd>
                <dd>
                  <b>年龄：</b>{{age}}岁</dd>
                <dd>
                  <b>生日：</b>{{headerData.birthday}}</dd>
              </dl>
              <dl>
                <dd>
                  <b>身高：</b>{{headerData.tallness}}CM</dd>
                <dd>
                  <b>体重：</b>{{headerData.weight}}KG</dd>
                <dd>
                  <b>惯用脚：</b>{{idiomaticFeet[headerData.idiomaticFeet]}}</dd>
              </dl>
            </div>
          </div>
          <div class="player_header_right">
            <el-image :src="`http://qiuguantx.com/img/player/${headerData.photo}`"></el-image>
          </div>

        </div>
      </el-card>
      <!-- 左下内容 -->
      <el-card class="left_box_bottom">
        <el-divider content-position="left">
          <h6>现效力球队</h6>
        </el-divider>
        <div>
          <el-table :data="headerData.place"
                    size="mini"
                    :header-cell-style="{'color': '#303133','font-size':'14px'}"
                    style="width: 100%">
            <el-table-column prop="toTeamName"
                             align="center"
                             label="现效力球队">
              <template slot="header">
                <div class="linue-header">
                  <b>现效力球队</b>
                </div>
              </template>
              <el-table-column prop="teamID__name_j"
                               label="现效力球队"
                               align="center"
                               width="">
                <template slot-scope="scope">
                  <router-link target="_blank"
                               :to="{name:'information',params:{teamID:scope.row.teamID}}">{{scope.row.teamID__name_j}}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="number"
                               label="号码"
                               align="center"
                               width="">
              </el-table-column>
              <el-table-column prop="place"
                               label="位置"
                               align="center"
                               width="">
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>

        <div>
          <!-- 比赛数据 -->
          <el-divider content-position="left">
            <h6>比赛数据</h6>
          </el-divider>
          <el-tabs v-model="activeName"
                   @tab-click="handleClick"
                   v-if="playerTechStatistics_g.length">
            <el-tab-pane label="总计"
                         name="3"></el-tab-pane>
            <el-tab-pane label="联赛"
                         name="1"></el-tab-pane>
            <el-tab-pane label="杯赛"
                         name="2"></el-tab-pane>
          </el-tabs>
          <div v-if="playerTechStatistics">
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
                             background
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="currentPage1"
                             layout="prev, pager, next"
                             :hide-on-single-page="hideOnsingle"
                             :page-size="10"
                             :total="playerTechStatistics_len.length">
              </el-pagination>

            </div>
          </div>

          <div v-else
               class="wusj"> 暂无数据</div>

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
          <!-- 教练履历 -->
          <el-table :data="coachTransfer"
                    v-if="coachTransfer.length"
                    :header-cell-style="{'color': '#303133','font-size':'14px'}"
                    style="width: 100%">
            <el-table-column prop="toTeamName"
                             align="center"
                             label="教练履历">
              <template slot="header">
                <div class="linue-header">
                  <b>教练履历</b>
                </div>
              </template>
              <el-table-column prop="toTeamName"
                               label="俱乐部"
                               align="center"
                               width="">
                <template slot-scope="scope">
                  <p class="zh_p">
                    <span>
                      <el-image :src="'http://qiuguantx.com/img/team/'+scope.row.toTeamImg"></el-image>
                      <router-link target="_blank"
                                   :to="{name:'information',params:{teamID:scope.row.toTeamId}}">{{scope.row.toTeamName}}</router-link>
                    </span>

                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="transferTime"
                               label="被任命"
                               align="center"
                               sortable>
              </el-table-column>
              <el-table-column prop="endTime"
                               sortable
                               align="center"
                               label="截止日期">
              </el-table-column>
              <el-table-column prop="duty"
                               align="center"
                               label="位置">
                <template slot-scope="scope">
                  <span>{{duty[scope.row.duty]}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <!-- 球员转会 -->
          <el-table :data="playerTransfer"
                    v-if="playerTransfer.length"
                    :header-cell-style="{'color': '#303133','font-size':'14px'}"
                    style="width: 100%">
            <el-table-column prop="toTeamName"
                             align="center"
                             label="球员转会">
              <template slot="header">
                <div class="linue-header">
                  <b>球员转会</b>
                </div>
              </template>
              <el-table-column prop="transferTime"
                               label="转会时间"
                               align="center"
                               sortable
                               width="">
              </el-table-column>
              <el-table-column prop="transferTime"
                               label="转会详细"
                               align="center">
                <template slot-scope="scope">
                  <p class="zh_p">
                    <el-image :src="'http://qiuguantx.com/img/team/'+scope.row.fromTeamImg"></el-image>
                    <router-link target="_blank"
                                 :to="{name:'information',params:{teamID:scope.row.fromTeamId}}">{{scope.row.fromTeamName}}</router-link> &nbsp;&nbsp;&nbsp;
                    <i class="el-icon-right"></i>&nbsp;&nbsp;&nbsp;
                    <router-link target="_blank"
                                 :to="{name:'information',params:{teamID:scope.row.toTeamId}}">{{scope.row.toTeamName}}</router-link>
                    <el-image :src="'http://qiuguantx.com/img/team/'+scope.row.toTeamImg"></el-image>
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="endTime"
                               align="center"
                               label="转会类型">
                <template slot-scope="scope">
                  <span>{{transferType[scope.row.transferType]}}
                    <span v-if="scope.row.money">({{scope.row.money}}万欧元)</span>
                  </span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <div class="wusj"
               v-if="!playerTransfer.length && !coachTransfer.length"> 暂无数据</div>
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
      age: '',
      timeList: [],
      timeListVe: '全部',
      currentPage1: 1,
      hideOnsingle: false,
      headerData: [],
      playerTransfer: [],
      playerTechStatistics: [],
      playerTechStatistics_g: [],
      playerTechStatistics_len: [],
      idiomaticFeet: { 0: '左脚', 1: '右脚', 2: '双脚' },
      // 联赛杯赛
      ls: [],
      bs: [],
      zs: [],
      sclass_list: [],
      coachTransfer: [],
      transferType: { 1: '完全所有', 2: "租借", 3: '自由转会', 4: '租借结束', 5: '共同所有' },
      duty: { 2: '教练', 4: '助理教练', 6: '临时教练' }
    };
  },
  created () {
    this.scheduleID = this.$route.params.playerID
    // console.log(this.$route.name)
    this.dataList1()
    this.dataList2()
    this.dataList3()
    // this.OnLineup()


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
      console.log(res.data.birthday)
      var birthday = new Date(res.data.birthday.replace(/-/g, "\/"));
      var d = new Date();
      var age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() == birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0);
      console.log(age)
      this.age = age
      this.headerData = res.data
    },

    async dataList2 () {
      const res = await this.$http.get(`teamInfo/player/${this.scheduleID}/playerTransfer/`);
      this.playerTransfer = res.data.playerTransfer
      this.coachTransfer = res.data.coachTransfer
    },

    async dataList3 () {
      const res = await this.$http.get(`teamInfo/player/${this.scheduleID}/playerTechStatistics`);
      this.playerTechStatistics = res.data.playerTechStatistics
      this.playerTechStatistics_g = res.data.playerTechStatistics

      this.playerTechStatistics_len = res.data.playerTechStatistics

      this.fyList(this.playerTechStatistics_len)

      // 筛选框显示
      if (this.timeListVe == '全部') {
        this.sclass_list = this.zs
      }

    },

    // async OnLineup () {
    //   const res = await this.$http.get('teamInfo/' + this.$route.params.teamID + '/lineup/');
    //   var Coachcolors = { '前锋': 'rgba(190,76,89,0.5)', '中场': 'rgba(100,76,89,0.5)', '后卫': 'rgba(180,16,89,0.5)', '守门员': 'rgba(110,106,89,0.5)', '替补': 'rgba(170,76,29,0.5)' }
    //   // 颜色
    //   res.data.forEach((item) => {
    //     item.colors = Coachcolors[item.place]
    //   })

    //   this.LineupList = res.data
    //   console.log(this.LineupList)


    // },
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
  /* 比赛数据 */
  .table_NeiRong {
    color: #555;
    tr {
      height: 30px;
      font-size: 14px;
    }
    td {
      border-bottom: 1px solid #ececec;
      border-left: 1px solid #ececec;
      &:last-child {
        border-right: 1px solid #ececec;
      }
    }
    .table_NeiRong_one {
      background: #f5f7fa;
      font-size: 16px;
      height: 60px;
      line-height: 30px;
    }
    .table_NeiRong_two {
      &:hover {
        background: #f3f4ef;
      }
    }
  }
  .zh_p {
    font-size: 14px;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      display: flex;
      align-items: center;
    }
    .el-image {
      width: 20px;
      height: 20px;
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

.tableHead {
  font-weight: 600;
  color: #303133;
  font-size: 14px;
  height: 50px;
}
.linue-header {
  height: 30px;
  line-height: 30px;
  font-weight: 600;
  text-align: center;
  font-size: 18px;
  color: #303133;
}
a {
  &:hover {
    color: #409eff;
  }
}
</style>