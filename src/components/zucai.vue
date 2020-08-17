<template>
  <div class="gWidth zucai_box">
    <el-card>
      <el-select v-model="value"
                 @change="onOptions"
                 placeholder="请选择">
        <el-option v-for="(item,index) in options"
                   :key="index"
                   :label="item"
                   :value="index">
        </el-option>
      </el-select>

      <el-table :data="tableData"
                border
                :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'text-align':'center',
    'font-size':'16px',
}"
                style="width: 100%">
        <el-table-column prop="matchtime"
                         label="比赛时间"
                         align="center"
                         width="">
        </el-table-column>
        <el-table-column prop="homeName"
                         label="主胜队"
                         align="center"
                         width="">
          <template slot-scope="scope">
            <div>
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:scope.row.hometeamId}}">{{scope.row.homeName}}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address"
                         align="center"
                         label="比分">
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
                         label="客胜队">
          <template slot-scope="scope">
            <div>
              <router-link target="_blank"
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
      value: ''
    };
  },
  created () {
    this.onDataList(0)
  },
  methods: {
    async onDataList (i) {
      const res = await this.$http.get(`zucai/zc14/`);
      console.log(res.data)
      this.tableData = res.data[i].match_list
      if (this.options.length == 0) {
        res.data.forEach(item => {
          this.options.push(item.issueNum)
        })
        this.value = this.options[i]
      }


    },
    onOptions (v) {
      this.onDataList(v)
    }
  }
}
</script>
<style lang = 'less' scoped >
.zucai_box {
  background: #fff;
}
</style>