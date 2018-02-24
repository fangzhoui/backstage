<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="readme">
                <i class="el-icon-setting"></i>首页
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>网页管理</template>
                <el-menu-item index="web-banner">网页Banner</el-menu-item>
                <el-menu-item index="web-content">网页内容</el-menu-item>
                <el-menu-item index="section">专题管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="resource">
                <i class="el-icon-picture"></i>资源管理
            </el-menu-item>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-d-caret"></i>产品管理</template>
                <el-menu-item index="game">游戏</el-menu-item>
                <el-menu-item index="live">直播</el-menu-item>
                <el-menu-item index="business">电商</el-menu-item>
                <el-menu-item index="convenience">便民</el-menu-item>
                <el-menu-item index="hotkey">热搜</el-menu-item>
                <el-menu-item index="hotnovel">小说</el-menu-item>
                <el-menu-item index="cartoon">漫画</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-sold-out"></i>礼包管理</template>
                <el-menu-item index="packagelist">礼包领取</el-menu-item>
                <el-menu-item index="managementgift">游戏礼包</el-menu-item>
            </el-submenu>
            <el-menu-item index="downloadcount">
                <i class="el-icon-download"></i>下载排行
            </el-menu-item>
            <el-submenu index="14">
                <template slot="title"><i class="el-icon-document"></i>主题管理</template>
                <el-menu-item index="topicSection">主题位置</el-menu-item>
                <el-menu-item index="topic">主题</el-menu-item>
                <el-menu-item index="topicGame">主题游戏</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-d-caret"></i>产品分类</template>
                <el-menu-item index="game-type">游戏</el-menu-item>
                <el-menu-item index="business-type">电商</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-share"></i>用户管理</template>
                <el-menu-item index="black-list">黑名单</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title"><i class="el-icon-document"></i>统计管理</template>
                <el-menu-item index="page-count">全部点击统计</el-menu-item>
                <el-menu-item index="click-count">产品点击统计</el-menu-item>
                <el-menu-item index="user-count">用户统计</el-menu-item>
                <el-menu-item index="history-count">历史记录</el-menu-item>
                <el-menu-item index="attention-count">关注统计</el-menu-item>
                <!-- <el-menu-item index="echart">用户数据</el-menu-item> -->
            </el-submenu>
            <el-submenu index="8">
                <template slot="title"><i class="el-icon-share"></i>活动管理</template>
                <el-menu-item index="active-config">活动配置</el-menu-item>
                <el-menu-item index="active-count">活动统计</el-menu-item>
            </el-submenu>
            <el-submenu index="9">
                <template slot="title"><i class="el-icon-star-on"></i>积分商城</template>
                <el-menu-item index="integral-count">积分统计</el-menu-item>
                <el-menu-item index="goods-count">商品管理</el-menu-item>
                <el-menu-item index="order-list">订单管理</el-menu-item>
                <!-- <el-menu-item index="">积分接口维护</el-menu-item> -->
            </el-submenu>
            <el-submenu index="10">
                <template slot="title"><i class="el-icon-star-off"></i>积分游戏</template>
                <el-menu-item index="score-game">游戏列表</el-menu-item>
            </el-submenu>
            <el-submenu index="11">
                <template slot="title"><i class="el-icon-menu"></i>微信公众号管理</template>
                <el-menu-item index="wx-autoreply">自动回复</el-menu-item>
                <el-menu-item index="wx-defaultReply">默认回复</el-menu-item>
                <el-menu-item index="wx-menu">自定义菜单</el-menu-item>
                <el-menu-item index="wx-qrcode">二维码管理</el-menu-item>
            </el-submenu>
            <el-submenu index="12">
                <template slot="title"><i class="el-icon-message"></i>资讯管理</template>
                <el-menu-item index="message">短信管理</el-menu-item>
                <el-menu-item index="informationlist">资讯列表</el-menu-item>
                <el-menu-item index="usermessage">站内信</el-menu-item>
            </el-submenu>
            <el-submenu index="13">
                <template slot="title"><i class="el-icon-document"></i>评论反馈</template>
                <el-menu-item index="feedback">用户反馈</el-menu-item>
            </el-submenu>
            <el-menu-item index="admin">
                <i class="el-icon-star-on"></i>权限管理
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow: auto;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
