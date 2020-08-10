<template>
  <el-card class="league_box_left fl">
    <p class="p">
      <i class="el-icon-magic-stick"></i>{{datas[2]}}赛季分析</p>
    <ul class="top">
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'league',params:{sclassID}}">· 赛事数据/积分榜</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     target="_blank"
                     :to="{name:'headCoach',params:{sclassID}}">· 赛季主教练</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     target="_blank"
                     :to="{name:'headCoach',params:{sclassID}}">· 联赛详细介绍</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     target="_blank"
                     :to="{name:'headCoach',params:{sclassID}}">· 球队关系</router-link>
      </li>
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'injured',params:{sclassID}}">· 最新伤停</router-link>
      </li>
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
      <li>
        <router-link v-if="sclassID"
                     :to="{name:'scorer',params:{sclassID}}">· 球员信息统计</router-link>
      </li>
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
      <i class="el-icon-magic-stick"></i>{{datas[0]}}</p>
    <div class="bottom">

      <p v-html="datas[1]"></p>

    </div>
  </el-card>
</template>
<script >
export default {
  data () {
    return {
      sclassID: '',
      matchSeason: ''
    };
  },
  props: ["datas"],
  mounted () {
    this.sclassID = this.$route.params.sclassID;


  },
  methods: {
  }
}
</script>
<style lang = 'less' scoped >
.league_box_left {
  width: 250px;
  background: #fff;

  .p {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 10px 0;
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