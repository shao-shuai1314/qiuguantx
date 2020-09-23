<template>
  <div>
    <el-table :data="tableData"
              border
              align="center"
              size="mini"
              style="width: 100%"
              row-key="ids"
              lazy
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="num"
                       align="center"
                       label="多端口"
                       width="100">
        <template slot-scope="scope">
          <span style="color:#409eff;font-size:12px">盘口{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="companyName"
                       label="博彩公司"
                       align="center"
                       width="180">
      </el-table-column>
      <el-table-column prop="id"
                       label="初盘"
                       align="center"
                       width="180">
        <el-table-column prop="firstUpOdds"
                         sortable
                         align="center"
                         label="主队">
        </el-table-column>
        <el-table-column prop="firstGoal"
                         sortable
                         align="center"
                         label="盘口">
        </el-table-column>
        <el-table-column prop="firstDownOdds"
                         sortable
                         align="center"
                         label="客队">
        </el-table-column>
      </el-table-column>

      <el-table-column prop="id"
                       label="及时"
                       align="center"
                       width="180">
        <el-table-column prop="upOdds_Real"
                         sortable
                         align="center"
                         label="主队">
          <template slot-scope="scope">
            <div class="qx_item"
                 @mouseover="selectStyle(scope.row.oddsID)">
              <router-link to="">
                {{scope.row.upOdds_Real}}
              </router-link>
              <el-card class="qx_js"
                       v-if="pp.length">
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
                      <td width="15%">
                        <b>盘口</b>
                      </td>
                      <td width="10%">
                        <b>客</b>
                      </td>
                    </tr>
                    <tr v-for="(item,i) in pp"
                        :key="i">
                      <td>
                        {{item.addTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}
                      </td>
                      <td>
                        {{item.upOdds}}
                      </td>
                      <td>
                        {{item.goal}}
                      </td>
                      <td>
                        {{item.downOdds}}
                      </td>
                    </tr>
                  </table>

                </div>
              </el-card>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="goal_Real"
                         sortable
                         align="center"
                         label="盘口">
          <template slot-scope="scope">
            <div class="qx_item"
                 @mouseover="selectStyle(scope.row.oddsID)">
              <router-link to="">
                {{scope.row.goal_Real}}
              </router-link>
              <el-card class="qx_js"
                       v-if="pp.length">
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
                      <td width="15%">
                        <b>盘口</b>
                      </td>
                      <td width="10%">
                        <b>客</b>
                      </td>
                    </tr>
                    <tr v-for="(item,i) in pp"
                        :key="i">
                      <td>
                        {{item.addTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}
                      </td>
                      <td>
                        {{item.upOdds}}
                      </td>
                      <td>
                        {{item.goal}}
                      </td>
                      <td>
                        {{item.downOdds}}
                      </td>
                    </tr>
                  </table>

                </div>
              </el-card>
            </div>

          </template>
        </el-table-column>
        <el-table-column prop="downOdds_Real"
                         sortable
                         align="center"
                         label="客队">
          <template slot-scope="scope">
            <div class="qx_item"
                 @mouseover="selectStyle(scope.row.oddsID)">
              <router-link to="">
                {{scope.row.downOdds_Real}}
              </router-link>
              <el-card class="qx_js"
                       v-if="pp.length">
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
                      <td width="15%">
                        <b>盘口</b>
                      </td>
                      <td width="10%">
                        <b>客</b>
                      </td>
                    </tr>
                    <tr v-for="(item,i) in pp"
                        :key="i">
                      <td>
                        {{item.addTime.replace('T',' &nbsp; &nbsp; &nbsp;')}}
                      </td>
                      <td>
                        {{item.upOdds}}
                      </td>
                      <td>
                        {{item.goal}}
                      </td>
                      <td>
                        {{item.downOdds}}
                      </td>
                    </tr>
                  </table>

                </div>
              </el-card>
            </div>

          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="modifyTime"
                       sortable
                       width="180"
                       align="center"
                       label="赔率变动时间">
      </el-table-column>

    </el-table>

  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      pp: [],
      tableDataLength: 0,
    };
  },
  created () {
    this.onPanelList()
    // 标题
    let datas_ss = [sessionStorage.getItem('sclassName'), sessionStorage.getItem('matchSeason')]
    var temp_ss = sessionStorage.getItem("TeamName").split(",")
    document.title = `${temp_ss[0]} vs ${temp_ss[2]} - ${datas_ss[1]}${datas_ss[0]} -  亚盘`
  },
  methods: {
    async onPanelList () {
      const res = await this.$http.get(
        `/soccer/matchInfo/${this.$route.params.scheduleID}/multiLetgoal/`
      );
      if (res.status !== 200) return console.log("亚盘信息取失败");
      //  亚指判断
      let YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      let YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      let YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];
      let list = []
      res.data.forEach((item, io) => {
        item.firstGoal = this.Goal2GoalCn(item.firstGoal, YzStyle, YzStyle3, YzStyle2)
        item.goal_Real = this.Goal2GoalCn(item.goal_Real, YzStyle, YzStyle3, YzStyle2)
        item.modifyTime = item.modifyTime.replace('T', ' ')
        item.ids = io + 1
        if (item.num == 1) {
          item.children = []
          // item.hasChildren = true
          list.push(item)
        }
        list.forEach((i, index, arr) => {
          if (item.companyID == i.companyID && item.num != 1) {
            arr[index].children.push(item)
          }
        })
      })
      this.tableData = list
      this.tableDataLength = res.data.length
      // console.log(list);
    },
    //  压陪变动
    async selectStyle (oddsID) {
      let obj = {};
      obj.oddsID = oddsID;
      obj.isReal = 1;
      const res = await this.$http.get("odds/multiTotalScoreDetail/", { params: obj });
      // this.pp = res.data;
      // this.ppp = res.data.firstOdds;
      // console.log(res.data)
      let YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      let YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      let YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];
      res.data.forEach(item => {
        item.goal = this.Goal2GoalCn(item.goal, YzStyle, YzStyle3, YzStyle2)
      })
      this.pp = res.data;
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
};
</script>
<style lang = 'less' scoped >
.el-table td {
  /* padding: 10px !important; */
}
.qx_js {
  position: absolute;
  bottom: 0;
  /* left: 50px; */
  right: 100px;
  width: 400px;
  /* height: 350px; */
  z-index: 9999999999999999999999;
  display: none;
  table {
    border: 0px;
  }
  tr {
    border: 0px;
  }
  td {
    border: 0px;
    padding: 2px;
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
</style>