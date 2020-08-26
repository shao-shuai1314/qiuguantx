module.exports = {
  chainWebpack:config=>{
      //发布模式
      config.when(process.env.NODE_ENV === 'production',config=>{
        console.log(1111111)
          //entry找到默认的打包入口，调用clear则是删除默认的打包入口
          //add添加新的打包入口
          config.entry('app').clear().add('./src/main-prod.js')

          //1. externals 加载外部 cdn资源
          config.set('externals',{
            vue:'Vue',
            'vue-router':'VueRouter',
            axios:'axios',
            lodash:'_',
            echarts:'echarts',
            'vue-quill-editor':'VueQuillEditor',
            // 'vue-baidu-map':'VueBaiduMap'
          })

          config.plugin('html').tap(args =>{
            args[0].isProd = true
            return args
          })

      })
      //开发模式
      config.when(process.env.NODE_ENV === 'development',config=>{
        console.log(2222222)
          config.entry('app').clear().add('./src/main-dev.js')

          config.plugin('html').tap(args =>{
            args[0].isProd = false
            return args
          })
      })
  }
}
