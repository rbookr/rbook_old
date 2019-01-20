const fs = require("fs")

module.exports = function(_path){
    return new Promise( (res,rej)=>{
        fs.readFile(_path,{encoding:'utf-8'},(err,data)=>{
            if(err) 
                rej(err)
            else
                res(data)
        })
    })
}
