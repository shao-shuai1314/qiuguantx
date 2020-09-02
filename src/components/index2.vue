<template>
  <div class="index_box gWidth">
    <div class="index_left fl">
      <!-- 第一板块 -->
      <div class="Part1">
        <!-- 左 -->
        <div class="Part1_fl fl">
          <!-- banner -->
          <el-carousel :interval="5000"
                       arrow="always"
                       trigger="click"
                       height="262px">
            <el-carousel-item>
              <el-image style="height:100%"
                        src="../../static/banner1.jpg"></el-image>
            </el-carousel-item>
            <el-carousel-item>
              <el-image style="height:100%"
                        src="../../static/banner3.jpg"></el-image>
            </el-carousel-item>
            <el-carousel-item>
              <el-image style="height:100%"
                        src="../../static/banner4.jpg"></el-image>
            </el-carousel-item>
            <el-carousel-item>
              <el-image style="height:100%"
                        src="../../static/banner6.png"></el-image>
            </el-carousel-item>
          </el-carousel>
          <!-- 推荐新闻 -->
          <div class="tj">
            <div class="fl">
              <el-image></el-image>
              <p>
                狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注。据法国媒体le10 Sport报
              </p>
            </div>
            <div class="fr">
              <el-image></el-image>
              <p>
                狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注。据法国媒体le10 Sport报
              </p>
            </div>
          </div>
        </div>
        <!-- 右 -->
        <div class="Part1_fr fr">

          <div v-for="(items,index) in results_a"
               :key="index">
            <div class="Part1_fr_box">
              <el-image></el-image>
              <div class="Part1_fr_div">
                <p>{{items.title}}</p>
                <el-progress v-show="index == 0"
                             :percentage="items.percentage"
                             :color="customColors"></el-progress>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 第二板块 -->
      <div class="Part2">
        <h2 style="font-weight: normal;height:30px;padding-left:10px;color:#E84B5B">
          <!-- <el-image style="width:200px" src="../../static/rm.gif"></el-image>           -->
          热门推荐
        </h2>
        <el-divider></el-divider>
        <ul>
          <li v-for="(item,index) in results"
              :key="index">
            <router-link target="_blank"
                         :to="{name:'newdetail',params:{recordId:item.recordId}}">
              <span>{{index+1}}</span>
              <el-image style="margin-left:10px"></el-image>
              <div class="tit">
                <h3>
                  <p class="tit_p">{{item.title}}</p>
                  <p class="sx">{{item.userName}}</p>
                </h3>
                <p class="bt"
                   v-html="item.content_s"></p>
                <p class="pl">{{item.publicTime}} {{item.reprinted}}</p>
              </div>
            </router-link>
            <el-divider></el-divider>
          </li>

        </ul>
      </div>
    </div>

    <!-- 右边内容 -->
    <div class="index_right fr">
      <!-- 第一板块  视频区 -->
      <div class="Part1_r">
        <div class="video1">
          <router-link to="">
            <el-image></el-image>
            <div class="tit">
              <i class="el-icon-video-play"></i>
              <p>狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪</p>
            </div>
          </router-link>
        </div>
        <div class="video2">
          <p v-for="item in 5"
             :key="item">
            <router-link to="">狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪</router-link>
          </p>
        </div>

        <!-- APP区 -->

        <div class="app">
          <el-image></el-image>
          <h5>关注球冠天下APP
            <p>最全的数据分析客户端</p>
          </h5>

        </div>

      </div>

      <!-- 第二板块 积分榜-->
      <div class="league_s">
        <h2 style="font-weight: normal;height:30px;padding-left:10px;color:#E84B5B;padding-top:20px">
          <!-- <el-image style="width:200px" src="../../static/rm.gif"></el-image>           -->
          积分榜
        </h2>
        <el-divider></el-divider>

        <el-tabs v-model="activeName"
                 :stretch="true"
                 @tab-click="handleClick">
          <el-tab-pane label="英超"
                       name="36"></el-tab-pane>
          <el-tab-pane label="德甲"
                       name="8"></el-tab-pane>
          <el-tab-pane label="西甲"
                       name="31"></el-tab-pane>
          <el-tab-pane label="法甲"
                       name="11"></el-tab-pane>
          <el-tab-pane label="意甲"
                       name="34"></el-tab-pane>
        </el-tabs>

        <el-table :data="leagueList"
                  size="mini">
          <el-table-column prop="rank"
                           label="排名"
                           align="center"
                           width="40">
            <template slot-scope="scope">
              <div :style="{'background':scope.row.colors}">
                {{scope.row.rank}}
              </div>
            </template>

          </el-table-column>
          <el-table-column prop="teamName"
                           label="球队"
                           align="center"
                           width="">
            <template slot-scope="scope">
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:scope.row.teamID}}">{{scope.row.teamName}}</router-link>
            </template>
          </el-table-column>
          <el-table-column prop="win_score"
                           align="center"
                           width="60"
                           label="胜/平/负">
            <template slot-scope="scope">
              <div>
                {{scope.row.win_score}}/{{scope.row.flat_score}}/{{scope.row.fail_score}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="score"
                           align="center"
                           width="40"
                           label="积分">
            <template slot-scope="scope">
              <div style="color:#e74c5b;">{{scope.row.score}}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="item_ss">
          <p v-for="(item,index) in color_data"
             :key="index">
            <span class="point"
                  :style="{'background':item.color}"></span>
            <span class="text">{{item.qualify}}</span><br>
          </p>

        </div>
      </div>

    </div>
  </div>
</template>
<script >
export default {
  data () {
    return {
      results: [],
      newList: [],
      stys: { 36: '英超', 31: "西甲", 34: "意甲", 8: "德甲", 11: "法甲" },
      activeName: '36',
      leagueList: [],
      color_data: [],
      results_a: [],


      customColors: [
        { color: '#f56c6c', percentage: 0 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    };
  },
  created () {
    this.rm()
    this.league(36)

    this.tx()

    setInterval(() => {
      this.tx()
    }, 15800)


  },
  methods: {

    tx () {
      this.timer = setInterval(() => {
        // console.log(this.results_a[0].percentage)
        try {
          if (this.results_a[0].percentage <= 99) {
            this.results_a[0].percentage++;

          } else {
            this.results_a[0].percentage = 0
            this.results_a.push(this.results_a[0])
            this.results_a.shift()
            clearInterval(this.timer);
            // this.tx()
          }
        } catch (err) {
          // console.log(err.stack);
        }

      }, 150)
    },


    async rm () {
      let obj = { hotNews: 1 }
      // 去标签
      var regex = /(<([^>]+)>)/ig
      const { data: res } = await this.$http.get(`/showJournalism`, { params: obj });

      // 去标签
      res.results.forEach(item => {
        item.content_s = item.content.replace(regex, "")
        item.percentage = 0
      });
      this.results = res.results
      this.results_a = res.results.slice(0, 4)
      console.log(this.results_a)
    },

    async league (val) {
      var { data: res } = await this.$http.get(`/soccer/sclass/${val}/schedule/`);

      //  升降级颜色
      function colors (list1, list2) {
        list1.forEach(items => {
          list2.forEach(item => {
            items.rank_data.forEach(it => {
              if (item.rank == it) {
                item.colors = items.color
              }
            })
          })
        })
      }

      try {
        colors(res.sclass_data.leagues_data.color_data, res.sclass_data.leagues_data.all_score)
      } catch (err) {
      }

      this.leagueList = res.sclass_data.leagues_data.all_score
      this.color_data = res.sclass_data.leagues_data.color_data

    },

    handleClick (tab, event) {
      this.league(tab.name)
    }

  },
}
</script>
<style lang = 'less' scoped >
a {
  &:hover .tit_p {
    color: #91c1f8;
  }
}

.index_box {
  &::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  /* 第一板块 左边区域*/
  .Part1 {
    border-radius: 6px;
    height: 450px;
    width: 900px;
    padding: 10px;
    overflow: hidden;
    background: #fff;
    .Part1_fl {
      width: 490px;
      /* banner */
      .el-carousel {
        width: 490px;
        border-radius: 6px;

        .el-carousel__item h3 {
          color: #475669;
          font-size: 18px;
          opacity: 0.75;
          margin: 0;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
      }
      /* banner下内容 */
      .tj {
        width: 490px;
        height: 180px;
        margin-top: 10px;
        overflow: hidden;
        .el-image {
          width: 234px;
          height: 126px;
        }
        p {
          width: 234px;
          line-height: 22px;
          margin-top: 6px;
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
  /* banner右边 */
  .Part1_fr {
    a {
      &:hover {
        color: #91c1f8;
      }
    }
    width: 400px;
    height: 448px;
    overflow: hidden;
    .Part1_fr_box {
      display: flex;
      justify-content: space-between;
      height: 110px;
      border-bottom: 1px solid #dcdfe6;
      align-items: center;
      .el-image {
        margin-right: 10px;
        width: 150px;
        height: 100px;
        display: inline-block;
      }
    }
    .Part1_fr_div {
      width: 280px;
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  /* ------------------------------------------------------------ */

  /* 第二板块 */
  .Part2 {
    width: 920px;
    background: #fff;
    margin-top: 10px;
    border-radius: 6px;
    padding-top: 20px;
    ul {
      li {
        a {
          width: 100%;
          color: #444;
          display: flex;
          justify-content: space-between;
        }
        span {
          display: inline-block;
          font-size: 20px;
          color: #b9001e;
          width: 10px;
          margin: 0 10px 0 30px;
        }
        .el-image {
          width: 150px;
          height: 114px;
        }
        .tit {
          width: 720px;
          margin: 0 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #444;
            .sx {
              font-size: 14px;
              color: #81838b;
            }
          }
          .bt {
            width: 100%;
            font-size: 14px;
            color: #898a89;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .pl {
            width: 100%;
            font-size: 14px;
            color: #898a89;
          }
        }
      }
    }
  }
}

/* ---------------------------------------------- */
/* 右边内容 */
.index_right {
  width: 270px;
  height: 450px;
  background: #fff;
  padding: 10px 0;
  border-radius: 6px;
  .Part1_r {
    width: 100%;
    /* margin-right: 10px; */
    .video1 {
      width: 250px;
      height: 150px;
      margin-left: 10px;
      position: relative;
      .el-image {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
      }
      .tit {
        width: 100%;
        line-height: 30px;
        position: absolute;
        bottom: 6px;
        display: flex;

        p {
          width: 250px;
          font-size: 14px;
          /* color: #fff; */
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
        i {
          font-size: 30px;
          display: inline-block;
        }
      }
    }

    .video2 {
      font-size: 12px;
      p {
        line-height: 30px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin-left: 10px;
      }
    }

    .app {
      width: 250px;
      height: 150px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #444444;
      margin-left: 10px;
      .el-image {
        width: 102px;
        height: 102px;
      }
      h5 {
        font-size: 16px;
        color: #fff;
        p {
          font-size: 12px;
        }
      }
    }
  }
}

/* ----------------------------------------------- */
.league_s {
  background: #fff;
  margin-top: 20px;
  border-radius: 6px;
  .el-tabs {
    width: 250px;
    margin-left: 10px;
    margin-top: -20px;
  }
  .el-table {
    width: 250px;
    margin-left: 10px;
    margin-top: -10px;
  }
  .item_ss {
    background-color: #f7f8fa;
    padding: 20px 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333;
    .point {
      width: 30px;
      height: 20px;
      display: inline-block;
      margin-right: 10px;
    }
    p {
      display: flex;
      align-items: center;
      margin: 6px 0;
    }
  }
}
</style>