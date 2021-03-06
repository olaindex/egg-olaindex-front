import axios from 'axios'
import mdui from 'mdui'
import {getToken, removeToken} from '../utils/auth'
const config = {
  baseURL: 'http://localhost:3000',
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    const token = getToken()
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    const data = response.data
    if (!data.status) {
      mdui.snackbar({
        message: data.msg,
        timeout: 0,
        position: 'right-top',
        onButtonClick: function () {
          window.location.reload()
        },
      })
    }
    return data
  },
  function (error) {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          if (error.response.data.msg) {
            error.message = error.response.data.msg
          } else {
            error.message = '请求错误'
          }
          break
        case 401:
          error.message = '登录失效'
          // 退出登录 todo
          removeToken()
          break
        case 403:
          error.message = '拒绝访问'
          break

        case 500:
          error.message = error.response.data.msg
          break
        default:
          error.message = '网络错误,无法请求到数据！'
          break
      }
    }
    // Do something with response error
    mdui.snackbar({
      message: ': ( 数据获取失败...刷新页面或点击按钮以重试',
      buttonText: '重试',
      timeout: 0,
      onButtonClick: function () {
        window.location.reload()
      },
    })
    return Promise.reject(error)
  },
)

export default _axios
