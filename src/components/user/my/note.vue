<template>
  <div class="">
    <h2>我的笔记</h2>
    <el-card style="margin-top:10px">
      <div class="note_box">
        <i class="el-icon-sunny"></i>
        <h4>如果您认为可以提供高质量‘赛前分析’</h4>
        <p>您可以将您的履历和范文发送至：
          <span style="color: rgb(64, 158, 255);">yemachenaiwenhua@163.com</span>
        </p>
        <p class="p">
          我们确认后可为您开通权限
        </p>

      </div>

    </el-card>

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
.note_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 30px;
  h4 {
    font-size: 18px;
    font-weight: 900;
  }
  .p {
    font-size: 14px;
  }
  i {
    font-size: 90px;
    color: #eee;
  }
}
</style>