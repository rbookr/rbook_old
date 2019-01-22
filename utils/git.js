//初始化
const { exec } = require('child_process');

function execAsync(cmd,cwd){
    return new Promise( (res,rej)=>{
        exec(cmd,{
            cwd: cwd || C.book_path
        },(err,stdout,stderr)=>{
            if(err) rej(err)
            res(stdout)
        })
    }).catch( e=>{
        console.error("====== git 发生错误")
        console.error(e)
        throw(e)
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

const clone = async ()=> {
    let cmd = `git clone ${C.git_book_hub} ${C.book_path}`
    await execAsync(cmd,__dirname)
}


module.exports ={
    execAsync,
    git_init,
    last_commits,
    clone,
    pull_master
}
