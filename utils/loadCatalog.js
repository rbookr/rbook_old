const readline = require('readline');
const path = require('path');
const fs = require('fs');
const md5 = require("md5")


const Parse_line = (line)=>{

    let regx = /^\ *[\*|-]\ /
    let level = line.match(regx)[0].length - 2

    let regx2 = /\[(.*)\]\((.*)\)/

    let title,path,hash,url

    try {
        title = line.match(regx2)[1]
        path = line.match(regx2)[2]
        hash = md5(path)
        url = `/article/${hash}`
    }
    catch(e){
        console.error(e)
        console.error(line)
    }

    let password = false

    if(/password$/.test(line))
        password = true

    return {level,path,title,hash,url,password}
}

const ReadLine = (_path)=>{
    return new Promise( (res,rej)=>{
    
        let lines = []
        let filepath = path.join(_path)
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


module.exports = function(_path){

    return ReadLine(_path).then( d=>{
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
