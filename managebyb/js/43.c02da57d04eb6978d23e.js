webpackJsonp([43],{1032:function(t,e,a){var i=a(924);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(11)("7c43518a",i,!0)},259:function(t,e,a){a(1032);var i=a(9)(a(832),a(980),"data-v-58e3c3ea",null);t.exports=i.exports},418:function(t,e,a){"use strict";var i=a(62),l={activeNameInsert:"management/api/activityName/insert",activeDelete:"management/api/activityName/delete",activeList:"management/api/activityName/list",itemInsert:"management/api/activityItem/insert",itemDelete:"management/api/activityItem/delete",itemList:"management/api/activityItem/list",countList:"management/api/statistics/list",countStatics:"management/api/statistics/statistics",countExport:"management/api/statistics/export"};e.a={activeInsert:function(t){return i.a.post(l.activeNameInsert,t)},activeDelete:function(t){return i.a.post(l.activeDelete,t)},activeList:function(t){return i.a.get(l.activeList,t)},itemList:function(t){return i.a.get(l.itemList,t)},itemDelete:function(t){return i.a.post(l.itemDelete,t)},itemInsert:function(t){return i.a.post(l.itemInsert,t)},countList:function(t){return i.a.get(l.countList,t)},countStatics:function(t){return i.a.get(l.countStatics,t)},countExport:function(t){return i.a.get(l.countExport,t)}}},832:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(65),l=a.n(i),n=a(66),r=a.n(n),s=a(418);e.default={name:"history-page",data:function(){return{pageSize:10,page:"",time:"",productId:"",device:"",clickType:"",timeState:!1,tableData:[],total:null,currentpage:1,searchState:!1,fromKeyList:[],fromKey:"",productList:[]}},methods:{timeFn:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},fromKeyListFn:function(){var t=this;s.a.activeList().then(function(e){t.fromKeyList=e.data.data})},search:function(){this.searchState=!0;var t={page:1,pageSize:this.pageSize},e=this.time;if(""!=this.time&&null!=this.time&&void 0!=this.time)if(null!=e[0]){this.timeState=!0;var a=e[0].getFullYear(),i=e[1].getFullYear(),l=e[0].getMonth()+1<10?"0"+(e[0].getMonth()+1):e[0].getMonth()+1,n=e[1].getMonth()+1<10?"0"+(e[1].getMonth()+1):e[1].getMonth()+1,s=e[0].getDate()<10?"0"+e[0].getDate():e[0].getDate(),o=e[1].getDate()<10?"0"+e[1].getDate():e[1].getDate(),c=a+"-"+l+"-"+s+" 00:00:00",u=i+"-"+n+"-"+o+" 23:59:59",p={timeBegin:c,timeEnd:u};r()(t,p)}else this.timeState=!1;else this.timeState=!1;if("all"!=this.productId&&""!=this.productId){var d={productId:""+this.productId};r()(t,d)}if("all"!=this.device&&""!=this.device){var v={device:this.device};r()(t,v)}if("all"!=this.clickType&&""!=this.clickType){var h={clickType:this.clickType};r()(t,h)}if("all"!=this.fromKey&&""!=this.fromKey){var m={fromKey:this.fromKey};r()(t,m)}this.getList(t)},getList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{page:1,pageSize:this.pageSize};s.a.countList(e).then(function(e){var a=e.data.data.list;t.total=e.data.data.count;var i=[],n=!0,r=!1,s=void 0;try{for(var o,c=l()(a);!(n=(o=c.next()).done);n=!0){var u=o.value,p={title:u.title,fromKey:u.fromKey,device:u.device,clickType:0==u.clickType?"页面访问":"点击进入",createAt:t.timeFn(u.createAt)};i.push(p)}}catch(t){r=!0,s=t}finally{try{!n&&c.return&&c.return()}finally{if(r)throw s}}t.tableData=i})},handleCurrentChange:function(t){var e={page:t,pageSize:this.pageSize};if(this.searchState){if(this.timeState){var a=this.time,i=a[0].getFullYear(),l=a[1].getFullYear(),n=a[0].getMonth()+1<10?"0"+(a[0].getMonth()+1):a[0].getMonth()+1,s=a[1].getMonth()+1<10?"0"+(a[1].getMonth()+1):a[1].getMonth()+1,o=a[0].getDate()<10?"0"+a[0].getDate():a[0].getDate(),c=a[1].getDate()<10?"0"+a[1].getDate():a[1].getDate(),u=i+"-"+n+"-"+o+" 00:00:00",p=l+"-"+s+"-"+c+" 23:59:59",d={timeBegin:u,timeEnd:p};r()(e,d)}if("all"!=this.productId&&""!=this.productId){var v={productId:""+this.productId};r()(e,v)}if("all"!=this.device&&""!=this.device){var h={device:this.device};r()(e,h)}if("all"!=this.clickType&&""!=this.clickType){var m={clickType:this.clickType};r()(e,m)}if("all"!=this.fromKey&&""!=this.fromKey){var g={fromKey:this.fromKey};r()(e,g)}this.getList(e)}else this.getList(e)},changeActiveFn:function(){var t=this;this.productId="",this.productList=[],""==this.fromKey||"all"==this.fromKey?this.productList=[]:s.a.itemList({fromKey:this.fromKey}).then(function(e){t.productList=e.data.data})},getStatics:function(){s.a.countStatics().then(function(t){console.log(t.data)})}},mounted:function(){this.getList(),this.fromKeyListFn()}}},924:function(t,e,a){e=t.exports=a(7)(),e.push([t.i,".history_body[data-v-58e3c3ea]{margin-top:20px}.pagenation_pane[data-v-58e3c3ea]{padding-top:10px;display:flex;align-items:center;justify-content:center}",""])},980:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-menu"}),t._v(" 活动管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("活动统计")])],1)],1),t._v(" "),a("div",{staticClass:"history_body"},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-row",{attrs:{gutter:5}},[a("el-col",{attrs:{span:8}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",placeholder:"选择日期范围"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),t._v(" "),a("el-col",{attrs:{span:3}},[a("el-select",{attrs:{placeholder:"选择活动"},on:{change:t.changeActiveFn},model:{value:t.fromKey,callback:function(e){t.fromKey=e},expression:"fromKey"}},[a("el-option",{attrs:{value:"all",label:"全部"}}),t._v(" "),t._l(t.fromKeyList,function(t){return a("el-option",{attrs:{value:t.fromkey,label:t.name}})})],2)],1),t._v(" "),a("el-col",{attrs:{span:3}},[a("el-select",{attrs:{placeholder:"选择产品"},model:{value:t.productId,callback:function(e){t.productId=e},expression:"productId"}},[a("el-option",{attrs:{value:"all",label:"全部"}}),t._v(" "),t._l(t.productList,function(t){return a("el-option",{attrs:{value:t.id,label:t.name}})})],2)],1),t._v(" "),a("el-col",{attrs:{span:3}},[a("el-select",{attrs:{placeholder:"选择设备"},model:{value:t.device,callback:function(e){t.device=e},expression:"device"}},[a("el-option",{attrs:{value:"all",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:"ANDROID",label:"安卓"}}),t._v(" "),a("el-option",{attrs:{value:"IOS",label:"苹果"}}),t._v(" "),a("el-option",{attrs:{value:"PC",label:"PC"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:3}},[a("el-select",{attrs:{placeholder:"访问方式"},model:{value:t.clickType,callback:function(e){t.clickType=e},expression:"clickType"}},[a("el-option",{attrs:{value:"all",label:"全部"}}),t._v(" "),a("el-option",{attrs:{value:"0",label:"页面访问"}}),t._v(" "),a("el-option",{attrs:{value:"1",label:"点击进入"}}),t._v(" "),a("el-option",{attrs:{value:"2",label:"点击更多"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:2}},[a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")])],1)],1)],1),t._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[a("el-table-column",{attrs:{prop:"title",label:"名称",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fromKey",label:"产品",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"device",label:"设备"}}),t._v(" "),a("el-table-column",{attrs:{prop:"clickType",label:"访问方式"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createAt",width:"220",label:"时间"}})],1)],1),t._v(" "),a("div",{staticClass:"pagenation_pane"},[a("el-pagination",{attrs:{small:"",layout:"total, prev, pager, next","page-size":t.pageSize,"current-page":t.currentpage,total:t.total},on:{"current-change":t.handleCurrentChange}})],1)])],1)])},staticRenderFns:[]}}});