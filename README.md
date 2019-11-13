# mpvue

> A description of project!


## 相关依赖

* flyio - 同时支持浏览器、小程序、Node、Weex 及快应用的基于 Promise 的跨平台请求库
* mpvue-entry - 集中式页面配置，不再需要重复编辑各页面的 main.js 文件
* mpvue-router-patch - 在 mpvue 中使用 vue-router 兼容的路由写法

## Tips

* alias配置，方便引用

``` js
alias: {
  'vue': 'mpvue',
  '@': resolve('src'),
  'components': resolve('src/components'),
  'api': resolve('src/api'),
  'common': resolve('src/common'),
  'wx': resolve('src/common/js/wx'),
  'flyio': 'flyio/dist/npm/wx'
}
```

* vuex

创建 `src/store/index.js` 文件

``` js
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```

在 `src/main.js` 中引用

``` js
import Vue from 'vue'
import store from '@/store'
import App from '@/App'

const app = new Vue({
  store,
  ...App
}).$mount()
```

具体使用流程参照vuex官网



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev 开发环境

# serve with hot reload at localhost:8080
npm run test 测试环境

# serve with hot reload at localhost:8080
npm run prod 线上环境

# build for production:test with minification
npm run build:test 打包测试环境

# build for production:prod with minification
npm run build:prod 打包正式环境


```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
