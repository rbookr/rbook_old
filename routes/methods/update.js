/* 接收触发,更新git */

module.exports = async (ctx,next)=>{

    //git的  地址,c_book_path
    let {token} = ctx.request.body
    console.log(token)
    ctx.body = {status:0}
}
