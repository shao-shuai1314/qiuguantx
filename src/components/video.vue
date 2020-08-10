<template>
  <div class="video_box">
    <div class="gWidth">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>视频</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 视屏banner -->
      <el-carousel :interval="4000"
                   type="card"
                   height="300px">
        <el-carousel-item v-for="item in 6"
                          :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="video_img gWidth">
      <div class="video_img1"
           v-for="int in 4"
           :key="int">
        <h5>英超&nbsp;&nbsp;&nbsp;
          <router-link to="">
            <span>更多 > </span>
          </router-link>
        </h5>
        <el-divider></el-divider>
        <div class="video_imgs">
          <div v-for="(item,index) in 13"
               :key="index"
               class="video-item-img"
               :class="index == 0 ? 'act':''">
            <el-image src="../../static/cs.jpg"></el-image>
            <i>2:30</i>
            <p> 狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了</p>
          </div>

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
/* banner' */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 图片 */
.video_img {
  /* background: #fff; */
  &::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .video_img1 {
    margin-bottom: 10px;
    background: #fff;
    h5 {
      font-size: 18px;
      padding: 20px 0 0 10px;
      span {
        font-size: 12px;
        color: #444;
      }
    }
    .video_imgs {
      width: 100%;
      background: #fff;

      &::after {
        content: '';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      .video-item-img {
        width: 140px;
        height: 120px;
        float: left;
        position: relative;
        background: #f8f8f8;
        margin: 5px;
        .el-image {
          width: 100%;
          height: 90px;
        }
        i {
          position: absolute;
          bottom: 34px;
          right: 5px;
          font-style: normal;
          font-size: 10px;
          width: 40px;
          height: 20px;
          background: rgba(17, 15, 15, 0.6);
          border-radius: 10px;
          color: #fff;
          text-align: center;
          display: inline-block;
          line-height: 20px;
        }
        p {
          width: 100%;
          font-size: 14px;
          line-height: 20px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }
      }
      .video-item-img:nth-child(7) {
        margin-right: 0px;
      }
      .act {
        width: 280px;
        height: 250px;
        margin-left: 10px;
        .el-image {
          height: 220px;
        }
      }
    }
  }
}
</style>