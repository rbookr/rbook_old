/* 总目录页 */

module.exports = async function(ctx,next){

    //通过 redis 来读取文章
    
    await ctx.render('catalog',{
        post:{
            head:{
                title:'总目录'
            }
        },
        page:{},
        Catalog:ctx.Catalog
    })

}
