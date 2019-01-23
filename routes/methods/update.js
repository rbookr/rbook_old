/* 接收触发,更新git */

module.exports = async (ctx,next)=>{

    //git的  地址,c_book_path
    let {password} = ctx.request.body
    if( password === C.token){
        U.loadAllCatalog()    //更新目录
        ctx.body = "更新成功"
        return
    }
    ctx.status = 500
    ctx.body = "不正确的token"
}
