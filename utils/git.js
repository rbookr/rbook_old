//初始化
const { exec } = require('child_process');

function execAsync(cmd){
    return new Promise( (res,rej)=>{
        exec(cmd,{
            cwd:C.book_path
        },(err,stdout,stderr)=>{
            if(err) rej(err)
            res(stdout)
        })
    })
}

let init_cmds =['git config --global core.pager cat']
const git_init = async ()=>{

    for( let cmd of init_cmds){
        await execAsync(cmd)
    }
}

const last_commits= async (n=10)=>{
    let out = await execAsync(`git log --no-merges --pretty="[%an]==== %s ===[%cr]" -n ${n}`)
    return out
}

const pull_master = async ()=>{

    let out = await execAsync(`git pull origin master`)
    return out
}

module.exports ={
    execAsync,
    git_init,
    last_commits
}
