webpackJsonp([25],{1011:function(t,e,n){var a=n(903);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(11)("0fe32ce6",a,!0)},298:function(t,e,n){n(1011);var a=n(9)(n(875),n(959),"data-v-1099835c",null);t.exports=a.exports},326:function(t,e,n){t.exports={default:n(327),__esModule:!0}},327:function(t,e,n){var a=n(5),s=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return s.stringify.apply(s,arguments)}},349:function(t,e,n){"use strict";var a=n(62),s={wxWordList:"management/api/keywords/list",wxWordInsert:"management/api/keywords/insert",wxWordUpdate:"management/api/keywords/update",wxWordDelete:"management/api/keywords/delete",wxQrlist:"management/api/qrcode/list",wxQrInsert:"management/api/qrcode/insert",wxQrUpdate:"management/api/qrcode/update",wxMenuUpdate:"management/api/wechat/menu/update",wxMenuList:"management/api/wechat/menu/list",messageDelete:"management/api/message/delete",messageList:"management/api/message/list",messageDetail:"management/api/message/detail",saveAndSendMessage:"management/api/message/saveAndSendMessage",qrGetDefault:"management/api/qrcode/getDefault",qrUpdateDefault:"management/api/qrcode/updateDefault",keyGetDefault:"management/api/keywords/getDefault",keyUpdateDefault:"management/api/keywords/updateDefault"};e.a={wxWordList:function(t){return a.a.get(s.wxWordList,t)},wxWordInsert:function(t){return a.a.post(s.wxWordInsert,t)},wxWordUpdate:function(t){return a.a.post(s.wxWordUpdate,t)},wxWordDelete:function(t){return a.a.get(s.wxWordDelete,t)},wxQrlist:function(t){return a.a.get(s.wxQrlist,t)},wxQrInsert:function(t){return a.a.post(s.wxQrInsert,t)},wxQrUpdate:function(t){return a.a.post(s.wxQrUpdate,t)},wxMenuUpdate:function(t){return a.a.post(s.wxMenuUpdate,t)},wxMenuList:function(t){return a.a.get(s.wxMenuList,t)},messageDelete:function(t){return a.a.post(s.messageDelete,t)},messageList:function(t){return a.a.get(s.messageList,t)},messageDetail:function(t){return a.a.get(s.messageDetail,t)},saveAndSendMessage:function(t){return a.a.post(s.saveAndSendMessage,t)},qrGetDefault:function(t){return a.a.get(s.qrGetDefault,t)},qrUpdateDefault:function(t){return a.a.post(s.qrUpdateDefault,t)},keyGetDefault:function(t){return a.a.get(s.keyGetDefault,t)},keyUpdateDefault:function(t){return a.a.post(s.keyUpdateDefault,t)}}},824:function(t,e,n){t.exports=n.p+"img/phone.2c97c81.png"},875:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(326),s=n.n(a),i=n(349);e.default={data:function(){return{menuList:[],modifyType:"",btnTitle:"",btnName:"",subButton:{name:"",type:"view",url:""},bindex:null,sbIndex:null,sbTypeRadio:"view",isAddSbBtn:!1}},methods:{removeTheme:function(){var t=this;this.$confirm("此操作将永久删除菜单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){if(t.sbIndex||0==t.sbIndex||10==t.sbIndex){if(t.isAddSbBtn)return;t.menuList[t.bindex].sub_button.splice(t.sbIndex,1),t.modifyType=""}else{t.menuList.splice(t.bindex,1);var e=t.menuList.length;t.listLengthFn(e,t.menuList),t.modifyType=""}}).catch(function(){})},getMenuList:function(){var t=this;i.a.wxMenuList().then(function(e){if("0"==e.data.code){var n=e.data.data.menu.button,a=n.length,s=t.listLengthFn(a,n);t.menuList=s}})},modifyBtn:function(t,e){this.modifyType="btn",this.btnTitle=t.name,"新增+"!=t.name?this.btnName=t.name:this.btnName="",this.bindex=e,this.sbIndex=null},modifySubBtn:function(t,e,n){this.modifyType="subBtn",this.btnTitle=t.name,this.bindex=e,this.sbIndex=n,this.subButton=t,this.isAddSbBtn=!1},addSubBtn:function(t){this.modifyType="subBtn",this.btnTitle="新增+",this.bindex=t,this.sbIndex=10,this.isAddSbBtn=!0,this.subButton={name:"",type:"view",url:""}},listLengthFn:function(t,e){if(t<3){var n={name:"新增+",sub_button:[]};return e.push(n),t++,this.listLengthFn(t,e)}return e},saveBtn:function(){this.btnName&&(this.$set(this.menuList[this.bindex],"name",this.btnName),this.modifyType="")},saveSubBtn:function(){return this.subButton.name&&this.subButton.name.trim()?this.subButton.url&&this.subButton.url.trim()?this.isURL(this.subButton.url)?(this.isAddSbBtn?this.menuList[this.bindex].sub_button.push(this.subButton):(this.$set(this.menuList[this.bindex].sub_button[this.sbIndex],"name",this.subButton.name.trim()),this.$set(this.menuList[this.bindex].sub_button[this.sbIndex],"url",this.subButton.url.trim())),void(this.modifyType="")):void this.$message("请填写正确跳转链接"):void this.$message("请填写跳转地址"):void this.$message("请填写子标题")},saveAll:function(){for(var t=this,e={button:[]},n=0;n<this.menuList.length;n++){if(this.menuList[n].sub_button.length>0&&"新增+"==this.menuList[n].name){var a="第"+(n+1)+"个菜单未修改名称";return void this.$alert(a,"tips",{confirmButtonText:"确定",callback:function(t){}})}if("新增+"!=this.menuList[n].name){if(!(this.menuList[n].sub_button.length>0)){var o="第"+(n+1)+"个主菜单未添加子菜单";return void this.$alert(o,"tips",{confirmButtonText:"确定",callback:function(t){}})}e.button.push(this.menuList[n])}}var l={menu:s()(e)};i.a.wxMenuUpdate(l).then(function(e){""==e.data.code?(t.$message({message:"保存成功",type:"success"}),t.modifyType=""):t.$message.error(e.data.userMessage)})},isURL:function(t){return new RegExp(/^[A-Za-z]+:\/\//).test(t)},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})}},created:function(){this.getMenuList()},mounted:function(){}}},903:function(t,e,n){e=t.exports=n(7)(),e.push([t.i,".imgBox[data-v-1099835c]{margin:22px 0;width:295px;height:599px;border:1px solid #eaeaea;box-sizing:border-box;background:url("+n(824)+") no-repeat;background-size:294px 598px;position:relative}.theme_postion[data-v-1099835c]{position:absolute;bottom:14px;left:47px;list-style:none}.list_style[data-v-1099835c]{display:inline-block}.center_style[data-v-1099835c]{display:inline-block;width:82px;text-align:center}.theme_box[data-v-1099835c]{width:675px;height:530px}.card_size[data-v-1099835c]{width:100%;height:430px}.label_style[data-v-1099835c]{display:inline-block;height:40px;line-height:40px}.save_style[data-v-1099835c]{margin-top:15px;margin-left:50px}.tips[data-v-1099835c]{font-size:12px;color:#999}.ridio_hight[data-v-1099835c]{height:40px;line-height:40px}.link_box[data-v-1099835c]{width:80%;height:100px;border:1px solid #999;margin:0 auto;padding:13px 15px;box-sizing:border-box}.tips_padding[data-v-1099835c]{margin-bottom:13px}label[data-v-1099835c]{font-size:14px;color:#666}.rank_box[data-v-1099835c]{height:500px}.backage_box[data-v-1099835c]{width:240px;height:498px;margin:0 auto;background:url("+n(824)+") no-repeat;background-size:100%;position:relative}.rank_btn_list[data-v-1099835c]{position:absolute;bottom:38px;left:37px;list-style:none}.rank_btn_list li[data-v-1099835c]{display:inline-block;width:65px;height:30px;font-size:14px;line-height:30px;text-align:center}.backage_box input[data-v-1099835c]{background:none;outline:none;border:0;width:60px;text-indent:2em}",""])},959:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("el-breadcrumb",{attrs:{separator:"/"}},[n("el-breadcrumb-item",[n("i",{staticClass:"el-icon-star-on"}),t._v(" 微信公众号管理")]),t._v(" "),n("el-breadcrumb-item",[t._v("菜单管理")])],1)],1),t._v(" "),n("div",{staticClass:"content_box"},[n("el-container",[n("el-aside",{attrs:{width:"301px"}},[n("div",{staticClass:"imgBox"},[n("ul",{staticClass:"theme_postion"},t._l(t.menuList,function(e,a){return n("li",{staticClass:"list_style",on:{click:function(n){n.stopPropagation(),t.modifyBtn(e,a)}}},[n("el-dropdown",{attrs:{trigger:"click","hide-on-click":!1,placement:"top"}},[n("span",{staticClass:"el-dropdown-link center_style"},[t._v("\n                                    "+t._s(e.name)+"\n                                  ")]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[t._l(e.sub_button,function(e,s){return n("el-dropdown-item",{nativeOn:{click:function(n){n.stopPropagation(),t.modifySubBtn(e,a,s)}}},[t._v(t._s(e.name))])}),t._v(" "),e.sub_button.length<5?n("el-dropdown-item",{nativeOn:{click:function(e){e.stopPropagation(),t.addSubBtn(a)}}},[t._v("新增+")]):t._e()],2)],1)],1)}))])]),t._v(" "),n("el-main",[n("div",{staticClass:"theme_box"},["btn"==t.modifyType?n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v(t._s(t.btnTitle))]),t._v(" "),n("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){e.stopPropagation(),t.removeTheme(e)}}},[t._v("删除菜单")]),t._v(" "),n("el-button",{staticStyle:{float:"right",padding:"3px 20px"},attrs:{type:"text"},on:{click:function(e){e.stopPropagation(),t.saveBtn(e)}}},[t._v("保存")])],1),t._v(" "),n("div",{staticClass:"card_size"},[n("el-row",[n("el-col",{attrs:{span:4}},[n("label",{staticClass:"label_style"},[t._v("菜单名称")])]),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-input",{attrs:{placeholder:"请输入菜单名称",maxlength:4},model:{value:t.btnName,callback:function(e){t.btnName=e},expression:"btnName"}})],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:4}},[n("div",[t._v(" ")])]),t._v(" "),n("el-col",{attrs:{span:12}},[n("p",{staticClass:"tips"},[t._v("最多4个字")])])],1)],1)]):t._e(),t._v(" "),"subBtn"==t.modifyType?n("el-card",{staticClass:"box-card"},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[t._v(t._s(t.btnTitle))]),t._v(" "),n("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){e.stopPropagation(),t.removeTheme(e)}}},[t._v("删除子菜单")]),t._v(" "),n("el-button",{staticStyle:{float:"right",padding:"3px 20px"},attrs:{type:"text"},on:{click:function(e){e.stopPropagation(),t.saveSubBtn(e)}}},[t._v("保存")])],1),t._v(" "),n("div",{staticClass:"card_size"},[n("el-row",[n("el-col",{attrs:{span:5}},[n("label",{staticClass:"label_style"},[t._v("子菜单名称")])]),t._v(" "),n("el-col",{attrs:{span:12}},[n("el-input",{attrs:{placeholder:"请输入菜单名称",maxlength:8},model:{value:t.subButton.name,callback:function(e){t.$set(t.subButton,"name",e)},expression:"subButton.name"}})],1)],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:5}},[n("div",[t._v(" ")])]),t._v(" "),n("el-col",{attrs:{span:12}},[n("p",{staticClass:"tips"},[t._v("最多8个字")])])],1),t._v(" "),n("el-row",[n("el-col",{attrs:{span:5}},[n("label",{staticClass:"label_style"},[t._v("子菜单内容")])]),t._v(" "),n("el-col",{attrs:{span:12}},[n("div",{staticClass:"ridio_hight"},[n("el-radio",{attrs:{label:"view"},model:{value:t.sbTypeRadio,callback:function(e){t.sbTypeRadio=e},expression:"sbTypeRadio"}},[t._v("跳转网页")])],1)])],1),t._v(" "),n("el-row",[n("div",{staticClass:"link_box"},[n("p",{staticClass:"tips tips_padding"},[t._v("订阅者点击该子菜单会跳转到以下地址")]),t._v(" "),n("el-row",[n("el-col",{attrs:{span:3}},[n("label",{staticClass:"label_style"},[t._v("链接")])]),t._v(" "),n("el-col",{attrs:{span:16}},[n("el-input",{attrs:{placeholder:"请输入链接"},model:{value:t.subButton.url,callback:function(e){t.$set(t.subButton,"url",e)},expression:"subButton.url"}})],1)],1)],1)])],1)]):t._e()],1),t._v(" "),n("div",[n("el-button",{staticClass:"save_style",attrs:{type:"success"},on:{click:function(e){e.stopPropagation(),t.saveAll(e)}}},[t._v("保存并发布")])],1)])],1)],1)])},staticRenderFns:[]}}});