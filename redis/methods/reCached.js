module.exports  = async function(){
    //得到key
    let keys = this.cacheKey()
    let rmkey = []
    for(let key of keys){
        let l = await this.redis.keys(key)
        rmkey = rmkey.concat(l)
    }
    if( rmkey.length ==0 )return
    //删除key
    this.redis.del(rmkey)
}
