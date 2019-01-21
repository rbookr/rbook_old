const pathFn = require("path")
const Rmarkdown = require("../Rmarkdown/forNode.js")
const fs = require("fs")
const md5 = require("md5")
const yaml = require("js-yaml")
const loadConfig = require("./loadConfig.js")
const loadCatalog = require("./loadCatalog.js")
const readFile = require("./readFile.js")

global.nav = {} // if nav[key] == string   subnav[key] 就是 对应的obj
global.subnav = {}  // subnav[key] = md5_str  md5_map_path[ md5_str] 就是对应的路径
global.flatnav = {}
global.md5_map_path  = {}

/* 生成nav */


function flatOBJ(obj){
    let flat = {}

    for( let key in obj){
        if( typeof( obj[key]) == 'string'){
            flat[key] = obj[key]
        }
        else{
            let t = flatOBJ( obj[key])
            flat = Object.assign(flat,t)
        }
    }
    return flat
}

function tran_subnav_path_md5 (obj,subnav_path){
    for( let key in obj){
        if( typeof(obj[key]) == 'string'){
            let real_path = pathFn.join(subnav_path,'..',obj[key]+'.md')
            let m = md5(real_path)
            md5_map_path[m] = real_path
            obj[key] = m
        }
        else {
            tran_subnav_path_md5(obj[key],subnav_path)
        }
    }
}

function genNav(){
    nav = {}

    //todo 删除所有的redis上的文章缓存
    
    let real_path = pathFn.join(C.book_path,'nav.yaml')

    if(!fs.existsSync(real_path)){
        return 
    }
    nav = yaml.safeLoad( fs.readFileSync(real_path))

    flatnav = flatOBJ(nav)
    debug(nav)
    debug(flatnav)
}

/* 生成subnav */

function genSubNav(){
    subnav = {}
    md5_map_path = {}
    for( let key in flatnav){

        let subnav_path  = pathFn.join(C.book_path,flatnav[key],'nav.yaml')
        subnav[flatnav[key]] =  yaml.safeLoad( fs.readFileSync(subnav_path))
        
        tran_subnav_path_md5(subnav[flatnav[key]],subnav_path)
        
    }
    //debug(md5_map_path)
    //debug(nav)
    //debug(subnav)
    //特别的生成 indexNav
    if( subnav.index !== undefined){
        debug(subnav.index)
        throw('普通subNav 不能使用index 这个名字!!')
        process.exit(1)
    }

    let indexNav = fs.readFileSync( pathFn.join(C.book_path,'indexNav.yaml'),{encoding:'utf-8'})

    subnav['index'] = yaml.safeLoad(indexNav)
    md5_map_path['index'] = pathFn.join(C.book_path,'readme.md')
}

/* img路径 */

/* 转换imagepath */

function imagePath_translate(html,path){
    let cur_path = path || '/'


    if(cur_path.charAt(cur_path.length-1) !== '/') //最后一个字符
        cur_path += '/'

    let image_reg = /<img src="([\S\s]+?)"/g

    return html.replace(image_reg,function($1,$2){
        let rep_str = ""

        if($2.substring(0,2)=='./'){
            rep_str = cur_path + $2.slice(2)
        }
        else if($2.substring(0,3)=='/./')
            $2 = $2.slice(1)
        else if($2.substring(0,7) == "http://" || $2.substring(0,8) == "https://")
            rep_str =$2
        else if($2.charAt(0) === '/'){
            rep_str =$2
        }
        else
            rep_str = cur_path + $2

        return `<img src="${rep_str}"`
    })
}



function ensureFile(_path){
    return fs.existsSync(_path)
}


const rFrontMatter = /^(-{3,}|;{3,})[\n,\r]{1,2}([\s\S]+?)[\n,\r]{1,2}\1(?:$|[\n,\r]{1,2}([\s\S]*)$)/;
/* 分割文件 YAML信息头 和 真实内容*/
function split(str){
    if (typeof str !== 'string') throw new TypeError('str is required!');

    if (rFrontMatter.test(str)) return splitOld(str);

    return {content: str};
}

function splitOld(str){
    var match = str.match(rFrontMatter);

    return {
        data: match[2],
        content: match[3] || '',
        separator: match[1],
        prefixSeparator: true
    };
}

async function parseArticle(_path){
    let exists = ensureFile(_path)
    if(!exists){
        throw('文件不存在!')
        return
    }
    let con = await readFile(_path)
    let {data:head,content} = split(con)
    return {
        head:JSON.stringify( yaml.safeLoad(head)),
        content:Rmarkdown.render(content)
    }
}

module.exports = {
    genNav:genNav,
    genSubNav:genSubNav,
    imagePath_translate,
    parseArticle,
    loadConfig,
    loadCatalog,
    readFile
}
