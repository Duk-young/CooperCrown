(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[28],{1615:function(e,t,n){"use strict";n.r(t);var r=n(518);n.d(t,"default",(function(){return r.a}))},1685:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n=o.default.memo(o.default.forwardRef((function(t,n){return o.default.createElement(i.default,(0,a.default)({ref:n},t),e)})));0;return n.muiName=i.default.muiName,n};var a=r(n(176)),o=r(n(0)),i=r(n(1615))},1686:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContextProvider=t.FrameContext=void 0;var r,a=n(0),o=(r=a)&&r.__esModule?r:{default:r};var i=void 0,c=void 0;"undefined"!==typeof document&&(i=document),"undefined"!==typeof window&&(c=window);var l=t.FrameContext=o.default.createContext({document:i,window:c}),s=l.Provider,u=l.Consumer;t.FrameContextProvider=s,t.FrameContextConsumer=u},1689:function(e,t,n){"use strict";n.d(t,"a",(function(){return M}));var r=n(17),a=n(140),o=n(1669),i=n(1677),c=n(1647),l=n(1680),s=n(1681),u=n(0),m=n.n(u),d=n(12),f=n(4),p=n(83),h=n(84),v=n(152),y=n(153),b=n(1600),g=n(797),E=n(1636),w=n(1668),A=n(9),k=n(516),T=n(517),C=n(1690),N=n.n(C),O=Object(b.a)({productionPrefix:"iframe-"}),x=function(e){Object(v.a)(n,e);var t=Object(y.a)(n);function n(){var e;Object(p.a)(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={ready:!1},e.handleRef=function(t){e.contentDocument=t?t.node.contentDocument:null},e.onContentDidMount=function(){e.setState({ready:!0,jss:Object(k.a)(Object(f.a)(Object(f.a)({},Object(g.a)()),{},{plugins:[].concat(Object(d.a)(Object(g.a)().plugins),[Object(T.a)()]),insertionPoint:e.contentDocument.querySelector("#jss-demo-insertion-point")})),sheetsManager:new Map,container:e.contentDocument.body})},e.onContentDidUpdate=function(){e.contentDocument.body.dir=e.props.theme.direction},e.renderHead=function(){return m.a.createElement(m.a.Fragment,null,m.a.createElement("style",{dangerouslySetInnerHTML:{__html:"\n                    html {\n                    font-size: 62.5%;\n                    font-family: Muli, Roboto, Helvetica Neue, Arial, sans-serif;\n                    }\n                "}}),m.a.createElement("noscript",{id:"jss-demo-insertion-point"}))},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this.props,t=e.children,n=e.classes,r=e.theme;return m.a.createElement(N.a,{head:this.renderHead(),ref:this.handleRef,className:n.root,contentDidMount:this.onContentDidMount,contentDidUpdate:this.onContentDidUpdate},this.state.ready?m.a.createElement(E.b,{jss:this.state.jss,generateClassName:O,sheetsManager:this.state.sheetsManager},m.a.createElement(w.a,{theme:r},m.a.cloneElement(t,{container:this.state.container}))):null)}}]),n}(m.a.Component),j=Object(A.a)((function(e){return{root:{backgroundColor:e.palette.background.default,flexGrow:1,height:400,border:"none",boxShadow:e.shadows[1]}}}),{withTheme:!0})(x);function S(e){var t=Object(u.useState)(e.currentTabIndex),n=Object(r.a)(t,2),d=n[0],f=n[1],p=e.component,h=e.raw,v=e.iframe,y=e.className;return m.a.createElement(i.a,{className:y},m.a.createElement(o.a,{position:"static",color:"default",elevation:0},m.a.createElement(s.a,{classes:{root:"border-b-1",flexContainer:"justify-end"},value:d,onChange:function(e,t){f(t)}},p&&m.a.createElement(l.a,{classes:{root:"min-w-64"},icon:m.a.createElement(c.a,null,"remove_red_eye")}),h&&m.a.createElement(l.a,{classes:{root:"min-w-64"},icon:m.a.createElement(c.a,null,"code")}))),m.a.createElement("div",{className:"flex justify-center"},m.a.createElement("div",{className:0===d?"flex flex-1":"hidden"},p&&(v?m.a.createElement(j,null,m.a.createElement(p,null)):m.a.createElement("div",{className:"p-24 flex flex-1 justify-center"},m.a.createElement(p,null)))),m.a.createElement("div",{className:1===d?"flex flex-1":"hidden"},h&&m.a.createElement("div",{className:"flex flex-1"},m.a.createElement(a.a,{component:"pre",className:"language-javascript w-full"},h.default)))))}S.defaultProps={currentTabIndex:0};var M=S},1690:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FrameContextConsumer=t.FrameContext=void 0;var r=n(1686);Object.defineProperty(t,"FrameContext",{enumerable:!0,get:function(){return r.FrameContext}}),Object.defineProperty(t,"FrameContextConsumer",{enumerable:!0,get:function(){return r.FrameContextConsumer}});var a,o=n(1691),i=(a=o)&&a.__esModule?a:{default:a};t.default=i.default},1691:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=m(o),c=m(n(18)),l=m(n(2)),s=n(1686),u=m(n(1692));function m(e){return e&&e.__esModule?e:{default:e}}var d=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,n));return r.handleLoad=function(){r.forceUpdate()},r._isMounted=!1,r}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"componentDidMount",value:function(){this._isMounted=!0;var e=this.getDoc();e&&"complete"===e.readyState?this.forceUpdate():this.node.addEventListener("load",this.handleLoad)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.node.removeEventListener("load",this.handleLoad)}},{key:"getDoc",value:function(){return this.node?this.node.contentDocument:null}},{key:"getMountTarget",value:function(){var e=this.getDoc();return this.props.mountTarget?e.querySelector(this.props.mountTarget):e.body.children[0]}},{key:"renderFrameContents",value:function(){if(!this._isMounted)return null;var e=this.getDoc();if(!e)return null;var t=this.props.contentDidMount,n=this.props.contentDidUpdate,r=e.defaultView||e.parentView,a=!this._setInitialContent,o=i.default.createElement(u.default,{contentDidMount:t,contentDidUpdate:n},i.default.createElement(s.FrameContextProvider,{value:{document:e,window:r}},i.default.createElement("div",{className:"frame-content"},this.props.children)));a&&(e.open("text/html","replace"),e.write(this.props.initialContent),e.close(),this._setInitialContent=!0);var l=this.getMountTarget();return[c.default.createPortal(this.props.head,this.getDoc().head),c.default.createPortal(o,l)]}},{key:"render",value:function(){var e=this,t=r({},this.props,{children:void 0});return delete t.head,delete t.initialContent,delete t.mountTarget,delete t.contentDidMount,delete t.contentDidUpdate,i.default.createElement("iframe",r({},t,{ref:function(t){e.node=t}}),this.renderFrameContents())}}]),t}(o.Component);d.propTypes={style:l.default.object,head:l.default.node,initialContent:l.default.string,mountTarget:l.default.string,contentDidMount:l.default.func,contentDidUpdate:l.default.func,children:l.default.oneOfType([l.default.element,l.default.arrayOf(l.default.element)])},d.defaultProps={style:{},head:null,children:void 0,mountTarget:void 0,contentDidMount:function(){},contentDidUpdate:function(){},initialContent:'<!DOCTYPE html><html><head></head><body><div class="frame-root"></div></body></html>'},t.default=d},1692:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(0),o=(i(a),i(n(2)));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}var s=function(e){function t(){return c(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this.props.contentDidMount()}},{key:"componentDidUpdate",value:function(){this.props.contentDidUpdate()}},{key:"render",value:function(){return a.Children.only(this.props.children)}}]),t}(a.Component);s.propTypes={children:o.default.element.isRequired,contentDidMount:o.default.func.isRequired,contentDidUpdate:o.default.func.isRequired},t.default=s},1787:function(e,t,n){"use strict";function r(e){var t,n,a="";if("string"===typeof e||"number"===typeof e)a+=e;else if("object"===typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}t.a=function(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(a&&(a+=" "),a+=t);return a}},1803:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),o=(0,r(n(1685)).default)(a.default.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close");t.default=o},1874:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),o=(0,r(n(1685)).default)(a.default.createElement("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check");t.default=o},1943:function(e,t,n){"use strict";var r=n(0),a=n(63);t.a=Object(a.a)(r.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},2998:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return l}));var r=n(0),a=n.n(r),o=n(1634),i=n(3917),c=Object(o.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function l(){var e=c();return a.a.createElement("div",{className:e.root},a.a.createElement(i.a,{severity:"error"},"This is an error alert \u2014 check it out!"),a.a.createElement(i.a,{severity:"warning"},"This is a warning alert \u2014 check it out!"),a.a.createElement(i.a,{severity:"info"},"This is an info alert \u2014 check it out!"),a.a.createElement(i.a,{severity:"success"},"This is a success alert \u2014 check it out!"))}},2999:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport { makeStyles } from '@material-ui/core/styles';\r\nimport Alert from '@material-ui/lab/Alert';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    width: '100%',\r\n    '& > * + *': {\r\n      marginTop: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function SimpleAlerts() {\r\n  const classes = useStyles();\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Alert severity=\"error\">This is an error alert \u2014 check it out!</Alert>\r\n      <Alert severity=\"warning\">This is a warning alert \u2014 check it out!</Alert>\r\n      <Alert severity=\"info\">This is an info alert \u2014 check it out!</Alert>\r\n      <Alert severity=\"success\">This is a success alert \u2014 check it out!</Alert>\r\n    </div>\r\n  );\r\n}\r\n"},3e3:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport { makeStyles } from '@material-ui/core/styles';\r\nimport { Alert, AlertTitle } from '@material-ui/lab';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    width: '100%',\r\n    '& > * + *': {\r\n      marginTop: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function DescriptionAlerts() {\r\n  const classes = useStyles();\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Alert severity=\"error\">\r\n        <AlertTitle>Error</AlertTitle>\r\n        This is an error alert \u2014 <strong>check it out!</strong>\r\n      </Alert>\r\n      <Alert severity=\"warning\">\r\n        <AlertTitle>Warning</AlertTitle>\r\n        This is a warning alert \u2014 <strong>check it out!</strong>\r\n      </Alert>\r\n      <Alert severity=\"info\">\r\n        <AlertTitle>Info</AlertTitle>\r\n        This is an info alert \u2014 <strong>check it out!</strong>\r\n      </Alert>\r\n      <Alert severity=\"success\">\r\n        <AlertTitle>Success</AlertTitle>\r\n        This is a success alert \u2014 <strong>check it out!</strong>\r\n      </Alert>\r\n    </div>\r\n  );\r\n}\r\n"},3001:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return s}));var r=n(0),a=n.n(r),o=n(1634),i=n(3917),c=n(1652),l=Object(o.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function s(){var e=l();return a.a.createElement("div",{className:e.root},a.a.createElement(i.a,{onClose:function(){}},"This is a success alert \u2014 check it out!"),a.a.createElement(i.a,{action:a.a.createElement(c.a,{color:"inherit",size:"small"},"UNDO")},"This is a success alert \u2014 check it out!"))}},3002:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport { makeStyles } from '@material-ui/core/styles';\r\nimport Alert from '@material-ui/lab/Alert';\r\nimport Button from '@material-ui/core/Button';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    width: '100%',\r\n    '& > * + *': {\r\n      marginTop: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function ActionAlerts() {\r\n  const classes = useStyles();\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Alert onClose={() => {}}>This is a success alert \u2014 check it out!</Alert>\r\n      <Alert\r\n        action={\r\n          <Button color=\"inherit\" size=\"small\">\r\n            UNDO\r\n          </Button>\r\n        }\r\n      >\r\n        This is a success alert \u2014 check it out!\r\n      </Alert>\r\n    </div>\r\n  );\r\n}\r\n"},3003:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var r=n(17),a=n(0),o=n.n(a),i=n(1634),c=n(3917),l=n(830),s=n(1656),u=n(1652),m=n(1803),d=n.n(m),f=Object(i.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function p(){var e=f(),t=o.a.useState(!0),n=Object(r.a)(t,2),a=n[0],i=n[1];return o.a.createElement("div",{className:e.root},o.a.createElement(s.a,{in:a},o.a.createElement(c.a,{action:o.a.createElement(l.a,{"aria-label":"close",color:"inherit",size:"small",onClick:function(){i(!1)}},o.a.createElement(d.a,{fontSize:"inherit"}))},"Close me!")),o.a.createElement(u.a,{disabled:a,variant:"outlined",onClick:function(){i(!0)}},"Re-open"))}},3004:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport { makeStyles } from '@material-ui/core/styles';\r\nimport Alert from '@material-ui/lab/Alert';\r\nimport IconButton from '@material-ui/core/IconButton';\r\nimport Collapse from '@material-ui/core/Collapse';\r\nimport Button from '@material-ui/core/Button';\r\nimport CloseIcon from '@material-ui/icons/Close';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    width: '100%',\r\n    '& > * + *': {\r\n      marginTop: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function TransitionAlerts() {\r\n  const classes = useStyles();\r\n  const [open, setOpen] = React.useState(true);\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Collapse in={open}>\r\n        <Alert\r\n          action={\r\n            <IconButton\r\n              aria-label=\"close\"\r\n              color=\"inherit\"\r\n              size=\"small\"\r\n              onClick={() => {\r\n                setOpen(false);\r\n              }}\r\n            >\r\n              <CloseIcon fontSize=\"inherit\" />\r\n            </IconButton>\r\n          }\r\n        >\r\n          Close me!\r\n        </Alert>\r\n      </Collapse>\r\n      <Button\r\n        disabled={open}\r\n        variant=\"outlined\"\r\n        onClick={() => {\r\n          setOpen(true);\r\n        }}\r\n      >\r\n        Re-open\r\n      </Button>\r\n    </div>\r\n  );\r\n}\r\n"},3005:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var r=n(0),a=n.n(r),o=n(1634),i=n(3917),c=n(1874),l=n.n(c),s=n(3006),u=n.n(s),m=Object(o.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function d(){var e=m();return a.a.createElement("div",{className:e.root},a.a.createElement(i.a,{icon:a.a.createElement(l.a,{fontSize:"inherit"}),severity:"success"},"This is a success alert \u2014 check it out!"),a.a.createElement(i.a,{iconMapping:{success:a.a.createElement(u.a,{fontSize:"inherit"})}},"This is a success alert \u2014 check it out!"),a.a.createElement(i.a,{icon:!1,severity:"success"},"This is a success alert \u2014 check it out!"))}},3006:function(e,t,n){"use strict";var r=n(799);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(0)),o=(0,r(n(1685)).default)(a.default.createElement("path",{d:"M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"CheckCircleOutline");t.default=o},3007:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport { makeStyles } from '@material-ui/core/styles';\r\nimport Alert from '@material-ui/lab/Alert';\r\nimport CheckIcon from '@material-ui/icons/Check';\r\nimport CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    width: '100%',\r\n    '& > * + *': {\r\n      marginTop: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function IconAlerts() {\r\n  const classes = useStyles();\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Alert icon={<CheckIcon fontSize=\"inherit\" />} severity=\"success\">\r\n        This is a success alert \u2014 check it out!\r\n      </Alert>\r\n      <Alert iconMapping={{ success: <CheckCircleOutlineIcon fontSize=\"inherit\" /> }}>\r\n        This is a success alert \u2014 check it out!\r\n      </Alert>\r\n      <Alert icon={false} severity=\"success\">\r\n        This is a success alert \u2014 check it out!\r\n      </Alert>\r\n    </div>\r\n  );\r\n}\r\n"},3008:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return l}));var r=n(0),a=n.n(r),o=n(1634),i=n(3917),c=Object(o.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function l(){var e=c();return a.a.createElement("div",{className:e.root},a.a.createElement(i.a,{variant:"outlined",severity:"error"},"This is an error alert \u2014 check it out!"),a.a.createElement(i.a,{variant:"outlined",severity:"warning"},"This is a warning alert \u2014 check it out!"),a.a.createElement(i.a,{variant:"outlined",severity:"info"},"This is an info alert \u2014 check it out!"),a.a.createElement(i.a,{variant:"outlined",severity:"success"},"This is a success alert \u2014 check it out!"))}},3009:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\r\nimport { makeStyles } from \'@material-ui/core/styles\';\r\nimport Alert from \'@material-ui/lab/Alert\';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    width: \'100%\',\r\n    \'& > * + *\': {\r\n      marginTop: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function SimpleAlerts() {\r\n  const classes = useStyles();\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Alert variant="outlined" severity="error">\r\n        This is an error alert \u2014 check it out!\r\n      </Alert>\r\n      <Alert variant="outlined" severity="warning">\r\n        This is a warning alert \u2014 check it out!\r\n      </Alert>\r\n      <Alert variant="outlined" severity="info">\r\n        This is an info alert \u2014 check it out!\r\n      </Alert>\r\n      <Alert variant="outlined" severity="success">\r\n        This is a success alert \u2014 check it out!\r\n      </Alert>\r\n    </div>\r\n  );\r\n}\r\n'},3010:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return l}));var r=n(0),a=n.n(r),o=n(1634),i=n(3917),c=Object(o.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function l(){var e=c();return a.a.createElement("div",{className:e.root},a.a.createElement(i.a,{variant:"filled",severity:"error"},"This is an error alert \u2014 check it out!"),a.a.createElement(i.a,{variant:"filled",severity:"warning"},"This is a warning alert \u2014 check it out!"),a.a.createElement(i.a,{variant:"filled",severity:"info"},"This is an info alert \u2014 check it out!"),a.a.createElement(i.a,{variant:"filled",severity:"success"},"This is a success alert \u2014 check it out!"))}},3011:function(e,t,n){"use strict";n.r(t),t.default='import React from \'react\';\r\nimport { makeStyles } from \'@material-ui/core/styles\';\r\nimport Alert from \'@material-ui/lab/Alert\';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    width: \'100%\',\r\n    \'& > * + *\': {\r\n      marginTop: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function SimpleAlerts() {\r\n  const classes = useStyles();\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Alert variant="filled" severity="error">\r\n        This is an error alert \u2014 check it out!\r\n      </Alert>\r\n      <Alert variant="filled" severity="warning">\r\n        This is a warning alert \u2014 check it out!\r\n      </Alert>\r\n      <Alert variant="filled" severity="info">\r\n        This is an info alert \u2014 check it out!\r\n      </Alert>\r\n      <Alert variant="filled" severity="success">\r\n        This is a success alert \u2014 check it out!\r\n      </Alert>\r\n    </div>\r\n  );\r\n}\r\n'},3012:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return l}));var r=n(0),a=n.n(r),o=n(1634),i=n(3917),c=Object(o.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function l(){var e=c();return a.a.createElement("div",{className:e.root},a.a.createElement(i.a,{severity:"success",color:"info"},"This is a success alert \u2014 check it out!"))}},3013:function(e,t,n){"use strict";n.r(t),t.default="import React from 'react';\r\nimport { makeStyles } from '@material-ui/core/styles';\r\nimport Alert from '@material-ui/lab/Alert';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    width: '100%',\r\n    '& > * + *': {\r\n      marginTop: theme.spacing(2),\r\n    },\r\n  },\r\n}));\r\n\r\nexport default function ColorAlerts() {\r\n  const classes = useStyles();\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Alert severity=\"success\" color=\"info\">\r\n        This is a success alert \u2014 check it out!\r\n      </Alert>\r\n    </div>\r\n  );\r\n}\r\n"},3917:function(e,t,n){"use strict";var r=n(3),a=n(1),o=n(0),i=(n(2),n(1787)),c=n(20),l=n(9),s=n(242),u=n(63),m=Object(u.a)(o.createElement("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),d=Object(u.a)(o.createElement("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),f=Object(u.a)(o.createElement("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),p=Object(u.a)(o.createElement("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),h=n(1943),v=n(830),y=n(11),b={success:o.createElement(m,{fontSize:"inherit"}),warning:o.createElement(d,{fontSize:"inherit"}),error:o.createElement(f,{fontSize:"inherit"}),info:o.createElement(p,{fontSize:"inherit"})},g=o.createElement(h.a,{fontSize:"small"}),E=o.forwardRef((function(e,t){var n=e.action,c=e.children,l=e.classes,u=e.className,m=e.closeText,d=void 0===m?"Close":m,f=e.color,p=e.icon,h=e.iconMapping,E=void 0===h?b:h,w=e.onClose,A=e.role,k=void 0===A?"alert":A,T=e.severity,C=void 0===T?"success":T,N=e.variant,O=void 0===N?"standard":N,x=Object(r.a)(e,["action","children","classes","className","closeText","color","icon","iconMapping","onClose","role","severity","variant"]);return o.createElement(s.a,Object(a.a)({role:k,square:!0,elevation:0,className:Object(i.a)(l.root,l["".concat(O).concat(Object(y.a)(f||C))],u),ref:t},x),!1!==p?o.createElement("div",{className:l.icon},p||E[C]||b[C]):null,o.createElement("div",{className:l.message},c),null!=n?o.createElement("div",{className:l.action},n):null,null==n&&w?o.createElement("div",{className:l.action},o.createElement(v.a,{size:"small","aria-label":d,title:d,color:"inherit",onClick:w},g)):null)}));t.a=Object(l.a)((function(e){var t="light"===e.palette.type?c.b:c.j,n="light"===e.palette.type?c.j:c.b;return{root:Object(a.a)({},e.typography.body2,{borderRadius:e.shape.borderRadius,backgroundColor:"transparent",display:"flex",padding:"6px 16px"}),standardSuccess:{color:t(e.palette.success.main,.6),backgroundColor:n(e.palette.success.main,.9),"& $icon":{color:e.palette.success.main}},standardInfo:{color:t(e.palette.info.main,.6),backgroundColor:n(e.palette.info.main,.9),"& $icon":{color:e.palette.info.main}},standardWarning:{color:t(e.palette.warning.main,.6),backgroundColor:n(e.palette.warning.main,.9),"& $icon":{color:e.palette.warning.main}},standardError:{color:t(e.palette.error.main,.6),backgroundColor:n(e.palette.error.main,.9),"& $icon":{color:e.palette.error.main}},outlinedSuccess:{color:t(e.palette.success.main,.6),border:"1px solid ".concat(e.palette.success.main),"& $icon":{color:e.palette.success.main}},outlinedInfo:{color:t(e.palette.info.main,.6),border:"1px solid ".concat(e.palette.info.main),"& $icon":{color:e.palette.info.main}},outlinedWarning:{color:t(e.palette.warning.main,.6),border:"1px solid ".concat(e.palette.warning.main),"& $icon":{color:e.palette.warning.main}},outlinedError:{color:t(e.palette.error.main,.6),border:"1px solid ".concat(e.palette.error.main),"& $icon":{color:e.palette.error.main}},filledSuccess:{color:"#fff",fontWeight:e.typography.fontWeightMedium,backgroundColor:e.palette.success.main},filledInfo:{color:"#fff",fontWeight:e.typography.fontWeightMedium,backgroundColor:e.palette.info.main},filledWarning:{color:"#fff",fontWeight:e.typography.fontWeightMedium,backgroundColor:e.palette.warning.main},filledError:{color:"#fff",fontWeight:e.typography.fontWeightMedium,backgroundColor:e.palette.error.main},icon:{marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9},message:{padding:"8px 0"},action:{display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}}}),{name:"MuiAlert"})(E)},3921:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return h}));var r=n(0),a=n.n(r),o=n(1634),i=n(3917),c=n(1),l=n(3),s=(n(2),n(9)),u=n(244),m=n(1787),d=r.forwardRef((function(e,t){var n=e.classes,a=e.className,o=Object(l.a)(e,["classes","className"]);return r.createElement(u.a,Object(c.a)({gutterBottom:!0,component:"div",ref:t,className:Object(m.a)(n.root,a)},o))})),f=Object(s.a)((function(e){return{root:{fontWeight:e.typography.fontWeightMedium,marginTop:-2}}}),{name:"MuiAlertTitle"})(d),p=Object(o.a)((function(e){return{root:{width:"100%","& > * + *":{marginTop:e.spacing(2)}}}}));function h(){var e=p();return a.a.createElement("div",{className:e.root},a.a.createElement(i.a,{severity:"error"},a.a.createElement(f,null,"Error"),"This is an error alert \u2014 ",a.a.createElement("strong",null,"check it out!")),a.a.createElement(i.a,{severity:"warning"},a.a.createElement(f,null,"Warning"),"This is a warning alert \u2014 ",a.a.createElement("strong",null,"check it out!")),a.a.createElement(i.a,{severity:"info"},a.a.createElement(f,null,"Info"),"This is an info alert \u2014 ",a.a.createElement("strong",null,"check it out!")),a.a.createElement(i.a,{severity:"success"},a.a.createElement(f,null,"Success"),"This is a success alert \u2014 ",a.a.createElement("strong",null,"check it out!")))}},3958:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(1689),i=(n(140),n(198)),c=n(1652),l=n(1647),s=n(244),u=n(1634),m=Object(u.a)((function(e){return{layoutRoot:{"& .description":{marginBottom:16}}}}));t.default=function(e){var t=m();return a.a.createElement(i.a,{classes:{root:t.layoutRoot},header:a.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},a.a.createElement("div",{className:"flex flex-col"},a.a.createElement("div",{className:"flex items-center mb-16"},a.a.createElement(l.a,{className:"text-18",color:"action"},"home"),a.a.createElement(l.a,{className:"text-16",color:"action"},"chevron_right"),a.a.createElement(s.a,{color:"textSecondary"},"Documentation"),a.a.createElement(l.a,{className:"text-16",color:"action"},"chevron_right"),a.a.createElement(s.a,{color:"textSecondary"},"Material UI Components")),a.a.createElement(s.a,{variant:"h6"},"Alert")),a.a.createElement(c.a,{className:"normal-case",variant:"contained",component:"a",href:"https://material-ui.com/components/alert",target:"_blank",role:"button"},a.a.createElement(l.a,null,"link"),a.a.createElement("span",{className:"mx-4"},"Reference"))),content:a.a.createElement("div",{className:"p-24 max-w-2xl"},a.a.createElement(s.a,{className:"text-44 mt-32 mb-8",component:"h1"},"Alert"),a.a.createElement(s.a,{className:"description"},"An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task."),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement("strong",null,"Note:")," This component is not documented in the ",a.a.createElement("a",{href:"https://material.io/"},"Material Design guidelines"),", but Material-UI supports it."),a.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Simple alerts"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"The alert offers four severity levels that set a distinctive icon and color."),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(2998).default,raw:n(2999)})),a.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Description"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"You can use the ",a.a.createElement("code",null,"AlertTitle")," component to display a formatted title above the content."),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3921).default,raw:n(3e3)})),a.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Actions"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"An alert can have an action, such as a close or undo button. It is rendered after the message, at the end of the alert."),a.a.createElement(s.a,{className:"mb-16",component:"div"},"If an ",a.a.createElement("code",null,"onClose")," callback is provided and no ",a.a.createElement("code",null,"action")," prop is set, a close icon is displayed. The ",a.a.createElement("code",null,"action")," prop can be used to provide an alternative action, for example using a Button or IconButton."),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3001).default,raw:n(3002)})),a.a.createElement(s.a,{className:"text-24 mt-32 mb-8",component:"h3"},"Transition"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"You can use a ",a.a.createElement("a",{href:"/components/transitions/"},"transition component")," such as ",a.a.createElement("code",null,"Collapse")," to transition the appearance of the alert."),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3003).default,raw:n(3004)})),a.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Icons"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"The ",a.a.createElement("code",null,"icon")," prop allows you to add an icon to the beginning of the alert component. This will override the default icon for the specified severity."),a.a.createElement(s.a,{className:"mb-16",component:"div"},"You can change the default severity to icon mapping with the ",a.a.createElement("code",null,"iconMapping")," prop. This can be defined globally using ",a.a.createElement("a",{href:"/customization/globals/#default-props"},"theme customization"),"."),a.a.createElement(s.a,{className:"mb-16",component:"div"},"Setting the icon prop to false will remove the icon altogether."),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3005).default,raw:n(3007)})),a.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Variants"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"Two additional variants are available \u2013 outlined, and filled:"),a.a.createElement(s.a,{className:"text-24 mt-32 mb-8",component:"h3"},"Outlined"),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3008).default,raw:n(3009)})),a.a.createElement(s.a,{className:"text-24 mt-32 mb-8",component:"h3"},"Filled"),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3010).default,raw:n(3011)})),a.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Toast"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"You can use the Snackbar to ",a.a.createElement("a",{href:"/components/snackbars/#customized-snackbars"},"display a toast")," with the Alert."),a.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Color"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"The ",a.a.createElement("code",null,"color")," prop will override the default color for the specified severity."),a.a.createElement(s.a,{className:"mb-16",component:"div"},a.a.createElement(o.a,{className:"my-24",iframe:!1,component:n(3012).default,raw:n(3013)})),a.a.createElement(s.a,{className:"text-32 mt-32 mb-8",component:"h2"},"Accessibility"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"(WAI-ARIA: ",a.a.createElement("a",{href:"https://www.w3.org/TR/wai-aria-practices/#alert"},"https://www.w3.org/TR/wai-aria-practices/#alert"),")"),a.a.createElement(s.a,{className:"mb-16",component:"div"},"When the component is dynamically displayed, the content is automatically announced by most screen readers. At this time, screen readers do not inform users of alerts that are present when the page loads."),a.a.createElement(s.a,{className:"mb-16",component:"div"},"Using color to add meaning only provides a visual indication, which will not be conveyed to users of assistive technologies such as screen readers. Ensure that information denoted by the color is either obvious from the content itself (for example the visible text), or is included through alternative means, such as additional hidden text."),a.a.createElement(s.a,{className:"mb-16",component:"div"},"Actions must have a tab index of 0 so that they can be reached by keyboard-only users."))})}}}]);