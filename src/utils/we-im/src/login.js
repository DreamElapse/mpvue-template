export default function() {
  const self = this
  const { webim } = self
  self._sdkLogin = (userInfo, listeners, options) => {
    return new Promise((resolve, reject) => {
      webim.login(userInfo, listeners, options, identifierNick => {
        webim.Log.info('webim登录成功')
        resolve(identifierNick)
      }, error => {
        webim.Log.info(error.ErrorInfo)
        reject(error)
      })
    })
  }
  // 修改帐号名称和头像
  self._setProfilePortrait = (options) => {
    return new Promise((resolve, reject) => {
      webim.setProfilePortrait(options,
        res => {
          webim.Log.info('修改昵称成功')
          resolve()
        },
        err => {
          webim.Log.info('修改昵称失败')
          reject(err)
        }
      )
    })
  }
  self.sdkLogin = async (userInfo, listeners, options, avatar) => {
    try {
      self.loginInfo = userInfo
      const profileOptions = {
        'ProfileItem': [
          {
            'Tag': 'Tag_Profile_IM_Nick',
            'Value': userInfo.identifierNick ? userInfo.identifierNick : userInfo.identifier
          },
          {
            'Tag': 'Tag_Profile_IM_Image',
            'Value': avatar || ' '
          }
        ]
      }
      await self._sdkLogin(userInfo, listeners, options)
      await self._setProfilePortrait(profileOptions)
      return self
    } catch (e) {
      self.handleException(e)
    }
  }
}
