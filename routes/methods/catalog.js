/* 总目录页 */

module.exports = async function(ctx,next){

    //通过 redis 来读取文章
    let Catalog = ctx.Catalog

    for( let i = 0;i < Catalog.length;i++){

        for( let item of Catalog[i].list){
            item.visited = await redis.getCnt(item.hash)
        }
    }
    
    await ctx.render('catalog',{
        post:{
            head:{
                title:'总目录',
                cover: C.catalog_cover || null
            }
        },
        page:{},
        Catalog
    })

}
