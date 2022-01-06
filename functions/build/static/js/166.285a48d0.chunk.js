(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[166],{3951:function(e,a,t){"use strict";t.r(a);var n=t(140),o=t(198),r=t(1652),c=t(1647),i=t(244),s=t(15),l=t(0),m=t.n(l),u=t(5);a.default=function(e){var a=Object(u.b)();return m.a.createElement(o.a,{header:m.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},m.a.createElement("div",{className:"flex flex-col"},m.a.createElement("div",{className:"flex items-center mb-16"},m.a.createElement(c.a,{className:"text-18",color:"action"},"home"),m.a.createElement(c.a,{className:"text-16",color:"action"},"chevron_right"),m.a.createElement(i.a,{color:"textSecondary"},"Documentation"),m.a.createElement(c.a,{className:"text-16",color:"action"},"chevron_right"),m.a.createElement(i.a,{color:"textSecondary"},"Fuse Components")),m.a.createElement(i.a,{variant:"h6"},"FuseMessage"))),content:m.a.createElement("div",{className:"p-24 max-w-2xl"},m.a.createElement(i.a,{className:"mb-16",component:"p"},m.a.createElement("code",null,"FuseMessage")," is a simple snackbar trigger for easily showing messages via redux action. It should be located in the theme layouts."),m.a.createElement(i.a,{className:"mt-32 mb-8",variant:"h5"},"Usage"),m.a.createElement(i.a,{className:"mb-16",component:"p"},"You can show messages anywhere with dispatching the action showMessage, its using Material-UI's snackbar so you can pass the props in the object:"),m.a.createElement(n.a,{component:"pre",className:"language-jsx"},"\n                                    <Button \n                                        onClick={()=> dispatch(\n                                            Actions.showMessage({\n                                                message     : 'Hi, how are you?',//text or html\n                                                autoHideDuration: 6000,//ms\n                                                anchorOrigin: {\n                                                    vertical  : 'top',//top bottom\n                                                    horizontal: 'right'//left center right\n                                                },\n                                                variant: 'success'//success error info warning null\n                                            }))}\n                                    >\n                                        Top - Right\n                                    </Button>\n                            "),m.a.createElement(i.a,{className:"mt-32 mb-8",variant:"h5"},"Example"),m.a.createElement(i.a,{className:"mt-32 mb-8",variant:"h6"},"Position"),m.a.createElement("div",null,m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",anchorOrigin:{vertical:"top",horizontal:"right"}}))}},"Top - Right"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",anchorOrigin:{vertical:"top",horizontal:"center"}}))}},"Top-Center"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",anchorOrigin:{vertical:"top",horizontal:"left"}}))}},"Top-Left"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",anchorOrigin:{vertical:"bottom",horizontal:"right"}}))}},"Bottom-Right"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",anchorOrigin:{vertical:"bottom",horizontal:"center"}}))}},"Bottom-Center"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",anchorOrigin:{vertical:"bottom",horizontal:"left"}}))}},"Bottom-Left")),m.a.createElement(i.a,{className:"mt-32 mb-8",variant:"h6"},"Variants"),m.a.createElement("div",null,m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?"}))}},"Default"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",variant:"success"}))}},"Success"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",variant:"warning"}))}},"Warning"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",variant:"error"}))}},"Error"),m.a.createElement(r.a,{onClick:function(){return a(s.o({message:"Hi, how are you?",variant:"info"}))}},"Info")))})}}}]);