import axios from 'axios'
import md from 'js/md5'
import store from 'store'
import router from 'router'

const baseURL = `${location.origin}/webyb/`;
// const baseURL = `http://139.224.207.42/webyb/`
// const baseURL = `http://192.168.199.221:8080`

const instance = axios.create({
	baseURL,
})
// 添加sign_key
const sign_key = 'YpXmmnW7JAgdZVwFgI2vUfcn71CsAfYY';

instance.interceptors.request.use(function (config) {

  	if(!config.url.match(/sign=/)) {
  		config.url = config.url + (config.url.match(/\?/) ? '&' : '?') + 'sign=' + md.hex_md5(sign_key) ;
  	}
    if(config.url.match(/export/g)){
      sessionStorage.setItem('exportUrl', config.url)
    }
    if(config.url.match(/usersExport/g)){
      sessionStorage.setItem('usersExportUrl', config.url)
    }
    if(config.url.match(/ordersExport/g)){
      sessionStorage.setItem('ordersExportUrl', config.url)
    }
    if(config.url.match(/output/g)){
      sessionStorage.setItem('outputCdkUrl', config.url)
    }
    if(config.url.match(/recordExport/g)){
      sessionStorage.setItem('pageCountUrl', config.url)
    }
    if(config.url.match(/productRecordExport/g)){
      sessionStorage.setItem('productRecordUrl', config.url)
    }
    if(config.url.match(/cdkeyExport/g)){
      sessionStorage.setItem('cdkeyExportUrl', config.url)
    }
	  return config;
}, function (error) {
  router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
  })
	return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
  switch (response.data.code) {
    case 16:
    router.replace({
        path: '/login',
        query: {redirect: router.currentRoute.fullPath}
    })
    window.alert('登陆过期');

    case 2002:
    router.replace({
      path: '/login',
      query: {redirect: router.currentRoute.fullPath}
    })
    window.alert('系统检测到您还未登陆就进入到页面，请前往登陆');
  }

	return response;

}, function (error) {
	if (error.response) {
        switch (error.response.status) {
            case 404:
            // 返回 401 清除token信息并跳转到登录页面
            // router.replace({
            //     path: '/readme',
            //     query: {redirect: router.currentRoute.fullPath}
            // })
            window.alert('我遇到了未知错误，要怎么办？稍后再试一下呗')
            break;

            case 500:
            // router.replace({
            //     path: '/login',
            //     query: {redirect: router.currentRoute.fullPath}
            // })
            window.alert('当前网络出现故障')
            break;

            case 504:
            // router.replace({
            //     path: '/login',
            //     query: {redirect: router.currentRoute.fullPath}
            // })
            window.alert('你惨了，没有网络')
            break;
        }

    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息

});


export default instance;
