<template>
  <div class="history_table1">
    <div class="history_table1_header">
      <span>{{teamName}}</span>
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
      <!-- <el-select v-model="homePlaceVelue"
                 size="mini"
                 :placeholder="homePlaceVelue"
                 @change="onHomePlace">
        <el-option v-for="item in homePlace"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select> -->
      <!-- 多少场 -->
      <!-- <el-select v-model="homeEtcVelue"
                 size="mini"
                 :placeholder="homeEtcVelue"
                 @change="onHomeEtc">
        <el-option v-for="item in homeEtc"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <span>{{HomeSPF.Hs}}胜{{HomeSPF.Hp}}平{{HomeSPF.Hf}}负， 其中主场{{HomeSPF.onHs}}胜{{HomeSPF.onHp}}平{{HomeSPF.onHf}}负</span> -->
    </div>
    <!-- 主场 -->
    <!-- <table width="100%"
               border="0"
               cellpadding="0"
               cellspacing="0"
               align="center"
               class="table1">
          <tr align="center"
              class="tr_tit">
            <td width="8%">联赛</td>
            <td>时间</td>
            <td width="12%"
                class="borderL">主队</td>
            <td width="6%">比分</td>
            <td width="12%">客队
            </td>
            <td width="6%"
                class="borderL borderR">半场
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
            <td width="4%">盘路</td>

          </tr>

          <tr align="center"
              v-for="item in homeHistoryList.slice(0,this.homeNum)"
              :key="item.scheduleID">
            <td>{{item.sclassName}}
              <span style="padding: 0 2px;font-size: 10px;color: #aaa7a7;display: inline-block;">{{item.subsclassName}}{{item.round}}{{item.grouping}}</span>
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

        </table> -->
  </div>

</template>
<script>
export default {
  props: ["teamName", "match"],
  data () {
    return {

    }
  }
}
</script>

