webpackJsonp([42],{1014:function(t,e,a){var n=a(906);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(11)("0de87124",n,!0)},262:function(t,e,a){a(1014);var n=a(9)(a(837),a(962),"data-v-130bf2f4",null);t.exports=n.exports},342:function(t,e,a){"use strict";var n=a(62),r={history:"management/api/historyRecord/list",fromKeyList:"management/api/user/fromKeyList",userList:"management/api/user/list",export:"management/api/user/export",userDetail:"management/api/user/userDetail",groupList:"management/api/click/groupList",recordList:"management/api/click/recordList",clickList:"management/api/click/clickList",pageCountFromKeyList:"management/api/click/fromKeyList",pageCountExport:"management/api/click/recordExport",productClickList:"management/api/click/productClickList",productList:"management/api/click/productList",productRecordExport:"management/api/click/productRecordExport",productRecordList:"management/api/click/productRecordList",qrRecordList:"management/api/attentionRecord/list",gameDownloadCount:"management/api/game/downloadCount",changeDownloadCount:"management/api/game/changeDownloadCount"};e.a={history:function(t){return n.a.get(r.history,t)},fromKeyList:function(t){return n.a.get(r.fromKeyList,t)},userList:function(t){return n.a.get(r.userList,t)},export:function(t){return n.a.get(r.export,t)},userDetail:function(t){return n.a.get(r.userDetail,t)},groupList:function(t){return n.a.get(r.groupList,t)},recordList:function(t){return n.a.get(r.recordList,t)},clickList:function(t){return n.a.get(r.clickList,t)},pageCountFromKeyList:function(t){return n.a.get(r.pageCountFromKeyList,t)},pageCountExport:function(t){return n.a.get(r.pageCountExport,t)},productClickList:function(t){return n.a.get(r.productClickList,t)},productList:function(t){return n.a.get(r.productList,t)},productRecordExport:function(t){return n.a.get(r.productRecordExport,t)},productRecordList:function(t){return n.a.get(r.productRecordList,t)},qrRecordList:function(t){return n.a.get(r.qrRecordList,t)},gameDownloadCount:function(t){return n.a.get(r.gameDownloadCount,t)},changeDownloadCount:function(t){return n.a.post(r.changeDownloadCount,t)}}},837:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(65),r=a.n(n),i=a(342);e.default={name:"history-page",data:function(){return{loading:!1,pageSize:10,page:"",time:"",phone:"",tableData:[],dataTotal:null,currentpage:1,timeState:!1,searchState:!1}},methods:{timeFn:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},search:function(){var t=this,e=this.time;if(e.length>0)if(null!=e[0]){var a=e[0].getFullYear(),n=e[1].getFullYear(),o=e[0].getMonth()+1<10?"0"+(e[0].getMonth()+1):e[0].getMonth()+1,l=e[1].getMonth()+1<10?"0"+(e[1].getMonth()+1):e[1].getMonth()+1,s=e[0].getDate()<10?"0"+e[0].getDate():e[0].getDate(),u=e[1].getDate()<10?"0"+e[1].getDate():e[1].getDate(),c=a+"-"+o+"-"+s+" 00:00:00",d=n+"-"+l+"-"+u+" 23:59:59";if(this.timeState=!0,""==this.phone){var p={timeBegin:c,timeEnd:d};i.a.history(p).then(function(e){var a=e.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:t.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}t.tableData=n,t.dataTotal=e.data.data.total})}else{var g={timeBegin:c,timeEnd:d,phone:this.phone};i.a.history(g).then(function(e){var a=e.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:t.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}t.tableData=n,t.dataTotal=e.data.data.total})}}else{if(this.timeState=!1,""==this.phone)return this.$message("请输入要搜索的关键字段"),void this.getList();if(!this.phone.match(/^1[35678]\d{9}$/g))return void this.$message("请输入正确的电话号码");i.a.history({phone:this.phone}).then(function(e){var a=e.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:t.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}t.tableData=n,t.dataTotal=e.data.data.total})}else{if(this.timeState=!1,""==this.phone)return this.$message("请输入要搜索的关键字段"),void this.getList();if(!this.phone.match(/^1[35678]\d{9}$/g))return void this.$message("请输入正确的电话号码");i.a.history({phone:this.phone}).then(function(e){var a=e.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:t.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}t.tableData=n,t.dataTotal=e.data.data.total})}},getList:function(){var t=this;i.a.history({pageSize:this.pageSize}).then(function(e){var a=e.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:t.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}t.tableData=n,t.dataTotal=e.data.data.total})},handleCurrentChange:function(t){var e=this;if(this.timeState){var a=this.time,n=a[0].getFullYear(),o=a[1].getFullYear(),l=a[0].getMonth()+1<10?"0"+(a[0].getMonth()+1):a[0].getMonth()+1,s=a[1].getMonth()+1<10?"0"+(a[1].getMonth()+1):a[1].getMonth()+1,u=a[0].getDate()<10?"0"+a[0].getDate():a[0].getDate(),c=a[1].getDate()<10?"0"+a[1].getDate():a[1].getDate(),d=n+"-"+l+"-"+u+" 00:00:00",p=o+"-"+s+"-"+c+" 23:59:59";if(""==this.phone){var g={timeBegin:d,timeEnd:p,page:t,pageSize:this.pageSize};this.loading=!0,i.a.history(g).then(function(t){if(0==t.data.code){var a=t.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:e.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}e.tableData=n,e.dataTotal=t.data.data.total,e.loading=!1}else e.loading=!1})}else{var m={timeBegin:d,timeEnd:p,phone:this.phone,page:t,pageSize:this.pageSize};this.loading=!0,i.a.history(m).then(function(t){if(0==t.data.code){var a=t.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:e.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}e.tableData=n,e.dataTotal=t.data.data.total,e.loading=!1}else e.loading=!1})}}else if(""==this.phone){var h={page:t,pageSize:this.pageSize};this.loading=!0,i.a.history(h).then(function(t){if(0==t.data.code){var a=t.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:e.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}e.tableData=n,e.dataTotal=t.data.data.total,e.loading=!1}else e.loading=!1})}else{var f={phone:this.phone,page:t,pageSize:this.pageSize};this.loading=!0,i.a.history(f).then(function(t){if(0==t.data.code){var a=t.data.data.list,n=[],i=!0,o=!1,l=void 0;try{for(var s,u=r()(a);!(i=(s=u.next()).done);i=!0){var c=s.value,d={name:c.name,subName:c.subName,linkType:c.linkType,fromKey:c.fromKey,createAt:e.timeFn(c.createAt)};n.push(d)}}catch(t){o=!0,l=t}finally{try{!i&&u.return&&u.return()}finally{if(o)throw l}}e.tableData=n,e.dataTotal=t.data.data.total,e.loading=!1}else e.loading=!1})}}},mounted:function(){this.getList()}}},906:function(t,e,a){e=t.exports=a(7)(),e.push([t.i,".history_body[data-v-130bf2f4]{margin-top:20px}.pagenation_pane[data-v-130bf2f4]{padding-top:10px;display:flex;align-items:center;justify-content:center}",""])},962:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-menu"}),t._v(" 统计管理")]),t._v(" "),a("el-breadcrumb-item",[t._v("浏览记录")])],1)],1),t._v(" "),a("div",{staticClass:"history_body"},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",placeholder:"选择日期范围"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("el-input",{attrs:{placeholder:"请输入要搜索的电话"},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}})],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")])],1)],1)],1),t._v(" "),a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body.lock",value:t.loading,expression:"loading",modifiers:{body:!0,lock:!0}}],staticStyle:{width:"100%"},attrs:{data:t.tableData,stripe:""}},[a("el-table-column",{attrs:{prop:"name",label:"名称",width:"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"subName",label:"副标题"}}),t._v(" "),a("el-table-column",{attrs:{prop:"linkType",width:"180",label:"类型"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fromKey",width:"180",label:"来源"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createAt",label:"时间"}})],1)],1),t._v(" "),a("div",{staticClass:"pagenation_pane"},[a("el-pagination",{attrs:{small:"",layout:"total,prev, pager, next","page-size":t.pageSize,"current-page":t.currentpage,total:t.dataTotal},on:{"current-change":t.handleCurrentChange}})],1)])],1)])},staticRenderFns:[]}}});