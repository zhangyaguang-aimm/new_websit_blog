webpackJsonp([2],{"59hW":function(t,s){},"5BNv":function(t,s){},WMEK:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a={components:{"v-discuss":e("tENF").a}},n={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"disucss"},[s("v-discuss",{attrs:{zone:"discuss"}})],1)},staticRenderFns:[]};var i=e("C7Lr")(a,n,!1,function(t){e("5BNv")},"data-v-ee2c17a6",null);s.default=i.exports},syUp:function(t,s){},tENF:function(t,s,e){"use strict";var a=e("lC5x"),n=e.n(a),i=e("J0Oq"),r=e.n(i),c={props:{isShowReply:{type:Boolean,default:!1},zone:{type:String,default:"blog"},remarkId:String,blogId:String},data:function(){return{content:"",guestInfo:{nickname:"",email:"",website:""},author:""}},created:function(){var t=localStorage.getItem("userinfo");t&&(t=JSON.parse(t),this.author=t._id)},methods:{cancleReply:function(){this.$parent.cancleReply&&this.$parent.cancleReply()},goPublish:function(){var t=this;return r()(n.a.mark(function s(){return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:if(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,t.content){s.next=6;break}return t.$message({type:"error",message:"请填写内容"}),s.abrupt("return");case 6:if(t.author||t.guestInfo.nickname){s.next=9;break}return t.$message({type:"error",message:"请填写昵称"}),s.abrupt("return");case 9:if(!t.isShowReply){s.next=16;break}return s.next=12,t.$axios.post("/reply/add",{content:t.content,guestInfo:t.guestInfo,zone:t.zone,remarkId:t.remarkId,author:t.author,blogId:t.blogId});case 12:return 1==s.sent.data.code&&t.$message({type:"success",message:"评论成功"}),t.$parent.$parent.init&&t.$parent.$parent.init(!0),s.abrupt("return");case 16:return s.next=18,t.$axios.post("/remark/add",{content:t.content,guestInfo:t.guestInfo,zone:t.zone,author:t.author,blogId:t.blogId});case 18:1==s.sent.data.code&&(t.$parent.init&&t.$parent.init(!0),t.$message({type:"success",message:"评论成功"}));case 20:case"end":return s.stop()}},s,t)}))()}}},o={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"discuss-content-con"},[e("div",{staticClass:"tip"},[e("span",{staticClass:"el-icon-notebook-1"}),t._v("发表评论"),e("i",{directives:[{name:"show",rawName:"v-show",value:t.isShowReply,expression:"isShowReply"}],staticClass:"cancle",on:{click:t.cancleReply}},[t._v("取消回复")])]),t._v(" "),e("div",{staticClass:"user-temp"},[e("el-input",{staticClass:"user-temp-item",attrs:{placeholder:"昵称"},model:{value:t.guestInfo.nickname,callback:function(s){t.$set(t.guestInfo,"nickname",s)},expression:"guestInfo.nickname"}}),t._v(" "),e("el-input",{staticClass:"user-temp-item",attrs:{placeholder:"邮箱"},model:{value:t.guestInfo.email,callback:function(s){t.$set(t.guestInfo,"email",s)},expression:"guestInfo.email"}}),t._v(" "),e("el-input",{staticClass:"user-temp-item",attrs:{placeholder:"网址"},model:{value:t.guestInfo.website,callback:function(s){t.$set(t.guestInfo,"website",s)},expression:"guestInfo.website"}})],1),t._v(" "),e("div",{staticClass:"discuss-content"},[e("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"写点什么..."},model:{value:t.content,callback:function(s){t.content=s},expression:"content"}})],1),t._v(" "),e("div",{staticClass:"disucss-publish"},[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.goPublish}},[t._v("提交")])],1)])},staticRenderFns:[]};var l=e("C7Lr")(c,o,!1,function(t){e("syUp")},"data-v-4422f7c6",null).exports,u={components:{"discuss-publish":l},props:{discussItem:Object,zone:{type:String,default:"blog"},remarkId:String,inner:{type:Boolean,default:!1}},filters:{getTime:function(t){return(t=new Date(t)).getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()}},computed:{getName:function(){return this.discussItem.author?Array.isArray(this.discussItem.author)?this.discussItem.author[0]:this.discussItem.author:""}},data:function(){return{replyFlag:!1}},methods:{cancleReply:function(){this.replyFlag=!1},goUrl:function(t){t?window.open(t):this.$message({type:"info",message:"没有互访页面"})}}},d={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"discuss-item"},[e("div",{staticClass:"discuss-list-title"},[e("div",{staticClass:"main-discuss-item"},[e("div",{staticClass:"left"},[e("img",{directives:[{name:"show",rawName:"v-show",value:!t.inner,expression:"!inner"}],attrs:{src:"http://img.baozinews.cn/blog/static/nav_four.jpg",alt:""}})]),t._v(" "),e("div",{staticClass:"right"},[e("div",{staticClass:"top"},[t.getName?e("div",{staticClass:"avatarinfo"},[e("img",{directives:[{name:"show",rawName:"v-show",value:t.inner,expression:"inner"}],staticClass:"avatar-img",attrs:{src:"http://img.baozinews.cn/blog/static/nav_four.jpg",alt:""}}),t._v(" "),e("span",{staticClass:"avatar",on:{click:function(s){return t.goUrl(t.discussItem.guestInfo.website)}}},[t._v(t._s(t.getName.username))]),t._v(" "),"admin"!==t.getName.username?e("span",{staticClass:"tag vip"},[t._v("用户")]):e("span",{staticClass:"tag super"},[t._v("博主")])]):e("div",{staticClass:"avatarinfo"},[e("img",{directives:[{name:"show",rawName:"v-show",value:t.inner,expression:"inner"}],staticClass:"avatar-img",attrs:{src:"http://img.baozinews.cn/blog/static/nav_four.jpg",alt:""}}),t._v(" "),e("span",{staticClass:"avatar",on:{click:function(s){return t.goUrl(t.discussItem.guestInfo.website)}}},[t._v(t._s(t.discussItem.guestInfo.nickname))]),t._v(" "),e("span",{staticClass:"tag"},[t._v("游客")])]),t._v(" "),e("div",{staticClass:"time"},[t._v(t._s(t._f("getTime")(t.discussItem.createAt)))])]),t._v(" "),e("div",{staticClass:"content"},[t._v("\n                    "+t._s(t.discussItem.content)+"\n                ")]),t._v(" "),e("div",{staticClass:"bottom"},[e("div",{staticClass:"reply",on:{click:function(s){t.replyFlag=!0}}},[t._v("回复")])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.replyFlag,expression:"replyFlag"}],staticClass:"inner-publish"},[e("discuss-publish",{attrs:{remarkId:t.remarkId,zone:t.zone,isShowReply:!0}})],1)])])])])},staticRenderFns:[]};var p={components:{"discuss-publish":l,"discuss-item":e("C7Lr")(u,d,!1,function(t){e("59hW")},"data-v-487932c6",null).exports},props:{zone:{type:String,default:"blog"},blogId:String},data:function(){return{replyFlag:!1,discussInfo:{},pageNum:1,list:[],count:0}},created:function(){this.init()},methods:{init:function(t){var s=this;return r()(n.a.mark(function e(){var a;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.$axios.get("/remark/list",{params:{zone:s.zone,pageNum:s.pageNum,blogId:s.blogId}});case 2:1==(a=e.sent).data.code&&(s.count=a.data.data.count,s.list=t?a.data.data.list:s.list.concat(a.data.data.list));case 4:case"end":return e.stop()}},e,s)}))()},getMore:function(){this.pageNum+=1,this.init()}}},v={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"discuss-inner"},[e("discuss-publish",{attrs:{blogId:t.blogId,zone:t.zone}}),t._v(" "),0!=t.count?e("div",{staticClass:"discuss-list-title"},[e("div",{staticClass:"top"},[t._m(0),t._v(" "),e("div",{staticClass:"tip"},[t._v("\n                (有"),e("span",[t._v(t._s(t.count))]),t._v("条评论)\n            ")])]),t._v(" "),e("div",{staticClass:"new-discuss"},[t._v("最新评论")]),t._v(" "),t._l(t.list,function(s){return e("div",{key:s._id,staticClass:"out"},[e("discuss-item",{attrs:{zone:t.zone,remarkId:s._id,discussItem:s}}),t._v(" "),t._l(s.replys,function(a){return e("div",{key:a._id,staticClass:"inner"},[e("discuss-item",{attrs:{blogId:t.blogId,zone:t.zone,remarkId:s._id,inner:!0,discussItem:a}})],1)})],2)})],2):e("div",{staticClass:"null"},[t._v("暂无评论")]),t._v(" "),t.list&&t.list.length<t.count?e("div",{staticClass:"see-more",on:{click:t.getMore}},[t._v("查看更多")]):t._e()],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"text"},[s("span",{staticClass:"el-icon-edit"}),this._v("评论列表")])}]};var m=e("C7Lr")(p,v,!1,function(t){e("wyu9")},"data-v-4daf2dab",null);s.a=m.exports},wyu9:function(t,s){}});
//# sourceMappingURL=2.d52c59c6868571f10b5e.js.map