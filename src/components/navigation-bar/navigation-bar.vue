<template>
  <div>
    <div class="head-item" :style="headStyle">
      <div class="status-bar" :style="{height: statusBarHeight + 'px'}"></div>
      <div class="head-content" :style="{color: titleColor}">{{currentTitle}}</div>
      <div class="head-arrow" v-if="showArrow" @click="goBackUrl">
        <img v-if="imageUrl" :src="imageUrl + '/zd-image/1.2/icon-title_back@2x.png'" class="head-arrow-img">
      </div>
    </div>
    <div v-if="!translucent" :style="{height: statusBarHeight + 44 + 'px'}"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  /* eslint-disable no-undef */
  import wx from 'wx'
  import app from '@/main'
  function pageRouter() {
    let page = app.config.pages.find(item => /\^/.test(item))
    return page.replace('^', '/')
  }
  const DEFAULT_PAGE = pageRouter()
  export default {
    name: 'HEAD_ITEM',
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 头部背景颜色
      headStyle: {
        type: String,
        default: 'background: rgba(255, 255, 255, 1)'
      },
      // 是否显示返回箭头
      showArrow: {
        type: Boolean,
        default: true
      },
      // 标题文字颜色
      titleColor: {
        type: String,
        default: '#000000'
      },
      // 是否在点击返回时自定义方法
      custom: {
        type: Boolean,
        default: false
      },
      // 是否为沉浸式
      translucent: {
        type: Boolean,
        default: false
      },
      // 自定义沉浸式滚动fn
      hasTranslucentFn: {
        type: Boolean,
        default: false
      }
    },
    onPageScroll(e) {
      this._diyHeadNavigation(e)
    },
    data () {
      return {
        statusBarHeight: 20,
        translucentTitle: this.title
      }
    },
    created() {
      let res = this.$wx.getSystemInfoSync()
      this.statusBarHeight = res.statusBarHeight || 20
      this._initHeadStyle()
    },
    methods: {
      _diyHeadNavigation(e) {
        // 是否为沉浸式
        if (!this.translucent) return
        // 是否自定义沉浸式方法
        if (this.hasTranslucentFn) {
          this.$emit('headNavigation', e)
          return
        }
        // 沉浸式滚动时的效果
        if (e.scrollTop >= 100) {
          this.headStyle = 'background: rgba(255, 255, 255, 1)'
          this.titleColor = '#000000'
          this.title = this.translucentTitle
        } else {
          this.headStyle = 'background: rgba(255, 255, 255, 0)'
          this.titleColor = 'white'
          this.title = ''
        }
      },
      _initHeadStyle() {
        if (this.translucent) {
          this.headStyle = 'background: rgba(255, 255, 255, 0)'
          this.titleColor = 'transparent'
        }
      },
      goBackUrl() {
        // 如果有自定义方法，会向父级页面传递一个customFn的方法，如果没有直接返回
        if (this.custom) {
          this.$emit('customFn')
          return
        }
        let pages = getCurrentPages()
        if (+pages.length === 1) {
          wx.switchTab({url: DEFAULT_PAGE})
        } else {
          wx.navigateBack({delta: 1})
        }
      }
    },
    computed: {
      currentTitle() {
        if (this.title.length > 10) {
          return this.title.slice(0, 10) + '···'
        } else {
          return this.title
        }
      }
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .head-item
    position: fixed
    width: 100vw
    transition: all 0.3s
    left: 0
    top: 0
    z-index: 100
    .head-arrow
      position: absolute
      width: 20px
      height: 20px
      left: 5px
      bottom: 11px
      display: flex
      justify-content: center
      align-items: center
      &:after
        content: ''
        position :absolute
        width :100%
        height :100%
        padding :12px 20px
      .head-arrow-img
        width: 18px
        height: @width
    .head-content
      text-align: center
      line-height: 44px
      height: 44px
      font-size: 18px
      font-family: PingFangSC-Medium
      color: #000000
</style>
