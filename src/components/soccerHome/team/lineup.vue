<template>
  <div class="gWidth">
    <el-table :data="dataList"
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
      <!-- <el-table-column prop="sclassName"
                       align="center"
                       label="年龄">
      </el-table-column> -->
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
      const res = await this.$http.get('teamInfo/' + this.scheduleID + '/lineup/');
      if (res.status !== 200) return console.log('球队阵容信息取失败');
      this.dataList = res.data


    },
  }
}
</script>
<style lang = 'less' scoped >
a {
  display: block;
  width: 100%;
  height: 100%;
  &:hover {
    color: #409eff;
  }
}
</style>