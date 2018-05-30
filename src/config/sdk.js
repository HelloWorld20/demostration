export default {

	wxSignPackage: null,

	getWxSignPackage: (callback) => {
		let self = this
		$.ajax({
			url: '/game/gameAjax/GetSignPackage',
			dataType: 'json',
			type: 'POST',
			async: false,
			data: {
				url: location.href.split('#')[0]
			},
			success: (result) => {
				var msg = result.data || result.msg;
				self.wxSignPackage = msg;
				if (callback) callback(msg);
			},
			error: (xhr, errorType, error) => {
				// self.error("返回结果: ", xhr, errorType);
			}
		});
	},

	configWx: () => {
		// 这里有个坑。用//api.24haowan.com时，nonceStr是大写。用平台时是：noncestr。切换时记得切换
		if (!this.wxSignPackage.appId || !this.wxSignPackage.timestamp || !this.wxSignPackage.nonceStr || !this.wxSignPackage.signature) {
			return false;
		} else {
			/* 微信接口 */
			wx.config({
				debug: false,
				appId: this.wxSignPackage.appId,
				timestamp: this.wxSignPackage.timestamp,
				nonceStr: this.wxSignPackage.nonceStr,
				signature: this.wxSignPackage.signature,
				jsApiList: [
					// 所有要调用的 API 都要加到这个列表中
					'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems',
					// 录音相关
					'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice'
				]
			});
		}
		return this;
	},

	setWxShare: (callback) => {

		// 配置分享信息
		wx.ready(function () {
			// 在这里调用 API
			// 分享朋友圈
			wx.onMenuShareTimeline({
				title: '24好玩 | H5案例推荐', // 分享标题
				link: location.href, // 分享链接
				imgUrl: 'http://24haowan-cdn.shanyougame.com/dingzhi/assets/share.png', // 分享图标
				success: () => {
					if (callback) callback();
				},
				cancel: () => { }
			});

			// 分享朋友
			wx.onMenuShareAppMessage({
				title: '24好玩 | H5案例推荐', // 分享标题
				desc: '营销也可以很好玩', // 分享描述
				link: location.href, // 分享链接
				imgUrl: 'http://24haowan-cdn.shanyougame.com/dingzhi/assets/share.png', // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: () => {
					if (callback) callback();
				},
				cancel: () => { }
			});
		})
	},

	getUserOpenid: (cb) => {
		$.ajax({
			url: "/game/v1/userViewParams",
			async: false,
			dataType: 'json',
			type: 'POST',
			data: {
				game_id: location.href.match(/game_id\/\d+/) ? location.href.match(/game_id\/\d+/)[0].split("/")[1] : -1,
				isTest: 0,
				key: ''
			},
			success: (result) => {
				let data = result.data;
				console.log(data);
				if (result.code == 0) {
					console.log(1);
					cb(data.user_name);
				}
			},
			error: (err) => {
				console.log(err);
			}
		});
	},
}
