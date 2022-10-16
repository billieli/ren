// import PageTools from './pagetools/index.vue'
// const components = [PageTools]
// import Vue from './vue
// Vue.components
import * as filters from '@/filters'
// console.log(Object.keys(filters))
const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys())// 打印所有的路径
// console.log(fn('./pagetools/index.vue')) // 对印的木块
const components = fn.keys().map(ele => {
  return fn(ele)
})
export default {
  install:
    function(Vue) {
      components.forEach(ele => {
        // console.log(ele)
        Vue.component(ele.default.name, ele.default)
      })
      Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
      })
    }
}
