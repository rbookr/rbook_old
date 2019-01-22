/* 设定值 */
module.exports = function(key,OBJ){
    return this.redis.set(key,JSON.stringify(OBJ))
}
