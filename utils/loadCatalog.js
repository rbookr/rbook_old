//最多使用3级目录 级别,当前路径,当前目录下的所有的子目录,父亲
//name | 目录地址 
const readline = require('readline');
const path = require('path');
const fs = require('fs');
const md5 = require("md5")


const Parse_line = (line)=>{

    let regx = /^\ *[\*|-]\ /
    let level = line.match(regx)[0].length - 2

    let regx2 = /\[(.*)\]\((.*)\)/

    let title = line.match(regx2)[1]
    let path = line.match(regx2)[2]
    let hash = md5(path)
    let url = `/article/${hash}`

    return {level,path,title,hash,url}
}

const ReadLine = ()=>{
    return new Promise( (res,rej)=>{
    
        let lines = []
        let filepath = path.join(C.book_path, "SUMMARY.md")
        let input = fs.createReadStream(filepath)

        const rl = readline.createInterface({
            input: input
        });

        rl.on('line', (line) => {
            if( line.trim().length === 0)
                return
            lines.push( Parse_line(line))

        });
        rl.on('close', (line) => {
            res(lines)
        });

    })
}



var parent = root

var head = {
}


module.exports = function(){

    return ReadLine().then( d=>{
        /* 找到每一个元素的parentName */
        let parents = []
        for( let i = 0;i < d.length; i++){

            let { level,path,title }  =  d[i]
            if( level === 0){
                d[i].parent = null //最高级,无parent
                parents[0] = title
            }
            else {
                d[i].parent = parents[ level/4-1]
                parents[level/4] = title;
                //console.log(parents)
            }
        }
        return d
    })

}
