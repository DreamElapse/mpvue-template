import wx from 'wx'
const device = wx.getSystemInfoSync()
export const deviceInfo = {
  device: device,
  width: device.windowWidth,
  height: device.windowHeight,
  screenW: device.screenWidth,
  screenH: device.screenHeight,
  pixelRatio: device.pixelRatio
}
const width = deviceInfo.width
const height = deviceInfo.height

export const CUT_CONFIG = {
  default: {
    id: 'cropper',
    width: width,
    height: height - 0.2 * width,
    scale: 2.5,
    zoom: 8,
    cut: {
      x: (width - width * 0.8) / 2,
      y: (height - width * 0.8) / 2,
      width: width * 0.8,
      height: width * 0.8
    }
  },
  avatar: {
    id: 'cropper',
    width: width,
    height: height - 0.2 * width,
    scale: 2.5,
    zoom: 8,
    cut: {
      x: (width - width * 0.8) / 2,
      y: (height - width * 0.6) / 2,
      width: width * 0.8,
      height: width * 0.6
    }
  }
}
