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
            <el-carousel-item v-for="item in 4"
                              :key="item">
              <h3>{{ item }}</h3>
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

          <div v-for="item in 3"
               :key="item">
            <h2>
              国内媒体：天海暂未遣散员工，还有球员留在基地训练
            </h2>
            <p>
              <router-link to="">
                狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注。据法国媒体le10 Sport
              </router-link>
            </p>
            <p>
              <router-link to="">
                狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注。据法国媒体le10 Sport
              </router-link>
            </p>
            <p>
              <router-link to="">
                狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注。据法国媒体le10 Sport
              </router-link>
            </p>
          </div>
        </div>
      </div>
      <!-- 第二板块 -->
      <div class="Part2">
        <h2 style="font-weight: normal;margin-left:10px">热门推荐</h2>
        <el-divider></el-divider>
        <ul>
          <li v-for="item in 3"
              :key="item">
            <router-link to="">
              <span>1</span>
              <el-image></el-image>
              <div class="tit">
                <h3>
                  <p>张璐：我们怎么用三年时间搞垮了中国足球？</p>
                  <p class="sx">英超新闻</p>
                </h3>
                <p class="bt">
                  狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注。据法国媒体le10 Sport狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注。据法国媒体le10 Sport
                </p>
                <p class="pl">430评论&nbsp;&nbsp;&nbsp;&nbsp;50点赞</p>
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
    </div>
  </div>
</template>
<script >
export default {
  data () {
    return {
    };
  },
  methods: {
  }
}
</script>
<style lang = 'less' scoped >
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
    border-radius: 6px 0 0 6px;
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
    width: 400px;
    div {
      margin-bottom: 10px;
    }

    h2 {
      font-size: 18px;
      /* color: #444; */
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    p {
      width: 100%;
      line-height: 29px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      a {
        color: #3a4451;
      }
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
  height: 460px;
  background: #fff;
  padding: 10px 10px 10px 0;
  .Part1_r {
    width: 270px;
    /* margin-right: 10px; */
    .video1 {
      width: 270px;
      height: 150px;
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
        padding: 0 10px;

        p {
          width: 240px;
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
      }
    }

    .app {
      width: 270px;
      height: 160px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #444444;
      .el-image {
        width: 102px;
        height: 102px;
      }
      h5 {
        font-size: 18px;
        color: #fff;
        p {
          font-size: 14px;
        }
      }
    }
  }
}
</style>