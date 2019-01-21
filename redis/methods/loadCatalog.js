/* 加载目录 */

module.exports = async function(){
    let key = `key-Catalog`
    let Catalog = await this.redis.get(key)
    if( !Catalog ){
        let hash_2_path = {}
        await U.loadCatalog().then( d=>{

            Catalog = d


            for( let item of d){
                let {hash,path} = item
                hash_2_path[hash] = path +'.md'
            }

            hash_2_path['readme'] = 'readme.md'
            hash_2_path['about'] = 'about.md'

        })

        await this.redis.set(`hash_2_path`,JSON.stringify(hash_2_path))
        await this.redis.set(key,JSON.stringify(Catalog),'EX',C.redis_key_ttl)
    }
    else
        Catalog = JSON.parse(Catalog)

    return Catalog
}
