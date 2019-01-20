const fs = require("fs")

const pathFn = require("path")
const Rmarkdown = require("../../Rmarkdown/forNode.js")
const testmd = fs.readFileSync('Rmarkdown/test2.md',{encoding:'utf-8'})
const _c = Rmarkdown.render(testmd)

function readFile (_path){
    return new Promise( (res,rej)=>{
        fs.readFile(_path,{encoding:'utf-8'},(err,data)=>{
            if(err) 
                rej(err)
            else
                res(data)
        })
    })
}
module.exports = async (ctx,next)=>{

    // 渲染markdown
    let post  = {
        cover : "https://ww1.sinaimg.cn/large/007i4MEmgy1fzdgx5suh8j315o0dw4qp.jpg",
        content: _c
    }

    let hash  = ctx.params.hash

    let _file_path = hash_2_path[hash]
    
    let file_path = pathFn.join(C.book_path,_file_path+'.md')
    
    let content = await readFile(file_path)

    post.content = Rmarkdown.render(content)


    await ctx.render('article',{
        page:{},
        post
    });

}
