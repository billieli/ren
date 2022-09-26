// axios封装
import axios from 'axios'
import { Message } from 'element-ui'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
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
