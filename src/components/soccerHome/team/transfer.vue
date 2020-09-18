<template>
  <div>
    <!-- 时间赛选 -->
    <div style="margin:10px;height:70px"
         class="">
      <div>
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

      <div style="width:100px;display:flex;justify-content:space-between;height:20px;margin-top:10px"
           class="">
        <el-tag :type="succ == 1?'success':'info'"
                @click="onxia">夏季</el-tag>
        <el-tag :type="succ == 2?'success':'info'"
                @click="ondong">冬季</el-tag>
      </div>
    </div>

    <div style="width:100%">
      <div class="box_x">
        <div class="fl"
             style="width: 50%">
          <!-- 转入 -->
          <el-table :data="ZRteam"
                    @sort-change="sortChange1"
                    ref="multipleSelection"
                    size="mini"
                    :header-cell-style="{
    'color': '#000',
       'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px'
}"
                    stripe
                    border>
            <el-table-column label=""
                             align="center">
              <template slot="header"
                        slot-scope="scope">
                <span style="color:rgb(248, 51, 71);font-size: 18px;">
                  转入球员
                </span>
              </template>

              <el-table-column prop="date"
                               label="序号"
                               align="center"
                               width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="transferTime"
                               align="center"
                               label="时间"
                               width="90">
              </el-table-column>
              <el-table-column prop="name"
                               label="球衣"
                               width="50"
                               align="center">
              </el-table-column>
              <el-table-column prop="duty"
                               align="center"
                               label="位置"
                               width="60">
              </el-table-column>
              <el-table-column prop="playerName"
                               align="center"
                               label="球员">
                <template slot-scope="scope">
                  <router-link target="_blank"
                               v-if="scope.row.playerId"
                               :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">{{scope.row.playerName}}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="fromTeamName"
                               align="center"
                               label="转出球队">
                <template slot-scope="scope">
                  <span v-if="scope.row.toTeamName == '自由球员'">自由球员</span>
                  <span v-else>
                    <router-link target="_blank"
                                 v-if="scope.row.toTeamId"
                                 :to="{name:'information',params:{teamID:scope.row.fromTeamId}}">{{scope.row.fromTeamName}}</router-link>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="money"
                               align="center"
                               width="60"
                               sortable="custom"
                               label="交易价格(万欧元)">
              </el-table-column>
            </el-table-column>

          </el-table>
        </div>

        <div class="fr"
             style="width: 50%">
          <!-- 转出 -->
          <el-table :data="ZCteam"
                    @sort-change="sortChange3"
                    ref="multipleSelection1"
                    size="mini"
                    :header-cell-style="{
    'color': '#000',
       'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px'
}"
                    stripe
                    border>
            <el-table-column label="转出球员"
                             align="center">
              <template slot="header"
                        slot-scope="scope">
                <span style="color:rgb(248, 51, 71);font-size: 18px;">
                  转出球员
                </span>
              </template>
              <el-table-column prop="date"
                               label="序号"
                               align="center"
                               width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="transferTime"
                               align="center"
                               label="时间"
                               width="90">
              </el-table-column>
              <el-table-column prop="name"
                               label="球衣"
                               width="50"
                               align="center">
              </el-table-column>
              <el-table-column prop="duty"
                               align="center"
                               label="位置"
                               width="60">
              </el-table-column>
              <el-table-column prop="playerName"
                               align="center"
                               label="球员">
                <template slot-scope="scope">
                  <router-link target="_blank"
                               v-if="scope.row.playerId"
                               :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">{{scope.row.playerName}}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="toTeamName"
                               align="center"
                               label="转入球队">
                <template slot-scope="scope">
                  <span v-if="scope.row.toTeamName == '自由球员'">自由球员</span>
                  <span v-else>
                    <router-link target="_blank"
                                 v-if="scope.row.toTeamId"
                                 :to="{name:'information',params:{teamID:scope.row.toTeamId}}">{{scope.row.toTeamName}}</router-link>
                  </span>

                </template>
              </el-table-column>
              <el-table-column prop="money"
                               align="center"
                               width="60"
                               sortable="custom"
                               label="交易价格(万欧元)">
              </el-table-column>
            </el-table-column>

          </el-table>
        </div>

      </div>

      <div class="box_x">
        <div class="fl"
             style="width: 50%">
          <!-- 转入 -->
          <el-table :data="ZJteam"
                    ref="multipleSelection2"
                    size="mini"
                    :header-cell-style="{
    'color': '#000',
       'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px'
}"
                    stripe
                    border>
            <el-table-column label="租借球员"
                             @sort-change="sortChange2"
                             align="center">
              <template slot="header"
                        slot-scope="scope">
                <span style="color:rgb(248, 51, 71);font-size: 18px;">
                  租借球员
                </span>
              </template>
              <el-table-column prop="date"
                               label="序号"
                               align="center"
                               width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="transferTime"
                               align="center"
                               label="时间"
                               width="90">
              </el-table-column>
              <el-table-column prop="name"
                               label="球衣"
                               width="50"
                               align="center">
              </el-table-column>
              <el-table-column prop="duty"
                               align="center"
                               label="位置"
                               width="60">
              </el-table-column>
              <el-table-column prop="playerName"
                               align="center"
                               label="球员">
                <template slot-scope="scope">
                  <router-link target="_blank"
                               v-if="scope.row.playerId"
                               :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">{{scope.row.playerName}}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="fromTeamName"
                               align="center"
                               label="出租球队">
                <template slot-scope="scope">
                  <span v-if="scope.row.toTeamName == '自由球员'">自由球员</span>
                  <span v-else>
                    <router-link target="_blank"
                                 v-if="scope.row.toTeamId"
                                 :to="{name:'information',params:{teamID:scope.row.fromTeamId}}">{{scope.row.fromTeamName}}</router-link>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="money"
                               align="center"
                               sortable="custom"
                               width="60"
                               label="租借费(万欧元)">
              </el-table-column>
            </el-table-column>

          </el-table>

        </div>

        <div class="fr"
             style="width: 50%">
          <!-- 外租球员 -->
          <el-table :data="WZteam"
                    ref="multipleSelection3"
                    size="mini"
                    :header-cell-style="{
    'color': '#000',
       'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px'
}"
                    stripe
                    @sort-change="sortChange4"
                    border>
            <el-table-column label="外租球员"
                             align="center">
              <template slot="header"
                        slot-scope="scope">
                <span style="color:rgb(248, 51, 71);font-size: 18px;">
                  外租球员
                </span>
              </template>
              <el-table-column prop="date"
                               label="序号"
                               align="center"
                               width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="transferTime"
                               align="center"
                               label="时间"
                               width="90">
              </el-table-column>
              <el-table-column prop="name"
                               label="球衣"
                               width="50"
                               align="center">
              </el-table-column>
              <el-table-column prop="duty"
                               align="center"
                               label="位置"
                               width="60">
              </el-table-column>
              <el-table-column prop="playerName"
                               align="center"
                               label="球员">
                <template slot-scope="scope">
                  <router-link target="_blank"
                               v-if="scope.row.playerId"
                               :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">{{scope.row.playerName}}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="toTeamName"
                               align="center"
                               label="外租球队">
                <template slot-scope="scope">
                  <span v-if="scope.row.toTeamName == '自由球员'">自由球员</span>
                  <span v-else>
                    <router-link target="_blank"
                                 v-if="scope.row.toTeamId"
                                 :to="{name:'information',params:{teamID:scope.row.toTeamId}}">{{scope.row.toTeamName}}</router-link>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="money"
                               align="center"
                               width="60"
                               sortable="custom"
                               label="租借费(万欧元)">
              </el-table-column>
            </el-table-column>

          </el-table>
        </div>

      </div>

      <div class="box_x">
        <div class="fl"
             style="width: 50%">
          <!-- 租借期满归队球员 -->
          <el-table :data="ZJQMteam"
                    size="mini"
                    :header-cell-style="{
    'color': '#000',
       'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px'
}"
                    stripe
                    border>
            <el-table-column label="租借期满归队球员"
                             align="center">
              <template slot="header"
                        slot-scope="scope">
                <span style="color:rgb(248, 51, 71);font-size: 18px;">
                  租借期满归队球员
                </span>
              </template>
              <el-table-column prop="date"
                               label="序号"
                               align="center"
                               width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="transferTime"
                               align="center"
                               label="时间"
                               width="90">
              </el-table-column>
              <el-table-column prop="name"
                               label="球衣"
                               width="50"
                               align="center">
              </el-table-column>
              <el-table-column prop="duty"
                               align="center"
                               label="位置"
                               width="60">
              </el-table-column>
              <el-table-column prop="playerName"
                               align="center"
                               label="球员">
                <template slot-scope="scope">
                  <router-link target="_blank"
                               v-if="scope.row.playerId"
                               :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">{{scope.row.playerName}}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="fromTeamName"
                               align="center"
                               label="外租球队">
                <template slot-scope="scope">
                  <span v-if="scope.row.toTeamName == '自由球员'">自由球员</span>
                  <span v-else>
                    <router-link target="_blank"
                                 v-if="scope.row.toTeamId"
                                 :to="{name:'information',params:{teamID:scope.row.fromTeamId}}">{{scope.row.fromTeamName}}</router-link>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="money"
                               align="center"
                               width="60"
                               label="备注">
              </el-table-column>
            </el-table-column>

          </el-table>

        </div>

        <div class="fr"
             style="width: 50%">
          <!-- 其他 -->
          <el-table :data="QTQKteam"
                    size="mini"
                    :header-cell-style="{
    'color': '#000',
       'background-color': 'rgb(131, 162, 202)',
    'font-size':'14px'
}"
                    stripe
                    border>
            <el-table-column label="租借期满归队球员"
                             align="center">
              <template slot="header"
                        slot-scope="scope">
                <span style="color:rgb(248, 51, 71);font-size: 18px;">
                  租借期满归队球员
                </span>
              </template>
              <el-table-column prop="date"
                               label="序号"
                               align="center"
                               width="50">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="transferTime"
                               align="center"
                               label="时间"
                               width="90">
              </el-table-column>
              <el-table-column prop="name"
                               label="球衣"
                               width="50"
                               align="center">
              </el-table-column>
              <el-table-column prop="duty"
                               align="center"
                               label="位置"
                               width="60">
              </el-table-column>
              <el-table-column prop="playerName"
                               align="center"
                               label="球员">
                <template slot-scope="scope">
                  <router-link target="_blank"
                               v-if="scope.row.playerId"
                               :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">{{scope.row.playerName}}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="toTeamName"
                               align="center"
                               label="外租球队">
                <template slot-scope="scope">
                  <span v-if="scope.row.toTeamName == '自由球员'">自由球员</span>
                  <span v-else>
                    <router-link target="_blank"
                                 v-if="scope.row.toTeamId"
                                 :to="{name:'information',params:{teamID:scope.row.toTeamId}}">{{scope.row.toTeamName}}</router-link>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="money"
                               align="center"
                               width="60"
                               label="备注">
              </el-table-column>
            </el-table-column>

          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 时间
      timeList: [],
      timeListVe: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
      // 转入球员
      ZRteam: [],
      ZJteam: [],
      ZJQMteam: [],
      ZCteam: [],
      WZteam: [],
      QTQKteam: [],
      succ: 8
    };
  },
  created () {
    this.transferList()

    // 时间获取
    let ii = 0
    for (let i = 2015; i <= new Date().getFullYear(); i++) {
      this.timeList[ii] = {}
      this.timeList[ii].value = `${i}-${i + 1}`
      this.timeList[ii].label = `${i}-${i + 1}`
      ii++
    }
  },
  methods: {
    // 重新排序
    sortChange1 (obj) {
      if (obj.order == "ascending") {
        this.ZRteam.sort(this.compare('money'))
      } else if (obj.order == "descending") {
        this.ZRteam.sort(this.compares('money'))
      }
    },
    sortChange2 (obj) {
      if (obj.order == "ascending") {
        this.ZJteam.sort(this.compare('money'))
      } else if (obj.order == "descending") {
        this.ZJteam.sort(this.compares('money'))
      }
    },
    sortChange3 (obj) {
      if (obj.order == "ascending") {
        this.ZCteam.sort(this.compare('money'))
      } else if (obj.order == "descending") {
        this.ZCteam.sort(this.compares('money'))
      }
    },
    sortChange4 (obj) {
      if (obj.order == "ascending") {
        this.WZteam.sort(this.compare('money'))
      } else if (obj.order == "descending") {
        this.WZteam.sort(this.compares('money'))
      }
    },
    compare (age) {
      return function (a, b) {
        return b[age] - a[age];
      }
    },
    compares (age) {
      return function (a, b) {
        return a[age] - b[age];
      }
    },
    async transferList () {
      const res = await this.$http.get(`/teamInfo/${this.$route.params.teamID}/playerTransfer`);

      // 转入
      this.into_list = res.data.into_list
      // this.onInto_list(res.data.into_list)

      // 转出
      this.out_list = res.data.out_list
      // this.onOut_list(res.data.out_list)


      this.OnTime(`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`)


    },
    onInto_list (data) {
      let duty = { 2: '教练', 4: '副教练', 6: '临时教练' }
      this.ZRteam = [], this.ZJteam = [], this.ZJQMteam = []
      data.forEach((item, i) => {
        // 职位判断
        if (item.duty) {
          item.duty = duty[item.duty]
        } else {
          item.duty = '-'
        }
        // 转入球员
        if (item.transferType == 1 || item.transferType == 3 || item.transferType == 5) {
          this.ZRteam.push(item)
        } else if (item.transferType == 2) {
          this.ZJteam.push(item)
        } else {
          this.ZJQMteam.push(item)
        }
      })
    },
    onOut_list (data) {
      let duty = { 2: '教练', 4: '副教练', 6: '临时教练' }
      this.ZCteam = [], this.WZteam = [], this.QTQKteam = []
      data.forEach((item, i) => {
        // 职位判断
        if (item.duty) {
          item.duty = duty[item.duty]
        } else {
          item.duty = '-'
        }
        // 转入球员
        if (item.transferType == 1 || item.transferType == 3 || item.transferType == 5) {
          this.ZCteam.push(item)
        } else if (item.transferType == 2) {
          this.WZteam.push(item)
        } else {
          this.QTQKteam.push(item)
        }
      })
    },

    // 时间点击
    OnTime (v) {
      // return new Date(item.matchtime).getTime() >= this.timelist[v].start && new Date(item.matchtime).getTime() < this.timelist[v].end
      // console.log(new Date(`${v.slice(0, 4)}-7-1`).getTime())
      // console.log(new Date(`${v.slice(5)}-6-30`).getTime(), 111)
      // console.log(`${v.slice(0, 4)}-7-1`)
      // console.log(`${v.slice(5)}-6-30`)
      // console.log(this.into_list)

      let into_list = this.into_list.filter(item => {
        return new Date(`${item.transferTime}`).getTime() >= new Date(`${v.slice(0, 4)}-7-1`).getTime() && new Date(`${item.transferTime}`).getTime() < new Date(`${v.slice(5)}-6-30`).getTime()
      })

      let out_list = this.out_list.filter(item => {
        // return item.transferTime.slice(0, 4) == v
        return new Date(`${item.transferTime}`).getTime() >= new Date(`${v.slice(0, 4)}-7-1`).getTime() && new Date(`${item.transferTime}`).getTime() < new Date(`${v.slice(5)}-6-30`).getTime()
      })
      // let into_list = this.into_list.filter(item => {
      //   return item.transferTime.slice(0, 4) == v
      // })
      // let out_list = this.out_list.filter(item => {
      //   return item.transferTime.slice(0, 4) == v
      // })
      this.onInto_list(into_list)

      this.onOut_list(out_list)
      this.sortChange1('1')

      this.$refs.multipleSelection.clearSort()
      this.$refs.multipleSelection1.clearSort()
      this.$refs.multipleSelection2.clearSort()
      this.$refs.multipleSelection3.clearSort()

      // 颜色
      this.succ = 8
    },
    onxia () {
      // console.log(this.timeListVe)
      // console.log(new Date(`${this.timeListVe.slice(0, 4)}-7-1`).getTime())
      // console.log(new Date(`${this.timeListVe.slice(0, 4)}-11-30`).getTime())
      // console.log(new Date(`${this.timeListVe.slice(5)}-2-2`).getTime())
      // console.log(new Date(`${this.timeListVe.slice(5)}-6-30`).getTime())

      let into_list = this.into_list.filter(item => {
        return new Date(`${item.transferTime}`).getTime() >= new Date(`${this.timeListVe.slice(0, 4)}-7-1`).getTime() && new Date(`${item.transferTime}`).getTime() < new Date(`${this.timeListVe.slice(0, 4)}-11-30`).getTime() || new Date(`${item.transferTime}`).getTime() >= new Date(`${this.timeListVe.slice(5)}-2-2`).getTime() && new Date(`${item.transferTime}`).getTime() < new Date(`${this.timeListVe.slice(5)}-6-30`).getTime()
      })
      let out_list = this.out_list.filter(item => {
        return new Date(`${item.transferTime}`).getTime() >= new Date(`${this.timeListVe.slice(0, 4)}-7-1`).getTime() && new Date(`${item.transferTime}`).getTime() < new Date(`${this.timeListVe.slice(0, 4)}-11-30`).getTime() || new Date(`${item.transferTime}`).getTime() >= new Date(`${this.timeListVe.slice(5)}-2-2`).getTime() && new Date(`${item.transferTime}`).getTime() < new Date(`${this.timeListVe.slice(5)}-6-30`).getTime()
      })
      this.onInto_list(into_list)
      this.onOut_list(out_list)
      this.sortChange1('1')
      this.$refs.multipleSelection.clearSort()
      this.$refs.multipleSelection1.clearSort()
      this.$refs.multipleSelection2.clearSort()
      this.$refs.multipleSelection3.clearSort()


      // 颜色
      this.succ = 1
    },
    ondong () {
      let into_list = this.into_list.filter(item => {
        return new Date(`${item.transferTime}`).getTime() >= new Date(`${this.timeListVe.slice(0, 4)}-12-1`).getTime() && new Date(`${item.transferTime}`).getTime() < new Date(`${this.timeListVe.slice(5)}-2-2`).getTime()
      })
      let out_list = this.out_list.filter(item => {
        return new Date(`${item.transferTime}`).getTime() >= new Date(`${this.timeListVe.slice(0, 4)}-12-1`).getTime() && new Date(`${item.transferTime}`).getTime() < new Date(`${this.timeListVe.slice(5)}-2-2`).getTime()
      })
      // console.log(this.timeListVe)
      this.onInto_list(into_list)
      this.onOut_list(out_list)
      this.sortChange1('1')
      this.$refs.multipleSelection.clearSort()
      this.$refs.multipleSelection1.clearSort()
      this.$refs.multipleSelection2.clearSort()
      this.$refs.multipleSelection3.clearSort()

      // 颜色
      this.succ = 2
    }

  },
}
</script>
<style lang = 'less' scoped >
.a {
  text-align: right;
}
a {
  &:hover {
    color: #409eff;
  }
}
.box_x {
  display: flex;
  justify-content: space-between;
}
.el-tag {
  cursor: pointer;
}
</style>