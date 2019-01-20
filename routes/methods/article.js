const Rmarkdown = require("Rmarkdown")
const fs = require("fs")
const pathFn = require("path")
module.exports = async (ctx,next)=>{

    // 渲染markdown
    let post  = {
        cover : "https://wallpapercave.com/wp/SmJpcB0.jpg",
        content: 'hello world!'
    }


    await ctx.render('article',{
        page:{},
        post
    });

}
