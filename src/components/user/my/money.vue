<template>
  <div class="">
    <h2>充值球冠币</h2>
    <el-card style="margin-top:10px">
      <div>
        <b>账户余额：</b>
        <b style="color:rgb(232, 75, 91);margin-right:10px">0 球冠币</b>
      </div>
    </el-card>
    <el-divider content-position="left">
      <b style="font-size:18px">充值球冠币</b>
    </el-divider>
    <el-card class="money_boxs">
      <p>
        <router-link target="_blank"
                     style="color: rgb(232, 75, 91);"
                     to="">新用户充值300送30，活动详情>></router-link>
      </p>
      <div class="money_box">
        <div class="money_cz">
          <b>充值金额：</b>
          <el-input placeholder="其他数量"
                    v-model="money_num">
          </el-input>个球冠币
        </div>
        <div class="money_cz">
          <b>充值方式：</b>
          <div class="tp_div">
            <div class="tp"
                 :class="active_zf == 0?'active_':''"
                 @click="act1">
              <el-image src="../../static/wx/WePayLogo.png"></el-image>
              <span style="backgroundImage: url(../../static/wx/dui.gif)"></span>
            </div>
            <div class="tp"
                 :class="active_zf == 1?'active_':''"
                 @click="act2">
              <el-image src="../../static/wx/zfb.jpg"></el-image>
              <span style="backgroundImage: url(../../static/wx/dui.gif)"></span>
            </div>
          </div>

        </div>
        <div class="money_cz">
          <b>应付金额：</b>
          <span style="color:rgb(232, 75, 91);width:268px">{{money_num}} 元</span>
        </div>
        <el-button type="primary">确认支付</el-button>

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

  </div>
</template>
<script >
export default {
  data () {
    return {
      active_zf: 0,
      money_num: '',
    };
  },
  methods: {
    act1 () {
      this.active_zf = 0
    },
    act2 () {
      this.active_zf = 1
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
</style>