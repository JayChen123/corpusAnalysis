webpackJsonp([1],{"37vu":function(t,e){},"9M+g":function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("div",[s("b-navbar",{attrs:{toggleable:"sm",type:"light",variant:"light"}},[s("b-navbar-toggle",{attrs:{target:"nav-text-collapse"}}),t._v(" "),s("b-navbar-brand",[t._v("在线免费工具")]),t._v(" "),s("b-collapse",{attrs:{id:"nav-text-collapse","is-nav":""}},[s("b-navbar-nav",[s("b-nav-item",{attrs:{href:"/corpus"}},[t._v("词频词性分析")]),t._v(" "),s("b-nav-item",{attrs:{href:"/pdf"}},[t._v("PDF合并工具")]),t._v(" "),s("b-nav-item",{directives:[{name:"b-toggle",rawName:"v-b-toggle.sidebar-1",modifiers:{"sidebar-1":!0}}]},[t._v("联系我")])],1)],1)],1)],1),t._v(" "),s("div",[s("b-sidebar",{attrs:{id:"sidebar-1",title:"联系我",shadow:""}},[s("div",{staticClass:"px-3 py-2"},[s("p",[t._v("有任何问题请联系我，定制化任务也可以联系我")]),t._v(" "),s("p",[t._v("\n          微信号：JChen2110 "),s("br"),t._v("\n          QQ号：971516583 "),s("br"),t._v("\n          邮箱：cj194832@163.com\n        ")]),t._v(" "),s("b-img",{attrs:{src:"http://www.blackedu.vip/admin/wp-content/uploads/2020/08/mywechat.jpg",fluid:"",thumbnail:""}})],1)])],1),t._v(" "),s("router-view")],1)},staticRenderFns:[]};var o=s("VU/8")({name:"App"},a,!1,function(t){s("wMQS")},null,null).exports,i=s("/ocq"),r=s("mtWM"),c=s.n(r),d={data:function(){return this.wordCountSettings={metrics:["词频分布"],dataOrder:{label:"词频分布",order:"desc"}},this.segCountSettings={metrics:["词性分布"],dataOrder:{label:"词性分布",order:"desc"}},this.wordCloudSettings={shape:"diamond"},this.punctuationCountSettings={metrics:["标点分布"],dataOrder:{label:"标点分布",order:"desc"}},{use_count:379,content:"",user_words:"",message:"",stop_words:"的\n地\n得\n你\n我\n他\n了\n在\n是\n",is_delete_punctuation:!1,wordCount:{},segCount:{},punctuationCount:{},wordCloud:{},showPic:!1}},methods:{compute_content:function(){var t=this;if(this.content.length<5)this.message="内容过少";else{c.a.post("http://127.0.0.1:5000/corpus",{content:this.content,user_words:this.user_words,stop_words:this.stop_words,delete_punctuation:this.is_delete_punctuation}).then(function(e){t.showPic=!0,t.message="",t.wordCount={columns:["词名称","词频分布"],rows:e.data.word_count},t.punctuationCount={columns:["标点名称","标点分布"],rows:e.data.punctuation_count},t.segCount={columns:["词性","词性分布"],rows:e.data.seg_count},t.wordCloud={columns:["词名称","词频分布"],rows:e.data.word_cloud}}).catch(function(t){console.log(t)})}}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"corpus"}},[s("div",{staticClass:"container"},[t._m(0),t._v(" "),t.message?s("b-alert",{attrs:{variant:"danger",show:""}},[t._v(t._s(t.message))]):t._e(),t._v(" "),s("div",{staticClass:"text-inputs",staticStyle:{"margin-top":"5%"}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-8"},[s("b-form-textarea",{staticStyle:{"padding-inline":"inherit",resize:"none"},attrs:{id:"textarea-state",state:t.content.length<1e4,placeholder:"输入文章内容，不超过1万个字",rows:"19",required:""},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),s("div",{staticClass:"col-md-4"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("b-form-checkbox",{attrs:{name:"checked",switch:""},model:{value:t.is_delete_punctuation,callback:function(e){t.is_delete_punctuation=e},expression:"is_delete_punctuation"}},[t._v(" 删除常用标点\n                ")]),t._v(" "),s("br")],1),t._v(" "),s("div",{staticClass:"col-md-6"},[s("b-button",{attrs:{variant:"success"},on:{click:t.compute_content}},[t._v("提交")])],1)]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[t._v("\n                分词字典\n                "),s("b-form-textarea",{staticStyle:{"box-shadow":"2px 2px 3px inset",resize:"none"},attrs:{id:"textarea-state",state:t.user_words.length<500,rows:"16",placeholder:"每行一个词"},model:{value:t.user_words,callback:function(e){t.user_words=e},expression:"user_words"}})],1),t._v(" "),s("div",{staticClass:"col-md-6"},[t._v("\n\n                停用词字典\n                "),s("b-form-textarea",{staticStyle:{"box-shadow":"2px 2px 3px inset",resize:"none"},attrs:{id:"textarea-state",state:t.stop_words.length<500,rows:"16",placeholder:"每行一个词"},model:{value:t.stop_words,callback:function(e){t.stop_words=e},expression:"stop_words"}})],1)])])])]),t._v(" "),t.showPic?s("div",{staticClass:"res-table"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6",staticStyle:{height:"300px"}},[s("ve-bar",{attrs:{data:t.wordCount,settings:t.wordCountSettings}})],1),t._v(" "),s("div",{staticClass:"col-md-6"},[s("ve-bar",{attrs:{data:t.segCount,settings:t.segCountSettings}})],1)]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("ve-bar",{attrs:{data:t.punctuationCount,settings:t.punctuationCountSettings}})],1)]),t._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("ve-wordcloud",{attrs:{data:t.wordCloud,settings:t.wordCloudSettings}})],1)])]):t._e()],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"web-title"},[e("h1",[this._v("词频词性统计工具")])])}]};var u=s("VU/8")(d,l,!1,function(t){s("Xli1")},null,null).exports,v={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"pdf-merge"}})},staticRenderFns:[]};var p=s("VU/8")({name:"Pdf"},v,!1,function(t){s("37vu")},"data-v-b696737a",null).exports,_={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"about"}},[e("div",{staticClass:"intro-me",staticStyle:{"text-align":"left",margin:"10% 30%","font-size":"large"}},[this._v("\n    微信号：JChen2110 "),e("br"),this._v("\n    QQ号：971516583 "),e("br"),this._v("\n    邮箱：cj194832@163.com\n  ")])])}]};var m=s("VU/8")({name:"About"},_,!1,function(t){s("o14d")},"data-v-f9a866d4",null).exports;n.default.use(i.a);var h=new i.a({routes:[{path:"/",name:"Corpus",component:u},{path:"/corpus",name:"Corpus",component:u},{path:"/pdf",name:"Pdf",component:p},{path:"/about",name:"about",component:m}],mode:"history"}),w=s("vO7p"),b=s.n(w),f=(s("Jmt5"),s("9M+g"),s("Tqaz"));n.default.use(f.a),n.default.use(f.b),n.default.config.productionTip=!1,n.default.use(b.a),new n.default({el:"#app",router:h,components:{App:o},template:"<App/>"})},Xli1:function(t,e){},o14d:function(t,e){},wMQS:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7d0ba105c55f746bae36.js.map