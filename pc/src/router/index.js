import Vue from 'vue'
import Router from 'vue-router'
import store from '../plugins/vuex/index.js'
import { MessageBox, Message } from 'element-ui';
// 页面布局
const layout = resolve => require(['@/components/layout/layout'], resolve)
// 404页面
const notFound = resolve => require(['@/components/content/404/404'], resolve)
// 首页菜单
const home = resolve => require(['@/components/content/home/home'], resolve)
const game = resolve => require(['@/components/content/game/game'], resolve)
const promotions = resolve => require(['@/components/content/promotions/promotions'], resolve)
const downLoad = resolve => require(['@/components/content/download'], resolve)
const notice = resolve => require(['@/components/content/notice/userNotice'], resolve)

// 个人中心 >>
const userProfile = resolve => require(['@/components/content/userProfile/userProfile'], resolve)
const recharge = resolve => require(['@/components/content/recharge/recharge'], resolve)
const agentPay = resolve => require(['@/components/content/recharge/agentPay/agentPay'], resolve)	//个人中心 >> 充值 >> 代理充值 
const officialPay = resolve => require(['@/components/content/recharge/officialPay/officialPay'], resolve)	//个人中心 >> 充值 >> 官方充值 
// const onlinePay = resolve => require(['@/components/content/recharge/onlinePay/onlinePay'], resolve)	//个人中心 >> 充值 >> 线上支付 
//个人中心 >> 充值 >> 线上支付 
const meituanScanCode = resolve => require(['@/components/content/recharge/onlinePay/meituanScanCode'], resolve)
const qqWallet = resolve => require(['@/components/content/recharge/onlinePay/qqWallet'], resolve)
const unionPay = resolve => require(['@/components/content/recharge/onlinePay/unionPay'], resolve)
const unionPayExpress = resolve => require(['@/components/content/recharge/onlinePay/unionPayExpress'], resolve)
const unionPayScanCode = resolve => require(['@/components/content/recharge/onlinePay/unionPayScanCode'], resolve)
const weixinScanCode = resolve => require(['@/components/content/recharge/onlinePay/weixinScanCode'], resolve)
const zfbScanCode = resolve => require(['@/components/content/recharge/onlinePay/zfbScanCode'], resolve)
const JDScanCode = resolve => require(['@/components/content/recharge/onlinePay/JdScanCode'], resolve)

// 提现
const withdraw = resolve => require(['@/components/content/withdraw/withdraw'], resolve)
//b绑定
const binding = resolve => require(['@/components/content/binding/binding'], resolve)
//帮助中心
const help = resolve => require(['@/components/content/help/help'], resolve)
//个人设置>>个人资料
const personal = resolve => require(['@/components/content/personal_set/personal'], resolve)
const personaldata = resolve => require(['@/components/content/personal_set/personalData'], resolve)
const personalSafety = resolve => require(['@/components/content/personal_set/personalSafety'], resolve)


Vue.use(Router)

var routes = new Router({
	mode: 'history',
	routes: [		
		{
			path: '/',
			name: 'layout',
			component: layout,
			redirect: '/home',
			children: [
				{	//首页
					path: '/home',
					name: 'home',
					component: home
				},
				{	//棋牌游戏
					path: '/game/:type',
					name: 'game',
					component: game
				},
				{	//个人中心
					path: '/userProfile',
					name: 'userProfile',
					component: userProfile
				},
				{	//优惠活动
					path: '/promotions',
					name: 'promotions',
					component: promotions
				},
				{	//下载中心
					path: '/download',
					name: 'download',
					component: downLoad
				},
				{
					//提醒
					path: '/notice',
					name: 'notice',
					component: notice
				},
				{
					//提现
					path: '/withdraw/:id',
					name: 'withdraw',
					component: withdraw
				},
				{
					//提现
					path: '/binding/:id',
					name: 'binding',
					component: binding
				},
				{	//充值
					path: '/zfbScanCode/:pa',
					name: 'recharge',
					component: recharge,
				//	redirect: '/zfbScanCode',
					children: [{	//支付宝扫码
							path: '/zfbScanCode/:pa',
							name: 'zfbScanCode',
							component: zfbScanCode
						},	
						{	//微信扫码
							path: '/weixinScanCode/:pa',
							name: 'weixinScanCode',
							component: weixinScanCode
						},	
						{	//银联扫码
							path: '/unionPayScanCode/:pa',
							name: 'unionPayScanCode',
							component: unionPayScanCode
						},	
						{	//银联快捷
							path: '/unionPayExpress/:pa',
							name: 'unionPayExpress',
							component: unionPayExpress
						},	
						{	//QQ钱包
							path: '/qqWallet/:pa',
							name: 'qqWallet',
							component: qqWallet
						},	
						{	//美团扫码
							path: '/meituanScanCode/:pa',
							name: 'meituanScanCode',
							component: meituanScanCode
						},
						{	//京东扫码
							path: '/JDScanCode/:pa',
							name: 'JDScanCode',
							component: JDScanCode
						},	
						{	//银联支付
							path: '/unionPay/:pa',
							name: 'unionPay',
							component: unionPay
						},
						// {	//线上支付
						// 	path: '/onlinePay',
						// 	name: 'onlinePay',
						// 	component: onlinePay											
						// },
						{	//官方充值
							path: '/officialPay/:pa',
							name: 'officialPay',
							component: officialPay											
						},						
						{	//代理充值
							path: '/agentPay/:pa',
							name: 'agentPay',
							component: agentPay
						}				
					]				
				},
				{
					//帮助
					path: '/help',
					name: 'help',
					component: help
				},
				{
					//个人设置
					path: '/personal',
					name: 'personal',
					component: personal,
					redirect: '/personaldata',
					children: [
					     {
					     	path: '/personaldata',
							name: 'personaldata',
							component: personaldata,
					     },
					     {
					     	path: '/personalSafety',
							name: 'personalSafety',
							component: personalSafety,
					     }
					]
				},
			]
		},
		{
			path: '*',
			name: '404',
			component: notFound
		}
	],
	
});

routes.beforeEach((to, from, next) => {
	var user = store.state.user
	var str1 = ['/userProfile', '/notice', '/zfbScanCode', '/personaldata']; 
	var str2 = ['/userProfile', '/zfbScanCode', '/personaldata']; 
	//未登录
	if (!user) {	
		for (var i = 0; i < str1.length; i++) {
			if (to.path.includes(str1[i])) {
				if (from.path == '/') {
					next('/home');
					return;
				}
				else {
					next(false)
					Message({
						message: '请先登入',
						type: 'error',
						customClass: 'custom-message',
						center: true,
						duration: 2000
					})
					return;
				}
			}
		}
	}
	//试玩账号
	if (user.identity === 2) {
		for (var i = 0; i < str2.length; i++) {			
			if (to.path.includes(str2[i])) {
				if (str2[i] == '/zfbScanCode') {
					Message({
						message: '试玩账号不能进入!',
						type: 'error',
						customClass: 'custom-message',
						center: true,
						duration: 2000
					})
				}				
				next(false);
				return;
			}                     
		}  
	}
	next();
});
export default routes;
