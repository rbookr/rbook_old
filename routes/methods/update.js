/* 接收触发,更新git */

module.exports = async (ctx,next)=>{

    //git的  地址,c_book_path
    let {token} = ctx.request.body
    if( token === C.token){
        await U.loadAllCatalog()    //更新目录
        ctx.body = {status:0}
        return
    }
    ctx.status = 500
    ctx.body = "invalue token"
}
