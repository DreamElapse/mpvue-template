export default function() {
  const self = this
  const { webim } = self
  // 初始化未读数
  self.initUnread = async (data) => {
    try {
      let sessMap = await self.getUnread()
      data.forEach((item) => {
        let name = 'C2C' + item.employee.im_account
        if (sessMap[name]) {
          item.unReadMsgCount = sessMap[name].unread()
        } else {
          item.unReadMsgCount = 0
        }
      })
      return data
    } catch (e) {
      self.handleException(e)
    }
  }
  // 获取当前用户的未读消息数
  self.getAnyUnread = async (account) => {
    try {
      let sessMap = await self.getUnread()
      let name = 'C2C' + account
      return sessMap[name] ? sessMap[name].unread() : 0
    } catch (e) {
      self.handleException(e)
    }
  }
  // 获取C2C历史消息并设成已读状态
  // id 要拉取的好友id
  self.getC2CMsgList = async (id) => {
    try {
      let res = await self._getC2CMsgList(id)
      return res
    } catch (e) {
      self.handleException(e)
    }
  }
  // 获取最近联系人列表
  self.getRecentContact = async (num) => {
    try {
      let dataList = null
      let resp = await self._getRecentContact(num)
      if (resp.SessionItem && resp.SessionItem.length > 0) {
        dataList = Promise.all(resp.SessionItem.map(async (item) => {
          let type = item.Type
          if (type === webim.RECENT_CONTACT_TYPE.C2C) {
            let typeZn = '私聊'
            let info = await self.getCustomerMsg(item.To_Account)
            item = {
              type,
              typeZn,
              sessionId: item.To_Account,
              avatar: info.avatar,
              nickName: info.name,
              lastMsg: item.MsgShow,
              msgTimeStamp: item.MsgTimeStamp,
              msgSeq: item.MsgSeq,
              msgRandom: item.MsgRandom, // 消息随机数
              unreadMsgCount: item.UnreadMsgCount
            }
            return item
          }
        }))
      }
      return dataList
    } catch (e) {
      self.handleException(e)
    }
  }
  // 获取最近联系人列表
  self._getRecentContact = (num = 10) => {
    return new Promise((resolve, reject) => {
      webim.getRecentContactList({
        'Count': num // 最近的会话数 ,最大为 100
      }, resp => {
        resolve(resp)
        // 业务处理
      }, err => {
        // 错误回调
        reject(err)
      })
    })
  }
  // 获取C2C历史消息并设成已读状态
  // id 要拉取的好友id
  self._getC2CMsgList = (id) => {
    let options = {
      'Peer_Account': id, // 好友帐号
      'MaxCnt': 1, // 拉取消息条数
      LastMsgTime: 0, // 最近的消息时间，即从这个时间点向前拉取历史消息
      MsgKey: ''
    }
    return new Promise((resolve, reject) => {
      webim.getC2CHistoryMsgs(
        options,
        resp => {
          if (resp.MsgList.length === 0) {
            webim.Log.error('没有历史消息了:data=' + JSON.stringify(options))
          } else {
            let selSess = resp.MsgList[0].sess
            webim.setAutoRead(selSess, true, true)
          }
          resolve('success')
        },
        err => {
          reject(err)
        }
      )
    })
  }
}
