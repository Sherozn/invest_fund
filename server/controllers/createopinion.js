const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openid,opinion,src,wechat} = ctx.request.body
  try{
    console.log("opinion=============:",opinion)
    await mysql('opinions').insert({
      openid,opinion,src,wechat
    })
    ctx.state.data = {
      code: 0,
      msg: 'success'
    }
  }catch(e){
    console.log("e=============:",e)
    ctx.state = {
      code: -1,
      data: {
        msg: '添加失败' + e.sqlMessage
      }
    }
  }
}