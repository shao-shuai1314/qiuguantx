<template>
  <div class="gWidth lineup_boxss">
    <el-table :data="dataList"
              size="mini"
              :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'font-size':'14px'
}"
              stripe
              style="width: 1160px">
      <el-table-column prop="number"
                       align="center"
                       width="80"
                       label="球衣号码">
      </el-table-column>
      <el-table-column prop="place"
                       align="center"
                       width="80"
                       label="位置">
        <template slot-scope="scope">
          <span style="width:100%;height:100%;display:block;"
                :style="{'background':scope.row.colors}">{{scope.row.place}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="playerName"
                       align="center"
                       label="中文名">
        <template slot-scope="scope">
          <router-link target="_blank"
                       :to="{name:'playerDetails',params:{playerID:scope.row.playerID}}">{{scope.row.playerName}}</router-link>

        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="生日">
        <template slot-scope="scope">
          <span>{{scope.row.birthday}}</span>

        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="80"
                       label="身高">
        <template slot-scope="scope">
          {{scope.row.tallness}}cm
        </template>

      </el-table-column>
      <el-table-column align="center"
                       width="80"
                       label="体重">
        <template slot-scope="scope">
          {{scope.row.weight}}kg
        </template>
      </el-table-column>
      <el-table-column prop="country"
                       align="center"
                       width="80"
                       label="国籍">
      </el-table-column>
      <el-table-column align="center"
                       width="80"
                       label="预计身价">
        <template slot-scope="scope">
          {{scope.row.expectedValue}}万
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="180"
                       label="合同截止">
        <template slot-scope="scope">
          {{scope.row.endTime}}
        </template>
      </el-table-column>
      <el-table-column align="center"
                       width="80"
                       label="惯用脚">
        <template slot-scope="scope">
          <span v-if="scope.row.idiomaticFeet==1">右脚</span>
          <span v-else-if="scope.row.idiomaticFeet==2">双脚</span>
          <span v-else>左脚</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script >
export default {
  data () {
    return {
      dataList: []
    };
  },
  created () {
    this.scheduleID = this.$route.params.teamID
    this.OnListG()
  },
  methods: {
    async OnListG () {
      const res = await this.$http.get('teamInfo/' + this.$route.params.teamID + '/lineup/');
      var Coachcolors = { '前锋': 'rgba(190,76,89,0.5)', '中场': 'rgba(100,76,89,0.5)', '后卫': 'rgba(180,16,89,0.5)', '守门员': 'rgba(110,106,89,0.5)', '替补': 'rgba(170,76,29,0.5)' }
      // 颜色
      res.data.forEach((item) => {
        item.colors = Coachcolors[item.place]
      })

      this.dataList = res.data


    },
  }
}
</script>
<style lang = 'less'  >
.lineup_boxss a {
  display: block;
  width: 100%;
  height: 100%;
  &:hover {
    color: #409eff;
  }
}
.lineup_boxss .el-table--mini td,
.el-table--mini th {
  padding: 0 !important;
}
.lineup_boxss .el-table .cell {
  height: 100%;
  line-height: 38px !important;
}
.lineup_boxss .cell span {
  display: block;
}
</style>