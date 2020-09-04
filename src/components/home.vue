<template>
  <div class="hello">
    <el-container>
      <!-- 头部 -->
      <el-header class="el-header"
                 height="70px">
        <div class="gWidth">
          <!-- 左边logo -->
          <div class="Header_left">
            <router-link :to="{ path: '/' }">
              <el-image src="../../static/logo.png"></el-image>
            </router-link>
          </div>
          <!-- 导航栏 -->
          <el-menu :default-active="fullPath"
                   class="el-menu-demo"
                   mode="horizontal"
                   text-color="#3a4451"
                   active-text-color="#3680d8"
                   router>
            <!-- 一级导航 -->
            <el-menu-item :index="item.path"
                          :key="item.id"
                          v-for="(item,index) in menulist"
                          :id="index==2?act:''">
              {{item.authName}}
            </el-menu-item>
          </el-menu>

          <!-- 注册 -->
          <div class="SignIn_box"
               v-if="!showTX">
            欢迎访问球冠，请先&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link :to="{path:'/users'}">
              <el-button type="info"
                         size="mini"
                         round>
                登录
              </el-button>
            </router-link>
          </div>

          <div class="SignIn_box"
               @click="ONuserinfo"
               v-else>
            <router-link target="_blank" :to="{name:'userinfo'}">
            <el-image style="width:40px;border-radius:50px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-image>
            </router-link>
            <span style="margin-left:10px;font-size:14px">{{username}}</span>
            <div class="SignIn_bh">
              <router-link target="_blank"
                           :to="{name:'userinfo'}">
                个人主页
              </router-link>
              <p style="width:50px;cursor:pointer" @click="Onoff">退出</p>

            </div>
          </div>

        </div>
      </el-header>
      <!-- 内容 -->
      <el-main>
        <!-- 子导航 -->
        <Subnavigation></Subnavigation>
        <!-- 路由占位符 -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <!-- 返回顶部 -->
      <el-backtop>
        <i style=" border-radius: 50%;color:#409eff"
           class="el-icon-caret-top"></i>
      </el-backtop>
      <!-- 底部 -->
      <el-footer height="190px">
        <div class="gWidth">
          <div class="footer_box">
            <h6>站点声明:</h6>
            <div class="footer_xbox">
              <div>
                <p>
                  <router-link to="/app">球冠App下载</router-link>
                </p>
                <p>
                  <router-link target="_blank" :to="{path:'/aboutus'}">关于我们</router-link>
                </p>
                <p>
                  <router-link target="_blank" :to="{path:'/contract'}">法律声明</router-link>
                </p>
              </div>
              <div>
                <p>
                  <router-link to="">违法不良信息举报电话：010-68582680</router-link>
                </p>
                <p>
                  <router-link to="">举报邮箱：yemachenaiwenhua@163.com</router-link>
                </p>
                <p>
                  <router-link to="">侵权投诉</router-link>
                </p>
              </div>
              <div>
                <p>
                  <router-link to="">安全保障</router-link>
                </p>
                <p>
                  <router-link to="">营业执照</router-link>
                </p>
              </div>
              <div>
                <p>
                  <el-image style="width:110px;height:110px"></el-image>
                </p>
              </div>
            </div>
            <el-divider></el-divider>
            <p class="beian">网站备案号：
              <a href="http://beian.miit.gov.cn"
                 target="_blank">京ICP备19050104号-1</a>
            </p>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  created () {
    // console.log(this.$getMyConfig.getConfig(),111)
    // console.log(this.$route.fullPath)
    this.fullPath = this.$route.fullPath
    if (this.$route.path.substring(0, 7) == '/soccer') {
      this.act = "act"
    } else {
      this.act = ""
    }
    const tokenStr = localStorage.getItem('token')
    if (!tokenStr) {
      this.showTX = false
    } else {
      this.showTX = true
      this.username = localStorage.getItem('username')
      this.user_id = localStorage.getItem('user_id')
      // this.ONuserinfo()
    }

  },
  updated () {
    this.fullPath = this.$route.fullPath
  },
  watch: {
    $route (to, from) {
      var a = to.fullPath
      if (to.fullPath.substring(0, 7) == '/soccer') {
        this.act = "act"
      } else {
        this.act = ""
      }
      //  if (to.fullPath.substring(0, 5) == '/news') {
      //   this.act = "act"
      // } else {
      //   this.act = ""
      // }
      this.fullPath = to.path
    }
  },
  data () {
    return {
      showTX: false,
      username: '',
      user: '',
      is_editor: '',
      menulist: [
        { authName: "首页", id: 1, order: 1, path: "/index" },
        { authName: "彩票中心", id: 21, order: 1, path: "/cp" },
        { authName: "足球中心", id: 18, order: 4, path: "/soccer" },
        { authName: "新闻", id: 20, order: 1, path: "/news" },
        { authName: "视频", id: 14, order: 3, path: "/video" },
        { authName: "APP", id: 13, order: 2, path: "/app" },

      ],

      fullPath: '',
      // 添加导航颜色
      act: '',
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath);
    },
    async ONuserinfo () {
      if (!this.$getMyConfig.getConfig()) {
        const { data: res } = await this.$http.get(`/user/userinfo/`);
        this.is_editor = res.data.is_editor
      }
    },
    Onoff(){
      this.showTX = false
         localStorage.removeItem('token');
    }
  }
}
</script>

<style lang="less" scoped>
// 添加导航颜色
#act {
  // background-color: #fff !important;
  // color: rgb(255, 208, 75) !important;
  // border-bottom-color: rgb(255, 208, 75) !important;
  // background-color: rgb(55, 61, 65) !important;
  color: rgb(54, 128, 216) !important;
  border-bottom-color: rgb(54, 128, 216) !important;
}

// 头部样式
.el-header {
  background-color: #fff;
  display: flex;
  padding: 0;
  align-items: center;
  .gWidth {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // logo
    .Header_left {
      height: 70px;
      width: 108px;
      a {
        display: inline-block;
        height: 70px;
        width: 100px;
        display: flex;
        align-items: center;
        .el-image {
          width: 100px;
          height: 64.81px;
        }
      }
    }
    // 导航
    .el-menu-demo {
      height: 66px;
      line-height: 66px;
      margin-top: 4px;
      border-bottom: 0px;
      .el-menu-item {
        height: 100%;
        font-size: 16px;
      }
    }
    // 注册登录
    .SignIn_box {
      height: 70px;
      display: flex;
      align-items: center;
      position: relative;
      &:hover .SignIn_bh {
        display: block;
      }
      .el-button {
        background: #3a4451;
        border-radius: 4px;
      }
      .SignIn_bh {
        position: absolute;
        top: 60px;
        left: 0;
        // width: 100px;
        height: 60px;
        line-height: 30px;
        text-align: center;
        background: #fff;
        border: 1px solid #eee;
        font-size: 14px;
        display: none;
        a &:hover{
          color: #007aff;
        }
         span &:hover{
          color: #007aff;
        }
        span {
          cursor: pointer;
          width: 100%;
          display: inline-block;
        }
      }
    }
  }
  &:before {
    background: #000
      linear-gradient(
        to left,
        #4cd964,
        #5ac8fa,
        #007aff,
        #34aadc,
        #5856d6,
        #ff2d55
      );
    content: '';
    height: 4px;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
// 内容
.el-main {
  padding: 0;
}

// 底部样式
.el-footer {
  background-color: #373d41;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .footer_box {
    padding: 10px 0 0px 0;
    h6 {
      color: #3680d8;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .footer_xbox {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      line-height: 30px;
      a {
        color: #898a89;
      }
    }
    .el-divider {
      margin: 0;
    }
    .beian {
      width: 100%;
      text-align: center;
      color: #898a89;
      padding: 4px;
      font-size: 14px;
      a {
        color: #898a89;
      }
    }
  }
}
</style>
