export default function() {
  const self = this
  const {webim} = self
  // 错误处理
  self.handleException = err => {
    console.error(err)
  }
  // 读取用户资料 昵称 头像
  self.getCustomerMsg = (fromAccount) => {
    let ops = {
      'To_Account': [fromAccount],
      'TagList': ['Tag_Profile_IM_Nick', 'Tag_Profile_IM_Image']
    }
    return new Promise((resolve, reject) => {
      webim.getProfilePortrait(ops, (res) => {
        let arr = res.UserProfileItem[0].ProfileItem
        let nickName = arr.filter((item) => {
          return item.Tag === 'Tag_Profile_IM_Nick'
        })[0]
        let nickAvatar = arr.filter((item) => {
          return item.Tag === 'Tag_Profile_IM_Image'
        })[0]
        resolve({name: nickName.Value, avatar: nickAvatar.Value})
      }, (err) => {
        reject(err)
      })
    })
  }
  // 解析消息
  self.parseMsg = (msg) => {
    let data
    let elems = msg.getElems() // 获取消息包含的元素数组
    let elem = elems[0]
    let type = elem.getType() // 获取元素类型
    let content = elem.getContent() // 获取元素对象
    switch (type) {
      case webim.MSG_ELEMENT_TYPE.TEXT: // 聊天
        data = {
          type: 'chat', // 聊天
          text: content.getText() // 内容
        }
        break
      case webim.MSG_ELEMENT_TYPE.CUSTOM: // 自定义消息
        data = {
          type: 'custom', // 自定义
          data: content.getData(), // 内容
          desc: content.getDesc(), // 描述
          ext: content.getExt() // 扩展
        }
        break
      default:
        break
    }
    return data
  }
  // 获取未读会话数据
  self.getUnread = () => {
    return new Promise((resolve, reject) => {
      try {
        webim.syncMsgs(() => {
          let sessMap = webim.MsgStore.sessMap()
          resolve(sessMap)
        })
      } catch (e) {
        throw e
      }
    })
  }
}
