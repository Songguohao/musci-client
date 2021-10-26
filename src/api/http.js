import axios from 'axios'
import router from '../router/index'
axios.defaults.timeout = 1000000
axios.defaults.withCredentials = true

// Content-type 响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencode;charset=UTF-8'
// 基础url
axios.defaults.baseURL = 'http://localhost:8888'

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果status是200，说明访问到了接口
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 未登录
        case 401:
          router.replace({
            path: '/',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        // 未找到
        case 404:
          break
      }
      return Promise.reject(error.response)
    }
  }
)

/**
 * 封装get方法
 */
export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post方法
 */
export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
