(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[173],{4026:function(e,a,t){"use strict";t.r(a);var n=t(140),o=t(198),r=t(1647),l=t(244),c=t(0),s=t.n(c);a.default=function(){return s.a.createElement(o.a,{header:s.a.createElement("div",{className:"flex flex-1 items-center justify-between p-24"},s.a.createElement("div",{className:"flex flex-col"},s.a.createElement("div",{className:"flex items-center mb-16"},s.a.createElement(r.a,{className:"text-18",color:"action"},"home"),s.a.createElement(r.a,{className:"text-16",color:"action"},"chevron_right"),s.a.createElement(l.a,{color:"textSecondary"},"Documentation"),s.a.createElement(r.a,{className:"text-16",color:"action"},"chevron_right"),s.a.createElement(l.a,{color:"textSecondary"},"Working with Fuse React")),s.a.createElement(l.a,{variant:"h6"},"Code Splitting (Lazy loading)"))),content:s.a.createElement("div",{className:"p-24 max-w-2xl"},s.a.createElement(l.a,{className:"mb-16",component:"p"},"Code-splitting your app can help you \u201clazy-load\u201d just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven\u2019t reduced the overall amount of code in your app, you\u2019ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load."),s.a.createElement(l.a,{className:"mt-32 mb-8",variant:"h5"},"Route-based code splitting"),s.a.createElement(l.a,{className:"mb-16",component:"p"},"We are using ",s.a.createElement("b",null,"React.lazy")," function to dynamically import component.",s.a.createElement("br",null),s.a.createElement("b",null,"FuseSuspense")," component is created for to avoid repetition of ",s.a.createElement("b",null,"React.Suspense"),"component defaults, which is used in the theme layouts.",s.a.createElement("br",null),"Checkout the examples below to see dynamically or regular way of importing the components."),s.a.createElement("div",{className:"flex flex-wrap lg:-mx-4"},s.a.createElement("div",{className:"w-full lg:w-1/2 lg:px-4"},s.a.createElement(l.a,{className:"mt-32 mb-8",variant:"h6"},"Lazy Loaded Component:"),s.a.createElement(n.a,{component:"pre",className:"language-jsx my-16"},"\n                            import React from 'react';\n\n                            export const AnalyticsDashboardAppConfig = {\n                                settings: {\n                                    layout: {\n                                        config: {}\n                                    }\n                                },\n                                routes  : [\n                                    {\n                                        path     : '/apps/dashboards/analytics',\n                                        component: React.lazy(() => import('./AnalyticsDashboardApp'))\n                                    }\n                                ]\n                            };\n                            ")),s.a.createElement("div",{className:"w-full lg:w-1/2 lg:px-4"},s.a.createElement(l.a,{className:"mt-32 mb-8",variant:"h6"},"Regular Loaded Component:"),s.a.createElement(n.a,{component:"pre",className:"language-jsx my-16"},"\n                                    import AnalyticsDashboardApp from './AnalyticsDashboardApp';\n\n                                    export const AnalyticsDashboardAppConfig = {\n                                        settings: {\n                                            layout: {\n                                                config: {}\n                                            }\n                                        },\n                                        routes  : [\n                                            {\n                                                path     : '/apps/dashboards/analytics',\n                                                component: AnalyticsDashboardApp\n                                            }\n                                        ]\n                                    };\n                                  "))),s.a.createElement(l.a,{className:"mt-32 mb-8",variant:"h5"},"Code splitting the Redux reducers (Dynamically loaded reducers)"),s.a.createElement(l.a,{className:"mb-16",component:"p"},"We created Higher Order Component ",s.a.createElement("code",null,"withReducer")," to load redux reducer before the component render.",s.a.createElement("br",null),"You just need to pass ",s.a.createElement("b",null,"key")," and the ",s.a.createElement("b",null,"reducer")," to the component."),s.a.createElement(n.a,{component:"pre",className:"language-jsx my-16"},"\n                              import withReducer from 'app/store/withReducer';\n                              import reducer from './store/reducers';\n                              .\n                              .\n                              export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);\n                            "))})}}}]);