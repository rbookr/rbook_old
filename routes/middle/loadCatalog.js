module.exports = async function(ctx,next){
    let Catalog  = await redis.Get('key-Catalog')
    ctx.Catalog = Catalog
    await next()
}
