webpackJsonp([11],{1009:function(t,e,i){var a=i(901);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(11)("09de523c",a,!0)},291:function(t,e,i){i(1009);var a=i(9)(i(866),i(957),"data-v-0ea39958",null);t.exports=a.exports},313:function(t,e,i){i(318);var a=i(9)(i(314),i(317),"data-v-9679b6b8",null);t.exports=a.exports},314:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(22),o=i.n(a),s=i(63),n=i.n(s),r=i(64),l=i(26);e.default={name:"upload-img-pane",components:{"image-card":n.a},data:function(){return{imageUrl:"",showIcon:!0}},computed:{imgUrl:function(){return sessionStorage.getItem("imageUrl")+"/"+this.imageUrl}},props:{group:{type:String,default:"common"}},methods:o()({},i.i(l.b)(["set_banner_img"]),{uploadFn:function(){var t=this;if(this.showIcon=!1,this.$refs.imgUpload.files.length>0){var e=this.$refs.imgUpload.files[0],i=e.name.split("."),a=i[0],o={name:a,group:this.group,file:e};r.a.insert(o).then(function(e){0==e.data.code?(t.showIcon=!0,t.$message.success("上传成功"),t.imageUrl=e.data.data,t.set_banner_img(e.data.data),t.$emit("callbackFn")):t.$message.error("当期网络不佳，请重试")}).catch(function(){t.showIcon=!0})}else this.showIcon=!0}})}},315:function(t,e,i){e=t.exports=i(7)(),e.push([t.i,".upload_img_pane[data-v-9679b6b8]{width:150px;height:150px;border-radius:5px;border:1px dashed #dcdcdc;display:flex;align-items:center;justify-content:center;position:relative;background:#fbfdff;font-size:24px;color:#666}.upload_img_pane[data-v-9679b6b8]:hover{border:1px dashed #2196f3}.upload_file[data-v-9679b6b8]{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;opacity:0}.slide-fade-enter-active[data-v-9679b6b8]{transition:all .3s ease}.slide-fade-leave-active[data-v-9679b6b8]{transition:all .3s cubic-bezier(1,.5,.8,1)}.slide-fade-enter[data-v-9679b6b8],.slide-fade-leave-to[data-v-9679b6b8]{transform:translateY(10px);opacity:0}",""])},317:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload_img_wrap"},[i("div",{staticClass:"upload_img_pane"},[t.showIcon?i("i",{staticClass:"el-icon-plus"}):i("i",{staticClass:"el-icon-loading"}),t._v(" "),i("input",{ref:"imgUpload",staticClass:"upload_file",attrs:{type:"file",name:""},on:{change:function(e){t.uploadFn()}}})])])},staticRenderFns:[]}},318:function(t,e,i){var a=i(315);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(11)("69ae6db8",a,!0)},325:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"list-item",data:function(){return{showIcon:!1,showDetail:!1,state:!1,indexlabel:""}},props:{index:null,code:null,name:{type:String,default:"默认"},listType:{type:String,default:"默认"},showListType:{type:Boolean,default:!0},showDetailParent:{type:Boolean,default:!1}},watch:{code:function(t,e){t==this.index?this.state=!0:this.state=!1}},methods:{mouseIn:function(){this.showIcon=!0,this.showDetail=!0},mouseOut:function(){this.showIcon=!1,this.showDetail=!1},deleteItemFn:function(){this.$emit("deleteItem")},lookDetail:function(){this.$emit("lookDetail")},pickFn:function(){this.$emit("select",this.index)}}}},328:function(t,e,i){e=t.exports=i(7)(),e.push([t.i,".list_item_wrap[data-v-2a55c3ba]{display:flex;align-items:center;justify-content:space-between;padding:10px}.list_item_wrap[data-v-2a55c3ba]:hover{background:#eef1f6}.list_item_content[data-v-2a55c3ba]{display:flex;align-items:center}.list_item_content img[data-v-2a55c3ba]{width:40px;height:40px;border-radius:20px}.text_pane[data-v-2a55c3ba]{margin-left:10px;color:#333;min-width:100px}.text_type[data-v-2a55c3ba]{font-size:12px}.pick_color[data-v-2a55c3ba]{color:#2196f3}.delete_icon[data-v-2a55c3ba]{padding:5px}",""])},330:function(t,e,i){i(332);var a=i(9)(i(325),i(331),"data-v-2a55c3ba",null);t.exports=a.exports},331:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list_item_wrap underline",on:{mouseenter:t.mouseIn,mouseleave:t.mouseOut}},[i("div",{staticClass:"list_item_content"},[t._t("default",[i("img",{attrs:{src:"http://oo6gk8wuu.bkt.clouddn.com/header1.jpg"}})]),t._v(" "),i("div",{staticClass:"text_pane",class:{pick_color:t.state}},[i("p",[t._v(t._s(t.name))]),t._v(" "),t.showListType?i("p",{staticClass:"text_type"},[t._v(t._s(t.listType))]):t._e()])],2),t._v(" "),t.showDetail&&t.showDetailParent?i("div",{staticClass:"delete_icon"},[t._t("deleteIcon",[i("i",{staticClass:"el-icon-edit",on:{click:function(e){e.stopPropagation(),t.lookDetail(e)}}})])],2):t._e(),t._v(" "),t.showIcon?i("div",{staticClass:"delete_icon"},[t._t("deleteIcon",[i("i",{staticClass:"el-icon-circle-close",on:{click:function(e){e.stopPropagation(),t.deleteItemFn(e)}}})])],2):t._e()])},staticRenderFns:[]}},332:function(t,e,i){var a=i(328);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(11)("9ae1ef20",a,!0)},357:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(22),o=i.n(a),s=i(63),n=i.n(s),r=i(64),l=i(26);e.default={name:"upload-img-pane",components:{"image-card":n.a},data:function(){return{imageUrl:"",showIcon:!0,imgList:[],preUrl:sessionStorage.getItem("imageUrl")}},computed:o()({},i.i(l.c)(["get_product_list"]),{imgUrl:function(){return sessionStorage.getItem("imageUrl")+"/"+this.imageUrl}}),props:{group:{type:String,default:"common"},newState:{type:Boolean,default:!1}},watch:{imgList:function(t,e){this.set_product_list(t)}},methods:o()({},i.i(l.b)(["set_product_list"]),{uploadFn:function(){var t=this;if(this.showIcon=!1,this.$refs.imgUpload.files.length>0){var e=this.$refs.imgUpload.files[0],i=e.name.split("."),a=i[0],o={name:a,group:this.group,file:e};r.a.insert(o).then(function(e){0==e.data.code?(t.showIcon=!0,t.$message.success("上传成功"),t.get_product_list.length>0?(t.imgList.push(e.data.data),t.$emit("callbackFn")):(t.imgList=[],t.imgList.push(e.data.data),t.$emit("callbackFn"))):t.$message.error("当期网络不佳，请重试")}).catch(function(){t.showIcon=!0})}else this.showIcon=!0},deleteItemFn:function(t,e){var i=this;r.a.delete({id:t}).then(function(t){if(0!=t.data.code)return void i.$message("当前网络不佳，请稍后重试");i.$message("已删除"),i.imgList.splice(e,1)})},shuffle:function(){this.imgList=_.shuffle(this.imgList)}}),destroyed:function(){this.set_product_list([])}}},358:function(t,e,i){e=t.exports=i(7)(),e.push([t.i,".upload_img_wrap[data-v-21f73fd4]{display:flex}.img_item_wrap[data-v-21f73fd4]{margin:5px 5px 5px 0}.upload_img_pane[data-v-21f73fd4]{width:150px;height:150px;border-radius:5px;border:1px dashed #dcdcdc;display:flex;align-items:center;justify-content:center;position:relative;background:#fbfdff;font-size:24px;color:#666}.upload_img_pane[data-v-21f73fd4]:hover{border:1px dashed #2196f3}.upload_file[data-v-21f73fd4]{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;opacity:0}.list[data-v-21f73fd4]{display:inline-block;margin-right:10px}.list-move[data-v-21f73fd4]{transition:transform 1s}.list-enter-active[data-v-21f73fd4],.list-leave-active[data-v-21f73fd4]{transition:all .6s}.list-enter[data-v-21f73fd4],.list-leave-to[data-v-21f73fd4]{opacity:0;transform:translateY(-20px)}",""])},366:function(t,e,i){i(368);var a=i(9)(i(357),i(367),"data-v-21f73fd4",null);t.exports=a.exports},367:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload_img_wrap"},[i("transition-group",{attrs:{name:"list"}},t._l(t.get_product_list,function(e,a){return i("image-card",{key:a,staticClass:"img_item_wrap list",on:{deleteItem:function(i){t.deleteItemFn(e.id,a)}}},[i("img",{attrs:{src:t.preUrl+"/"+e.path}})])})),t._v(" "),i("div",{staticClass:"upload_img_pane img_item_wrap"},[t.showIcon?i("i",{staticClass:"el-icon-plus"}):i("i",{staticClass:"el-icon-loading"}),t._v(" "),i("input",{ref:"imgUpload",staticClass:"upload_file",attrs:{type:"file",name:""},on:{change:function(e){t.uploadFn()}}})])],1)},staticRenderFns:[]}},368:function(t,e,i){var a=i(358);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(11)("29027dd0",a,!0)},421:function(t,e,i){"use strict";var a=i(62),o={topicInsert:"management/api/topic/insert",topicUpdate:"management/api/topic/update",allTopicList:"management/api/topic/allTopicList",topicDelete:"management/api/topic/delete",topicGameList:"management/api/topic/gameList",topicDetail:"management/api/topic/topicDetail",relInsert:"management/api/topic/relInsert",relDelete:"management/api/topic/relDelete"};e.a={topicInsert:function(t){return a.a.post(o.topicInsert,t)},topicUpdate:function(t){return a.a.post(o.topicUpdate,t)},allTopicList:function(t){return a.a.get(o.allTopicList,t)},topicDelete:function(t){return a.a.post(o.topicDelete,t)},topicGameList:function(t){return a.a.get(o.topicGameList,t)},topicDetail:function(t){return a.a.get(o.topicDetail,t)},relInsert:function(t){return a.a.post(o.relInsert,t)},relDelete:function(t){return a.a.post(o.relDelete,t)}}},866:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(22),o=i.n(a),s=i(330),n=i.n(s),r=i(63),l=i.n(r),c=i(313),m=i.n(c),d=i(366),p=i.n(d),u=i(26),g=i(421);i(64);e.default={name:"topic",components:{"product-item":n.a,"image-card":l.a,"add-img-item":m.a,"product-img-item":p.a},data:function(){var t=function(t,e,i){e?i():i(new Error("背景图片不能为空"))};return{leftLoading:!1,loading:!1,allTopicList:[],code:"",switchTurn:!1,switchLogo:!0,switchBackImage:!0,preUrl:sessionStorage.getItem("imageUrl"),gameItemForm:{name:"",subName:"",imageLogo:"",weight:50},gameItemRules:{name:[{required:!0,message:"请输入标题",trigger:"blur"}],imageLogo:[{required:!0,validator:t,trigger:"blur"}]}}},computed:o()({},i.i(u.c)(["get_banner_img","get_product_list"]),{isCode:function(){return!this.code||""==this.code}}),watch:{switchTurn:function(t,e){t||(this.resetAll("gameItemForm"),this.set_banner_img({}),this.set_product_list([]))}},methods:o()({},i.i(u.b)(["set_banner_img","set_product_list"]),{resetAll:function(t){this.$refs[t].resetFields(),this.gameItemForm={name:"",subName:"",imageLogo:"",weight:50},this.code="",this.switchLogo=!0,this.switchBackImage=!0,this.set_banner_img({}),this.set_product_list([])},pick:function(t){this.code=t,this.switchTurn=!0;var e={id:t};this.getTopicDetail(e)},getAllTopicList:function(){var t=this;g.a.allTopicList().then(function(e){"0"==e.data.code&&(t.allTopicList=e.data.data)})},getTopicDetail:function(t){var e=this;g.a.topicDetail(t).then(function(t){if("0"==t.data.code){var i=t.data.data.topic;e.gameItemForm={name:i.name,subName:i.subName,weight:i.weight},i.imageLogo&&(e.switchLogo=!1,e.gameItemForm.imageLogo=i.imageLogo)}})},deleteLogoFn:function(){this.switchLogo=!0,this.gameItemForm.imageLogo=""},callbackFn:function(){this.switchLogo=!1,this.gameItemForm.imageLogo=this.get_banner_img.path},submitFn:function(t){var e=this;this.$refs[t].validate(function(t){if(t){var i={name:e.gameItemForm.name,weight:e.gameItemForm.weight};e.gameItemForm.imageLogo&&(i.imageLogo=e.gameItemForm.imageLogo),e.gameItemForm.subName&&(i.subName=e.gameItemForm.subName),e.code&&""!=!!e.code?(i.id=e.code,g.a.topicUpdate(i).then(function(t){"0"==t.data.code?(e.$message.success("更新成功"),e.switchTurn=!1,e.resetAll("gameItemForm"),e.getAllTopicList()):e.$message.error("当前网络不佳，请稍后重试")})):g.a.topicInsert(i).then(function(t){"0"==t.data.code?(e.$message.success("新增成功"),e.resetAll("gameItemForm"),e.getAllTopicList()):e.$message.error("当前网络不佳，请稍后重试")})}else e.$message("信息不完整")})},deleteTop:function(t){var e=this;this.$confirm("删除后将无法恢复，是否确定删除?").then(function(){g.a.topicDelete(i).then(function(t){"0"==t.data.code?(e.$message.success("删除成功"),e.resetAll("gameItemForm"),e.getAllTopicList()):e.$message.error("当前网络不佳，请稍后重试")})}).catch(function(){});var i={id:t}}}),created:function(){this.getAllTopicList()}}},901:function(t,e,i){e=t.exports=i(7)(),e.push([t.i,"",""])},957:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("page-wrap",{directives:[{name:"loading",rawName:"v-loading.body.lock",value:t.loading,expression:"loading",modifiers:{body:!0,lock:!0}}]},[i("div",{directives:[{name:"loading",rawName:"v-loading.body.sync",value:t.leftLoading,expression:"leftLoading",modifiers:{body:!0,sync:!0}}],attrs:{slot:"sideLeft"},slot:"sideLeft"},[i("div",[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-setting"}),t._v(" 主题管理")]),t._v(" "),i("el-breadcrumb-item",[t._v("主题")])],1)],1),t._v(" "),t._l(t.allTopicList,function(e){return i("product-item",{attrs:{index:e.id,code:t.code,name:e.name,showListType:!1},on:{deleteItem:function(i){t.deleteTop(e.id)}},nativeOn:{click:function(i){t.pick(e.id)}}},[e.imageLogo?i("img",{attrs:{src:t.preUrl+"/"+e.imageLogo}}):t._e()])})],2),t._v(" "),i("div",{attrs:{slot:"sideRight"},slot:"sideRight"},[i("el-card",[i("div",{attrs:{slot:"header"},slot:"header"},[i("el-switch",{attrs:{"active-text":"详情","inactive-text":"新增","off-color":"#13ce66",disabled:t.isCode},model:{value:t.switchTurn,callback:function(e){t.switchTurn=e},expression:"switchTurn"}})],1),t._v(" "),i("div",[i("el-form",{ref:"gameItemForm",attrs:{"label-width":"80px",model:t.gameItemForm,rules:t.gameItemRules}},[i("el-row",{attrs:{gutter:20}},[i("el-col",{attrs:{span:24}},[i("el-col",{attrs:{span:13}},[i("el-form-item",{attrs:{label:"名称",prop:"name"}},[i("el-input",{model:{value:t.gameItemForm.name,callback:function(e){t.$set(t.gameItemForm,"name",e)},expression:"gameItemForm.name"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"副标题"}},[i("el-input",{model:{value:t.gameItemForm.subName,callback:function(e){t.$set(t.gameItemForm,"subName",e)},expression:"gameItemForm.subName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"权重",prop:"weight",required:""}},[i("el-input",{attrs:{type:"number"},model:{value:t.gameItemForm.weight,callback:function(e){t.$set(t.gameItemForm,"weight",e)},expression:"gameItemForm.weight"}})],1)],1)],1),t._v(" "),i("el-col",{attrs:{span:24}},[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"图标"}},[t.switchLogo?i("add-img-item",{attrs:{group:"game"},on:{callbackFn:function(e){t.callbackFn()}}}):i("image-card",{attrs:{showTitle:!1},on:{deleteItem:function(e){t.deleteLogoFn()}}},[i("img",{attrs:{src:t.preUrl+"/"+t.gameItemForm.imageLogo}})])],1)],1)],1)],1)],1),t._v(" "),i("div",{staticClass:"save_btn"},[i("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){t.submitFn("gameItemForm")}}},[t._v("保存提交")])],1)],1)])],1)])],1)},staticRenderFns:[]}}});