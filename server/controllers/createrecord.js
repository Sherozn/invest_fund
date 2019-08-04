const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openid,add} = ctx.request.body
  try{
    const res = await mysql('records')
        .where("openid",openid)
        .select('mark')
        .orderBy('id','desc').first()

    if(res){
      var mark = res.mark
    }else{
      var mark = 0
    }
    mark = mark + add
    console.log("mark1=============:",mark)
    await mysql('records').insert({
      openid, add, mark
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