webpackJsonp([2],{"3cXf":function(e,t,s){e.exports={default:s("q1bu"),__esModule:!0}},BOAV:function(e,t){},JFJF:function(e,t,s){e.exports=s.p+"static/media/cover.21aa828.mp4"},c2lw:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("lC5x"),i=s.n(n),a=s("3cXf"),o=s.n(a),r=s("J0Oq"),u=s.n(r),l={data:function(){return{userInfo:{username:"",password:"",passwordAgain:""},vedioCanPlay:!1,fixStyle:"",randomVideo:[{video:s("JFJF"),img:s("tMvF")}]}},computed:{getRandom:function(){return this.randomVideo[Math.floor(Math.random()*this.randomVideo.length)]}},methods:{canplay:function(){this.vedioCanPlay=!0},goReister:function(){var e=this;return u()(i.a.mark(function t(){var s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.userInfo.username&&e.userInfo.password){t.next=5;break}return e.$message({type:"error",message:"用户名或者密码为空"}),t.abrupt("return");case 5:if(e.userInfo.password==e.userInfo.passwordAgain){t.next=8;break}return e.$message({type:"error",message:"两次输入的密码不一致"}),t.abrupt("return");case 8:return t.next=10,e.$axios.post("/user/register",e.userInfo);case 10:(s=t.sent)&&1==s.data.code?(localStorage.setItem("token",s.data.data.token),localStorage.setItem("userinfo",o()(s.data.data.userinfo)),e.$router.push("/")):e.$message.error(s.data.message);case 13:case"end":return t.stop()}},t,e)}))()},initVideo:function(){var e=this;window.onresize=function(){var t=document.body.clientWidth,s=document.body.clientHeight,n=void 0,i=void 0;s/t<.5625?(i=.5625*(n=t),e.fixStyle={height:.5625*t+"px",width:t+"px","margin-bottom":(s-i)/2+"px","margin-left":"initial"}):(n=(i=s)/.5625,e.fixStyle={height:s+"px",width:s/.5625+"px","margin-left":(t-n)/2+"px","margin-bottom":"initial"})},window.onresize()},goLogin:function(){this.$router.push("/login")}},mounted:function(){this.initVideo()}},c={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login"},[s("div",{staticClass:"homepage-hero-module"},[s("div",{staticClass:"video-container"},[s("div",{staticClass:"filter",style:e.fixStyle}),e._v(" "),s("video",{staticClass:"fillWidth",style:e.fixStyle,attrs:{autoplay:"",loop:""},on:{canplay:e.canplay}},[s("source",{attrs:{src:e.getRandom.video,type:"video/mp4"}})]),e._v(" "),e.vedioCanPlay?e._e():s("div",{staticClass:"poster hidden"},[s("img",{style:e.fixStyle,attrs:{src:e.getRandom.img,alt:""}})])])]),e._v(" "),s("div",{staticClass:"box"},[s("div",{staticClass:"title"},[e._v("用户注册")]),e._v(" "),s("div",{staticClass:"username item-box"},[s("el-input",{staticClass:"item-input",attrs:{placeholder:"请输入用户名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goReister(t)}},model:{value:e.userInfo.username,callback:function(t){e.$set(e.userInfo,"username",t)},expression:"userInfo.username"}}),e._v(" "),s("span",{staticClass:"el-icon-user input-icon"})],1),e._v(" "),s("div",{staticClass:"password item-box"},[s("el-input",{staticClass:"item-input",attrs:{placeholder:"请输入密码",type:"password"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goReister(t)}},model:{value:e.userInfo.password,callback:function(t){e.$set(e.userInfo,"password",t)},expression:"userInfo.password"}}),e._v(" "),s("span",{staticClass:"el-icon-lock input-icon"})],1),e._v(" "),s("div",{staticClass:"password item-box"},[s("el-input",{staticClass:"item-input",attrs:{placeholder:"请再次输入密码",type:"password"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.goReister(t)}},model:{value:e.userInfo.passwordAgain,callback:function(t){e.$set(e.userInfo,"passwordAgain",t)},expression:"userInfo.passwordAgain"}}),e._v(" "),s("span",{staticClass:"el-icon-lock input-icon"})],1),e._v(" "),s("div",{staticClass:"tip",on:{click:e.goLogin}},[e._v("已有账号? "),s("span",[e._v("登录")])]),e._v(" "),s("div",{staticClass:"login-btn-box"},[s("el-button",{staticClass:"login-btn",attrs:{type:"primary"},on:{click:e.goReister}},[e._v("注册")])],1)])])},staticRenderFns:[]};var d=s("C7Lr")(l,c,!1,function(e){s("uI7T"),s("BOAV")},"data-v-fe963cca",null);t.default=d.exports},q1bu:function(e,t,s){var n=s("Rv9F"),i=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}},uI7T:function(e,t){}});
//# sourceMappingURL=2.9e7c0cbd6b913c54dc89.js.map