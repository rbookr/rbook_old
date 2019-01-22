
module.exports = function(){
    return this.redis.get('hash_2_map').then( d=>{
        return JSON.parse(d)
    })
}
