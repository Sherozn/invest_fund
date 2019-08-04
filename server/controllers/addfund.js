const https = require('https')

module.exports = async (ctx) => {
	const {code} = ctx.request.query
	let url = "https://fundgz.1234567.com.cn/js/" + code + ".js"
  const fundinfo = await getJSON(url)
  var name = fundinfo.name
  ctx.state.data = {
    name,
    msg: 'success'
  }
}


function getJSON (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        console.log('urlData',urlData)
        if(urlData.indexOf("jsonpgz") >= 0){
          const resData = urlData.slice(8,-2)
          console.log('resData',resData)
          if(resData){
            const fundinfo = JSON.parse(urlData.slice(8,-2))
            if (fundinfo.fundcode) {
              resolve(fundinfo)
            }
            reject(fundinfo)
          }else{
            reject("无法获取该基金名称,请手动添加")
          }
        }else{
          reject("该基金代码不存在")
        }
      })
    })
  })
}
