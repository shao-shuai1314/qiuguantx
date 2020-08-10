<template>
  <div class="odds_box">
    <el-table :data="tableData"
              border
              size="mini"
              style="width: 100%;font-size: 12px">
      <el-table-column prop="amount1"
                       sortable
                       type="selection"
                       width="70"
                       align="center"
                       label="11">
      </el-table-column>
      <el-table-column align="center"
                       prop="level"
                       min-width="138">
        <template slot="header">
          <el-dropdown trigger="click"
                       @command="handleCommand"
                       size="mini">
            <span>
              {{presentName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in present"
                                :key="item.id"
                                :command="item.label">
                {{item.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

        <el-table-column prop="companyName"
                         align="center"
                         label="公司">
        </el-table-column>
      </el-table-column>

      <el-table-column align="center"
                       label="最新指数">
        <template slot="header">
          <span>最新指数</span>
          <span class="actv"
                @click="Oncz">{{czval}}</span>
        </template>

        <el-table-column prop="realHomeWin"
                         sortable
                         sort-by="realHomeWin"
                         align="center"
                         width="70"
                         label="主胜">
          <template slot-scope="scope">
            <div class="qx_item"
                 @mouseover="selectStyle(scope.row.oddsID)">
              <p v-if="czval=='初盘'">{{scope.row.firstHomeWin}}</p>
              <router-link target="_blank"
                           :to="{name:'oddsSubpage',params:{oddsID:scope.row.oddsID}}">
                {{scope.row.realHomeWin}}
              </router-link>
              <el-card class="qx_js"
                       v-if="pp.length"
                       :style="{'bottom':tableDataLength-7 <= scope.$index?'0px':''}">
                <!-- {{scope.row.length}} -->
                <div>
                  <p style="background:#ebeef5">
                    <b>{{scope.row.companyName}}</b>
                  </p>
                  <table width="100%"
                         border="0"
                         cellpadding="0"
                         cellspacing="0"
                         align="center">
                    <tr align="center"
                        style="background:#ebeef5">
                      <td width="30%">
                        <b>时间</b>
                      </td>
                      <td width="10%">
                        <b>主</b>
                      </td>
                      <td width="10%">
                        <b>和</b>
                      </td>
                      <td width="10%">
                        <b>客</b>
                      </td>
                      <td width="10%">
                        <b>主胜率</b>
                      </td>
                      <td width="10%">
                        <b>和胜率</b>
                      </td>
                      <td width="10%">
                        <b>客胜率</b>
                      </td>
                      <td width="10%">
                        <b>返还率</b>
                      </td>

                    </tr>
                    <tr align="center"
                        v-for="(item,i) in pp"
                        :key="i">
                      <td width="">{{item.modifyTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}</td>
                      <td width="">{{item.homeWin}}</td>
                      <td width="">{{item.standoff}}</td>
                      <td width="">{{item.guestWin}}</td>
                      <td width="">{{(item.homeProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.standoffProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.guestProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.returnProbability*100).toFixed(2)}}</td>

                    </tr>
                    <tr>
                      <td width="">
                        <b style="color:#409EFF">点击查看更多变动</b>
                      </td>

                    </tr>

                    <tr align="center">
                      <td width=""
                          v-if="ppp.modifyTime">{{ppp.modifyTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}</td>
                      <td width="">{{ppp.firstHomeWin}}</td>
                      <td width="">{{ppp.firstStandoff}}</td>
                      <td width="">{{ppp.firstGuestWin}}</td>
                      <td width=""
                          style="color:#409EFF">初</td>
                      <td width=""></td>
                      <td width=""></td>
                      <td width=""></td>

                    </tr>
                  </table>

                </div>
              </el-card>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="realStandoff"
                         sortable
                         width="60"
                         sort-by="realStandoff"
                         align="center"
                         label="和">
          <template slot-scope="scope">
            <div class="qx_item"
                 @mouseover="selectStyle(scope.row.oddsID)">
              <p v-if="czval=='初盘'">{{scope.row.firstStandoff}}</p>
              <router-link target="_blank"
                           :to="{name:'oddsSubpage',params:{oddsID:scope.row.oddsID}}">
                {{scope.row.realStandoff}}
              </router-link>
              <el-card class="qx_js"
                       v-if="pp.length"
                       :style="{'bottom':tableDataLength-7 <= scope.$index?'0px':''}">
                <!-- {{oddsList(scope.row.oddsID)}} -->
                <div>
                  <p style="background:#ebeef5">
                    <b>{{scope.row.companyName}}</b>
                  </p>
                  <table width="100%"
                         border="0"
                         cellpadding="0"
                         cellspacing="0"
                         align="center">
                    <tr align="center"
                        style="background:#ebeef5">
                      <td width="30%">
                        <b>时间</b>
                      </td>
                      <td width="10%">
                        <b>主</b>
                      </td>
                      <td width="10%">
                        <b>和</b>
                      </td>
                      <td width="10%">
                        <b>客</b>
                      </td>
                      <td width="10%">
                        <b>主胜率</b>
                      </td>
                      <td width="10%">
                        <b>和胜率</b>
                      </td>
                      <td width="10%">
                        <b>客胜率</b>
                      </td>
                      <td width="10%">
                        <b>返还率</b>
                      </td>

                    </tr>
                    <tr align="center"
                        v-for="(item,i) in pp"
                        :key="i">
                      <td width="">{{item.modifyTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}</td>
                      <td width="">{{item.homeWin}}</td>
                      <td width="">{{item.standoff}}</td>
                      <td width="">{{item.guestWin}}</td>
                      <td width="">{{(item.homeProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.standoffProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.guestProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.returnProbability*100).toFixed(2)}}</td>

                    </tr>
                    <tr>
                      <td width="">
                        <b style="color:#409EFF">点击查看更多变动</b>
                      </td>

                    </tr>

                    <tr align="center">
                      <td width=""
                          v-if="ppp.modifyTime">{{ppp.modifyTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}</td>
                      <td width="">{{ppp.firstHomeWin}}</td>
                      <td width="">{{ppp.firstStandoff}}</td>
                      <td width="">{{ppp.firstGuestWin}}</td>
                      <td width=""
                          style="color:#409EFF">初</td>
                      <td width=""></td>
                      <td width=""></td>
                      <td width=""></td>

                    </tr>
                  </table>

                </div>
              </el-card>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="realGuestWin"
                         sortable
                         sort-by="realGuestWin"
                         width="70"
                         align="center"
                         label="客胜">
          <template slot-scope="scope">
            <div class="qx_item"
                 @mouseover="selectStyle(scope.row.oddsID)">
              <p v-if="czval=='初盘'">{{scope.row.firstGuestWin}}</p>
              <router-link target="_blank"
                           :to="{name:'oddsSubpage',params:{oddsID:scope.row.oddsID}}">
                {{scope.row.realGuestWin}}
              </router-link>
              <el-card class="qx_js"
                       v-if="pp.length"
                       :style="{'bottom':tableDataLength-7 <= scope.$index?'0px':''}">
                <!-- {{oddsList(scope.row.oddsID)}} -->
                <div>
                  <p style="background:#ebeef5">
                    <b>{{scope.row.companyName}}</b>
                  </p>
                  <table width="100%"
                         border="0"
                         cellpadding="0"
                         cellspacing="0"
                         align="center">
                    <tr align="center"
                        style="background:#ebeef5">
                      <td width="30%">
                        <b>时间</b>
                      </td>
                      <td width="10%">
                        <b>主</b>
                      </td>
                      <td width="10%">
                        <b>和</b>
                      </td>
                      <td width="10%">
                        <b>客</b>
                      </td>
                      <td width="10%">
                        <b>主胜率</b>
                      </td>
                      <td width="10%">
                        <b>和胜率</b>
                      </td>
                      <td width="10%">
                        <b>客胜率</b>
                      </td>
                      <td width="10%">
                        <b>返还率</b>
                      </td>

                    </tr>
                    <tr align="center"
                        v-for="(item,i) in pp"
                        :key="i">
                      <td width="">{{item.modifyTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}</td>
                      <td width="">{{item.homeWin}}</td>
                      <td width="">{{item.standoff}}</td>
                      <td width="">{{item.guestWin}}</td>
                      <td width="">{{(item.homeProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.standoffProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.guestProbability*100).toFixed(2)}}</td>
                      <td width="">{{(item.returnProbability*100).toFixed(2)}}</td>

                    </tr>
                    <tr>
                      <td width="">
                        <b style="color:#409EFF">点击查看更多变动</b>
                      </td>

                    </tr>

                    <tr align="center">
                      <td width=""
                          v-if="ppp.modifyTime">{{ppp.modifyTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}</td>
                      <td width="">{{ppp.firstHomeWin}}</td>
                      <td width="">{{ppp.firstStandoff}}</td>
                      <td width="">{{ppp.firstGuestWin}}</td>
                      <td width=""
                          style="color:#409EFF">初</td>
                      <td width=""></td>
                      <td width=""></td>
                      <td width=""></td>

                    </tr>
                  </table>

                </div>
              </el-card>
            </div>

          </template>
        </el-table-column>

      </el-table-column>

      <el-table-column prop="homeWin_Probability"
                       sortable
                       sort-by="homeWin_Probability"
                       width="70"
                       align="center"
                       label="主胜率">
      </el-table-column>
      <el-table-column prop="standoff_Probability"
                       sortable
                       sort-by="standoff_Probability"
                       width="70"
                       align="center"
                       label="和胜率">
      </el-table-column>
      <el-table-column prop="guestWin_Probability"
                       sort-by="guestWin_Probability"
                       sortable
                       width="70"
                       align="center"
                       label="客胜率">
      </el-table-column>
      <el-table-column prop="return_Probability"
                       sortable
                       width="70"
                       align="center"
                       label="返还率">
      </el-table-column>
      <el-table-column align="center"
                       label="凯利指数">
        <el-table-column prop="homeWin_Kelly"
                         align="center"
                         sort-by="homeWin_Kelly"
                         width="40"
                         label="胜">
        </el-table-column>
        <el-table-column prop="standoff_Kelly"
                         sort-by="standoff_Kelly"
                         align="center"
                         width="40"
                         label="平">
        </el-table-column>
        <el-table-column prop="guestWin_Kelly"
                         sort-by="guestWin_Kelly"
                         align="center"
                         width="40"
                         label="负">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="modifyTime"
                       sortable
                       sort-by="modifyTime"
                       width="170"
                       align="center"
                       label="更新时间">
      </el-table-column>
    </el-table>
    <div :style="{'height':aaa&&checked?'168px':'0'}"></div>

    <table width="100%"
           border="0"
           cellpadding="0"
           cellspacing="0"
           align="center"
           :class="checked?'table1_gd':''"
           :style="{'bottom':aaa}">
      <tr align="center"
          style="background:#f5f7fa">
        <td rowspan="4">
          <el-button type="primary"
                     size="mini"
                     plain>欧亚转换</el-button>
          <el-button type="primary"
                     size="mini"
                     plain>导出EXcel</el-button>
          <p>
            <el-checkbox v-model="checked">头尾浮动</el-checkbox>
            共[{{tableDataLength}}]家公司
          </p>

        </td>
        <td width="60"></td>
        <td width="69">主</td>
        <td width="59">和</td>
        <td width="70">客</td>
        <td width="69">主胜率</td>
        <td width="69">和胜率</td>
        <td width="69">客胜率</td>
        <td width="69">返还率</td>
        <td colspan="3">凯利指数</td>
        <td width="170"></td>

      </tr>
      <tr align="center"
          style="background:#f5f7fa">
        <td style="background:#f5f7fa">{{aggregateDict.name_style1}}</td>
        <td>{{aggregateDict.realHomeWin__avg}}</td>
        <td>{{aggregateDict.realStandoff__avg}}</td>
        <td>{{aggregateDict.realGuestWin__avg}}</td>
        <td>{{(aggregateDict.homeWinAvg_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.standoffAvg_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.guestWinAvg_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.returnAvg_Probability*100).toFixed(2)}}</td>
        <td width="38">胜</td>
        <td width="40">平</td>
        <td width="40">负</td>
        <td> </td>
      </tr>
      <tr align="center"
          style="background:#f5f7fa">
        <td style="background:#f5f7fa">{{aggregateDict.name_style2}}</td>

        <td>{{aggregateDict.realHomeWin__max}}</td>
        <td>{{aggregateDict.realStandoff__max}}</td>
        <td>{{aggregateDict.realGuestWin__max}}</td>
        <td>{{(aggregateDict.homeWinMax_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.standoffMax_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.guestWinMax_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.returnMax_Probability*100).toFixed(2)}}</td>
        <td>胜</td>
        <td>平</td>
        <td>负</td>
        <td> </td>
      </tr>
      <tr align="center"
          style="background:#f5f7fa">
        <td style="background:#f5f7fa">{{aggregateDict.name_style3}}</td>

        <td>{{aggregateDict.realHomeWin__min}}</td>
        <td>{{aggregateDict.realStandoff__min}}</td>
        <td>{{aggregateDict.realGuestWin__min}}</td>
        <td>{{(aggregateDict.homeWinMin_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.standoffMin_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.guestWinMin_Probability*100).toFixed(2)}}</td>
        <td>{{(aggregateDict.returnMin_Probability*100).toFixed(2)}}</td>
        <td>胜</td>
        <td>平</td>
        <td>负</td>
        <td> </td>
      </tr>
    </table>

  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      tableDatas: [],
      aggregateDict: [],
      checked: true,
      aaa: "",
      pp: [],
      ppp: {},

      present: [{
        id: 1,
        label: '主流公司'
      },
      {
        id: 2,
        label: '交易所公司'
      }, {
        id: 3,
        label: '全部'
      }],
      presentName: '全部',
      tableDataLength: '',
      czval: "初盘"
    };
  },
  created () {
    this.europeOddsList();
  },
  mounted () {
    // 滚动条的获取
    window.addEventListener("scroll", this.handleScrollx, true);
  },
  computed: {},
  methods: {
    Oncz () {
      if (this.czval == '初盘') {
        this.czval = '展开'
      } else {
        this.czval = '初盘'
      }
      // console.log(this.czval)
      this.handleCommand(this.presentName)
    },

    // 点击表格头部下拉菜单
    handleCommand (val) {
      this.presentName = val
      //深拷贝数据，数据不变 但可以刷新表头数据
      // this.tableData = this.tableData.filter(i => {
      //   return i.realHomeWin
      // })
      if (val == "主流公司") {
        this.tableData = this.tableDatas.filter(i => {
          return i.company_isPrimary && i.realHomeWin
        })
        this.tableDataLength = this.tableData.length;
        let src = JSON.parse(JSON.stringify(this.tableData))
        this.tableData = src
        // console.log(1111)
      } else if (val == "交易所公司") {
        this.tableData = this.tableDatas.filter(i => {
          return i.company_isExchange
        })
        this.tableDataLength = this.tableData.length;
        let src = JSON.parse(JSON.stringify(this.tableData))
        this.tableData = src
        // console.log(2222)
      } else {
        this.tableData = this.tableDatas.filter(i => {
          return i.realHomeWin && i.realHomeWin
        })
        this.tableDataLength = this.tableData.length;
        let src = JSON.parse(JSON.stringify(this.tableData))
        this.tableData = src
      }
      // console.log(val)
    },

    //  欧赔变动
    async selectStyle (oddsID) {
      let obj = {};
      obj.oddsID = oddsID;
      obj.isReal = 1;
      const res = await this.$http.get("odds/oddsDetail/", { params: obj });
      this.pp = res.data.dataList;
      this.ppp = res.data.firstOdds;


      // console.log(this.ppp);
    },
    outStyle () {
      this.pp = [];
      // console.log("222" + this.pp);
    },

    handleScrollx () {
      var that = this;
      window.onscroll = function () {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
        var windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
        var scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
        scrollHeight = scrollHeight - 200;
        if (scrollTop + windowHeight >= scrollHeight) {
          //写后台加载数据的函数
          // console.log(
          //   "距顶部" +
          //   scrollTop +
          //   "可视区高度" +
          //   windowHeight +
          //   "滚动条总高度" +
          //   scrollHeight
          // );
          that.aaa = "200px";
        } else {
          that.aaa = 0;
        }
      };
    },

    async europeOddsList () {
      // console.log(this.$route.params.scheduleID);
      const res = await this.$http.get(
        `/soccer/matchInfo/${this.$route.params.scheduleID}/europeOdds/`
      );
      if (res.status !== 200) return console.log("欧赔信息取失败");
      // console.log(res.data.europeOddsList);
      res.data.europeOddsList.forEach((item, index) => {
        item.standoff_Probability = (item.standoff_Probability * 100).toFixed(
          2
        );
        item.homeWin_Probability = (item.homeWin_Probability * 100).toFixed(2);
        item.guestWin_Probability = (item.guestWin_Probability * 100).toFixed(
          2
        );
        item.return_Probability = (item.return_Probability * 100).toFixed(2);
        item.modifyTime = item.modifyTime.replace("T", "   ");
      });

      this.tableData = res.data.europeOddsList;
      this.tableDatas = res.data.europeOddsList;

      this.tableData = this.tableData.filter(i => {
        return i.realHomeWin
      })
      this.tableDataLength = this.tableData.length
      res.data.aggregateDict.name_style1 = "均值";
      res.data.aggregateDict.name_style2 = "最大";
      res.data.aggregateDict.name_style3 = "最小";
      this.aggregateDict = res.data.aggregateDict;

      // console.log(this.tableData);
    }
  }
};
</script>
<style lang = 'less' scoped>
td {
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  padding: 10px 0;
}
table {
  border-right: 1px solid #ebeef5;
  font-size: 12px;
}
.table1_gd {
  width: 1160px;
  position: fixed;
  bottom: 0;
  z-index: 999999;
}

.qx_js {
  position: absolute;
  /* bottom: 0; */
  left: 50px;
  width: 600px;
  /* height: 350px; */
  z-index: 999999999;
  display: none;
  table {
    border: 0px;
  }
  tr {
    border: 0px;
  }
  td {
    border: 0px;
    padding: 4px;
    text-align: center;
  }
}
.qx_item {
  position: relative;
  &:hover .qx_js {
    display: block;
  }
}
a {
  display: block;
  width: 100%;
  height: 100%;
  &:hover {
    color: #409eff;
  }
}
.actv {
  padding: 6px;
  background: #666;
  border-radius: 6px;
  color: #409eff;
  /* display: block; */
  cursor: pointer;
}
</style>