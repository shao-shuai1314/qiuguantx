<template>
  <div class="gWidth zucai_box">
    <el-card>

      <!-- 选项 -->
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="足彩"
                     name="zc14"></el-tab-pane>
        <el-tab-pane label="竞彩"
                     name="jczq"></el-tab-pane>
        <el-tab-pane label="北京单场"
                     name="bd"></el-tab-pane>
      </el-tabs>

      <el-select v-model="value"
                 @change="onOptions"
                 placeholder="请选择">
        <el-option v-for="(item,index) in options"
                   :key="index"
                   :label="item"
                   :value="index">
        </el-option>
      </el-select>
      <el-select v-if="isTrue"
                 v-model="value_s"
                 style="margin-left:20px"
                 @change="onOptions_s"
                 placeholder="日期筛选">
        <el-option v-for="(item,index) in options_s"
                   :key="index"
                   :label="item"
                   :value="index">
        </el-option>
      </el-select>

      <el-checkbox style="margin-left:20px"
                   v-if="act && isTrue"
                   v-model="checked"
                   @change="onchecked">隐藏已停售比赛</el-checkbox>

      <div v-if="isTrue"
           style="margin-top:10px">
        <b>
          {{weekday}}
        </b>
      </div>

      <el-table :data="tableData"
                border
                :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'text-align':'center',
    'font-size':'16px',
}"
                style="width: 100%">
        <el-table-column prop="num"
                         label=""
                         align="center"
                         width="30">
        </el-table-column>
        <el-table-column prop="matchtime"
                         label="比赛时间"
                         align="center"
                         width="">
        </el-table-column>
        <el-table-column prop="sclassName"
                         label="联  赛"
                         align="center"
                         width="">
          <template slot-scope="scope">
            <div style="display: flex;justify-content: center">
              <div :style="{background:scope.row.color}"
                   style="width:150px;">
                <router-link target="_blank"
                             v-if="scope.row.sclassId"
                             :style="{'color':scope.row.color?'#fff':''}"
                             :to="{name:'league',params:{sclassID:scope.row.sclassId}}">{{scope.row.sclassName}}</router-link>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="homeName"
                         label="主  队"
                         align="center"
                         width="">
          <template slot-scope="scope">
            <div>
              <router-link target="_blank"
                           v-if="scope.row.hometeamId"
                           :to="{name:'information',params:{teamID:scope.row.hometeamId}}">{{scope.row.homeName}}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="比  分">
          <template slot-scope="scope">
            <div>
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:scope.row.scheduleId}}">
                <span v-if="scope.row.matchState">
                  <span>{{scope.row.homeScore}}-{{scope.row.guestScore}}</span>
                </span>
                <span v-else>VS</span>
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="guestName"
                         align="center"
                         label="客  队">
          <template slot-scope="scope">
            <div>
              <router-link target="_blank"
                           v-if="scope.row.guestteamId"
                           :to="{name:'information',params:{teamID:scope.row.guestteamId}}">{{scope.row.guestName}}</router-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>
<script >
export default {
  data () {
    return {
      tableData: [],
      options: [],
      value: '',

      options_s: [],
      value_s: '',

      timelist: [],
      weekdayL: [],
      weekday: '',
      isTrue: true,
      act: true,

      activeName: 'zc14',
      jkname: 'zc14',
      checked: false
    };
  },
  created () {
    this.onDataList(0, 'zc14')

    var Today = new Date();

    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];


    var s1 = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
    var s11 = new Date(`${s1} 10:00:00`).getTime()
    var myddy1 = Today.getDay();//获取存储当前日期
    Today.setTime(Today.getTime() + 24 * 60 * 60 * 1000);
    var s2 = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
    var s22 = new Date(`${s2} 10:00:00`).getTime()
    var myddy2 = Today.getDay();//获取存储当前日期
    Today.setTime(Today.getTime() + 24 * 60 * 60 * 1000);
    var s3 = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
    var s33 = new Date(`${s3} 10:00:00`).getTime()
    var myddy3 = Today.getDay();//获取存储当前日期
    Today.setTime(Today.getTime() + 24 * 60 * 60 * 1000);
    var s4 = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
    var s44 = new Date(`${s4} 10:00:00`).getTime()


    this.timelist = [
      {
        start: s11,
        end: s22
      },
      {
        start: s22,
        end: s33
      }, {
        start: s33,
        end: s44
      }
    ]

    this.weekdayL = [
      `${weekday[myddy1]}  ${s1}  [10:00 -- 次日 10:00]`,
      `${weekday[myddy2]}  ${s2}  [10:00 -- 次日 10:00]`,
      `${weekday[myddy3]}  ${s3}  [10:00 -- 次日 10:00]`
    ]

    this.options_s = [`${s1}`, `${s2}`, `${s3}`, `全部`]

  },
  methods: {
    async onDataList (i, val) {
      this.jkname = i
      const res = await this.$http.get(`zucai/${val}/`);
      this.tableDatas = res.data
      this.tableData = res.data[i].match_list

      this.options = []
      res.data.forEach(item => {
        this.options.push(item.issueNum)
      })
      this.value = this.options[i]

      if (val == 'bd') {
        this.isTrue = true
      } else {
        this.isTrue = false
      }

      // console.log(res.data)
    },
    onOptions (v) {
      this.tableData = this.tableDatas[v].match_list
    },
    onOptions_s (v) {
      if (v == 3) {
        this.tableData = this.tableDatas[0].match_list
        this.act = true
        this.weekday = ''
        this.checked = false
        return
      }
      this.act = false
      this.tableData = this.tableDatas[0].match_list.filter(item => {
        return new Date(item.matchtime).getTime() >= this.timelist[v].start && new Date(item.matchtime).getTime() < this.timelist[v].end
      })

      this.weekday = this.weekdayL[v]

    },
    // 选择
    handleClick (tab, event) {
      this.onDataList(0, tab.name)
      this.value_s = '',
        this.weekday = ''
    },
    // 显示已停售比赛
    onchecked (v) {
      if (v) {
        this.tableData = this.tableDatas[0].match_list.filter(item => {
          return item.matchState == 0
        })
      } else {
        this.tableData = this.tableDatas[0].match_list
      }

    },
  }
}
</script>
<style lang = 'less' scoped >
.zucai_box {
  background: #fff;
}
a {
  &:hover {
    color: #91c1f8;
  }
}
</style>