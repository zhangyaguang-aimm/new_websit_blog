webpackJsonp([4],{"+uUo":function(t,e){},"3cXf":function(t,e,i){t.exports={default:i("q1bu"),__esModule:!0}},JFJF:function(t,e,i){t.exports=i.p+"static/media/cover.21aa828.mp4"},Quw4:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("lC5x"),n=i.n(a),s=i("3cXf"),o=i.n(s),r=i("J0Oq"),l=i.n(r),c={data:function(){return{userInfo:{username:"",password:""},vedioCanPlay:!1,fixStyle:"",randomVideo:[{video:i("JFJF"),img:i("tMvF")}]}},computed:{getRandom:function(){return this.randomVideo[Math.floor(Math.random()*this.randomVideo.length)]}},methods:{canplay:function(){this.vedioCanPlay=!0},goLogin:function(){var t=this;return l()(n.a.mark(function e(){var i;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.post("/user/login",t.userInfo);case 2:i=e.sent,console.log(i),i&&1==i.data.code?(localStorage.setItem("token",i.data.data.token),localStorage.setItem("userinfo",o()(i.data.data.userinfo)),t.$router.push("/admin")):t.$message.error(i.data.message);case 5:case"end":return e.stop()}},e,t)}))()},initVideo:function(){var t=this;window.onresize=function(){var e=document.body.clientWidth,i=document.body.clientHeight,a=void 0,n=void 0;i/e<.5625?(n=.5625*(a=e),t.fixStyle={height:.5625*e+"px",width:e+"px","margin-bottom":(i-n)/2+"px","margin-left":"initial"}):(a=(n=i)/.5625,t.fixStyle={height:i+"px",width:i/.5625+"px","margin-left":(e-a)/2+"px","margin-bottom":"initial"})},window.onresize()}},mounted:function(){this.initVideo()}},d={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"login"},[i("div",{staticClass:"homepage-hero-module"},[i("div",{staticClass:"video-container"},[i("div",{staticClass:"filter",style:t.fixStyle}),t._v(" "),i("video",{staticClass:"fillWidth",style:t.fixStyle,attrs:{autoplay:"",loop:""},on:{canplay:t.canplay}},[i("source",{attrs:{src:t.getRandom.video,type:"video/mp4"}})]),t._v(" "),t.vedioCanPlay?t._e():i("div",{staticClass:"poster hidden"},[i("img",{style:t.fixStyle,attrs:{src:t.getRandom.img,alt:""}})])])]),t._v(" "),i("div",{staticClass:"box"},[i("div",{staticClass:"title"},[t._v("管理后台")]),t._v(" "),i("div",{staticClass:"username item-box"},[i("el-input",{staticClass:"item-input",attrs:{placeholder:"请输入用户名"},model:{value:t.userInfo.username,callback:function(e){t.$set(t.userInfo,"username",e)},expression:"userInfo.username"}}),t._v(" "),i("span",{staticClass:"el-icon-user input-icon"})],1),t._v(" "),i("div",{staticClass:"password item-box"},[i("el-input",{staticClass:"item-input",attrs:{placeholder:"请输入密码",type:"password"},model:{value:t.userInfo.password,callback:function(e){t.$set(t.userInfo,"password",e)},expression:"userInfo.password"}}),t._v(" "),i("span",{staticClass:"el-icon-lock input-icon"})],1),t._v(" "),i("div",{staticClass:"login-btn-box"},[i("el-button",{staticClass:"login-btn",attrs:{type:"primary"},on:{click:t.goLogin}},[t._v("登录")])],1)])])},staticRenderFns:[]};var u=i("C7Lr")(c,d,!1,function(t){i("W5B0"),i("+uUo")},"data-v-47c36bd5",null);e.default=u.exports},W5B0:function(t,e){},q1bu:function(t,e,i){var a=i("Rv9F"),n=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}},tMvF:function(t,e,i){t.exports=i.p+"static/img/cover.a35e625.jpg"}});
//# sourceMappingURL=4.16386846f87be26de66b.js.map