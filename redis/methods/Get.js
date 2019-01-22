module.exports = async function(key){
    return this.redis.get(key).then( d=>{
        if(!d) return d
        return JSON.parse(d)
    })

}
