import wx from 'wx'

export function envClear() {
  const env = process.env.NODE_ENV
  const currentEnv = wx.getStorageSync('env')
  if (env !== currentEnv) {
    wx.clearStorageSync()
    wx.setStorageSync('env', env)
  }
  console.warn('环境：' + env)
}

envClear()
