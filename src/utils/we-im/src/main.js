import { validator } from './utils/index'
import webim from '../lib/webim'
import DEFAULT from './default'
import login from './login'
import logout from './logout'
import common from './common'
import on from './on'
import readers from './readers'
import sends from './sends'

class WeIm {
  constructor(params) {
    const self = this
    const _default = {webim}

    validator(self, DEFAULT)

    Object.keys(DEFAULT).forEach(key => {
      _default[key] = DEFAULT[key].default
    })

    Object.assign(self, _default, params)
    self.common()
    self.login()
    self.logout()
    self.on()
    self.readers()
    self.sends()

    return self
  }
}

WeIm.prototype.common = common
WeIm.prototype.login = login
WeIm.prototype.logout = logout
WeIm.prototype.on = on
WeIm.prototype.readers = readers
WeIm.prototype.sends = sends

export default WeIm
