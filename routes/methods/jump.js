module.exports = async function(ctx,next){

    await ctx.render('jump',{
        page:{},
        post:{
            pre_url: ctx.session.pre_url,
            success: ctx.session.success
        }
    })
}
