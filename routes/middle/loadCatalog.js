module.exports = async function(ctx,next){
    let Catalog  = await redis.loadCatalog()
    ctx.Catalog = Catalog
    await next()
}
