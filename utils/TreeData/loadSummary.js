const fs = require("fs")
const yaml = require("js-yaml")
const pathFn = require("path")
const md5 = require("md5")
const getHashMap = require("./getHashMapFromSummaryData.js")

function _read(summary_path){
    let summaryStr = fs.readFileSync(summary_path,{encoding:"utf-8"})
    let summary_array = yaml.safeLoad(summaryStr)
    return summary_array
}

function is_yaml_file(_path){
    return pathFn.extname(_path) === '.yml'
}

/* 
 * 参数:
 * _path: 最上层的SUMMARY的目录
 * _partent : Object
 * */
function dfs(_path,_parent){
    let summary_path = _path

    
    if(!is_yaml_file(summary_path))
        summary_path += '/SUMMARY.yml'  //默认的目录

    if( !fs.existsSync( summary_path)){ //不存在
        return
    } 

    _parent.children = []

    let summary_array = _read(summary_path)
    if(!summary_array)
        return

    for( let item of summary_array){
        let {path,title,password,name} = item
        let real_path = pathFn.join(_path,path)

        let stat = fs.statSync(real_path)

        if(stat.isFile()) //是文件
        {
            let hash = md5(real_path)
            _parent.children.push({
                name:title || name,
                title:title || name,
                url:`/article/${hash}`,
                path:real_path,
                hash,
            })
        }
        else if( stat.isDirectory()){ //是目录
            var new_data = {
                name:title
            }

            dfs(real_path,new_data)

            if( new_data.children &&  new_data.children.length !== 0 )
                _parent.children.push(new_data)
        }
    }
}



/* 读取 yaml格式的 Array型的 总Summary 的总目录*/
/*  summary_path 书/blog的目录  */
function loadSummary(summary_path){

    let summary_array = _read(pathFn.join(summary_path,'SUMMARY.yml'))
    let hash_map = {}

    /* 遍历 */
    for( let i =0;i < summary_array.length;i++){
        let s = summary_array[i].path
        let catalog = { name:summary_array[i].name || '未知'}
        dfs(pathFn.join(summary_path,s),catalog)

        /* 设定hash map */
        
        let ret = getHashMap(catalog)
        Object.assign(hash_map,ret)



        summary_array[i].catalog = catalog
    }


    /* 存hash map */
    /* 手动设定about */
    hash_map['about'] = {
        title:'关于',
        hash:'about',
        path: pathFn.join(C.book_path,'readme.md')
    }
    redis.set_hash_2_map(hash_map)
    return summary_array
}
module.exports = loadSummary 
