/* 接收触发,更新git */

module.exports = async (ctx,next)=>{
    // 通过git pull
    // 重新 进行redis的cache
    await redis.reCached()
    // 重新生成 nav subnav的数据
    // todo
    ctx.body = {status:0}
}
