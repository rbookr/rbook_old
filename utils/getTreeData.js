/* 得到blog的TreeData */
const readline = require('readline');
const pathFn = require('path');
const fs = require('fs');
const md5 = require("md5")

var treeData = {
    name: "Group",
    children: [
        {
            name: "Sub Group",
            children: [{ name: "Item" }, { name: "Item" }]
        },
        { name: "Item" },
        {name:'next',  children: [
            {
                name: "Sub Group",
                children: [{ name: "Item" }, { name: "Item" }]
            },
            { name: "Item" }]}
    ]
};




const Parse_line = (line)=>{

    let regx = /^\ *[\*|-]\ /
    let level = line.match(regx)[0].length - 2

    let regx2 = /\[(.*)\]\((.*)\)/

    let title = line.match(regx2)[1]
    let path = line.match(regx2)[2]
    let hash = md5(path)

    let password = false

    if(/password$/.test(line))
        password = true

    return {level,path,title,hash,password}
}

const ReadLine = (_path)=>{
    return new Promise( (res,rej)=>{
    
        let lines = []
        let input = fs.createReadStream(_path)

        const rl = readline.createInterface({
            input: input
        });

        rl.on('line', (line) => {
            if( line.trim().length === 0) //空行
                return
            lines.push( Parse_line(line))

        });
        rl.on('close', (line) => {
            res(lines)
        });

    })
}


async function main(_path,_parent){
    //读取当前路径上的SUMMARY
    let summary_path = pathFn.join(_path,'SUMMARY.md')

    //如果不存在
    if(! fs.existsSync(summary_path))
        return
    _parent.children = []
    var a = await ReadLine(summary_path)

    for( let item of a){
        let{path,title} = item
        let real_path = pathFn.join(_path,path)
        let relative = pathFn.relative(C.book_path,real_path)

        let stat = fs.statSync(real_path)

        if(stat.isFile()) //是文件
        {
            _parent.children.push({
                name:title,
                title:title,
                path: relative,
                hash: md5(relative)
            })
        }
        if( stat.isDirectory()){ //是目录
            var new_data = {
                name:title
            }
            await main(real_path,new_data)

            if( new_data.children &&  new_data.children.length !== 0 )
                _parent.children.push(new_data)
        }
    }
}


module.exports = async  ()=>{
    var Data = {}
    await main(C.book_path,Data)
    //to hash_2_map
    let  hash_2_map = {}
    

    function dfs_catalog(catalog){
        if(catalog.children && catalog.children.length !== 0 ){

            for( let item of catalog.children){
                dfs_catalog(item)
            }

        }
        else { //是一个文件
            //debug( catalog)
            hash_2_map[catalog.hash] = {
                title: catalog.title,
                path:catalog.path
            }
        }
    }
    dfs_catalog(Data)

    return {
        Catalog:Data,
        hash_2_map
    }
}

