/* 所有index.js的操作 */
var Redis = require('ioredis');
const fs = require("fs")
const pathFn = require("path")
var keyName = require("./key.js")

// todo 给shortid 设计产生的模式
 
var debug  = global.debug || console.log

function myredis(){
    this.redis = new Redis(C.redis || '//localhost',
        {lazyConnect: true}
    );

    this.redis.connect(()=>{
        debug('redis connect success!')
    })
}

const keysName = require("./key.js")

for(let  key in keysName){
    myredis.prototype[key] = keysName[key]
}
const methods = fs.readdirSync(pathFn.join(__dirname,'methods'))

for( let method of methods ){
    let name = pathFn.basename(method,'.js')
    myredis.prototype[name] = require( pathFn.join(__dirname,'methods',method))
}


module.exports = myredis
