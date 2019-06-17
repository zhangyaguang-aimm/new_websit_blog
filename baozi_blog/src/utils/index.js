
export const getUserInfo = () => {
    return new Promise((resolve,reject) => {
        if(sessionStorage.getItem('token')){
            resolve([{username: 'admin',nickname: '管理员'}])
        }else{
            resolve(null)
        }
    })
}