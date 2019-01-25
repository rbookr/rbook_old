module.exports = async function(ctx,next){
    ctx.hash_2_map = await redis.Get('hash_2_map')
    await next()
}
