<template>
  <div class="gWidth news_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="news_left fl">
      <h2 style="font-weight: normal;margin-left:10px;display: flex;justify-content: space-between;">
        <span>五大联赛新闻</span>
        <div class="dates">
          <el-date-picker v-model="dateval"
                          @change='ondate'
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
          <el-input placeholder="请输入关键字"
                    prefix-icon="el-icon-search"
                    v-model="input2">
          </el-input>
        </div>
      </h2>
      <el-divider></el-divider>
      <div class="tab_Date_filtering">
        <!-- 选项卡 -->
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="英超"
                       name="36">
          </el-tab-pane>
          <el-tab-pane label="西甲"
                       name="31">
          </el-tab-pane>
          <el-tab-pane label="意甲"
                       name="34"></el-tab-pane>
          <el-tab-pane label="德甲"
                       name="8"></el-tab-pane>
          <el-tab-pane label="法甲"
                       name="11"></el-tab-pane>
          <el-tab-pane label="其他"
                       name="six"></el-tab-pane>
        </el-tabs>
      </div>

      <ul>
        <li v-for="(item,index) in newList"
            :key="index">
          <router-link target="_blank"
                       :to="{name:'newdetail',params:{recordId:item.recordId}}">
            <span style="margin-right:20px"
                  v-if="currentPage1 == 1">{{index+currentPage1}}</span>
            <span style="margin-right:20px"
                  v-else>{{index+currentPage1*10-9}}</span>
            <el-image :fit="none"
                      :src="`http://qiuguantx.com/${item.img}`"></el-image>
            <div class="tit">
              <h3>
                <p v-html="item.title"></p>
                <p style="color:#898a89;font-size: 14px;">{{item.userName}}</p>
              </h3>
              <!-- <p class="bt"
                 v-html="item.content"></p> -->
              <p class="pl">{{item.reprinted}} {{item.publicTime}}</p>
            </div>
          </router-link>
          <el-divider></el-divider>
        </li>
      </ul>

      <div class="block"
           style="display:flex;justify-content:center;align-items:center">
        <el-pagination :page-size="10"
                       background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage1"
                       :total="total"
                       layout="prev, pager, next">
        </el-pagination>
      </div>
    </el-card>
    <!-- 新闻右边内容 -->
    <div class="news_right_box fr">
      <h3 style="margin-left:10px;">球冠热门新闻</h3>
      <el-divider></el-divider>
      <div class="news_right_top">
        <div class="img_tit"
             v-for="(item,index) in results.slice(0,4)"
             :key="index">
          <div class="imgs">
            <el-image :src="`http://qiuguantx.com/${item.img}`"></el-image>
          </div>
          <p>
            <router-link target="_blank"
                         :to="{name:'newdetail',params:{recordId:item.recordId}}">{{item.title}}</router-link>

          </p>
        </div>

      </div>
      <div class="news_right_bottom">
        <p v-for="(item,index) in results.slice(4,10)"
           :key="index">
          <router-link target="_blank"
                       :to="{name:'newdetail',params:{recordId:item.recordId}}">{{item.title}}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script >
export default {
  data () {
    return {
      currentPage1: 1,
      activeName: '36',
      total: 0,
      dateval: '',
      input2: '',
      newList: [],
      sclassId: 36,
      getListnew: [],
      results: []
    };
  },
  created () {
    this.jk({ sclassId: 36 })
    this.rm()
  },
  methods: {
    async handleClick (tab) {
      this.currentPage1 = 1
      this.dateval = ''
      this.sclassId = tab.name
      if (tab.name == 'six') {
        this.jk({})
      } else {
        this.jk({ sclassId: tab.name })
      }

    },
    async ondate () {
      if (this.sclassId == 'six') {
        this.jk({ publicTime: this.dateval })
      } else {
        this.jk({ sclassId: this.sclassId, publicTime: this.dateval })
      }
    },
    async jk (obj) {
      const { data: res } = await this.$http.get(`/showJournalism`, { params: obj });
      res.results.forEach(item => {
        // item.content = item.content.split('<p>')[1];
        item.img = this.imgString(item.content)
      })
      this.newList = res.results
      this.total = res.count
      // console.log(this.newList)
      // this.imgString()
    },

    async handleSizeChange (val) {
      let obj = {}
      if (this.sclassId != 'six') {
        obj.sclassId = this.sclassId
      }

      obj.page = val
      if (this.dateval) {
        obj.publicTime = this.dateval
      }
      this.jk(obj)
    },
    async handleCurrentChange (val) {
      this.index_ss = val
      let obj = {}
      if (this.sclassId != 'six') {
        obj.sclassId = this.sclassId
      }
      obj.page = val
      if (this.dateval) {
        obj.publicTime = this.dateval
      }
      this.jk(obj)
    },

    async rm () {
      let obj = { hotNews: 1 }
      const { data: res } = await this.$http.get(`/showJournalism`, { params: obj });
      // console.log(res, 111)
      res.results.forEach(item => {
        item.img = this.imgString(item.content)
      })
      this.results = res.results
    },

    imgString (str) {
      var data = '';
      str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
        data = capture;
      });
      return data
    },


  }
}
</script>
<style lang = 'less' scoped >
.news_box {
  &::after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .news_left {
    width: 920px;
    border-right: 4px solid #f2f2f2;
    box-sizing: border-box;
    background: #fff;
    padding: 20px 0;
    .el-tabs {
      width: 900px;
      margin: 0 10px;
    }
    ul {
      li {
        a {
          width: 100%;
          color: #444;
          display: flex;
          justify-content: space-between;
          &:hover h3 {
            color: #3680d8;
          }
        }
        span {
          display: inline-block;
          font-size: 20px;
          display: inline-block;
          color: #b9001e;
          margin: 0 0 0 20px;
        }
        .el-image {
          width: 120px;
          height: 100px;
        }
        .tit {
          width: 720px;
          margin: 0 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #444;
            .sx {
              font-size: 14px;
              color: #81838b;
            }
          }
          .bt {
            width: 100%;
            font-size: 14px;
            color: #898a89;
          }
          .pl {
            width: 100%;
            font-size: 14px;
            color: #898a89;
          }
        }
      }
    }
  }
}
/* 右边内容 */
.news_right_box {
  width: 280px;
  background: #fff;
  padding: 20px 0;

  h6 {
    margin-left: 10px;
  }
  .news_right_top {
    color: #898a89;
    margin-left: 10px;
    .img_tit {
      height: 70px;
      width: 260px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      &:hover .el-image {
        transform: scale(1.2);
        transition: 0.2s;
      }
      .imgs {
        width: 100px;
        height: 70px;
        overflow: hidden;
        .el-image {
          width: 100%;
          height: 100%;
        }
      }
      p {
        width: 150px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .news_right_bottom {
    width: 260px;
    margin-left: 10px;
    p {
      width: 100%;
      font-size: 14px;
      line-height: 30px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }
  }
}

/* 选项卡日期 */
.dates {
  width: 420px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .el-input {
    width: 200px;
  }
}
a {
  &:hover {
    color: #3680d8;
  }
}
</style>