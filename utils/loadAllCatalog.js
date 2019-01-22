/* 加载总的catalog */

const fs = require("fs")
const pathFn = require("path")
const yaml = require("js-yaml")
const loadCatalog = require("./loadCatalog.js")

module.exports = async function(book_path){

    book_path = book_path || C.book_path
    let nav = yaml.safeLoad( fs.readFileSync(book_path+'/nav.yaml',{encoding:'utf-8'}))

    var Catalog = []

    for( let {name,path} of nav){
        var real_path = pathFn.join(book_path,path)
        var cata = await loadCatalog(real_path)

        Catalog.push({
            name,
            list:cata
        })
    }


    /* set hash_2_map */
    var hash_2_map = {}

    for(let idx = 0;idx < Catalog.length;idx++ ){

        let item  = Catalog[idx]

        for( let i = 0; i < item.list.length ;i++){

            item.list[i].index = i;
            let _hash = item.list[i].hash

            hash_2_map[_hash]  = {
                path: item.list[i].path,
                subCatalogName: item.name,
                subCatalogIdx : idx,
                index: i,
                title: item.list[i].title
            }
        }

    }

    hash_2_map['about'] = {
        path: 'readme'
    }


    await redis.Set(`key-Catalog`,Catalog)
    await redis.Set(`hash_2_map`,hash_2_map)
    debug("========= 加载catalog数据 完成 !!!")
}
