/* 
 *
 * cnt_id       文章访问次数
 * head_id      文章的信息头
 * content_id   文章的内容
 *
 * visited: 总体访问次数
 * update_cnt
 * last_10_commith
 * */
module.exports ={
    cntKey(id){
        return `cnt_${id}`
    },
    headKey(id){
        return `head_${id}`
    },
    contentKey(id){
        return `content_${id}`
    },
    last_commitsKey(){
        return 'last_10_commits'
    },
    cacheKey(){
        return ['head_*','content_*','last_10_commits']
    }

}
