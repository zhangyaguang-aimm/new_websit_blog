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
                appid: 'cyuk9XCkx', // 此处换成你的畅言应用的appid,
                conf: 'prod_4af49a09745d0ec1c34d24cf8eae8afc', // 此处换成你畅言应用的conf。
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
