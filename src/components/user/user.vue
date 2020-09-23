<template>
  <div>
    <!-- 背景 -->
    <!-- <div class="user_bj"></div> -->
    <el-image src="../../static/qiuchang.jpg"></el-image>
    <!-- 用户表单 -->
    <div class="user_box">
      <!-- 返回上一页 -->
      <div>
        <!-- <el-link type="primary"
                 @click="ONsy">
          &lt; 返回上一页</el-link> -->
        <el-link type="primary"
                 href="/">返回首页
        </el-link>
      </div>

      <!-- logo -->
      <div class="logo">
        <router-link :to="{ path: '/' }">
          <el-image src="../../static/logo.png"></el-image>
        </router-link>
      </div>
      <!-- 登录方式 -->
      <div class="fs">
        <span @click="ONpassward"
              style=""
              :style="[{'color':types == 'passwardLogin'?'#58a1f5':''},{'font-weight':types == 'passwardLogin'?'600':''}]">密码登录</span>
        <span @click="ONphone"
              :style="[{'color':types == 'phoneLogin'?'#58a1f5':''},{'font-weight':types == 'phoneLogin'?'600':''}]">手机登录</span>
        <span @click="ONzc"
              class="fr"
              :style="[{'color':types == 'register'?'#58a1f5':''},{'font-weight':types == 'register'?'600':''}]">注册</span>
      </div>
      <!-- 表单 -->
      <!-- 密码登录 -->
      <div v-if="types == 'passwardLogin'">
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="ruleForm"
                 label-width="0px">
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone"
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password"
                      prop="password"
                      v-model="ruleForm.password"
                      placeholder="密码"></el-input>
          </el-form-item>

          <div class="wjzc-item">
            <el-link href=""
                     target="_blank">忘记密码？</el-link>
            <el-link type="primary"
                     @click="ONzc">没有帐号，立即注册 ></el-link>
          </div>

          <!-- 登录重置 -->
          <el-form-item class="odengl">
            <el-button type="primary"
                       @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 手机登录 -->
      <div v-if="types == 'phoneLogin'">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="0px">

          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone"
                      placeholder="手机号"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input v-model="ruleForm.code"
                      class="code"
                      placeholder="手机验证码"></el-input>
            <el-button type="primary"
                       @click="onCode">发送验证码</el-button>
          </el-form-item>

          <div class="wjzc-item">
            <el-link href=""
                     target="_blank"></el-link>
            <el-link type="primary"
                     @click="ONzc">没有帐号，立即注册 ></el-link>
          </div>

          <!-- 登录重置 -->
          <el-form-item class="odengl">
            <el-button type="primary"
                       @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

        </el-form>
      </div>

      <!-- 注册 -->
      <div v-if="types == 'register'">
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="0px">

          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone"
                      placeholder="手机号"></el-input>
          </el-form-item>

          <el-form-item prop="pass">
            <el-input type="password"
                      v-model="ruleForm.pass"
                      placeholder="密码"
                      show-password
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input type="password"
                      placeholder="确定密码"
                      show-password
                      v-model="ruleForm.checkPass"
                      autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input v-model="ruleForm.code"
                      class="code"
                      placeholder="手机验证码"></el-input>
            <el-button type="primary"
                       v-show="show"
                       @click="onCode">获取验证码</el-button>
            <el-button type="primary"
                       v-show="!show"
                       class="count">{{count}}</el-button>
          </el-form-item>

          <div class="wjzc-item">
            <el-link href=""
                     target="_blank"></el-link>
            <el-link type="primary"
                     @click="ONdl">已有帐号，立即登录 ></el-link>
          </div>

          <!-- 登录重置 -->
          <el-form-item class="odengl">
            <el-button type="primary"
                       @click="submitForm1('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

        </el-form>
      </div>

      <div class="dibu">
        <span>球冠提示您:</span>点击注册表示您同意并愿意遵守 《法律声明》</div>
    </div>

  </div>

</template>
<script >
import Qs from 'qs'
export default {
  data () {
    var reg = /^[a-zA-Z]\w{7,15}$/;
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!reg.test(value)) {
        return callback(new Error('密码（长度8-16， 必须字母开头，且包含数字）'));
      } else {
        callback()
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请再次输入密码'));
      } else if (!reg.test(value)) {
        return callback(new Error('密码（长度8-16， 必须字母开头，且包含数字）'));
      } if (value !== this.ruleForm.pass) {
        return callback(new Error('两次输入密码不一致!'));
      } else {
        callback()
      }
    }
    // 验证码
    var code = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('验证码不能为空'));
      }
      if (!this.codeVal) {
        return callback(new Error('请先获取验证码'));
      }
      if (value != this.codeVal) {
        return callback(new Error('验证码错误'));
      }
      else {
        callback()
      }

    }
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      } else {
        if (phoneReg.test(value)) {
          callback()
        } else {
          callback(new Error('电话号码格式不正确'))
        }
      }
    };
    return {

      //  验证码
      show: true,
      count: '',
      timer: null,
      codeVal: '',

      msg: '',



      // 登录类型
      types: 'passwardLogin',

      ruleForm: {
        password: '',


        code: '',
        phone: '',
        pass: '',
        checkPass: '',
      },
      rules: {
        name: [
          { required: true, message: '用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, validator: code, trigger: 'blur' }
        ],

        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],

        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 返回上一页
    // ONsy () {
    //   window.history.back();
    // },
    // 注册
    submitForm1 (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var formData = Qs.stringify({
            mobile: this.ruleForm.phone,
            password: this.ruleForm.pass,
            code: this.ruleForm.code
          });
          try {
            const { data: res } = await this.$http.request({
              url: '/user/register/',
              method: 'POST',
              data: formData,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }

            })
            if (res.status == 400) {
              return this.$message.error(res.msg)
            } else {
              this.$message.success('登录成功')
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", res.data.username);
              localStorage.setItem("user_id", res.data.user_id);
              localStorage.setItem("user_g", JSON.stringify(res));
              // window.history.back();
              this.$router.replace({ name: 'index' })
            }
          } catch (error) {
            return this.$message.error('验证码过期')
          }


        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 登录
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var formData = Qs.stringify({
            username: this.ruleForm.phone,
            password: this.ruleForm.password,
          });
          const { data: res } = await this.$http.request({
            url: '/user/login/',
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
          if (res.status == 400) {
            // this.msg = res.msg
            return this.$message.error(res.msg)
          } else {
            this.$message.success('登录成功')
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            localStorage.setItem("user_id", res.data.user_id);
            localStorage.setItem("timestamp", res.data.timestamp);
            localStorage.setItem("user_g", JSON.stringify(res));


            // console.log( res.data.token.split('.')[1])
            // window.history.back();
            this.$router.replace({ name: 'index' })

          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },


    // 验证码
    async onCode () {

      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000)
      }

      //  发送验证码
      var formData = Qs.stringify({
        mobile: this.ruleForm.phone
      });
      const { data: res } = await this.$http.request({
        url: '/user/send_code/',
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
      this.codeVal = res.code
      return this.$message.error(res.msg)
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 登录类型
    ONpassward () {
      this.types = 'passwardLogin'
      this.$refs.ruleForm.resetFields();
    },
    ONphone () {
      this.types = 'phoneLogin'
      this.$refs.ruleForm.resetFields();
    },
    // 登录注册切换
    ONdl () {
      this.types = 'passwardLogin'
      this.$refs.ruleForm.resetFields();
    },
    ONzc () {
      this.types = 'register'
      this.$refs.ruleForm.resetFields();
    }


  }
}
</script>
<style lang = 'less' scoped >
.user_bj {
  width: 100%;
  height: 100%;
  background-color: #fff !important;
  -webkit-filter: blur(3px);
  filter: blur(3px);
  position: absolute;
  top: 0;
  left: 0;
}

.logo {
  display: flex;
  justify-content: center;
  .el-image {
    width: 130px;
  }
}

.user_box {
  position: absolute;
  z-index: 99;
  width: 540px;
  height: 580px;
  background: #fff;
  top: 50%;
  left: 50%;
  margin-left: -270px;
  margin-top: -290px;
}
.el-form {
  width: 400px;
  margin-left: 70px;
  display: flex;
  flex-direction: column;
}
.wjzc-item {
  display: flex;
  justify-content: space-between;
}
.odengl {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.fs {
  margin: 20px 70px;
  color: #9f8c8c;
  cursor: pointer;
}
.dibu {
  color: #969696;
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
  span {
    color: #58a1f5;
  }
}
.code {
  width: 280px;
}
</style>
