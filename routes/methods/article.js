const fs = require("fs")
const pathFn = require("path")

module.exports = async (ctx,next)=>{


    let hash_2_map = await redis.Get('hash_2_map')
    let hash  = ctx.params.hash
    let _file_path = hash_2_map[hash].path
    debug(_file_path)

    if(!_file_path){
        //404
        await next()
        return
    }



    debug(_file_path)
    if( !fs.existsSync( pathFn.join(C.book_path,_file_path))){
        // 404
        await next()
        return
    }

    let post = await redis.getArticle(hash)

    /* 判断是否有密码 */
    if(post.head.password && post.head.password !== ''){
        if( ctx.session.input_password !== post.head.password+''){
            ctx.session.pre_url = ctx.request.url
            ctx.session.password = post.head.password
            ctx.redirect('/password')
            return
        }
    }

    post.visited = await redis.getCnt(hash)

    await ctx.render('article',{
        page:{},
        post
    });

}
