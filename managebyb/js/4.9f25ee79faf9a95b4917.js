webpackJsonp([4],{1033:function(e,t,a){var i=a(925);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(11)("b89fff34",i,!0)},286:function(e,t,a){a(1033);var i=a(9)(a(861),a(981),"data-v-59746077",null);e.exports=i.exports},313:function(e,t,a){a(318);var i=a(9)(a(314),a(317),"data-v-9679b6b8",null);e.exports=i.exports},314:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(22),n=a.n(i),o=a(63),r=a.n(o),s=a(64),l=a(26);t.default={name:"upload-img-pane",components:{"image-card":r.a},data:function(){return{imageUrl:"",showIcon:!0}},computed:{imgUrl:function(){return sessionStorage.getItem("imageUrl")+"/"+this.imageUrl}},props:{group:{type:String,default:"common"}},methods:n()({},a.i(l.b)(["set_banner_img"]),{uploadFn:function(){var e=this;if(this.showIcon=!1,this.$refs.imgUpload.files.length>0){var t=this.$refs.imgUpload.files[0],a=t.name.split("."),i=a[0],n={name:i,group:this.group,file:t};s.a.insert(n).then(function(t){0==t.data.code?(e.showIcon=!0,e.$message.success("上传成功"),e.imageUrl=t.data.data,e.set_banner_img(t.data.data),e.$emit("callbackFn")):e.$message.error("当期网络不佳，请重试")}).catch(function(){e.showIcon=!0})}else this.showIcon=!0}})}},315:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,".upload_img_pane[data-v-9679b6b8]{width:150px;height:150px;border-radius:5px;border:1px dashed #dcdcdc;display:flex;align-items:center;justify-content:center;position:relative;background:#fbfdff;font-size:24px;color:#666}.upload_img_pane[data-v-9679b6b8]:hover{border:1px dashed #2196f3}.upload_file[data-v-9679b6b8]{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;opacity:0}.slide-fade-enter-active[data-v-9679b6b8]{transition:all .3s ease}.slide-fade-leave-active[data-v-9679b6b8]{transition:all .3s cubic-bezier(1,.5,.8,1)}.slide-fade-enter[data-v-9679b6b8],.slide-fade-leave-to[data-v-9679b6b8]{transform:translateY(10px);opacity:0}",""])},317:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload_img_wrap"},[a("div",{staticClass:"upload_img_pane"},[e.showIcon?a("i",{staticClass:"el-icon-plus"}):a("i",{staticClass:"el-icon-loading"}),e._v(" "),a("input",{ref:"imgUpload",staticClass:"upload_file",attrs:{type:"file",name:""},on:{change:function(t){e.uploadFn()}}})])])},staticRenderFns:[]}},318:function(e,t,a){var i=a(315);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(11)("69ae6db8",i,!0)},325:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"list-item",data:function(){return{showIcon:!1,showDetail:!1,state:!1,indexlabel:""}},props:{index:null,code:null,name:{type:String,default:"默认"},listType:{type:String,default:"默认"},showListType:{type:Boolean,default:!0},showDetailParent:{type:Boolean,default:!1}},watch:{code:function(e,t){e==this.index?this.state=!0:this.state=!1}},methods:{mouseIn:function(){this.showIcon=!0,this.showDetail=!0},mouseOut:function(){this.showIcon=!1,this.showDetail=!1},deleteItemFn:function(){this.$emit("deleteItem")},lookDetail:function(){this.$emit("lookDetail")},pickFn:function(){this.$emit("select",this.index)}}}},326:function(e,t,a){e.exports={default:a(327),__esModule:!0}},327:function(e,t,a){var i=a(5),n=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},328:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,".list_item_wrap[data-v-2a55c3ba]{display:flex;align-items:center;justify-content:space-between;padding:10px}.list_item_wrap[data-v-2a55c3ba]:hover{background:#eef1f6}.list_item_content[data-v-2a55c3ba]{display:flex;align-items:center}.list_item_content img[data-v-2a55c3ba]{width:40px;height:40px;border-radius:20px}.text_pane[data-v-2a55c3ba]{margin-left:10px;color:#333;min-width:100px}.text_type[data-v-2a55c3ba]{font-size:12px}.pick_color[data-v-2a55c3ba]{color:#2196f3}.delete_icon[data-v-2a55c3ba]{padding:5px}",""])},330:function(e,t,a){a(332);var i=a(9)(a(325),a(331),"data-v-2a55c3ba",null);e.exports=i.exports},331:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"list_item_wrap underline",on:{mouseenter:e.mouseIn,mouseleave:e.mouseOut}},[a("div",{staticClass:"list_item_content"},[e._t("default",[a("img",{attrs:{src:"http://oo6gk8wuu.bkt.clouddn.com/header1.jpg"}})]),e._v(" "),a("div",{staticClass:"text_pane",class:{pick_color:e.state}},[a("p",[e._v(e._s(e.name))]),e._v(" "),e.showListType?a("p",{staticClass:"text_type"},[e._v(e._s(e.listType))]):e._e()])],2),e._v(" "),e.showDetail&&e.showDetailParent?a("div",{staticClass:"delete_icon"},[e._t("deleteIcon",[a("i",{staticClass:"el-icon-edit",on:{click:function(t){t.stopPropagation(),e.lookDetail(t)}}})])],2):e._e(),e._v(" "),e.showIcon?a("div",{staticClass:"delete_icon"},[e._t("deleteIcon",[a("i",{staticClass:"el-icon-circle-close",on:{click:function(t){t.stopPropagation(),e.deleteItemFn(t)}}})])],2):e._e()])},staticRenderFns:[]}},332:function(e,t,a){var i=a(328);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(11)("9ae1ef20",i,!0)},343:function(e,t,a){"use strict";var i=a(62),n={gameInsert:"management/api/game/insert",gameDetail:"management/api/game/detail",gameDelete:"management/api/game/delete",gameList:"management/api/game/list",gameUpdate:"management/api/game/update",searchByName:"management/api/game/searchByName",liveInsert:"management/api/live/insert",liveDetail:"management/api/live/detail",liveDelete:"management/api/live/delete",liveUpdate:"management/api/live/update",liveList:"/management/api/live/list",businessInsert:"management/api/business/insert",businessDetail:"management/api/business/detail",businessDelete:"management/api/business/delete",businessList:"management/api/business/list",businessUpdate:"management/api/business/update",convenienceInsert:"management/api/convenience/insert",convenienceDelete:"management/api/convenience/delete",convenienceList:"management/api/convenience/list",convenienceUpdate:"management/api/convenience/update",hotList:"management/api/search/list",hotDelete:"management/api/search/delete",hotInsert:"management/api/search/insert",hotUpdate:"management/api/search/update",novelList:"management/api/novel/list",novelDetail:"management/api/novel/detail",novelInsert:"management/api/novel/insert",novelDelete:"management/api/novel/delete",novelUpdate:"management/api/novel/update",cartoonList:"management/api/cartoon/list",cartoonDetail:"management/api/cartoon/detail",cartoonInsert:"management/api/cartoon/insert",cartoonDelete:"management/api/cartoon/delete",cartoonUpdate:"management/api/cartoon/update"};t.a={gameInsert:function(e){return i.a.post(n.gameInsert,e)},gameDetail:function(e){return i.a.get(n.gameDetail,e)},gameDelete:function(e){return i.a.post(n.gameDelete,e)},gameList:function(e){return i.a.get(n.gameList,e)},gameUpdate:function(e){return i.a.post(n.gameUpdate,e)},searchByName:function(e){return i.a.get(n.searchByName,e)},liveInsert:function(e){return i.a.post(n.liveInsert,e)},liveDetail:function(e){return i.a.get(n.liveDetail,e)},liveDelete:function(e){return i.a.post(n.liveDelete,e)},liveList:function(e){return i.a.get(n.liveList,e)},liveUpdate:function(e){return i.a.post(n.liveUpdate,e)},businessInsert:function(e){return i.a.post(n.businessInsert,e)},businessDetail:function(e){return i.a.get(n.businessDetail,e)},businessDelete:function(e){return i.a.post(n.businessDelete,e)},businessList:function(e){return i.a.get(n.businessList,e)},businessUpdate:function(e){return i.a.post(n.businessUpdate,e)},convenienceInsert:function(e){return i.a.post(n.convenienceInsert,e)},convenienceList:function(e){return i.a.get(n.convenienceList,e)},convenienceUpdate:function(e){return i.a.post(n.convenienceUpdate,e)},convenienceDelete:function(e){return i.a.post(n.convenienceDelete,e)},hotList:function(e){return i.a.get(n.hotList,e)},hotDelete:function(e){return i.a.post(n.hotDelete,e)},hotInsert:function(e){return i.a.post(n.hotInsert,e)},hotUpdate:function(e){return i.a.post(n.hotUpdate,e)},novelList:function(e){return i.a.get(n.novelList,e)},novelDetail:function(e){return i.a.get(n.novelDetail,e)},novelInsert:function(e){return i.a.post(n.novelInsert,e)},novelDelete:function(e){return i.a.post(n.novelDelete,e)},novelUpdate:function(e){return i.a.post(n.novelUpdate,e)},cartoonList:function(e){return i.a.get(n.cartoonList,e)},cartoonDetail:function(e){return i.a.get(n.cartoonDetail,e)},cartoonInsert:function(e){return i.a.post(n.cartoonInsert,e)},cartoonDelete:function(e){return i.a.post(n.cartoonDelete,e)},cartoonUpdate:function(e){return i.a.post(n.cartoonUpdate,e)}}},348:function(e,t,a){"use strict";var i=a(62),n={gameInsert:"management/api/gameCategory/insert",gameList:"management/api/gameCategory/list",gameUpdate:"management/api/gameCategory/update",gameDelete:"management/api/gameCategory/delete",businessInsert:"management/api/businessCategory/insert",businessList:"management/api/businessCategory/list",businessUpdate:"management/api/businessCategory/update",businessDelete:"management/api/businessCategory/delete"};t.a={gameInsert:function(e){return i.a.post(n.gameInsert,e)},gameList:function(e){return i.a.get(n.gameList,e)},gameUpdate:function(e){return i.a.post(n.gameUpdate,e)},gameDelete:function(e){return i.a.post(n.gameDelete,e)},businessInsert:function(e){return i.a.post(n.businessInsert,e)},businessList:function(e){return i.a.get(n.businessList,e)},businessUpdate:function(e){return i.a.post(n.businessUpdate,e)},businessDelete:function(e){return i.a.post(n.businessDelete,e)}}},357:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(22),n=a.n(i),o=a(63),r=a.n(o),s=a(64),l=a(26);t.default={name:"upload-img-pane",components:{"image-card":r.a},data:function(){return{imageUrl:"",showIcon:!0,imgList:[],preUrl:sessionStorage.getItem("imageUrl")}},computed:n()({},a.i(l.c)(["get_product_list"]),{imgUrl:function(){return sessionStorage.getItem("imageUrl")+"/"+this.imageUrl}}),props:{group:{type:String,default:"common"},newState:{type:Boolean,default:!1}},watch:{imgList:function(e,t){this.set_product_list(e)}},methods:n()({},a.i(l.b)(["set_product_list"]),{uploadFn:function(){var e=this;if(this.showIcon=!1,this.$refs.imgUpload.files.length>0){var t=this.$refs.imgUpload.files[0],a=t.name.split("."),i=a[0],n={name:i,group:this.group,file:t};s.a.insert(n).then(function(t){0==t.data.code?(e.showIcon=!0,e.$message.success("上传成功"),e.get_product_list.length>0?(e.imgList.push(t.data.data),e.$emit("callbackFn")):(e.imgList=[],e.imgList.push(t.data.data),e.$emit("callbackFn"))):e.$message.error("当期网络不佳，请重试")}).catch(function(){e.showIcon=!0})}else this.showIcon=!0},deleteItemFn:function(e,t){var a=this;s.a.delete({id:e}).then(function(e){if(0!=e.data.code)return void a.$message("当前网络不佳，请稍后重试");a.$message("已删除"),a.imgList.splice(t,1)})},shuffle:function(){this.imgList=_.shuffle(this.imgList)}}),destroyed:function(){this.set_product_list([])}}},358:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,".upload_img_wrap[data-v-21f73fd4]{display:flex}.img_item_wrap[data-v-21f73fd4]{margin:5px 5px 5px 0}.upload_img_pane[data-v-21f73fd4]{width:150px;height:150px;border-radius:5px;border:1px dashed #dcdcdc;display:flex;align-items:center;justify-content:center;position:relative;background:#fbfdff;font-size:24px;color:#666}.upload_img_pane[data-v-21f73fd4]:hover{border:1px dashed #2196f3}.upload_file[data-v-21f73fd4]{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;opacity:0}.list[data-v-21f73fd4]{display:inline-block;margin-right:10px}.list-move[data-v-21f73fd4]{transition:transform 1s}.list-enter-active[data-v-21f73fd4],.list-leave-active[data-v-21f73fd4]{transition:all .6s}.list-enter[data-v-21f73fd4],.list-leave-to[data-v-21f73fd4]{opacity:0;transform:translateY(-20px)}",""])},366:function(e,t,a){a(368);var i=a(9)(a(357),a(367),"data-v-21f73fd4",null);e.exports=i.exports},367:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload_img_wrap"},[a("transition-group",{attrs:{name:"list"}},e._l(e.get_product_list,function(t,i){return a("image-card",{key:i,staticClass:"img_item_wrap list",on:{deleteItem:function(a){e.deleteItemFn(t.id,i)}}},[a("img",{attrs:{src:e.preUrl+"/"+t.path}})])})),e._v(" "),a("div",{staticClass:"upload_img_pane img_item_wrap"},[e.showIcon?a("i",{staticClass:"el-icon-plus"}):a("i",{staticClass:"el-icon-loading"}),e._v(" "),a("input",{ref:"imgUpload",staticClass:"upload_file",attrs:{type:"file",name:""},on:{change:function(t){e.uploadFn()}}})])],1)},staticRenderFns:[]}},368:function(e,t,a){var i=a(358);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(11)("29027dd0",i,!0)},371:function(e,t,a){e.exports={default:a(390),__esModule:!0}},390:function(e,t,a){a(37),a(392),e.exports=a(5).Array.from},391:function(e,t,a){"use strict";var i=a(13),n=a(28);e.exports=function(e,t,a){t in e?i.f(e,t,n(0,a)):e[t]=a}},392:function(e,t,a){"use strict";var i=a(27),n=a(12),o=a(38),r=a(109),s=a(108),l=a(68),m=a(391),c=a(70);n(n.S+n.F*!a(110)(function(e){Array.from(e)}),"Array",{from:function(e){var t,a,n,d,u=o(e),g="function"==typeof this?this:Array,p=arguments.length,h=p>1?arguments[1]:void 0,v=void 0!==h,f=0,_=c(u);if(v&&(h=i(h,p>2?arguments[2]:void 0,2)),void 0==_||g==Array&&s(_))for(t=l(u.length),a=new g(t);t>f;f++)m(a,f,v?h(u[f],f):u[f]);else for(d=_.call(u),a=new g;!(n=d.next()).done;f++)m(a,f,v?r(d,h,[n.value,f],!0):n.value);return a.length=f,a}})},425:function(e,t,a){"use strict";t.__esModule=!0;var i=a(371),n=function(e){return e&&e.__esModule?e:{default:e}}(i);t.default=function(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return(0,n.default)(e)}},861:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(326),n=a.n(i),o=a(425),r=a.n(o),s=a(65),l=a.n(s),m=a(371),c=a.n(m),d=a(22),u=a.n(d),g=a(330),p=a.n(g),h=a(63),v=a.n(h),f=a(313),_=a.n(f),b=a(366),I=a.n(b),F=(a(348),a(343)),w=a(64),x=a(26);t.default={name:"priduct-game",components:{"product-item":p.a,"image-card":v.a,"add-img-item":_.a,"product-img-item":I.a},data:function(){return{loading:!1,liveList:[],listTotal:0,pageSize:20,currentpage:1,code:"",switchTurn:!1,switchLogo:!0,logoData:{},liveImgList:[],anchorDialog:!1,anchorAdd:!1,anchorImgAdd:!0,preUrl:sessionStorage.getItem("imageUrl"),liveItemForm:{name:"",subName:"",description:"",contentDetail:"",fixedTop:"",imageLogo:"",weight:null,redirectUrl:"",enable:"",downloadUrlIos:"",downloadUrlAndroid:"",authName:"",authEmail:"",authPhone:"",website:"",imageBig:[],anchors:null},liveItemRules:{name:[{required:!0,message:"请输入标题",trigger:"blur"}],subName:[{required:!0,message:"请输入副标题",trigger:"blur"}],description:[{required:!0,message:"请输入描述",trigger:"blur"}],authName:[{required:!0,message:"请输入创作者",trigger:"blur"}],authEmail:[{required:!0,message:"请输入创作邮箱",trigger:"blur"}],authPhone:[{required:!0,message:"请输入创作电话",trigger:"blur"}],website:[{required:!0,message:"请输入网址",trigger:"blur"}],downloadUrlAndroid:[{required:!0,message:"请输入安卓下载链接",trigger:"blur"}],downloadUrlIos:[{required:!0,message:"请输入iOS下载链接",trigger:"blur"}],contentDetail:[{required:!0,message:"请输入直播介绍",trigger:"blur"}],redirectUrl:[{required:!0,message:"请输入链接",trigger:"blur"}]},anchorItemForm:{name:"",subName:"",weight:"",image:""},anchorItemRules:{name:[{required:!0,message:"请输入标题",trigger:"blur"}],subName:[{required:!0,message:"请输入副标题",trigger:"blur"}],weight:[{required:!0,message:"请输入权重",trigger:"blur"}]},anchorItemList:[],anchorItemImgData:{},anchorItemIndex:null}},computed:u()({},a.i(x.c)(["get_banner_img","get_product_list"])),watch:{switchTurn:function(e,t){var a=this;e?F.a.liveDetail({id:this.code}).then(function(e){0==e.data.code&&(a.switchLogo=!1,a.liveItemForm=e.data.data,a.liveItemForm.imageBig=e.data.data.imageBigList,a.liveImgList=c()(e.data.data.imageBigList),a.anchorItemList=e.data.data.liveAnchors)}):(this.$refs.liveItemForm.resetFields(),this.set_banner_img({}),this.set_product_list([]),this.liveImgList=[],this.anchorItemList=[],this.switchLogo=!0,this.liveItemForm.redirectUrl="",this.liveItemForm.downloadUrlIos="",this.liveItemForm.downloadUrlAndroid="")}},methods:u()({},a.i(x.b)(["set_banner_img","set_product_list"]),{handleCurrentChange:function(e){var t=this;F.a.liveList({page:e,pageSize:this.pageSize}).then(function(e){0==e.data.code&&(t.liveList=e.data.data.list,t.listTotal=e.data.data.total)})},pick:function(e){var t=this;this.code=e,this.switchTurn=!0,F.a.liveDetail({id:e}).then(function(e){0==e.data.code?(t.switchLogo=!1,t.liveItemForm=e.data.data,t.liveItemForm.imageBig=e.data.data.imageBigList,t.liveImgList=c()(e.data.data.imageBigList),t.anchorItemList=e.data.data.liveAnchors):null==e.data.data&&t.$message("该项没有数据，建议删除后重新设置")})},getProductList:function(){var e=this;F.a.liveList({page:this.currentpage,pageSize:this.pageSize}).then(function(t){0==t.data.code&&(e.liveList=t.data.data.list,e.listTotal=t.data.data.total,e.currentpage=1)})},typeComputed:function(e){var t=!0,a=!1,i=void 0;try{for(var n,o=l()(this.liveTypeList);!(t=(n=o.next()).done);t=!0){var r=n.value;if(r.id==e)return r.name}}catch(e){a=!0,i=e}finally{try{!t&&o.return&&o.return()}finally{if(a)throw i}}},deleteItem:function(e){var t=this;this.$confirm("删除后将无法恢复，是否确定删除?").then(function(){F.a.liveDelete({id:e}).then(function(e){0==e.data.code?t.handleCurrentChange():t.$message("当前网络不佳，请稍后重试")})}).catch(function(){})},deleteLogoFn:function(){var e=this;this.get_banner_img.path?w.a.delete({id:this.logoData.id}).then(function(t){0==t.data.code?e.switchLogo=!0:(e.$message("当前网络不佳，请稍后重试"),e.switchLogo=!0)}):this.switchLogo=!0},deleteBigImgFn:function(e){this.liveImgList.splice(e,1)},callbackFn:function(){this.switchLogo=!1,this.liveItemForm.imageLogo=this.get_banner_img.path,this.logoData=this.get_banner_img},showAnchorDialog:function(){this.anchorDialog=!0,this.anchorAdd=!0,this.anchorImgAdd=!0,this.anchorItemForm={name:"",weight:"",subName:"",image:""}},cancleDialog:function(){this.anchorDialog=!1},callbackDialog:function(){this.anchorItemForm.image=this.get_banner_img.path,this.anchorItemImgData=this.get_banner_img,this.anchorImgAdd=!1,this.set_banner_img({})},saveDialog:function(){var e=this;if(this.anchorAdd)this.$refs.anchorItemForm.validate(function(t){if(!t)return void e.$message("请输入完整信息");if(""==e.anchorItemForm.image)return void e.$message.error("主播图是个美女，不能为空哦");var a={name:e.anchorItemForm.name,subName:e.anchorItemForm.subName,weight:e.anchorItemForm.weight,image:e.anchorItemForm.image};e.anchorItemList.push(a),e.anchorDialog=!1});else{if(""==this.anchorItemForm.image)return void this.$message.error("主播图是个美女，不能为空哦");var t={name:this.anchorItemForm.name,subName:this.anchorItemForm.subName,weight:this.anchorItemForm.weight,image:this.anchorItemForm.image};this.anchorItemList[this.anchorItemIndex]=t,this.anchorDialog=!1}},modifyFn:function(e){this.anchorDialog=!0,this.anchorAdd=!1,this.anchorImgAdd=!1,this.anchorItemForm=this.anchorItemList[e],this.anchorItemIndex=e},deleteDialogImgFn:function(){this.anchorImgAdd=!0},submitFn:function(){var e=this;this.$refs.liveItemForm.validate(function(t){if(!t)return void e.$message("请输入完整信息");if(e.switchTurn){if(""==e.liveItemForm.imageLogo)return e.loading=!1,void e.$message.error("请选择图片，不然完成不了哦");var a=[],i=[],o=[];if(e.get_product_list.length>0){var s=!0,m=!1,d=void 0;try{for(var u,g=l()(e.get_product_list);!(s=(u=g.next()).done);s=!0){var p=u.value;a.push(p.path)}}catch(e){m=!0,d=e}finally{try{!s&&g.return&&g.return()}finally{if(m)throw d}}o=c()(e.liveImgList),i=[].concat(a,r()(o))}else i=c()(e.liveImgList);var h=e.liveItemForm;h.imageBig=n()(i),h.anchors=n()(e.anchorItemList),e.loading=!0,F.a.liveUpdate(h).then(function(t){0==t.data.code&&(e.$message.success("更新成功"),e.handleCurrentChange(e.currentpage),e.$refs.liveItemForm.resetFields(),e.liveItemForm.redirectUrl="",e.liveItemForm.downloadUrlIos="",e.liveItemForm.downloadUrlAndroid="",e.set_banner_img({}),e.set_product_list([]),e.anchorItemList=[],e.loading=!1)})}else{if(!(""!=e.anchorItemForm.imageLogo&&e.get_product_list.length>0))return e.loading=!1,void e.$message.error("请选择图片，不然完成不了哦");var v=[],f=!0,_=!1,b=void 0;try{for(var I,w=l()(e.get_product_list);!(f=(I=w.next()).done);f=!0){var x=I.value;v.push(x.path)}}catch(e){_=!0,b=e}finally{try{!f&&w.return&&w.return()}finally{if(_)throw b}}var y=e.liveItemForm;y.imageBig=n()(v),y.anchors=n()(e.anchorItemList),e.loading=!0,F.a.liveInsert(y).then(function(t){0==t.data.code&&(e.$message.success("添加成功"),e.handleCurrentChange(e.currentpage),e.$refs.liveItemForm.resetFields(),e.set_banner_img({}),e.liveItemForm.redirectUrl="",e.liveItemForm.downloadUrlIos="",e.liveItemForm.downloadUrlAndroid="",e.set_product_list([]),e.anchorItemList=[],e.loading=!1)})}})}}),mounted:function(){this.getProductList()}}},925:function(e,t,a){t=e.exports=a(7)(),t.push([e.i,".logo_pane[data-v-59746077]{display:flex;flex-wrap:wrap}.big_img_item[data-v-59746077]{margin:5px}.save_btn[data-v-59746077]{display:flex;justify-content:center}.anchors_wrap[data-v-59746077]{padding:10px 0}.anchors_descript[data-v-59746077]{margin-bottom:15px}",""])},981:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("page-wrap",{directives:[{name:"loading",rawName:"v-loading.body.lock",value:e.loading,expression:"loading",modifiers:{body:!0,lock:!0}}]},[a("div",{attrs:{slot:"sideLeft"},slot:"sideLeft"},[e._l(e.liveList,function(t){return a("product-item",{attrs:{index:t.id,code:e.code,name:t.name,listType:""},on:{deleteItem:function(a){e.deleteItem(t.id)}},nativeOn:{click:function(a){e.pick(t.id)}}},[a("img",{attrs:{src:e.preUrl+"/"+t.imageLogo}})])}),e._v(" "),a("el-pagination",{attrs:{small:"",layout:"prev, pager, next","page-size":e.pageSize,"current-page":e.currentpage,total:e.listTotal},on:{"current-change":e.handleCurrentChange}})],2),e._v(" "),a("div",{attrs:{slot:"sideRight"},slot:"sideRight"},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("el-switch",{attrs:{"active-text":"详情","inactive-text":"新增","off-color":"#13ce66"},model:{value:e.switchTurn,callback:function(t){e.switchTurn=t},expression:"switchTurn"}})],1),e._v(" "),a("div",[a("el-form",{ref:"liveItemForm",attrs:{"label-width":"80px",model:e.liveItemForm,rules:e.liveItemRules}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"标题",prop:"name"}},[a("el-input",{model:{value:e.liveItemForm.name,callback:function(t){e.$set(e.liveItemForm,"name",t)},expression:"liveItemForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"副标题",prop:"subName"}},[a("el-input",{model:{value:e.liveItemForm.subName,callback:function(t){e.$set(e.liveItemForm,"subName",t)},expression:"liveItemForm.subName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"权重",prop:"weight"}},[a("el-input",{attrs:{type:"number"},model:{value:e.liveItemForm.weight,callback:function(t){e.$set(e.liveItemForm,"weight",t)},expression:"liveItemForm.weight"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"logo_pane"},[e.switchLogo?a("add-img-item",{attrs:{group:"live"},on:{callbackFn:e.callbackFn}}):a("image-card",{attrs:{showTitle:!1},on:{deleteItem:function(t){e.deleteLogoFn()}}},[a("img",{attrs:{src:e.preUrl+"/"+e.liveItemForm.imageLogo}})])],1)]),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"描述",prop:"description"}},[a("el-input",{model:{value:e.liveItemForm.description,callback:function(t){e.$set(e.liveItemForm,"description",t)},expression:"liveItemForm.description"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"链接"}},[a("el-input",{model:{value:e.liveItemForm.redirectUrl,callback:function(t){e.$set(e.liveItemForm,"redirectUrl",t)},expression:"liveItemForm.redirectUrl"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"直播介绍",prop:"contentDetail"}},[a("el-input",{attrs:{type:"textarea",rows:4},model:{value:e.liveItemForm.contentDetail,callback:function(t){e.$set(e.liveItemForm,"contentDetail",t)},expression:"liveItemForm.contentDetail"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"是否可用"}},[a("el-switch",{attrs:{"on-value":1,"off-value":0},model:{value:e.liveItemForm.enable,callback:function(t){e.$set(e.liveItemForm,"enable",t)},expression:"liveItemForm.enable"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"是否置顶"}},[a("el-switch",{attrs:{"on-value":1,"off-value":0},model:{value:e.liveItemForm.fixedTop,callback:function(t){e.$set(e.liveItemForm,"fixedTop",t)},expression:"liveItemForm.fixedTop"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"创作者",prop:"authName"}},[a("el-input",{model:{value:e.liveItemForm.authName,callback:function(t){e.$set(e.liveItemForm,"authName",t)},expression:"liveItemForm.authName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创作邮箱",prop:"authEmail"}},[a("el-input",{model:{value:e.liveItemForm.authEmail,callback:function(t){e.$set(e.liveItemForm,"authEmail",t)},expression:"liveItemForm.authEmail"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"创作电话",prop:"authPhone"}},[a("el-input",{model:{value:e.liveItemForm.authPhone,callback:function(t){e.$set(e.liveItemForm,"authPhone",t)},expression:"liveItemForm.authPhone"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"官网",prop:"website"}},[a("el-input",{model:{value:e.liveItemForm.website,callback:function(t){e.$set(e.liveItemForm,"website",t)},expression:"liveItemForm.website"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"ios下载"}},[a("el-input",{model:{value:e.liveItemForm.downloadUrlIos,callback:function(t){e.$set(e.liveItemForm,"downloadUrlIos",t)},expression:"liveItemForm.downloadUrlIos"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"安卓下载"}},[a("el-input",{model:{value:e.liveItemForm.downloadUrlAndroid,callback:function(t){e.$set(e.liveItemForm,"downloadUrlAndroid",t)},expression:"liveItemForm.downloadUrlAndroid"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("h4",[e._v("大图")]),e._v(" "),a("div",{staticClass:"logo_pane"},[e._l(e.liveImgList,function(t,i){return a("image-card",{staticClass:"big_img_item",attrs:{showTitle:!1},on:{deleteItem:function(t){e.deleteBigImgFn(i)}}},[a("img",{attrs:{src:e.preUrl+"/"+t}})])}),e._v(" "),a("product-img-item",{attrs:{group:"live"}})],2)]),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-card",[a("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n\t\t\t\t\t\t\t\t\t\t主播图\n\t\t\t\t\t\t\t\t\t\t"),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:e.showAnchorDialog}},[e._v("新增")])],1),e._v(" "),a("div",e._l(e.anchorItemList,function(t,i){return a("div",{staticClass:"underline anchors_wrap"},[a("el-row",[a("el-col",{attrs:{span:8}},[a("image-card",{attrs:{showTitle:!1}},[a("img",{attrs:{src:e.preUrl+"/"+t.image}})])],1),e._v(" "),a("el-col",{attrs:{span:10}},[a("p",{staticClass:"anchors_descript"},[e._v("名称："+e._s(t.name))]),e._v(" "),a("p",{staticClass:"anchors_descript"},[e._v("副标题："+e._s(t.subName))]),e._v(" "),a("p",{staticClass:"anchors_descript"},[e._v("权重："+e._s(t.weight))])]),e._v(" "),a("el-col",{attrs:{span:6}},[a("el-button",{on:{click:function(t){e.modifyFn(i)}}},[e._v("修改")]),e._v(" "),a("el-button",[e._v("删除")])],1)],1)],1)}))])],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{visible:e.anchorDialog,title:"主播图"},on:{"update:visible":function(t){e.anchorDialog=t}}},[a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:12}},[a("el-form",{ref:"anchorItemForm",attrs:{"label-width":"80px",model:e.anchorItemForm,rules:e.anchorItemRules}},[a("el-form-item",{attrs:{label:"标题",prop:"name"}},[a("el-input",{model:{value:e.anchorItemForm.name,callback:function(t){e.$set(e.anchorItemForm,"name",t)},expression:"anchorItemForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"副标题",prop:"subName"}},[a("el-input",{model:{value:e.anchorItemForm.subName,callback:function(t){e.$set(e.anchorItemForm,"subName",t)},expression:"anchorItemForm.subName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"权重",prop:"weight"}},[a("el-input",{attrs:{type:"number"},model:{value:e.anchorItemForm.weight,callback:function(t){e.$set(e.anchorItemForm,"weight",t)},expression:"anchorItemForm.weight"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[e.anchorImgAdd?a("add-img-item",{attrs:{group:"live"},on:{callbackFn:e.callbackDialog}}):a("image-card",{attrs:{showTitle:!1},on:{deleteItem:e.deleteDialogImgFn}},[a("img",{attrs:{src:e.preUrl+"/"+e.anchorItemForm.image}})])],1)],1)],1),e._v(" "),a("span",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.cancleDialog}},[e._v("取消")]),e._v(" "),a("el-button",{on:{click:e.saveDialog}},[e._v("确定")])],1)]),e._v(" "),a("div",{staticClass:"save_btn"},[a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(t){e.submitFn(t)}}},[e._v("保存提交")])],1)],1)])],1)])],1)},staticRenderFns:[]}}});