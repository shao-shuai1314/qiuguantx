<template>
  <div class="gWidth">
    <!-- 头部公共 -->
    <el-card>
      <el-card>
        <div class="team_header">
          <div class="team_header_left">
            <h3>{{headerList.name_j}}</h3>
            <p>{{headerList.name_e}}</p>
            <el-image v-if="headerList.flag"
                      :src="'http://qiuguantx.com/img/team/'+headerList.flag"></el-image>
          </div>
          <div class="team_header_right">
            <div class="team_header_right1">
              <!-- <p>
                <span>国家：</span>德国</p> -->
              <p>
                <span>成立时间：</span>{{headerList.found_date}}</p>
              <p>
                <span>球队所在地区：</span>{{headerList.area}}</p>
              <p>
                <span>容纳：</span>{{headerList.capacity}}人</p>
              <p>
                <span>官方网站：</span>
                <a target="_blank"
                   :href="headerList.URL">进入官网</a>
              </p>
              <!-- <p>
                <span>邮箱：</span>wwwwwwwwwwwwwwwwww</p> -->
              <p>
                <span>球场：</span>{{headerList.gymnasium}}</p>
              <p>
                <span>
                  教练：
                </span>
                <router-link target="_blank"
                             v-if='headerList.drillMasterID'
                             :to="{name:'playerDetails',params:{playerID:headerList.drillMasterID}}">{{headerList.drillMaster}}</router-link>
              </p>
              <p>
                <span>联系地址：</span>{{headerList.address}}</p>

            </div>
          </div>
        </div>

      </el-card>

      <!-- 选项卡公共 -->
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="球队简介"
                     name="information"></el-tab-pane>
        <el-tab-pane label="球队阵容"
                     name="lineup"></el-tab-pane>
        <!-- <el-tab-pane label="教练战绩"
                     name="coachResults"></el-tab-pane> -->
        <el-tab-pane label="球队赛程"
                     name="teamSchedule"></el-tab-pane>
        <el-tab-pane label="球员转会"
                     name="transfer"></el-tab-pane>
        <el-tab-pane label="地理位置"
                     name="place"></el-tab-pane>
        <el-tab-pane label="历年排名"
                     name=""></el-tab-pane>
        <el-tab-pane label="历年球路"
                     name="OverTheYears_qiulu"></el-tab-pane>
      </el-tabs>
      <!-- 路由占位符 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

    </el-card>

  </div>

</template>
<script >
export default {
  data () {
    return {
      activeName: 'information',
      scheduleID: '',
      headerList: {}
    };
  },
  watch: {
    '$route' (to, from) {
      if (to.params.teamID !== from.params.teamID) {
        this.$router.go(0);
      }
    }
  },
  created () {

    this.scheduleID = this.$route.params.teamID
    // console.log(this.$route.name)
    this.OnHeaderG()
    // 判断初始选项卡位置
    if (this.$route.name) return this.activeName = this.$route.name


  },
  methods: {
    handleClick (tab, event) {
      this.$router.push({ path: '/soccer/team/' + tab.name + '/' + this.scheduleID }).catch(err => err);
    },
    //  头部公用接口
    async OnHeaderG () {
      const res = await this.$http.get('teamInfo/' + this.scheduleID + '/');
      if (res.status !== 200) return console.log('对阵头部信息取失败');
      // console.log(res.data)
      this.headerList = res.data
    }
  }
}
</script>
<style lang = 'less' scoped >
/* 选项卡 */
.el-tabs {
  background: #fff;
  margin: 10px 0 0 0;
  /* padding: 0 10px; */
  height: 40px;
}
/* 公共头 */
.team_header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
  a {
    color: #225ba2;
  }
  .team_header_left {
    /* width: 160px; */
    height: 204px;
    margin-right: 50px;
    text-align: center;
    /* padding: 10px; */
    /* border: 1px solid; */
    h3 {
      font-size: 30px;
      font-weight: bold;
    }
    p {
      font-size: 14px;
      color: #90a3b6;
    }
    .el-image {
      width: 140px;
      height: 140px;
    }
  }
  .team_header_right {
    width: 700px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 204px;
    p {
      line-height: 30px;
      font-size: 14px;
      color: #90a3b6;
      font-weight: 600;
      margin: 10px 50px;
    }
    span {
      color: #000;
      /* font-weight: normal; */
    }
    .team_header_right1 {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>