const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openid} = ctx.request.body
  try{
    const res = await mysql('records')
        .where("openid",openid).del()
    ctx.state.data = {
      code: 0,
      msg: 'success'
    }
  }catch(e){
    console.log("e=============:",e)
    ctx.state = {
      code: -1,
      data: {
        msg: '清除失败' + e.sqlMessage
      }
    }
  }
}