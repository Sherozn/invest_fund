import config from './config'

// get工具函数
export function get (url, data) {
	//返回的是一个Promise对象
  return request(url, 'GET', data)
}

// post工具函数
export function post (url, data) {
	//返回的是一个Promise对象
  return request(url, 'POST', data)
}

//将Promise对象封装在request()函数中
function request (url, method, data) {
	//将wx.request请求API包装成一个Promise对象
  return new Promise((resolve, reject) => {
  	//wx.request是微信的API,
    wx.request({
    	url: config.host + url,
    	method,
      data,
      success: function (res) {
      	console.log('我是我是007',res)
        console.log('res.data.code:', res.data.code)
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

//消息提示框
export function showSuccess (text) {
	//wx.showToast是小程序现成的API，其中title是提示的内容,icon是显示的图标
  wx.showToast({
    title: text,
    icon: 'success'
  })
}