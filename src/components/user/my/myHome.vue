<template>
  <div class="gWidth">
    <el-card>
      <div class="my-box">
        <div class="card1">
          <el-menu :default-active="router_s"
                   unique-opened
                   router
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose">
            <el-submenu v-for="(item,index) in list"
                        :key="index"
                        :index="item.index">
              <template slot="title">
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="ii.index"
                              v-for="(ii,is) in item.list"
                              :key="is">{{ii.name}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
        <el-card class="card2">
          <router-view />
        </el-card>
      </div>
    </el-card>
  </div>
</template>
<script >
export default {
  data () {
    return {
      router_s: '',
      list: [
        {
          name: '个人信息',
          index: '1',
          list: [
            {
              name: '个人信息',
              index: 'userinfo'
            },
          ]
        },
        {
          name: '我的社交',
          index: '2',
          list: [
            {
              name: '我的关注',
              index: '2-2'
            },
            {
              name: '我的笔记',
              index: 'note'
            }, {
              name: '我的收藏',
              index: 'collect'
            }, {
              name: '我的购买',
              index: 'buy'
            },
          ]
        },
        {
          name: '账户管理',
          index: '3',
          list: [
            {
              name: '我的钱包',
              index: 'goldpay'
            },
            {
              name: '充值',
              index: 'money'
            },
            {
              name: '提款',
              index: '1'
            },
          ]
        },
        {
          name: '帮助管理',
          index: '4',
          list: [
            {
              name: '帮助中心',
              index: '4-4'
            },
            {
              name: '反馈记录',
              index: '4-4'
            },
          ]
        },
      ]

    };
  },
  watch () {

  },
  async created () {
    // console.log(this.$route.name)
    this.router_s = this.$route.name
    console.log(this.router_s)
    if (!this.$getMyConfig.getConfig()) {
      const { data: res } = await this.$http.get(`/user/userinfo/`);
      if (res.data.is_editor) {
        this.list[1].list.push({ name: '新闻发布', index: 'writeNews' })
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },

  }
}
</script>
<style lang = 'less' scoped >
.my-box {
  display: flex;
  justify-content: space-between;
}
.card1 {
  width: 200px;
}
.card2 {
  width: 940px;
}
</style>