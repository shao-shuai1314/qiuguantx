<template>
  <div class="history_right"
       @click="onClock">
    <!-- 主场积分榜 -->
    <table width="100%"
           v-for="(item,index) in leagueList"
           :key="index"
           border="0"
           cellpadding="0"
           cellspacing="0"
           align="center"
           class="table1">
      <tr align="center"
          class="tit">
        <td :colspan="Clock?12:7">
          {{item.style}}积分榜
        </td>

      </tr>
      <tr align="center"
          class="tr_tit">
        <td width="20px">排名</td>
        <td>球队</td>
        <td v-if="Clock1">赛</td>
        <td v-if="Clock1">胜</td>
        <td v-if="Clock1">平</td>
        <td v-if="Clock1">负</td>
        <td v-if="Clock">胜率</td>
        <td v-if="Clock">平率</td>
        <td v-if="Clock">负率</td>
        <td v-if="Clock">均得</td>
        <td v-if="Clock">均失</td>
        <td v-if="Clock1">分</td>
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
</style>