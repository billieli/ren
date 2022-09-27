// axios封装
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// 计算时间的函数
const timeout = 3600
function IsCheckTime() {
  const currenTime = +new Date()
  const timetamp = (currenTime - store.getters.hrtime) / 1000
  return timetamp > timeout
}
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTime()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
    return config
  } return config
}, error => {
  console.log(error.response)
  if (error.response?.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(error.message)
  }

  return Promise.reject(error)
})
service.interceptors.response.use((res) => {
  const { message, data, success } = res.data
  if (success) {
    return data
  }

  Message.error(message)
  return Promise.reject(new Error(message))
},
error => {
  return Promise.reject(error)
}
)
export default service
