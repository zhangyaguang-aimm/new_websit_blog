const jwt = require('jsonwebtoken')

let secret = 'jwttoken'


class Jwt {
    constructor(data,token){
        this.data = data
        this.token = token
    }
    // 生成token
    createToken(){
        let token = jwt.sign(this.data, secret, {
            expiresIn: '1h',
            issuer: 'baozi'
        })
        return token
    }
    // 验证token
    verifyToken(){
        try{
            let result = jwt.verify(this.token, secret)
            return result
        }catch(err){
            return null
        }
    }
}

module.exports = Jwt