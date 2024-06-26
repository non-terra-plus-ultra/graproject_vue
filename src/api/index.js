import axios from 'axios'
import PRO from './API_PRO.js'
import Cookies from 'js-cookie'

// let DEV_ENV = true
let APICONFIG
let API = {}

APICONFIG = PRO

for (var api in APICONFIG) {
  API[api] = (function (api) {
    return function (data, context) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        let apiInfo = APICONFIG[api]
        let method = apiInfo.method || APICONFIG.method

        let token
        if (context === undefined) {
          token = data.token || ''
          token = Cookies.get('token')
        } else {
          token = context.store.state.token
        }
        delete data.token

        let config = {
          baseURL: APICONFIG.baseURL,
          url: apiInfo.url,
          method: method,
          data: data,
          headers: {
            'token': token
          }
        }

        console.log(config)

        axios(config).then((res) => {
          try {
            let apiData = res.data
            console.log(apiData)

            // 异常响应
            if (apiData.code !== 0) {
              //alert(apiData.message)
              if (context) {
                // page 页面请求错误处理方式：公共处理
                context.error({statusCode: 500, message: `CODE[${apiData.code}] ERROR[${apiData.message}]`})
                resolve({})
              } else {
                // ajax 请求错误处理方式：交由相应的调用页面处理
                resolve(apiData)
              }
            }
            resolve(apiData.data)
            console.log(apiData.data)
          // eslint-disable-next-line no-empty
          } catch (err) {
          }
        // eslint-disable-next-line no-unused-vars
        }).catch(res => {
        })
      })
    }
  })(api)
}

API.CONFIG = APICONFIG

export default API;