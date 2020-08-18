// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 全局css
import './css/style.css';

// 引入阿里矢量图标
import './css/font/iconfont.css'

// 引进Element
import '@/element/element.js';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// 公共组件
import Subnavigation from '@/components/subUnit/subnavigation';
// 子导航
Vue.component('Subnavigation', Subnavigation);


// 配置路径 掉接口
import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.3.6:8888/'
http: //192.168.3.6:8888/
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  Vue.prototype.$http = axios



// 百度地图
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'KVDt8MG1wqVmqZhUzrdprGfxTSqiCnem'
});


// 富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})