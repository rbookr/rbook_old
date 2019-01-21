const fs = require("fs")
const pathFn = require("path")
module.exports = async (ctx,next)=>{


    let hash_2_path = await redis.hash_2_path()
    let hash  = ctx.params.hash
    let _file_path = hash_2_path[hash]

    if(!_file_path){
        //404
        await next()
        return
    }

    if( !fs.existsSync( pathFn.join(C.book_path,_file_path))){
        console.log(_file_path)
        // 404
        await next()
        return
    }


    let post = await redis.getArticle(hash)

    await ctx.render('article',{
        page:{},
        post
    });

}
