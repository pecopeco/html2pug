(function(t){function e(e){for(var r,u,a=e[0],s=e[1],l=e[2],p=0,f=[];p<a.length;p++)u=a[p],i[u]&&f.push(i[u][0]),i[u]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(t[r]=s[r]);c&&c(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,a=1;a<n.length;a++){var s=n[a];0!==i[s]&&(r=!1)}r&&(o.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},i={app:0},o=[];function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],s=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var c=s;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"16c3":function(t,e,n){"use strict";(function(t){n.d(e,"a",function(){return _});n("7f7f"),n("386d"),n("ac6a"),n("4917"),n("3b2b"),n("a481"),n("28a5");var r,i,o,u,a,s,l,c,p,f,h,d,m,v,g,w,y=n("92d7"),b=n.n(y),x=n("e67e"),T=n.n(x),_={},C={}.hasOwnProperty,E=function(t,e){for(var n in e)C.call(e,n)&&(t[n]=e[n]);function r(){this.constructor=t}return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t};i=b.a,m=2,v=!1,p=!1,f={useNamedReferences:!0},w=/^[\w-]+$/,g=/^[\w-]+$/,u=function(){function t(t){this.options=null!=t?t:{}}return t.prototype.parse=function(t,e){var n;return t?(n={},n.document=T()(t),e(null,n)):e("null file")},t}(),d=function(t){return t=t?t.trim():"",t&&w.test(t)},h=function(t){return t=t?t.trim():"",t&&g.test(t)},l=function(){function t(t){var e,n,r;null==t&&(t={}),this.wrapLength=null!=(e=t.wrapLength)?e:80,this.scalate=null!=(n=t.scalate)&&n,this.attrSep=this.scalate||t.noattrcomma?" ":", ",t.double?(this.attrQuote='"',this.nonAttrQuote="'"):(this.attrQuote='"',this.nonAttrQuote='"'),this.attrQuoteEscaped="\\"+this.attrQuote,this.noEmptyPipe=null!=(r=t.noemptypipe)&&r}return t.prototype.tagHead=function(t){var e,n;return e="DIV"!==t.tagName?t.tagName.toLowerCase():"",t.id&&d(t.id)&&(e+="#"+t.id),t.hasAttribute("class")&&t.getAttribute("class").length>0&&(n=t.getAttribute("class").split(/\s+/).filter(function(t){return t&&h(t)}),e+="."+n.join(".")),0===e.length&&(e="div"),e},t.prototype.tagAttr=function(t,e){var n,r,i,o,u,a,s,l;if(null==e&&(e=""),o=t.attributes,o&&0!==o.length){for(a=[],s=0,l=o.length;s<l;s++)if(n=o[s],n&&n.nodeName){if(r=n.nodeName,i=n.nodeValue,"id"===r&&d(i))continue;"class"===r?(u=t.getAttribute("class").split(/\s+/).filter(function(t){return t&&!h(t)}),u.length>0&&a.push(this.buildTagAttr(r,u.join(" ")))):(i=i.replace(/(\r|\n)\s*/g,"\\$1"+e),a.push(this.buildTagAttr(r,i)))}return a.length>3?"(\n  "+e+a.join("\n  "+e)+"\n"+e+")":a.length>0?"("+a.join(" ")+")":""}return""},t.prototype.buildTagAttr=function(t,e){return t&&!e?t:-1===e.indexOf(this.attrQuote)?t+"="+this.attrQuote+e+this.attrQuote:-1===e.indexOf(this.nonAttrQuote)?t+"="+this.nonAttrQuote+e+this.nonAttrQuote:(e=e.replace(new RegExp(this.attrQuote,"g"),this.attrQuoteEscaped),t+"="+this.attrQuote+e+this.attrQuote)},t.prototype.tagText=function(t){var e,n;return 3!==(null!=(n=t.firstChild)?n.nodeType:void 0)?null:t.firstChild!==t.lastChild?null:(e=t.firstChild.data,e.length>this.wrapLength||e.match(/\r|\n/)?null:e)},t.prototype.forEachChild=function(t,e){var n,r;if(t){n=t.firstChild,r=[];while(n)e(n),r.push(n=n.nextSibling);return r}},t.prototype.writeTextContent=function(t,e,n){var r=this;return e.enter(),this.forEachChild(t,function(t){return r.writeText(t,e,n)}),e.leave()},t.prototype.writeText=function(t,e,n){var r,i,o=this;if(3===t.nodeType&&(r=t.data||"",r.length>0))return i=r.split(/\r|\n/),i.forEach(function(r){return o.writeTextLine(t,r,e,n)})},t.prototype.writeTextLine=function(t,e,n,r){var o,u,a,s,l,c,p,h,d,m,v,g,w=this;if(null==r&&(r={}),s=null==(p=r.pipe)||p,c=null==(h=r.wrap)||h,o=null!=(d=r.encodeEntityRef)&&d,u=null!=(m=r.escapeBackslash)&&m,(!s||!this.noEmptyPipe||0!==e.trim().length)&&(l=s?"| ":"",1!==(null!=t&&null!=(v=t.previousSibling)?v.nodeType:void 0)&&(e=e.trimLeft()),1!==(null!=t&&null!=(g=t.nextSibling)?g.nodeType:void 0)&&(e=e.trimRight()),e)){if(e.match(/^[ ]*$/))return;return o&&(e=i.encode(e,f)),u&&(e=e.replace("\\","\\\\")),!c||e.length<=this.wrapLength?n.writeln(l+e):(a=this.breakLine(e),1===a.length?n.writeln(l+e):a.forEach(function(e){return w.writeTextLine(t,e,n,r)}))}},t.prototype.breakLine=function(t){var e,n,r;if(!t||0===t.length)return[];if(t.search(!1))return[t];e=[],r=t.split(/\s+/),t="";while(r.length)n=r.shift(),t.length+n.length>this.wrapLength?(e.push(t),t=n):t.length?t+=" "+n:t=n;return t.length&&e.push(t),e},t}(),r=function(){function t(t){var e,n;this.options=null!=t?t:{},this.scalate=null!=(e=this.options.scalate)&&e,this.writer=null!=(n=this.options.writer)?n:new l(this.options)}return t.prototype.document=function(t,e){var n,r;return null!=t.doctype&&(r=t.doctype,n=void 0,null!=r.name&&"html"===r.name.toLowerCase()&&(n="html"),null!=n&&e.writeln("doctype "+n)),t.documentElement?this.children(t,e,!1):this.element(t,e)},t.prototype.element=function(t,e){var n,r,o,u,a;if(null!=t?t.tagName:void 0)return u=t.tagName.toLowerCase(),o=this.writer.tagHead(t),r=this.writer.tagAttr(t,e.indents),a=this.writer.tagText(t),"script"!==u&&"style"!==u?"conditional"===u?(e.writeln("//"+t.getAttribute("condition")),this.children(t,e)):-1!==["pre"].indexOf(u)?(e.writeln(o+r+"."),e.enter(),n=!0,this.writer.forEachChild(t,function(t){var r;if(3===t.nodeType&&(r=t.data,null!=r&&r.length>0))return n&&(0===r.search(/\r\n|\r|\n/)&&(r=r.replace(/\r\n|\r|\n/,"")),r="\\n"+r,n=!1),r=r.replace(/\t/g,"\\t"),r=r.replace(/\r\n|\r|\n/g,"\n"+e.indents),e.write(r)}),e.writeln(),e.leave()):!this.options.bodyless||"html"!==u&&"body"!==u?a?p?e.writeln(o+r+" "+a):e.writeln(o+r+" "+i.encode(a,f)):(e.writeln(o+r),this.children(t,e)):this.children(t,e,!1):t.hasAttribute("src")?(e.writeln(o+r),this.writer.writeTextContent(t,e,{pipe:!1,wrap:!1})):"script"===u?this.script(t,e,o,r):"style"===u?this.style(t,e,o,r):void 0},t.prototype.children=function(t,e,n){var r=this;if(null==n&&(n=!0),n&&e.enter(),this.writer.forEachChild(t,function(n){var i;return i=n.nodeType,1===i?r.element(n,e):3===i?"code"===t._nodeName?r.text(n,e,{encodeEntityRef:!0,pipe:!0}):r.text(n,e,p?{encodeEntityRef:!1}:{encodeEntityRef:!0}):8===i?r.comment(n,e):void 0}),n)return e.leave()},t.prototype.text=function(t,e,n){return t.normalize(),this.writer.writeText(t,e,n)},t.prototype.comment=function(t,e){var n,r,i,o=this;return n=t.data.match(/\s*\[(if\s+[^\]]+)\]/),n?this.conditional(t,n[1],e):(r=t.data||"",0===r.length||-1===r.search(/\r|\n/)?e.writeln("// "+r.trim()):(e.writeln("//"),e.enter(),i=r.split(/\r|\n/),i.forEach(function(n){return o.writer.writeTextLine(t,n,e,{pipe:!1,trim:!0,wrap:!1})}),e.leave()))},t.prototype.conditional=function(t,e){var n,r;return r=t.textContent.trim().replace(/\s*\[if\s+[^\]]+\]>\s*/,"").replace("<![endif]",""),0===r.indexOf("<!")&&(e=" ["+e+"] <!",r=null),n=t.ownerDocument.createElement("conditional"),n.setAttribute("condition",e),r&&(n.innerHTML=r),t.parentNode.insertBefore(n,t.nextSibling)},t.prototype.script=function(t,e,n,r){return this.scalate?(e.writeln(":javascript"),this.writer.writeTextContent(t,e,{pipe:!1,wrap:!1})):(e.writeln(""+n+r+"."),this.writer.writeTextContent(t,e,{pipe:!1,trim:!0,wrap:!1,escapeBackslash:!0}))},t.prototype.style=function(t,e,n,r){return this.scalate?(e.writeln(":css"),this.writer.writeTextContent(t,e,{pipe:!1,wrap:!1})):(e.writeln(""+n+r+"."),this.writer.writeTextContent(t,e,{pipe:!1,trim:!0,wrap:!1}))},t}(),o=function(){function t(){this.indents=""}return t.prototype.enter=function(){var t;if(v)return this.indents+="\t";t=[];for(var e=1;1<=m?e<=m:e>=m;1<=m?++e:--e)t.push(this.indents+=" ");return t},t.prototype.leave=function(){return this.indents=v?this.indents.substring(1):this.indents.substring(m)},t.prototype.write=function(t,e){null==e&&(e=!0)},t.prototype.writeln=function(t,e){null==e&&(e=!0)},t}(),s=function(t){function e(){e.__super__.constructor.apply(this,arguments),this.fragments=[]}return E(e,t),e.prototype.write=function(t,e){return null==e&&(e=!0),null==t&&(t=""),e?this.fragments.push(this.indents+t):this.fragments.push(t)},e.prototype.writeln=function(t,e){return null==e&&(e=!0),null==t&&(t=""),e?this.fragments.push(this.indents+t+"\n"):this.fragments.push(t+"\n")},e.prototype.final=function(){var t;return t=this.fragments.join(""),this.fragments=[],t},e}(o),a=function(t){function e(t){this.stream=t,e.__super__.constructor.apply(this,arguments)}return E(e,t),e.prototype.write=function(t,e){return null==e&&(e=!0),null==t&&(t=""),e?this.stream.write(this.indents+t):this.stream.write(t)},e.prototype.writeln=function(t,e){return null==e&&(e=!0),null==t&&(t=""),e?this.stream.write(this.indents+t+"\n"):this.stream.write(t+"\n")},e}(o),_.Output=o,_.StringOutput=s,_.Converter=r,_.Writer=l,c=function(t){if(null!=t.numeric&&(f.useNamedReferences=!t.numeric),null!=t.nspaces&&(m=parseInt(t.nspaces)),null!=t.tabs&&(v=!!t.tabs),null!=t.donotencode)return p=!!t.donotencode},"undefined"!==typeof exports&&null!==exports&&(_.Parser=u,_.StreamOutput=a,_.convert=function(e,n,i){return null==i&&(i={}),c(i),null==i.parser&&(i.parser=new u(i)),i.parser.parse(e,function(e,o){return(null!=e?e.length:void 0)?e:(null==n&&(n=new a(t.stdout)),null==i.converter&&(i.converter=new r(i)),i.converter.document(o.document,n))})}),_.convertHtml=function(t,e,n){return null==e&&(e={}),c(e),null==e.parser&&(e.parser=new u(e)),e.parser.parse(t,function(t,i){var o,u;return(null!=t?t.length:void 0)?t:(o=null!=(u=e.output)?u:new s,null==e.converter&&(e.converter=new r(e)),e.converter.document(i.document,o),null!=n?n(null,o.final()):void 0)})}}).call(this,n("f28c"))},"359c":function(t,e,n){t.exports=n.p+"static/img/github.c8118bf2.png"},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],u={name:"app",data:function(){return{}}},a=u,s=(n("7faf"),n("2877")),l=Object(s["a"])(a,i,o,!1,null,null,null),c=l.exports,p=n("8c4f");r["a"].use(p["a"]);var f=new p["a"]({routes:[{path:"/",name:"home",component:n("bb51").default},{path:"*",redirect:"/"}]}),h=n("2f62");r["a"].use(h["a"]);var d=new h["a"].Store({state:{userInfo:""},mutations:{SET_USER:function(t,e){t.userInfo=e}},actions:{fetchUserInfo:function(t,e){var n=t.commit,r=t.state;console.log(r),n("SET_USER",{name:e})}}}),m={api_url:"https://baidu.com"},v=n("6829"),g=n.n(v),w=n("d399");n("c2d8");function y(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r=e;if("post"===n||"delete"===n||"put"===n){var i=new FormData;for(var o in e)i.append(o,e[o]);r=i}return g.a.request(t,r,{method:n,timeout:5e3}).then(function(t){return"delete"===n||204===t.status?t.text():"T"===t.data.state?t.data:void Object(w["a"])(JSON.parse(t.data).error.msg)}).catch(function(t){var e={200:"服务器成功返回请求的数据.",201:"新建或修改数据成功.",202:"一个请求已经进入后台排队（异步任务）.",204:"删除数据成功.",400:"发出的请求有错误，服务器没有进行新建或修改数据的操作.",401:"用户没有权限（令牌、用户名、密码错误）.",403:"用户得到授权，但是访问是被禁止的.",404:"发出的请求针对的是不存在的记录，服务器没有进行操作.",406:"请求的格式不可得",410:"请求的资源被永久删除，且不会再得到的.",422:"当创建一个对象时，发生一个验证错误.",500:"服务器发生错误，请检查服务器.",502:"网关错误",503:"服务不可用，服务器暂时过载或维护.",504:"网关超时"};if(t.status>=300){var n=e[t.status]||t.response.statusText;Object(w["a"])(n)}})}r["a"].config.productionTip=!1,r["a"].prototype.$config=m,r["a"].prototype.Toast=w["a"],y.get=function(t,e){return y(t,e,"get")},y.post=function(t,e){return y(t,e,"post")},y.delete=function(t,e){return y(t,e,"delete")},y.put=function(t,e){return y(t,e,"put")},r["a"].prototype.$http=y,new r["a"]({router:f,store:d,render:function(t){return t(c)}}).$mount("#app")},"7faf":function(t,e,n){"use strict";var r=n("8fba"),i=n.n(r);i.a},"8fba":function(t,e,n){},"97f6":function(t,e,n){"use strict";var r=n("f3e1"),i=n.n(r);i.a},bb51:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[t._m(0),n("div",{staticClass:"text-wrap"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"text",domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}}),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.pugText,expression:"pugText"}],staticClass:"pugText",domProps:{value:t.pugText},on:{input:function(e){e.target.composing||(t.pugText=e.target.value)}}})]),n("div",{staticClass:"footer"},[t._v("a Conversion tool built from vue + pug + stylus ")])])},i=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"header"},[r("span",[t._v("HTML to Pug")]),r("a",{attrs:{href:"https://github.com/pecopeco/html2pug",target:"_blank"}},[r("img",{attrs:{src:n("359c")}})])])}],o=n("16c3"),u={name:"home",components:{},data:function(){return{text:"",pugText:""}},watch:{text:function(t){var e=this;o["a"].convertHtml(t,{},function(t,n){e.pugText=n,console.log(n)})}},methods:{},mounted:function(){}},a=u,s=(n("97f6"),n("2877")),l=Object(s["a"])(a,r,i,!1,null,"5f7c0a27",null);e["default"]=l.exports},f3e1:function(t,e,n){}});
//# sourceMappingURL=app.da7208e8.js.map