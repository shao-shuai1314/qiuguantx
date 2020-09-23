<template>
  <div class="userinfo_box">
    <h2>个人信息</h2>
    <div class="userinfo_jb">
      <el-image :src="`http://qiuguantx.com/img/headPortrait/${userinfoL.headPortrait}`"></el-image>
      <p>{{userinfoL.username}}
        <el-link type="primary"
                 :underline="false">编辑</el-link>
      </p>
    </div>
    <dl>
      <dd>
        <div>
          <b>登录用户名</b>
          <span>{{userinfoL.mobile}}</span>
          <el-link :underline="false"
                   type="primary"></el-link>
        </div>
        <el-divider></el-divider>
      </dd>
      <dd>
        <div>
          <b>邮箱</b>
          <span>可以用于找回登录密码</span>
          <el-link :underline="false"
                   type="primary">立即认证</el-link>
        </div>
        <el-divider></el-divider>
      </dd>
      <dd>
        <div>
          <b>登录密码</b>
          <span>建议包含数字、字母、特殊符号两种以上</span>
          <el-link :underline="false"
                   type="primary">设置</el-link>
        </div>
        <el-divider></el-divider>
      </dd>
      <dd>
        <div>
          <b>注册时间</b>
          <span v-if="userinfoL.date_joined">{{userinfoL.date_joined.slice(0,10)}}</span>
          <el-link :underline="false"
                   type="primary">查看最近登录</el-link>
        </div>
        <el-divider></el-divider>
      </dd>
      <dd>
        <div>
          <b>账户注销</b>
          <span></span>
          <el-link :underline="false"
                   type="primary">注销</el-link>
        </div>
        <el-divider></el-divider>
      </dd>
    </dl>

  </div>
</template>
<script >
export default {
  data () {
    return {
      userinfoL: [],
    };
  },
  created () {
    // console.log(this.$route.name == "userinfo")
    // if (this.$route.name == "userinfo") {
    //   this.$router.go(0);
    // }
    this.userinfo()
  },
  methods: {
    userinfo () {
      // this.$store.dispatch('agetUserInfo')
      if (sessionStorage.getItem("user_g")) {
        var temp = sessionStorage.getItem("user_g")
        let user_g = JSON.parse(temp);
        this.userinfoL = user_g.data
      }

    },
  }
}
</script>
<style lang = 'less' scoped >
.userinfo_jb {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  .el-image {
    width: 80px;
    border-radius: 50%;
  }
}

.userinfo_box dl {
  div {
    display: flex;
    justify-content: space-between;
    b {
      display: inline-block;
      font-size: 16px;
      width: 20%;
    }
    span {
      width: 70%;
      display: inline-block;
      color: #999;
    }
    .el-link {
      width: 10%;
    }
  }
}
</style>