<template>
  <div class="write_news">
    <div class="gWidth write_news">
      <h2>新闻发布</h2>

      <div class="write_tou">
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
          <el-input v-model="inputGjz"
                    placeholder="请输入关键字"></el-input>
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
      <button v-on:click="saveHtml">保存</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      content: `<p>hello world</p>`,
      editorOption: {},


      dateval: '',
      inputGjz: '',
      state1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill;
    },
  },
  methods: {
    onEditorReady (editor) { // 准备编辑器
    },
    onEditorBlur () { }, // 失去焦点事件
    onEditorFocus () { }, // 获得焦点事件
    onEditorChange () { }, // 内容改变事件
    saveHtml: function (event) {
      alert(this.content);
    }
  }
}
</script>

<style lang = 'less' >
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #fff;
} */
.write_news {
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