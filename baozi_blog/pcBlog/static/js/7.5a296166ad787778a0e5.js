webpackJsonp([7],{"9Bqc":function(t,e){},FGTv:function(t,e){},"YN/e":function(t,e){},c7qA:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{currentPath:"/",list:[{title:"首页",path:"/"},{title:"随笔",path:"/case"},{title:"学习分享",path:"/study"},{title:"关于",path:"/about"}]}},created:function(){this.initHeader()},methods:{goLink:function(t){this.currentPath=t.path,this.$router.push(t.path)},initHeader:function(){console.log(this.$route.path,window.location.href),this.currentPath=this.$route.path}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"header"},[i("div",{staticClass:"top"},[i("div",{staticClass:"left"},t._l(t.list,function(e,n){return i("div",{key:n,class:{item:!0,active:t.currentPath==e.path},on:{click:function(i){return t.goLink(e)}}},[t._v("\n                "+t._s(e.title)+"\n            ")])}),0),t._v(" "),i("div",{staticClass:"right"})])])},staticRenderFns:[]};var r={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer"},[e("div",{staticClass:"tip"},[this._v("©2019 包子.All Rights Reserved.版权所有.")]),this._v(" "),e("div",[this._v("备案号：京ICP备19022979号-1 ")]),this._v(" "),e("div",[this._v("京公网安备11010502037999号")])])}]};var a={components:{"v-header":i("C7Lr")(n,s,!1,function(t){i("FGTv")},"data-v-7c170b86",null).exports,"v-footer":i("C7Lr")({data:function(){return{}}},r,!1,function(t){i("YN/e")},"data-v-ee54b88e",null).exports},data:function(){return{}}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"out"},[e("v-header"),this._v(" "),e("div",{staticClass:"container"},[e("router-view")],1),this._v(" "),e("v-footer")],1)},staticRenderFns:[]};var o=i("C7Lr")(a,c,!1,function(t){i("9Bqc")},"data-v-64aa02ee",null);e.default=o.exports}});
//# sourceMappingURL=7.5a296166ad787778a0e5.js.map