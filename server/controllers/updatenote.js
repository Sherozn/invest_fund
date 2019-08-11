const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {id,note} = ctx.request.body
  try{
    const res = await mysql('records')
        .where("id",id)
        .update("note",note)
    ctx.state.data = {
      code: 0,
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