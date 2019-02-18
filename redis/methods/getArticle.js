/* 得到文章 */
const pathFn = require("path")
module.exports = async function(_id){
    let head = await this.redis.get(this.headKey(_id))
    
    let content = await this.redis.get(this.contentKey(_id))

    //加1
    let cnt = await this.redis.incr(this.cntKey(_id))


    if( head == null || content == null){

        let hash_2_map = await this.Get('hash_2_map')

        let _file_path = hash_2_map[_id].path

        if( pathFn.extname(_file_path) !== '.md')
            _file_path += '.md'

        let _path =  _file_path
        let {head,content} = await U.parseArticle(_path)

        let resolve_path = pathFn.relative(C.book_path,_path)
        resolve_path = pathFn.dirname(resolve_path)

        content = U.imagePath_translate(content,'/'+resolve_path)

        await this.redis.set(this.headKey(_id),head,'EX',C.redis_key_ttl)
        await this.redis.set(this.contentKey(_id),content,'EX',C.redis_key_ttl)
        return {head:JSON.parse(head || '{}'),content,cnt}
    }

    return {head:JSON.parse(head || '{}'),content,cnt}
}
