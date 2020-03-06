let fs = require('fs');

module.exports = async (ctx) => {
  try{
    var path=require('path')
    var defpath=path.join(__dirname,'../')
    const data = JSON.parse(fs.readFileSync(defpath+'config.json', 'utf8'));
    console.log("data*****",data)

    ctx.state.data = {
      name:data.name
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