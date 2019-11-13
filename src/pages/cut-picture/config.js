import Vue from 'vue'
import Page from './cut-picture'

const page = new Vue(Page)
page.$mount()

export default {
  config: {
    navigationBarTitleText: ''
  }
}
