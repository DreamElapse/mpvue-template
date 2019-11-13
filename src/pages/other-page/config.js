import Vue from 'vue'
import Page from './other-page'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: '栗子'
  }
}
