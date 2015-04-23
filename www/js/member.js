// JavaScript Document
var member = {
	login:function(){
		var u_mobile = $("#mobile").val();
		var u_passwd = $("#passwd").val();
		$.ajax({
			url: WWW_URL+'/userlogin',
			type: 'post',
			dataType: 'jsonp',
			jsonp: 'qianCallback',
			data: {phone:u_mobile,password:u_passwd},
			success:function(data){
				if(data.status == '1'){
					$.cookie("mobileuid", data.mobileuid);
					$.cookie("username", data.username);
					$.cookie("phone", data.phone);
					window.location.href = "index.html";
				}else{
					alert(data.msg);
				}
			}
		});
	},
	register:function(){
		var u_mobile = $("#mobile").val();
		var u_passwd = $("#passwd").val();
		$.ajax({
			url: WWW_URL+'/userreg',
			type: 'POST',
			dataType: 'jsonp',
			jsonp: 'qianCallback',
			data: {phone:u_mobile,password:u_passwd},
			success:function(data){
				if(data.status == '1'){
					$.cookie("mobileuid", data.mobileuid);
					$.cookie("username", data.username);
					$.cookie("phone", data.phone);
					window.location.href = "index.html";
				}else{
					alert(data.msg);
				}
			}
		});
	},
	resetpw:function(){
		
	},
	initmember:function(){
		$(document).ready(function(){
			$(".seepw").toggle(
				function(){
					$(this).addClass('showpw');
					$("#passwd").hide();
					$("#passwd2").show();
				},
				function(){
					$(this).removeClass('showpw');
					$("#passwd2").hide();
					$("#passwd").show();
				}
			);
			$("#passwd").change(function(){
				var pw = $("#passwd").val();
				$("#passwd2").val(pw);
			});
			$("#passwd2").change(function(){
				var pw = $("#passwd2").val();
				$("#passwd").val(pw);
			});
		});
	},
	init_height:function(){
		$('.main').each(function(){
			$(this).css('height',wh);
		});
	},
};
member.init_height();
member.initmember();