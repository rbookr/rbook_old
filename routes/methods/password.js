module.exports = async function(ctx,next){


    await ctx.render('password',{
        page:{},
        post:{
            type:'password'
        }
    })
}
