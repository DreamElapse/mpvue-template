import { baseURL } from 'api/config'
export const TIMELAG = 300 // 间隔时间秒数，用于消息列表添加时间
export const emotionsFace = {
  '[微笑]': baseURL.image + '/face/weixiao.png',
  '[撇嘴]': baseURL.image + '/face/piezui.png',
  '[发呆]': baseURL.image + '/face/fadai.png',
  '[酷]': baseURL.image + '/face/ku.png',
  '[害羞]': baseURL.image + '/face/haixiu.png',
  '[尴尬]': baseURL.image + '/face/ganga.png',
  '[发怒]': baseURL.image + '/face/fanu.png',
  '[调皮]': baseURL.image + '/face/tiaopi.png',
  '[难过]': baseURL.image + '/face/nanguo.png',
  '[囧]': baseURL.image + '/face/jiong.png',
  '[傲慢]': baseURL.image + '/face/aoman.png',
  '[奋斗]': baseURL.image + '/face/fendou.png',
  '[坏笑]': baseURL.image + '/face/huaixiao.png',
  '[愉快]': baseURL.image + '/face/keai.png',
  '[快哭了]': baseURL.image + '/face/kuaikule.png',
  '[困]': baseURL.image + '/face/kun.png',
  '[亲亲]': baseURL.image + '/face/qinqin.png',
  '[握手]': baseURL.image + '/face/woshou.png'
}

export const emotionsFaceArr = [
  { txt: '[微笑]', url: baseURL.image + '/face/weixiao.png' },
  { txt: '[撇嘴]', url: baseURL.image + '/face/piezui.png' },
  { txt: '[发呆]', url: baseURL.image + '/face/fadai.png' },
  { txt: '[酷]', url: baseURL.image + '/face/ku.png' },
  { txt: '[害羞]', url: baseURL.image + '/face/haixiu.png' },
  { txt: '[尴尬]', url: baseURL.image + '/face/ganga.png' },
  { txt: '[发怒]', url: baseURL.image + '/face/fanu.png' },
  { txt: '[调皮]', url: baseURL.image + '/face/tiaopi.png' },
  { txt: '[难过]', url: baseURL.image + '/face/nanguo.png' },
  { txt: '[囧]', url: baseURL.image + '/face/jiong.png' },
  { txt: '[傲慢]', url: baseURL.image + '/face/aoman.png' },
  { txt: '[奋斗]', url: baseURL.image + '/face/fendou.png' },
  { txt: '[坏笑]', url: baseURL.image + '/face/huaixiao.png' },
  { txt: '[愉快]', url: baseURL.image + '/face/keai.png' },
  { txt: '[快哭了]', url: baseURL.image + '/face/kuaikule.png' },
  { txt: '[困]', url: baseURL.image + '/face/kun.png' },
  { txt: '[亲亲]', url: baseURL.image + '/face/qinqin.png' },
  { txt: '[握手]', url: baseURL.image + '/face/woshou.png' }
]

// 讲文本中的特殊字符转成表情
export function msgFaceToHtml(msg) {
  if (!msg) return msg
  let expr = /\[[^[\]]{1,3}\]/mg
  let emotions = msg.match(expr)
  if (!emotions || emotions.length < 1) {
    return msg
  } else { // 有表情
    for (let i = 0; i < emotions.length; i++) {
      if (emotionsFace[emotions[i]]) {
        let html = `<img class="face-img" style="width: 18px;height: 18px;vertical-align: middle; padding: 0 1px;" src="${emotionsFace[emotions[i]]}"/>`
        let str = emotions[i].replace(/(\[|])/g, '\\' + '$1')
        let reg = new RegExp(str, 'g')
        msg = msg.replace(reg, html)
      }
    }
    return msg
  }
}
// 标签转义
export function labelEscape(msg) {
  if (!msg) return msg
  let res = msg.replace(/</g, '&lt;')
  res = res.replace(/>/g, '&gt;')
  return res
}

export function radarTimeFormat(time) {
  let resTime = new Date(time * 1000)
  let nowDate = formatDateTime(resTime)
  let nowTime = formatTime(resTime)
  let todayTime = new Date()
  let todayDate = formatDateTime(todayTime)
  let yesToday = todayTime.setDate(todayTime.getDate() - 1)
  let yesTodayDateTime = new Date(yesToday)
  let yesTodayDate = formatDateTime(yesTodayDateTime)
  nowDate = nowDate.replace(todayDate, '')
  nowDate = nowDate.replace(yesTodayDate, '昨天').trim()
  nowTime = nowTime.replace(todayDate, '')
  nowTime = nowTime.replace(yesTodayDate, '昨天').trim()
  return {
    date: nowDate,
    time: nowTime
  }
}

export function formatDate(time) {
  let resTime = new Date(time * 1000)
  let nowDate = formatDateTime(resTime)
  let nowTime = formatTime(resTime)
  let todayTime = new Date()
  let todayDate = formatDateTime(todayTime)
  let yesToday = todayTime.setDate(todayTime.getDate() - 1)
  let yesTodayDateTime = new Date(yesToday)
  let yesTodayDate = formatDateTime(yesTodayDateTime)
  nowDate = nowDate.replace(todayDate, '今天')
  nowDate = nowDate.replace(yesTodayDate, '昨天')
  nowTime = nowTime.replace(todayDate, '今天')
  nowTime = nowTime.replace(yesTodayDate, '昨天')
  return {
    date: nowDate,
    time: nowTime
  }
}

export function formatTime(time) {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()

  const t1 = [year, month, day].join('/')
  const t2 = [hour, minute].map(formatNumber).join(':')
  return `${t1} ${t2}`
}

export function formatDateTime(time) {
  let date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].join('/')
}

/* 格式数字 */
export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
