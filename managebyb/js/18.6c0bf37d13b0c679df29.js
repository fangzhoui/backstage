webpackJsonp([18],{1046:function(e,t,n){var a=n(938);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(11)("5f31d140",a,!0)},284:function(e,t,n){n(1046);var a=n(9)(n(859),n(997),"data-v-b5d922c6",null);e.exports=a.exports},325:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"list-item",data:function(){return{showIcon:!1,showDetail:!1,state:!1,indexlabel:""}},props:{index:null,code:null,name:{type:String,default:"默认"},listType:{type:String,default:"默认"},showListType:{type:Boolean,default:!0},showDetailParent:{type:Boolean,default:!1}},watch:{code:function(e,t){e==this.index?this.state=!0:this.state=!1}},methods:{mouseIn:function(){this.showIcon=!0,this.showDetail=!0},mouseOut:function(){this.showIcon=!1,this.showDetail=!1},deleteItemFn:function(){this.$emit("deleteItem")},lookDetail:function(){this.$emit("lookDetail")},pickFn:function(){this.$emit("select",this.index)}}}},328:function(e,t,n){t=e.exports=n(7)(),t.push([e.i,".list_item_wrap[data-v-2a55c3ba]{display:flex;align-items:center;justify-content:space-between;padding:10px}.list_item_wrap[data-v-2a55c3ba]:hover{background:#eef1f6}.list_item_content[data-v-2a55c3ba]{display:flex;align-items:center}.list_item_content img[data-v-2a55c3ba]{width:40px;height:40px;border-radius:20px}.text_pane[data-v-2a55c3ba]{margin-left:10px;color:#333;min-width:100px}.text_type[data-v-2a55c3ba]{font-size:12px}.pick_color[data-v-2a55c3ba]{color:#2196f3}.delete_icon[data-v-2a55c3ba]{padding:5px}",""])},330:function(e,t,n){n(332);var a=n(9)(n(325),n(331),"data-v-2a55c3ba",null);e.exports=a.exports},331:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"list_item_wrap underline",on:{mouseenter:e.mouseIn,mouseleave:e.mouseOut}},[n("div",{staticClass:"list_item_content"},[e._t("default",[n("img",{attrs:{src:"http://oo6gk8wuu.bkt.clouddn.com/header1.jpg"}})]),e._v(" "),n("div",{staticClass:"text_pane",class:{pick_color:e.state}},[n("p",[e._v(e._s(e.name))]),e._v(" "),e.showListType?n("p",{staticClass:"text_type"},[e._v(e._s(e.listType))]):e._e()])],2),e._v(" "),e.showDetail&&e.showDetailParent?n("div",{staticClass:"delete_icon"},[e._t("deleteIcon",[n("i",{staticClass:"el-icon-edit",on:{click:function(t){t.stopPropagation(),e.lookDetail(t)}}})])],2):e._e(),e._v(" "),e.showIcon?n("div",{staticClass:"delete_icon"},[e._t("deleteIcon",[n("i",{staticClass:"el-icon-circle-close",on:{click:function(t){t.stopPropagation(),e.deleteItemFn(t)}}})])],2):e._e()])},staticRenderFns:[]}},332:function(e,t,n){var a=n(328);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(11)("9ae1ef20",a,!0)},343:function(e,t,n){"use strict";var a=n(62),i={gameInsert:"management/api/game/insert",gameDetail:"management/api/game/detail",gameDelete:"management/api/game/delete",gameList:"management/api/game/list",gameUpdate:"management/api/game/update",searchByName:"management/api/game/searchByName",liveInsert:"management/api/live/insert",liveDetail:"management/api/live/detail",liveDelete:"management/api/live/delete",liveUpdate:"management/api/live/update",liveList:"/management/api/live/list",businessInsert:"management/api/business/insert",businessDetail:"management/api/business/detail",businessDelete:"management/api/business/delete",businessList:"management/api/business/list",businessUpdate:"management/api/business/update",convenienceInsert:"management/api/convenience/insert",convenienceDelete:"management/api/convenience/delete",convenienceList:"management/api/convenience/list",convenienceUpdate:"management/api/convenience/update",hotList:"management/api/search/list",hotDelete:"management/api/search/delete",hotInsert:"management/api/search/insert",hotUpdate:"management/api/search/update",novelList:"management/api/novel/list",novelDetail:"management/api/novel/detail",novelInsert:"management/api/novel/insert",novelDelete:"management/api/novel/delete",novelUpdate:"management/api/novel/update",cartoonList:"management/api/cartoon/list",cartoonDetail:"management/api/cartoon/detail",cartoonInsert:"management/api/cartoon/insert",cartoonDelete:"management/api/cartoon/delete",cartoonUpdate:"management/api/cartoon/update"};t.a={gameInsert:function(e){return a.a.post(i.gameInsert,e)},gameDetail:function(e){return a.a.get(i.gameDetail,e)},gameDelete:function(e){return a.a.post(i.gameDelete,e)},gameList:function(e){return a.a.get(i.gameList,e)},gameUpdate:function(e){return a.a.post(i.gameUpdate,e)},searchByName:function(e){return a.a.get(i.searchByName,e)},liveInsert:function(e){return a.a.post(i.liveInsert,e)},liveDetail:function(e){return a.a.get(i.liveDetail,e)},liveDelete:function(e){return a.a.post(i.liveDelete,e)},liveList:function(e){return a.a.get(i.liveList,e)},liveUpdate:function(e){return a.a.post(i.liveUpdate,e)},businessInsert:function(e){return a.a.post(i.businessInsert,e)},businessDetail:function(e){return a.a.get(i.businessDetail,e)},businessDelete:function(e){return a.a.post(i.businessDelete,e)},businessList:function(e){return a.a.get(i.businessList,e)},businessUpdate:function(e){return a.a.post(i.businessUpdate,e)},convenienceInsert:function(e){return a.a.post(i.convenienceInsert,e)},convenienceList:function(e){return a.a.get(i.convenienceList,e)},convenienceUpdate:function(e){return a.a.post(i.convenienceUpdate,e)},convenienceDelete:function(e){return a.a.post(i.convenienceDelete,e)},hotList:function(e){return a.a.get(i.hotList,e)},hotDelete:function(e){return a.a.post(i.hotDelete,e)},hotInsert:function(e){return a.a.post(i.hotInsert,e)},hotUpdate:function(e){return a.a.post(i.hotUpdate,e)},novelList:function(e){return a.a.get(i.novelList,e)},novelDetail:function(e){return a.a.get(i.novelDetail,e)},novelInsert:function(e){return a.a.post(i.novelInsert,e)},novelDelete:function(e){return a.a.post(i.novelDelete,e)},novelUpdate:function(e){return a.a.post(i.novelUpdate,e)},cartoonList:function(e){return a.a.get(i.cartoonList,e)},cartoonDetail:function(e){return a.a.get(i.cartoonDetail,e)},cartoonInsert:function(e){return a.a.post(i.cartoonInsert,e)},cartoonDelete:function(e){return a.a.post(i.cartoonDelete,e)},cartoonUpdate:function(e){return a.a.post(i.cartoonUpdate,e)}}},369:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"list-item",data:function(){return{showIcon:!1,state:!1,indexlabel:""}},props:{index:null,code:null},watch:{code:function(e,t){e==this.index?this.state=!0:this.state=!1}},methods:{mouseIn:function(){this.showIcon=!0},mouseOut:function(){this.showIcon=!1},deleteItemFn:function(){this.$emit("deleteItem")}}}},372:function(e,t,n){t=e.exports=n(7)(),t.push([e.i,".list_item_wrap[data-v-759b58c0]{display:flex;align-items:center;justify-content:space-between;padding:10px}.list_item_wrap[data-v-759b58c0]:hover{background:#eef1f6}.fontColor[data-v-759b58c0]{color:#2196f3}",""])},383:function(e,t,n){n(385);var a=n(9)(n(369),n(384),"data-v-759b58c0",null);e.exports=a.exports},384:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"list_item_wrap underline",on:{mouseenter:e.mouseIn,mouseleave:e.mouseOut}},[n("div",{staticClass:"list_item_content",class:{fontColor:e.state}},[e._t("default",[e._v("\n\t\t\t默认项\n\t\t")])],2),e._v(" "),e.showIcon?n("div",{staticClass:"delete_icon"},[e._t("deleteIcon",[n("i",{staticClass:"el-icon-circle-close",on:{click:e.deleteItemFn}})])],2):e._e()])},staticRenderFns:[]}},385:function(e,t,n){var a=n(372);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n(11)("4727c6ec",a,!0)},859:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(65),i=n.n(a),s=n(66),o=n.n(s),l=n(343),c=n(383),r=n.n(c),u=n(330),d=n.n(u);t.default={name:"hot-page",components:{"list-item":r.a,"product-item":d.a},data:function(){return{switchTurn:!1,hotkeyList:[],searchType:"",fixedTop:"",hotWord:"",hotWeight:"",hotType:"biz",id:""}},watch:{switchTurn:function(e,t){e||(this.hotWord="",this.hotWeight="")}},methods:{getList:function(){var e=this;l.a.hotList().then(function(t){0==t.data.code&&(e.hotkeyList=t.data.data)})},deleteItem:function(e,t){var n=this;l.a.hotDelete({searchKey:t,searchType:e}).then(function(e){0==e.data.code&&(n.dataChangeFn(),n.$message("删除了一条数据"))})},add_hotKey:function(){var e=this;l.a.hotInsert({searchKey:this.hotWord,searchType:this.hotType,weight:this.hotWeight}).then(function(t){0==t.data.code&&(e.dataChangeFn(),e.$message("您已新增了一条热词"),e.hotWord="",e.hotWeight="")})},update_key:function(){var e=this;if(""==this.hotWord||""==this.hotWeight)return void this.$message("请输入完整信息");l.a.hotUpdate({id:this.id,searchKey:this.hotWord,searchType:this.hotType,weight:this.hotWeight}).then(function(t){0==t.data.code&&(e.dataChangeFn(),e.$message("您已更新了一条热词"),e.hotWord="",e.hotWeight="",e.switchTurn=!1)})},saveFn:function(){this.switchTurn?this.update_key():this.add_hotKey()},dataChangeFn:function(){var e=this,t={};if("all"!=this.searchType&&""!=this.searchType){var n={searchType:this.searchType};o()(t,n)}if("all"!=this.fixedTop&&""!=this.fixedTop){var a={fixedTop:this.fixedTop};o()(t,a)}l.a.hotList(t).then(function(t){0==t.data.code&&(e.hotkeyList=t.data.data)})},pick:function(e){this.id=e,this.switchTurn=!0;var t=!0,n=!1,a=void 0;try{for(var s,o=i()(this.hotkeyList);!(t=(s=o.next()).done);t=!0){var l=s.value;l.id==e&&(this.hotWord=l.searchKey,this.hotWeight=l.weight,this.hotType=l.searchType)}}catch(e){n=!0,a=e}finally{try{!t&&o.return&&o.return()}finally{if(n)throw a}}}},mounted:function(){this.getList()}}},938:function(e,t,n){t=e.exports=n(7)(),t.push([e.i,".radio_pane[data-v-b5d922c6]{margin:10px 0}.type_pane[data-v-b5d922c6]{font-size:12px}.fontGame[data-v-b5d922c6]{color:#009688}.fontLive[data-v-b5d922c6]{color:#ff9800}.fontBiz[data-v-b5d922c6]{color:#2196f3}.save_btn[data-v-b5d922c6]{display:flex;align-items:center;justify-content:center}",""])},997:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("page-wrap",[n("div",{attrs:{slot:"sideLeft"},slot:"sideLeft"},[n("el-card",[n("div",{attrs:{slot:"header"},slot:"header"},[n("el-switch",{attrs:{"active-text":"详情","inactive-text":"新增","off-color":"#13ce66"},model:{value:e.switchTurn,callback:function(t){e.switchTurn=t},expression:"switchTurn"}})],1),e._v(" "),n("div",[n("el-form",[n("el-form-item",{attrs:{label:"热词"}},[n("el-input",{attrs:{placeholder:"热词"},model:{value:e.hotWord,callback:function(t){e.hotWord=t},expression:"hotWord"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"权重"}},[n("el-input",{attrs:{type:"number",placeholder:"权重"},model:{value:e.hotWeight,callback:function(t){e.hotWeight=t},expression:"hotWeight"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"类型："}},[n("el-radio-group",{model:{value:e.hotType,callback:function(t){e.hotType=t},expression:"hotType"}},[n("el-radio",{attrs:{label:"biz"}},[e._v("电商")]),e._v(" "),n("el-radio",{attrs:{label:"game"}},[e._v("游戏")]),e._v(" "),n("el-radio",{attrs:{label:"live"}},[e._v("直播")])],1)],1)],1),e._v(" "),n("div",{staticClass:"save_btn"},[n("el-button",{attrs:{type:"primary"},on:{click:e.saveFn}},[e._v("保存")])],1)],1)])],1),e._v(" "),n("div",{attrs:{slot:"sideRight"},slot:"sideRight"},[n("el-card",[n("div",{attrs:{slot:"header"},slot:"header"},[n("el-select",{attrs:{placeholder:"选择分类"},on:{change:e.dataChangeFn},model:{value:e.searchType,callback:function(t){e.searchType=t},expression:"searchType"}},[n("el-option",{attrs:{label:"全部",value:"all"}}),e._v(" "),n("el-option",{attrs:{label:"电商",value:"biz"}}),e._v(" "),n("el-option",{attrs:{label:"游戏",value:"game"}}),e._v(" "),n("el-option",{attrs:{label:"直播",value:"live"}})],1),e._v(" "),n("el-select",{attrs:{placeholder:"选择来源"},on:{change:e.dataChangeFn},model:{value:e.fixedTop,callback:function(t){e.fixedTop=t},expression:"fixedTop"}},[n("el-option",{attrs:{label:"全部",value:"all"}}),e._v(" "),n("el-option",{attrs:{label:"配置",value:"1"}}),e._v(" "),n("el-option",{attrs:{label:"热搜",value:"0"}})],1)],1),e._v(" "),n("div",e._l(e.hotkeyList,function(t){return n("list-item",{on:{deleteItem:function(n){e.deleteItem(t.searchType,t.searchKey)}},nativeOn:{click:function(n){e.pick(t.id)}}},[n("div",[n("p",{class:{fontGame:"game"==t.searchType,fontLive:"live"==t.searchType,fontBiz:"biz"==t.searchType}},[e._v(e._s(t.searchKey))]),e._v(" "),n("p",[n("span",{staticClass:"type_pane"},[e._v("类型："+e._s("biz"==t.searchType?"电商":"game"==t.searchType?"游戏":"直播"))]),e._v(" "),n("span",{staticClass:"type_pane"},[e._v("【来源："+e._s(0==t.fixedTop?"热搜":"配置")+"】")])])])])}))])],1)])],1)},staticRenderFns:[]}}});