const pathFn = require("path")
module.exports = async function(ctx,next){

    let index_file_path = pathFn.join(C.book_path,'readme.md')
    //let _content = await U.readFile(index_file_path)
    //
    let post = await redis.getArticle('about')
    
    await ctx.render('article',{
        page:{},
        post
    });
}

