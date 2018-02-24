import Vue from 'vue';
import Router from 'vue-router';
import Banner from 'components/page/web/Banner'
import Content from 'components/page/web/Content'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                // {
                //     path: '/basetable',
                //     component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                // },
                // {
                //     path: '/vuetable',
                //     component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                // },
                // {
                //     path: '/baseform',
                //     component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                // },
                // {
                //     path: '/vueeditor',
                //     component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                // },
                // {
                //     path: '/markdown',
                //     component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                // },
                // {
                //     path: '/upload',
                //     component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                // },
                // {
                //     path: '/basecharts',
                //     component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                // },
                // {
                //     path: '/mixcharts',
                //     component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                // },

                // 网页管理
                {
                    path: '/web-banner',
                    component: Banner,
                },
                {
                    path: '/web-content',
                    component: Content,
                },
                {
                    path: '/section',
                    component: resolve => require(['../components/page/web/sectionlist.vue'], resolve)
                },
                // 产品管理
                {
                    path: '/game',
                    component: resolve => require(['../components/page/product/Game.vue'], resolve)
                },
                {
                    path: '/live',
                    component: resolve => require(['../components/page/product/Live.vue'], resolve)
                },
                {
                    path: '/business',
                    component: resolve => require(['../components/page/product/Business.vue'], resolve)
                },
                {
                    path: '/convenience',
                    component: resolve => require(['../components/page/product/Convenience.vue'], resolve)
                },
                {
                    path: '/hotkey',
                    component: resolve => require(['../components/page/product/HotKey.vue'], resolve)
                },
                {
                    path: '/hotnovel',
                    component: resolve => require(['../components/page/product/Hotnovel.vue'], resolve)
                },
                {
                    path: '/cartoon',
                    component: resolve => require(['../components/page/product/Cartoon.vue'], resolve)
                },
                // 礼包管理
                {
                    path: '/packagelist',
                    component: resolve => require(['../components/page/package/packagelist.vue'], resolve)
                },
                {
                    path: '/managementgift',
                    component: resolve => require(['../components/page/package/managementgift.vue'], resolve)
                },
                // 下载排行
                {
                    path: '/downloadcount',
                    component: resolve => require(['../components/page/downloadcount/downloadcount.vue'], resolve)
                },
                // 主题管理
                {
                    path: '/topic',
                    component: resolve => require(['../components/page/topic/topic.vue'], resolve)
                },
                {
                    path: '/topicSection',
                    component: resolve => require(['../components/page/topic/topicSection.vue'], resolve)
                },
                {
                    path: '/topicGame',
                    component: resolve => require(['../components/page/topic/topicGame.vue'], resolve)
                },
                // 产品分类
                {
                    path: '/game-type',
                    component: resolve => require(['../components/page/productType/GameType.vue'], resolve)
                },
                {
                    path: '/business-type',
                    component: resolve => require(['../components/page/productType/BusinessType.vue'], resolve)
                },
                // 统计管理
                {
                    path: '/page-count',
                    component: resolve => require(['../components/page/count/pagecount.vue'], resolve)
                },
                {
                    path: '/click-count',
                    component: resolve => require(['../components/page/count/clickcount.vue'], resolve),
                },
                {
                    path: '/user-count',
                    component: resolve => require(['../components/page/count/UserCount.vue'], resolve)
                },
                {
                    path: '/history-count',
                    component: resolve => require(['../components/page/count/HistoryCount.vue'], resolve)
                },
                {
                    path: '/attention-count',
                    component: resolve => require(['../components/page/count/attention.vue'], resolve)
                },
                {
                    path: '/echart',
                    component: resolve => require(['../components/page/count/Echart.vue'], resolve)
                },
                // 用户管理
                {
                    path: '/black-list',
                    component: resolve => require(['../components/page/user/BlackList.vue'], resolve)
                },
                // 权限管理
                {
                    path: '/admin',
                    component: resolve => require(['../components/page/admin/Index.vue'], resolve)
                },
                // 短信管理
                {
                    path: '/message',
                    component: resolve => require(['../components/page/message/Index.vue'], resolve)
                },
                {
                    path: '/informationlist',
                    component: resolve => require(['../components/page/message/informationlist.vue'], resolve)
                },
                {
                    path: '/informationedit',
                    component: resolve => require(['../components/page/message/informationedit.vue'], resolve)
                },
                // 资源管理
                {
                    path: '/resource',
                    component: resolve => require(['../components/page/resource/Index.vue'], resolve)
                },
                {
                    path: '/active-config',
                    component: resolve => require(['../components/page/active/ActiveConfig.vue'], resolve)
                },
                {
                    path: '/active-count',
                    component: resolve => require(['../components/page/active/ActiveCount.vue'], resolve)
                },
                // 积分商城
                {
                    path: '/integral-count',
                    component: resolve => require(['../components/page/integral/integralCount.vue'], resolve),
                },
                {
                    path: '/goods-count',
                    component: resolve => require(['../components/page/integral/goodsCount.vue'], resolve)
                },
                {
                    path: '/order-list',
                    component: resolve => require(['../components/page/integral/orderList.vue'], resolve)
                },
                // 积分游戏
                {
                    path: '/score-game',
                    component: resolve => require(['../components/page/scoregame/scoreGameList.vue'], resolve)
                },
                { // 货物详情
                    path: '/goods-detail',
                    component: resolve => require(['../components/page/integral/goodsDetail.vue'], resolve)
                },
                { // 积分游戏详情
                    path: '/score-game-detail',
                    component: resolve => require(['../components/page/scoregame/ScoreGameDel.vue'], resolve)
                },
                { // 微信管理
                    path: '/wx-autoreply',
                    component: resolve => require(['../components/page/wx/autoreply.vue'], resolve)
                },
                { // 默认回复
                    path: '/wx-defaultReply',
                    component: resolve => require(['../components/page/wx/defaultReply.vue'], resolve),
                },
                { // 二维码管理
                    path: '/wx-menu',
                    component: resolve => require(['../components/page/wx/menu.vue'], resolve)
                },
                { // 菜单管理
                    path: '/wx-qrcode',
                    component: resolve => require(['../components/page/wx/qrcode.vue'], resolve)
                },
                { // 评论反馈
                    path: '/feedback',
                    component: resolve => require(['../components/page/rating/feedback.vue'], resolve)
                },
                { // 站内信
                    path: '/usermessage',
                    component: resolve => require(['../components/page/message/usermessage.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
