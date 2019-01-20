const fs = require("fs")
const pathFn = require("path")
const router = require('koa-router')()
const Rmarkdown = require("../Rmarkdown/forNode.js")

router.use( async function(ctx,next){
    ctx.state = {}
    ctx.state.config = C
    ctx.state.theme = {}
    ctx.state.__ = function(val){ return val}

    ctx.state.date = function(val) {return val}
    ctx.state.time = function(val) {return val}
    await next()
})

router.get('/', async (ctx, next) => {
    
    let index_file_path = pathFn.join(C.book_path,'readme.md')


    //let _content = await U.readFile(index_file_path)
    //
    let post = await redis.getArticle('readme')
    
    

    await ctx.render('article',{
        page:{},
        post
    });
})

router.get('/article/:hash', require("./methods/article.js"))
router.get('/catalog', require("./methods/catalog.js"))




module.exports = router