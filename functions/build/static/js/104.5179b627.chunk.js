(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[104],{1702:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var n=a(43),r=a(37),l=a(1634),i=a(10),c=a(0),o=a.n(c),s=a(1668),m=a(5);var u=function(e){var t=Object(m.c)((function(e){return e.fuse.settings.mainThemeDark}));return o.a.createElement("div",{className:e.classes.header},e.header&&o.a.createElement(s.a,{theme:t},e.header))},d=a(17),p=a(1638),f=a(1660);var b=function(e){var t=Object(m.c)((function(e){return e.fuse.settings.mainThemeDark})),a=e.classes;return o.a.createElement(o.a.Fragment,null,e.header&&o.a.createElement(s.a,{theme:t},o.a.createElement("div",{className:Object(i.a)(a.sidebarHeader,e.variant)},e.header)),e.content&&o.a.createElement(r.a,{className:a.sidebarContent,enable:e.innerScroll},e.content))};var E=o.a.forwardRef((function(e,t){var a=Object(c.useState)(!1),n=Object(d.a)(a,2),r=n[0],l=n[1],s=e.classes;Object(c.useImperativeHandle)(t,(function(){return{toggleSidebar:m}}));var m=function(){l(!r)};return o.a.createElement(o.a.Fragment,null,o.a.createElement(f.a,{lgUp:"permanent"===e.variant},o.a.createElement(p.a,{variant:"temporary",anchor:e.position,open:r,onClose:function(e){return m()},classes:{root:Object(i.a)(s.sidebarWrapper,e.variant),paper:Object(i.a)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:s.backdrop}},style:{position:"absolute"}},o.a.createElement(b,e))),"permanent"===e.variant&&o.a.createElement(f.a,{mdDown:!0},o.a.createElement(p.a,{variant:"permanent",className:Object(i.a)(s.sidebarWrapper,e.variant),open:r,classes:{paper:Object(i.a)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)}},o.a.createElement(b,e))))})),h=Object(l.a)((function(e){return{root:{display:"flex",flexDirection:"row",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},topBg:{position:"absolute",left:0,right:0,top:0,height:200,background:"linear-gradient(to right, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),backgroundSize:"cover",pointerEvents:"none"},contentWrapper:Object(n.a)({display:"flex",flexDirection:"column",padding:"0 3.2rem",flex:"1 1 100%",zIndex:2,maxWidth:"100%",minWidth:0,minHeight:0},e.breakpoints.down("xs"),{padding:"0 1.6rem"}),header:{height:136,minHeight:136,maxHeight:136,display:"flex",color:e.palette.primary.contrastText},headerSidebarToggleButton:{color:e.palette.primary.contrastText},contentCard:{display:"flex",flex:"1 1 100%",flexDirection:"column",backgroundColor:e.palette.background.paper,boxShadow:e.shadows[1],minHeight:0,borderRadius:"8px 8px 0 0"},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(e.palette.divider)},content:{flex:"1 1 auto",height:"100%",overflow:"auto","-webkit-overflow-scrolling":"touch"},sidebarWrapper:{position:"absolute",backgroundColor:"transparent",zIndex:5,overflow:"hidden","&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{zIndex:1,position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent",position:"relative",border:"none",overflow:"hidden"}),width:240,height:"100%"},leftSidebar:{},rightSidebar:{},sidebarHeader:{height:200,minHeight:200,color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark,"&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent"})},sidebarContent:Object(n.a)({display:"flex",flex:"1 1 auto",flexDirection:"column",backgroundColor:e.palette.background.default,color:e.palette.text.primary},e.breakpoints.up("lg"),{overflow:"auto","-webkit-overflow-scrolling":"touch"}),backdrop:{position:"absolute"}}})),v=o.a.forwardRef((function(e,t){var a=Object(c.useRef)(null),n=Object(c.useRef)(null),l=Object(c.useRef)(null),s=h(e),m=e.rightSidebarHeader||e.rightSidebarContent,d=e.leftSidebarHeader||e.leftSidebarContent;return o.a.useImperativeHandle(t,(function(){return{rootRef:l,toggleLeftSidebar:function(){a.current.toggleSidebar()},toggleRightSidebar:function(){n.current.toggleSidebar()}}})),o.a.createElement("div",{className:Object(i.a)(s.root,e.innerScroll&&s.innerScroll),ref:l},o.a.createElement("div",{className:s.topBg}),o.a.createElement("div",{className:"flex container w-full"},d&&o.a.createElement(E,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:s,ref:a,rootRef:l}),o.a.createElement("div",{className:Object(i.a)(s.contentWrapper,d&&(void 0===e.leftSidebarVariant||"permanent"===e.leftSidebarVariant)&&"lg:ltr:pl-0 lg:rtl:pr-0",m&&(void 0===e.rightSidebarVariant||"permanent"===e.rightSidebarVariant)&&"lg:pr-0")},o.a.createElement(u,{header:e.header,classes:s}),o.a.createElement("div",{className:Object(i.a)(s.contentCard,e.innerScroll&&"inner-scroll")},e.contentToolbar&&o.a.createElement("div",{className:s.toolbar},e.contentToolbar),e.content&&o.a.createElement(r.a,{className:s.content,enable:e.innerScroll,scrollToTopOnRouteChange:e.innerScroll},e.content))),m&&o.a.createElement(E,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:s,ref:n,rootRef:l})))}));v.defaultProps={};var g=o.a.memo(v)},1797:function(e,t,a){"use strict";var n=a(1),r=a(3),l=a(0),i=(a(2),a(6)),c=a(9),o=l.forwardRef((function(e,t){var a=e.classes,c=e.className,o=e.dividers,s=void 0!==o&&o,m=Object(r.a)(e,["classes","className","dividers"]);return l.createElement("div",Object(n.a)({className:Object(i.a)(a.root,c,s&&a.dividers),ref:t},m))}));t.a=Object(c.a)((function(e){return{root:{flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"8px 24px","&:first-child":{paddingTop:20}},dividers:{padding:"16px 24px",borderTop:"1px solid ".concat(e.palette.divider),borderBottom:"1px solid ".concat(e.palette.divider)}}}),{name:"MuiDialogContent"})(o)},1811:function(e,t,a){"use strict";var n=a(1),r=a(3),l=a(0),i=(a(2),a(6)),c=a(9),o=l.forwardRef((function(e,t){var a=e.disableSpacing,c=void 0!==a&&a,o=e.classes,s=e.className,m=Object(r.a)(e,["disableSpacing","classes","className"]);return l.createElement("div",Object(n.a)({className:Object(i.a)(o.root,s,!c&&o.spacing),ref:t},m))}));t.a=Object(c.a)({root:{display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiDialogActions"})(o)},2395:function(e,t){e.exports=m,e.exports.match=function(e,t){var a=[];return r(m(e,a,t),a)},e.exports.regexpToFunction=r,e.exports.parse=n,e.exports.compile=function(e,t){return l(n(e,t),t)},e.exports.tokensToFunction=l,e.exports.tokensToRegExp=s;var a=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function n(e,t){for(var n,r=[],l=0,o=0,s="",m=t&&t.delimiter||"/",u=t&&t.whitelist||void 0,d=!1;null!==(n=a.exec(e));){var p=n[0],f=n[1],b=n.index;if(s+=e.slice(o,b),o=b+p.length,f)s+=f[1],d=!0;else{var E="",h=n[2],v=n[3],g=n[4],x=n[5];if(!d&&s.length){var y=s.length-1,j=s[y];(!u||u.indexOf(j)>-1)&&(E=j,s=s.slice(0,y))}s&&(r.push(s),s="",d=!1);var O="+"===x||"*"===x,S="?"===x||"*"===x,N=v||g,A=E||m;r.push({name:h||l++,prefix:E,delimiter:A,optional:S,repeat:O,pattern:N?c(N):"[^"+i(A===m?A:A+m)+"]+?"})}}return(s||o<e.length)&&r.push(s+e.substr(o)),r}function r(e,t){return function(a,n){var r=e.exec(a);if(!r)return!1;for(var l=r[0],i=r.index,c={},o=n&&n.decode||decodeURIComponent,s=1;s<r.length;s++)if(void 0!==r[s]){var m=t[s-1];m.repeat?c[m.name]=r[s].split(m.delimiter).map((function(e){return o(e,m)})):c[m.name]=o(r[s],m)}return{path:l,index:i,params:c}}}function l(e,t){for(var a=new Array(e.length),n=0;n<e.length;n++)"object"===typeof e[n]&&(a[n]=new RegExp("^(?:"+e[n].pattern+")$",o(t)));return function(t,n){for(var r="",l=n&&n.encode||encodeURIComponent,i=!n||!1!==n.validate,c=0;c<e.length;c++){var o=e[c];if("string"!==typeof o){var s,m=t?t[o.name]:void 0;if(Array.isArray(m)){if(!o.repeat)throw new TypeError('Expected "'+o.name+'" to not repeat, but got array');if(0===m.length){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to not be empty')}for(var u=0;u<m.length;u++){if(s=l(m[u],o),i&&!a[c].test(s))throw new TypeError('Expected all "'+o.name+'" to match "'+o.pattern+'"');r+=(0===u?o.prefix:o.delimiter)+s}}else if("string"!==typeof m&&"number"!==typeof m&&"boolean"!==typeof m){if(!o.optional)throw new TypeError('Expected "'+o.name+'" to be '+(o.repeat?"an array":"a string"))}else{if(s=l(String(m),o),i&&!a[c].test(s))throw new TypeError('Expected "'+o.name+'" to match "'+o.pattern+'", but got "'+s+'"');r+=o.prefix+s}}else r+=o}return r}}function i(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function c(e){return e.replace(/([=!:$/()])/g,"\\$1")}function o(e){return e&&e.sensitive?"":"i"}function s(e,t,a){for(var n=(a=a||{}).strict,r=!1!==a.start,l=!1!==a.end,c=a.delimiter||"/",s=[].concat(a.endsWith||[]).map(i).concat("$").join("|"),m=r?"^":"",u=0;u<e.length;u++){var d=e[u];if("string"===typeof d)m+=i(d);else{var p=d.repeat?"(?:"+d.pattern+")(?:"+i(d.delimiter)+"(?:"+d.pattern+"))*":d.pattern;t&&t.push(d),d.optional?d.prefix?m+="(?:"+i(d.prefix)+"("+p+"))?":m+="("+p+")?":m+=i(d.prefix)+"("+p+")"}}if(l)n||(m+="(?:"+i(c)+")?"),m+="$"===s?"$":"(?="+s+")";else{var f=e[e.length-1],b="string"===typeof f?f[f.length-1]===c:void 0===f;n||(m+="(?:"+i(c)+"(?="+s+"))?"),b||(m+="(?="+i(c)+"|"+s+")")}return new RegExp(m,o(a))}function m(e,t,a){return e instanceof RegExp?function(e,t){if(!t)return e;var a=e.source.match(/\((?!\?)/g);if(a)for(var n=0;n<a.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return e}(e,t):Array.isArray(e)?function(e,t,a){for(var n=[],r=0;r<e.length;r++)n.push(m(e[r],t,a).source);return new RegExp("(?:"+n.join("|")+")",o(a))}(e,t,a):function(e,t,a){return s(n(e,a),t,a)}(e,t,a)}},4079:function(e,t,a){"use strict";a.r(t);var n=a(1702),r=a(293),l=a(0),i=a.n(l),c=a(5),o=a(103),s=a(17),m=a(128),u=a(8),d=a(1684),p=a(1674),f=a(1647),b=a(830),E=a(244),h=a(154),v=a(1634),g=a(10),x=Object(v.a)((function(e){return{root:{display:"flex",alignItems:"center",height:21,borderRadius:2,padding:"0 6px",fontSize:11,backgroundColor:"rgba(0,0,0,.08);"},color:{width:8,height:8,marginRight:4,borderRadius:"50%"}}}));var y=function(e){var t=x();return i.a.createElement("div",{className:Object(g.a)(t.root,e.className)},i.a.createElement("div",{className:t.color,style:{backgroundColor:e.color}}),i.a.createElement("div",null,e.title))},j=a(58),O=a.n(j),S="[MAIL APP] GET MAILS";function N(){return function(e,t){var a=t().mailApp.mails.routeParams;return O.a.get("/api/mail-app/mails",{params:a}).then((function(t){return e({type:"[MAIL APP] UPDATE MAILS",payload:t.data})}))}}function A(e,t){return{type:"[MAILS] SELECT MAILS BY PARAMETER",payload:{parameter:e,value:t}}}function L(e){return function(t,a){var n=a().mailApp.mails.selectedMailIds;return O.a.post("/api/mail-app/set-folder",{selectedMailIds:n,folderId:e}).then((function(e){return t({type:"[MAILS] SET FOLDER ON SELECTED MAILS"}),t(N())}))}}var I=a(4),k="[MAIL APP] GET MAIL",C="[MAIL APP] UPDATE MAIL";function w(e){var t=O.a.post("/api/mail-app/update-mail",e);return function(e){return t.then((function(t){return e({type:C,payload:t.data})}))}}var T="[MAIL APP] GET FOLDERS";var M="[MAIL APP] GET LABELS";var R="[MAIL APP] GET FILTERS";var P=Object(o.j)((function(e){var t=Object(c.b)(),a=Object(c.c)((function(e){return e.mailApp.mail})),n=Object(c.c)((function(e){return e.mailApp.labels})),r=Object(o.i)(),v=Object(l.useState)(!1),g=Object(s.a)(v,2),x=g[0],j=g[1];return Object(h.b)((function(){t(function(e){var t=O.a.get("/api/mail-app/mail",{params:e});return function(a){return t.then((function(t){return a({type:k,routeParams:e,payload:t.data})}))}}(r))}),[t,r]),a?i.a.createElement("div",{className:"p-16 sm:p-24"},i.a.createElement("div",{className:"flex items-center justify-between overflow-hidden"},i.a.createElement("div",{className:"flex flex-col"},i.a.createElement(m.a,{delay:100},i.a.createElement(E.a,{variant:"subtitle1",className:"flex"},a.subject)),n&&a.labels.length>0&&i.a.createElement("div",{className:"flex flex-wrap mt-8 -mx-2"},a.labels.map((function(e){return i.a.createElement(y,{className:"mt-4 mx-2",title:u.a.find(n,{id:e}).title,color:u.a.find(n,{id:e}).color,key:e})}))))),i.a.createElement(p.a,{className:"my-16"}),i.a.createElement(m.a,{animation:"transition.slideUpIn",delay:200},i.a.createElement("div",null,i.a.createElement("div",{className:"flex items-start justify-between"},i.a.createElement("div",{className:"flex items-center justify-start"},a.from.avatar?i.a.createElement(d.a,{alt:a.from.name,src:a.from.avatar}):i.a.createElement(d.a,null,a.from.name[0]),i.a.createElement("div",{className:"flex flex-col mx-8"},i.a.createElement("span",null,a.from.name),i.a.createElement(E.a,{component:"div",color:"textSecondary",variant:"body1",className:"flex items-center justify-start"},i.a.createElement("div",null,"to"),i.a.createElement("div",{className:"mx-4"},a.to[0].name)))),i.a.createElement(b.a,null,i.a.createElement(f.a,null,"more_vert"))),i.a.createElement("div",{className:"my-16"},i.a.createElement(E.a,{color:"primary",className:"cursor-pointer underline mb-8",onClick:function(){j(!x)}},x?i.a.createElement("span",null,"Hide Details"):i.a.createElement("span",null,"Show Details")),x&&i.a.createElement("div",{className:"flex"},i.a.createElement(E.a,{variant:"body2",className:"flex flex-col"},i.a.createElement("span",null,"From:"),i.a.createElement("span",null,"To:"),i.a.createElement("span",null,"Date:")),i.a.createElement(E.a,{variant:"body2",color:"textSecondary",className:"px-4 flex flex-col"},i.a.createElement("span",null,a.from.email),i.a.createElement("span",null,a.to[0].email),i.a.createElement("span",null,a.time)))),i.a.createElement(E.a,{variant:"body2",dangerouslySetInnerHTML:{__html:a.message}}),i.a.createElement(p.a,{className:"my-16"}),a.attachments&&i.a.createElement("div",null,i.a.createElement(E.a,{variant:"subtitle1",className:"mb-16"},i.a.createElement("span",{className:"mx-4"},"Attachments"),i.a.createElement("span",null,"(",a.attachments.length,")")),i.a.createElement("div",{className:"flex flex-wrap -mx-8"},a.attachments.map((function(e){return i.a.createElement("div",{className:"w-192 px-8 pb-16",key:e.fileName},i.a.createElement("img",{className:"w-full rounded-4",src:e.preview,alt:e.fileName}),i.a.createElement("div",{className:"flex flex-col"},i.a.createElement(E.a,{color:"primary",className:"underline cursor-pointer",onClick:function(e){return e.preventDefault()}},"View"),i.a.createElement(E.a,{color:"primary",className:"underline cursor-pointer",onClick:function(e){return e.preventDefault()}},"Download"),i.a.createElement(E.a,null,"(",e.size,")")))}))))))):null})),D=a(51),H=a(2395);var B=Object(o.j)((function(e){var t=Object(c.b)(),a=Object(c.c)((function(e){return e.mailApp.mail})),n=Object(D.a)(),r=H.compile(e.match.path),l=Object(o.i)(),s=Object(I.a)({},l);delete s.mailId;var u=r(s);return a?i.a.createElement("div",{className:"flex flex-1 items-center justify-between overflow-hidden sm:px-16"},i.a.createElement(b.a,{onClick:function(){return e.history.push(u)}},i.a.createElement(f.a,null,"ltr"===n.direction?"arrow_back":"arrow_forward")),i.a.createElement("div",{className:"flex items-center justify-start","aria-label":"Toggle star"},i.a.createElement(m.a,{animation:"transition.expandIn",delay:100},i.a.createElement(b.a,{onClick:function(){return t(function(e){var t=Object(I.a)(Object(I.a)({},e),{},{starred:!e.starred});return function(e){return e({type:"[MAIL APP] TOGGLE STAR MAIL"}),e(w(t))}}(a))}},a.starred?i.a.createElement(f.a,null,"star"):i.a.createElement(f.a,null,"star_border"))),i.a.createElement(m.a,{animation:"transition.expandIn",delay:100},i.a.createElement(b.a,{onClick:function(){return t(function(e){var t=Object(I.a)(Object(I.a)({},e),{},{important:!e.important});return function(e){return e({type:"[MAIL APP] TOGGLE IMPORTANT MAIL"}),e(w(t))}}(a))}},a.important?i.a.createElement(f.a,null,"label"):i.a.createElement(f.a,null,"label_outline"))))):null})),W=a(1660),G=a(740),U=a(242),z=a(1668),F=a(64);var _=function(e){var t=Object(c.b)(),a=Object(c.c)((function(e){return e.mailApp.mails.searchText})),n=Object(c.c)((function(e){return e.fuse.settings.mainTheme})),r=Object(F.b)("mailApp").t;return i.a.createElement(z.a,{theme:n},i.a.createElement("div",{className:"flex flex-1"},i.a.createElement(U.a,{className:"flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8",elevation:1},i.a.createElement(W.a,{lgUp:!0},i.a.createElement(b.a,{onClick:function(t){return e.pageLayout.current.toggleLeftSidebar()},"aria-label":"open left sidebar"},i.a.createElement(f.a,null,"menu"))),i.a.createElement(f.a,{color:"action"},"search"),i.a.createElement(G.a,{placeholder:r("SEARCH_PLACEHOLDER"),className:"px-16",disableUnderline:!0,fullWidth:!0,value:a,inputProps:{"aria-label":"Search"},onChange:function(e){return t({type:"[MAILS] SET SEARCH TEXT",searchText:e.target.value.toLowerCase()})}}))))},V=a(114),$=a(1607),Y=a(1608),J=a(1655),X=a(1673),q=a(1669),K=a(1652),Q=a(1664),Z=a(1811),ee=a(1797),te=a(1657),ae=a(1654),ne=Object(v.a)({root:{fontSize:13,backgroundColor:"rgba(0, 0, 0, 0.08)",border:"1px solid rgba(0, 0, 0, 0.16)",paddingLeft:16,marginBottom:8,borderRadius:2,display:"flex",justifyContent:"space-between",alignItems:"center"},filename:{fontWeight:600},size:{marginLeft:8,fontWeight:300}});var re=function(e){var t=ne();return i.a.createElement("div",{className:Object(g.a)(t.root,e.className)},i.a.createElement("div",{className:"flex"},i.a.createElement(E.a,{variant:"caption",className:t.filename},e.fileName),i.a.createElement(E.a,{variant:"caption",className:t.size},"(",e.size,")")),i.a.createElement(b.a,null,i.a.createElement(f.a,{className:"text-16"},"close")))};var le=function(){var e=Object(l.useState)(!1),t=Object(s.a)(e,2),a=t[0],n=t[1],r=Object(h.c)({from:"johndoe@creapond.com",to:"",cc:"",bcc:"",subject:"",message:""}),c=r.form,o=r.handleChange,m=Object(F.b)("mailApp").t;return i.a.createElement("div",{className:"p-24"},i.a.createElement(K.a,{variant:"contained",color:"primary",className:"w-full",onClick:function(){n(!0)}},m("COMPOSE")),i.a.createElement(Q.a,{open:a,onClose:function(){n(!1)},"aria-labelledby":"form-dialog-title"},i.a.createElement(q.a,{position:"static"},i.a.createElement(ae.a,{className:"flex w-full"},i.a.createElement(E.a,{variant:"subtitle1",color:"inherit"},"New Message"))),i.a.createElement("form",{noValidate:!0,onSubmit:function(e){e.preventDefault(),n(!1)},className:"flex flex-col"},i.a.createElement(ee.a,{classes:{root:"p-16 pb-0 sm:p-24 sm:pb-0"}},i.a.createElement(te.a,{className:"mt-8 mb-16",label:"From",id:"from",name:"from",value:c.from,onChange:o,variant:"outlined",fullWidth:!0,disabled:!0}),i.a.createElement(te.a,{className:"mt-8 mb-16",label:"To",autoFocus:!0,id:"to",name:"to",value:c.to,onChange:o,variant:"outlined",fullWidth:!0,required:!0}),i.a.createElement(te.a,{className:"mt-8 mb-16",label:"Cc",id:"cc",name:"cc",value:c.cc,onChange:o,variant:"outlined",fullWidth:!0}),i.a.createElement(te.a,{className:"mt-8 mb-16",label:"Bcc",id:"bcc",name:"bcc",value:c.bcc,onChange:o,variant:"outlined",fullWidth:!0}),i.a.createElement(te.a,{className:"mt-8 mb-16",label:"Subject",id:"subject",name:"subject",value:c.subject,onChange:o,variant:"outlined",fullWidth:!0}),i.a.createElement(te.a,{className:"mt-8 mb-16",id:"message",name:"message",onChange:o,value:c.message,label:"Message",type:"text",multiline:!0,rows:5,variant:"outlined",fullWidth:!0}),i.a.createElement("div",{className:"pt-8"},i.a.createElement(re,{fileName:"attachment-2.doc",size:"12 kb"}),i.a.createElement(re,{fileName:"attachment-1.jpg",size:"350 kb"}))),i.a.createElement(Z.a,{className:"justify-between p-8"},i.a.createElement("div",{className:"px-16"},i.a.createElement(K.a,{variant:"contained",color:"primary",type:"submit"},"Send"),i.a.createElement(b.a,null,i.a.createElement(f.a,null,"attach_file"))),i.a.createElement(b.a,{onClick:function(){n(!1)}},i.a.createElement(f.a,null,"delete"))))))},ie=Object(v.a)((function(e){return{listItem:{color:"inherit!important",textDecoration:"none!important",height:40,width:"calc(100% - 16px)",borderRadius:"0 20px 20px 0",paddingLeft:24,paddingRight:12,"&.active":{backgroundColor:e.palette.secondary.main,color:"".concat(e.palette.secondary.contrastText,"!important"),pointerEvents:"none","& .list-item-icon":{color:"inherit"}},"& .list-item-icon":{fontSize:16,width:16,height:16,marginRight:16}},listSubheader:{paddingLeft:24}}}));var ce=function(e){var t=Object(c.c)((function(e){return e.mailApp.folders})),a=Object(c.c)((function(e){return e.mailApp.labels})),n=Object(c.c)((function(e){return e.mailApp.filters})),r=ie(),l=Object(F.b)("mailApp").t;return i.a.createElement(m.a,{animation:"transition.slideUpIn",delay:400},i.a.createElement("div",{className:"flex-auto border-l-1"},i.a.createElement(le,null),i.a.createElement("div",null,i.a.createElement($.a,null,i.a.createElement(X.a,{className:r.listSubheader,disableSticky:!0},l("FOLDERS")),t.length>0&&t.map((function(e){return i.a.createElement(Y.a,{button:!0,component:V.a,to:"/apps/mail/".concat(e.handle),key:e.id,activeClassName:"active",className:r.listItem},i.a.createElement(f.a,{className:"list-item-icon",color:"action"},e.icon),i.a.createElement(J.a,{primary:e.translate?l(e.translate):e.title,disableTypography:!0}))}))),i.a.createElement($.a,null,i.a.createElement(X.a,{className:r.listSubheader,disableSticky:!0},l("FILTERS")),n.length>0&&n.map((function(e){return i.a.createElement(Y.a,{button:!0,component:V.a,to:"/apps/mail/filter/".concat(e.handle),activeClassName:"active",className:r.listItem,key:e.id},i.a.createElement(f.a,{className:"list-item-icon",color:"action"},e.icon),i.a.createElement(J.a,{primary:e.translate?l(e.translate):e.title,disableTypography:!0}))}))),i.a.createElement($.a,null,i.a.createElement(X.a,{className:r.listSubheader,disableSticky:!0},l("LABELS")),a&&a.map((function(e){return i.a.createElement(Y.a,{button:!0,component:V.a,to:"/apps/mail/label/".concat(e.handle),key:e.id,className:r.listItem},i.a.createElement(f.a,{className:"list-item-icon",style:{color:e.color},color:"action"},"label"),i.a.createElement(J.a,{primary:e.title,disableTypography:!0}))}))))))},oe=a(1649),se={creapond:"johndoe@creapond.com",withinpixels:"johndoe@withinpixels.com"};var me=function(e){var t=Object(l.useState)("creapond"),a=Object(s.a)(t,2),n=a[0],r=a[1],c=Object(F.b)("mailApp").t;return i.a.createElement("div",{className:"flex flex-col justify-center h-full p-24"},i.a.createElement("div",{className:"flex items-center flex-1"},i.a.createElement(m.a,{animation:"transition.expandIn",delay:300},i.a.createElement(f.a,{className:"text-32"},"mail")),i.a.createElement(m.a,{animation:"transition.slideLeftIn",delay:300},i.a.createElement("span",{className:"text-24 mx-16"},c("APP_TITLE")))),i.a.createElement(m.a,{animation:"transition.slideUpIn",delay:300},i.a.createElement(te.a,{id:"account-selection",select:!0,label:n,value:n,onChange:function(e){r(e.target.value)},placeholder:"Select Account",margin:"normal"},Object.keys(se).map((function(e,t){return i.a.createElement(oe.a,{key:e,value:e},se[e])})))))},ue=a(205),de=a(30),pe=a(1659),fe=a(2395),be=Object(v.a)((function(e){return{mailItem:{borderBottom:"1px solid  ".concat(e.palette.divider),"&.unread":{background:"rgba(0,0,0,0.03)"},"&.selected":{"&::after":{content:'""',position:"absolute",left:0,display:"block",height:"100%",width:3,backgroundColor:e.palette.primary.main}}},avatar:{backgroundColor:e.palette.primary[500]}}})),Ee=Object(o.j)((function(e){var t=Object(c.b)(),a=Object(c.c)((function(e){return e.mailApp.mails.selectedMailIds})),n=Object(c.c)((function(e){return e.mailApp.labels})),r=Object(o.i)(),l=be(e),s=fe.compile(e.match.path),m=a.length>0&&void 0!==a.find((function(t){return t===e.mail.id}));return i.a.createElement(Y.a,{dense:!0,button:!0,onClick:function(){return e.history.push(s(Object(I.a)(Object(I.a)({},r),{},{mailId:e.mail.id})))},className:Object(g.a)(l.mailItem,m&&"selected",!e.mail.read&&"unread","py-16 px-8")},i.a.createElement(pe.a,{tabIndex:-1,disableRipple:!0,checked:m,onChange:function(){return t({type:"[MAILS] TOGGLE IN SELECTED MAILS",mailId:e.mail.id})},onClick:function(e){return e.stopPropagation()}}),i.a.createElement("div",{className:"flex flex-1 flex-col relative overflow-hidden"},i.a.createElement("div",{className:"flex items-center justify-between px-16 pb-8"},i.a.createElement("div",{className:"flex items-center"},e.mail.from.avatar?i.a.createElement(d.a,{alt:e.mail.from.name,src:e.mail.from.avatar}):i.a.createElement(d.a,{className:l.avatar},e.mail.from.name[0]),i.a.createElement(E.a,{variant:"subtitle1",className:"mx-8"},e.mail.from.name)),i.a.createElement(E.a,{variant:"subtitle1"},e.mail.time)),i.a.createElement("div",{className:"flex flex-col px-16 py-0"},i.a.createElement(E.a,{className:"truncate"},e.mail.subject),i.a.createElement(E.a,{color:"textSecondary",className:"truncate"},u.a.truncate(e.mail.message.replace(/<(?:.|\n)*?>/gm,""),{length:180}))),i.a.createElement("div",{className:"flex justify-end px-12"},n&&e.mail.labels.map((function(e){return i.a.createElement(y,{className:"mx-2 mt-4",title:u.a.find(n,{id:e}).title,color:u.a.find(n,{id:e}).color,key:e})})))))}));var he=Object(o.j)((function(e){var t=Object(c.b)(),a=Object(c.c)((function(e){return e.mailApp.mails.entities})),n=Object(c.c)((function(e){return e.mailApp.mails.searchText})),r=Object(o.i)(),u=Object(l.useState)(null),d=Object(s.a)(u,2),p=d[0],f=d[1],b=Object(F.b)("mailApp").t;return Object(h.b)((function(){t(function(e){var t=O.a.get("/api/mail-app/mails",{params:e});return function(a){return t.then((function(t){return a({type:S,routeParams:e,payload:t.data})}))}}(r))}),[t,r]),Object(l.useEffect)((function(){a&&f(function(){var e=Object.keys(a).map((function(e){return a[e]}));return 0===n.length?e:de.a.filterArrayByString(e,n)}())}),[a,n]),p?0===p.length?i.a.createElement(m.a,{delay:100},i.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full"},i.a.createElement(E.a,{color:"textSecondary",variant:"h5"},b("NO_MESSAGES")))):i.a.createElement($.a,{className:"p-0"},i.a.createElement(ue.a,{enter:{animation:"transition.slideUpBigIn"}},p.map((function(e){return i.a.createElement(Ee,{mail:e,key:e.id})})))):null})),ve=a(43),ge=a(538);var xe=function(e){var t=Object(c.b)(),a=Object(c.c)((function(e){return e.mailApp.mails.selectedMailIds})),n=Object(c.c)((function(e){return e.mailApp.mails.entities})),r=Object(c.c)((function(e){return e.mailApp.labels})),o=Object(c.c)((function(e){return e.mailApp.folders})),m=Object(l.useState)({selectMenu:null,foldersMenu:null,labelsMenu:null}),u=Object(s.a)(m,2),d=u[0],p=u[1];function E(e,t){p(Object(I.a)(Object(I.a)({},t),{},Object(ve.a)({},t,e.currentTarget)))}function h(e,t){p(Object(I.a)(Object(I.a)({},t),{},Object(ve.a)({},t,null)))}return i.a.createElement("div",{className:"flex flex-1 items-center sm:px-8"},i.a.createElement(pe.a,{onChange:function(e){return e.target.checked?t({type:"[MAILS] SELECT ALL MAILS"}):t({type:"[MAILS] DESELECT ALL MAILS"})},checked:a.length===Object.keys(n).length&&a.length>0,indeterminate:a.length!==Object.keys(n).length&&a.length>0}),i.a.createElement(b.a,{className:"",size:"small","aria-label":"More","aria-owns":d.select?"select-menu":null,"aria-haspopup":"true",onClick:function(e){return E(e,"select")}},i.a.createElement(f.a,null,"arrow_drop_down")),i.a.createElement(ge.a,{id:"select-menu",anchorEl:d.select,open:Boolean(d.select),onClose:function(e){return h(0,"select")}},i.a.createElement(oe.a,{onClick:function(e){t({type:"[MAILS] SELECT ALL MAILS"}),h(0,"select")}},"All"),i.a.createElement(oe.a,{onClick:function(e){t({type:"[MAILS] DESELECT ALL MAILS"}),h(0,"select")}},"None"),i.a.createElement(oe.a,{onClick:function(e){t(A("read",!0)),h(0,"select")}},"Read"),i.a.createElement(oe.a,{onClick:function(e){t(A("read",!1)),h(0,"select")}},"Unread"),i.a.createElement(oe.a,{onClick:function(e){t(A("starred",!0)),h(0,"select")}},"Starred"),i.a.createElement(oe.a,{onClick:function(e){t(A("starred",!1)),h(0,"select")}},"Unstarred"),i.a.createElement(oe.a,{onClick:function(e){t(A("important",!0)),h(0,"select")}},"Important"),i.a.createElement(oe.a,{onClick:function(e){t(A("important",!1)),h(0,"select")}},"Unimportant")),a.length>0&&i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"border-r-1 h-48 w-1 mx-12 my-0"}),i.a.createElement(b.a,{onClick:function(e){return t(L(4))},"aria-label":"Delete"},i.a.createElement(f.a,null,"delete")),i.a.createElement(b.a,{"aria-label":"More","aria-owns":d.folders?"folders-menu":null,"aria-haspopup":"true",onClick:function(e){return E(e,"folders")}},i.a.createElement(f.a,null,"folder")),i.a.createElement(ge.a,{id:"folders-menu",anchorEl:d.folders,open:Boolean(d.folders),onClose:function(e){return h(0,"folders")}},o.length>0&&o.map((function(e){return i.a.createElement(oe.a,{onClick:function(a){t(L(e.id)),h(0,"folders")},key:e.id},e.title)}))),i.a.createElement(b.a,{"aria-label":"More","aria-owns":d.labels?"labels-menu":null,"aria-haspopup":"true",onClick:function(e){return E(e,"labels")}},i.a.createElement(f.a,null,"label")),i.a.createElement(ge.a,{id:"folders-menu",anchorEl:d.labels,open:Boolean(d.labels),onClose:function(e){return h(0,"labels")}},r.length>0&&r.map((function(e){return i.a.createElement(oe.a,{onClick:function(a){var n;t((n=e.id,function(e,t){var a=t().mailApp.mails.selectedMailIds;return O.a.post("/api/mail-app/toggle-label",{selectedMailIds:a,labelId:n}).then((function(t){return e({type:"[MAILS] TOGGLE LABEL ON SELECTED MAILS"}),e(N())}))})),h(0,"labels")},key:e.id},e.title)})))))},ye=a(70),je=a(12),Oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case R:return Object(je.a)(t.payload);default:return e}},Se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case T:return Object(je.a)(t.payload);default:return e}},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case M:return Object(je.a)(t.payload);default:return e}},Ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case k:case C:return Object(I.a)({},t.payload);default:return e}},Le={entities:[],routeParams:{},selectedMailIds:[],searchText:""},Ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case S:return Object(I.a)(Object(I.a)({},e),{},{entities:u.a.keyBy(t.payload,"id"),searchText:"",routeParams:t.routeParams});case"[MAIL APP] UPDATE MAILS":return Object(I.a)(Object(I.a)({},e),{},{entities:u.a.keyBy(t.payload,"id")});case"[MAILS] SELECT ALL MAILS":var a=Object.keys(e.entities).map((function(t){return e.entities[t]})),n=a.map((function(e){return e.id}));return Object(I.a)(Object(I.a)({},e),{},{selectedMailIds:n});case"[MAILS] DESELECT ALL MAILS":return Object(I.a)(Object(I.a)({},e),{},{selectedMailIds:[]});case"[MAILS] SELECT MAILS BY PARAMETER":var r=t.payload,l=Object.keys(e.entities).map((function(t){return e.entities[t]})),i=l.filter((function(e){return e[r.parameter]===r.value})).map((function(e){return e.id}));return Object(I.a)(Object(I.a)({},e),{},{selectedMailIds:i});case"[MAILS] TOGGLE IN SELECTED MAILS":var c=t.mailId,o=Object(je.a)(e.selectedMailIds);return o=void 0!==o.find((function(e){return e===c}))?o.filter((function(e){return e!==c})):[].concat(Object(je.a)(o),[c]),Object(I.a)(Object(I.a)({},e),{},{selectedMailIds:o});case"[MAILS] SET SEARCH TEXT":return Object(I.a)(Object(I.a)({},e),{},{searchText:t.searchText});default:return e}},ke=Object(ye.d)({mails:Ie,mail:Ae,folders:Se,labels:Ne,filters:Oe});t.default=Object(r.a)("mailApp",ke)((function(e){var t=Object(c.b)(),a=Object(l.useRef)(null),r=Object(o.i)();return Object(l.useEffect)((function(){t(function(){var e=O.a.get("/api/mail-app/filters");return function(t){return e.then((function(e){return t({type:R,payload:e.data})}))}}()),t(function(){var e=O.a.get("/api/mail-app/folders");return function(t){return e.then((function(e){return t({type:T,payload:e.data})}))}}()),t(function(){var e=O.a.get("/api/mail-app/labels");return function(t){return e.then((function(e){return t({type:M,payload:e.data})}))}}())}),[t]),i.a.createElement(n.a,{classes:{root:"w-full",content:"flex flex-col",header:"items-center min-h-72 h-72 sm:h-136 sm:min-h-136"},header:i.a.createElement(_,{pageLayout:a}),contentToolbar:r.mailId?i.a.createElement(B,null):i.a.createElement(xe,null),content:r.mailId?i.a.createElement(P,null):i.a.createElement(he,null),leftSidebarHeader:i.a.createElement(me,null),leftSidebarContent:i.a.createElement(ce,null),ref:a,innerScroll:!0})}))}}]);