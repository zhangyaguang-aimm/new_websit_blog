webpackJsonp([2],{"/Q6k":function(t,e){},"27PW":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("lC5x"),i=o.n(n),s=o("J0Oq"),a=o.n(s),r={name:"headerNav",props:{title:String,goRouter:String},data:function(){return{}},methods:{goHome:function(){this.$router.push("/")},goBack:function(){"index"==this.goRouter?this.$router.push("/"):this.$router.go(-1)}}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"nav",attrs:{id:"headerNav"}},[e("div",{staticClass:"back el-icon-caret-left",on:{click:this.goBack}}),this._v(" "),e("div",{staticClass:"title"},[this._v(this._s(this.title))]),this._v(" "),e("div",{staticClass:"home el-icon-s-home",on:{click:this.goHome}})])},staticRenderFns:[]};var u={components:{"v-header":o("C7Lr")(r,c,!1,function(t){o("/Q6k")},"data-v-97877eb4",null).exports},data:function(){return{pageNum:0,list:[],bookInfo:{},flag:!0}},created:function(){},methods:{refresh:function(){var t=this;console.log("aa"),setTimeout(function(){t.$refs.my_scroller.finishPullToRefresh()},1e3)},infinite:function(t){console.log("bbb",t),this.flag?this.getList({bookId:this.$route.params.bookId,fun:t}):this.$refs.my_scroller.finishInfinite(2)},initPage:function(){console.log(this.$route.params.bookId),this.getList({bookId:this.$route.params.bookId})},getList:function(t){var e=this;return a()(i.a.mark(function o(){var n;return i.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,e.$axios.get("/book/chapterlist",{params:{bookId:t.bookId,pageNum:e.pageNum}});case 3:n=o.sent,e.list=e.list.concat(n.data.data.chapter),e.bookInfo=n.data.data.bookInfo,e.flag=n.data.data.flag,t.fun&&t.fun(),e.pageNum+=1,o.next=14;break;case 11:o.prev=11,o.t0=o.catch(0),console.log(o.t0);case 14:case"end":return o.stop()}},o,e,[[0,11]])}))()},goRead:function(t){this.$router.push("/read/"+t.book_id+"/"+t.chapter_id)}}},l={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"list"},[o("v-header",{staticClass:"header",attrs:{title:t.bookInfo.name}}),t._v(" "),o("scroller",{ref:"my_scroller",staticClass:"box",attrs:{"on-refresh":t.refresh,"on-infinite":t.infinite}},[o("div",t._l(t.list,function(e){return o("div",{key:e.chapter_id,staticClass:"item",on:{click:function(o){return t.goRead(e)}}},[t._v(" \n                "+t._s(e.title)+"\n            ")])}),0)])],1)},staticRenderFns:[]};var f=o("C7Lr")(u,l,!1,function(t){o("5Fuf")},"data-v-3dc6e71b",null);e.default=f.exports},"5Fuf":function(t,e){}});
//# sourceMappingURL=2.78697b7478ffde3e5a63.js.map