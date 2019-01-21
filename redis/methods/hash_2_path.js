
module.exports = function(){
    return this.redis.get('hash_2_path').then( d=>{
        return JSON.parse(d)
    })
}
