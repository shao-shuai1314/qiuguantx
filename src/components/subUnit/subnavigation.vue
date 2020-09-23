<template>
  <!-- 子导航 -->
  <div class="subnavigation_box">
    <ul class="subnavigation_xbox gWidth">
      <li style="margin-right:40px">热门赛事 </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:36}}">
          英超
        </router-link>
        <span class="subnav_sty">
          <router-link target="_blank"
                       :to="{name:'league',params:{sclassID:36}}">
            英超
          </router-link>
          <router-link target="_blank"
                       :to="{name:'league',params:{sclassID:37}}">
            英冠
          </router-link>
        </span>
        <i class="el-icon-arrow-down"></i>
        <el-divider direction="vertical"></el-divider>
      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:31}}">西甲</router-link>
        <el-divider direction="vertical"></el-divider>
      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:34}}">意甲</router-link>
        <el-divider direction="vertical"></el-divider>
      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:8}}">
          德甲
        </router-link>
        <span class="subnav_sty">
          <router-link target="_blank"
                       :to="{name:'league',params:{sclassID:8}}">
            德甲
          </router-link>
          <router-link target="_blank"
                       :to="{name:'league',params:{sclassID:9}}">
            德乙
          </router-link>
        </span>
        <i class="el-icon-arrow-down"></i>
        <el-divider direction="vertical"></el-divider>
      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:11}}">法甲</router-link>
        <span class="subnav_sty">
          <router-link target="_blank"
                       :to="{name:'league',params:{sclassID:11}}">
            法甲
          </router-link>
          <router-link target="_blank"
                       :to="{name:'league',params:{sclassID:12}}">
            法乙
          </router-link>
        </span>
        <i class="el-icon-arrow-down"></i>
        <el-divider direction="vertical"></el-divider>

      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:60}}">中超</router-link>
        <el-divider direction="vertical"></el-divider>

      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:192}}">亚冠杯</router-link>
        <el-divider direction="vertical"></el-divider>

      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:103}}">欧冠杯</router-link>
        <el-divider direction="vertical"></el-divider>

      </li>
      <li>
        <router-link :to="{name:'league',params:{sclassID:113}}">欧罗巴杯</router-link>
      </li>

    </ul>
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
.subnavigation_box {
  /* height: 30px; */
  width: 100%;
  background: #3680d8;
  margin: 10px 0 10px 0;
  .subnavigation_xbox {
    /* height: 30px; */
    display: flex;
    align-items: center;
    li {
      margin-right: 10px;
      font-size: 16px;
      color: #fff;
      line-height: 30px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:hover i {
        transform: rotate(180deg);
        /* color: #409eff; */
        transition: 0.3s;
      }
      &:hover .subnav_sty {
        display: block;
      }
      a {
        font-size: 14px;
        color: #fff;
      }
      .subnav_sty {
        width: 80%;
        position: absolute;
        top: 30px;
        left: 0;
        background: #fff;
        border: 1px solid #eee;
        z-index: 9999999;
        display: none;
        /* width: 70px; */
        a {
          width: 100%;
          text-align: center;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #000;
          &:hover {
            color: #409eff;
            background: #eee;
          }
        }

        /* display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        overflow: hidden;
        width: 50px;
        margin-left: 40px; */
      }
      i {
        /* position: absolute;
        right: 0;
        bottom: 0; */
        font-size: 12px;
      }
    }
  }
}
</style>