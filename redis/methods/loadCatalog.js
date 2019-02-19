/* 加载目录 */

module.exports = async function(update=false){
    let key = `key-Catalog`

    if( update){
        let summary_array = U.loadSummary(C.book_path)
        return this.Set(key,summary_array)
    }
    return this.Get(key)
}
