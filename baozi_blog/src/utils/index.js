
export const getUserInfo = ($axios) => {
    return new Promise((resolve,reject) => {
        var token = localStorage.getItem('token')
        if(token){
            $axios({
                url: '/user/userinfo',
                method: 'get',
                headers: {token: token}
            }).then(data => {
                if(data && data.data.code == 1){
                    resolve(1)
                }else{
                    resolve(null)
                }
            })
            
        }else{
            resolve(null)
        }
    })
}