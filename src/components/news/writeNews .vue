<template>
  <div class="write_news">
    <div class=" write_news">
      <h2>新闻发布</h2>

      <div class="write_tou">
        <div>
          <el-select v-model="sclassId"
                     placeholder="输入赛事id">
            <el-option v-for="item in sclassIdList"
                       :key="item.sclassId"
                       :label="item.sclassName"
                       :value="item.sclassId">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-date-picker v-model="dateval"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
          </el-date-picker>
        </div>
        <div>
          <el-select v-model="state1"
                     placeholder="转载">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input v-model="inputTitle"
                    placeholder="请输入标题"></el-input>
        </div>

      </div>

      <!-- 富文本 -->
      <div class="edit_container">
        <quill-editor v-model="content"
                      style="height:500px;"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)">
        </quill-editor>
      </div>
      <button v-on:click="saveHtml">发送</button>
    </div>
  </div>

</template>

<script>
import Qs from 'qs'
export default {
  name: 'App',
  data () {
    return {
      content: `<p>hello world</p>`,
      editorOption: {},

      sclassId: 36,
      dateval: '',
      inputGjz: '',
      inputTitle: '',
      state1: '',
      sclassIdList: [{
        sclassId: '',
        sclassName: '其他'
      }],
      options: [{
        value: '虎扑',
        label: '虎扑'
      }, {
        value: '懂球帝',
        label: '懂球帝'
      }, {
        value: '直播吧',
        label: '直播吧'
      }, {
        value: '新浪体育',
        label: '新浪体育'
      }, {
        value: '今日头条',
        label: '今日头条'
      }, {
        value: '腾讯新闻',
        label: '腾讯新闻'
      }, {
        value: '雪缘园',
        label: '雪缘园'
      }],

    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill;
    },
  },
  created () {
    this.rx_sclass()
  },
  methods: {
    onEditorReady (editor) { // 准备编辑器
    },
    onEditorBlur () { }, // 失去焦点事件
    onEditorFocus () { }, // 获得焦点事件
    onEditorChange () { }, // 内容改变事件
    async saveHtml (event) {
      var formData = Qs.stringify({
        sclassId: this.sclassId,
        title: this.inputTitle,
        content: this.content,
        // keyword: this.inputGjz,
        reprinted: this.state1,
        publicTime: this.dateval
      });
      const tokenStr = localStorage.getItem('token')
      if (!this.$getMyConfig.getConfig() && tokenStr) {
        console.log(formData)
        if (this.inputTitle != '' && this.content != '' && this.state1 != '' && this.dateval != '') {
          const { data: res } = await this.$http.request({
            url: '/user/publicJournalism/',
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
          this.$message.success('发送成功')

          // this.sclassId = '36'
          this.inputTitle = ''
          this.content = ''
          // this.inputGjz = ''
          this.state1 = ''
          // this.dateval = ''
        } else {
          alert('不能为空');
        }


      } else {
        alert('登录过期请重新登录');
      }
    },


    async rx_sclass () {
      const { data: res } = await this.$http.get(`rx_sclass`);
      this.rx_sclass = res
      res.forEach(item => {
        this.sclassIdList.unshift(item)
      })
    }


  }
}
</script>

<style lang = 'less' >
.write_news {
  width: 900px;
  background: #fff;
  height: 100%;
}
.edit_container {
  height: 600px;
}
.write_tou {
  display: flex;
  padding: 10px 0;
  div {
    margin-right: 10px;
  }
}
</style>