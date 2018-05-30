import Vue from 'vue';
import Router from 'vue-router';
// import Loading from '@/components/Loading';
import Main from '@/components/Main'
// import End from '@/components/End'


Vue.use(Router);

export default new Router({
	routes: [{
		path: '/',
		component: Main,
	},
	{
		path: '/main',
		component: Main,
	},
	{
		path: '*',
		component: Main,
	}],
});
