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
