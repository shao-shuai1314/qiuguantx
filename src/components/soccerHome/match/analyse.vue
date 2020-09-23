<template>
  <div class="analyse_box">
    <el-card class="analyse_left">
      <!-- <div class="tags">
        <el-tag icon="el-icon-edit">全部</el-tag>
      </div> -->
      <!-- <div>
        暂无东西
      </div>
      <dl>
        <dd></dd>
        <dd></dd>
        <dd></dd>
      </dl> -->

      <div v-if="!active">
        <dl>
          <dd v-for="(item,index) in textList"
              :key="index">
            <div class="yhxinxi">
              <div class="users">
                <el-image style="width:40px;border-radius:50px"
                          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-image>
                <p>{{item.username}}</p>
              </div>

              <div class="yhP">
                <div v-if="!item.z_h">
                  <p v-html="item.content"></p>
                  <div style="margin-top:20px">
                    <b style="color: #c1c1c1;font-size: 12px">{{item.publicTime}}</b>
                    <span @click="ONs_q(index)">收回</span>
                  </div>
                </div>
                <div v-else>
                  <p :class="item.z_h?'ppp':''"
                     v-html="item.content_s"></p>
                  <div style="margin-top:20px">
                    <b style="color: #c1c1c1;font-size: 12px">{{item.publicTime}}</b>
                    <span v-if="item.content_s.length > 200"
                          @click="ONz_h(index)">展开</span>
                  </div>

                </div>
              </div>

            </div>

            <el-divider></el-divider>
          </dd>
        </dl>
        <div v-if="textList.length == 0"
             style="text-align: center">暂无数据</div>
      </div>

      <div class="fbk_box"
           v-else>
        <div>
          <el-button size="small"
                     @click="Onbt">表态+</el-button>
          <span v-if="checkList.length">
            <b style="font-size:14px;margin-left:10px">胜平负 : &nbsp;&nbsp;</b>
            <span v-for="(item,index) in checkList"
                  :key="index"
                  style="color:red;font-size:12px ">
              <b>{{item}}&nbsp;</b>
            </span>
          </span>
          <el-card class="xians"
                   style="width:300px;margin-top:6px"
                   v-if="spf">
            <span class="el-icon-circle-close chahao"
                  @click="Oncha"></span>
            <h4>
              <b>选择表态</b>&nbsp;&nbsp;
              <b style="font-size:12px">胜平负(必选)</b>
            </h4>
            <br>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="胜"></el-checkbox>
              <el-checkbox label="平"></el-checkbox>
              <el-checkbox label="负"></el-checkbox>
            </el-checkbox-group>

          </el-card>
        </div>

        <!-- 富文本 -->
        <div class="analyse_container">
          <quill-editor v-model="analyse_content"
                        style="height:400px;"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
          </quill-editor>
        </div>
        <el-button type="info"
                   class="fr"
                   style="margin-top:60px;margin-bottom:20px"
                   size="mini"
                   v-on:click="saveHtml">发布</el-button>
      </div>
    </el-card>

    <div class="analyse_right">
      <el-button icon="el-icon-edit"
                 type="primary"
                 :disabled="matchState == -1?true:false"
                 @click="ONwrite">写笔记</el-button>
      <el-button icon="el-icon-view"
                 type="primary"
                 @click="ONsea">查看笔记</el-button>

    </div>

  </div>
</template>
<script >
import Qs from 'qs'
export default {
  data () {
    return {
      spf: false,
      checkList: ['胜'],
      active: false,
      textList: [],
      textLists: [],
      // z_h:true,
      matchState: '',


      analyse_content: ``,
      editorOption: {},
    };
  },
  created () {
    this.tixtList()
    this.matchState = sessionStorage.getItem('matchState')
    // 标题
    let datas_ss = [sessionStorage.getItem('sclassName'), sessionStorage.getItem('matchSeason')]
    var temp_ss = sessionStorage.getItem("TeamName").split(",")
    document.title = `${temp_ss[0]} vs ${temp_ss[2]} - ${datas_ss[1]}${datas_ss[0]} -  赛前分析`
  },
  methods: {
    onEditorReady (editor) { // 准备编辑器
    },
    onEditorBlur () { }, // 失去焦点事件
    onEditorFocus () { }, // 获得焦点事件
    onEditorChange () { }, // 内容改变事件
    async saveHtml () {
      var formData = Qs.stringify({
        scheduleId: this.$route.params.scheduleID,
        content: this.analyse_content
      });

      if (localStorage.getItem('token')) {
        if (this.analyse_content) {
          const { data: res } = await this.$http.request({
            url: '/user/publicForecastNotes/',
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
          this.$message.success('发送成功')
          this.analyse_content = ""
        } else {
          alert('内容不能为空');
        }
      } else {
        alert('请先登录');
      }

    },
    async tixtList () {
      // 去标签
      var regex = /(<([^>]+)>)/ig
      const { data: res } = await this.$http.get(`soccer/matchInfo/${this.$route.params.scheduleID}/showNotes/`);
      this.textListss = res.data_list
      // 去标签
      let result = res.data_list.forEach(item => {
        item.content_s = item.content.replace(regex, "")
        item.z_h = true

      });
      this.textList = res.data_list




    },


    ONz_h (index) {
      this.textList[index].z_h = false
    },

    ONs_q (index) {
      this.textList[index].z_h = true
    },
    ONwrite () {
      this.active = true
    },
    ONsea () {
      this.active = false
      this.tixtList()
    },
    Oncha () {
      this.spf = false
    },
    Onbt () {
      this.spf = true
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

.analyse_box {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.analyse_left {
  width: 900px;
  .yhxinxi {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .users {
      width: 20%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  }
  .yhP {
    width: 80%;
    font-size: 14px;
    /* text-indent:2em; */
    line-height: 20px;
    span {
      float: right;
    }
    .ppp {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
    }
    span {
      cursor: pointer;
      &:hover {
        color: #91c1f8;
      }
    }
  }
}
.analyse_right {
  width: 240px;
}

/* 富文本 */
.fbk_box {
  .xians {
    position: relative;
  }
  .chahao {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 26px;
    cursor: pointer;
  }
}
.analyse_container {
  padding: 20px 0;
}
</style>