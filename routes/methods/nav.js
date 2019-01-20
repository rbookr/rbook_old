const fs = require("fs")
const pathFn = require("path")
const yaml = require("js-yaml")
/* 参数: path */
module.exports = async (ctx,next)=>{
    let {name} = ctx.request.body

    debug(ctx.request.body)

    if (name=='/'  || name ==undefined || name == '' ){
        ctx.body = nav
    }
    else
        ctx.body = subnav[name]
}
