webpackJsonp([13],{1023:function(e,t,a){var n=a(915);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(11)("02076e89",n,!0)},281:function(e,t,a){a(1023);var n=a(9)(a(856),a(971),"data-v-36b90f33",null);e.exports=n.exports},313:function(e,t,a){a(318);var n=a(9)(a(314),a(317),"data-v-9679b6b8",null);e.exports=n.exports},314:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(22),i=a.n(n),o=a(63),s=a.n(o),r=a(64),l=a(26);t.default={name:"upload-img-pane",components:{"image-card":s.a},data:function(){return{imageUrl:"",showIcon:!0}},computed:{imgUrl:function(){return sessionStorage.getItem("imageUrl")+"/"+this.imageUrl}},props:{group:{type:String,default:"common"}},methods:i()({},a.i(l.b)(["set_banner_img"]),{uploadFn:function(){var e=this;if(this.showIcon=!1,this.$refs.imgUpload.files.length>0){var t=this.$refs.imgUpload.files[0],a=t.name.split("."),n=a[0],i={name:n,group:this.group,file:t};r.a.insert(i).then(function(t){0==t.data.code?(e.showIcon=!0,e.$message.success("上传成功"),e.imageUrl=t.data.data,e.set_banner_img(t.data.data),e.$emit("callbackFn")):e.$message.error("当期网络不佳，请重试")}).catch(function(){e.showIcon=!0})}else this.showIcon=!0}})}},315:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,".upload_img_pane[data-v-9679b6b8]{width:150px;height:150px;border-radius:5px;border:1px dashed #dcdcdc;display:flex;align-items:center;justify-content:center;position:relative;background:#fbfdff;font-size:24px;color:#666}.upload_img_pane[data-v-9679b6b8]:hover{border:1px dashed #2196f3}.upload_file[data-v-9679b6b8]{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;opacity:0}.slide-fade-enter-active[data-v-9679b6b8]{transition:all .3s ease}.slide-fade-leave-active[data-v-9679b6b8]{transition:all .3s cubic-bezier(1,.5,.8,1)}.slide-fade-enter[data-v-9679b6b8],.slide-fade-leave-to[data-v-9679b6b8]{transform:translateY(10px);opacity:0}",""])},317:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload_img_wrap"},[a("div",{staticClass:"upload_img_pane"},[e.showIcon?a("i",{staticClass:"el-icon-plus"}):a("i",{staticClass:"el-icon-loading"}),e._v(" "),a("input",{ref:"imgUpload",staticClass:"upload_file",attrs:{type:"file",name:""},on:{change:function(t){e.uploadFn()}}})])])},staticRenderFns:[]}},318:function(e,t,a){var n=a(315);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(11)("69ae6db8",n,!0)},325:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"list-item",data:function(){return{showIcon:!1,showDetail:!1,state:!1,indexlabel:""}},props:{index:null,code:null,name:{type:String,default:"默认"},listType:{type:String,default:"默认"},showListType:{type:Boolean,default:!0},showDetailParent:{type:Boolean,default:!1}},watch:{code:function(e,t){e==this.index?this.state=!0:this.state=!1}},methods:{mouseIn:function(){this.showIcon=!0,this.showDetail=!0},mouseOut:function(){this.showIcon=!1,this.showDetail=!1},deleteItemFn:function(){this.$emit("deleteItem")},lookDetail:function(){this.$emit("lookDetail")},pickFn:function(){this.$emit("select",this.index)}}}},328:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,".list_item_wrap[data-v-2a55c3ba]{display:flex;align-items:center;justify-content:space-between;padding:10px}.list_item_wrap[data-v-2a55c3ba]:hover{background:#eef1f6}.list_item_content[data-v-2a55c3ba]{display:flex;align-items:center}.list_item_content img[data-v-2a55c3ba]{width:40px;height:40px;border-radius:20px}.text_pane[data-v-2a55c3ba]{margin-left:10px;color:#333;min-width:100px}.text_type[data-v-2a55c3ba]{font-size:12px}.pick_color[data-v-2a55c3ba]{color:#2196f3}.delete_icon[data-v-2a55c3ba]{padding:5px}",""])},330:function(e,t,a){a(332);var n=a(9)(a(325),a(331),"data-v-2a55c3ba",null);e.exports=n.exports},331:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"list_item_wrap underline",on:{mouseenter:e.mouseIn,mouseleave:e.mouseOut}},[a("div",{staticClass:"list_item_content"},[e._t("default",[a("img",{attrs:{src:"http://oo6gk8wuu.bkt.clouddn.com/header1.jpg"}})]),e._v(" "),a("div",{staticClass:"text_pane",class:{pick_color:e.state}},[a("p",[e._v(e._s(e.name))]),e._v(" "),e.showListType?a("p",{staticClass:"text_type"},[e._v(e._s(e.listType))]):e._e()])],2),e._v(" "),e.showDetail&&e.showDetailParent?a("div",{staticClass:"delete_icon"},[e._t("deleteIcon",[a("i",{staticClass:"el-icon-edit",on:{click:function(t){t.stopPropagation(),e.lookDetail(t)}}})])],2):e._e(),e._v(" "),e.showIcon?a("div",{staticClass:"delete_icon"},[e._t("deleteIcon",[a("i",{staticClass:"el-icon-circle-close",on:{click:function(t){t.stopPropagation(),e.deleteItemFn(t)}}})])],2):e._e()])},staticRenderFns:[]}},332:function(e,t,a){var n=a(328);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(11)("9ae1ef20",n,!0)},343:function(e,t,a){"use strict";var n=a(62),i={gameInsert:"management/api/game/insert",gameDetail:"management/api/game/detail",gameDelete:"management/api/game/delete",gameList:"management/api/game/list",gameUpdate:"management/api/game/update",searchByName:"management/api/game/searchByName",liveInsert:"management/api/live/insert",liveDetail:"management/api/live/detail",liveDelete:"management/api/live/delete",liveUpdate:"management/api/live/update",liveList:"/management/api/live/list",businessInsert:"management/api/business/insert",businessDetail:"management/api/business/detail",businessDelete:"management/api/business/delete",businessList:"management/api/business/list",businessUpdate:"management/api/business/update",convenienceInsert:"management/api/convenience/insert",convenienceDelete:"management/api/convenience/delete",convenienceList:"management/api/convenience/list",convenienceUpdate:"management/api/convenience/update",hotList:"management/api/search/list",hotDelete:"management/api/search/delete",hotInsert:"management/api/search/insert",hotUpdate:"management/api/search/update",novelList:"management/api/novel/list",novelDetail:"management/api/novel/detail",novelInsert:"management/api/novel/insert",novelDelete:"management/api/novel/delete",novelUpdate:"management/api/novel/update",cartoonList:"management/api/cartoon/list",cartoonDetail:"management/api/cartoon/detail",cartoonInsert:"management/api/cartoon/insert",cartoonDelete:"management/api/cartoon/delete",cartoonUpdate:"management/api/cartoon/update"};t.a={gameInsert:function(e){return n.a.post(i.gameInsert,e)},gameDetail:function(e){return n.a.get(i.gameDetail,e)},gameDelete:function(e){return n.a.post(i.gameDelete,e)},gameList:function(e){return n.a.get(i.gameList,e)},gameUpdate:function(e){return n.a.post(i.gameUpdate,e)},searchByName:function(e){return n.a.get(i.searchByName,e)},liveInsert:function(e){return n.a.post(i.liveInsert,e)},liveDetail:function(e){return n.a.get(i.liveDetail,e)},liveDelete:function(e){return n.a.post(i.liveDelete,e)},liveList:function(e){return n.a.get(i.liveList,e)},liveUpdate:function(e){return n.a.post(i.liveUpdate,e)},businessInsert:function(e){return n.a.post(i.businessInsert,e)},businessDetail:function(e){return n.a.get(i.businessDetail,e)},businessDelete:function(e){return n.a.post(i.businessDelete,e)},businessList:function(e){return n.a.get(i.businessList,e)},businessUpdate:function(e){return n.a.post(i.businessUpdate,e)},convenienceInsert:function(e){return n.a.post(i.convenienceInsert,e)},convenienceList:function(e){return n.a.get(i.convenienceList,e)},convenienceUpdate:function(e){return n.a.post(i.convenienceUpdate,e)},convenienceDelete:function(e){return n.a.post(i.convenienceDelete,e)},hotList:function(e){return n.a.get(i.hotList,e)},hotDelete:function(e){return n.a.post(i.hotDelete,e)},hotInsert:function(e){return n.a.post(i.hotInsert,e)},hotUpdate:function(e){return n.a.post(i.hotUpdate,e)},novelList:function(e){return n.a.get(i.novelList,e)},novelDetail:function(e){return n.a.get(i.novelDetail,e)},novelInsert:function(e){return n.a.post(i.novelInsert,e)},novelDelete:function(e){return n.a.post(i.novelDelete,e)},novelUpdate:function(e){return n.a.post(i.novelUpdate,e)},cartoonList:function(e){return n.a.get(i.cartoonList,e)},cartoonDetail:function(e){return n.a.get(i.cartoonDetail,e)},cartoonInsert:function(e){return n.a.post(i.cartoonInsert,e)},cartoonDelete:function(e){return n.a.post(i.cartoonDelete,e)},cartoonUpdate:function(e){return n.a.post(i.cartoonUpdate,e)}}},357:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(22),i=a.n(n),o=a(63),s=a.n(o),r=a(64),l=a(26);t.default={name:"upload-img-pane",components:{"image-card":s.a},data:function(){return{imageUrl:"",showIcon:!0,imgList:[],preUrl:sessionStorage.getItem("imageUrl")}},computed:i()({},a.i(l.c)(["get_product_list"]),{imgUrl:function(){return sessionStorage.getItem("imageUrl")+"/"+this.imageUrl}}),props:{group:{type:String,default:"common"},newState:{type:Boolean,default:!1}},watch:{imgList:function(e,t){this.set_product_list(e)}},methods:i()({},a.i(l.b)(["set_product_list"]),{uploadFn:function(){var e=this;if(this.showIcon=!1,this.$refs.imgUpload.files.length>0){var t=this.$refs.imgUpload.files[0],a=t.name.split("."),n=a[0],i={name:n,group:this.group,file:t};r.a.insert(i).then(function(t){0==t.data.code?(e.showIcon=!0,e.$message.success("上传成功"),e.get_product_list.length>0?(e.imgList.push(t.data.data),e.$emit("callbackFn")):(e.imgList=[],e.imgList.push(t.data.data),e.$emit("callbackFn"))):e.$message.error("当期网络不佳，请重试")}).catch(function(){e.showIcon=!0})}else this.showIcon=!0},deleteItemFn:function(e,t){var a=this;r.a.delete({id:e}).then(function(e){if(0!=e.data.code)return void a.$message("当前网络不佳，请稍后重试");a.$message("已删除"),a.imgList.splice(t,1)})},shuffle:function(){this.imgList=_.shuffle(this.imgList)}}),destroyed:function(){this.set_product_list([])}}},358:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,".upload_img_wrap[data-v-21f73fd4]{display:flex}.img_item_wrap[data-v-21f73fd4]{margin:5px 5px 5px 0}.upload_img_pane[data-v-21f73fd4]{width:150px;height:150px;border-radius:5px;border:1px dashed #dcdcdc;display:flex;align-items:center;justify-content:center;position:relative;background:#fbfdff;font-size:24px;color:#666}.upload_img_pane[data-v-21f73fd4]:hover{border:1px dashed #2196f3}.upload_file[data-v-21f73fd4]{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;opacity:0}.list[data-v-21f73fd4]{display:inline-block;margin-right:10px}.list-move[data-v-21f73fd4]{transition:transform 1s}.list-enter-active[data-v-21f73fd4],.list-leave-active[data-v-21f73fd4]{transition:all .6s}.list-enter[data-v-21f73fd4],.list-leave-to[data-v-21f73fd4]{opacity:0;transform:translateY(-20px)}",""])},366:function(e,t,a){a(368);var n=a(9)(a(357),a(367),"data-v-21f73fd4",null);e.exports=n.exports},367:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload_img_wrap"},[a("transition-group",{attrs:{name:"list"}},e._l(e.get_product_list,function(t,n){return a("image-card",{key:n,staticClass:"img_item_wrap list",on:{deleteItem:function(a){e.deleteItemFn(t.id,n)}}},[a("img",{attrs:{src:e.preUrl+"/"+t.path}})])})),e._v(" "),a("div",{staticClass:"upload_img_pane img_item_wrap"},[e.showIcon?a("i",{staticClass:"el-icon-plus"}):a("i",{staticClass:"el-icon-loading"}),e._v(" "),a("input",{ref:"imgUpload",staticClass:"upload_file",attrs:{type:"file",name:""},on:{change:function(t){e.uploadFn()}}})])],1)},staticRenderFns:[]}},368:function(e,t,a){var n=a(358);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a(11)("29027dd0",n,!0)},856:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(22),i=a.n(n),o=a(330),s=a.n(o),r=a(63),l=a.n(r),c=a(313),p=a.n(c),m=a(366),u=a.n(m),d=a(343),g=a(26);t.default={name:"hot-novel",components:{"product-item":s.a,"image-card":l.a,"add-img-item":p.a,"product-img-item":u.a},data:function(){var e=function(e,t,a){t?a():a(new Error("背景图片不能为空"))};return{loading:!1,listTotal:0,pageSize:20,currentpage:1,code:"",switchTurn:!1,novelList:[],preUrl:sessionStorage.getItem("imageUrl"),switchLogo:!0,imageLogoData:{},searchNovel:"",novelFrom:{name:"",author:"",weight:"",subName:"",image:"",linkUrl:"",description:"",enable:!0,isTop:!1,appShow:!0,h5Show:!0},novelFromRules:{name:[{required:!0,message:"请输入标题",trigger:"blur"}],author:[{required:!0,message:"请输入作者",trigger:"blur"}],weight:[{required:!0,message:"请输入权重",trigger:"blur"}],image:[{required:!0,validator:e,trigger:"blur"}],linkUrl:[{required:!0,message:"请输入链接",trigger:"blur"}]}}},computed:i()({},a.i(g.c)(["get_banner_img"]),{isCode:function(){return!this.code||""==this.code}}),watch:{switchTurn:function(e,t){if(e){var a=this.code;this.pick(a)}else this.novelFrom={name:"",author:"",weight:"",subName:"",image:"",linkUrl:"",description:"",enable:!0,isTop:!1},this.set_banner_img({}),this.switchLogo=!0}},methods:i()({},a.i(g.b)(["set_banner_img"]),{novelCurrentChange:function(e){var t={page:e,pageSize:this.pageSize};this.getType(t)},callbackFn:function(){this.imageLogoData=this.get_banner_img,this.novelFrom.image=this.get_banner_img.path,this.switchLogo=!1},deleteLogoFn:function(){var e=this;this.$confirm("是否删除").then(function(){e.switchLogo=!0,e.$set(e.novelFrom,"image",""),e.imageLogoData={},e.set_banner_img({})})},pick:function(e){var t=this;this.code=e,this.switchTurn=!0,d.a.cartoonDetail({id:e}).then(function(e){var a=e.data.data;t.novelFrom={name:a.name,author:a.author,weight:a.weight,subName:a.subName,image:a.image,linkUrl:a.linkUrl,description:a.description,enable:!!a.enable,isTop:!!a.isTop,appShow:!!a.isShowApp,h5Show:!!a.isShowH5},t.switchLogo=!1})},getType:function(e){var t=this;d.a.cartoonList(e).then(function(e){t.novelList=e.data.data.cartoonList,t.listTotal=e.data.data.cartoonCount})},deleteItemList:function(e){var t=this;this.$confirm("删除后将无法恢复，是否确定删除?").then(function(){d.a.cartoonDelete({id:e}).then(function(e){if(0==e.data.code){t.$message("您已经删除了一条小说"),t.resetFn();var a={page:t.currentpage,pageSize:t.pageSize};t.getType(a)}else t.$message("当前网络不佳，请稍后重试")})}).catch(function(){})},submitFn:function(){var e=this;this.$refs.novelFrom.validate(function(t){if(t){var a={};a={name:e.novelFrom.name,author:e.novelFrom.author,linkUrl:e.novelFrom.linkUrl,subName:e.novelFrom.subName,weight:Number(e.novelFrom.weight),image:e.novelFrom.image,enable:e.novelFrom.enable?1:0,isTop:e.novelFrom.isTop?1:0,isShowApp:e.novelFrom.appShow?1:0,isShowH5:e.novelFrom.h5Show?1:0},e.novelFrom.description&&(a.description=e.novelFrom.description),e.switchTurn?(a.id=e.code,d.a.cartoonUpdate(a).then(function(t){if("0"==t.data.code){e.switchTurn=!1,e.$message({message:"更新成功",type:"success"});var a={page:e.currentpage,pageSize:e.pageSize};e.getType(a)}})):d.a.cartoonInsert(a).then(function(t){if("0"==t.data.code){e.$message({message:"新增成功",type:"success"}),e.resetFn();var a={page:e.currentpage,pageSize:e.pageSize};e.getType(a)}})}else e.$message("请正确填写")})},resetFn:function(){this.novelFrom={name:"",author:"",weight:"",subName:"",image:"",linkUrl:"",description:"",enable:!0,isTop:!1,appShow:!0,h5Show:!0},this.code="",this.set_banner_img({}),this.switchLogo=!0,this.switchTurn=!1},searchNovelDetail:function(){var e={page:1,pageSize:this.pageSize,name:this.searchNovel};this.getType(e)}}),mounted:function(){this.getType({page:1,pageSize:10})}}},915:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,".save_btn[data-v-36b90f33]{display:flex;justify-content:center}.tag_label[data-v-36b90f33]{display:flex}",""])},971:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("page-wrap",{directives:[{name:"loading",rawName:"v-loading.body.lock",value:e.loading,expression:"loading",modifiers:{body:!0,lock:!0}}]},[a("div",{attrs:{slot:"sideLeft"},slot:"sideLeft"},[a("div",{staticStyle:{"margin-top":"15px"}},[a("el-input",{attrs:{placeholder:"请输入漫画名称"},model:{value:e.searchNovel,callback:function(t){e.searchNovel=t},expression:"searchNovel"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){t.stopPropagation(),e.searchNovelDetail(t)}},slot:"append"})],1)],1),e._v(" "),e._l(e.novelList,function(t){return a("product-item",{attrs:{index:t.id,code:e.code,name:t.name,listType:""},on:{deleteItem:function(a){e.deleteItemList(t.id)}},nativeOn:{click:function(a){e.pick(t.id)}}},[a("img",{attrs:{src:e.preUrl+"/"+t.image}})])}),e._v(" "),a("el-pagination",{attrs:{small:"",layout:"prev, pager, next","page-size":e.pageSize,"current-page":e.currentpage,total:e.listTotal},on:{"current-change":e.novelCurrentChange}})],2),e._v(" "),a("div",{attrs:{slot:"sideRight"},slot:"sideRight"},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-switch",{attrs:{"active-text":"详情","inactive-text":"新增",disabled:e.isCode},model:{value:e.switchTurn,callback:function(t){e.switchTurn=t},expression:"switchTurn"}})],1),e._v(" "),a("div",[a("el-form",{ref:"novelFrom",attrs:{"label-width":"80px",model:e.novelFrom,rules:e.novelFromRules}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"标题",prop:"name"}},[a("el-input",{model:{value:e.novelFrom.name,callback:function(t){e.$set(e.novelFrom,"name",t)},expression:"novelFrom.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"作者",prop:"author"}},[a("el-input",{model:{value:e.novelFrom.author,callback:function(t){e.$set(e.novelFrom,"author",t)},expression:"novelFrom.author"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"权重",prop:"weight"}},[a("el-input",{attrs:{type:"number"},model:{value:e.novelFrom.weight,callback:function(t){e.$set(e.novelFrom,"weight",t)},expression:"novelFrom.weight"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"Logo",prop:"image"}},[e.switchLogo?a("add-img-item",{attrs:{group:"business"},on:{callbackFn:e.callbackFn}}):a("image-card",{attrs:{showTitle:!1},on:{deleteItem:function(t){e.deleteLogoFn()}}},[a("img",{attrs:{src:e.preUrl+"/"+e.novelFrom.image}})])],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"描述"}},[a("el-input",{attrs:{maxLength:"300"},model:{value:e.novelFrom.subName,callback:function(t){e.$set(e.novelFrom,"subName",t)},expression:"novelFrom.subName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"链接",prop:"linkUrl"}},[a("el-input",{model:{value:e.novelFrom.linkUrl,callback:function(t){e.$set(e.novelFrom,"linkUrl",t)},expression:"novelFrom.linkUrl"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"介绍"}},[a("el-input",{attrs:{type:"textarea",maxLength:"300"},model:{value:e.novelFrom.description,callback:function(t){e.$set(e.novelFrom,"description",t)},expression:"novelFrom.description"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"是否可用"}},[a("el-switch",{model:{value:e.novelFrom.enable,callback:function(t){e.$set(e.novelFrom,"enable",t)},expression:"novelFrom.enable"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"是否置顶"}},[a("el-switch",{model:{value:e.novelFrom.isTop,callback:function(t){e.$set(e.novelFrom,"isTop",t)},expression:"novelFrom.isTop"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"APP显示"}},[a("el-switch",{model:{value:e.novelFrom.appShow,callback:function(t){e.$set(e.novelFrom,"appShow",t)},expression:"novelFrom.appShow"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"H5显示"}},[a("el-switch",{model:{value:e.novelFrom.h5Show,callback:function(t){e.$set(e.novelFrom,"h5Show",t)},expression:"novelFrom.h5Show"}})],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"save_btn"},[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){e.submitFn(t)}}},[e._v("保存提交")])],1)],1)])],1)])],1)},staticRenderFns:[]}}});