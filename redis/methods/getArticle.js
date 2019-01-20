/* 得到文章 */
const pathFn = require("path")
module.exports = async function(_id){
    let head = await this.redis.get(this.headKey(_id))
    
    let content = await this.redis.get(this.contentKey(_id))

    //加1
    let cnt = await this.redis.incr(this.cntKey(_id))

    let _path = pathFn.relative(C.book_path , pathFn.dirname(md5_map_path[_id]))

    if( head == null || content == null){

        let {head,content} = await U.parseArticle(md5_map_path[_id])

        content = U.imagePath_translate(content,'/'+_path)
        await this.redis.set(this.headKey(_id),head)
        await this.redis.set(this.contentKey(_id),content)

        return {head:JSON.parse(head || '{}'),content,cnt}
    }

    return {head:JSON.parse(head || '{}'),content,cnt}
}
