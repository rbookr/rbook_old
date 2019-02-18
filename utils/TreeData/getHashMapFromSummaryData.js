/*
 * 从递归的目录结构中得到 HashMap 数据
 * */


module.exports = function(treeData){

    let hash_map = {}
    function dfs(treeData){
        if( !treeData.children || ( treeData.children &&  treeData.children.length == 0 )){
            let {hash,path,name,title} = treeData
            hash_map[hash] = {hash,path,title:name || title}
            return 
        }

        for( let item of treeData.children ){
            dfs(item)
        }

    }

    dfs(treeData)

    return hash_map
}
