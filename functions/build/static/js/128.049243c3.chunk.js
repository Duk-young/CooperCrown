(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[128],{2577:function(e,t,a){"use strict";a.d(t,"a",(function(){return N}));var n=a(22),l=a(0),r=a.n(l),c=(a(2),a(1628)),o=(a(1777),a(1),a(3),a(1634)),i=a(51),s=a(1917),m=(a(1798),a(518)),u=(a(66),a(1918)),d=(a(107),a(34),a(206),a(250),a(251),a(2033)),p=a(1753),f=a(1680),b=a(1681),h=a(242),E=function(e){return"date"===e||"year"===e?"date":"time"},v=Object(o.a)((function(e){var t="light"===e.palette.type?e.palette.primary.main:e.palette.background.default;return{tabs:{color:e.palette.getContrastText(t),backgroundColor:t}}}),{name:"MuiPickerDTTabs"}),O=function(e){var t=e.view,a=e.onChange,n=e.dateRangeIcon,r=e.timeIcon,c=v(),o="light"===Object(i.a)().palette.type?"secondary":"primary";return Object(l.createElement)(h.a,null,Object(l.createElement)(b.a,{variant:"fullWidth",value:E(t),onChange:function(e,n){n!==E(t)&&a("date"===n?"date":"hours")},className:c.tabs,indicatorColor:o},Object(l.createElement)(f.a,{value:"date",icon:Object(l.createElement)(l.Fragment,null,n)}),Object(l.createElement)(f.a,{value:"time",icon:Object(l.createElement)(l.Fragment,null,r)})))};O.defaultProps={dateRangeIcon:Object(l.createElement)((function(e){return r.a.createElement(m.a,e,r.a.createElement("path",{d:"M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"}),r.a.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}))}),null),timeIcon:Object(l.createElement)((function(e){return r.a.createElement(m.a,e,r.a.createElement("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),r.a.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),r.a.createElement("path",{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"}))}),null)};var y=Object(o.a)((function(e){return{toolbar:{paddingLeft:16,paddingRight:16,justifyContent:"space-around"},separator:{margin:"0 4px 0 2px",cursor:"default"}}}),{name:"MuiPickerDTToolbar"}),g=function(e){var t=e.date,a=e.openView,n=e.setOpenView,r=e.ampm,o=e.hideTabs,m=e.dateRangeIcon,u=e.timeIcon,f=e.onChange,b=Object(c.b)(),h=y(),E=!o&&"undefined"!==typeof window&&window.innerHeight>667,v=Object(d.b)(t,r,f),g=v.meridiemMode,x=v.handleMeridiemChange,C="rtl"===Object(i.a)().direction;return Object(l.createElement)(l.Fragment,null,Object(l.createElement)(s.b,{isLandscape:!1,className:h.toolbar},Object(l.createElement)(p.a,{container:!0,justify:"center",wrap:"nowrap"},Object(l.createElement)(p.a,{item:!0,container:!0,xs:5,justify:"flex-start",direction:"column"},Object(l.createElement)("div",null,Object(l.createElement)(s.c,{variant:"subtitle1",onClick:function(){return n("year")},selected:"year"===a,label:b.getYearText(t)})),Object(l.createElement)("div",null,Object(l.createElement)(s.c,{variant:"h4",onClick:function(){return n("date")},selected:"date"===a,label:b.getDateTimePickerHeaderText(t)}))),Object(l.createElement)(p.a,{item:!0,container:!0,xs:6,justify:"center",alignItems:"flex-end",direction:C?"row-reverse":"row"},Object(l.createElement)(s.c,{variant:"h3",onClick:function(){return n("hours")},selected:"hours"===a,label:b.getHourText(t,r)}),Object(l.createElement)(s.f,{variant:"h3",label:":",className:h.separator}),Object(l.createElement)(s.c,{variant:"h3",onClick:function(){return n("minutes")},selected:"minutes"===a,label:b.getMinuteText(t)})),r&&Object(l.createElement)(p.a,{item:!0,container:!0,xs:1,direction:"column",justify:"flex-end"},Object(l.createElement)(s.c,{variant:"subtitle1",selected:"am"===g,label:b.getMeridiemText("am"),onClick:function(){return x("am")}}),Object(l.createElement)(s.c,{variant:"subtitle1",selected:"pm"===g,label:b.getMeridiemText("pm"),onClick:function(){return x("pm")}})))),E&&Object(l.createElement)(O,{dateRangeIcon:m,timeIcon:u,view:a,onChange:n}))};function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var C=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(a,!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},u.b,{wider:!0,orientation:"portrait",openTo:"date",views:["year","date","hours","minutes"]});function j(e){var t=Object(c.b)();if("portrait"!==e.orientation)throw new Error("We are not supporting custom orientation for DateTimePicker yet :(");return{getDefaultFormat:function(){return Object(s.h)(e.format,e.ampm,{"12h":t.dateTime12hFormat,"24h":t.dateTime24hFormat})}}}var N=Object(s.g)({useOptions:j,Input:s.d,useState:s.i,DefaultToolbarComponent:g}),w=Object(s.g)({useOptions:j,Input:s.a,useState:s.e,DefaultToolbarComponent:g,getCustomProps:function(e){return{refuse:e.ampm?/[^\dap]+/gi:/[^\d]+/gi}}});N.defaultProps=C,w.defaultProps=C},2993:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(0),i=(n=o)&&n.__esModule?n:{default:n};var s={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0},m=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));a.reCalculateColumnCount=a.reCalculateColumnCount.bind(a),a.reCalculateColumnCountDebounce=a.reCalculateColumnCountDebounce.bind(a);var n=void 0;return n=a.props.breakpointCols&&a.props.breakpointCols.default?a.props.breakpointCols.default:parseInt(a.props.breakpointCols)||2,a.state={columnCount:n},a}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),c(t,[{key:"componentDidMount",value:function(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}},{key:"componentDidUpdate",value:function(){this.reCalculateColumnCount()}},{key:"componentWillUnmount",value:function(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}},{key:"reCalculateColumnCountDebounce",value:function(){var e=this;window&&window.requestAnimationFrame?(window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame((function(){e.reCalculateColumnCount()}))):this.reCalculateColumnCount()}},{key:"reCalculateColumnCount",value:function(){var e=window&&window.innerWidth||1/0,t=this.props.breakpointCols;"object"!==("undefined"===typeof t?"undefined":r(t))&&(t={default:parseInt(t)||2});var a=1/0,n=t.default||2;for(var l in t){var c=parseInt(l);c>0&&e<=c&&c<a&&(a=c,n=t[l])}n=Math.max(1,parseInt(n)||1),this.state.columnCount!==n&&this.setState({columnCount:n})}},{key:"itemsInColumns",value:function(){for(var e=this.state.columnCount,t=new Array(e),a=[].concat(this.props.children||[]),n=0;n<a.length;n++){var l=n%e;t[l]||(t[l]=[]),t[l].push(a[n])}return t}},{key:"renderColumns",value:function(){var e=this.props,t=e.column,a=e.columnAttrs,n=void 0===a?{}:a,r=e.columnClassName,c=this.itemsInColumns(),o=100/c.length+"%",s=r;"string"!==typeof s&&(this.logDeprecated('The property "columnClassName" requires a string'),"undefined"===typeof s&&(s="my-masonry-grid_column"));var m=l({},t,n,{style:l({},n.style,{width:o}),className:s});return c.map((function(e,t){return i.default.createElement("div",l({},m,{key:t}),e)}))}},{key:"logDeprecated",value:function(e){console.error("[Masonry]",e)}},{key:"render",value:function(){var e=this.props,t=(e.children,e.breakpointCols,e.columnClassName,e.columnAttrs,e.column,e.className),a=function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]),n=t;return"string"!==typeof t&&(this.logDeprecated('The property "className" requires a string'),"undefined"===typeof t&&(n="my-masonry-grid")),i.default.createElement("div",l({},a,{className:n}),this.renderColumns())}}]),t}(i.default.Component);m.defaultProps=s,t.default=m},4077:function(e,t,a){"use strict";a.r(t);var n=a(198),l=a(293),r=a(0),c=a.n(r),o=a(5),i=a(1664),s=a(58),m=a.n(s),u="[NOTES APP] GET NOTES",d="[NOTES APP] SET SEARCH TEXT",p="[NOTES APP] CREATE NOTE",f="[NOTES APP] UPDATE NOTE",b="[NOTES APP] REMOVE NOTE";var h="[NOTES APP] GET LABELS",E="[NOTES APP] LABELS UPDATE LABELS";var v=a(17),O=a(154),y=a(8),g=a(1647),x=a(830),C=a(740),j=a(1607),N=a(1608),w=a(244),k=a(30);var S=function(e){var t=e||{};return{id:t.id||k.a.generateGUID(),name:t.name||"",get handle(){return k.a.handleize(this.name)}}},T=a(10);var A=function(e){var t=Object(o.b)(),a=Object(o.c)((function(e){return e.notesApp.labels.entities})),n=Object(r.useState)(a),l=Object(v.a)(n,2),i=l[0],s=l[1],u=Object(O.c)({name:""}),d=u.form,p=u.handleChange,f=u.resetForm;Object(r.useEffect)((function(){s(a)}),[a]);var b=Object(O.a)((function(e){t(function(e){var t=m.a.post("/api/notes-app/update-labels",{labels:Object.values(e)});return function(e){return t.then((function(t){return e({type:E,payload:t.data})}))}}(e))}),600);function h(){return""===d.name}return Object(r.useEffect)((function(){i&&!y.a.isEqual(i,a)&&b(i)}),[b,a,i]),c.a.createElement(c.a.Fragment,null,c.a.createElement(w.a,{className:"text-16 mb-8 font-600"},"Edit Labels"),c.a.createElement(j.a,{dense:!0},c.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),!h()){var t=new S(d);s(y.a.setIn(i,t.id,t)),f()}}},c.a.createElement(N.a,{className:"p-0 mb-16",dense:!0},c.a.createElement(g.a,{className:"list-item-icon text-16",color:"action"},"add"),c.a.createElement(C.a,{className:Object(T.a)("flex flex-1 mx-8"),name:"name",value:d.name,onChange:p,placeholder:"Create new label"}),c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0","aria-label":"Delete",disabled:h(),type:"submit"},c.a.createElement(g.a,{fontSize:"small"},"check")))),Object(r.useMemo)((function(){return Object.entries(i).map((function(e){var t=Object(v.a)(e,2),a=(t[0],t[1]);return c.a.createElement(N.a,{className:"p-0",key:a.id,dense:!0},c.a.createElement(g.a,{className:"list-item-icon text-16",color:"action"},"label"),c.a.createElement(C.a,{className:Object(T.a)("flex flex-1 mx-8"),name:"name",value:a.name,onChange:function(e){return function(e,t){var a=new S(y.a.setIn(t,e.target.name,e.target.value));s(y.a.setIn(i,a.id,a))}(e,a)},disableUnderline:!0}),c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0","aria-label":"Delete",onClick:function(e){return function(e){s(y.a.omit(i,[e.id]))}(a)}},c.a.createElement(g.a,{fontSize:"small"},"delete")))}))}),[i])))};var D=function(e){var t=Object(o.b)(),a=Object(o.c)((function(e){return e.notesApp.labels.labelsDialogOpen}));return c.a.createElement(i.a,{classes:{paper:"w-full max-w-320 p-16 m-24 rounded-8"},onClose:function(e){return t({type:"[NOTES APP] LABELS DIALOG CLOSE"})},open:a},c.a.createElement(A,null))},I=a(831),P=a(37),L=a(1652),z=a(1670),_=a(1653);var M=function(e){var t=e||{};return{id:t.id||k.a.generateGUID(),title:t.title||"",description:t.description||"",archive:t.archive||!1,image:t.image||"",time:t.time||null,reminder:t.reminder||null,checklist:t.checklist||[],labels:t.labels||[]}},R=a(4),F=a(1661),H=a(32);var G=function(e){var t=Object(o.c)((function(e){return e.notesApp.labels.entities}));if(!t)return null;var a=t[e.id];if(!a)return null;var n=e.linkable?{component:H.a,onClick:function(e){e.stopPropagation()},to:"/apps/notes/labels/".concat(a.handle,"/").concat(a.id)}:{};return c.a.createElement(F.a,Object.assign({},n,{label:a.name,classes:Object(R.a)({root:Object(T.a)("h-24",e.className),label:"px-12 py-4 text-11",deleteIcon:"w-16"},e.classes),variant:"outlined",onDelete:e.onDelete}))},B=a(141),U=a.n(B);var W=function(e){return e.date?c.a.createElement(F.a,{icon:c.a.createElement(g.a,{className:"text-16"},"access_time"),label:U()(e.date).format("MMM DD YY, h:mm A"),classes:Object(R.a)({root:Object(T.a)("h-24",e.className),label:"px-12 py-4 text-11",deleteIcon:"w-16"},e.classes),variant:"outlined",onDelete:e.onDelete}):null},V=a(103),q=a(12);var Y=function(e){var t=e||{};return{id:t.id||k.a.generateGUID(),checked:t.checked||!1,text:t.text||""}};var J=function(e){var t=Object(O.c)({text:""}),a=t.form,n=t.handleChange,l=t.resetForm;function r(){return""===a.text}return c.a.createElement("form",{onSubmit:function(t){t.preventDefault(),r()||(e.onListItemAdd(new Y(a)),l())}},c.a.createElement(N.a,{className:"p-0",dense:!0},c.a.createElement(x.a,{className:"w-32 h-32 p-0 -mx-4","aria-label":"Add",type:"submit",disabled:r()},c.a.createElement(g.a,{fontSize:"small"},"add")),c.a.createElement(C.a,{className:"flex flex-1 px-8",name:"text",value:a.text,onChange:n,placeholder:"Add an item",disableUnderline:!0,autoFocus:!0})))},Z=a(1659);var K=function(e){function t(t){e.onListItemChange(y.a.setIn(e.item,t.target.name,"checkbox"===t.target.type?t.target.checked:t.target.value))}return e.item?c.a.createElement(N.a,{className:"p-0",key:e.item.id,dense:!0},c.a.createElement(Z.a,{className:"p-0",checked:e.item.checked,tabIndex:-1,disableRipple:!0,name:"checked",onChange:t,color:"default"}),c.a.createElement(C.a,{className:Object(T.a)("flex flex-1 mx-8",e.item.checked&&"line-through opacity-50"),name:"text",value:e.item.text,onChange:t,disableUnderline:!0}),c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0","aria-label":"Delete",onClick:function(){return e.onListItemRemove(e.item.id)}},c.a.createElement(g.a,{fontSize:"small"},"delete"))):null};var X=function(e){function t(t){e.onCheckListChange(e.checklist.map((function(e){return e.id===t.id?t:e})))}function a(t){e.onCheckListChange(e.checklist.filter((function(e){return e.id!==t})))}return e.checklist?c.a.createElement("div",{className:e.className},c.a.createElement(j.a,{dense:!0},e.checklist.map((function(e){return c.a.createElement(K,{item:e,key:e.id,onListItemChange:t,onListItemRemove:a})})),c.a.createElement(J,{onListItemAdd:function(t){e.onCheckListChange([].concat(Object(q.a)(e.checklist),[t]))}}))):null},Q=a(1602),$=a(1655),ee=a(1605);var te=function(e){var t=Object(o.c)((function(e){return e.notesApp.labels.entities})),a=Object(r.useState)(null),n=Object(v.a)(a,2),l=n[0],i=n[1];function s(){i(null)}return c.a.createElement("div",null,c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0",onClick:function(e){i(e.currentTarget)}},c.a.createElement(g.a,{fontSize:"small"},"label")),c.a.createElement(ee.a,{hideBackdrop:!0,open:Boolean(l),anchorEl:l,onClose:s,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},className:"pointer-events-none",classes:{paper:"pointer-events-auto py-8 prevent-add-close"}},c.a.createElement(Q.a,{onClickAway:s},c.a.createElement(j.a,{className:"p-0"},Object.entries(t).map((function(t){var a=Object(v.a)(t,2),n=(a[0],a[1]);return c.a.createElement(N.a,{key:n.id,button:!0,dense:!0,onClick:function(){return t=n.id,void e.onChange(y.a.xor(e.note.labels,[t]));var t}},c.a.createElement(g.a,{className:"list-item-icon text-16",color:"action"},e.note.labels.includes(n.id)?"check_box":"check_box_outline_blank"),c.a.createElement($.a,{className:"truncate px-8",primary:n.name,disableTypography:!0}))}))))))},ae=a(2020),ne=a(1628),le=a(2577);var re=function(e){var t=Object(r.useState)(!1),a=Object(v.a)(t,2),n=a[0],l=a[1],o=new Date(e.reminder);return c.a.createElement(c.a.Fragment,null,c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0",onClick:function(){return l(!0)}},c.a.createElement(g.a,{fontSize:"small"},"notifications_active")),c.a.createElement(ne.a,{utils:ae.default},c.a.createElement(le.a,{className:"hidden",open:n,onOpen:function(){return l(!0)},onClose:function(){return l(!1)},clearable:!0,showTodayButton:!0,disablePast:!0,value:o,onChange:e.onChange,DialogProps:{className:"prevent-add-close"}})))};var ce=function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("label",{htmlFor:"button-file"},c.a.createElement("input",{accept:"image/*",className:"hidden",id:"button-file",type:"file",onChange:e.onChange}),c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0",component:"span"},c.a.createElement(g.a,{fontSize:"small"},"image"))))};function oe(e){var t=Object(r.useState)(!1),a=Object(v.a)(t,2),n=a[0],l=a[1],o=Object(V.i)(),i=Object(O.c)(y.a.merge({},new M,e.note,o.labelId?{labels:[o.labelId]}:null,"archive"===o.id?{archive:!0}:null)),s=i.form,m=i.handleChange,u=i.setForm,d=e.onChange;function p(t){e.onCreate&&e.onCreate(s)}function f(){return""===s.title&&""===s.image&&""===s.description&&0===s.checklist.length}return Object(O.e)((function(){s&&d&&d(s)}),[s,d]),s?c.a.createElement("div",{className:"flex flex-col w-full"},c.a.createElement(P.a,{className:"flex flex-auto w-full max-h-640"},c.a.createElement("div",{className:"w-full"},s.image&&""!==s.image&&c.a.createElement("div",{className:"relative"},c.a.createElement("img",{src:s.image,className:"w-full block",alt:"note"}),c.a.createElement(z.a,{className:"absolute right-0 bottom-0 m-8",variant:"extended",size:"small",color:"secondary","aria-label":"Delete Image",onClick:function(){u(y.a.setIn(s,"image",""))}},c.a.createElement(g.a,{fontSize:"small"},"delete"))),c.a.createElement("div",{className:"p-16 pb-12"},c.a.createElement(C.a,{className:"font-bold",placeholder:"Title",type:"text",name:"title",value:s.title,onChange:m,disableUnderline:!0,fullWidth:!0})),c.a.createElement("div",{className:"p-16 pb-12"},c.a.createElement(C.a,{placeholder:"Take a note...",multiline:!0,rows:"4",name:"description",value:s.description,onChange:m,disableUnderline:!0,fullWidth:!0,autoFocus:!0})),(s.checklist.length>0||n)&&c.a.createElement("div",{className:"px-16"},c.a.createElement(X,{checklist:s.checklist,onCheckListChange:function(e){u(y.a.setIn(s,"checklist",e))}})),(s.labels||s.reminder||s.time)&&c.a.createElement("div",{className:"flex flex-wrap w-full p-16 pb-12 -mx-4"},s.reminder&&c.a.createElement(W,{className:"mt-4 mx-4",date:s.reminder}),s.labels&&s.labels.map((function(e){return c.a.createElement(G,{id:e,key:e,className:"mt-4 mx-4",onDelete:function(){return function(e){u(y.a.setIn(s,"labels",s.labels.filter((function(t){return t!==e}))))}(e)}})})),s.time&&c.a.createElement(w.a,{color:"textSecondary",className:"text-12 mt-8 mx-4"},"Edited: ",U()(s.time).format("MMM DD YY, h:mm A"))))),c.a.createElement("div",{className:"flex flex-auto justify-between items-center h-48"},c.a.createElement("div",{className:"flex items-center px-4"},c.a.createElement(_.a,{title:"Remind me",placement:"bottom"},c.a.createElement("div",null,c.a.createElement(re,{reminder:s.reminder,onChange:function(e){u(y.a.setIn(s,"reminder",e))}}))),c.a.createElement(_.a,{title:"Add image",placement:"bottom"},c.a.createElement("div",null,c.a.createElement(ce,{onChange:function(e){var t=e.target.files[0];if(t){var a=new FileReader;a.readAsBinaryString(t),a.onload=function(){u(y.a.setIn(s,"image","data:".concat(t.type,";base64,").concat(btoa(a.result))))},a.onerror=function(){console.log("error on load image")}}}}))),c.a.createElement(_.a,{title:"Add checklist",placement:"bottom"},c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0",onClick:function(){l(!n)}},c.a.createElement(g.a,{fontSize:"small"},"playlist_add_check"))),c.a.createElement(_.a,{title:"Change labels",placement:"bottom"},c.a.createElement("div",null,c.a.createElement(te,{note:s,onChange:function(e){u(y.a.setIn(s,"labels",e))}}))),c.a.createElement(_.a,{title:s.archive?"Unarchive":"Archive",placement:"bottom"},c.a.createElement("div",null,c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0",onClick:function(){u(y.a.setIn(s,"archive",!s.archive)),"new"===e.variant&&setTimeout((function(){return p()}))},disabled:f()},c.a.createElement(g.a,{fontSize:"small"},s.archive?"unarchive":"archive"))))),c.a.createElement("div",{className:"flex items-center px-4"},"new"===e.variant?c.a.createElement(L.a,{className:"m-4",onClick:p,variant:"outlined",size:"small",disabled:f()},"Create"):c.a.createElement(c.a.Fragment,null,c.a.createElement(_.a,{title:"Delete Note",placement:"bottom"},c.a.createElement(x.a,{className:"w-32 h-32 mx-4 p-0",onClick:e.onRemove},c.a.createElement(g.a,{fontSize:"small"},"delete"))),c.a.createElement(L.a,{className:"m-4",onClick:e.onClose,variant:"outlined",size:"small"},"Close"))))):null}oe.defaultProps={variant:"edit",note:null};var ie=Object(V.j)(oe),se=c.a.forwardRef((function(e,t){return c.a.createElement(I.a,Object.assign({direction:"up",ref:t},e))}));var me=function(e){var t=Object(o.b)(),a=Object(o.c)((function(e){return e.notesApp.notes})),n=Object(O.a)((function(e){t(function(e){var t=m.a.post("/api/notes-app/update-note",{note:e});return function(e){return t.then((function(t){return e({type:f,note:t.data})}))}}(e))}),600);return a.entities?c.a.createElement(i.a,{classes:{paper:"w-full m-24 rounded-8"},TransitionComponent:se,onClose:function(e){return t({type:"[NOTES APP] CLOSE NOTE DIALOG"})},open:Boolean(a.noteDialogId)},c.a.createElement(ie,{note:a.entities[a.noteDialogId],onChange:n,onClose:function(e){return t({type:"[NOTES APP] CLOSE NOTE DIALOG"})},onRemove:function(){t(function(e){var t=m.a.post("/api/notes-app/remove-note",{noteId:e});return function(a){return t.then((function(){a({type:b,id:e})}))}}(a.noteDialogId))}})):null},ue=a(242),de=a(1634),pe=Object(de.a)({button:{cursor:"text"}});var fe=function(e){var t=Object(o.b)(),a=pe(e),n=Object(r.useState)(!1),l=Object(v.a)(n,2),i=l[0],s=l[1];function u(){i&&(s(!1),document.removeEventListener("keydown",d,!1))}function d(e){27===e.keyCode&&u()}return c.a.createElement(Q.a,{onClickAway:function(e){var t=document.querySelector(".prevent-add-close");!!t&&t.contains(e.target)||u()}},c.a.createElement(ue.a,{className:Object(T.a)(a.button,"flex items-center w-full max-w-512 mt-8 mb-16 min-h-48"),elevation:1},i?c.a.createElement(ie,{onCreate:function(e){t(function(e){var t=m.a.post("/api/notes-app/create-note",{note:e});return function(e){return t.then((function(t){e({type:p,note:t.data})}))}}(e)),u()},variant:"new"}):c.a.createElement(w.a,{className:"w-full px-16 py-12 font-500 text-16 w-full",color:"textSecondary",onClick:function(){s(!0),document.addEventListener("keydown",d,!1)}},"Take a note..")))},be=a(2993),he=a.n(be),Ee=a(128),ve=a(1677),Oe={1:{fontSize:14,lineHeight:19},2:{fontSize:18,lineHeight:28},3:{fontSize:24,lineHeight:36},4:{fontSize:36,lineHeight:48},5:{fontSize:48,lineHeight:60}};var ye=function(e,t,a){if(t){t.style.fontSize=null,t.style.lineHeight=null;var n=t.clientWidth;if(0!==n&&a){var l,r=document.createElement("div");r.style.display="inline-block",r.style.fontSize="10px",r.style.fontWeight="200",r.style.lineHeight="10px",r.style.position="absolute",r.style.whiteSpace="pre-wrap",r.style.wordWrap="break-word",r.style.pointerEvents="none",r.style.visibility="hidden",document.body.appendChild(r);var c=e.split(" ").map((function(e){return r.textContent=e.toString(),r.clientWidth})),o=Math.max.apply(Math,Object(q.a)(c)),i=Math.floor(10*n/o);i<18?l=1:i>=18&&i<24?l=2:i>=24&&i<36?l=3:i>=36&&i<48?l=4:i>=48&&(l=5);var s=Oe[l],m=s.lineHeight,u=s.fontSize;r.textContent=e,r.style.width="".concat(n,"px"),r.style.fontSize="".concat(u,"px"),r.style.lineHeight="".concat(m,"px");var d=r.clientHeight/m;d>4&&d<6?l=4:d>=6&&d<9?l=3:d>=9&&d<11?l=2:d>=11&&(l=1),document.body.removeChild(r),m=Oe[l].lineHeight,u=Oe[l].fontSize,t.style.fontSize="".concat(u,"px"),t.style.lineHeight="".concat(m,"px")}}};var ge=function(e){var t=Object(o.b)();return c.a.createElement(Ee.a,{animation:"transition.fadeIn",duration:400,delay:100},c.a.createElement(ve.a,{className:Object(T.a)("cursor-pointer",e.className),onClick:function(){return t({type:"[NOTES APP] OPEN NOTE DIALOG",payload:e.note.id})}},e.note.image&&""!==e.note.image&&c.a.createElement("img",{src:e.note.image,className:"w-full block",alt:"note"}),e.note.title&&""!==e.note.title&&c.a.createElement(w.a,{className:"p-16 pb-8 text-14 font-bold"},e.note.title),e.note.description&&""!==e.note.description&&c.a.createElement(w.a,{className:"py-8 px-16",component:"div"},c.a.createElement("div",{className:Object(T.a)("w-full break-words",e.variateDescSize?"font-200":"text-14"),ref:function(t){setTimeout((function(){return ye(e.note.description,t,e.variateDescSize)}))}},e.note.description)),e.note.checklist&&e.note.checklist.length>0&&c.a.createElement("ul",{className:"py-8 px-16 flex flex-wrap list-reset"},e.note.checklist.map((function(e){return c.a.createElement("li",{key:e.id,className:"flex items-center w-full"},c.a.createElement(g.a,{color:"action",className:"text-16"},e.checked?"check_box_outline":"check_box_outline_blank"),c.a.createElement(w.a,{className:Object(T.a)("truncate mx-8",e.checked&&"line-through"),color:e.checked?"textSecondary":"inherit"},e.text))}))),(e.note.labels.length>0||e.note.reminder)&&c.a.createElement("div",{className:"py-8 px-16 flex flex-wrap w-full -mx-2"},e.note.reminder&&c.a.createElement(W,{className:"mt-4 mx-2",date:e.note.reminder}),e.note.labels.map((function(e){return c.a.createElement(G,{id:e,key:e,className:"mt-4 mx-2",linkable:!0})})))))};var xe=Object(V.j)((function(e){var t=Object(o.c)((function(e){return e.notesApp.notes.entities})),a=Object(o.c)((function(e){return e.notesApp.notes.variateDescSize})),n=Object(o.c)((function(e){return e.notesApp.notes.searchText})),l=Object(r.useState)(null),i=Object(v.a)(l,2),s=i[0],m=i[1];return Object(r.useEffect)((function(){t&&m(function(){var a=e.match.params,l=a.id,r=a.labelId,c=Object.keys(t).map((function(e){return t[e]}));return r&&(c=c.filter((function(e){return e.labels.includes(r)&&!e.archive}))),l||(c=c.filter((function(e){return!e.archive}))),"archive"===l&&(c=c.filter((function(e){return e.archive}))),"reminders"===l&&(c=c.filter((function(e){return Boolean(e.reminder)&&!e.archive}))),0===n.length?c:c=k.a.filterArrayByString(c,n)}())}),[t,n,e.match]),s&&0!==s.length?c.a.createElement("div",{className:"flex flex-wrap w-full"},c.a.createElement(he.a,{breakpointCols:{default:6,1920:5,1600:4,1366:3,1280:4,960:3,600:2,480:1},className:"my-masonry-grid flex w-full",columnClassName:"my-masonry-grid_column flex flex-col p-8"},s.map((function(e){return c.a.createElement(ge,{key:e.id,note:e,className:"w-full rounded-8 shadow-none border-1 mb-16",variateDescSize:a})})))):c.a.createElement("div",{className:"flex items-center justify-center h-full"},c.a.createElement(w.a,{color:"textSecondary",variant:"h5"},"There are no notes!"))})),Ce=a(1660),je=Object(de.a)((function(e){return{root:{},inputWrapper:{backgroundColor:e.palette.primary.dark}}}));function Ne(e){var t=Object(o.b)(),a=Object(o.c)((function(e){return e.notesApp.notes.searchText})),n=je(e),l=Object(r.useState)(!1),i=Object(v.a)(l,2),s=i[0],m=i[1];function u(){m(!0),document.addEventListener("keydown",f,!1)}function p(){m(!1),t({type:d,searchText:""}),document.removeEventListener("keydown",f,!1)}function f(e){27===e.keyCode&&p()}return c.a.createElement("div",{className:Object(T.a)(n.root,"flex",e.className)},c.a.createElement(_.a,{title:"Click to search",placement:"bottom"},c.a.createElement("div",{onClick:u,onKeyDown:u,role:"button",tabIndex:0},e.trigger)),s&&c.a.createElement(Q.a,{onClickAway:function(){p()}},c.a.createElement("div",{className:Object(T.a)(n.inputWrapper,"absolute left-0 right-0 top-0 bottom-0 h-full z-9999 px-8 sm:px-24")},c.a.createElement("div",{className:"flex items-center w-full h-full"},c.a.createElement(C.a,{placeholder:"Search for anything",className:"flex flex-1 py-0 px-16 h-64",disableUnderline:!0,fullWidth:!0,value:a,inputProps:{"aria-label":"Search"},onChange:function(e){return t({type:d,searchText:e.target.value})},autoFocus:!0}),c.a.createElement(x.a,{onClick:p,className:"mx-8"},c.a.createElement(g.a,null,"close"))))))}Ne.defaultProps={trigger:c.a.createElement(x.a,{className:"w-64 h-64"},c.a.createElement(g.a,null,"search"))};var we=Ne;var ke=function(e){var t=Object(o.b)(),a=Object(o.c)((function(e){return e.notesApp.notes.variateDescSize}));return c.a.createElement("div",{className:"flex flex-1 items-center justify-between p-8 sm:p-24 relative"},c.a.createElement("div",{className:"flex flex-shrink items-center sm:w-224"},c.a.createElement(Ce.a,{lgUp:!0},c.a.createElement(x.a,{onClick:function(t){return e.pageLayout.current.toggleLeftSidebar()},"aria-label":"open left sidebar"},c.a.createElement(g.a,null,"menu"))),c.a.createElement("div",{className:"flex items-center"},c.a.createElement(Ee.a,{animation:"transition.expandIn",delay:300},c.a.createElement(g.a,{className:"text-32"},"account_box")),c.a.createElement(Ee.a,{animation:"transition.slideLeftIn",delay:300},c.a.createElement(w.a,{variant:"h6",className:"mx-12 hidden sm:flex"},"Notes")))),c.a.createElement("div",{className:"flex flex-1 items-center justify-end"},c.a.createElement(_.a,{title:"Toggle Variate Description Size"},c.a.createElement(x.a,{onClick:function(e){return t({type:"[NOTES APP] TOGGLE VARIATE DESC SIZE"})}},c.a.createElement(g.a,{color:a?"action":"disabled"},"format_size"))),c.a.createElement(we,null)))},Se=a(43),Te=a(114),Ae=a(1674),De=a(1673),Ie=Object(de.a)((function(e){return{paper:Object(Se.a)({},e.breakpoints.down("md"),{boxShadow:"none"}),listItem:{color:"inherit!important",textDecoration:"none!important",height:40,width:"calc(100% - 16px)",borderRadius:"0 20px 20px 0",paddingLeft:24,paddingRight:12,"&.active":{backgroundColor:e.palette.secondary.main,color:"".concat(e.palette.secondary.contrastText,"!important"),pointerEvents:"none","& .list-item-icon":{color:"inherit"}},"& .list-item-icon":{marginRight:16}}}}));var Pe=function(e){var t=Object(o.b)(),a=Object(o.c)((function(e){return e.notesApp.labels.entities})),n=Ie(e);return c.a.createElement("div",{className:"p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4"},c.a.createElement(Ee.a,{animation:"transition.slideLeftIn",delay:200},c.a.createElement(ue.a,{elevation:1,className:Object(T.a)(n.paper,"rounded-8")},c.a.createElement(j.a,null,c.a.createElement(N.a,{button:!0,component:Te.a,to:"/apps/notes",exact:!0,activeClassName:"active",className:n.listItem},c.a.createElement(g.a,{className:"list-item-icon text-16",color:"action"},"label"),c.a.createElement($.a,{className:"truncate",primary:"Notes",disableTypography:!0})),c.a.createElement(N.a,{button:!0,component:Te.a,to:"/apps/notes/reminders",exact:!0,activeClassName:"active",className:n.listItem},c.a.createElement(g.a,{className:"list-item-icon text-16",color:"action"},"notifications"),c.a.createElement($.a,{className:"truncate",primary:"Reminders",disableTypography:!0}))),c.a.createElement(Ae.a,null),c.a.createElement(j.a,null,c.a.createElement(De.a,null,"Labels"),Object.entries(a).map((function(e){var t=Object(v.a)(e,2),a=(t[0],t[1]);return c.a.createElement(N.a,{key:a.id,button:!0,component:Te.a,to:"/apps/notes/labels/".concat(a.handle,"/").concat(a.id),exact:!0,activeClassName:"active",className:n.listItem},c.a.createElement(g.a,{className:"list-item-icon text-16",color:"action"},"label"),c.a.createElement($.a,{className:"truncate",primary:a.name,disableTypography:!0}))})),c.a.createElement(N.a,{button:!0,className:n.listItem,onClick:function(e){return t({type:"[NOTES APP] LABELS DIALOG OPEN"})}},c.a.createElement(g.a,{className:"list-item-icon text-16",color:"action"},"edit"),c.a.createElement($.a,{className:"truncate",primary:"Edit Labels",disableTypography:!0}))),c.a.createElement(Ae.a,null),c.a.createElement(j.a,null,c.a.createElement(N.a,{button:!0,component:Te.a,to:"/apps/notes/archive",activeClassName:"active",className:n.listItem},c.a.createElement(g.a,{className:"list-item-icon text-16",color:"action"},"archive"),c.a.createElement($.a,{className:"truncate",primary:"Archive",disableTypography:!0}))))))},Le=a(70),ze={entities:{},labelsDialogOpen:!1},_e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:case E:return Object(R.a)(Object(R.a)({},e),{},{entities:y.a.keyBy(t.payload,"id")});case"[NOTES APP] LABELS DIALOG OPEN":return Object(R.a)(Object(R.a)({},e),{},{labelsDialogOpen:!0});case"[NOTES APP] LABELS DIALOG CLOSE":return Object(R.a)(Object(R.a)({},e),{},{labelsDialogOpen:!1});default:return e}},Me={entities:null,searchText:"",noteDialogId:null,variateDescSize:!0},Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Me,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case u:return Object(R.a)(Object(R.a)({},e),{},{entities:y.a.keyBy(t.payload,"id")});case d:return Object(R.a)(Object(R.a)({},e),{},{searchText:t.searchText});case"[NOTES APP] TOGGLE VARIATE DESC SIZE":return Object(R.a)(Object(R.a)({},e),{},{variateDescSize:!e.variateDescSize});case"[NOTES APP] OPEN NOTE DIALOG":return Object(R.a)(Object(R.a)({},e),{},{noteDialogId:t.payload});case"[NOTES APP] CLOSE NOTE DIALOG":return Object(R.a)(Object(R.a)({},e),{},{noteDialogId:null});case p:return Object(R.a)(Object(R.a)({},e),{},{entities:y.a.cloneDeep(y.a.assign(Object(Se.a)({},t.note.id,t.note),e.entities))});case b:return Object(R.a)(Object(R.a)({},e),{},{entities:y.a.cloneDeep(y.a.omit(e.entities,[t.id])),noteDialogId:null});case f:return Object(R.a)(Object(R.a)({},e),{},{entities:y.a.cloneDeep(y.a.set(e.entities,t.note.id,t.note))});default:return e}},Fe=Object(Le.d)({notes:Re,labels:_e});t.default=Object(l.a)("notesApp",Fe)((function(e){var t=Object(o.b)(),a=Object(r.useRef)(null);return Object(r.useEffect)((function(){t(function(){var e=m.a.get("/api/notes-app/notes");return function(t){return e.then((function(e){return t({type:u,payload:e.data})}))}}()),t(function(){var e=m.a.get("/api/notes-app/labels");return function(t){return e.then((function(e){return t({type:h,payload:e.data})}))}}())}),[t]),c.a.createElement(c.a.Fragment,null,c.a.createElement(n.a,{classes:{contentWrapper:"p-16 sm:p-24 pb-80",content:"flex min-h-full",leftSidebar:"w-256 border-0",header:"min-h-72 h-72"},header:c.a.createElement(ke,{pageLayout:a}),content:c.a.createElement("div",{className:"flex flex-col w-full items-center"},c.a.createElement(fe,null),c.a.createElement(xe,null),c.a.createElement(me,null),c.a.createElement(D,null)),leftSidebarContent:c.a.createElement(Pe,null),sidebarInner:!0,ref:a,innerScroll:!0}))}))}}]);