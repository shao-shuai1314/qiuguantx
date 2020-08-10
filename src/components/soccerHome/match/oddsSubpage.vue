<template>
  <el-card class="gWidth">
    <el-table :data="tableData"
              border
              size="mini"
              align="center"
              style="width: 100%">
      <el-table-column prop="modifyTime"
                       sortable
                       width="180"
                       sort-by="modifyTime"
                       align="center"
                       label="时间">
        <template slot-scope="scope">
          <span>{{(scope.row.modifyTime).replace('T',' &nbsp; &nbsp; &nbsp;')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       label="指数">
        <el-table-column prop="homeWin"
                         sortable
                         sort-by="homeWin"
                         align="center"
                         label="主">
          <template slot-scope="scope">
            <span :style="{'color':scope.row.homeColor}">{{scope.row.homeWin}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="standoff"
                         sortable
                         sort-by="standoff"
                         align="center"
                         label="平">
          <template slot-scope="scope">
            <span :style="{'color':scope.row.standoffColor}">{{scope.row.standoff}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="guestWin"
                         sortable
                         sort-by="guestWin"
                         align="center"
                         label="客">
          <template slot-scope="scope">
            <span :style="{'color':scope.row.guestColor}">{{scope.row.guestWin}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center"
                       label="概率">
        <el-table-column prop="homeWin_Probability"
                         sortable
                         align="center"
                         sort-by="homeWin_Probability"
                         label="主胜率">
          <template slot-scope="scope">
            {{(scope.row.homeProbability*100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="standoff_Probability"
                         sortable
                         align="center"
                         sort-by="standoff_Probability"
                         label="和胜率">
          <template slot-scope="scope">
            {{(scope.row.standoffProbability*100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="guestWin_Probability"
                         sortable
                         align="center"
                         sort-by="guestWin_Probability"
                         label="客胜率">
          <template slot-scope="scope">
            {{(scope.row.guestProbability*100).toFixed(2)}}
          </template>
        </el-table-column>
        <el-table-column prop="return_Probability"
                         sortable
                         align="center"
                         sort-by="return_Probability"
                         label="返还率">
          <template slot-scope="scope">
            {{(scope.row.returnProbability*100).toFixed(2)}}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center"
                       label="凯利指数">
        <el-table-column prop="homeWin_Kelly"
                         sortable
                         sort-by="homeWin_Kelly"
                         align="center"
                         label="主">
        </el-table-column>
        <el-table-column prop="standoff_Kelly"
                         sortable
                         align="center"
                         sort-by="standoff_Kelly"
                         label="平">
        </el-table-column>
        <el-table-column prop="guestWin_Kelly"
                         sortable
                         align="center"
                         sort-by="guestWin_Kelly"
                         label="客">
        </el-table-column>
      </el-table-column>
    </el-table>

  </el-card>
</template>
<script >
export default {
  data () {
    return {
      tableData: []
    };
  },
  created () {
    this.onList()
  },
  methods: {
    async onList () {
      console.log(this.$route.params.oddsID)
      let obj = {};
      obj.oddsID = this.$route.params.oddsID;
      const res = await this.$http.get("odds/oddsDetail/", { params: obj });
      this.tableData = res.data.dataList
      console.log(res.data)
    }
  }
};
</script>
<style lang = 'less' scoped >
</style>