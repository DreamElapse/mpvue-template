<script>
  import { mapActions } from 'vuex'
  import 'utils/app-plugins'

  export default {
    created() {
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      console.log('app created and cache logs by setStorageSync')
    },
    onShow() {
      // todo
      this.updateProduct(123123)
      this.saveRole('我role是店长')
      this.doRole('vuex延迟5s加载中....')
      this.doW('ahsdjkhaskdjhadjahkdahkdkajhsakds')
    },
    methods: {
      ...mapActions('hello', ['updateProduct', 'doRole', 'doW']), // todo
      ...mapActions(['saveRole']) // todo
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
</style>
