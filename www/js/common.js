// JavaScript Document
var WWW_URL = 'http://qian.evenhidata.com';
var wh = window.innerHeight; //window.screen.height;
var userinfo = {
	uid:'',
	username:'',
	userphone:'',
	checkval:'',
	InitUserinfo:function(){
		this.uid = $.cookie('mobileuid');
		this.username = $.cookie('username');
		this.userphone = $.cookie('phone');
		
		if(parseInt(this.uid) > 0){
			
		}else{
			var purl = window.location.href;
			if(purl.indexOf("login.html") > 0){
			
			}else{
				window.location.href = "login.html";
			}
		}
	},
	GetUserinfo:function(){
		var userinfo = {uid:uid,username:username};
		return userinfo;
	},
};
var InterfaceList = {
	U_Domain:	'http://qian.evenhidata.com/',
	U_Login:	'userlogin',			// 登陆
	U_Reg:		'userreg',				// 注册
	U_Center:	'mycenter',				// 用户中心
	U_CreditList:	'creditindex',		// 授信列表
	U_DoCredit:		'docredit',			// 调整授信金额
	U_CreditDetail:	'creditdetail',		// 授信详情页
	U_WantMoney:	'wantmoney',		// 借入
}

userinfo.InitUserinfo();

$(document).ready(function(){
	init_width();
});

/**
* 根据机器型号初始化机器宽度
*/
function init_width(){
	var isMobile = {
		Android: function() { return navigator.userAgent.match(/Android/i) ? 'Android' : false; },
		BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i) ? 'BlackBerry' : false; },
		iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? 'iOS' : false; },
		Windows: function(){ return navigator.userAgent.match(/IEMobile/i) ? 'Windows' : false; },
		any: function(){ return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows()); }
	};
	if(isMobile.any()){
		var phoneWidth =  parseInt(window.screen.width);
		var phoneScale = phoneWidth/640;
		var ua = navigator.userAgent;
		if(/Android (\d+\.\d+)/.test(ua)){
			var version = parseFloat(RegExp.$1);
			if(version>2.3){
				$("<meta>").attr({content: 'width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi', name: "viewport"}).appendTo("head");
        	}else{
				$("<meta>").attr({content: 'width=640, target-densitydpi=device-dpi', name: "viewport"}).appendTo("head");
        	}
    	}else{
			$("<meta>").attr({content: 'width=640, user-scalable=no, target-densitydpi=device-dpi', name: "viewport"}).appendTo("head");
    	}
	}
}

function changepage(purl){
	$.mobile.changePage(purl,{transition: "slide"});
}

function changepage(purl,ctype,torf){
	$.mobile.changePage(purl,{transition: ctype,reverse:torf,changeHash:torf});
}

// 获取url参数
function getQueryString(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}

function getArrIndex(str,arr){
	for (var i = 0; i < arr.length; i++) { 
		if (str == arr[i]) { 
			return i;
		}
	}
	return -1; 
} 