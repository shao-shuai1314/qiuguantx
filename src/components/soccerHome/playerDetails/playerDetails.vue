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
                <dd v-if="placeLen">
                  <b>俱乐部：</b>{{headerData.place[0].teamID__name_j}}</dd>
                <dd v-if="placeLen">
                  <b>位置：</b>{{headerData.place[0].place}}</dd>
                <dd v-if="placeLen">
                  <b>号码：</b>
                  <span v-if="headerData.place[0].number">{{headerData.place[0].number}}号</span>
                </dd>
                <dd v-if="placeLen">
                  <b>预计身价：</b>
                  <span v-if="headerData.expectedValue">{{headerData.expectedValue}}万英镑</span>
                </dd>
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
                  <b>身高：</b>
                  <span v-if="headerData.tallness">{{headerData.tallness}}CM</span>
                </dd>
                <dd>
                  <b>体重：</b>
                  <span v-if="headerData.weight">{{headerData.weight}}KG</span>
                </dd>
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
                  v-if="scope.row.teamID"
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
                      v-if="scope.row.toTeamId"
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
                    v-if="scope.row.fromTeamId"
                                 :to="{name:'information',params:{teamID:scope.row.fromTeamId}}">{{scope.row.fromTeamName}}</router-link> &nbsp;&nbsp;&nbsp;
                    <i class="el-icon-right"></i>&nbsp;&nbsp;&nbsp;
                    <router-link target="_blank"
                    v-if="scope.row.toTeamId"
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







        <!-- 统计 -->

        <div>
          <el-divider content-position="left">
            <h6>信息统计</h6>
          </el-divider>
          <div>
            <div class="cursor_sty">
              <el-tag :type="typeClor == 0?'success':'info'"
                      size="mini"
                      @click="Onxiaoz()">总计</el-tag>
              <el-tag :type="typeClor == 1?'success':'info'"
                      size="mini"
                      @click="Onxiaoz(1)">联赛</el-tag>
              <el-tag :type="typeClor == 2?'success':'info'"
                      size="mini"
                      @click="Onxiaoz(2)">杯赛</el-tag>
            </div>
            <!-- 球员 -->
            <el-table :data="playerTj"
                      v-if="playerTj.length"
                      :header-cell-style="{'color': '#303133','font-size':'14px'}"
                      style="width: 100%">
              <el-table-column align="center"
                               label="">
                <template slot="header"  slot-scope="scope">
                  <div class="linue-header">
                    <b>球员信息统计</b>
                  </div>
                </template>
                <el-table-column prop="sclassName"
                                 label="联赛"
                                 align="center"
                                 width="">
                </el-table-column>
                <el-table-column prop="matchSeason"
                                 label="赛季"
                                 align="center"
                                 width="">
                </el-table-column>
                <el-table-column prop="teamName"
                                 label="俱乐部"
                                 align="center"
                                 width="">
                  <template slot-scope="scope">
                    <router-link target="_blank"
                    v-if="scope.row.teamID"
                                 :to="{name:'information',params:{teamID:scope.row.teamID}}">{{scope.row.teamName}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="count"
                                 label="上场"
                                 align="center"
                                 width="40">
                </el-table-column>
                <el-table-column prop="place"
                                 label="首发"
                                 align="center"
                                 width="40">
                </el-table-column>
                <el-table-column prop="penaltyGoals"
                                 label="点球进球"
                                 align="center"
                                 width="60">
                </el-table-column>
                <el-table-column prop="notPenaltyGoals"
                                 label="射门进球"
                                 align="center"
                                 width="60">
                </el-table-column>
                <el-table-column prop="assist"
                                 label="助攻"
                                 align="center"
                                 width="40">
                </el-table-column>
                <el-table-column prop="yellow"
                                 label="黄牌"
                                 align="center"
                                 width="40">
                </el-table-column>
                <el-table-column prop="red"
                                 label="红牌"
                                 align="center"
                                 width="40">
                </el-table-column>
                <el-table-column prop="owngoals"
                                 label="乌龙"
                                 align="center"
                                 width="40">
                </el-table-column>
              </el-table-column>
            </el-table>
            <!-- 教练 -->
            <el-table :data="coachTj"
                      v-if="coachTj.length"
                      :header-cell-style="{'color': '#303133','font-size':'14px'}"
                      style="width: 100%">
              <el-table-column align="center"
                               label="">
                <template slot="header"  slot-scope="scope">
                  <div class="linue-header">
                    <b>教练信息统计</b>
                  </div>
                </template>
                <el-table-column prop="sclassName"
                                 label="联赛"
                                 align="center"
                                 width="">
                </el-table-column>
                <el-table-column prop="season"
                                 label="赛季"
                                 align="center"
                                 width="">
                </el-table-column>
                <el-table-column
                                 label="俱乐部"
                                 align="center"
                                 width="">
                  <template slot-scope="scope">
                    <router-link target="_blank"
                    v-if="scope.row.teamId"
                                 :to="{name:'information',params:{teamID:scope.row.teamId}}">{{scope.row.teamName}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="score"
                                 label="总得分"
                                 align="center"
                                 width="60">
                </el-table-column>
                <el-table-column prop="win"
                                 label="胜"
                                 align="center"
                                 width="">
                </el-table-column>
                <el-table-column prop="flat"
                                 label="平"
                                 align="center"
                                 width="">
                </el-table-column>
                <el-table-column prop="fail"
                                 label="负"
                                 align="center"
                                 width="">
                </el-table-column>
              </el-table-column>
            </el-table>
            <div v-if="coachTj.length && playerTj.length"> 暂无数据</div>

          </div>

        </div>

        

      </el-card>

    </div>

    <!-- 右边内容 -->
    <el-card class="right_box fr">
      <h6>相关队员</h6>
      <el-table :data="playerList"
                size="mini"
                class-name="aaa"
                :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'font-size':'14px'
}"
                style="width: 296px">
        <el-table-column prop="number"
                         class-name="aa"
                         label="号码"
                         align="center"
                         width="30">
        </el-table-column>
        <el-table-column prop="place"
                         label="位置"
                         align="center"
                         width="40">
          <template slot-scope="scope">
            <span style="width:100%;height:100%;display:block;"
                  :style="{'background':scope.row.colors}">{{scope.row.place}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="playerName"
                         align="center"
                         label="姓名">
          <template slot-scope="scope">
            <router-link target="_blank"
                         :to="{name:'playerDetails',params:{playerID:scope.row.playerID}}">{{scope.row.playerName}}</router-link>

          </template>
        </el-table-column>
        <el-table-column prop="country"
                         align="center"
                         width="60"
                         label="国籍">
        </el-table-column>
      </el-table>
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

      idiomaticFeet: { 0: '左脚', 1: '右脚', 2: '双脚' },
      playerList: [],
placeLen:'',




      // 联赛杯赛

      coachTransfer: [],
      transferType: { 1: '完全所有', 2: "租借", 3: '自由转会', 4: '租借结束', 5: '共同所有' },
      duty: { 2: '教练', 4: '助理教练', 6: '临时教练' },
      // 统计
      playerTj: [],
      coachTj: [],
      playerTjs: [],
      coachTjs: [],
      typeClor: 0
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


    // 其他球员信息
    var temp = sessionStorage.getItem("lineupList")
    this.playerList = JSON.parse(temp);



  },
  methods: {

    //  球员基本信息
    async dataList1 () {
      const res = await this.$http.get('teamInfo/player/' + this.scheduleID);
      var birthday = new Date(res.data.birthday.replace(/-/g, "\/"));
      var d = new Date();
      var age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() == birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0);
      this.age = age
      this.headerData = res.data
      this.placeLen = res.data.place.length
    },

    async dataList2 () {
      const res = await this.$http.get(`teamInfo/player/${this.scheduleID}/playerTransfer/`);
      this.playerTransfer = res.data.playerTransfer
      this.coachTransfer = res.data.coachTransfer
    },


    async dataList3 () {
      const res = await this.$http.get(`teamInfo/player/${this.scheduleID}/playerTechStatistics`);
      if (res.data.coachTj) {
        this.coachTjs = res.data.coachTj
        this.coachTj = res.data.coachTj
      } else {
        this.playerTjs = res.data.playerTj
        this.playerTj = res.data.playerTj
      }

    },
    Onxiaoz (v) {
      if (v) {
        this.coachTj = this.coachTjs.filter(item => {
          return item.kind == v
        })
        this.playerTj = this.playerTjs.filter(item => {
          return item.kind == v
        })
        this.typeClor = v
      } else {
        this.coachTj = this.coachTjs
        this.playerTj = this.playerTjs
        this.typeClor = 0
      }

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
  h6 {
    font-size: 18px;
    font-weight: 900;
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

.el-table--mini td,
.el-table--mini th {
  padding: 0 !important;
}
.el-table .cell {
  background: red !important;
  height: 36px !important;
  line-height: 38px !important;
}
.cursor_sty{
  .el-tag{
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>