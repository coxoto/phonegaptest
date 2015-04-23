// JavaScript Document
var credit_money = Array('0','500','2000','5000','10000','30000');
var pc_cid =  parseInt(getQueryString('cid'));
if(pc_cid > 0){}else{
	pc_cid = d_cid;
}
var detailinfo;
$(document).ready(function(){
	init_height();
	$('.c_listbox').toggle(function(){
		$('.list_credit ').css('display','block');
		if(wh>1024){
			var listheight=wh-1024;
			$('.pc_adjust_btn').css('padding-top',listheight/2);
			$('.pc_adjust_btn').css('padding-bottom',listheight/2);
			$('.pc_adjust_btn').css('height','80px');
			$('.c_listbox').addClass('c_listbox_open');
		}else{
			$('.pc_adjust_btn').css('padding','60px 4.69% 0');
			$('.pc_adjust_btn').css('height',listheight+'px');
		}
	},function(){
		$('.list_credit').css('display','none');
		var listheight=wh-754;
		$('.pc_adjust_btn').css('padding','60px 4.69% 0');
		$('.pc_adjust_btn').css('height',listheight+'px');
		$('.c_listbox').removeClass('c_listbox_open');
	});
	
	$('.pc_adjust_close').click(function(){
		hid_adjust_box();
	});
	
	//调节按钮
	$('.pc_adjust_quota').click(function(){
		$('.pc_adjust_box').stop();
		$('.pc_adjust_box').animate({bottom:0},300,function(){
			$('.mb_box').css('display','block');
			$('.mb_box').click(function(){
				hid_adjust_box();	
			})
			var credit_name=$('.friend_name').html();
			$('.center_middle').addClass('blur');
			$('.credit_name').html(credit_name);
			var credit_m = parseInt(detailinfo.credit_money);
			var c_num = getArrIndex(credit_m,credit_money);
			pc_UpdatePos(c_num);
		});	
	});
	
	$(".pc_c_m_btn a").click(function(){
		var a_id = $(this).attr('id');
		var on_id = $(".pc_btn_now").attr('id');
		if(a_id != on_id){
			var a_num = a_id.replace('pc_m_btn_','');
			pc_UpdatePos(a_num);
		}
	});
	initdetailinfo();
	
	//点击分享按钮
	$('.st_share').click(function(){
		$('.invit_center').stop();
		$('.mb_box').css('display','block');
		$('.invit_center').css('display','block');
		$('.invit_center').animate({bottom:0},300,function(){
			$('.mb_box').click(function(){
				close_share_box();
			})
		});
		$('.center_middle').addClass('blur');
	});
	
	//关闭分享按钮
	$('.invit_bottom').click(function(){
		close_share_box();
	});

})

function initdetailinfo(){
	if(pc_cid>0){
		$.ajax({
			url: InterfaceList.U_Domain+InterfaceList.U_CreditDetail,
			type: 'post',
			dataType: 'jsonp',
			jsonp: 'qianCallback',
			async: false,
			data: {mobileuid:userinfo.uid,contact_id:pc_cid},
			success:function(data){
				detailinfo = data;
				$("#pc_truename").html(data.truename);
				$("#pc_phone").html(data.phone);
				$("#pc_credit_money").html(data.credit_money);
				$("#pc_creditmoney_avg").html(data.creditmoney_avg);
				$("#pc_creditpeople_count").html(data.creditpeople_count);
				$("#pc_creditmoney_sum").html(data.creditmoney_sum);
				$("#pc_credit_500").html(data.credit_500);
				$("#pc_credit_2000").html(data.credit_2000);
				$("#pc_credit_5000").html(data.credit_5000);
				$("#pc_credit_10000").html(data.credit_10000);
				$("#pc_credit_30000").html(data.credit_30000);
			},
		});
	}else{
		//history.go(-1);
	}
}

//关闭调节框
function hid_adjust_box(){
	$('.pc_adjust_box').animate({bottom:-434},300,function(){
		$('.pc_adjust_box').stop();
		$('.mb_box').css('display','none');	
		$('.mb_box').off();
		$('.center_middle').removeClass('blur');	
	});	
}

function pc_UpdatePos(a_num){
	$(".pc_btn_now").removeClass('pc_btn_now');
	$(".pc_money_select").removeClass('pc_money_select');
	$("#pc_m_text_"+a_num).addClass('pc_money_select');
	$("#pc_m_text_"+a_num).children('.credit_relation').css('display','block');
	$("#pc_m_btn_"+a_num).addClass('pc_btn_now');
	var line_length = a_num * 101;
	$(".pc_line_up").animate({width:line_length+"px"},300);
	$(".pc_btn_over").each(function(index, element){
	   $(this).removeClass('pc_btn_over');
	});
	for(var i=0; i<a_num;i++){
		$("#pc_m_btn_"+i).addClass('pc_btn_over');
	}
}

function pc_DoCredit(){	// 授信
	var c_num = $(".pc_c_m_btn .pc_btn_now").attr('id');
	c_num = c_num.replace('pc_m_btn_','');
	var c_money = credit_money[c_num];
	$.ajax({
		url: InterfaceList.U_Domain+InterfaceList.U_DoCredit,
		type: 'post',
		dataType: 'jsonp',
		jsonp: 'qianCallback',
		async: false,
		data: {mobileuid:userinfo.uid,contact_id:pc_cid,amount:c_money},
		success:function(data){
			if(data.status == '1'){
				initdetailinfo();
				hid_adjust_box();
			}else{
				alert("请重新提交或联系管理员");
			}
		}
	});
}

function init_height(){
	$('.main').each(function(){
		$(this).css('height',wh-128);
	});
	
	var listheight=wh-754;
	$('.pc_adjust_btn').css('height',listheight+'px');
	$('.pc_adjust_btn').css('padding-top','60px');
}

function close_share_box(){
	$('.invit_center').stop();
	$('.invit_center').animate({bottom:-370},300,function(){
		$('.invit_center').css('display','none');
		$('.center_middle').removeClass('blur');
		$('.mb_box').css('display','none');
		$('.mb_box').off();	
	});
}