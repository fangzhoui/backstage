webpackJsonp([41],{1040:function(t,e,a){var n=a(932);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(11)("76c269be",n,!0)},267:function(t,e,a){a(1040);var n=a(9)(a(842),a(989),"data-v-6ef22ff8",null);t.exports=n.exports},342:function(t,e,a){"use strict";var n=a(62),o={history:"management/api/historyRecord/list",fromKeyList:"management/api/user/fromKeyList",userList:"management/api/user/list",export:"management/api/user/export",userDetail:"management/api/user/userDetail",groupList:"management/api/click/groupList",recordList:"management/api/click/recordList",clickList:"management/api/click/clickList",pageCountFromKeyList:"management/api/click/fromKeyList",pageCountExport:"management/api/click/recordExport",productClickList:"management/api/click/productClickList",productList:"management/api/click/productList",productRecordExport:"management/api/click/productRecordExport",productRecordList:"management/api/click/productRecordList",qrRecordList:"management/api/attentionRecord/list",gameDownloadCount:"management/api/game/downloadCount",changeDownloadCount:"management/api/game/changeDownloadCount"};e.a={history:function(t){return n.a.get(o.history,t)},fromKeyList:function(t){return n.a.get(o.fromKeyList,t)},userList:function(t){return n.a.get(o.userList,t)},export:function(t){return n.a.get(o.export,t)},userDetail:function(t){return n.a.get(o.userDetail,t)},groupList:function(t){return n.a.get(o.groupList,t)},recordList:function(t){return n.a.get(o.recordList,t)},clickList:function(t){return n.a.get(o.clickList,t)},pageCountFromKeyList:function(t){return n.a.get(o.pageCountFromKeyList,t)},pageCountExport:function(t){return n.a.get(o.pageCountExport,t)},productClickList:function(t){return n.a.get(o.productClickList,t)},productList:function(t){return n.a.get(o.productList,t)},productRecordExport:function(t){return n.a.get(o.productRecordExport,t)},productRecordList:function(t){return n.a.get(o.productRecordList,t)},qrRecordList:function(t){return n.a.get(o.qrRecordList,t)},gameDownloadCount:function(t){return n.a.get(o.gameDownloadCount,t)},changeDownloadCount:function(t){return n.a.post(o.changeDownloadCount,t)}}},842:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(342);e.default={data:function(){return{loading:!1,pageSize:10,currentpage:1,page:"",gameName:"",input5:"",tableData:[],dataTotal:null}},created:function(){this.downLoadList({name:"",pageSize:10})},methods:{downLoadList:function(t){var e=this;this.loading=!0,n.a.gameDownloadCount(t).then(function(t){"0"==t.data.code&&(e.dataTotal=t.data.data.count,t.data.data.list.forEach(function(t){t.show=!0}),e.tableData=t.data.data.list,e.loading=!1)})},search:function(){var t={page:1,pageSize:this.pageSize};this.gameName?t.name=this.gameName.trim():t.name="",this.downLoadList(t)},countCurrentChange:function(t){this.page=t;var e={page:t,pageSize:this.pageSize};this.gameName?e.name=this.gameName:e.name="",this.downLoadList(e)},handleEdit:function(t,e){this.$set(e,"show",!1)},handleSave:function(t,e){e.dummyCount&&null!=e.dummyCount&&void 0!=e.dummyCount||this.$set(e,"dummyCount",0),this.$set(e,"show",!0);var a={gameId:e.id,dummyCount:e.dummyCount};n.a.changeDownloadCount(a).then(function(t){})}}}},932:function(t,e,a){e=t.exports=a(7)(),e.push([t.i,".history_body[data-v-6ef22ff8]{margin-top:20px}.Input_Text[data-v-6ef22ff8]{width:50px;height:30px;font-size:16px;line-height:30px}",""])},989:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"down-load-count"},[a("div",[a("el-breadcrumb",[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-star-on"}),t._v(" 下载排行")])],1)],1),t._v(" "),a("div",{staticClass:"history_body"},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:5}},[a("el-input",{attrs:{placeholder:"游戏名称"},model:{value:t.gameName,callback:function(e){t.gameName=e},expression:"gameName"}})],1),t._v(" "),a("el-col",{attrs:{span:4}},[a("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")])],1)],1)],1),t._v(" "),a("div",[a("el-table",{directives:[{name:"loading",rawName:"v-loading.body.loak",value:t.loading,expression:"loading",modifiers:{body:!0,loak:!0}}],staticStyle:{width:"100%"},attrs:{data:t.tableData}},[a("el-table-column",{attrs:{type:"index",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"游戏名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"downloadCount",label:"实际下载量"}}),t._v(" "),a("el-table-column",{attrs:{prop:"dummyCount",label:"虚拟下载量"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.show?a("el-button",{attrs:{size:"small",icon:"el-icon-edit"},on:{click:function(a){t.handleEdit(e.$index,e.row)}}},[t._v("\n                                "+t._s(e.row.dummyCount)+"\n                            ")]):a("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入内容"},model:{value:e.row.dummyCount,callback:function(a){t.$set(e.row,"dummyCount",a)},expression:"scope.row.dummyCount"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-edit"},on:{click:function(a){t.handleSave(e.$index,e.row)}},slot:"append"})],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"总下载量"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                            "+t._s(Number(e.row.downloadCount)+Number(e.row.dummyCount))+"\n                        ")]}}])})],1)],1),t._v(" "),a("div",{staticClass:"pagenation_pane"},[a("el-pagination",{attrs:{"page-sizes":[10],"page-size":t.pageSize,"current-page":t.currentpage,layout:"total, sizes, prev, pager, next, jumper",total:t.dataTotal},on:{"current-change":t.countCurrentChange}})],1)])],1)])},staticRenderFns:[]}}});