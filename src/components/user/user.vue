<template>
  <div>
    <!-- 背景 -->
    <div class="user_bj"></div>
    <!-- 用户表单 -->
    <div class="user_box">
      <!-- 返回上一页 -->
      <div>
        <el-link type="primary"
                 @click="ONsy">
          &lt; 返回上一页</el-link>
      </div>

      <!-- logo -->
      <div class="logo">
        <router-link :to="{ path: '/' }">
          <el-image src="../../../static/logo.png"></el-image>
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
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name"
                      placeholder="登录名/手机号"></el-input>
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
                       @click="">发送验证码</el-button>
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
                       @click="">发送验证码</el-button>
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
                       @click="submitForm('ruleForm')">注册</el-button>
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
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
      }
    }
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    };
    return {
      // 登录类型
      types: 'passwardLogin',

      ruleForm: {
        name: '',
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
          { required: true, message: '验证码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 4 到 5 个字符', trigger: 'blur' }
        ],

        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],

        password: [
          { required: true, message: '用户密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 6 到 10 个字符', trigger: 'blur' }
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
    ONsy () {
      window.history.back();
    },
    // 表单验证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
  background: url('../../../static/qiuchang.jpg') no-repeat center;
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
