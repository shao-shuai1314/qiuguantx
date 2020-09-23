<template>
  <el-card class="league_box_left fl">
    <div class="img_div">
      <el-image :src="`http://qiuguantx.com/img/${datas[4]}`"></el-image>
      <p>{{datas[0]}}</p>
    </div>
    <el-divider></el-divider>
    <p class="p">
      <i class="el-icon-magic-stick"></i>{{datas[2]}}赛季分析</p>
    <ul class="top">
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'league',params:{sclassID}}">· 赛事数据/积分榜</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'headCoach',params:{sclassID}}">· 赛季主教练</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'coachProfile',params:{sclassID}}">· 教练简表</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'present',params:{sclassID}}">· 联赛介绍</router-link>
      </li>
      <!-- <li>
        <router-link v-if="sclassID"
                     target="_blank"
                     :to="{name:'headCoach',params:{sclassID}}">· 球队关系</router-link>
      </li> -->
      <!-- <li>
        <router-link v-if="sclassID"
                     :to="{name:'injured',params:{sclassID}}">· 最新伤停</router-link>
      </li> -->
      <!-- <li>
          <router-link to=""> · 胜率排行</router-link>
        </li> -->
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'concedePoints',params:{sclassID}}">· 让球盘统计</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'teamTotalScore',params:{sclassID}}">· 大小球统计</router-link>
      </li>
      <!-- <li>
        <router-link v-if="sclassID"
                     :to="{name:'scorer',params:{sclassID}}">· 球员信息统计</router-link>
      </li> -->
      <li>
        <router-link v-if="sclassID"
                     target="_blank"
                     :to="{name:'qiulu',params:{sclassID}}">· 赛季球路汇总图</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     target="_blank"
                     :to="{name:'panlu',params:{sclassID}}">· 赛季盘路汇总图</router-link>
      </li>
    </ul>
    <p class="p">
      <i class="el-icon-magic-stick"></i>历年数据</p>
    <div class="bottom">
      <!-- <p v-html="datas[1]"></p> -->

      <ul class="ul">
        <li v-for="item in datas[3]"
            :key="item">
          <span class="span"
                v-if="item"
                @click="getmatchSeason(item)">
            · {{item}}赛季</span>
        </li>
      </ul>

    </div>
  </el-card>
</template>
<script >
export default {
  data () {
    return {
      sclassID: '',
      matchSeason: '',
    };
  },
  props: ["datas"],
  mounted () {
    this.sclassID = this.$route.params.sclassID;
    // console.log(sessionStorage.getItem('matchSeason'), 1234)
  },
  methods: {
    getmatchSeason (matchSeason) {
      // console.log(matchSeason)
      sessionStorage.setItem("matchSeason", matchSeason);
      this.$router.go(0);
      this.$router.push({
        name: 'league',
        params: {
          sclassID: this.sclassID
        }
      })
    }
  }
}
</script>
<style lang = 'less' scoped >
.league_box_left {
  .img_div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    p {
      font-size: 18px;
      font-weight: 600;
      margin-top: 10px;
    }
  }
  .ul {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    li {
      width: 150px;
      line-height: 26px;
    }
  }
  .span {
    color: #898a89;
    font-size: 12px;
    font-style: normal;
    line-height: 18px;
    text-decoration: none;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      color: #3680d8;
    }
  }
  width: 250px;
  background: #fff;

  .p {
    font-size: 14px;
    font-weight: 600;
    margin: 10px 0 10px 0;

    i {
      margin-right: 10px;
    }
  }
  .top {
    li {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      box-sizing: border-box;
      a {
        margin-left: 30px;
        color: #898a89;
        &:hover {
          color: #3680d8;
        }
      }
    }
  }
  .bottom {
    p {
      /* height: 200px; */
      width: 170px;
      line-height: 24px;
      margin-left: 20px;
      font-size: 14px;
      color: #898a89;
    }
  }
}
</style>