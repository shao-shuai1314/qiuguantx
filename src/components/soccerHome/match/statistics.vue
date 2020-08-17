<template>
  <div class="gWidth">
    <div class="statistics_box fl">
      <div class="statistics_box_left">
        <!-- 阵容 -->
        <el-card class="top_zR">
          <div class="top_zR_xbox">
            <div class="zhenrong">
              <div>
                <span v-if="cl">
                  位置错乱
                </span>
                <span v-else>
                  {{homeLineup.map(item=>{ if(item[0].longmenSort != 0){ return item.length } }).join('-')}}
                </span>
              </div>
              <div>
                <span v-if="cl">
                  位置错乱
                </span>
                <span v-else>
                  {{guestLineup.map(item=>{ if(item[0].longmenSort != 0){ return item.length } }).reverse().join('-')}}
                </span>
              </div>

            </div>
            <!-- 球场左边线 -->
            <div class="top_zR_xbox_xian xian_left">
              <div></div>
            </div>
            <!-- 球场右边线 -->
            <div class="top_zR_xbox_xian xian_right">
              <div></div>
            </div>
            <!-- 球场中间园 -->
            <div class="top_zR_xbox_yuan">
              <div></div>
            </div>
            <!-- 球员阵容 -->

            <div class="data_zr">
              <div class="data_zr_l data_zr_box">
                <dl>
                  <dd v-for="(items,index) in homeLineup"
                      :key="index"
                      :style="[{'flex-direction':(cl?'row':'')},{'flex-wrap':(cl?'wrap':'')},{'width':(cl?'70%':'')}]">
                    <el-tooltip placement="top"
                                v-for="(item,i) in items"
                                :key="i">
                      <div slot="content">姓名：{{item.name}}<br/>生日：{{item.birthday}}<br/>身价：{{item.expectedValue}}（万欧元）<br/>国籍：{{item.country}}</div>
                      <router-link target="_blank"
                                   v-if="item.playerId"
                                   :to="{name:'playerDetails',params:{playerID:item.playerId}}">
                        <el-avatar fit="contain"
                                   :src="`http://qiuguantx.com/img/player/${item.photo}` "></el-avatar>

                        <p style="font-size:10px;width: 50px; height:20px;display:flex;align-items:center;justify-content:center">
                          <span>
                            {{item.number}}
                          </span>
                          <span style="display:flex;height:16px">
                            <span v-for="(i,ii) in item.detailResult"
                                  :key="ii">
                              <svg style="width:16px;height:16px">
                                <use :xlink:href="teamStyle[i]"></use>
                              </svg>
                            </span>
                          </span>

                        </p>
                      </router-link>
                    </el-tooltip>
                  </dd>

                </dl>

              </div>
              <div class="data_zr_r data_zr_box">
                <dl>
                  <dd v-for="(items,index) in guestLineup"
                      :key="index"
                      :style="[{'flex-direction':(cl?'row':'')},{'flex-wrap':(cl?'wrap':'')},{'width':(cl?'70%':'')}]">
                    <el-tooltip placement="top"
                                v-for="(item,i) in items"
                                :key="i">
                      <div slot="content">姓名：{{item.name}}<br/>生日：{{item.birthday}}<br/>身价：{{item.expectedValue}}（万欧元）<br/>国籍：{{item.country}}</div>
                      <router-link target="_blank"
                                   v-if="item.playerId"
                                   :to="{name:'playerDetails',params:{playerID:item.playerId}}">
                        <el-avatar fit="contain"
                                   :src="`http://qiuguantx.com/img/player/${item.photo}` "></el-avatar>
                        <p style="font-size:10px;width: 50px; height:20px;display:flex;align-items:center;justify-content:center">
                          <span>
                            {{item.number}}
                          </span>
                          <span style="display:flex;height:16px">
                            <span v-for="(i,ii) in item.detailResult"
                                  :key="ii">
                              <svg style="width:16px;height:16px">
                                <use :xlink:href="teamStyle[i]"></use>
                              </svg>
                            </span>
                          </span>

                        </p>
                      </router-link>
                    </el-tooltip>
                  </dd>

                </dl>

              </div>

            </div>

          </div>
        </el-card>
        <!-- 统计 -->
        <el-card>
          <div class="bottom_tJ">
            <!-- 主队统计 -->
            <div class="bottom_tJ_left bottom_tJ_box">
              <h3>主队</h3>
              <h6>进球:</h6>
              <dl>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==8 && item.teamID == guestteamID">
                  {{guestNumber[item.playerID]}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerID"
                               :to="{name:'playerDetails',params:{playerID:item.playerID}}"> {{item.playerName}}</router-link>(乌龙球) &nbsp;（{{item.happentime}}'）
                </dd>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==1 && item.teamID == homeTeamID">
                  {{homeNumber[item.playerID]}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerID"
                               :to="{name:'playerDetails',params:{playerID:item.playerID}}"> {{item.playerName}}</router-link>
                  <router-link target="_blank"
                               v-if="item.playerID_in && item.playerName_in"
                               :to="{name:'playerDetails',params:{playerID:item.playerID_in}}"> (助攻：{{item.playerName_in}}&nbsp;（{{item.happentime}}'））</router-link>
                </dd>
              </dl>
              <h6>换人：</h6>
              <dl>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==11 && item.teamID == homeTeamID">
                  <div style="display:flex;height:30px;align-items:center">
                    <svg style="width:16px;height:16px">
                      <use xlink:href="#icon-huanru"></use>
                    </svg>
                    {{homeNumber[item.playerID]}} &nbsp;
                    <router-link target="_blank"
                                 v-if="item.playerID"
                                 :to="{name:'playerDetails',params:{playerID:item.playerID}}"> {{item.playerName}}</router-link>
                    &nbsp;
                    <svg style="width:16px;height:16px"
                         aria-hidden="true">
                      <use xlink:href="#icon-huanchu"></use>
                    </svg>
                    &nbsp; {{homeNumber[item.playerID_in]}} &nbsp;
                    <router-link target="_blank"
                                 v-if="item.playerID_in"
                                 :to="{name:'playerDetails',params:{playerID:item.playerID_in}}">{{item.playerName_in}}</router-link> &nbsp; （{{item.happentime}}'）
                  </div>
                </dd>
              </dl>
              <h6>红牌：</h6>
              <dl>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==2 && item.teamID == homeTeamID">
                  {{homeNumber[item.playerID]}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerID"
                               :to="{name:'playerDetails',params:{playerID:item.playerID}}">
                    {{item.playerName}}
                  </router-link>&nbsp; （{{item.happentime}}'）
                </dd>
              </dl>
              <h6>黄牌：</h6>
              <dl>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==3 && item.teamID == homeTeamID">
                  {{homeNumber[item.playerID]}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerID"
                               :to="{name:'playerDetails',params:{playerID:item.playerID}}">
                    {{item.playerName}}
                  </router-link> &nbsp; （{{item.happentime}}'）
                </dd>
              </dl>
              <h6>替补：</h6>
              <dl>
                <dd v-for="(item,index) in homeLineup_tb"
                    :key="index">（{{index+1}}） &nbsp; {{item.number}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerId"
                               :to="{name:'playerDetails',params:{playerID:item.playerId}}">
                    {{item.name}}
                  </router-link>
                </dd>
              </dl>
            </div>
            <!-- 客队统计 -->
            <div class="bottom_tJ_right bottom_tJ_box">
              <h3>客队</h3>
              <h6>进球:</h6>
              <dl>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==8 && item.teamID == hometeamID">
                  {{homeNumber[item.playerID]}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerID"
                               :to="{name:'playerDetails',params:{playerID:item.playerID}}"> {{item.playerName}}</router-link>(乌龙球) &nbsp;（{{item.happentime}}'）
                </dd>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==1 && item.teamID == guestteamID">
                  {{guestNumber[item.playerID]}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerID"
                               :to="{name:'playerDetails',params:{playerID:item.playerID}}"> {{item.playerName}}</router-link>
                  <router-link target="_blank"
                               v-if="item.playerID_in  && item.playerName_in"
                               :to="{name:'playerDetails',params:{playerID:item.playerID_in}}">(助攻：{{item.playerName_in}}&nbsp;（{{item.happentime}}'））</router-link>
                </dd>
              </dl>
              <h6>换人：</h6>
              <dl>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==11 && item.teamID == guestteamID">
                  <div style="display:flex;height:30px;align-items:center">
                    <svg style="width:16px;height:16px">
                      <use xlink:href="#icon-huanru"></use>
                    </svg>
                    {{guestNumber[item.playerID]}} &nbsp;
                    <router-link target="_blank"
                                 v-if="item.playerID"
                                 :to="{name:'playerDetails',params:{playerID:item.playerID}}"> {{item.playerName}}</router-link>
                    &nbsp;
                    <svg style="width:16px;height:16px"
                         aria-hidden="true">
                      <use xlink:href="#icon-huanchu"></use>
                    </svg>
                    &nbsp; {{guestNumber[item.playerID_in]}} &nbsp;
                    <router-link target="_blank"
                                 v-if="item.playerID_in"
                                 :to="{name:'playerDetails',params:{playerID:item.playerID_in}}">{{item.playerName_in}}</router-link> &nbsp; （{{item.happentime}}'）
                  </div>

                </dd>
              </dl>
              <h6>红牌：</h6>
              <dl>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==2 && item.teamID == guestteamID">
                  {{guestNumber[item.playerID]}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerID"
                               :to="{name:'playerDetails',params:{playerID:item.playerID}}">
                    {{item.playerName}}
                  </router-link>&nbsp; （{{item.happentime}}'）
                </dd>
              </dl>
              <h6>黄牌：</h6>
              <dl>
                <dd v-for="(item,i) in detailResultList"
                    :key="i"
                    v-if="item.kind==3 && item.teamID == guestteamID">
                  {{guestNumber[item.playerID]}} &nbsp;

                  <router-link target="_blank"
                               v-if="item.playerID"
                               :to="{name:'playerDetails',params:{playerID:item.playerID}}">
                    {{item.playerName}}
                  </router-link> &nbsp; （{{item.happentime}}'）
                </dd>
              </dl>
              <h6>替补：</h6>
              <dl>
                <dd v-for="(item,index) in guestLineup_tb"
                    :key="index">（{{index+1}}） &nbsp; {{item.number}} &nbsp;
                  <router-link target="_blank"
                               v-if="item.playerId"
                               :to="{name:'playerDetails',params:{playerID:item.playerId}}">
                    {{item.name}}</router-link>
                </dd>
              </dl>
            </div>

          </div>

        </el-card>

      </div>

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
import '../../../css/font/iconfont.js'
import '../../../css/font1/iconfont.js'


export default {
  data () {
    return {
      homeTeamID: "",
      guestteamID: "",
      detailResultList: [],
      teamStyle: ['', '#icon-jinqiu', "#icon-hongpai", "#icon-huangpai", '#icon-huanru', '#icon-huanchu', '', '#icon-dianqiu', "#icon-zuqiuwulongqiu", "#icon-lianghuangbianhong1", , , , , "#icon-zhugongbang",],

      // 对阵
      homeLineup: [],
      guestLineup: [],
      homeLineup_tb: [],
      guestLineup_tb: [],
      homeNumber: [],
      guestNumber: [],

      cl: false,
      Score: sessionStorage.getItem('Score')


    };
  },
  created () {
    this.onPlayerStatisticsList()
  },


  methods: {
    async onPlayerStatisticsList () {
      const res = await this.$http.get(`/soccer/matchInfo/${this.$route.params.scheduleID}/teamLinuep/`);
      // 去掉 kind == 13
      res.data.detailResultList.filter(item => {
        return item.kind != 13
      })
      this.detailResultList = res.data.detailResultList


      this.homeTeamID = res.data.teamInfo.homeTeamID;
      this.guestteamID = res.data.teamInfo.guestteamID


      let Kind = { 1: '进球', 2: '红牌', 3: '黄牌', 7: '点球进球', 8: '乌龙球', 9: '两黄变红', 11: '换人', 13: '射失点球', 14: '助攻', 15: '下场' }

      // 对阵阵容分组
      function groups (data, mun) {
        return data.filter(item => {
          return item.longmenSort == mun && item.isBackup == 0
        })
      }
      // 技术统计
      function jstj (data, list) {
        data.forEach(item => {
          if (item.isBackup == 1) {
            list.push(item)
          }
          if (item.detailResult.includes(15)) {
            item.detailResult = item.detailResult.join().replace(15, 5).split(",")
          }

        })
      }

      // 错乱
      // 对阵阵容分组

      if (groups(res.data.playerLineup.homeLineup, 0).length == 11) {
        this.cl = true
      }


      // 技术统计
      let homeLineup_tb = [], guestLineup_tb = []
      jstj(res.data.playerLineup.homeLineup, homeLineup_tb)
      jstj(res.data.playerLineup.guestLineup, guestLineup_tb)
      this.homeLineup_tb = homeLineup_tb
      this.guestLineup_tb = guestLineup_tb
      // 对阵阵容分组
      for (let i = 0; i < 6; i++) {
        if (groups(res.data.playerLineup.homeLineup, i).length) {
          this.homeLineup.push(groups(res.data.playerLineup.homeLineup, i))
        }
        if (groups(res.data.playerLineup.guestLineup, i).length) {
          this.guestLineup.push(groups(res.data.playerLineup.guestLineup, i))
        }
      }

      this.guestLineup.reverse()

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
.gWidth {
  width: 1160px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}
a {
  &:hover {
    color: #91c1f8;
  }
}
.statistics_box {
  margin: 10px;
  .statistics_box_left {
    width: 700px;
    /* 阵容背景图 */
    .top_zR {
      width: 100%;
      height: 400px;
      background: #37ad32;
      margin-bottom: 10px;
      box-sizing: border-box;
      .top_zR_xbox {
        width: 100%;
        height: 360px;
        border: 2px solid #fff;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        .top_zR_xbox_xian {
          position: absolute;
          width: 180px;
          height: 180px;
          box-sizing: border-box;
          border: 2px solid #fff;
          div {
            width: 90px;
            height: 90px;
            position: absolute;
            border: 2px solid #fff;
            top: 45px;
          }
        }
        .xian_left {
          left: -90px;
          top: 90px;
          div {
            left: 50px;
          }
        }
        .xian_right {
          right: -90px;
          top: 90px;
          div {
            right: 50px;
          }
        }
        .top_zR_xbox_yuan {
          width: 2px;
          height: 100%;
          background: #fff;
          position: absolute;
          left: 50%;
          margin-left: -1px;
          div {
            width: 100px;
            height: 100px;
            border: 2px solid #fff;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -50px;
            margin-left: -50px;
          }
        }
        /* 球员阵容 */
        .data_zr {
          height: 100%;
          .data_zr_box {
            position: absolute;
            z-index: 999;
            width: 50%;
            height: 100%;
            dl {
              height: 100%;
              width: 100%;
              display: flex;
              dd {
                width: 25%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                p {
                  font-size: 14px;
                  color: #fff;
                }
              }
            }
          }
          /* 主队阵容 */
          .data_zr_l {
            left: 0;
            top: 0;
          }
          /* 客队阵容 */
          .data_zr_r {
            right: 0;
            top: 0;
          }
        }
      }
    }
    /* 底部统计 */
    .bottom_tJ {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .bottom_tJ_box {
        width: 50%;
        height: 100%;
        font-size: 12px;
        line-height: 20px;
        h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }
        h6 {
          font-size: 14px;
          font-weight: 600;
          margin: 4px 0;
        }
      }
    }
  }
}

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

.zhenrong {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 14px;
}
</style>