const pathFn = require("path")
module.exports = async function(ctx,next){

    let post = await redis.getArticle('about')
    
    post.visited = await redis.getCnt('about')
    await ctx.render('article',{
        page:{},
        post
    });
}

