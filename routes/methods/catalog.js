/* 总目录页 */

module.exports = async function(ctx,next){

    //通过 redis 来读取文章
    let Catalog = ctx.Catalog

    for( let i = 0;i < Catalog.length;i++){
        let {hash} = Catalog[i]

        Catalog[i].visited = await redis.getCnt(hash)
        console.log(Catalog[i].visited)
    }
    
    await ctx.render('catalog',{
        post:{
            head:{
                title:'总目录'
            }
        },
        page:{},
        Catalog
    })

}
