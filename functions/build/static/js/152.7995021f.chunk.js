(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[152],{3937:function(e,a,t){"use strict";t.r(a);var n=t(1693),r=t.n(n),i=t(1717),l=t(17),s=t(128),o=(t(529),t(525)),c=t(1702),m=t(154),u=(t(30),t(8),t(1652)),d=t(235),p=t(1647),f=t(1634),w=t(51),E=t(1680),h=t(1681),b=t(1657),x=t(244),v=t(293),g=(t(10),t(0)),y=t.n(g),N=t(5),O=t(103),C=t(32),j=t(1715),I=t(1774),P=Object(f.a)((function(e){return{productImageFeaturedStar:{position:"absolute",top:0,right:0,color:d.a[400],opacity:0},productImageUpload:{transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut},productImageItem:{transitionProperty:"box-shadow",transitionDuration:e.transitions.duration.short,transitionTimingFunction:e.transitions.easing.easeInOut,"&:hover":{"& $productImageFeaturedStar":{opacity:.8}},"&.featured":{pointerEvents:"none",boxShadow:e.shadows[3],"& $productImageFeaturedStar":{opacity:1},"&:hover $productImageFeaturedStar":{opacity:1}}}}}));a.default=Object(v.a)("eCommerceApp",I.a)((function(e){var a=Object(N.b)(),t=Object(N.c)((function(e){var a=e.eCommerceApp,t=e.auth;return{account:a.account,currentEmail:t.user.data.email,mainId:t.user.uid}})),n=t.account,d=t.currentEmail,f=t.mainId,v=Object(w.a)(),I=(P(e),Object(g.useState)(0)),S=Object(l.a)(I,2),F=S[0],k=S[1],W=Object(g.useState)(!1),q=Object(l.a)(W,2),A=q[0],T=q[1],$=Object(m.c)(null),D=$.form,J=$.handleChange,L=$.setForm,R=Object(O.i)();return Object(m.b)((function(){(function(){var e=Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return T(!1),e.t0=a,e.next=5,j.y();case 5:return e.t1=e.sent,e.next=8,(0,e.t0)(e.t1);case 8:return e.t2=a,e.next=11,j.z();case 11:return e.t3=e.sent,e.next=14,(0,e.t2)(e.t3);case 14:T(!0);case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[a,R]),Object(g.useEffect)((function(){(n.email&&!D||n.email&&D&&n.email.id!==D.id)&&L(0===F?n.email:n.password)}),[D,n.password,n.email,L,F]),A?y.a.createElement(c.a,{classes:{toolbar:"p-0",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:D&&y.a.createElement("div",{className:"flex flex-1 w-full items-center justify-between"},y.a.createElement("div",{className:"flex flex-col items-start max-w-full"},y.a.createElement(s.a,{animation:"transition.slideRightIn",delay:300},y.a.createElement(x.a,{className:"normal-case flex items-center sm:mb-12",component:C.a,role:"button",to:"/",color:"inherit"},y.a.createElement(p.a,{className:"text-20"},"ltr"===v.direction?"arrow_back":"arrow_forward"),y.a.createElement("span",{className:"mx-4"},"Home"))),y.a.createElement("div",{className:"flex items-center max-w-full"},y.a.createElement(s.a,{animation:"transition.expandIn",delay:300},y.a.createElement("img",{className:"w-32 sm:w-48 rounded",src:"assets/images/ecommerce/product-image-placeholder.png",alt:"privacy"})),y.a.createElement("div",{className:"flex flex-col min-w-0 mx-8 sm:mc-16"},y.a.createElement(s.a,{animation:"transition.slideLeftIn",delay:300},y.a.createElement(x.a,{className:"text-16 sm:text-20 truncate"},"Security and Privacy")),y.a.createElement(s.a,{animation:"transition.slideLeftIn",delay:300},y.a.createElement(x.a,{variant:"caption"},"Security And Privacy"))))),y.a.createElement(s.a,{animation:"transition.slideRightIn",delay:300},y.a.createElement(u.a,{className:"whitespace-no-wrap normal-case",variant:"contained",color:"secondary",disabled:!function(){if(0===F)return D.newEmail&&D.confrimEmail&&D.newEmail.length>0&&D.confrimEmail.length&&D.newEmail===D.confrimEmail}(),onClick:Object(i.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,j.x({email:D.newEmail,id:f});case 3:return e.t1=e.sent,e.next=6,(0,e.t0)(e.t1);case 6:case"end":return e.stop()}}),e)})))},"Save"))),contentToolbar:y.a.createElement(h.a,{value:F,onChange:function(e,a){k(a)},indicatorColor:"primary",textColor:"primary",variant:"scrollable",scrollButtons:"auto",classes:{root:"w-full h-64"}},y.a.createElement(E.a,{className:"h-64 normal-case",label:"Email Change"}),y.a.createElement(E.a,{className:"h-64 normal-case",label:"Password Change"})),content:D&&y.a.createElement("div",{className:"p-16 sm:p-24 max-w-2xl"},0===F&&y.a.createElement("div",null,y.a.createElement(b.a,{className:"mt-8 mb-16",id:"email",name:"email",onChange:J,label:"Email",type:"text",disabled:!0,value:d,variant:"outlined",fullWidth:!0}),y.a.createElement(b.a,{className:"mt-8 mb-16",required:!0,label:"New Email",type:"text",id:"newEmail",name:"newEmail",value:D.newEmail,onChange:J,variant:"outlined",fullWidth:!0}),y.a.createElement(b.a,{className:"mt-8 mb-16",required:!0,label:"Confrim Email",id:"confrimEmail",type:"text",name:"confrimEmail",value:D.confrimEmail,onChange:J,variant:"outlined",fullWidth:!0})),1===F&&y.a.createElement("div",null,y.a.createElement(b.a,{className:"mt-8 mb-16",id:"password",name:"password",onChange:J,label:"Old Password",type:"text",value:D.password,variant:"outlined",fullWidth:!0}),y.a.createElement(b.a,{className:"mt-8 mb-16",required:!0,label:"New Password",type:"text",id:"newPassword",name:"newPassword",value:D.newPassword,onChange:J,variant:"outlined",fullWidth:!0}),y.a.createElement(b.a,{className:"mt-8 mb-16",required:!0,label:"Confrim Password",id:"confrimPassword",type:"text",name:"confrimPassword",value:D.confrimPassword,onChange:J,variant:"outlined",fullWidth:!0}))),innerScroll:!0}):y.a.createElement(o.a,null)}))}}]);