/* 接收触发,更新git */


module.exports = async (ctx,next)=>{

    //git的  地址,c_book_path
    let {password} = ctx.request.body

    if( password === C.token){
        /* 更新git */
        await U.git.pull_master()
        await redis.loadCatalog(true);
        ctx.body = "更新成功 " + (new Date()).toString()
        return
    }
    ctx.status = 500
    ctx.body = "不正确的token"
}
