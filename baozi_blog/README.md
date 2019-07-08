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