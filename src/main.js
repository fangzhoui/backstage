import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';  // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import ContentWrap from 'components/common/ContentWrap'
import VueClipboards from 'vue-clipboards'

Vue.use(VueClipboards);
Vue.component('page-wrap', ContentWrap)

Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
