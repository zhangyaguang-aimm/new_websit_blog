
export const getUserInfo = ($axios) => {
    return new Promise((resolve,reject) => {
        var token = localStorage.getItem('token')
        if(token){
            $axios({
                url: '/user/userinfo',
                method: 'get',
                headers: {token: token},
                params: {
                    _id: JSON.parse(localStorage.getItem('userinfo'))._id
                }
            }).then(data => {
                if(data && data.data.code == 1){
                    resolve(data.data)
                }else{
                    resolve(null)
                }
            })
            
        }else{
            resolve(null)
        }
    })
}