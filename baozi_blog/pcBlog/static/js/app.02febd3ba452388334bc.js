webpackJsonp([15],{JKkS:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("xd7I"),o={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var i=e("C7Lr")({name:"App",components:{}},o,!1,function(t){e("ukMS")},null,null).exports,u=e("3XdE"),r=e("rVsN"),c=e.n(r),l=e("2bvH");a.default.use(l.a);var p=new l.a.Store({state:{userinfo:{}},mutations:{SET_ROLES:function(t,n){t.userinfo=n}},actions:{getUser:function(t){t.commit,t.state;return new c.a(function(t,n){var e;(e=a.default.prototype.$axios,new c.a(function(t,n){var a=localStorage.getItem("token");a?e({url:"/user/userinfo",method:"get",headers:{token:a}}).then(function(n){n&&1==n.data.code?t(1):t(null)}):t(null)})).then(function(e){e||n("验证失败，请重新登录."),t(e)}).catch(function(t){n(t)})})}}}),h={path:"/admin",name:"管理系统",component:function(t){return e.e(1).then(function(){var n=[e("3SYa")];t.apply(null,n)}.bind(this)).catch(e.oe)},children:[{path:"/",name:"文章列表",component:function(t){return Promise.all([e.e(0),e.e(3)]).then(function(){var n=[e("x0vE")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"文章列表",requireAuthor:!0,index:"1-1"}},{path:"add_blog",name:"新增博客",component:function(t){return Promise.all([e.e(0),e.e(2)]).then(function(){var n=[e("mhqn")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"新增博客",requireAuthor:!0,index:"1-2"}},{path:"tag",name:"标签管理",component:function(t){return Promise.all([e.e(0),e.e(13)]).then(function(){var n=[e("qwaH")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"标签管理",requireAuthor:!0,index:"1-4"}}].concat([{path:"user/list",name:"用户列表",component:function(t){return Promise.all([e.e(0),e.e(11)]).then(function(){var n=[e("tVh0")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"用户列表",requireAuthor:!0,index:"1-3-1"}},{path:"user/add",name:"新增用户",component:function(t){return e.e(8).then(function(){var n=[e("wS9C")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"新增用户",requireAuthor:!0,index:"1-3-2"}}])};a.default.use(u.a);var m=new u.a({routes:[{path:"/",component:function(t){return e.e(7).then(function(){var n=[e("c7qA")];t.apply(null,n)}.bind(this)).catch(e.oe)},children:[{path:"/",name:"首页",component:function(t){return e.e(5).then(function(){var n=[e("8hXn")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"首页"}},{path:"/study",name:"学习分享",component:function(t){return e.e(12).then(function(){var n=[e("b1fX")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"学习分享"}},{path:"/case",name:"随笔",component:function(t){return e.e(9).then(function(){var n=[e("G2Qr")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"随笔"}},{path:"/about",name:"关于",component:function(t){return e.e(10).then(function(){var n=[e("FBzZ")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"关于"}},{path:"/article/:id",name:"详情",component:function(t){return e.e(6).then(function(){var n=[e("AtFq")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"详情"}}]},h,{path:"/login",name:"登录",component:function(t){return Promise.all([e.e(0),e.e(4)]).then(function(){var n=[e("Quw4")];t.apply(null,n)}.bind(this)).catch(e.oe)},meta:{title:"登录"}}]});m.beforeEach(function(t,n,e){t.matched.some(function(t){return t.meta.requireAuthor})&&p.dispatch("getUser").then(function(t){1==t?e():e("/login")}).catch(function(t){e("/login")}),e()});var f=m,s=e("Muz9"),d=e.n(s),v=e("4gzT"),b=e.n(v);e("JKkS"),e("muQq");a.default.use(b.a);var y=d.a.create({baseURL:"/blog/v1",timeout:1e3});a.default.prototype.$axios=y,a.default.config.productionTip=!1,new a.default({el:"#app",router:f,store:p,components:{App:i},template:"<App/>"})},muQq:function(t,n){},ukMS:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.02febd3ba452388334bc.js.map