<template>
  <div class="gWidth soccer_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>足球中心</el-breadcrumb-item>

    </el-breadcrumb>
    <!-- 选项卡 -->
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in sclassInfoList"
                   :key="index"
                   :label="item.infoNav"
                   :name="item.infoNav">
        <!-- 选项卡内容 -->

        <div class="soccer_xbox">
          <!-- 字内容 -->
          <div class="soccer_xbox_item"
               v-for="(i,index) in item.XList"
               :key="index">
            <router-link :to="{name:'league',params:{sclassID:i.XList[0].sclassID}}">
              <el-image :src="'http://qiuguantx.com/img/info/'+i.flagpic"></el-image>
            </router-link>

            <el-dropdown placement="bottom"
                         size="mini">
              <span class="el-dropdown-link">
                {{i.namecn}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item 
                                  :command="ii.sclassID"></el-dropdown-item> -->
                <ul class="xl_ul">
                  <li v-for="(ii,index) in i.XList"
                      :command="ii.sclassID"
                      :key="index">
                    <router-link :to="{name:'league',params:{sclassID:ii.sclassID}}">{{ii.name_js}}</router-link>

                    <!-- <router-link :to="{path:'/soccer/league',query:{sclassID:ii.sclassID}}">{{ii.name_js}}</router-link> -->
                  </li>
                </ul>
              </el-dropdown-menu>

            </el-dropdown>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script >
export default {
  data () {
    return {
      activeName: "欧洲赛事",
      sclassInfoList: [],
      SclassLists: []
    };
  },
  created () {
    this.getSclassInfo()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },

    async getSclassInfo () {
      const res = await this.$http.get('soccer/sclassInfo/');
      if (res.status !== 200) return console.log('sclassInfo获取失败');
      this.sclassInfoList = res.data.infoNavList;
      console.log(this.sclassInfoList)
    }
  }
}
</script>
<style lang = 'less' scoped >
.xl_ul {
  width: 300px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
  li {
    width: 100px;
    line-height: 20px;
    text-align: center;
    &:hover {
      background: #ecf5ff;
    }
    &:hover a {
      color: #66b1ff;
    }
    a {
      font-size: 14px;
      width: 100%;
      display: inline-block;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.soccer_box {
  /* background: #fff; */
  .el-tabs {
    padding: 20px;
    background: #fff;
    .soccer_xbox {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      /* justify-content: space-between; */

      .soccer_xbox_item {
        width: 140px;
        height: 160px;
        margin-left: 26px;
        margin-bottom: 10px;
        border: 1px solid #eee;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        position: relative;
        &:nth-child(1) {
          margin-left: 10px;
        }
        &:nth-child(7n + 1) {
          margin-left: 10px;
        }
        .el-image {
          width: 100px;
          height: 100px;
          margin-bottom: 10px;
        }
        .el-dropdown {
        }
      }
    }
  }
}
</style>