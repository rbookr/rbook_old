const axios = require("axios")

function checkStatus (response) {
  if (response && (response.status === 200 )) {
    return response.data    //登录成功
  }
  return { status: -1, message: '登录失败' }
}

function checkCode(res){
    if(res.status !==0)
        throw(res)
    return res
}

module.exports = async ({password,username,site=C.siteName || 'noSet'})=>{
    return axios({
      method: 'post',
      url:C.loginServer || 'http://localhost:3033/login',
      data: {password,username,site},
      timeout: 3000,
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then( res=>{
        return checkCode(res)
    })
}

