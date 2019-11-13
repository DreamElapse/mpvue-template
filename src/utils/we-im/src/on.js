export default function() {
  const self = this
  const {webim} = self
  // 监听连接状态回调变化事件
  self.onConnNotify = (resp) => {
    switch (resp.ErrorCode) {
      case webim.CONNECTION_STATUS.ON:
        webim.Log.warn('连接状态正常...')
        break
      case webim.CONNECTION_STATUS.OFF:
        webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常')
        break
      default:
        webim.Log.error('未知连接状态,status=' + resp.ErrorCode)
        break
    }
  }
  // 处理消息（私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息）
  self._handlderMsg = async(msg) => {
    let fromAccount, fromAccountNick, sessType, subType, content, isSelfSend, seq, random
    try {
      fromAccount = msg.getFromAccount()
      if (!fromAccount) {
        fromAccount = ''
      }

      fromAccountNick = msg.getFromAccountNick()
      if (!fromAccountNick) {
        fromAccountNick = fromAccount
      }

      // 解析消息
      // 获取会话类型
      // webim.SESSION_TYPE.GROUP-群聊，
      // webim.SESSION_TYPE.C2C-私聊，
      sessType = msg.getSession().type()
      // 获取消息子类型
      // 会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
      // 会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
      subType = msg.getSubType()
      seq = msg.getSeq()
      random = msg.getRandom()
      isSelfSend = msg.getIsSend() // 消息是否是自己发送

      // 私聊消息
      if (sessType === webim.SESSION_TYPE.C2C) {
        switch (subType) {
          case webim.C2C_MSG_SUB_TYPE.COMMON:// c2c普通消息
            // 业务可以根据发送者帐号fromAccount是否为app管理员帐号，来判断c2c消息是否为全员推送消息，还是普通好友消息
            // 或者业务在发送全员推送消息时，发送自定义类型(webim.MSG_ELEMENT_TYPE.CUSTOM,即TIMCustomElem)的消息，在里面增加一个字段来标识消息是否为推送消息
            content = self.parseMsg(msg)
            // // c2c消息一定要调用已读上报接口
            let customer = await self.getCustomerMsg(fromAccount)
            let data = Object.assign({}, {fromAccount, fromAccountNick, avatar: customer.avatar, isSelfSend, time: msg.getTime()}, content, seq, random)
            webim.Log.warn('收到一条c2c消息(好友消息或者全员推送消息): 发送人=' + fromAccountNick + ', 内容=' + content)
            return data
          default:
            break
        }
      }
    } catch (e) {
      self.handleException(e)
    }
  }
  // 监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
  // newMsgList 为新消息数组，结构为[Msg]
  self.onMsgNotify = async (newMsgList) => {
    try {
      let newMsg = newMsgList[0]
      let res = await self._handlderMsg(newMsg)
      return res
    } catch (e) {
      self.handleException(e)
    }
  }
}
