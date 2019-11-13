<template>
    <div class="child">{{role}}
      <div>{{product}}</div>
      <div>{{ttt}}</div>
      <img style="width: 100%" mode="widthFix" v-if="imageUrl" :src="imageUrl + '/zd-image/test-img/1@1x.png'" alt="">
      <div style="height: 500px; background: aqua"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'

  export default {
    created() {
    },
    computed: {
      ...mapGetters('hello', ['product']),
      ...mapGetters('world', ['ttt']),
      ...mapGetters(['role'])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
