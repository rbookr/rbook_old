/* blog模式的下的route */
const fs = require("fs")
const pathFn = require("path")
const router = require('koa-router')()
const Rmarkdown = require("../markdown-r/index.js")
const loadCatalog = require("./middle/loadCatalog.js")

router.use( async function(ctx,next){
    ctx.state = {}
    ctx.state.config = C
    ctx.state.theme = {}
    ctx.state.__ = function(val){ return val}

    ctx.state.date = function(val) {return val}
    ctx.state.time = function(val) {return val}
    await next()
})


router.get('/',loadCatalog,require("./methods/blog_catalog.js"))
router.get('/article/:hash',require("./methods/article.js"))
router.get('/about',require("./methods/about.js"))

/* 更新 */
router.post('/update',require("./methods/update.js"))

/* password */
router.get('/password',require("./methods/password.js"))
router.post('/password',require("./methods/postPassword.js"))
router.get('/jump',require("./methods/jump.js"))


module.exports = router
