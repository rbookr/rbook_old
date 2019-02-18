module.exports = function(hash_map){
    return this.redis.set('hash_2_map',JSON.stringify(hash_map))
}
