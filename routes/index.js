const fs = require("fs")
const pathFn = require("path")
const router = require('koa-router')()
const Rmarkdown = require("../Rmarkdown/forNode.js")

const loadCatalog = require("./middle/loadCatalog.js")

router.use( async function(ctx,next){
    ctx.state = {}
    ctx.state.config = C
    ctx.state.theme = {}
    ctx.state.__ = function(val){ return val}

    ctx.state.date = function(val) {return val}
    ctx.state.time = function(val) {return val}
    await next()
})  //404
.use(async (ctx,next)=>{
    await next();
    if( ctx.status === 404){
        await ctx.render('404',{
            page:{}
        })
    }
})

router.get('/',loadCatalog,async (ctx, next) => {
    
    let index_file_path = pathFn.join(C.book_path,'readme.md')


    //let _content = await U.readFile(index_file_path)
    //
    let post = await redis.getArticle('readme')
    
    await ctx.render('article',{
        page:{},
        post
    });
})

router.get('/article/:hash',loadCatalog, require("./methods/article.js"))
router.get('/catalog', loadCatalog,require("./methods/catalog.js"))
router.get('/about', loadCatalog,require("./methods/about.js"))

/* 更新 */
router.post('/update',require("./methods/update.js"))


module.exports = router
