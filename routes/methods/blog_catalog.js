/* 总目录页 */

module.exports = async function(ctx,next){

    //通过 redis 来读取文章
    let Catalog = ctx.Catalog

    Catalog.name = "Blog目录"


    console.log(Catalog)
    await ctx.render('blog_catalog',{
        post:{
            head:{
                title:'总目录',
                cover: C.catalog_cover || null
            }
        },
        page:{},
        Catalog:JSON.stringify(Catalog)
    })

}
