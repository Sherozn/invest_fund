const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openid} = ctx.request.query
  console.log("openid=============:",openid)
  try{
    const res = await mysql('records')
        .where("openid",openid)
        .orderBy('id','desc').first()
    console.log("res=============:",res)
    if(res){
      var mark = res.mark
    }else{
      var mark = 0
    }
    console.log("mark=============:",mark)
    
    ctx.state.data = {
      code: 0,
      mark:mark,
      msg: 'success'
    }
  }catch(e){
    console.log("e=============:",e)
    ctx.state = {
      code: -1,
      data: {
        msg: '获取失败' + e.sqlMessage
      }
    }
  }
}