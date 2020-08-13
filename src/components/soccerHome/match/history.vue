<template>
  <div class="history_box">
    <!-- 左边内容 -->
    <div class="history_left">
      <div class="history_table1">
        <div class="history_table1_header">
          <span class="fsing">{{hometeamName}}</span>
          <!-- 全赛事 -->
          <el-select v-model="homeMatchVelue"
                     size="mini"
                     :placeholder="homeMatchVelue"
                     @change="onHomeMatch">
            <el-option v-for="item in homeMatch"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!-- 场地 -->
          <el-select v-model="homePlaceVelue"
                     size="mini"
                     :placeholder="homePlaceVelue"
                     @change="onHomePlace">
            <el-option v-for="item in homePlace"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!-- 多少场 -->
          <el-select v-model="homeEtcVelue"
                     size="mini"
                     :placeholder="homeEtcVelue"
                     @change="onHomeEtc">
            <el-option v-for="item in homeEtc"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span class="fsing">{{HomeSPF.Hs}}胜&nbsp;{{HomeSPF.Hp}}平&nbsp;{{HomeSPF.Hf}}负&nbsp;， 其中主场&nbsp;&nbsp;{{HomeSPF.onHs}}胜&nbsp;{{HomeSPF.onHp}}平&nbsp;{{HomeSPF.onHf}}负&nbsp;</span>
        </div>
        <!-- 主场 -->
        <table width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               align="center"
               class="table1">
          <tr align="center"
              class="tr_tit">
            <td width="8%">
              <b>联赛</b>
            </td>
            <td>
              <b>时间</b>
            </td>
            <td width="12%"
                class="borderL">
              <b>主队</b>
            </td>
            <td width="6%">
              <b>比分</b>
            </td>
            <td width="12%">
              <b>客队</b>
            </td>
            <td width="6%"
                class="borderL borderR">
              <b>半场</b>
            </td>
            <td colspan="3">
              <el-select v-model="OddsList.homevalue1"
                         size="mini"
                         :placeholder="OddsList.homename_cn1"
                         @change="OnHomeStandard">
                <el-option v-for="item in OddsList.homeStandardList"
                           :key="item.companyID"
                           :label="item.name_cn"
                           :value="item.companyID">
                </el-option>
              </el-select>

            </td>
            <td colspan="3"
                class="borderL borderR">
              <el-select v-model="OddsList.homevalue2"
                         size="mini"
                         :placeholder="OddsList.homename_cn2"
                         @change="OnHomeLetgoal">
                <el-option v-for="item in OddsList.homeLetgoalList"
                           :key="item.companyID"
                           :label="item.name_cn"
                           :value="item.companyID">
                </el-option>
              </el-select>
            </td>
            <td width="4%">
              <b>盘路</b>
            </td>

          </tr>

          <tr align="center"
              v-for="item in homeHistoryList.slice(0,this.homeNum)"
              :key="item.scheduleID">
            <td>{{item.sclassName}}
              <span style="padding: 0 2px;font-size: 10px;color: #aaa7a7;display: inline-block;">{{item.subsclassName}}{{item.round}}</span>
            </td>

            <td :style="{'background':item.coachID!='未知'?item.Coachcolors:''}">
              {{item.matchtime.replace('T',' ')}}
              <span class="xs_jl">
                <router-link v-if="item.coachID!='未知'"
                             target="_blank"
                             :to="{name:'playerDetails',params:{playerID:item.coachID}}">
                  ({{item.coachName}})</router-link>
                <span v-else>({{item.coachName}})</span>
              </span>

            </td>

            <td class="borderL"
                v-if="item.matchState">
              <router-link target="_blank"
                           :style="{'color': (item.hometeamID ===homeTeamID ? item.colors:''),'font-weight':(item.hometeamID ===homeTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>
            </td>
            <td class="borderL"
                v-else>
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>
            </td>
            <td v-if="item.matchState">
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:item.scheduleID}}">
                {{item.homeScore}}-{{item.guestScore}}
              </router-link>
            </td>
            <td v-else>
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:item.scheduleID}}">vs</router-link>
            </td>

            <td v-if="item.matchState">
              <router-link target="_blank"
                           :style="{'color': (item.guestteamID ===homeTeamID ? item.colors:''),'font-weight':(item.guestteamID ===homeTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
            </td>
            <td v-else>
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
            </td>

            <td class="borderL borderR">{{item.homeHalfScore}}-{{item.guestHalfScore}}</td>
            <td v-if="myfilter(OddsList.homescheduleList1,item.scheduleID)">
              {{myfilter(OddsList.homescheduleList1,item.scheduleID).firstUpOdds}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.homescheduleList1,item.scheduleID)">
              {{myfilter(OddsList.homescheduleList1,item.scheduleID).firstGoal}}
            </td>
            <td v-else>
              -
            </td>
            <td class="borderR"
                v-if="myfilter(OddsList.homescheduleList1,item.scheduleID)">
              {{myfilter(OddsList.homescheduleList1,item.scheduleID).firstDownOdds}}
            </td>
            <td v-else
                class="borderR">
              -
            </td>

            <td v-if="myfilter(OddsList.homescheduleList2,item.scheduleID)">
              {{myfilter(OddsList.homescheduleList2,item.scheduleID).firstUpOdds}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.homescheduleList2,item.scheduleID)">
              {{myfilter(OddsList.homescheduleList2,item.scheduleID).firstGoal}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.homescheduleList2,item.scheduleID)">
              {{myfilter(OddsList.homescheduleList2,item.scheduleID).firstDownOdds}}
            </td>
            <td v-else>
              -
            </td>

            <td v-if="myfilter(OddsList.homescheduleList2,item.scheduleID)">
              {{myfilter(OddsList.homescheduleList2,item.scheduleID).result}}
            </td>

          </tr>

        </table>
      </div>

      <!-- 客场 -->
      <div class="history_table1">
        <div class="history_table1_header">
          <span class="fsing">{{guestteamName}}</span>
          <!-- 全赛事 -->
          <el-select v-model="guestMatchVelue"
                     size="mini"
                     :placeholder="guestMatchVelue"
                     @change="onGuesteMatch">
            <el-option v-for="item in guestMatch"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!-- 场地 -->
          <el-select v-model="guestPlaceVelue"
                     size="mini"
                     :placeholder="guestPlaceVelue"
                     @change="onGuestPlace">
            <el-option v-for="item in guestPlace"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!-- 多少场 -->
          <el-select v-model="guestEtcVelue"
                     size="mini"
                     :placeholder="guestEtcVelue"
                     @change="onGuestEtc">
            <el-option v-for="item in guestEtc"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span class="fsing">{{GuestSPF.Ks}}胜&nbsp;{{GuestSPF.Kp}}平&nbsp;{{GuestSPF.Kf}}负&nbsp;, 其中客场&nbsp;&nbsp;{{GuestSPF.onKs}}胜&nbsp;{{GuestSPF.onKp}}平&nbsp;{{GuestSPF.onKf}}负</span>
        </div>
        <!-- 客场 -->
        <table width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               align="center"
               class="table1">
          <tr align="center"
              class="tr_tit">
            <td width="8%">
              <b>联赛</b>
            </td>
            <td>
              <b>时间</b>
            </td>
            <td width="12%"
                class="borderL">
              <b>主队</b>
            </td>
            <td width="6%">
              <b>比分</b>
            </td>
            <td width="12%">
              <b>客队</b>
            </td>
            <td width="6%"
                class="borderL borderR">
              <b>半场</b>
            </td>
            <td colspan="3">
              <el-select v-model="OddsList.guestvalue1"
                         size="mini"
                         :placeholder="OddsList.guestname_cn1"
                         @change="OnGuestStandard">
                <el-option v-for="item in OddsList.guestStandardList"
                           :key="item.companyID"
                           :label="item.name_cn"
                           :value="item.companyID">
                </el-option>
              </el-select>

            </td>
            <td colspan="3"
                class="borderL borderR">
              <el-select v-model="OddsList.guestvalue2"
                         size="mini"
                         :placeholder="OddsList.guestname_cn2"
                         @change="OnGuestLetgoal">
                <el-option v-for="item in OddsList.guestLetgoalList"
                           :key="item.companyID"
                           :label="item.name_cn"
                           :value="item.companyID">
                </el-option>
              </el-select>
            </td>
            <td width="4%">
              <b>盘路</b>
            </td>

          </tr>

          <tr align="center"
              v-for="item in guestHistoryList.slice(0,this.guestNum)"
              :key="item.scheduleID">
            <td>{{item.sclassName}}
              <span style="padding: 0 2px;font-size: 10px;color: #aaa7a7;display: inline-block;">{{item.subsclassName}}{{item.round}}</span>
            </td>
            <td :style="{'background':item.coachID!='未知'?item.Coachcolors:''}">
              {{item.matchtime.replace('T',' ')}}
              <span class="xs_jl">
                <router-link v-if="item.coachID!='未知'"
                             target="_blank"
                             :to="{name:'playerDetails',params:{playerID:item.coachID}}">
                  ({{item.coachName}})</router-link>
                <span v-else>({{item.coachName}})</span>
              </span>

            </td>

            <td class="borderL"
                v-if="item.matchState">
              <router-link target="_blank"
                           :style="{'color': (item.hometeamID ===guestTeamID ? item.colors:''),'font-weight':(item.hometeamID ===guestTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>
            </td>
            <td class="borderL"
                v-else>
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>
            </td>

            <td v-if="item.matchState">
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:item.scheduleID}}">
                {{item.homeScore}}-{{item.guestScore}}
              </router-link>
            </td>
            <td v-else>
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:item.scheduleID}}">vs</router-link>
            </td>

            <td v-if="item.matchState">
              <router-link target="_blank"
                           :style="{'color': (item.guestteamID ===guestTeamID ? item.colors:''),'font-weight':(item.guestteamID ===guestTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
            </td>
            <td v-else>
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
            </td>

            <td class="borderL borderR">{{item.homeHalfScore}}-{{item.guestHalfScore}}</td>
            <td v-if="myfilter(OddsList.guestscheduleList1,item.scheduleID)">
              {{myfilter(OddsList.guestscheduleList1,item.scheduleID).firstUpOdds}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.guestscheduleList1,item.scheduleID)">
              {{myfilter(OddsList.guestscheduleList1,item.scheduleID).firstGoal}}
            </td>
            <td v-else>
              -
            </td>
            <td class="borderR"
                v-if="myfilter(OddsList.guestscheduleList1,item.scheduleID)">
              {{myfilter(OddsList.guestscheduleList1,item.scheduleID).firstDownOdds}}
            </td>
            <td v-else
                class="borderR">
              -
            </td>

            <td v-if="myfilter(OddsList.guestscheduleList2,item.scheduleID)">
              {{myfilter(OddsList.guestscheduleList2,item.scheduleID).firstUpOdds}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.guestscheduleList2,item.scheduleID)">
              {{myfilter(OddsList.guestscheduleList2,item.scheduleID).firstGoal}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.guestscheduleList2,item.scheduleID)">
              {{myfilter(OddsList.guestscheduleList2,item.scheduleID).firstDownOdds}}
            </td>
            <td v-else>
              -
            </td>

            <td v-if="myfilter(OddsList.guestscheduleList2,item.scheduleID)">
              {{myfilter(OddsList.guestscheduleList2,item.scheduleID).result}}
            </td>

          </tr>

        </table>
      </div>

      <div class="coming_table">
        <!-- weilaiwuchang -->
        <!-- 主场未来 -->
        <table width="49%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               align="center"
               class="table1 fl">
          <tr align="center"
              class="tit">
            <td class="fsing"
                colspan="6">{{hometeamName}}未来5场比赛</td>
          </tr>
          <tr align="center"
              class="tr_tit">
            <td>
              <b>联赛</b>
            </td>
            <td>
              <b>时间</b>
            </td>
            <td class="borderL">
              <b>主队</b>
            </td>
            <td>
              <b>比分</b>
            </td>
            <td>
              <b>客队</b>
            </td>
            <td class="borderL borderR">
              <b>半场</b>
            </td>

          </tr>

          <tr align="center"
              v-for="(item,index) in homeFutureList"
              :key="index">
            <td>{{item.sclassName}}
              <span style="padding: 0 2px;font-size: 10px;color: #aaa7a7;display: inline-block;">{{item.subsclassName}}{{item.round}}{{item.grouping}}</span>
            </td>
            <td>{{item.matchtime.replace('T',' ')}}</td>
            <td class="borderL">
              <router-link target="_blank"
                           :style="{'color': (item.hometeamID ===homeTeamID ? item.colors:''),'font-weight':(item.hometeamID ===homeTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>
            </td>
            <td>
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:item.scheduleID}}">
                {{item.homeScore}}-{{item.guestScore}}
              </router-link>
            </td>
            <td>
              <router-link target="_blank"
                           :style="{'color': (item.guestteamID ===homeTeamID ? item.colors:''),'font-weight':(item.guestteamID ===homeTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
            </td>
            <td class="borderL borderR">{{item.homeHalfScore}}-{{item.guestHalfScore}}</td>

          </tr>

        </table>
        <!-- 客场未来 -->
        <table width="49%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               align="center"
               class="table1 fr">
          <tr align="center"
              class="tit">
            <td class="fsing"
                colspan="7">{{guestteamName}}未来5场比赛</td>
          </tr>
          <tr align="center"
              class="tr_tit">
            <td>
              <b>联赛</b>
            </td>
            <td>
              <b>时间</b>
            </td>
            <td class="borderL">
              <b>主队</b>
            </td>
            <td>
              <b>比分</b>
            </td>
            <td>
              <b>客队</b>
            </td>
            <td class="borderL borderR">
              <b>半场</b>
            </td>

          </tr>

          <tr align="center"
              v-for="(item,i) in guestFutureList"
              :key="i">
            <td>{{item.sclassName}}
              <span style="padding: 0 2px;font-size: 10px;color: #aaa7a7;display: inline-block;">{{item.subsclassName}}{{item.round}}{{item.grouping}}</span>
            </td>
            <td>{{item.matchtime.replace('T',' ')}}</td>
            <td class="borderL">
              <router-link target="_blank"
                           :style="{'color': (item.hometeamID ===guestTeamID ? item.colors:''),'font-weight':(item.hometeamID ===guestTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>
            </td>
            <td>
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:item.scheduleID}}">
                {{item.homeScore}}-{{item.guestScore}}
              </router-link>
            </td>
            <td>
              <router-link target="_blank"
                           :style="{'color': (item.guestteamID ===guestTeamID ? item.colors:''),'font-weight':(item.guestteamID ===guestTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
            </td>
            <td class="borderL borderR">{{item.homeHalfScore}}-{{item.guestHalfScore}}</td>

          </tr>

        </table>
      </div>

      <!-- 两队交锋 -->
      <div class="history_table1">
        <div class="history_table1_header">
          <span class="fsing">两队交锋</span>
          <!-- 全赛事 -->
          <el-select v-model="clashMatchVelue"
                     size="mini"
                     :placeholder="clashMatchVelue"
                     @change="onClashMatch">
            <el-option v-for="item in clashMatch"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!-- 场地 -->
          <el-select v-model="clashPlaceVelue"
                     size="mini"
                     :placeholder="clashPlaceVelue"
                     @change="onClashPlace">
            <el-option v-for="item in clashPlace"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <!-- 多少场 -->
          <el-select v-model="clashEtcVelue"
                     size="mini"
                     :placeholder="guestEtcVelue"
                     @change="onClashEtc">
            <el-option v-for="item in clashEtc"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span class="fsing">{{hometeamName}}&nbsp;&nbsp;&nbsp;{{ClashSPF.Js}}胜&nbsp;{{ClashSPF.Jp}}平&nbsp;{{ClashSPF.Jf}}负&nbsp; 其中主场&nbsp;&nbsp;{{ClashSPF.onJs}}胜&nbsp;{{ClashSPF.onJp}}平&nbsp;{{ClashSPF.onJf}}负</span>
        </div>
        <!-- 交锋 -->
        <table width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               align="center"
               class="table1">
          <tr align="center"
              class="tr_tit">
            <td width="8%">
              <b>联赛</b>
            </td>
            <td>
              <b>时间</b>
            </td>
            <td class="borderL">
              <b>主队</b>
            </td>
            <td width="6%">
              <b>比分</b>
            </td>
            <td>
              <b>客队</b>
            </td>
            <td width="6%"
                class="borderL borderR">
              <b>半场</b>
            </td>
            <td colspan="3">
              <el-select v-model="OddsList.clashvalue1"
                         size="mini"
                         :placeholder="OddsList.clashname_cn1"
                         @change="OnClashStandard">
                <el-option v-for="item in OddsList.clashStandardList"
                           :key="item.companyID"
                           :label="item.name_cn"
                           :value="item.companyID">
                </el-option>
              </el-select>

            </td>
            <td colspan="3"
                class="borderL borderR">
              <el-select v-model="OddsList.clashvalue2"
                         size="mini"
                         :placeholder="OddsList.clashname_cn2"
                         @change="OnClashLetgoal">
                <el-option v-for="item in OddsList.clashLetgoalList"
                           :key="item.companyID"
                           :label="item.name_cn"
                           :value="item.companyID">
                </el-option>
              </el-select>
            </td>
            <td width="4%">
              <b>盘路</b>
            </td>

          </tr>

          <tr align="center"
              v-for="item in mutualHistoryList.slice(0,clashNum)"
              :key="item.scheduleID">
            <td>{{item.sclassName}}
              <span style="padding: 0 2px;font-size: 10px;color: #aaa7a7;display: inline-block;">{{item.subsclassName}}{{item.round}}</span>
            </td>
            <td>{{item.matchtime.replace('T',' ')}}</td>

            <td class="borderL"
                v-if="item.matchState">
              <!-- 主队名字 -->
              <router-link target="_blank"
                           :style="{'color': (item.hometeamID ===homeTeamID ? item.colors:''),'font-weight':(item.hometeamID ===homeTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>

              <!-- 主队教练 -->
              <router-link v-if="item.homeCoachID!='未知'"
                           target="_blank"
                           :to="{name:'playerDetails',params:{playerID:item.homeCoachID}}">
                ({{item.homeCoachName}})</router-link>
              <span v-else>({{item.homeCoachName}})</span>

            </td>
            <td class="borderL"
                v-else>
              <!-- 主队名字 -->
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:item.hometeamID}}">{{item.hometeamName}}</router-link>
              <!-- 主队教练 -->
              <router-link v-if="item.homeCoachID!='未知'"
                           target="_blank"
                           :to="{name:'playerDetails',params:{playerID:item.homeCoachID}}">
                ({{item.homeCoachName}})</router-link>
              <span v-else>({{item.homeCoachName}})</span>
            </td>

            <td v-if="item.matchState">
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:item.scheduleID}}">
                {{item.homeScore}}-{{item.guestScore}}
              </router-link>
            </td>
            <td v-else>
              <router-link target="_blank"
                           :to="{name:'history',params:{scheduleID:item.scheduleID}}">vs</router-link>
            </td>

            <td v-if="item.matchState">
              <router-link target="_blank"
                           :style="{'color': (item.guestteamID ===homeTeamID ? item.colors:''),'font-weight':(item.guestteamID ===homeTeamID ?'900':'')}"
                           :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
              <!-- 客队教练 -->
              <router-link v-if="item.guestCoachID!='未知'"
                           target="_blank"
                           :to="{name:'playerDetails',params:{playerID:item.guestCoachID}}">
                ({{item.guestCoachName}})</router-link>
              <span v-else>({{item.guestCoachName}})</span>
            </td>
            <td v-else>
              <router-link target="_blank"
                           :to="{name:'information',params:{teamID:item.guestteamID}}">{{item.guestteamName}}</router-link>
              <!-- 客队教练 -->
              <router-link v-if="item.guestCoachID!='未知'"
                           target="_blank"
                           :to="{name:'playerDetails',params:{playerID:item.guestCoachID}}">
                ({{item.guestCoachName}})</router-link>
              <span v-else>({{item.guestCoachName}})</span>
            </td>

            <td class="borderL borderR">{{item.homeHalfScore}}-{{item.guestHalfScore}}</td>
            <td v-if="myfilter(OddsList.clashscheduleList1,item.scheduleID)">
              {{myfilter(OddsList.clashscheduleList1,item.scheduleID).firstUpOdds}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.clashscheduleList1,item.scheduleID)">
              {{myfilter(OddsList.clashscheduleList1,item.scheduleID).firstGoal}}
            </td>
            <td v-else>
              -
            </td>
            <td class="borderR"
                v-if="myfilter(OddsList.clashscheduleList1,item.scheduleID)">
              {{myfilter(OddsList.clashscheduleList1,item.scheduleID).firstDownOdds}}
            </td>
            <td v-else
                class="borderR">
              -
            </td>

            <td v-if="myfilter(OddsList.clashscheduleList2,item.scheduleID)">
              {{myfilter(OddsList.clashscheduleList2,item.scheduleID).firstUpOdds}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.clashscheduleList2,item.scheduleID)">
              {{myfilter(OddsList.clashscheduleList2,item.scheduleID).firstGoal}}
            </td>
            <td v-else>
              -
            </td>
            <td v-if="myfilter(OddsList.clashscheduleList2,item.scheduleID)">
              {{myfilter(OddsList.clashscheduleList2,item.scheduleID).firstDownOdds}}
            </td>
            <td v-else>
              -
            </td>

            <td v-if="myfilter(OddsList.clashscheduleList2,item.scheduleID)">
              {{myfilter(OddsList.clashscheduleList2,item.scheduleID).result}}
            </td>

          </tr>

        </table>
      </div>
      <div class="dibuXX">1、赛前积分榜：单场比赛积分计算方法是胜者得3分、负者得0分、平局则双方各得1分，杯赛的比赛没有赛前积分榜。 2、盘路：比赛结果输赢盘的走势。 3、颜色区分：红色表示胜，蓝色表示负，黑色表示平。

      </div>

    </div>
    <!-- 右边内容 -->
    <LeagueGr :datas="[hometeamName,guestteamName,sclassID,homeHistoryLists[0]]"></LeagueGr>

  </div>
</template>
<script >
import LeagueGr from './league_gr';

export default {
  components: {
    LeagueGr
  },
  data () {
    return {

      // 主场赛事
      homeMatch: [{
        label: '全赛事',
        value: 'allMatch'
      }, {
        label: '本赛事',
        value: 'thisEvent'
      }, {
        label: '非本赛事',
        value: 'nonFriendship'
      }, {
        label: '友谊赛',
        value: 'friendly'
      }, {
        label: '非友谊赛',
        value: 'nonFriendships'
      }],
      // 主场 场地
      homePlace: [{
        label: '全部场地',
        value: 'allPlace'
      }, {
        label: '主场',
        value: 'homePlace'
      }, {
        label: '客场',
        value: 'guestPlace'
      }],
      // 主场  场次
      homeEtc: [{
        label: '10场',
        value: 'ten'
      }, {
        label: '20场',
        value: 'twenty'
      }, {
        label: '更多',
        value: 'more '
      }],
      homeMatchVelue: '全赛事',
      homePlaceVelue: '全部场地',
      homeEtcVelue: '10场',

      // 客场
      // 客场赛事
      guestMatch: [{
        label: '全赛事',
        value: 'allMatch'
      }, {
        label: '本赛事',
        value: 'thisEvent'
      }, {
        label: '非本赛事',
        value: 'nonFriendship'
      }, {
        label: '友谊赛',
        value: 'friendly'
      }, {
        label: '非友谊赛',
        value: 'nonFriendships'
      }],
      // 客场 场地
      guestPlace: [{
        label: '全部场地',
        value: 'allPlace'
      }, {
        label: '主场',
        value: 'homePlace'
      }, {
        label: '客场',
        value: 'guestPlace'
      }],
      // 客场  场次
      guestEtc: [{
        label: '10场',
        value: 'ten'
      }, {
        label: '20场',
        value: 'twenty'
      }, {
        label: '更多',
        value: 'more '
      }],
      guestMatchVelue: '全赛事',
      guestPlaceVelue: '全部场地',
      guestEtcVelue: '10场',

      // 交锋
      // 交锋赛事
      clashMatch: [{
        label: '全赛事',
        value: 'allMatch'
      }, {
        label: '本赛事',
        value: 'thisEvent'
      }, {
        label: '非本赛事',
        value: 'nonFriendship'
      }, {
        label: '友谊赛',
        value: 'friendly'
      }, {
        label: '非友谊赛',
        value: 'nonFriendships'
      }],
      // 交锋 场地
      clashPlace: [{
        label: '全部场地',
        value: 'allPlace'
      }, {
        label: '主场',
        value: 'homePlace'
      }, {
        label: '客场',
        value: 'guestPlace'
      }],
      // 交锋  场次
      clashEtc: [{
        label: '10场',
        value: 'ten'
      }, {
        label: '20场',
        value: 'twenty'
      }, {
        label: '更多',
        value: 'more '
      }],
      clashMatchVelue: '全赛事',
      clashPlaceVelue: '全部场地',
      clashEtcVelue: '10场',
      // 本赛事id
      sclassID: '',
      // 当前id
      scheduleID: '',
      // 主场名字id
      homeTeamID: '',
      hometeamName: '',
      // 客场名字id
      guestTeamID: '',
      guestteamName: '',
      // 历史数据
      homeHistoryList: [],
      homeHistoryLists: [],
      homeNum: 10,
      // 主场胜平负
      HomeSPF: {},
      // 客场胜平负
      GuestSPF: {},
      // 交锋
      ClashSPF: {},
      // 主场友谊id
      HfriendlMatch: [],

      guestHistoryList: [],
      guestNum: 10,
      mutualHistoryList: [],
      clashNum: 10,
      homeFutureList: [],
      guestFutureList: [],


      // 赔率
      OddsList: {
        // 欧赔公司
        homeStandardList: [],
        homevalue1: '',
        homename_cn1: '',
        homescheduleIDList1: '',
        homescheduleList1: [],


        guestStandardList: [],
        guestvalue1: '',
        guestname_cn1: '',
        guestscheduleIDList1: '',
        guestscheduleList1: [],



        clashStandardList: [],
        clashvalue1: '',
        clashname_cn1: '',
        clashscheduleIDList1: '',
        clashscheduleList1: [],

        // 亚赔
        homeLetgoalList: [],
        homevalue2: '',
        homename_cn2: '',
        homescheduleList2: [],

        guestLetgoalList: [],
        guestvalue2: '',
        guestname_cn2: '',
        guestscheduleList2: [],

        clashLetgoalList: [],
        clashvalue2: '',
        clashname_cn2: '',
        clashscheduleList2: [],

      }

    };
  },
  computed: {

    myfilter () {
      return function (list, index) {
        return list.find(item => {
          return item.scheduleID == index
        })
      }
    }
  },

  created () {
    this.scheduleID = this.$route.params.scheduleID
    // console.log(this.scheduleID)
    this.OnHistory()
  },
  methods: {

    // 教练添加
    coachFn (coacList, Zklist) {
      // 教练颜色
      var Coachcolors = ['rgba(190,76,89,0.5)', 'rgba(100,76,89,0.5)', 'rgba(180,16,89,0.5)', 'rgba(110,106,89,0.5)', 'rgba(170,76,29,0.5)', 'rgba(190,76,89,0.5)', 'rgba(100,76,89,0.5)', 'rgba(180,16,89,0.5)']

      // var Coachcolors = []
      var cor = {}
      for (let i = 0; i < coacList.length; i++) {
        // Coachcolors[i] = `rgba(${Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256)},0.5)`
        cor[coacList[i].playerId] = Coachcolors[i]
      }
      Zklist.forEach(item => {
        item.Coachcolors = cor[item.coachID]
      })
    },
    async OnHistory () {
      const res = await this.$http.get('soccer/matchInfo/' + this.scheduleID + '/history/');
      if (res.status !== 200) return console.log('对阵头部信息取失败');
      // 教练遍历
      this.coachFn(res.data.home_coach, res.data.homeHistoryList)
      this.coachFn(res.data.guest_coach, res.data.guestHistoryList)


      // console.log(res.data.homeHistoryList, res.data.homeCoach)







      // 给主场加颜色
      this.addColor(res.data.homeHistoryList, res.data.allInfo.homeTeamID)
      // 客场颜色

      this.addColor(res.data.guestHistoryList, res.data.allInfo.guestTeamID)

      // 未来颜色
      this.addColor(res.data.homeFutureList, res.data.allInfo.homeTeamID)
      this.addColor(res.data.guestFutureList, res.data.allInfo.guestTeamID)

      // 交锋颜色
      this.addColor(res.data.mutualHistoryList, res.data.allInfo.homeTeamID)


      // console.log(res.data.guestHistoryList, 11)
      // 主队客队历史比赛
      this.homeHistoryLists = res.data.homeHistoryList
      this.homeHistoryList = res.data.homeHistoryList

      this.guestHistoryLists = res.data.guestHistoryList
      this.guestHistoryList = res.data.guestHistoryList
      // 双方互相交锋的比赛
      this.mutualHistoryList = res.data.mutualHistoryList
      this.mutualHistoryLists = res.data.mutualHistoryList

      // 未来比赛
      this.homeFutureList = res.data.homeFutureList
      this.guestFutureList = res.data.guestFutureList

      // 本赛事id
      this.sclassID = res.data.allInfo.sclassID;
      // 主场名字id
      this.homeTeamID = res.data.allInfo.homeTeamID;
      this.hometeamName = res.data.allInfo.homeName
      // 客场名字id
      this.guestTeamID = res.data.allInfo.guestTeamID;
      this.guestteamName = res.data.allInfo.guestName
      // 友谊赛id
      this.HfriendlMatch = res.data.allInfo.friendlMatch
      // console.log(this.homeTeamID, this.guestTeamID)

      // // 欧赔调用
      this.OnHomeStandard()
      this.OnGuestStandard()
      this.OnClashStandard()


      // // 亚盘调用
      this.OnHomeLetgoal()
      this.OnGuestLetgoal()
      this.OnClashLetgoal()


      // 加载生平负
      this.Hs()
      this.Ks()
      this.Js()


      // 公司赔率
      const odds = await this.$http.get('odds/shceduleCompany/');
      if (odds.status !== 200) return console.log('获取公司赔率信息取失败');
      // console.log(odds.data)
      // 欧赔公司
      let standardList = odds.data.filter(item => {
        return item.isStandard
      })
      this.OddsList.homeStandardList = standardList;
      this.OddsList.homevalue1 = standardList[0].companyID;
      this.OddsList.homename_cn1 = standardList[0].name_cn;

      this.OddsList.guestStandardList = standardList;
      this.OddsList.guestvalue1 = standardList[0].companyID;
      this.OddsList.guestname_cn1 = standardList[0].name_cn;


      this.OddsList.clashStandardList = standardList;
      this.OddsList.clashvalue1 = standardList[0].companyID;
      this.OddsList.clashname_cn1 = standardList[0].name_cn;

      // 亚赔
      let letgoalList = odds.data.filter(item => {
        return item.isLetgoal
      })

      // 亚盘公司
      this.OddsList.homeLetgoalList = letgoalList
      this.OddsList.homevalue2 = letgoalList[0].companyID;
      this.OddsList.homename_cn2 = letgoalList[0].name_cn;

      this.OddsList.guestLetgoalList = letgoalList
      this.OddsList.guestvalue2 = letgoalList[0].companyID;
      this.OddsList.guestname_cn2 = letgoalList[0].name_cn;


      this.OddsList.clashLetgoalList = letgoalList
      this.OddsList.clashvalue2 = letgoalList[0].companyID;
      this.OddsList.clashname_cn2 = letgoalList[0].name_cn;


    },
    // 颜色添加
    addColor (list, id) {
      list.forEach(item => {
        if (item.hometeamID == id) {
          if (item.homeScore > item.guestScore) {
            item.colors = '#ff0000'
          } else if (item.homeScore < item.guestScore) {
            item.colors = '#36F'
          } else {
            item.colors = '#444'
          }
        }
        if (item.guestteamID == id) {
          if (item.guestScore > item.homeScore) {
            item.colors = '#ff0000'
          } else if (item.guestScore < item.homeScore) {
            item.colors = '#36F'
          } else {
            item.colors = '#444'
          }
        }
      })
    },

    // 点击主场赛事
    onHomeMatch (v, list) {
      if (!v) {
        // v = this.homeMatchVelue
        v = ' '
      }
      if (!list) {
        list = this.homeHistoryLists
      }
      // var flag = false;
      try {
        if (v == 'thisEvent') {
          this.homeHistoryList = list.filter(item => {
            return item.sclassID == this.sclassID
          })
          this.onHomePlace(this.homePlaceVelue, this.homeHistoryList)
        } else if (v == 'nonFriendship') {
          this.homeHistoryList = list.filter(item => {
            return item.sclassID != this.sclassID
          })
          this.onHomePlace(this.homePlaceVelue, this.homeHistoryList)

        } else if (v == 'friendly') {
          this.homeHistoryList = list.filter(item => {
            return item.sclassID == this.HfriendlMatch[0] || item.sclassID == this.HfriendlMatch[1]
          })
          this.onHomePlace(this.homePlaceVelue, this.homeHistoryList)
        } else if (v == 'nonFriendships') {
          this.homeHistoryList = list.filter(item => {
            return item.sclassID != this.HfriendlMatch[1] && item.sclassID != this.HfriendlMatch[0]
          })
          this.onHomePlace(this.homePlaceVelue, this.homeHistoryList)
        }
        else {
          this.homeHistoryList = list
          this.onHomePlace(this.homePlaceVelue, this.homeHistoryList)
        }
      }
      catch (err) {
        // console.log(err)
        this.Hs()
      }
    },
    // 点击客场赛事
    onGuesteMatch (v, list) {
      if (!v) {
        // v = this.homeMatchVelue
        v = ' '
      }
      if (!list) {
        list = this.guestHistoryLists
      }
      // var flag = false;
      try {
        if (v == 'thisEvent') {
          this.guestHistoryList = list.filter(item => {
            return item.sclassID == this.sclassID
          })
          this.onGuestPlace(this.guestPlaceVelue, this.guestHistoryList)
        } else if (v == 'nonFriendship') {
          this.guestHistoryList = list.filter(item => {
            return item.sclassID != this.sclassID
          })
          this.onGuestPlace(this.guestPlaceVelue, this.guestHistoryList)

        } else if (v == 'friendly') {
          this.guestHistoryList = list.filter(item => {
            return item.sclassID == this.HfriendlMatch[0] || item.sclassID == this.HfriendlMatch[1]
          })
          this.onGuestPlace(this.guestPlaceVelue, this.guestHistoryList)
        } else if (v == 'nonFriendships') {
          this.guestHistoryList = list.filter(item => {
            return item.sclassID != this.HfriendlMatch[1] && item.sclassID != this.HfriendlMatch[0]
          })
          this.onGuestPlace(this.guestPlaceVelue, this.guestHistoryList)
        }
        else {
          this.guestHistoryList = list
          this.onGuestPlace(this.guestPlaceVelue, this.guestHistoryList)
        }
      }
      catch (err) {
        // console.log(err)
        this.Ks()
      }
    },

    // 点击交锋赛事
    onClashMatch (v, list) {
      if (!v) {
        // v = this.homeMatchVelue
        v = ' '
      }
      if (!list) {
        list = this.mutualHistoryLists
      }
      // var flag = false;
      try {
        if (v == 'thisEvent') {
          this.mutualHistoryList = list.filter(item => {
            return item.sclassID == this.sclassID
          })
          this.onClashPlace(this.clashPlaceVelue, this.mutualHistoryList)
        } else if (v == 'nonFriendship') {
          this.mutualHistoryList = list.filter(item => {
            return item.sclassID != this.sclassID
          })
          this.onClashPlace(this.clashPlaceVelue, this.mutualHistoryList)

        } else if (v == 'friendly') {
          this.mutualHistoryList = list.filter(item => {
            return item.sclassID == this.HfriendlMatch[0] || item.sclassID == this.HfriendlMatch[1]
          })
          this.onClashPlace(this.clashPlaceVelue, this.mutualHistoryList)
        } else if (v == 'nonFriendships') {
          this.mutualHistoryList = list.filter(item => {
            return item.sclassID != this.HfriendlMatch[1] && item.sclassID != this.HfriendlMatch[0]
          })
          this.onClashPlace(this.clashPlaceVelue, this.mutualHistoryList)
        }
        else {
          this.mutualHistoryList = list
          this.onClashPlace(this.clashPlaceVelue, this.mutualHistoryList)
        }
      }
      catch (err) {
        // console.log(err)
        this.Js()
      }
    },

    // 点击主场场地
    onHomePlace (v, list) {
      if (!list) {
        list = this.homeHistoryLists
      }
      var flag = false;
      try {
        if (v == 'homePlace') {
          this.homeHistoryList = list.filter(item => {
            return item.hometeamID == this.homeTeamID
          })
          this.onHomeMatch(this.homeMatchVelue, this.homeHistoryList)
        } else if (v == 'guestPlace') {
          this.homeHistoryList = list.filter(item => {
            return item.guestteamID == this.homeTeamID
          })
          this.onHomeMatch(this.homeMatchVelue, this.homeHistoryList)
        } else {
          this.homeHistoryList = list
          this.onHomeMatch(this.homeMatchVelue, this.homeHistoryList)
        }


      }
      catch (err) {
        // console.log(err)
        this.Hs()
      }
    },
    // 点击客场场地
    onGuestPlace (v, list) {
      // if (!v) {
      //   // v = this.homePlaceVelue
      //   v = false
      // }
      if (!list) {
        list = this.guestHistoryLists
      }
      var flag = false;
      try {
        if (v == 'homePlace') {
          this.guestHistoryList = list.filter(item => {
            return item.hometeamID == this.guestTeamID
          })
          this.onGuesteMatch(this.guestMatchVelue, this.guestHistoryList)
        } else if (v == 'guestPlace') {
          this.guestHistoryList = list.filter(item => {
            return item.guestteamID == this.guestTeamID
          })
          this.onGuesteMatch(this.guestMatchVelue, this.guestHistoryList)
        } else {
          this.guestHistoryList = list
          this.onGuesteMatch(this.guestMatchVelue, this.guestHistoryList)
        }


      }
      catch (err) {
        this.Ks()
      }
    },

    // 点击交锋场地
    onClashPlace (v, list) {
      if (!list) {
        list = this.mutualHistoryLists
      }
      var flag = false;
      try {
        if (v == 'homePlace') {
          this.mutualHistoryList = list.filter(item => {
            return item.hometeamID == this.homeTeamID
          })
          this.onClashMatch(this.clashMatchVelue, this.mutualHistoryList)
        } else if (v == 'guestPlace') {
          this.mutualHistoryList = list.filter(item => {
            return item.guestteamID == this.homeTeamID
          })
          this.onClashMatch(this.clashMatchVelue, this.mutualHistoryList)
        } else {
          this.mutualHistoryList = list
          this.onClashMatch(this.clashMatchVelue, this.mutualHistoryList)
        }


      }
      catch (err) {
        // console.log(err)
        this.Js()
      }
    },

    // 点击主场欧赔
    async OnHomeStandard () {
      // 加载所有数据
      let scheduleIDList = []
      this.homeHistoryLists.forEach(item => {
        scheduleIDList.push(item.scheduleID)
      })
      this.OddsList.homescheduleIDList1 = scheduleIDList.join(',');
      // console.log(this.OddsList.homescheduleIDList1)

      let obj = {}
      obj.oddsType = 3;
      obj.scheduleIDs = this.OddsList.homescheduleIDList1;
      if (this.OddsList.homevalue1) {
        obj.companyID = this.OddsList.homevalue1;
      } else {
        obj.companyID = 1
      }

      const res = await this.$http.get('odds/shceduleOdds/', { params: obj });
      if (res.status !== 200) return console.log('获取公司赔率信息取失败');
      this.OddsList.homescheduleList1 = res.data.oddsList
      // console.log(this.OddsList.homescheduleList1)
    },

    // 点击客场欧赔
    async OnGuestStandard () {
      // 加载所有数据
      let scheduleIDList = []
      this.guestHistoryLists.forEach(item => {
        scheduleIDList.push(item.scheduleID)
      })
      this.OddsList.guestscheduleIDList1 = scheduleIDList.join(',');
      // console.log(this.OddsList.homescheduleIDList1)

      let obj = {}
      obj.oddsType = 3;
      obj.scheduleIDs = this.OddsList.guestscheduleIDList1;
      if (this.OddsList.guestvalue1) {
        obj.companyID = this.OddsList.guestvalue1;
      } else {
        obj.companyID = 1
      }

      const res = await this.$http.get('odds/shceduleOdds/', { params: obj });
      if (res.status !== 200) return console.log('获取公司赔率信息取失败');
      this.OddsList.guestscheduleList1 = res.data.oddsList
      // console.log(this.OddsList.homescheduleList1
      // )
    },
    // 点击交锋欧赔
    async OnClashStandard () {
      // 加载所有数据
      let scheduleIDList = []
      this.mutualHistoryLists.forEach(item => {
        scheduleIDList.push(item.scheduleID)
      })
      this.OddsList.clashscheduleIDList1 = scheduleIDList.join(',');
      // console.log(this.OddsList.homescheduleIDList1)

      let obj = {}
      obj.oddsType = 3;
      obj.scheduleIDs = this.OddsList.clashscheduleIDList1;
      if (this.OddsList.clashvalue1) {
        obj.companyID = this.OddsList.clashvalue1;
      } else {
        obj.companyID = 1
      }

      const res = await this.$http.get('odds/shceduleOdds/', { params: obj });
      if (res.status !== 200) return console.log('获取公司赔率信息取失败');
      this.OddsList.clashscheduleList1 = res.data.oddsList
    },
    // 亚赔
    Goal2GoalCn (firstGoal, YzStyle, YzStyle3, YzStyle2) { //数字盘口转汉汉字	
      if (firstGoal == null || firstGoal + "" == "")
        return "";
      else {
        if (firstGoal > 10 || firstGoal < -10) return firstGoal + "球";
        if (firstGoal >= 0) return YzStyle[parseInt(firstGoal * 4)];
        else return "受" + YzStyle[Math.abs(parseInt(firstGoal * 4))];
      }
    },
    // 点击主场亚赔
    async OnHomeLetgoal () {
      let obj = {}
      obj.oddsType = 1;
      obj.scheduleIDs = this.OddsList.homescheduleIDList1;
      if (this.OddsList.homevalue1) {
        obj.companyID = this.OddsList.homevalue2;
      } else {
        obj.companyID = 1
      }
      const res = await this.$http.get('odds/shceduleOdds/', { params: obj });
      if (res.status !== 200) return console.log('获取公司赔率信息取失败');

      //  亚指判断
      let YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      let YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      let YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];

      this.OddsList.homescheduleList2 = res.data.oddsList
      let plv = { 1: "赢", 2: "走", 3: "输" }
      res.data.oddsList.forEach(item => {
        item.firstGoal = this.Goal2GoalCn(item.firstGoal, YzStyle, YzStyle3, YzStyle2)
        item.result = plv[item.result]
      })
      // console.log(res.data.oddsList)
    },
    // 点击客场亚赔
    async OnGuestLetgoal () {
      let obj = {}
      obj.oddsType = 1;
      obj.scheduleIDs = this.OddsList.guestscheduleIDList1;
      if (this.OddsList.guestvalue1) {
        obj.companyID = this.OddsList.guestvalue2;
      } else {
        obj.companyID = 1
      }
      const res = await this.$http.get('odds/shceduleOdds/', { params: obj });
      if (res.status !== 200) return console.log('获取公司赔率信息取失败');

      //  亚指判断
      let YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      let YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      let YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];

      this.OddsList.guestscheduleList2 = res.data.oddsList
      let plv = { 1: "赢", 2: "走", 3: "输" }
      res.data.oddsList.forEach(item => {
        item.firstGoal = this.Goal2GoalCn(item.firstGoal, YzStyle, YzStyle3, YzStyle2)
        item.result = plv[item.result]
      })
      // console.log(res.data.oddsList)
    },
    // 点击交锋亚赔
    async OnClashLetgoal () {
      let obj = {}
      obj.oddsType = 1;
      obj.scheduleIDs = this.OddsList.clashscheduleIDList1;
      if (this.OddsList.clashvalue1) {
        obj.companyID = this.OddsList.clashvalue2;
      } else {
        obj.companyID = 1
      }
      const res = await this.$http.get('odds/shceduleOdds/', { params: obj });
      if (res.status !== 200) return console.log('获取公司赔率信息取失败');

      //  亚指判断
      let YzStyle = "平手,平/半,半球,半/一,一球,一/球半,球半,球半/两,两球,两/两球半,两球半,两球半/三,三球,三/三球半,三球半,三球半/四球,四球,四/四球半,四球半,四球半/五,五球,五/五球半,五球半,五球半/六,六球,六/六球半,六球半,六球半/七,七球,七/七球半,七球半,七球半/八,八球,八/八球半,八球半,八球半/九,九球,九/九球半,九球半,九球半/十,十球".split(",");
      let YzStyle3 = ["0", "-0/0.5", "-0.5", "-0.5/1", "-1", "-1/1.5", "-1.5", "-1.5/2", "-2", "-2/2.5", "-2.5", "-2.5/3", "-3", "-3/3.5", "-3.5", "-3.5/4", "-4", "-4/4.5", "-4.5", "-4.5/5", "-5", "-5/5.5", "-5.5", "-5.5/6", "-6", "-6/6.5", "-6.5", "-6.5/7", "-7", "-7/7.5", "-7.5", "-7.5/8", "-8", "-8/8.5", "-8.5", "-8.5/9", "-9", "-9/9.5", "-9.5", "-9.5/10", "-10"];
      let YzStyle2 = ["0", "0/0.5", "0.5", "0.5/1", "1", "1/1.5", "1.5", "1.5/2", "2", "2/2.5", "2.5", "2.5/3", "3", "3/3.5", "3.5", "3.5/4", "4", "4/4.5", "4.5", "4.5/5", "5", "5/5.5", "5.5", "5.5/6", "6", "6/6.5", "6.5", "6.5/7", "7", "7/7.5", "7.5", "7.5/8", "8", "8/8.5", "8.5", "8.5/9", "9", "9/9.5", "9.5", "9.5/10", "10", "10/10.5", "10.5", "10.5/11", "11", "11/11.5", "11.5", "11.5/12", "12", "12/12.5", "12.5", "12.5/13", "13", "13/13.5", "13.5", "13.5/14", "14"];

      this.OddsList.clashscheduleList2 = res.data.oddsList
      let plv = { 1: "赢", 2: "走", 3: "输" }
      res.data.oddsList.forEach(item => {
        item.firstGoal = this.Goal2GoalCn(item.firstGoal, YzStyle, YzStyle3, YzStyle2)
        item.result = plv[item.result]
      })
      // console.log(res.data.oddsList)
    },
    // 主场胜平负
    Hs () {
      let Hs = [], Hf = [], Hp = [], onHs = [], onHf = [], onHp = []
      // if (this.homeNum == 10) {
      this.homeHistoryList.slice(0, this.homeNum).forEach(item => {
        if (item.colors == '#ff0000') {
          Hs.push(item)
        } else if (item.colors == '#36F') {
          Hf.push(item)
        } else {
          Hp.push(item)
        }
        if (item.hometeamID === this.homeTeamID) {
          if (item.colors == '#ff0000') {
            onHs.push(item)
          } else if (item.colors == '#36F') {
            onHf.push(item)
          } else {
            onHp.push(item)
          }
        }
        // scheduleIDList.push(item.scheduleID)
      })
      // console.log(onHs.length, onHf.length, onHp.length)
      this.HomeSPF = {
        Hs: Hs.length,
        Hf: Hf.length,
        Hp: Hp.length,
        onHs: onHs.length,
        onHf: onHf.length,
        onHp: onHp.length,
      }

    },
    // 客场胜平负
    Ks () {
      let Ks = [], Kf = [], Kp = [], onKs = [], onKf = [], onKp = []
      // if (this.homeNum == 10) {
      this.guestHistoryList.slice(0, this.guestNum).forEach(item => {
        if (item.colors == '#ff0000') {
          Ks.push(item)
        } else if (item.colors == '#36F') {
          Kf.push(item)
        } else {
          Kp.push(item)
        }
        if (item.guestteamID === this.guestTeamID) {
          if (item.colors == '#ff0000') {
            onKs.push(item)
          } else if (item.colors == '#36F') {
            onKf.push(item)
          } else {
            onKp.push(item)
          }
        }
      })
      this.GuestSPF = {
        Ks: Ks.length,
        Kf: Kf.length,
        Kp: Kp.length,
        onKs: onKs.length,
        onKf: onKf.length,
        onKp: onKp.length,
      }
      // }

    },
    // 交锋胜平负
    Js () {
      let Js = [], Jf = [], Jp = [], onJs = [], onJf = [], onJp = []
      // if (this.homeNum == 10) {
      this.mutualHistoryList.slice(0, this.clashNum).forEach(item => {
        if (item.colors == '#ff0000') {
          Js.push(item)
        } else if (item.colors == '#36F') {
          Jf.push(item)
        } else {
          Jp.push(item)
        }
        if (item.hometeamID === this.homeTeamID) {
          if (item.colors == '#ff0000') {
            onJs.push(item)
          } else if (item.colors == '#36F') {
            onJf.push(item)
          } else {
            onJp.push(item)
          }
        }
      })
      this.ClashSPF = {
        Js: Js.length,
        Jf: Jf.length,
        Jp: Jp.length,
        onJs: onJs.length,
        onJf: onJf.length,
        onJp: onJp.length,
      }
      // }

    },
    // 主场多少场
    onHomeEtc (v) {
      // if (!v) {
      //   v = this.homeEtcVelue
      // }
      if (v == 'ten') {
        this.homeNum = 10
      } else if (v == 'twenty') {
        this.homeNum = 20
      } else {
        this.homeNum = Infinity
      }
      this.Hs()
    },

    //客场多少场
    onGuestEtc (v) {
      // if (!v) {
      //   v = this.homeEtcVelue
      // }
      if (v == 'ten') {
        this.guestNum = 10
      } else if (v == 'twenty') {
        this.guestNum = 20
      } else {
        this.guestNum = Infinity
      }
      this.Ks()
    },

    //交锋多少场
    onClashEtc (v) {
      // if (!v) {
      //   v = this.homeEtcVelue
      // }
      if (v == 'ten') {
        this.clashNum = 10
      } else if (v == 'twenty') {
        this.clashNum = 20
      } else {
        this.clashNum = Infinity
      }
      this.Js()
    }

  }
}
</script>
<style lang = 'less' scoped >
a {
  &:hover {
    color: #91c1f8;
  }
}

td {
  .xs_jl {
    /* display: none; */
    position: relative;
    height: 0;
  }
}

.history_box {
  position: relative;
  background: #fff;
  padding: 10px 0 0 0;
  display: flex;
  justify-content: space-between;
  /* zuo边部分  */
  .history_left {
    width: 880px;
    .history_table1 {
      font-size: 12px;
      width: 870px;
      .history_table1_header {
        width: 850px;
        padding: 4px 10px;
        background: #91c1f8;
        display: flex;
        align-items: center;
        span {
          color: #fff;
        }
        .el-select {
          margin: 0 10px;
          width: 100px;
          font-size: 12px;
          .el-input__inner {
            height: 18px;
          }
        }
      }
      .table1 {
        border: 1px solid #91c1f8;
        box-sizing: border-box;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .el-select {
        width: 105px;
      }
      tr {
        width: 100%;
        height: 28px;
        td {
          border-bottom: 1px solid #d5e4f5;
        }
        .borderL {
          border-left: 1px solid #d5e4f5;
        }
        .borderR {
          border-right: 1px solid #d5e4f5;
        }
      }
      .tr_tit {
        background: #f0f0f0;
        height: 36px;
      }
    }

    /* 未来五场 */
    .coming_table {
      width: 870px;
      &::after {
        content: '';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      .table1 {
        border: 1px solid #91c1f8;
        box-sizing: border-box;
        font-size: 12px;
        margin-bottom: 10px;
        tr {
          width: 100%;
          height: 28px;
          td {
            border-bottom: 1px solid #d5e4f5;
          }
          .borderL {
            border-left: 1px solid #d5e4f5;
          }
          .borderR {
            border-right: 1px solid #d5e4f5;
          }
        }
        .tr_tit {
          background: #f0f0f0;
          height: 36px;
        }
        .tit {
          background: #91c1f8;
          height: 36px;
          color: #fff;
        }
      }
    }
    .dibuXX {
      background: #f2f2f2;
      margin-top: -10px;
      width: 850px;
      padding: 20px 10px;
    }
  }
}

.fsing {
  font-size: 16px;
}
</style>