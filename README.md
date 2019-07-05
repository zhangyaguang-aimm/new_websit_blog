
> 这篇文章主要记录的是后台相关的知识，就想着做个完整的系统，所以就打算把之前写的博客，移到自己新建的这个系统上，博客展示，后台管理，后端的数据存储，上线发布知识.

### 主要技术栈

- node 
- vue
- mongoose

这里后台的存储是用`mongodb`主要原因是这个稍微熟悉些，有熟悉mysql的也可以直接使用mysql来存储数据，mongodb不熟悉的同学可以查看下面的链接，稍微熟悉下api,[参考链接](http://mongoosejs.net/)

### 前端页面

页面的话，直接使用vue-cli生成项目，安装相应依赖包，运行项目，该项目中安装的依赖包包含如下:
- vuex(数据管理)
- element-ui(ui库)
- axios(接口请求)
- sass(css预处理器)

这篇文章只介绍相关的知识点，具体的实现代码可以看项目源码.


### 登录验证

> 既然涉及到博客管理后台，就肯定有登录验证的问题，使用的是token去验证权限。

- 前端页面

前端的路由守护，需要使用`router.beforeEach`方法，对每一个路由去进行判断，验证该路由是否需要登录权限，如果需要登录权限的话，就通过存储在本地的`token`去获取用户信息，得到用户信息，继续当前的路由跳转，不能的话就跳转到登录页去登录。这里的`token`是登录的时候后台给返回的，后台设置过期时间，登录后保存到本地`session`中
```js
// router/index.js

router.beforeEach((to, from, next) => {
    // 匹配路由，是否需要登录验证(在注册路由的时候定义)
  if(to.matched.some(record => record.meta.requireAuthor)){
    store.dispatch('getUser').then(data => {
      console.log(data)
      if(data && data.length > 0){
        next()
      }else{
        next('/login')
      }
    }).catch(err => {
      next('/login')
    })

  }
  next()
})

```

- 后端代码

```js

// jwt.js 创建和验证token
// 这里是用的最简单的一种生成方法,具体更严格的可以去看npm上查看
const jwt = require('jsonwebtoken')

let secret = 'jwttoken'


class Jwt {
    constructor(data,token){
        // data是前端传过来的数据信息
        this.data = data
        this.token = token
    }
    // 生成token
    createToken(){
        let token = jwt.sign(this.data, secret, {
            expiresIn: '1h', // 有效时间
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

// user.js

// 登录接口的时候创建token
let token = new jwtClass({username: req.username}).createToken()

// 获取用户信息的时候验证token
let resultToken = new jwtClass('',token).verifyToken()

```




#### 用户密码加密

使用的是bcrypt对密码进行加密和验证，注册用户的时候对密码进行加密，登录的时候去验证密码是否正确。


```
// 注册
static async registerUser(ctx){
    let req = ctx.request.body
    let result = await UserModel.findOne({'username': req.username})
    if(result){
        ctx.body = new ErrorResModel('用户名已存在')
        return
    }

    // 密码加密
    let password = req.password
    // hash是对密码进行加密处理生成一个hash值，这里的password是输入的密码，10是曼哈希轮数，支持异步处理，并把生成的hash值作为密码存到数据库
    let hashPassword = await bcrypt.hash(password,10)

    let newUser = new UserModel({
        username: req.username,
        password: hashPassword,
        power: req.username == 'admin' ? 10 : 1,
        modifyAt: req.modifyAt || '',
        email: req.email || '',
        telphone: req.telphone || '',
        realName: req.realName || ''
    })
    await newUser.save()
    let token = new jwtClass({username: req.username}).createToken()
    ctx.body = new SuccessResModel({
        token: token,
        userinfo: {username: req.username}
    },'注册成功')
}

// 登录
static async loginUser(ctx){
    let req = ctx.request.body

    let result = await UserModel.findOne({'username': req.username})
    // 比较输入的密码和数据库存储的密码是否一致，返回false不一致，返回true一致
    let flag = await bcrypt.compare(req.password,result.password)
    if(!flag){
        // 验证不通过
        ctx.body = new ErrorResModel('账号密码不正确')
        return
    }
    if(result){
        let token = new jwtClass({username: req.username}).createToken()
        ctx.body = new SuccessResModel({
            token: token,
            userinfo: result
        }, '登录成功')
        return
    }
    ctx.body = new ErrorResModel('账号密码不正确')
    
}

```






