# baozi_blog

> 前端页面的文档

使用方法，进入到当前目录之后运行 `npm install`安装依赖，依赖安装完成之后，运行`npm run dev`启动项目

下面主要记录一些写代码过程中，主要的一些技术点。

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


