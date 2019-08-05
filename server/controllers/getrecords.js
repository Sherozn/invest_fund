const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {page,openid} = ctx.request.query
  try{
    console.log('page',page)
    const size = 15
    const records = await mysql('records')
                              .select('id','add','mark','note','create_time')
                              .where("openid",openid)
                              .orderBy('id','desc')
                              .limit(size).offset(Number(page) * size)
    console.log('records==================',records.length)
    ctx.state.data = {
      records
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