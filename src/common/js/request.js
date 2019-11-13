import Fly from 'flyio'
import { showLoading, hideLoading } from './wechat'
import { baseURL, TIME_OUT, ERR_OK, ERR_NO } from 'api/config'
import wx from './wx'

const fly = new Fly()

// 公共请求头
const COMMON_HEADER = {}

// 请求拦截器
fly.interceptors.request.use((request) => {
  request.headers['Authorization'] = wx.getStorageSync('token') // todo
  request.headers['Current-Shop'] = wx.getStorageSync('shopId') || wx.getStorageSync('defaultShop') // todo 测试专用记得删除
  return request
})

// 响应拦截器
fly.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.resolve(error.response)
})

// 配置请求基地址
fly.config.baseURL = baseURL.api

// 检查http状态码
function checkStatus (response) {
  // login
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 422)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: ERR_NO,
    msg: '网络异常'
  }
}

/**
 * 检查code
 * @param res
 * @returns {string|Object[]|CanvasPixelArray}
 */
function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === ERR_NO) {
    console.warn(res.msg)
  }
  // 如果网络请求成功，而提交的数据，或者是后端的一些未知错误所导致的，可以根据实际情况进行捕获异常
  if (res.data && (res.data.code !== ERR_OK)) {
    // 可以进行switch操作，根据返回的code进行相对应的操作，然后抛异常
    console.warn(res.data.message)
    throw requestException(res)
  }
  return res.data
}

/**
 * 抛异常
 * @param res
 * @returns {{}}
 */
function requestException (res) {
  hideLoading()
  const error = {}
  error.statusCode = res.status
  const serviceData = res.data
  if (serviceData) {
    error.code = serviceData.code
    error.error = serviceData.error
    error.message = serviceData.message
    error.serverData = serviceData
  }
  return error
}

export default {
  post (url, data, loading = true) {
    if (loading) {
      showLoading()
    }
    return fly.post(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  get (url, params, loading = true) {
    if (loading) {
      showLoading()
    }
    return fly.get(url, params, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  put (url, data, loading = true) {
    if (loading) {
      showLoading()
    }
    return fly.put(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  },
  delete (url, data, loading = true) {
    if (loading) {
      showLoading()
    }
    return fly.delete(url, data, {
      timeout: TIME_OUT,
      headers: COMMON_HEADER
    }).then((response) => {
      return checkStatus(response)
    }).then((res) => {
      return checkCode(res)
    })
  }
}
