const fs = require("fs")

const pathFn = require("path")
const Rmarkdown = require("../../Rmarkdown/forNode.js")
const testmd = fs.readFileSync('Rmarkdown/test2.md',{encoding:'utf-8'})
const _c = Rmarkdown.render(testmd)
module.exports = async (ctx,next)=>{

    // 渲染markdown
    let post  = {
        cover : "https://wallpapercave.com/wp/SmJpcB0.jpg",
        content: _c
    }


    await ctx.render('article',{
        page:{},
        post
    });

}
