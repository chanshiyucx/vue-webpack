const fs = require('fs')
const fsExt = require('fs-extra')
const path = require('path')
const rm = require('rimraf')

const clientConfig = require('./client.json')
const argList = require('../build/getArgList')()
const client = argList.client || 'Touhou'
const config = clientConfig[client]

console.log('* 运行环境参数：', argList)
console.log('* 当前客户配置：', config)

module.exports = {
  init: function() {
    this.setStyle()
    this.setImage()
    this.setRouter()
    this.setSetting()
  },
  setStyle: function() {
    console.log(`* 开始配置styleDir：${config.styleDir}`)
    if (config.styleDir) {
      fs.writeFileSync(
        path.resolve(__dirname, '../src/assets/styles/client.scss'),
        `@import '../self/${config.styleDir}/styles/client.scss';`
      )
    } else {
      console.log('* styleDir未配置')
    }
  },
  setImage: function() {
    console.log(`* 开始配置imageDir：${config.imageDir}`)
    if (config.imageDir) {
      rm.sync(path.resolve(__dirname, '../src/assets/images/self'))
      fsExt.copySync(
        path.resolve(__dirname, `../src/assets/self/${config.imageDir}/images`),
        path.resolve(__dirname, '../src/assets/images/self')
      )
    } else {
      console.log(`* imageDir未配置`)
    }
  },
  setRouter() {
    if (config.routerDir) {
      fsExt.copySync(
        path.resolve(__dirname, `../src/assets/self/${config.routerDir}/scripts/router.js`),
        path.resolve(__dirname, '../src/assets/scripts/router.js')
      )
    } else {
      fs.writeFileSync(
        path.resolve(__dirname, '../src/assets/scripts/router.js'),
        `export default [
          {
            path: "/",
            name: "Home",
            component: resolve => require(["@/views/Home"], resolve)
          }
        ];`
      )
    }
  },
  setSetting: function() {
    console.log(`* 开始设置配置setting.js`)
    const setting = {
      ...config.setting,
      updateAt: new Date().toISOString()
    }
    fs.writeFileSync(path.resolve(__dirname, '../static/setting.js'), `var setting = ${JSON.stringify(setting)}`)
  }
}
