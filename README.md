# 818后台 #
基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案

## 前言 ##
公司内部的后台管理系统，Vue 2.x + Element UI，用于运营管理，整理成模板方便以后使用，嵌套
内容包含或活动管理、管理员、统计、积分、产品、分类、资源等


## 功能 ##
- [x] Element UI
- [x] 登录/注销
- [x] 表格
- [x] 表单
- [x] 管理员
- [x] 状态管理
- [x] 信息管理（短信、站内信）
- [x] 图片上传


## 目录结构介绍 ##

	|-- build                            // webpack配置文件
	|-- config                           // 项目打包路径
	|-- src                              // 源码目录
    |   |-- api                          // 统一的接口调试
    |   |-- assets                       // 本地图片资源
	|   |-- components                   // 组件
	|       |-- common                   // 公共组件（展示部分比较常用的）
    |           |-- AddImgItem.vue       // 单图上传
	|           |-- Header.vue           // 公共头部
    |           |-- ImgCard.vue          // 图片卡片
    |           |-- ListItem.vue         // 产品列表
	|           |-- Home.vue           	 // 公共路由入口
	|           |-- Sidebar.vue          // 公共左边栏
	|		|-- page                   	 // 主要路由页面
	|           |-- active               // 活动管理
	|           |-- admin                // 管理员
	|           |-- count                // 统计
	|           |-- inquire          	 // 查询
	|           |-- integral             // 积分商城
	|           |-- msg                  // 信息管理
	|           |-- product              // 产品管理（保险、贷款、信用卡）
	|           |-- user                 // 用户管理
	|           |-- resource             // 资源管理
	|           |-- web                  // 网页管理
	|   |-- App.vue                      // 页面入口文件
	|   |-- main.js                      // 程序入口文件，加载各种公共组件
	|-- .babelrc                         // ES6语法编译配置
	|-- .editorconfig                    // 代码编写规格
	|-- .gitignore                       // 忽略的文件
	|-- index.html                       // 入口html文件
	|-- package.json                     // 项目及工具的依赖配置文件
	|-- README.md                        // 说明


## 安装步骤 ##

	git clone git@192.168.1.3:BaiShi-H5/baiwei_back.git		// 把模板下载到本地
	cd baiwei_back											// 进入模板目录
	npm install													// 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8081
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build




## others ##
## 组件使用说明与演示 ##

### element-ui ###
一套基于vue.js2.0的桌面组件库。访问地址：[element](http://element.eleme.io/#/zh-CN/component/layout)


### Vue-Quill-Editor ###
基于Quill、适用于Vue2的富文本编辑器。访问地址：[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

```JavaScript
<template>
	<div>
		<quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
	</div>
</template>

<script>
	import { quillEditor } from 'vue-quill-editor';			// 导入quillEditor组件
    export default {
        data: function(){
            return {
                content: '',								// 编辑器的内容
                editorOption: {								// 编辑器的配置
                    // something config
                }
            }
        },
        components: {
            quillEditor										// 声明组件quillEditor
        }
	}
</script>
```

### Vue-SimpleMDE ###
Vue.js的Markdown Editor组件。访问地址：[Vue-SimpleMDE](https://github.com/F-loat/vue-simplemde)

```JavaScript
<template>
    <div>
        <markdown-editor v-model="content" :configs="configs" ref="markdownEditor"></markdown-editor>
    </div>
</template>

<script>
    import { markdownEditor } from 'vue-simplemde';			// 导入markdownEditor组件
    export default {
        data: function(){
            return {
                content:'',									// markdown编辑器内容
                configs: {									// markdown编辑器配置参数
                    status: false,							// 禁用底部状态栏
                    initialValue: 'Hello BBK',				// 设置初始值
                    renderingConfig: {
                        codeSyntaxHighlighting: true,		// 开启代码高亮
                        highlightingTheme: 'atom-one-light' // 自定义代码高亮主题
                    }
                }
            }
        },
        components: {
            markdownEditor									// 声明组件markdownEditor
        }
    }
</script>
```

### Vue-Core-Image-Upload ###
一款轻量级的vue上传插件，支持裁剪。访问地址：[Vue-Core-Image-Upload](https://github.com/Vanthink-UED/vue-core-image-upload)

```JavaScript

<template>
    <div>
		<img :src="src">									// 用于显示上传的图片
        <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
           :crop="true"										// 是否裁剪
           text="上传图片"
           url=""											// 上传路径
           extensions="png,gif,jpeg,jpg"					// 限制文件类型
           @:imageuploaded="imageuploaded">					// 监听图片上传完成事件
		</vue-core-image-upload>
    </div>
</template>

<script>
    import VueCoreImageUpload  from 'vue-core-image-upload';	// 导入VueCoreImageUpload组件
    export default {
        data: function(){
            return {
                src:'../img/1.jpg'							// 默认显示图片地址
            }
        },
        components: {
            VueCoreImageUpload								// 声明组件VueCoreImageUpload
        },
        methods:{
            imageuploaded(res) {							// 定义上传完成执行的方法
                console.log(res)
            }
        }
    }
</script>

```

### vue-echarts-v3 ###
基于vue2和eCharts.js3的图表组件。访问地址：[vue-echarts-v3](https://github.com/xlsdg/vue-echarts-v3)

```JavaScript
<template>
    <div>
        <IEcharts :option="bar"></IEcharts>
    </div>
</template>
	
<script>
    import IEcharts from 'vue-echarts-v3';					// 导入IEcharts组件
    export default {
        data: function(){
            return {
                bar: {
			        title: {
			          text: '柱状图'							// 图标标题文本
			        },
			        tooltip: {},	
			        xAxis: {								// 横坐标
			          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
			        },
			        yAxis: {},								// 纵坐标
			        series: [{
			          name: '销量',
			          type: 'bar',							// 图标类型
			          data: [5, 20, 36, 10, 10, 20]
			        }]
			   	}
            }
        },
        components: {
            IEcharts								// 声明组件VueCoreImageUpload
        }
    }
</script>
```

## 其他注意事项 ##
### 一、如果我不想用到上面的某些组件呢，那我怎么在模板中删除掉不影响到其他功能呢？ ###

举个栗子，我不想用 vue-datasource 这个组件，那我需要分四步走。

第一步：删除该组件的路由，在目录 src/router/index.js 中，找到引入改组件的路由，删除下面这段代码。

```JavaScript
{
    path: '/vuetable',
    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
},
```

第二步：删除引入该组件的文件。在目录 src/components/page/ 删除 VueTable.vue 文件。

第三步：删除该页面的入口。在目录 src/components/common/Sidebar.vue 中，找到该入口，删除下面这段代码。
	
```HTML
<el-menu-item index="vuetable">Vue表格组件</el-menu-item>
```

第四步：卸载该组件。执行以下命令：
	
	npm un vue-datasource -S

完成。

### 二、如何切换主题色呢？ ###

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "../static/css/main.css";
@import "../static/css/color-dark.css";     /*深色主题*/
/*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 theme="dark" 去掉即可。

## 项目截图 ##
### 默认皮肤 ###

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms1.png)

### 浅绿色皮肤 ###

![Image text](https://github.com/lin-xin/manage-system/raw/master/screenshots/wms2.png)