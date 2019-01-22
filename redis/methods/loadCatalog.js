/* 加载目录 */

module.exports = async function(){
    let key = `key-Catalog`
    let Catalog = await this.redis.get(key)
    if( !Catalog ){
        let hash_2_map = {}
        await U.loadCatalog().then( d=>{

            Catalog = d


            for(let i = 0 ;i<d.length;i++){
                let {hash,path,title} = d[i]
                hash_2_map[hash] = {
                    title,
                    index:i,
                    path:path +'.md'
                }
            }

            hash_2_map['readme'] = {
                path:'readme.md'
            }
            hash_2_map['about'] = {
                path: 'about.md'
            }

        })

        await this.redis.set(`hash_2_map`,JSON.stringify(hash_2_map))
        await this.redis.set(key,JSON.stringify(Catalog),'EX',C.redis_key_ttl)
    }
    else
        Catalog = JSON.parse(Catalog)

    return Catalog
}
