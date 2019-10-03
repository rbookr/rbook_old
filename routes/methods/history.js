const fs = require("fs")
const pathFn = require("path")
const {execSync} = require("child_process")

const regexp = /\[\[\[([\s\S]*?)\]\]\]/g
module.exports = async (ctx,next)=>{
  /* cache */

  let history = await redis.redis.get('history')
  let change_files = await redis.redis.get('change_files')
  if( history ==null || change_files == null) {

      var stdout  = execSync(`git --no-pager log --name-only -n 20 --format="[[[%cr|%B"]]]`,{
        cwd:C.book_path,
        encoding:'utf-8'
      });

      history = []
      stdout.replace(regexp, function(a,b){
        history.push(
          b.split("|")
        )
      })

      change_files = []
      for(let i = 0;i<20;i++){
        change_files.push(
          execSync(`git --no-pager log --format="% " --name-status -n 1 --skip=${i}`,{
            cwd:C.book_path,
            encoding:'utf-8'
          }).trim()
        )
      }

    await redis.redis.set('history',JSON.stringify(history),'EX',C.redis_key_ttl)
    await redis.redis.set('change_files',JSON.stringify(change_files),'EX',C.redis_key_ttl)
  }
  else if( change_files !=null && history != null){
    change_files = JSON.parse(change_files)
    history = JSON.parse(history)
  }

  await ctx.render('history',{
    page:{},
    post:{
      head:{
        title:'历史记录'
      }
    },
    history,
    change_files
  });

}
