<template>
  <article class="cut-picture">
    <mpvue-cropper
      v-if="show"
      ref="cropper"
      :option="cropperOpt"
      @ready="cropperReady"
      @beforeDraw="cropperBeforeDraw"
      @beforeImageLoad="cropperBeforeImageLoad"
      @beforeLoad="cropperLoad"
    ></mpvue-cropper>
    <div class="cropper-buttons">
      <div
        class="btn cancel"
        @tap="cancel">
        取消
      </div>
      <div
        class="btn confirm"
        @tap="confirm">
        确定
      </div>
    </div>
  </article>
</template>

<script type="text/ecmascript-6">
  import MpvueCropper from 'components/mpvue-cropper/mpvue-cropper'
  import { CUT_CONFIG } from './contants'
  import { Guide } from 'api'

  let wecropper

  export default {
    name: 'CutPicture',
    components: {
      MpvueCropper
    },
    data() {
      return {
        cropperOpt: null,
        src: null,
        show: false,
        confirmFlag: false,
        cutType: ''
      }
    },
    onLoad(option) {
      let cutType = option.cutType === 'undefined' ? 'default' : option.cutType
      this.cutType = cutType
      this.show = true
      this.src = '' + getApp().globalData.imgUrl
      this.cropperOpt = CUT_CONFIG[cutType]
    },
    mounted() {
      wecropper = this.$refs.cropper
      wecropper.pushOrigin(this.src)
    },
    methods: {
      cropperReady(...args) {
        console.info('cropper ready!')
      },
      cropperBeforeImageLoad(...args) {
        console.info('before image load')
      },
      cropperLoad(...args) {
        console.info('image loaded')
      },
      cropperBeforeDraw(...args) {
        // Todo: 绘制水印等等
      },
      cancel() {
        // todo something
        this.pageBack()
      },
      async confirm() {
        if (this.confirmFlag) {
          return
        }
        this.confirmFlag = true
        this.$wechat.showLoading('正在裁切图片')
        try {
          let filePaths = await wecropper.getCropperImage()
          let res = await this.$cos.uploadFiles(this.$cosFileType.IMAGE_TYPE, [filePaths])
          // this._updateImgHandle(res)
          getApp().globalData.imgUrl = res[0].url // todo
          this.pageBack()
        } catch (e) {
          this.confirmFlag = false
          e && this.$wechat.showToast(e.message)
        }
      },
      pageBack(number = 1) {
        this.$wx.navigateBack({delta: number})
      },
      _updateImgHandle(res) {
        switch (this.cutType) {
          case 'avatar':
            let id = res[0].id
            Guide.setShopImage({image_id: id}).then(res => {
              this.$wechat.hideLoading()
              if (res.error !== this.$ERR_OK) {
                this.$$wechat.showToast(res.message)
                return
              }
              this.$wechat.tipSuccess('修改图片成功')
              setTimeout(() => {
                this.pageBack()
              }, 530)
            }).catch(e => console.error(e))
            break
          default:
            break
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"

  .cut-picture
    fill-box(fixed)
    background-color: #000

  .cropper-wrapper
    position: relative
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    height: 100%
    background-color: #e5e5e5

  .cropper-buttons
    layout(row)
    justify-content: center
    align-items: center
    position: absolute
    bottom: 30px
    left: 0
    right: 0
    z-index: 20
    .btn
      width: 100px
      height: 32px
      font-family: PingFangSC-Regular
      font-size: 14px
      &.cancel
        background: #FFFFFF
        border: 2px solid #374B63
        box-shadow: 0 4px 12px 4px rgba(55, 75, 99, 0.15)
        border-radius: 100px;
        color: #374B63
        layout()
        justify-content: center
        align-items: center
      &.confirm
        margin-left: 15px
        background: #F94C5F
        box-shadow: 0 4px 16px 0 rgba(249, 76, 95, 0.30)
        border-radius: 100px
        layout()
        justify-content: center
        align-items: center
        color: #FFFFFF
</style>
