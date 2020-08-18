module.exports = {
  // 通过 chainWebpack 修改 webpack的默认配置
  chainWebpack: config => {
    // 修改生产环境的入口文件
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })

    // 修改开发环境的入口文件
    config.when(process.env_NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}
