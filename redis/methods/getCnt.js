module.exports  = function(_id){
   return this.redis.get(this.cntKey(_id))
}
