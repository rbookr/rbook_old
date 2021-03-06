const fs = require("fs")
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const send = require('koa-send');
const render = require('koa-ejs');
const pathFn = require("path")
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const serve = require('koa-static');

//全局模式
global.model = process.env.model || 'book'

global.debug = require('debug')('debug');
global.isDebug = false
if(process.env.DEBUG === 'debug'){
    console.info("========= 调试模式 =========")
    global.isDebug = true
}

global.U = require('./utils/index.js')

global.C = U.loadConfig()


let _redis = require('./redis/index.js')
global.redis = new _redis()

/* app init */
require("./app_init.js")


/* ejs 模板 */
render(app, {
  root: pathFn.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache:  isDebug ? false : true,
  debug: false
});

/* session */
app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redisStore({
      all:'127.0.0.1:6379',
      db:1
  })
}));

//serve files from ./public:
app.use(serve(__dirname + '/public'),{
    maxage:7*24*60*60*1000
});

//serve files from ./public:
app.use(serve(__dirname + '/markdown-r/assets'),{
    maxage:7*24*60*60*1000
});


var route = require('./routes/index')

const cors = require('@koa/cors');

// error handler
onerror(app)

//404
app.use( async (ctx,next)=>{
    await next();

    if( ctx.status === 404){ 
        console.log( /js\.map/i.test(ctx.path))
        if( /js\.map$/i.test(ctx.path)){
            ctx.body = "404"
            return
        }

        await ctx.render('404',{
            page:{},
            post:{},
            config:C
        })
    }
})

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())



// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use( async (ctx,next)=>{
    let ext = pathFn.extname(ctx.path)
    if( ['.png','.jpg','.gif'].indexOf(ext) !== -1){
        
        debug(ctx.path)
        //let real_path = pathFn.join(C.book_path,ctx.path)
        
        await send(ctx,ctx.path,{ root: C.book_path })

        return
    }
    else
        await next()
})

// routes
app.use(route.routes(), route.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
