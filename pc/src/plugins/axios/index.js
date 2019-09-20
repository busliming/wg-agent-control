import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Message } from 'element-ui';
import vuex from '../vuex'
// import {
// 	MessageBox,
// 	Toast,
// 	Indicator
// } from 'vuesax/dist/components';
// import encryption from '@/components/common/module_js/md5.js'
Vue.prototype.$http = axios


axios.interceptors.request.use(function (config) {
    vuex.state.disa=true
	//在发送请求之前做某事
	return config;
    

}, function (error) {
	//请求错误时做些事
	vuex.state.disa=false
	return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function (response) {
	vuex.state.disa=false
	//对响应数据做些事
	if (response.data.code !== '200') {
		if(response.data.code == '-99') {
			// MessageBox.alert(response.data.msg+',请重新登入', '提示', {
			// 	type: 'warning'
			// }).then(() => {
			// 	localStorage.setItem('user', '');
			// 	window.location.href = '/';
			// });
			if (response.config.url !== '/api/account/gameLogout') {
				MessageBox.confirm('登入失效请重新登入', '提示', {
					customClass: 'custom-messageBox',
					type: "warning"   
				}).then(() => {
					localStorage.setItem('user', '');
					window.location.href = '/';
				});
			} else {
				localStorage.setItem('user', '');
				window.location.href = '/';
			}
		} else {
			// Message.error(response.data.msg);
			Message({
			    message: response.data.msg,
			    type: 'error',
			    customClass: 'custom-message',
			    center: true,			
			})
		}
	} 
	return response;
}, function (error) {
	vuex.state.disa=false
	//请求错误时做些事
	return Promise.reject(error);

});


// export default {
//     post (url, data) {  //  post
//         return axios({
//             method: 'post',
//             baseURL: '',
//             url,
//             data: qs.stringify(data),
//             timeout: 5000,
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest',
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//             }
//         }).then(
//             (response) => {
//                 return checkStatus(response)
//             }
//         ).then(
//             (res) => {
//                 return checkCode(res)
//             }
//         )
//     },
//     get (url, params) {  // get
//         return axios({
//             method: 'get',
//             baseURL: '',
//             url,
//             params, // get 请求时带的参数
//             timeout: 5000,
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest'
//             }
//         }).then(
//             (response) => {
//                 return checkStatus(response)
//             }
//         ).then(
//             (res) => {
//                 return checkCode(res)
//             }
//         )
//     }
// }
