<template>
  <div class="money_box_s">
    <h2>充值球冠币</h2>
    <el-card style="margin-top:10px">
      <div>
        <b>账户余额：</b>
        <b style="color:rgb(232, 75, 91);margin-right:10px">{{QiuGuanBi}} 个球冠币</b>
      </div>
    </el-card>
    <el-divider content-position="left">
      <b style="font-size:18px">充值球冠币</b>
    </el-divider>
    <el-card class="money_boxs">
      <b style="color: rgb(232, 75, 91);">
        <!-- <router-link target="_blank"
                     style="color: rgb(232, 75, 91);"
                     to="">新用户充值300送30，活动详情>></router-link> -->
        100个球冠币 = 1元
      </b>
      <div class="money_box">
        <div class="money_cz">
          <b>充值金额：</b>
          <el-input placeholder="其他数量"
                    v-model="money_num"
                    @input='addressChange'>
          </el-input>个球冠币
        </div>
        <div class="money_cz">
          <b>充值方式：</b>
          <div class="tp_div">
            <div class="tp"
                 :class="active_zf == 0?'active_':''"
                 @click="act1">
              <el-image src="/static/wx/WePayLogo.png"></el-image>
              <span style="backgroundImage: url(/static/wx/dui.gif)"></span>
            </div>
            <div class="tp"
                 :class="active_zf == 1?'active_':''"
                 @click="act2">
              <el-image src="/static/wx/zfb.jpg"></el-image>
              <span style="backgroundImage: url(/static/wx/dui.gif)"></span>
            </div>
          </div>
        </div>

        <div class="money_cz">
          <b>应付金额：</b>
          <span style="color:rgb(232, 75, 91);width:268px">{{money_num/100}} 元</span>
        </div>
        <el-button type="primary"
                   @click="Oncharge">确认支付</el-button>

      </div>

      <div style="width:100%">
        <el-divider></el-divider>
        <div class="tit-ts">
          <h6>提示：</h6>
          <p>1.充值的球冠币不可以用于任何形式的竞猜；</p>
          <p>2.充值球币仅限用于付费查看、付费阅读、打赏作者；</p>
          <p>3.为防止套现，充值球币只可用于消费，不能提现；</p>
          <p>4.充值疑问，
            <router-link target="_blank"
                         style="color:#409EFF"
                         to="">点击帮助 </router-link>。</p>
        </div>
      </div>

    </el-card>
    <!-- 支付方式 -->
    <div class="zf_sty_ss"
         v-if="block_s_zf">
      <el-card class="zf_sty_s">
        <div class="zf_sty_p">
          <p>订单编号：{{res_ss}}</p>
          <p>购买商品：球冠币充值</p>
          <p>应付金额：￥{{money_num/100}}元</p>
        </div>

        <div class="zf_ewm">
          <div id="qrcode"></div>
        </div>
        <el-link type="primary"
                 :underline="false"
                 class="zf_sty_a">《交易协议》</el-link>
        <div>
          <el-link type="info"
                   class="zf_sty_X"
                   @click="On_X">X</el-link>
        </div>
      </el-card>
    </div>

  </div>
</template>
<script >
import QRCode from "qrcodejs2"
import Qs from 'qs'
export default {
  data () {
    return {
      active_zf: 0,
      money_num: '',

      block_s_zf: false,
      res_ss: '',

      QiuGuanBi: 0
      // link: 'weixin://wxpay/bizpayurl?pr=pQ1QR4i00'
    };
  },
  components: { QRCode },
  created () {
    var temp = sessionStorage.getItem("user_g")
    let user_g = JSON.parse(temp);
    this.QiuGuanBi = user_g.data.QiuGuanBi
  },
  destroyed () {
    clearInterval(this.Polling);
  },
  methods: {
    //  生成二维码
    qrcode (link) {
      let that = this;
      let qrcode = new QRCode('qrcode', {
        width: 125,
        height: 125,        // 高度
        // text: this.link,   // 二维码内容
        text: link,
        // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f',   // 背景色
        // foreground: '#ff0'    // 前景色
      })
    },
    // 微信支付宝切换
    act1 () {
      this.active_zf = 0
    },
    act2 () {
      this.active_zf = 1
    },
    // 支付关闭
    On_X () {
      this.block_s_zf = false
      clearInterval(this.Polling);
    },

    // 确认支付
    async Oncharge () {
      if (this.money_num) {
        if (this.money_num >= 1) {
          var formData = Qs.stringify({
            body: '球冠网充值—球冠币充值',
            fee: this.money_num * 100
          });
        } else {
          return this.$message.error('最少充值100个球冠币')
        }

      } else {
        return this.$message.error('请正确输入数值')
        // this.money_num = 10
      }

      // 判断是否登录
      // 显示
      var that = this
      const tokenStr = localStorage.getItem('token')
      if (!this.$getMyConfig.getConfig() && tokenStr) {
        this.block_s_zf = true
        // 判断微信支付宝
        if (this.active_zf === 0) {
          // 初始二维码
          var { data: res } = await that.$http.request({
            url: '/pay/WXQiuGuanBiPay',
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
          this.res_ss = res.out_trade_no
          // 微信支付
          async function myInterval () {
            var formDatas = Qs.stringify({
              out_trade_no: res.out_trade_no
            });
            var { data: WinXinPayState } = await that.$http.request({
              url: '/pay/WinXinPayState',
              method: 'POST',
              data: formDatas,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            })
            // console.log(WinXinPayState)
            if (WinXinPayState.return_code == 1) {

              that.$router.push({ name: 'goldpay' });

              // that.$router.go(0);
            }
          }
          // myInterval()
          if (res.return_msg == 'OK' && res.return_code == "SUCCESS") {
            this.Polling = setInterval(() => {
              myInterval()
            }, 3000)
          }
          this.$nextTick(function () {
            this.qrcode(res.code_url);
          })
        } else {

        }
      } else {
        return this.$message.error('登录过期请重新登录')
      }

    },


    // * 校验正负正数就返回true
    isIntNum (val) {
      var regPos = / ^\d+$/; // 非负整数 
      var regNeg = /^\-[1-9][0-9]*$/; // 负整数
      if (regPos.test(val) && regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    addressChange (v) {
      if (isNaN(v)) {
        this.money_num = 100
        return this.$message.error('请正确输入数值')
      } else {
        if (this.money_num > 10000000) {
          this.money_num = 100
          return this.$message.error('充值金额最大为100000')
        }
        var xx = ((this.money_num + '').indexOf('.') != -1) ? true : false;
        if (xx) {
          this.money_num = 100
          return this.$message.error('充值金额不能为小数')
        }
      }
    }
  }
}
</script>
<style lang = 'less' scoped >
.money_boxs {
  /* width: 100%;
  display: flex;
  justify-content: center; */
}
.money_box {
  width: 350px;
  margin-left: 50%;
  transform: translateX(-175px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.money_cz {
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  b {
    display: inline-block;
    width: 80px;
  }
  .el-input {
    width: 200px;
  }
  .tp_div {
    width: 268px;
    display: flex;

    .tp {
      width: 100px;
      height: 40px;
      border: solid 1px #cccccc;
      margin-right: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-image {
        width: 80px;
      }
    }
    .active_ {
      border: 2px solid #f05555;
      position: relative;
      span {
        position: absolute;
        height: 14px;
        width: 14px;
        right: -2px;
        bottom: -2px;
        display: block;
      }
    }
  }
}
.tit-ts {
  h6 {
    font-size: 14px;
    color: #666;
    line-height: 24px;
    padding: 20px 0 0 80px;
  }
  p {
    font-size: 14px;
    color: #666;
    line-height: 16px;
    padding: 20px 0 0 80px;
  }
}

.zf_ewm {
  display: flex;
  justify-content: center;
}

.money_box_s {
  height: 100%;
  overflow: hidden;
}
.zf_sty_ss {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.2);
  .zf_sty_s {
    position: absolute;
    width: 300px;
    height: 300px;
    background: #fff;
    top: 50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -150px;
    .zf_sty_p {
      text-align: center;
      margin: 20px 0;
      p {
        font-size: 14px;
        line-height: 20px;
        color: #999;
      }
    }
    .zf_sty_a {
      text-align: center;
      width: 100%;
      margin-top: 20px;
    }
    .zf_sty_X {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
}
</style>