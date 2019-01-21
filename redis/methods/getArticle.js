/* 得到文章 */
const pathFn = require("path")
module.exports = async function(_id){
    let head = await this.redis.get(this.headKey(_id))
    
    let content = await this.redis.get(this.contentKey(_id))

    //加1
    let cnt = await this.redis.incr(this.cntKey(_id))


    if( head == null || content == null){

        let hash_2_path = await this.hash_2_path()
        let _path = pathFn.join(C.book_path , hash_2_path[_id])
        let {head,content} = await U.parseArticle(_path)

        //content = U.imagePath_translate(content,'/'+_path)

        await this.redis.set(this.headKey(_id),head,'EX',C.redis_key_ttl)
        await this.redis.set(this.contentKey(_id),content,'Ex',C.redis_key_ttl)
        return {head:JSON.parse(head || '{}'),content,cnt}
    }

    return {head:JSON.parse(head || '{}'),content,cnt}
}
