/* 总目录页 */

module.exports = async function(ctx,next){

    await ctx.render('catalog',{
        post:{},
        page:{},
        Catalog
    })

}
