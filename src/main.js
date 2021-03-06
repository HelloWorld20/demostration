// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/js/turn.min';
import '@/assets/css/ani.css';
import '@/assets/css/swiper.min.css';

import Vue from 'vue';
import hwlever from 'hwlever';
import App from './App';
import router from './router';
import sdk from './config/sdk';
import { isWeixinBrowser } from './config/util';


Vue.config.productionTip = false;

if (isWeixinBrowser()) {
  // 微信环境下配置微信权限 需要上到平台才能正常调试微信接口
	sdk.getWxSignPackage(sdk.configWx.bind(sdk));
	sdk.setWxShare();
}

// hwlever 文档详见 https://github.com/HelloWorld20/hwLever
if (process.env.NODE_ENV !== 'development') {
	hwlever.config({
		cdn: '//24haowan-cdn.shanyougame.com/public/js/vconsole.min.js',
		entry: 'EasterEgg',
		vueObj: Vue,
		ravenId: '//56d67d26f9854c21a1f8e7b83854fecd@sentry.24haowan.com/12',
		extraConf: {
			tags: {
				from: 'hwlever online demo',
			},
		},
		// type: ['touch', 'click', 'swipe', 'shake']
	});
}


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App,
	},
});
