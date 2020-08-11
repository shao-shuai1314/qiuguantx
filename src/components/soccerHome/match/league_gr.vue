<template>
  <div class="history_right">
    <div class="history_right_box"
         v-for="(item,index) in leagueList"
         :key="index">
      <el-button type="success"
                 class="el-button_icon"
                 @click="onClock"
                 size="mini"
                 icon="el-icon-eleme"
                 circle></el-button>
      <table width="100%"
             border="0"
             cellpadding="0"
             cellspacing="0"
             align="center"
             class="table1">
        <tr align="center"
            class="tit">
          <td :colspan="Clock?12:7"
              class="fsing">
            {{item.style}}积分榜
          </td>

        </tr>
        <tr align="center"
            class="tr_tit">
          <td width="20px">
            <b>排名</b>
          </td>
          <td>
            <b>球队</b>
          </td>
          <td v-if="Clock1">
            <b>赛</b>
          </td>
          <td v-if="Clock1">
            <b>胜</b>
          </td>
          <td v-if="Clock1">
            <b>平</b>
          </td>
          <td v-if="Clock1">
            <b>负</b>
          </td>
          <td v-if="Clock">
            <b>胜率</b>
          </td>
          <td v-if="Clock">
            <b>平率</b>
          </td>
          <td v-if="Clock">
            <b>负率</b>
          </td>
          <td v-if="Clock">
            <b>均进</b>
          </td>
          <td v-if="Clock">
            <b>均失</b>
          </td>
          <td v-if="Clock1">
            <b>分</b>
          </td>
        </tr>

        <tr align="center"
            v-for="(i,index) in item.list"
            :key="index"
            :style="{'background-color': (i.teamName ===datas[0] || i.teamName ===datas[1] ? '#ffffb1':'')}">
          <td>{{index+1}}</td>
          <td>{{i.teamName}}</td>
          <td v-if="Clock1">{{i.count}}</td>
          <td v-if="Clock1">{{i.win}}</td>
          <td v-if="Clock1">{{i.flat}}</td>
          <td v-if="Clock1">{{i.fail}}</td>
          <td v-if="Clock">{{(i.win/i.count*100).toFixed(2)}}%</td>
          <td v-if="Clock">{{(i.flat/i.count*100).toFixed(2)}}%</td>
          <td v-if="Clock">{{(i.fail/i.count*100).toFixed(2)}}%</td>
          <td v-if="Clock">{{(i.totalHomeScore/i.count).toFixed(1)}}</td>
          <td v-if="Clock">{{(i.totalGutstScore/i.count).toFixed(1)}}</td>
          <td v-if="Clock1">{{i.score}}</td>

        </tr>

      </table>
    </div>

  </div>
</template>
<script >
export default {
  data () {

    return {
      leagueList: {
        homeLeagueList: { style: "主场", list: [] },
        guestLeagueList: { style: "客场", list: [] },
        allLeagueList: { style: "总", list: [] },
      },
      sclassID: '',
      Clock: false,
      Clock1: true
    }
  },
  props: ["datas"],
  created () {

  },
  mounted () {
  },

  watch: {
    datas: function (val) {
      if (this.sclassID != val[2]) {
        this.sclassID = val[2]
        this.OnleagueList()
      }

    },

  },

  methods: {

    async OnleagueList () {
      const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/league/`);

      this.leagueList.homeLeagueList.list = res.data.home_league
      this.leagueList.guestLeagueList.list = res.data.guest_league
      this.leagueList.allLeagueList.list = res.data.all_league
    },
    onClock () {
      this.Clock = !this.Clock
      this.Clock1 = !this.Clock1
    }
  }
}
</script>
<style lang = 'less' scoped >
.history_right {
  width: 280px;
  right: 0;
  .table1 {
    border: 1px solid #91c1f8;
    box-sizing: border-box;
    font-size: 12px;
    margin-bottom: 10px;
    background: #fff;
    tr {
      width: 100%;
      height: 24px;
    }
    .tr_tit {
      background: #f0f0f0;
      height: 36px;
    }
    .tit {
      background: #91c1f8;
      height: 36px;
      color: #fff;
    }
  }
}
.fsing {
  font-size: 16px;
}
.history_right_box {
  position: relative;
}

.el-button_icon {
  position: absolute;
  top: 5px;
  right: 10px;
}
</style>