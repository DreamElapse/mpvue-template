// 不需要自动重置data数据的页面
const unResetPage = []

export default {
  data() {
    return {
      formId: [],
      imageUrl: this.$imageUrl
    }
  },
  onLoad() {
    this._saveCurrentPage()
  },
  onUnload() {
    this._resetData()
    this._clearWatcher()
  },
  methods: {
    _saveCurrentPage() {
      // 记录页面栈
      let url = this.$root.$mp.page.route
      let status = this.$checkIsTabPage(url)
      let query = this.$root.$mp.query
      if (!status) {
        let string = ''
        for (let value in query) {
          string = `&${value}=${query[value]}`
        }
        url = string ? `${url}?${string.slice(1)}` : url
      }
      if (url.includes('pages/error') || url.includes('pages/error-network')) {
        return
      }
      this.$wx.setStorageSync('errorUrl', url)
    },
    _clearWatcher() {
      // 清除mpvue的wathcers
      this._watchers = []
      this._watcher && this._watcher.teardown()
    },
    _resetData() {
      // 重置页面组件的data数据
      if (!this.$mp) return
      // 重置页面的data数据
      let flag = unResetPage.some(value => {
        let reg = new RegExp(value)
        return reg.test(this.$options.__file)
      })
      if (!flag && this.$options.data) {
        Object.assign(this.$data, this.$options.data())
      }
    },
    $checkIsTabPage(path) {
      const TAB_REG = /(pages\/guide)|(pages\/shop)|(pages\/dynamic)|(pages\/mine)/
      return TAB_REG.test(path)
    },
    $openSetting() {
      // todo
    },
    // 手机formId
    $getFormId(e) {
      // let id = e.mp.detail.formId todo
      // Jwt.updateFormId({form_ids: [id]}) todo
    }
  }
}
