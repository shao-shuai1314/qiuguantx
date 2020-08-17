<template>
  <div class="gWidth">
    <div class="fl"
         style="margin-top:-4px">
      <el-table :data="tableData"
                height="900"
                border
                size="mini"
                :header-cell-style="{
    'color': '#303133',
    'border-bottom': '1px rgb(103, 194, 58) solid',
    'text-align':'center',
    'font-size':'16px',
}"
                style="width: 710px">
        <el-table-column prop="content"
                         label="直播详情"
                         width="">
          <template slot-scope="scope">
            <div>
              <span style="margin-left:10px"
                    v-html="scope.row.content"></span>
            </div>
          </template>
        </el-table-column>

      </el-table>

    </div>
    <el-card class="statistics_box_right fr">

      <div class="statistics_box_top">
        <h6>
          <span>{{Score}} 完</span>
        </h6>
        <dl v-for="(item,i) in detailResultList"
            :key="i">
          <!-- 主场 -->
          <dd class="zhu">
            <div v-if="item.teamID == homeTeamID">
              <p>
                <svg class="icon"
                     v-if="item.kind == 11"
                     aria-hidden="true">
                  <use :xlink:href="teamStyle[4]"></use>
                </svg>
                <router-link target="_blank"
                             v-if="item.playerID"
                             :to="{name:'playerDetails',params:{playerID:item.playerID}}">
                  {{homeNumber[item.playerID]}} {{item.playerName}}
                </router-link>
                <svg class="icon"
                     v-if="item.kind == 11"
                     aria-hidden="true">
                  <use :xlink:href="teamStyle[5]"></use>
                </svg>
                <svg class="icon"
                     v-else
                     aria-hidden="true">
                  <use :xlink:href="teamStyle[item.kind]"></use>
                </svg>
                <span v-if="item.playerName_in">
                  <span v-if="item.kind == 1">
                    (助攻：
                    <router-link target="_blank"
                                 v-if="item.playerID_in"
                                 :to="{name:'playerDetails',params:{playerID:item.playerID_in}}">
                      {{homeNumber[item.playerID_in]}} {{item.playerName_in}}
                    </router-link>)
                  </span>
                  <span v-else>
                    <router-link target="_blank"
                                 v-if="item.playerID_in"
                                 :to="{name:'playerDetails',params:{playerID:item.playerID_in}}">
                      {{homeNumber[item.playerID_in]}} {{item.playerName_in}}
                    </router-link>
                  </span>
                </span>

              </p>
            </div>
          </dd>
          <!-- 时间 -->
          <dd class="shi">
            <span>{{item.happentime}} '</span>
          </dd>
          <!-- 客场 -->
          <dd class="ke">
            <div v-if="item.teamID == guestteamID">
              <p>
                <svg class="icon"
                     v-if="item.kind == 11"
                     aria-hidden="true">
                  <use :xlink:href="teamStyle[4]"></use>
                </svg>
                <router-link target="_blank"
                             v-if="item.playerID"
                             :to="{name:'playerDetails',params:{playerID:item.playerID}}">
                  {{guestNumber[item.playerID]}} {{item.playerName}}</router-link>
                <svg class="icon"
                     v-if="item.kind == 11"
                     aria-hidden="true">
                  <use :xlink:href="teamStyle[5]"></use>
                </svg>
                <svg class="icon"
                     v-else
                     aria-hidden="true">
                  <use :xlink:href="teamStyle[item.kind]"></use>
                </svg>
                <span v-if="item.playerName_in">
                  <span v-if="item.kind == 1">(助攻：
                    <router-link target="_blank"
                                 v-if="item.playerID_in"
                                 :to="{name:'playerDetails',params:{playerID:item.playerID_in}}">
                      {{guestNumber[item.playerID_in]}} {{item.playerName_in}}</router-link>
                    )</span>
                  <span v-else>
                    <router-link target="_blank"
                                 v-if="item.playerID_in"
                                 :to="{name:'playerDetails',params:{playerID:item.playerID_in}}">
                      {{guestNumber[item.playerID_in]}} {{item.playerName_in}}</router-link>
                  </span>
                </span>

              </p>
            </div>
          </dd>
        </dl>
        <h6>
          <span>结束</span>
        </h6>

      </div>
      <!-- 图标 -->
      <div class="statistics_box_bottom">
        <dl>
          <dd>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-jinqiu"></use>
            </svg>
            <p>进球</p>
          </dd>
          <dd>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-zuqiuwulongqiu"></use>
            </svg>
            <p>乌龙球</p>
          </dd>
          <dd>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-dianqiu"></use>
            </svg>
            <p>点球</p>
          </dd>
          <dd>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-huanru"></use>
            </svg>
            <p>换入</p>
          </dd>
          <dd>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-huanchu"></use>
            </svg>
            <p>换出</p>
          </dd>
          <dd>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-hongpai"></use>
            </svg>
            <p>红牌</p>
          </dd>
          <dd>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-huangpai"></use>
            </svg>
            <p>黄牌</p>
          </dd>
          <dd>
            <svg class="icon"
                 aria-hidden="true">
              <use xlink:href="#icon-lianghuangbianhong1"></use>
            </svg>
            <p>两黄变红</p>
          </dd>
        </dl>
      </div>
    </el-card>
  </div>
</template>
<script >
export default {
  data () {
    return {
      tableData: [],
      detailResultList: [],
      homeNumber: [],
      guestNumber: [],
      teamStyle: ['', '#icon-jinqiu', "#icon-hongpai", "#icon-huangpai", '#icon-huanru', '#icon-huanchu', '', '#icon-dianqiu', "#icon-zuqiuwulongqiu", "#icon-lianghuangbianhong1", , , , , "#icon-zhugongbang",],
      Score: sessionStorage.getItem('Score')
    };
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0);
      console.log(111)
    }
  },
  created () {
    this.onDataList()
    this.onPlayerStatisticsList()
  },
  methods: {
    async onDataList () {
      const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/textLive/`);
      res.data.data_list.reverse()
      res.data.data_list.forEach(item => {
        item.content = `
        <b style="color:rgb(187, 68, 68)">${item.content.slice(0, 3)}</b>
        ${item.content.slice(3, item.content.lastIndexOf('['))}
        <b style="color:rgb(187, 68, 68)">${item.livetime.replace('T', '&nbsp;&nbsp;&nbsp;')}</b>
        <p style="color:rgb(187, 68, 68)"><b>${item.content.slice(item.content.lastIndexOf('['))}</b></p>`
      })
      this.tableData = res.data.data_list
    },


    async onPlayerStatisticsList () {
      const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/teamLinuep/`);
      // 去掉 kind == 13
      res.data.detailResultList.filter(item => {
        return item.kind != 13
      })
      this.detailResultList = res.data.detailResultList
      console.log(res.data)


      this.homeTeamID = res.data.teamInfo.homeTeamID;
      this.guestteamID = res.data.teamInfo.guestteamID


      // 球衣号码
      let homeNumber = {}, guestNumber = {}
      function numf (list, num) {
        list.forEach(item => {
          num[item.playerId] = item.number
        })
      }
      numf(res.data.playerLineup.homeLineup, homeNumber)
      numf(res.data.playerLineup.guestLineup, guestNumber)



      this.homeNumber = homeNumber
      this.guestNumber = guestNumber


    }
  }
}
</script>
<style lang = 'less' scoped >
/* 右边阵容 */
.statistics_box_right {
  width: 428px;
  margin: 10px 10px 10px 0px;
  height: 100%;
  /* display: flex; */
  h6 {
    font-size: 14px;
    text-align: center;
    color: #fff;
    span {
      display: inline-block;
      width: 100px;
      height: 20px;
      border-radius: 6px;
      background: #91c1f8;
      padding: 6px 0;
    }
  }
  .statistics_box_top {
    overflow-y: scroll;
    width: 100%;
    height: 800px;
    padding: 0 10px;
    dl {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &::after {
        content: '';
        width: 1px;
        height: 100%;
        background: #9e9b9b;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 2;
      }
      dd {
        text-align: center;
        margin: 16px 0;
        position: relative;
        div {
          border: 1px solid #eee;
          border-radius: 6px;
          p {
            font-size: 12px;
            margin: 6px;
            line-height: 20px;
            .icon {
              width: 1.2em;
              height: 1.2em;
              margin: 0 6px;
            }
          }
        }
      }
      .zhu {
        width: 196px;
        div {
          &::after {
            content: '';
            position: absolute;
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #fff;
            border-left: 1px solid #eee;
            border-top: 1px solid #eee;
            -webkit-transform: rotate(134deg);
            -moz-transform: rotate(134deg);
            -ms-transform: rotate(134deg);
            -o-transform: rotate(134deg);
            transform: rotate(134deg);
            left: inherit;
            right: -6px;
            top: 50%;
            margin-top: -5px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
        }
      }
      .shi {
        height: 100%;
        text-align: center;
        margin: 0 10px;
        span {
          width: 36px;
          height: 36px;
          display: inline-block;
          background: #91c1f8;
          border-radius: 50%;
          text-align: center;
          line-height: 36px;
          position: relative;
          z-index: 3;
          color: #fff;
        }
      }
      .ke {
        width: 196px;
        div {
          &::after {
            content: '';
            position: absolute;
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #fff;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
            -webkit-transform: rotate(134deg);
            -moz-transform: rotate(134deg);
            -ms-transform: rotate(134deg);
            -o-transform: rotate(134deg);
            transform: rotate(134deg);
            right: inherit;
            left: -6px;
            top: 50%;
            margin-top: -5px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
        }
      }
    }
  }

  .statistics_box_bottom {
    display: flex;
    align-items: center;
    .icon {
      width: 1.5em;
      height: 1.5em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    dl {
      height: 70px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      dd {
        text-align: center;
      }
    }
  }
}

.gWidth {
  display: flex;
  width: 1160px;
  justify-content: space-between;
}
</style>
