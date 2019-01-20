const fs = require("fs")
const path = require("path")
const router = require('koa-router')()


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


    await ctx.render('index',{
        page:{},
    });
})

router.get('/article', require("./methods/article.js"))




module.exports = router
