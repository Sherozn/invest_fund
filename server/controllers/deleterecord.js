const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openid} = ctx.request.body
  try{
    const res = await mysql('records')
        .where("openid",openid)
        .orderBy('id','desc').first()
    if(res){
      var add = res.add
      await mysql('records')
        .where("openid",openid)
        .orderBy('id','desc').first().del()
    }else{
      var add = 0
    }
    
    ctx.state.data = {
      code: 0,
      add:add,
      msg: 'success'
    }
  }catch(e){
    console.log("e=============:",e)
    ctx.state = {
      code: -1,
      data: {
        msg: '撤销失败' + e.sqlMessage
      }
    }
  }
}