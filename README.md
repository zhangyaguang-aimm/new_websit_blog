


# 撸了一个自己的个人博客


一直是想写一个自己的博客，最近有点时间，花费了几天就撸了一个，雏形已经有了，后续完善内容，优化功能，有很多地方还没来的及做处理，后续继续优化。自己能力有限，有些地方处理的不好，希望大家能够给予指正，以后自己的博客也会同步到这个网站上，下面进入正题。

[github地址](https://github.com/dragonnahs/new_websit_blog)
[网站地址](http://blog.baozinews.cn)

 ## 前端页面的文档

页面的话，直接使用vue-cli生成项目，安装相应依赖包，运行项目，该项目中安装的依赖包包含如下:
- vuex(数据管理)
- element-ui(ui库)
- axios(接口请求)
- sass(css预处理器)

### 使用步骤

```
// 克隆项目
git clone git@github.com:dragonnahs/new_websit_blog.git

// 进入前端页面目录
cd baozi_blog

// 安装依赖
npm install 

// 运行项目
npm run dev

// 打包项目
npm run build

```


这里没有一步步讲实现，主要的地方大致说下，怎么实现的，挺简单的，可以先clone下来运行一遍试下，依赖于后台接口，所以尽量吧后台先跑起来。
下面主要记录一些写代码过程中一些技术点。

#### markdown格式解析和高亮

需要用到的库`marked`和`highlight.js`这两个，在博客详情页面使用，

```
// tempalte(v-highlight时后续加的自定义指令，下面会说)
<div class="markdown" v-html="compiledMarkdown" v-highlight></div>


// script

// 引入和初始化
let marked = require('marked')
let hljs = require('highlight.js')
import 'highlight.js/styles/default.css'
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {    
            return hljs.highlight(lang, code, true).value;
        } else {
            return hljs.highlightAuto(code).value;
        }
    }
})


export default{
    data () {
        return {
            blogInfo: {}
        }
    },
    computed: {
        // 解析代码
        compiledMarkdown(){
            return marked(this.blogInfo.content || '', {
                sanitize: true
            })
        }
    }
}
// 到这一步已经能够在页面看到解析完成之后的内容了，但是没有高亮样式，原因是vue-router在切换路由的时候会移除hight的事件，解决办法是自定义一个指令重新给代码加上对应的类名，实现代码高亮，具体代码如下

// main.js
let hljs = require('highlight.js')
// 自定义代码高亮指令
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

// 到此已经完美的解决了markdown的解析以及代码的高亮问题。

```


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
### 评论功能

最开始用的是畅言的评论，后来改成自己写的评论了，主要原因是使用畅言需要加载很多外部文件，可以看下network里面加载了很多东西，同时我对评论的功能没有太高的要求，因此就自己随便写了个简单的评论留言功能，但是还是要记录下如何实现畅言的引入。


> 这里是做了个单独的组件出来

```
<template>
    <div id="SOHUCS" sid="请将此处替换为配置SourceID的语句"></div>
</template>
<script>
export default {
    mounted () {
        window.changyan = undefined;
        window.cyan = undefined;
        this.loadScript('https://changyan.sohu.com/upload/changyan.js',()=>{
            window.changyan.api.config({
                appid: '###', // 此处换成你的畅言应用的appid,
                conf: '####', // 此处换成你畅言应用的conf。
            });

        })
    },
    methods: {
        loadScript(url, callback){
            // 加载script
            let script = document.createElement('script');
            if (script.readyState) { 
                // IE浏览器
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        callback();
                    }
                }
            } else { 
                // 其他浏览器
                script.onload = function () {
                    callback();
                }
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }
}
</script>


```
然后在需要的地方引入组件就可以了




#### 打包上线时去除log日志

```
// build/webpack.prod.conf.js 修改这里面的文件

new UglifyJsPlugin({
    uglifyOptions: {
    compress: {
        warnings: false,
        drop_debugger: true, // 新增
        drop_console: true, // 新增
        pure_funcs: ['console.log'], // 新增
    }
    },
    sourceMap: config.build.productionSourceMap,
    parallel: true
}),

```


#### 使用history模式

> 默认情况下，vue-router是用的hash的路由模式，在地址栏中总会有#号，这种情况下微信的一些分享功能会把#号后面的去除掉，因此使用history模式更合适

```
// router/index.js
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../views/out.vue'], resolve),
    }
})
// 在初始化路由的时候，加上`mode: 'history'`这样就行了，

// 初步完成之后打包上线，上线之前要确保，config/index.js下的`assetsPublicPath`指定到根目录下，不然刷新会报错，

build: {
    // Template for index.html
    index: path.resolve(__dirname, '../pcBlog/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../pcBlog'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/', 
}


// 完成之后，运行`npm run build`，把生成的包放到服务器上，这里还不能算正式完成，需要修改nginx配置，才能正常使用history模式

// 找到服务器的`/etc/nginx/conf.d/blog.conf`文件,配置如下，必须指定到打包的目录下才行，

server {
        listen  80;
        server_name     blog.baozinews.cn;
        # 指定到根目录下
        root   /usr/share/nginx/new_websit_blog/baozi_blog/pcBlog;
        # 官方指定配置
        location / {
                 try_files $uri $uri/ /index.html;
        }
        # 接口代理
        location /blog/v1/ {
                proxy_pass    http://127.0.0.1:3006;
        }
location ~* ^.+\.(css|js|ico|gif|jpg|jpeg|png)$ {
     log_not_found off;
     # 关闭日志
     access_log off;
     # 缓存时间7天
     expires 7d;
     # 源服务器
     #proxy_pass http://localhost:8888;
     # 指定上面设置的缓存区域
     proxy_cache imgcache;
     # 缓存过期管理
     proxy_cache_valid 200 302 1d;
     proxy_cache_valid 404 10m;
     proxy_cache_valid any 1h;
     proxy_cache_use_stale error timeout invalid_header updating http_500 http_502 http_503 http_504;
 }
}

```

到这里vue-router的history模式配置已经完成，访问刷新都可以正常使用.







### 上线的过程

这里记录下上线的配置，前端后台的都有，涉及到直接打包上线，node的部署，以及cdn的加速处理

1.首先是前端页面

首先`npm run build`生成打包后的文件，由于修改了配置，我这里生成的是pcBlog文件，将文件放到服务器上，配置对应的nginx

```
// /etc/nginx/conf.d/blog.conf
server {
        listen  80;
        server_name     blog.baozinews.cn; // 二级域名
        root   /usr/share/nginx/new_websit_blog/baozi_blog/pcBlog; // 目录文件
        // 这是vue-router官方指定配置，针对history模式的配置
        location / {
                 try_files $uri $uri/ /index.html;
        }
        location /blog/v1/ {
                proxy_pass    http://127.0.0.1:3006; // 代理地址，后台node的端口号
        }
}

```
因为采用的是`history`模式，因此打包上线的时候需要将域名指定到项目的根目录下，同事要加上上面的这段nginx配置，不然访问二级页面会报错.

然后就是cdn加速，使用的是七牛的cdn加速，上传图片也是使用的七牛云存储，关键是免费。具体使用是先绑定cdn加速域名，我这里使用的`dragon.baozinews.cn`这个二级域名，(这里的二级域名是`www.dnspod.cn`上生成的)，最终的加速访问域名就是这个，需要配置好cname参数，配置非常简单，根据提示或者网上搜索下就行了。配置完成之后就能访问这个加速域名了，但是要在七牛云上配置这个加速域名的回源域名，这里指的就是你项目真正访问的域名，就是在nginx配置的二级域名.到这里就能直接访问这个加速二级域名了，同时访问的就是你配置好的nginx指向的目录。

2.后端启动

先把项目放到服务器，然后使用`pm2 start src/app.js --name '启动的项目名称随便起'`就能启动对应的node项目，这是最简单的启动方式，`pm2 save`保存启动项目，`pm2 ls`查看所有的启动项目,`pm2 restart id`重启对应的项目,`pm2 log id`查看对应项目log日志


3. 配置好cdn加速后如何更新代码

项目部署好后，完成了cdn加速，在代码里添加了新的功能，完成后部署到服务器，但是访问加速域名还是旧的页面，这里需要在七牛cdn加速功能处去处理，选中‘刷新预取’模块，然后选中刷新目录，在其中填写`http://dragon.baozinews.cn/`你的加速域名，然后提交，再刷新页面，就是你刚提交的最新页面了。


# 后端代码


### 主要技术栈

- node 
- vue
- mongoose

这里后台的存储是用`mongodb`主要原因是这个稍微熟悉些，有熟悉mysql的也可以直接使用mysql来存储数据，mongodb不熟悉的同学可以查看下面的链接，稍微熟悉下api,[参考链接](http://mongoosejs.net/)





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


先写到这里，功能还不是很完善，存在一些问题，希望大家给指正下，目前想来还是先以完善功能为主，后续会继续优化代码，功能上的话目前是规划个人资料，评论列表管理，以及用户列表管理，还有打点的图形日志，后端这边的日志没有加上，目前主要是以pm2 log为准，之后也会加上日志，完善之后博客会更新到网站上，好了继续撸代码。

