<template>
  <div class="demo">
    <navigation-bar title="我的" :showArrow="false" :translucent="true"></navigation-bar>
    <img style="width: 100%" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/test-img/1@1x.png'" alt="">
    <button @click="editorAvatar">切图</button>
    <we-paint ref="wePaint" @drawDone="drawDone"></we-paint>
    <button @click="createQrCode">生成二维码</button>
    <button @click="testToast">toast</button>
    <img style="width: 100%" mode="widthFix" v-if="testSrc" :src="testSrc" alt="">
    <child></child>
    <button @click="navTo">跳转other页面</button>
  </div>

</template>

<script type="text/ecmascript-6">
  import WePaint from 'components/we-paint/we-paint'
  // import { mapGetters } from 'vuex'
  import Child from './child/child'
  import NavigationBar from 'components/navigation-bar/navigation-bar'

  export default {
    components: {
      WePaint,
      Child,
      NavigationBar
    },
    beforeCreate() {
    },
    data() {
      return {
        testSrc: ''
        // title: '',
        // headStyle: 'background: rgba(255, 255, 255, 0)',
        // titleColor: 'white'
      }
    },
    onShow() {
      if (getApp().globalData.imgUrl) {
        this.testSrc = getApp().globalData.imgUrl
      }
    },
    computed: {
      // ...mapGetters(['role'])
    },
    // onPageScroll(e) {
    //   if (e.scrollTop >= 100) {
    //     this.headStyle = 'background: rgba(255, 255, 255, 1)'
    //     this.titleColor = '#000000'
    //     this.title = '导购'
    //   } else {
    //     this.headStyle = 'background: rgba(255, 255, 255, 0)'
    //     this.titleColor = 'white'
    //     this.title = ''
    //   }
    // },
    methods: {
      navTo() {
        this.$wx.navigateTo({url: `/pages/other-page`})
      },
      testToast() {
        this.$wechat.showToast('123123')
      },
      createQrCode() {
        let str = JSON.stringify({ 'code': 8297128291, 'store_id': 8 }) // todo
        let img = this.$createQrCode.png(str) // png
        img = this.$createQrCode.svg(str) // svg
        this.testSrc = img
      },
      async editorAvatar() {
        try {
          let res = await this.$wechat.chooseImage()
          let file = res.tempFilePaths[0]
          getApp().globalData.imgUrl = file
          this.$wx.navigateTo({ url: '/pages/cut-picture?cutType=avatar' })
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/private"
</style>
