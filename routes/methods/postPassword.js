/* 提交处理 */
module.exports  = async function(ctx,next){

    let {password=null,username} = ctx.request.body
    ctx.session.success = false;
    if(!username && password == ctx.session.password){
        ctx.session.input_password = password
        ctx.session.success = true;
        ctx.redirect('/jump')
        return
    }

    ctx.redirect('jump')
}
