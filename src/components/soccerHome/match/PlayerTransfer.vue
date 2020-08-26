<template>
  <div>
    <el-table :data="tableData.home_player"
              border
              :header-cell-style="{
    'color': '#303133',
    'font-weight:':900,
    'font-size':'14px',
}"
              style="width: 100%">
      <el-table-column prop="date"
                       align="center"
                       width="">
        <template slot="header"  slot-scope="scope">
          <div class="tableData-header">
            <b>{{TeamNameInfo[0]}} &nbsp; &nbsp; &nbsp; &nbsp;VS&nbsp; &nbsp; &nbsp; &nbsp; {{TeamNameInfo[2]}}</b>
          </div>
        </template>
        <el-table-column prop="date"
                         width="">
          <template slot="header"  slot-scope="scope">
            <div class="tableData-xheader">
              <b>{{TeamNameInfo[0]}}</b>
            </div>
          </template>
          <el-table-column prop="playerName"
                           label="中文名"
                           align="center"
                           width="">
            <template slot-scope="scope">
              <span>
                <router-link target="_blank"
                             :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">
                  {{scope.row.playerName}}
                </router-link>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="number"
                           label="球衣"
                           align="center"
                           width="100px">
          </el-table-column>
          <el-table-column prop="place"
                           align="center"
                           width="100px"
                           label="位置">
          </el-table-column>
          <el-table-column prop="country"
                           align="center"
                           label="国家">
          </el-table-column>
          <el-table-column prop="birthday"
                           align="center"
                           width="100px"
                           label="生日">
          </el-table-column>
          <el-table-column prop="tfransfer_data"
                           align="center"
                           label="历史">
            <template slot-scope="scope">
              <div>
                <p v-for="(item,index) in scope.row.tfransfer_data"
                   :key="index">
                  {{item.transferTime}} 到 {{item.endTime}} ({{transferType[item.transferType]}})
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>

    <el-table :data="tableData.guest_player"
              border
              :header-cell-style="{
    'color': '#303133',
    'font-weight:':900,
    'font-size':'14px',
}"
              style="width: 100%">
      <el-table-column prop="date"
                       width="">
        <template slot="header"  slot-scope="scope">
          <div class="tableData-xheader">
            <b>{{TeamNameInfo[2]}}</b>
          </div>
        </template>
        <el-table-column prop="playerName"
                         label="中文名"
                         align="center"
                         width="">
          <template slot-scope="scope">
            <span>
              <router-link target="_blank"
                           :to="{name:'playerDetails',params:{playerID:scope.row.playerId}}">
                {{scope.row.playerName}}
              </router-link>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="number"
                         label="球衣"
                         align="center"
                         width="100px">
        </el-table-column>
        <el-table-column prop="place"
                         align="center"
                         width="100px"
                         label="位置">
        </el-table-column>
        <el-table-column prop="country"
                         align="center"
                         label="国家">
        </el-table-column>
        <el-table-column prop="birthday"
                         align="center"
                         width="100px"
                         label="生日">
        </el-table-column>
        <el-table-column prop="tfransfer_data"
                         align="center"
                         label="历史">
          <template slot-scope="scope">
            <div>
              <p v-for="(item,index) in scope.row.tfransfer_data"
                 :key="index">
                {{item.transferTime}} 到 {{item.endTime}} ({{transferType[item.transferType]}})
              </p>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script >
export default {
  data () {
    return {
      tableData: [],
      TeamNameInfo: [],
      CoachNameInfo: [],
      transferType: { 1: '完全所有', 2: '租借', 3: '自由转会', 4: '租借结束', 5: '共同所有' }

    };
  },
  created () {
    this.onDataList()
  },
  methods: {
    async onDataList () {
      const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/playerMutualTransfer/`);
      this.TeamNameInfo = sessionStorage.getItem('TeamName').split(',')
      this.CoachNameInfo = sessionStorage.getItem('CoachName').split(',')
      this.tableData = res.data
    }
  }
}
</script>
<style lang = 'less' scoped >
.tableData-header {
  font-size: 18px;
  color: rgb(248, 51, 71);
}
.tableData-xheader {
  font-size: 16px;
  color: #409eff;
  b {
    margin: 0 20px;
  }
}
a {
  &:hover {
    color: #409eff;
  }
}
</style>