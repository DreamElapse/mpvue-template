let tmp = {}
export default {
  // 登录信息
  loginInfo: {
    default: null,
    get() {
      return tmp.loginInfo
    },
    set(value) {
      tmp.loginInfo = value
    }
  },
  // 当前会话
  selSess: {
    default: null,
    get() {
      return tmp.selSess
    },
    set(value) {
      tmp.selSess = value
    }
  },
  // 会话类型，暂时默认C2C
  selType: {
    default: 'C2C',
    get() {
      return tmp.selType
    },
    set(value) {
      if (typeof (value) !== 'string') {
        console.error(`selType：${value} is invalid`)
      }
      tmp.selType = value
    }
  },
  // 是否登录
  isLogin: {
    default: false,
    get() {
      return tmp.isLogin
    },
    set(value) {
      if (typeof (value) !== 'boolean') {
        console.error(`isLogin：${value} is invalid`)
      }
      tmp.isLogin = value
    }
  }
}
