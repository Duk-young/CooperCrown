(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[51],{1686:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var r,a=n(0),o=(r=a)&&r.__esModule?r:{default:r};var c=void 0,l=void 0;"undefined"!==typeof document&&(c=document),"undefined"!==typeof window&&(l=window);var i=t.FrameContext=o.default.createContext({document:c,window:l}),s=i.Provider,m=i.Consumer;t.FrameContextProvider=s,t.FrameContextConsumer=m},1689:function(e,t,n){"use strict";n.d(t,"a",(function(){return _}));var r=n(17),a=n(140),o=n(1669),c=n(1677),l=n(1647),i=n(1680),s=n(1681),m=n(0),d=n.n(m),u=n(12),h=n(4),p=n(83),f=n(84),b=n(152),g=n(153),y=n(1600),w=n(797),v=n(1636),k=n(1668),C=n(9),x=n(516),E=n(517),S=n(1690),j=n.n(S),F=Object(y.a)({productionPrefix:"iframe-"}),O=function(e){Object(b.a)(n,e);var t=Object(g.a)(n);function n(){var e;Object(p.a)(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={ready:!1},e.handleRef=function(t){e.contentDocument=t?t.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(x.a)(Object(h.a)(Object(h.a)({},Object(w.a)()),{},{plugins:[].concat(Object(u.a)(Object(w.a)().plugins),[Object(E.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return d.a.createElement(d.a.Fragment,null,d.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),d.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(f.a)(n,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.classes,r=e.theme;return d.a.createElement(j.a,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?d.a.createElement(v.b,{jss:this.state.jss,generateClassName:F,sheetsManager:this.state.sheetsManager},d.a.createElement(k.a,{theme:r},d.a.cloneElement(t,{container:this.state.container}))):null)}}]),n}(d.a.Component),N=Object(C.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(O);function P(e){var t=Object(m.useState)(e.currentTabIndex),n=Object(r.a)(t,2),u=n[0],h=n[1],p=e.component,f=e.raw,b=e.iframe,g=e.className;return d.a.createElement(c.a,{className:g},d.a.createElement(o.a,{position:"static",color:"default",elevation:0},d.a.createElement(s.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:u,onChange:function(e,t){h(t)}},p&&d.a.createElement(i.a,{classes:{root:"min-w-64"},icon:d.a.createElement(l.a,null,"remove_red_eye")}),f&&d.a.createElement(i.a,{classes:{root:"min-w-64"},icon:d.a.createElement(l.a,null,"code")}))),d.a.createElement("div",{className:"flex justify-center"},d.a.createElement("div",{className:0===u?"flex flex-1":"hidden"},p&&(b?d.a.createElement(N,null,d.a.createElement(p,null)):d.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},d.a.createElement(p,null)))),d.a.createElement("div",{className:1===u?"flex flex-1":"hidden"},f&&d.a.createElement("div",{className:"flex flex-1"},d.a.createElement(a.a,{component:"pre",className:"language-javascript w-full"},f.default)))))}P.defaultProps={currentTabIndex:0};var _=P},1690:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContext=void 0;var r=n(1686);Object.defineProperty(t,"FrameContext",{enumerable:!0,get:function(){return r.FrameContext}}),Object.defineProperty(t,"FrameContextConsumer",{enumerable:!0,get:function(){return r.FrameContextConsumer}});var a,o=n(1691),c=(a=o)&&a.__esModule?a:{default:a};t.default=c.default},1691:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),c=d(o),l=d(n(18)),i=d(n(2)),s=n(1686),m=d(n(1692));function d(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.handleLoad=function(){r.forceUpdate()},r._isMounted=!1,r}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,n=this.props.contentDidUpdate,r=e.defaultView||e.parentView,a=!this._setInitialContent,o=c.default.createElement(m.default,{contentDidMount:t,contentDidUpdate:n},c.default.createElement(s.FrameContextProvider,{value:{document:e,window:r}},c.default.createElement("div",{className:"frame-content"},this.props.children)));a&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close(),this._setInitialContent=!0);var i=this.getMountTarget();return[l.default.createPortal(this.props.head,this.getDoc().head),l.default.createPortal(o,i)]}},{key:"render",value:function(){var e=this,t=r({},this.props,{children:void 0});return delete t.head,delete t.initialContent,delete t.mountTarget,delete t.contentDidMount,delete t.contentDidUpdate,c.default.createElement("iframe",r({},t,{ref:function(t){e.node=t}}),this.renderFrameContents())}}]),t}(o.Component);u.propTypes={style:i.default.object,head:i.default.node,initialContent:i.default.string,mountTarget:i.default.string,contentDidMount:i.default.func,contentDidUpdate:i.default.func,children:i.default.oneOfType([i.default.element,i.default.arrayOf(i.default.element)])},u.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=u},1692:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),o=(c(a),c(n(2)));function c(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var s=function(e){function t(){return l(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return a.Children.only(this.props.children)}}]),t}(a.Component);s.propTypes={children:o.default.element.isRequired,contentDidMount:o.default.func.isRequired,contentDidUpdate:o.default.func.isRequired},t.default=s},1753:function(e,t,n){"use strict";var r=n(3),a=n(1),o=n(0),c=(n(2),n(6)),l=n(9),i=[0,1,2,3,4,5,6,7,8,9,10],s=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=parseFloat(e);return"".concat(n/t).concat(String(e).replace(String(n),"")||"px")}var d=o.forwardRef((function(e,t){var n=e.alignContent,l=void 0===n?"stretch":n,i=e.alignItems,s=void 0===i?"stretch":i,m=e.classes,d=e.className,u=e.component,h=void 0===u?"div":u,p=e.container,f=void 0!==p&&p,b=e.direction,g=void 0===b?"row":b,y=e.item,w=void 0!==y&&y,v=e.justify,k=e.justifyContent,C=void 0===k?"flex-start":k,x=e.lg,E=void 0!==x&&x,S=e.md,j=void 0!==S&&S,F=e.sm,O=void 0!==F&&F,N=e.spacing,P=void 0===N?0:N,_=e.wrap,L=void 0===_?"wrap":_,D=e.xl,G=void 0!==D&&D,M=e.xs,B=void 0!==M&&M,A=e.zeroMinWidth,T=void 0!==A&&A,R=Object(r.a)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","justifyContent","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),$=Object(c.a)(m.root,d,f&&[m.container,0!==P&&m["spacing-xs-".concat(String(P))]],w&&m.item,T&&m.zeroMinWidth,"row"!==g&&m["direction-xs-".concat(String(g))],"wrap"!==L&&m["wrap-xs-".concat(String(L))],"stretch"!==s&&m["align-items-xs-".concat(String(s))],"stretch"!==l&&m["align-content-xs-".concat(String(l))],"flex-start"!==(v||C)&&m["justify-content-xs-".concat(String(v||C))],!1!==B&&m["grid-xs-".concat(String(B))],!1!==O&&m["grid-sm-".concat(String(O))],!1!==j&&m["grid-md-".concat(String(j))],!1!==E&&m["grid-lg-".concat(String(E))],!1!==G&&m["grid-xl-".concat(String(G))]);return o.createElement(h,Object(a.a)({className:$,ref:t},R))})),u=Object(l.a)((function(e){return Object(a.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-content-xs-center":{justifyContent:"center"},"justify-content-xs-flex-end":{justifyContent:"flex-end"},"justify-content-xs-space-between":{justifyContent:"space-between"},"justify-content-xs-space-around":{justifyContent:"space-around"},"justify-content-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var n={};return i.forEach((function(r){var a=e.spacing(r);0!==a&&(n["spacing-".concat(t,"-").concat(r)]={margin:"-".concat(m(a,2)),width:"calc(100% + ".concat(m(a),")"),"& > $item":{padding:m(a,2)}})})),n}(e,"xs"),e.breakpoints.keys.reduce((function(t,n){return function(e,t,n){var r={};s.forEach((function(e){var t="grid-".concat(n,"-").concat(e);if(!0!==e)if("auto"!==e){var a="".concat(Math.round(e/12*1e8)/1e6,"%");r[t]={flexBasis:a,flexGrow:0,maxWidth:a}}else r[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else r[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===n?Object(a.a)(e,r):e[t.breakpoints.up(n)]=r}(t,e,n),t}),{}))}),{name:"MuiGrid"})(d);t.a=u},3600:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var r=n(43),a=n(4),o=n(17),c=n(0),l=n.n(c),i=n(1667);function s(){var e=l.a.useState({checkedA:!0,checkedB:!0}),t=Object(o.a)(e,2),n=t[0],c=t[1],s=function(e){c(Object(a.a)(Object(a.a)({},n),{},Object(r.a)({},e.target.name,e.target.checked)))};return l.a.createElement("div",null,l.a.createElement(i.a,{checked:n.checkedA,onChange:s,name:"checkedA",inputProps:{"aria-label":"secondary checkbox"}}),l.a.createElement(i.a,{checked:n.checkedB,onChange:s,color:"primary",name:"checkedB",inputProps:{"aria-label":"primary checkbox"}}),l.a.createElement(i.a,{inputProps:{"aria-label":"primary checkbox"}}),l.a.createElement(i.a,{disabled:!0,inputProps:{"aria-label":"disabled checkbox"}}),l.a.createElement(i.a,{disabled:!0,checked:!0,inputProps:{"aria-label":"primary checkbox"}}),l.a.createElement(i.a,{defaultChecked:!0,color:"default",inputProps:{"aria-label":"checkbox with default color"}}))}},3601:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport Switch from '@material-ui/core/Switch';\r\n\r\nexport default function Switches() {\r\n  const [state, setState] = React.useState({\r\n    checkedA: true,\r\n    checkedB: true,\r\n  });\r\n\r\n  const handleChange = (event) => {\r\n    setState({ ...state, [event.target.name]: event.target.checked });\r\n  };\r\n\r\n  return (\r\n    <div>\r\n      <Switch\r\n        checked={state.checkedA}\r\n        onChange={handleChange}\r\n        name=\"checkedA\"\r\n        inputProps={{ 'aria-label': 'secondary checkbox' }}\r\n      />\r\n      <Switch\r\n        checked={state.checkedB}\r\n        onChange={handleChange}\r\n        color=\"primary\"\r\n        name=\"checkedB\"\r\n        inputProps={{ 'aria-label': 'primary checkbox' }}\r\n      />\r\n      <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />\r\n      <Switch disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />\r\n      <Switch disabled checked inputProps={{ 'aria-label': 'primary checkbox' }} />\r\n      <Switch\r\n        defaultChecked\r\n        color=\"default\"\r\n        inputProps={{ 'aria-label': 'checkbox with default color' }}\r\n      />\r\n    </div>\r\n  );\r\n}\r\n"},3602:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var r=n(43),a=n(4),o=n(17),c=n(0),l=n.n(c),i=n(1610),s=n(1651),m=n(1667);function d(){var e=l.a.useState({checkedA:!0,checkedB:!0}),t=Object(o.a)(e,2),n=t[0],c=t[1],d=function(e){c(Object(a.a)(Object(a.a)({},n),{},Object(r.a)({},e.target.name,e.target.checked)))};return l.a.createElement(i.a,{row:!0},l.a.createElement(s.a,{control:l.a.createElement(m.a,{checked:n.checkedA,onChange:d,name:"checkedA"}),label:"Secondary"}),l.a.createElement(s.a,{control:l.a.createElement(m.a,{checked:n.checkedB,onChange:d,name:"checkedB",color:"primary"}),label:"Primary"}),l.a.createElement(s.a,{control:l.a.createElement(m.a,null),label:"Uncontrolled"}),l.a.createElement(s.a,{disabled:!0,control:l.a.createElement(m.a,null),label:"Disabled"}),l.a.createElement(s.a,{disabled:!0,control:l.a.createElement(m.a,{checked:!0}),label:"Disabled"}))}},3603:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\r\nimport FormGroup from \'@material-ui/core/FormGroup\';\r\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\r\nimport Switch from \'@material-ui/core/Switch\';\r\n\r\nexport default function SwitchLabels() {\r\n  const [state, setState] = React.useState({\r\n    checkedA: true,\r\n    checkedB: true,\r\n  });\r\n\r\n  const handleChange = (event) => {\r\n    setState({ ...state, [event.target.name]: event.target.checked });\r\n  };\r\n\r\n  return (\r\n    <FormGroup row>\r\n      <FormControlLabel\r\n        control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}\r\n        label="Secondary"\r\n      />\r\n      <FormControlLabel\r\n        control={\r\n          <Switch\r\n            checked={state.checkedB}\r\n            onChange={handleChange}\r\n            name="checkedB"\r\n            color="primary"\r\n          />\r\n        }\r\n        label="Primary"\r\n      />\r\n      <FormControlLabel control={<Switch />} label="Uncontrolled" />\r\n      <FormControlLabel disabled control={<Switch />} label="Disabled" />\r\n      <FormControlLabel disabled control={<Switch checked />} label="Disabled" />\r\n    </FormGroup>\r\n  );\r\n}\r\n'},3604:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var r=n(43),a=n(4),o=n(17),c=n(0),l=n.n(c),i=n(1609),s=n(838),m=n(1610),d=n(1651),u=n(1613),h=n(1667);function p(){var e=l.a.useState({gilad:!0,jason:!1,antoine:!0}),t=Object(o.a)(e,2),n=t[0],c=t[1],p=function(e){c(Object(a.a)(Object(a.a)({},n),{},Object(r.a)({},e.target.name,e.target.checked)))};return l.a.createElement(s.a,{component:"fieldset"},l.a.createElement(i.a,{component:"legend"},"Assign responsibility"),l.a.createElement(m.a,null,l.a.createElement(d.a,{control:l.a.createElement(h.a,{checked:n.gilad,onChange:p,name:"gilad"}),label:"Gilad Gray"}),l.a.createElement(d.a,{control:l.a.createElement(h.a,{checked:n.jason,onChange:p,name:"jason"}),label:"Jason Killian"}),l.a.createElement(d.a,{control:l.a.createElement(h.a,{checked:n.antoine,onChange:p,name:"antoine"}),label:"Antoine Llorca"})),l.a.createElement(u.a,null,"Be careful"))}},3605:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\r\nimport FormLabel from \'@material-ui/core/FormLabel\';\r\nimport FormControl from \'@material-ui/core/FormControl\';\r\nimport FormGroup from \'@material-ui/core/FormGroup\';\r\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\r\nimport FormHelperText from \'@material-ui/core/FormHelperText\';\r\nimport Switch from \'@material-ui/core/Switch\';\r\n\r\nexport default function SwitchesGroup() {\r\n  const [state, setState] = React.useState({\r\n    gilad: true,\r\n    jason: false,\r\n    antoine: true,\r\n  });\r\n\r\n  const handleChange = (event) => {\r\n    setState({ ...state, [event.target.name]: event.target.checked });\r\n  };\r\n\r\n  return (\r\n    <FormControl component="fieldset">\r\n      <FormLabel component="legend">Assign responsibility</FormLabel>\r\n      <FormGroup>\r\n        <FormControlLabel\r\n          control={<Switch checked={state.gilad} onChange={handleChange} name="gilad" />}\r\n          label="Gilad Gray"\r\n        />\r\n        <FormControlLabel\r\n          control={<Switch checked={state.jason} onChange={handleChange} name="jason" />}\r\n          label="Jason Killian"\r\n        />\r\n        <FormControlLabel\r\n          control={<Switch checked={state.antoine} onChange={handleChange} name="antoine" />}\r\n          label="Antoine Llorca"\r\n        />\r\n      </FormGroup>\r\n      <FormHelperText>Be careful</FormHelperText>\r\n    </FormControl>\r\n  );\r\n}\r\n'},3606:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var r=n(43),a=n(4),o=n(17),c=n(202),l=n(0),i=n.n(l),s=n(9),m=n(640),d=n(1610),u=n(1651),h=n(1667),p=n(1753),f=n(244),b=["classes"],g=Object(s.a)({switchBase:{color:m.a[300],"&$checked":{color:m.a[500]},"&$checked + $track":{backgroundColor:m.a[500]}},checked:{},track:{}})(h.a),y=Object(s.a)((function(e){return{root:{width:42,height:26,padding:0,margin:e.spacing(1)},switchBase:{padding:1,"&$checked":{transform:"translateX(16px)",color:e.palette.common.white,"& + $track":{backgroundColor:"#52d869",opacity:1,border:"none"}},"&$focusVisible $thumb":{color:"#52d869",border:"6px solid #fff"}},thumb:{width:24,height:24},track:{borderRadius:13,border:"1px solid ".concat(e.palette.grey[400]),backgroundColor:e.palette.grey[50],opacity:1,transition:e.transitions.create(["background-color","border"])},checked:{},focusVisible:{}}}))((function(e){var t=e.classes,n=Object(c.a)(e,b);return i.a.createElement(h.a,Object.assign({focusVisibleClassName:t.focusVisible,disableRipple:!0,classes:{root:t.root,switchBase:t.switchBase,thumb:t.thumb,track:t.track,checked:t.checked}},n))})),w=Object(s.a)((function(e){return{root:{width:28,height:16,padding:0,display:"flex"},switchBase:{padding:2,color:e.palette.grey[500],"&$checked":{transform:"translateX(12px)",color:e.palette.common.white,"& + $track":{opacity:1,backgroundColor:e.palette.primary.main,borderColor:e.palette.primary.main}}},thumb:{width:12,height:12,boxShadow:"none"},track:{border:"1px solid ".concat(e.palette.grey[500]),borderRadius:8,opacity:1,backgroundColor:e.palette.common.white},checked:{}}}))(h.a);function v(){var e=i.a.useState({checkedA:!0,checkedB:!0,checkedC:!0}),t=Object(o.a)(e,2),n=t[0],c=t[1],l=function(e){c(Object(a.a)(Object(a.a)({},n),{},Object(r.a)({},e.target.name,e.target.checked)))};return i.a.createElement(d.a,null,i.a.createElement(u.a,{control:i.a.createElement(g,{checked:n.checkedA,onChange:l,name:"checkedA"}),label:"Custom color"}),i.a.createElement(u.a,{control:i.a.createElement(y,{checked:n.checkedB,onChange:l,name:"checkedB"}),label:"iOS style"}),i.a.createElement(f.a,{component:"div"},i.a.createElement(p.a,{component:"label",container:!0,alignItems:"center",spacing:1},i.a.createElement(p.a,{item:!0},"Off"),i.a.createElement(p.a,{item:!0},i.a.createElement(w,{checked:n.checkedC,onChange:l,name:"checkedC"})),i.a.createElement(p.a,{item:!0},"On"))))}},3607:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport { withStyles } from '@material-ui/core/styles';\r\nimport { purple } from '@material-ui/core/colors';\r\nimport FormGroup from '@material-ui/core/FormGroup';\r\nimport FormControlLabel from '@material-ui/core/FormControlLabel';\r\nimport Switch from '@material-ui/core/Switch';\r\nimport Grid from '@material-ui/core/Grid';\r\nimport Typography from '@material-ui/core/Typography';\r\n\r\nconst PurpleSwitch = withStyles({\r\n  switchBase: {\r\n    color: purple[300],\r\n    '&$checked': {\r\n      color: purple[500],\r\n    },\r\n    '&$checked + $track': {\r\n      backgroundColor: purple[500],\r\n    },\r\n  },\r\n  checked: {},\r\n  track: {},\r\n})(Switch);\r\n\r\nconst IOSSwitch = withStyles((theme) => ({\r\n  root: {\r\n    width: 42,\r\n    height: 26,\r\n    padding: 0,\r\n    margin: theme.spacing(1),\r\n  },\r\n  switchBase: {\r\n    padding: 1,\r\n    '&$checked': {\r\n      transform: 'translateX(16px)',\r\n      color: theme.palette.common.white,\r\n      '& + $track': {\r\n        backgroundColor: '#52d869',\r\n        opacity: 1,\r\n        border: 'none',\r\n      },\r\n    },\r\n    '&$focusVisible $thumb': {\r\n      color: '#52d869',\r\n      border: '6px solid #fff',\r\n    },\r\n  },\r\n  thumb: {\r\n    width: 24,\r\n    height: 24,\r\n  },\r\n  track: {\r\n    borderRadius: 26 / 2,\r\n    border: `1px solid ${theme.palette.grey[400]}`,\r\n    backgroundColor: theme.palette.grey[50],\r\n    opacity: 1,\r\n    transition: theme.transitions.create(['background-color', 'border']),\r\n  },\r\n  checked: {},\r\n  focusVisible: {},\r\n}))(({ classes, ...props }) => {\r\n  return (\r\n    <Switch\r\n      focusVisibleClassName={classes.focusVisible}\r\n      disableRipple\r\n      classes={{\r\n        root: classes.root,\r\n        switchBase: classes.switchBase,\r\n        thumb: classes.thumb,\r\n        track: classes.track,\r\n        checked: classes.checked,\r\n      }}\r\n      {...props}\r\n    />\r\n  );\r\n});\r\n\r\nconst AntSwitch = withStyles((theme) => ({\r\n  root: {\r\n    width: 28,\r\n    height: 16,\r\n    padding: 0,\r\n    display: 'flex',\r\n  },\r\n  switchBase: {\r\n    padding: 2,\r\n    color: theme.palette.grey[500],\r\n    '&$checked': {\r\n      transform: 'translateX(12px)',\r\n      color: theme.palette.common.white,\r\n      '& + $track': {\r\n        opacity: 1,\r\n        backgroundColor: theme.palette.primary.main,\r\n        borderColor: theme.palette.primary.main,\r\n      },\r\n    },\r\n  },\r\n  thumb: {\r\n    width: 12,\r\n    height: 12,\r\n    boxShadow: 'none',\r\n  },\r\n  track: {\r\n    border: `1px solid ${theme.palette.grey[500]}`,\r\n    borderRadius: 16 / 2,\r\n    opacity: 1,\r\n    backgroundColor: theme.palette.common.white,\r\n  },\r\n  checked: {},\r\n}))(Switch);\r\n\r\nexport default function CustomizedSwitches() {\r\n  const [state, setState] = React.useState({\r\n    checkedA: true,\r\n    checkedB: true,\r\n    checkedC: true,\r\n  });\r\n\r\n  const handleChange = (event) => {\r\n    setState({ ...state, [event.target.name]: event.target.checked });\r\n  };\r\n\r\n  return (\r\n    <FormGroup>\r\n      <FormControlLabel\r\n        control={<PurpleSwitch checked={state.checkedA} onChange={handleChange} name=\"checkedA\" />}\r\n        label=\"Custom color\"\r\n      />\r\n      <FormControlLabel\r\n        control={<IOSSwitch checked={state.checkedB} onChange={handleChange} name=\"checkedB\" />}\r\n        label=\"iOS style\"\r\n      />\r\n      <Typography component=\"div\">\r\n        <Grid component=\"label\" container alignItems=\"center\" spacing={1}>\r\n          <Grid item>Off</Grid>\r\n          <Grid item>\r\n            <AntSwitch checked={state.checkedC} onChange={handleChange} name=\"checkedC\" />\r\n          </Grid>\r\n          <Grid item>On</Grid>\r\n        </Grid>\r\n      </Typography>\r\n    </FormGroup>\r\n  );\r\n}\r\n"},3608:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var r=n(17),a=n(0),o=n.n(a),c=n(1667),l=n(1610),i=n(1651);function s(){var e=o.a.useState(!1),t=Object(r.a)(e,2),n=t[0],a=t[1],s=function(){a((function(e){return!e}))};return o.a.createElement(l.a,null,o.a.createElement(i.a,{control:o.a.createElement(c.a,{size:"small",checked:n,onChange:s}),label:"Small"}),o.a.createElement(i.a,{control:o.a.createElement(c.a,{checked:n,onChange:s}),label:"Normal"}))}},3609:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport Switch from '@material-ui/core/Switch';\r\nimport FormGroup from '@material-ui/core/FormGroup';\r\nimport FormControlLabel from '@material-ui/core/FormControlLabel';\r\n\r\nexport default function SwitchesSize() {\r\n  const [checked, setChecked] = React.useState(false);\r\n\r\n  const toggleChecked = () => {\r\n    setChecked((prev) => !prev);\r\n  };\r\n\r\n  return (\r\n    <FormGroup>\r\n      <FormControlLabel\r\n        control={<Switch size=\"small\" checked={checked} onChange={toggleChecked} />}\r\n        label=\"Small\"\r\n      />\r\n      <FormControlLabel\r\n        control={<Switch checked={checked} onChange={toggleChecked} />}\r\n        label=\"Normal\"\r\n      />\r\n    </FormGroup>\r\n  );\r\n}\r\n"},3610:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var r=n(0),a=n.n(r),o=n(1667),c=n(1610),l=n(1651),i=n(838);function s(){return a.a.createElement(i.a,{component:"fieldset"},a.a.createElement(c.a,{"aria-label":"position",row:!0},a.a.createElement(l.a,{value:"top",control:a.a.createElement(o.a,{color:"primary"}),label:"Top",labelPlacement:"top"}),a.a.createElement(l.a,{value:"start",control:a.a.createElement(o.a,{color:"primary"}),label:"Start",labelPlacement:"start"}),a.a.createElement(l.a,{value:"bottom",control:a.a.createElement(o.a,{color:"primary"}),label:"Bottom",labelPlacement:"bottom"}),a.a.createElement(l.a,{value:"end",control:a.a.createElement(o.a,{color:"primary"}),label:"End",labelPlacement:"end"})))}},3611:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\r\nimport Switch from \'@material-ui/core/Switch\';\r\nimport FormGroup from \'@material-ui/core/FormGroup\';\r\nimport FormControlLabel from \'@material-ui/core/FormControlLabel\';\r\nimport FormControl from \'@material-ui/core/FormControl\';\r\n\r\nexport default function FormControlLabelPosition() {\r\n  return (\r\n    <FormControl component="fieldset">\r\n      <FormGroup aria-label="position" row>\r\n        <FormControlLabel\r\n          value="top"\r\n          control={<Switch color="primary" />}\r\n          label="Top"\r\n          labelPlacement="top"\r\n        />\r\n        <FormControlLabel\r\n          value="start"\r\n          control={<Switch color="primary" />}\r\n          label="Start"\r\n          labelPlacement="start"\r\n        />\r\n        <FormControlLabel\r\n          value="bottom"\r\n          control={<Switch color="primary" />}\r\n          label="Bottom"\r\n          labelPlacement="bottom"\r\n        />\r\n        <FormControlLabel\r\n          value="end"\r\n          control={<Switch color="primary" />}\r\n          label="End"\r\n          labelPlacement="end"\r\n        />\r\n      </FormGroup>\r\n    </FormControl>\r\n  );\r\n}\r\n'},4004:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(1689),c=n(140),l=n(198),i=n(1652),s=n(1647),m=n(244),d=n(1634),u=Object(d.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));t.default=function(e){var t=u();return a.a.createElement(l.a,{classes:{root:t.layoutRoot},header:a.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},a.a.createElement("div",{className:"flex flex-col"},a.a.createElement("div",{className:"flex items-center mb-16"},a.a.createElement(s.a,{className:"text-18",color:"action"},"home"),a.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),a.a.createElement(m.a,{color:"textSecondary"},"Documentation"),a.a.createElement(s.a,{className:"text-16",color:"action"},"chevron_right"),a.a.createElement(m.a,{color:"textSecondary"},"Material UI Components")),a.a.createElement(m.a,{variant:"h6"},"Switch")),a.a.createElement(i.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/switches",target:"_blank",role:"button"},a.a.createElement(s.a,null,"link"),a.a.createElement("span",{className:"mx-4"},"Reference"))),content:a.a.createElement("div",{className:"p-24 max-w-2xl"},a.a.createElement(m.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Switch"),a.a.createElement(m.a,{className:"description"},"Switches toggle the state of a single setting on or off."),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement("a",{href:"https://material.io/design/components/selection-controls.html#switches"},"Switches")," are the preferred way to adjust settings on mobile. The option that the switch controls, as well as the state it\u2019s in, should be made clear from the corresponding inline label."),a.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Basic switches"),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3600).default,raw:n(3601)})),a.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Switch with FormControlLabel"),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement("code",null,"Switch")," can be provided with a description thanks to the ",a.a.createElement("code",null,"FormControlLabel")," component."),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3602).default,raw:n(3603)})),a.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Switches with FormGroup"),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement("code",null,"FormGroup")," is a helpful wrapper used to group selection controls components that provides an easier API. However, you are encouraged you to use ",a.a.createElement("a",{href:"/components/checkboxes/"},"Checkboxes")," instead if multiple related controls are required. (See: ",a.a.createElement("a",{href:"#when-to-use"},"When to use"),")."),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3604).default,raw:n(3605)})),a.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Customized switches"),a.a.createElement(m.a,{className:"mb-16",component:"div"},"Here are some examples of customizing the component. You can learn more about this in the",a.a.createElement("a",{href:"/customization/components/"},"overrides documentation page"),"."),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3606).default,raw:n(3607)})),a.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Sizes"),a.a.createElement(m.a,{className:"mb-16",component:"div"},"Fancy smaller switches? Use the ",a.a.createElement("code",null,"size")," property."),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3608).default,raw:n(3609)})),a.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Label placement"),a.a.createElement(m.a,{className:"mb-16",component:"div"},"You can change the placement of the label:"),a.a.createElement(m.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3610).default,raw:n(3611)})),a.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"When to use"),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement("a",{href:"https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8"},"Checkboxes vs. Switches"))),a.a.createElement(m.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Accessibility"),a.a.createElement("ul",null,a.a.createElement("li",null,"It will render an element with the ",a.a.createElement("code",null,"checkbox")," role not ",a.a.createElement("code",null,"switch")," role since this role isn't widely supported yet. Please test first if assistive technology of your target audience supports this role properly. Then you can change the role with",a.a.createElement("code",null,"<Switch inputProps={{ role: 'switch' }}>")),a.a.createElement("li",null,"All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the ",a.a.createElement("code",null,"<label>")," element (",a.a.createElement("a",{href:"/api/form-control-label/"},"FormControlLabel"),")."),a.a.createElement("li",null,"When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. ",a.a.createElement("code",null,"aria-label"),", ",a.a.createElement("code",null,"aria-labelledby"),", ",a.a.createElement("code",null,"title"),") via the ",a.a.createElement("code",null,"inputProps")," property.")),a.a.createElement(c.a,{component:"pre",className:"language-jsx"}," \n<Switch value=\"checkedA\" inputProps={{ 'aria-label': 'Switch A' }} />\n"))})}}}]);