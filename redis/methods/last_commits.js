module.exports = async function(commits){

    if( commits == undefined){
        let res = await this.redis.get(this.last_commitsKey())
        if( res == null ) return null
        return JSON.parse(res)
    }
    else{
        this.redis.set(this.last_commitsKey(),JSON.stringify(commits))
    }
}
