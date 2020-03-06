const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {page,openid} = ctx.request.query
  try{
    console.log('page',page)
    const records = await mysql('records')
                              .select('id','add','mark','note','create_time')
                              .where("openid",openid)
                              .orderBy('id','desc')
                              .limit(15).offset(Number(page) * 15)

    ctx.state.data = {
      records
    }
  }catch(e){

    ctx.state = {
      code: -1,
      data: {
        msg: '获取失败' + e.sqlMessage
      }
    }
  }
}