webpackJsonp([4],{UAgq:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=e("lC5x"),s=e.n(r),n=e("J0Oq"),o=e.n(n),i={data:function(){return{chapterInfo:{},nextFlag:!0,prevFlag:!0,isHas:!0,nextChapterId:0,prevChapterId:0}},created:function(){this.initPage()},computed:{content:function(){return this.chapterInfo.content?this.chapterInfo.content.replace(/\n/g,"<br>"):""}},methods:{initPage:function(){this.getChapterInfo({chapterId:this.$route.params.chapterId,bookId:this.$route.params.bookId})},getChapterInfo:function(t){var a=this;return o()(s.a.mark(function e(){var r;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=1,e.next=4,a.$axios.get("/book/chapter",{params:{chapterId:t.chapterId,bookId:t.bookId}});case 4:r=e.sent,a.chapterInfo=r.data.data.chapter||{},a.isHas=!!r.data.data.chapter,a.prevFlag=!!r.data.data.prevChapter,a.nextFlag=!!r.data.data.nextChapter,a.prevChapterId=r.data.data.prevChapter?r.data.data.prevChapter.chapter_id:0,a.nextChapterId=r.data.data.nextChapter?r.data.data.nextChapter.chapter_id:0,e.next=17;break;case 13:e.prev=13,e.t0=e.catch(1),a.isHas=!1;case 17:case"end":return e.stop()}},e,a,[[1,13]])}))()},goNext:function(){window.scrollTo(0,0),this.$router.push("/read/"+this.$route.params.bookId+"/"+this.nextChapterId)},goPrev:function(){window.scrollTo(0,0),this.$router.push("/read/"+this.$route.params.bookId+"/"+this.prevChapterId)},goBack:function(){this.$router.push("/detail/"+this.$route.params.bookId)},goHome:function(){this.$router.push("/")},goList:function(){this.$router.push("/chapterlist/"+this.$route.params.bookId)}},watch:{$route:function(){this.initPage()}}},c={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{directives:[{name:"show",rawName:"v-show",value:t.chapterInfo.title&&t.isHas,expression:"chapterInfo.title && isHas"}],staticClass:"read"},[e("div",{staticClass:"top"},[e("div",{staticClass:"btn el-icon-back",on:{click:t.goBack}},[t._v("返回")]),t._v(" "),e("div",{staticClass:"btn home",on:{click:t.goHome}},[t._v("首页")])]),t._v(" "),e("div",[e("div",{staticClass:"title"},[t._v(t._s(t.chapterInfo.title))]),t._v(" "),e("div",{staticClass:"content",domProps:{innerHTML:t._s(t.content)}})]),t._v(" "),e("div",{staticClass:"footer"},[t.prevFlag?e("el-button",{staticClass:"prev",attrs:{type:"warning",round:""},on:{click:t.goPrev}},[t._v("上一章")]):e("el-button",{staticClass:"prev",attrs:{type:"info",round:""}},[t._v("上一章")]),t._v(" "),e("el-button",{staticClass:"prev",attrs:{type:"warning",round:""},on:{click:t.goList}},[t._v("目录")]),t._v(" "),t.nextFlag?e("el-button",{staticClass:"next",attrs:{type:"danger",round:""},on:{click:t.goNext}},[t._v("下一章")]):e("el-button",{staticClass:"next",attrs:{type:"info",round:""}},[t._v("下一章")])],1)]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.chapterInfo.title&&!t.isHas,expression:"!chapterInfo.title && !isHas"}],staticClass:"read"},[e("div",{staticClass:"title special"},[t._v("\n            章节暂时缺失\n        ")]),t._v(" "),e("div",{staticClass:"footer"},[t.prevFlag?e("el-button",{staticClass:"prev",attrs:{type:"warning",round:""},on:{click:t.goPrev}},[t._v("上一章")]):e("el-button",{staticClass:"prev",attrs:{type:"info",round:""}},[t._v("上一章")]),t._v(" "),e("el-button",{staticClass:"prev",attrs:{type:"warning",round:""},on:{click:t.goList}},[t._v("目录")]),t._v(" "),t.nextFlag?e("el-button",{staticClass:"next",attrs:{type:"danger",round:""},on:{click:t.goNext}},[t._v("下一章")]):e("el-button",{staticClass:"next",attrs:{type:"info",round:""}},[t._v("下一章")])],1)])])},staticRenderFns:[]};var p=e("C7Lr")(i,c,!1,function(t){e("fzOY")},"data-v-18745e70",null);a.default=p.exports},fzOY:function(t,a){}});
//# sourceMappingURL=4.199616b61f0753c52cbf.js.map