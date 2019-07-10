
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


### mongoose关联数据查询的问题

由于blog表涉及到tag和user表的关联，标签这个是数组类型的，最开始的处理方式，在本地也获取到了正确的列表，发布到服务器之后却出现了问题，先记录下解决的方式，后续看下是否有更优化的处理方式.

```
// database/model/blog.js
const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    },
    author: Schema.Types.ObjectId,
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tags'
    }], // tags是数组格式的，关联tags
    isShow: {
        type: Boolean,
        default: true
    },
    modeifyAt: {
        type: Date,
        default: Date.now()
    },
    clickNum: {
        type: Number,
        default: 0
    },
    imgUrl: String,
    power: {
        type: Number,
        default: 0
    },
    isTop: {
        type: Boolean,
        default: false
    }
})

// controller/blog.js获取blog列表
BlogModel.aggregate([
    {
        // 单个关联
        $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'userinfo'
        }
    },
    {
        // 单个关联
        $lookup: {
            from: 'tags',
            localField: 'tags',
            foreignField: '_id',
            as: 'tagList'
        }
    },
    {
        $match: {
            $or: [
                {title: {$regex: searchKey,$options: '$i'}},
            ]
        },
    },
    {$sort: {createAt: -1}},
    {$skip: (pageNum-1)*pageSize},
    {$limit: pageSize},
])


```
最开是按照上面写的来的，在本地运行的时候没什么问题，能够正常获取到`tagList`，然后部署到服务器上之后tagList显示的一直是空，但是tag里面已经存储了tag的id，本以为是mongodb版本太低的原因，当时用的是3.2.0后来更新之后还是不行，最终是通过另外一种方式解决的，下面是解决方案，后续会找下优化的方式，是不是代码写的有问题,感觉下面的处理代码的方式不太好

```
// controller/blog.js
let resultTemp = await BlogModel.aggregate([
    {
        // 单个关联
        $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'userinfo'
        }
    },
    {
        $match: {
            $or: [
                {title: {$regex: searchKey,$options: '$i'}},
            ]
        },
    },
    {$sort: {createAt: -1}},
    {$skip: (pageNum-1)*pageSize},
    {$limit: pageSize},
])

// 数组类型关联
let result = await (function(){
    return new Promise(resovlve => {
        // 在这里在关联下tags获取tags列表,这样处理在blogmodel中tags必须{type: mongoose.Schema.Types.ObjectId,ref:'Tags'}
        BlogModel.populate(resultTemp, 'tags', function(err,res){
            resovlve(res)
        })
    })
})()


```
目前已经能在服务器上正常运行，网上给出的方案就是第一种，但是不清楚为什么在服务上不能正常运行，后续会继续查找方案，解决后会更新在文档上.



### 设置超时时间

```
// public/utils/time-out.js

async function timeOut(ctx, next) {
    var tmr = null;
    const timeout = 5000;//设置超时时间
    // 这里是Promise.race数组中的promise对象谁先执行完就走谁
    await Promise.race([
        new Promise(function (resolve, reject) {
            tmr = setTimeout(function () {
                var e = new Error('Request timeout');
                e.status = 408;
                reject(e);
            }, timeout);
        }),
        new Promise(function (resolve, reject) {
            //使用一个闭包来执行下面的中间件
            (async function () {
                await next();
                clearTimeout(tmr);
                resolve();
            })();
        })
    ])
}

module.exports = timeOut

// app.js
app.use(TimeOut)


```

