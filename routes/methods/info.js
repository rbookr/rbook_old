var git  = require("../../utils/git.js")
module.exports = async (ctx,next)=>{

    let info = ctx.request.body.info || 'last_commits'
    switch(info){
        case 'last_commits':
            let commits = await redis.last_commits()
            if(commits !==null){
                await ctx.render('commits',{commits})
                break;
            }
            let o = await git.last_commits()
            commits = o.trim().split('\n')
            redis.last_commits(commits)
            await ctx.render('commits',{commits})
            break;
        default:break;

    }
}
