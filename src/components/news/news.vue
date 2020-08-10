<template>
  <div class="gWidth news_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="news_left fl">
      <h2 style="font-weight: normal;margin-left:10px;display: flex;justify-content: space-between;">
        <span>五大联赛新闻</span>
        <div class="dates">
          <el-date-picker v-model="dateval"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
          <el-input placeholder="请输入关键字"
                    prefix-icon="el-icon-search"
                    v-model="input2">
          </el-input>
        </div>
      </h2>
      <el-divider></el-divider>
      <div class="tab_Date_filtering">
        <!-- 选项卡 -->
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="英超"
                       name="first">
          </el-tab-pane>
          <el-tab-pane label="西甲"
                       name="second">
          </el-tab-pane>
          <el-tab-pane label="意甲"
                       name="third"></el-tab-pane>
          <el-tab-pane label="德甲"
                       name="fourth"></el-tab-pane>
          <el-tab-pane label="法甲"
                       name="fv"></el-tab-pane>
          <el-tab-pane label="其他"
                       name="six"></el-tab-pane>
        </el-tabs>
      </div>

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
    <!-- 新闻右边内容 -->
    <div class="news_right_box fr">
      <h6>球冠热门新闻</h6>
      <el-divider></el-divider>
      <div class="news_right_top">
        <router-link to="">
          <div class="img_tit"
               v-for="item in 4"
               :key="item">
            <div class="imgs">
              <el-image></el-image>
            </div>
            <p> 狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注</p>
          </div>
        </router-link>

      </div>
      <div class="news_right_bottom">
        <p v-for="item in 10"
           :key="item">
          <router-link to="">狼队前锋阿达玛-特拉奥雷本赛季发挥极为出色，吸引了众多豪门的关注</router-link>
        </p>
      </div>
    </div>

  </div>
</template>
<script >
export default {
  data () {
    return {
      activeName: 'second',
      dateval: '',
      input2: ''
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab.label);
    }
  }
}
</script>
<style lang = 'less' scoped >
.news_box {
  /* background: #fff; */
  margin-top: 10px;
  border-radius: 6px;
  /* padding-top: 20px; */
  &::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .news_left {
    width: 920px;
    border-right: 4px solid #f2f2f2;
    box-sizing: border-box;
    background: #fff;
    padding: 20px 0;
    .el-tabs {
      width: 900px;
      margin: 0 10px;
    }
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
/* 右边内容 */
.news_right_box {
  width: 280px;
  background: #fff;
  padding: 20px 0;

  h6 {
    margin-left: 10px;
  }
  .news_right_top {
    color: #898a89;
    margin-left: 10px;
    .img_tit {
      height: 70px;
      width: 260px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      &:hover .el-image {
        transform: scale(1.2);
        transition: 0.2s;
      }
      .imgs {
        width: 100px;
        height: 70px;
        overflow: hidden;
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
      p {
        width: 150px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .news_right_bottom {
    width: 260px;
    margin-left: 10px;
    p {
      width: 100%;
      font-size: 14px;
      line-height: 30px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}

/* 选项卡日期 */
.dates {
  width: 420px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .el-input {
    width: 200px;
  }
}
</style>