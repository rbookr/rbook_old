/* 加载配置 */

const yaml = require("js-yaml")
const fs = require("fs")
const path = require("path")
const configs = ['site_config.yml','site_config.defalut.yml']

module.exports  = function(){

    for( let _p of configs){
        let _cp =  path.join(__dirname,'..',_p)
        if( fs.existsSync(_cp)){
            let config = yaml.safeLoad( fs.readFileSync(_cp,{encoding:'utf-8'}))
            console.log(`======= 加载配置:${_cp} 成功! =========`)
            return config
        }
    }
}
