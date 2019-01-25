/* 加载总的catalog */

const fs = require("fs")
const pathFn = require("path")
const yaml = require("js-yaml")

module.exports = async function(book_path){


    book_path = book_path || C.book_path
    /* 进行git */
    if( !fs.existsSync( book_path)){ //不存在
        await U.git.clone()
        debug("=========== clone 书本的仓库成功 !==========")
    }
    else {
        await U.git.pull_master()
        debug("=========== 更新 书本的仓库成功 !==========")
    }


    let result = await U[model]()
    let {Catalog,hash_2_map} = result
    debug(Catalog)
    debug("+++++++++++++++++++++")
    debug(hash_2_map)

    await redis.Set(`key-Catalog`,Catalog)
    await redis.Set(`hash_2_map`,hash_2_map)
    debug("========= 加载catalog数据 完成 !!!")
}
