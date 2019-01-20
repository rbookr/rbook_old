/* 登录功能 */
var login = require("../../utils/login.js")

module.exports = async (ctx,next)=>{

    let {password,username} = ctx.request.body

    try {
        let res = await login({username,password})
        let {level,status} = res
        if(status == 0){
            ctx.session.level  = level
            ctx.body = {status:0,message:"登录成功"};
        }
        else
            ctx.body = {status:-1,message:"???"};
        return
    }
    catch(e){
        if( e instanceof Object)
            ctx.body = e
        else
            ctx.body = {
                status:-1,
                message:"服务器内部错误"
            }
    }

}
