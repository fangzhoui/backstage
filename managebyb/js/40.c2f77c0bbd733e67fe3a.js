webpackJsonp([40],{1022:function(t,e,i){var a=i(914);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(11)("2731d4d2",a,!0)},293:function(t,e,i){i(1022);var a=i(9)(i(868),i(970),"data-v-361d5abe",null);t.exports=a.exports},421:function(t,e,i){"use strict";var a=i(62),o={topicInsert:"management/api/topic/insert",topicUpdate:"management/api/topic/update",allTopicList:"management/api/topic/allTopicList",topicDelete:"management/api/topic/delete",topicGameList:"management/api/topic/gameList",topicDetail:"management/api/topic/topicDetail",relInsert:"management/api/topic/relInsert",relDelete:"management/api/topic/relDelete"};e.a={topicInsert:function(t){return a.a.post(o.topicInsert,t)},topicUpdate:function(t){return a.a.post(o.topicUpdate,t)},allTopicList:function(t){return a.a.get(o.allTopicList,t)},topicDelete:function(t){return a.a.post(o.topicDelete,t)},topicGameList:function(t){return a.a.get(o.topicGameList,t)},topicDetail:function(t){return a.a.get(o.topicDetail,t)},relInsert:function(t){return a.a.post(o.relInsert,t)},relDelete:function(t){return a.a.post(o.relDelete,t)}}},868:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(29),o=i(421);e.default={name:"topic-section",data:function(){return{label:"内容",bannerList:[],sectionList:[],allSectionList:[],pickState:!1,section:"",preUrl:sessionStorage.getItem("imageUrl"),topicdialogVisible:!1,topicId:"",sectionId:""}},watch:{topicdialogVisible:function(t,e){t||(this.topicId="")}},methods:{pickBanner:function(t){this.pickState=!0,this.section=t.section,this.sectionId=t.id;var e={section:t.section};this.getSectionList(e)},getList:function(){var t=this,e={type:0};a.a.sectionList(e).then(function(e){"0"==e.data.code&&(t.bannerList=e.data.data)})},getSectionList:function(t){var e=this;o.a.allTopicList(t).then(function(t){"0"==t.data.code&&(e.sectionList=t.data.data)})},getAllSectionList:function(){var t=this;o.a.allTopicList().then(function(e){"0"==e.data.code&&(t.allSectionList=e.data.data)})},addItemBtnFn:function(){this.topicdialogVisible=!0},addTopic:function(){var t=this,e={topicId:this.topicId,sectionId:this.sectionId};a.a.addSectionTopic(e).then(function(e){if("0"==e.data.code){var i={section:t.section};t.getSectionList(i),t.topicdialogVisible=!1}})},choseTop:function(t,e){this.topicId=t},deleteItemFn:function(t){var e=this;this.$confirm("删除后将无法恢复，是否确定删除?").then(function(){var i={topicId:t,sectionId:e.sectionId};a.a.delSectionTopic(i).then(function(t){if("0"==t.data.code){var i={section:e.section};e.getSectionList(i)}})}).catch(function(){})}},created:function(){this.getList(),this.getAllSectionList()}}},914:function(t,e,i){e=t.exports=i(7)(),e.push([t.i,"table[data-v-361d5abe]{width:100%}tr[data-v-361d5abe]{width:100%;display:flex;background:#eef1f6}.table_header_wrap[data-v-361d5abe]{border-radius:5px;border-bottom-left-radius:0;border-bottom-right-radius:0;height:40px}td[data-v-361d5abe]{height:60px;background:#fff;border-bottom:1px solid #ddd;display:flex;align-items:center;padding:5px;font-size:13px}.table_header[data-v-361d5abe]{font-size:16px;font-weight:lighter;display:flex;align-items:center;padding:5px}.table_img[data-v-361d5abe]{width:30%;overflow:hidden}.table_img img[data-v-361d5abe]{width:60px;height:60px}.table_link[data-v-361d5abe],.table_weight[data-v-361d5abe]{width:30%}.table_action[data-v-361d5abe]{width:40%}.topic_list[data-v-361d5abe]{width:100%;list-style:none;border:1px solid #999;padding:15px;border-radius:2px;box-sizing:border-box;height:350px;overflow-y:auto}.topic_item[data-v-361d5abe]{height:40px;line-height:40px;display:flex;margin:5px 0;border:1px solid #999}.topimg_box[data-v-361d5abe]{flex:0 0 40px}.topic_text[data-v-361d5abe]{flex:1;text-align:center}.cho[data-v-361d5abe]{background-color:#999;color:#fff}",""])},970:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("page-wrap",[i("div",{attrs:{slot:"sideLeft"},slot:"sideLeft"},[i("el-card",[i("div",[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-setting"}),t._v(" 主题管理")]),t._v(" "),i("el-breadcrumb-item",[t._v("主题位置")])],1)],1),t._v(" "),i("el-menu",{attrs:{theme:"light","unique-opened":""}},t._l(t.bannerList,function(e,a){return i("el-menu-item",{attrs:{index:a.toString()},nativeOn:{click:function(i){i.stopPropagation(),t.pickBanner(e)}}},[t._v("\n\t\t               "+t._s(e.name)+"\n\t\t            ")])}))],1)],1),t._v(" "),i("div",{attrs:{slot:"sideRight"},slot:"sideRight"},[i("el-card",[i("div",{staticClass:"header_pane",attrs:{slot:"header"},slot:"header"},[i("el-button",{attrs:{disabled:!t.pickState,type:"success"},on:{click:t.addItemBtnFn}},[t._v("添加")])],1),t._v(" "),i("table",[i("tr",{staticClass:"table_header_wrap"},[i("th",{staticClass:"table_header table_img"},[i("span",[t._v("图片")])]),t._v(" "),i("th",{staticClass:"table_header table_weight"},[i("span",[t._v("名称")])]),t._v(" "),i("th",{staticClass:"table_header table_action"},[i("span",[t._v("操作")])])]),t._v(" "),t._l(t.sectionList,function(e,a){return i("tr",{key:a},[i("td",{staticClass:"body table_img"},[i("img",{attrs:{src:t.preUrl+"/"+e.imageLogo}})]),t._v(" "),i("td",{staticClass:"body table_weight"},[t._v(t._s(e.name))]),t._v(" "),i("td",{staticClass:"body table_action"},[i("el-button",{attrs:{size:"mini"},nativeOn:{click:function(i){t.deleteItemFn(e.id)}}},[t._v("删除")])],1)])})],2)])],1)]),t._v(" "),i("el-dialog",{attrs:{title:"主题列表",visible:t.topicdialogVisible,width:"60%"},on:{"update:visible":function(e){t.topicdialogVisible=e}}},[i("ul",{staticClass:"topic_list"},t._l(t.allSectionList,function(e,a){return i("li",{staticClass:"topic_item",class:{cho:e.id==t.topicId},on:{click:function(i){i.stopPropagation(),t.choseTop(e.id,a)}}},[i("div",{staticClass:"topimg_box"},[i("img",{attrs:{src:t.preUrl+"/"+e.imageLogo,width:"100%",height:"100%"}})]),t._v(" "),i("p",{staticClass:"topic_text"},[t._v(t._s(e.name))]),t._v(" "),i("p",{staticClass:"topic_text"},[t._v(t._s(e.subName))])])})),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.topicdialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.addTopic}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]}}});