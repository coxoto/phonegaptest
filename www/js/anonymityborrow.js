// JavaScript Document
var borrowinfo = {
	amount_money:'',
	bankcards:'',
	init_b_Info:function(){
		$.ajax({
			url: InterfaceList.U_Domain+InterfaceList.U_WantMoney,
			type: 'post',
			dataType: 'jsonp',
			jsonp: 'qianCallback',
			async:false,
			data: {mobileuid:userinfo.uid},
			success:function(data){
				if(typeof(data.amount_money) != "undefined"){
					borrowinfo.amount_money = data.amount_money;
					borrowinfo.bankcards = data.bankcards;
					if(data.bankcards.length){
					}else{
					}
				}else{
					alert("网络异常，请稍后再试!");
				}
			}
		});
	},
	checkdata:function(){
		var ab_money = $("#ab_money").val();
		var ab_month = $("#qx_value").val();
		var ab_rate = $("#lx_value").val();
		var ab_bank = $("#ab_bank").val();
	},
	test:function(){
		alert(this.amount_money);
	},
};

$(document).ready(function(){
	$('.agreen_img').toggle(function(){
		$('.agreen_img').removeClass('unagreen_icon');
		$('.agreen_img').addClass('agreen_icon');
		$('#clause_cbox').attr('checked',true);
		},function(){
		$('.agreen_img').removeClass('agreen_icon');
		$('.agreen_img').addClass('unagreen_icon');
		$('#clause_cbox').attr('checked',false);
		})
	
	$('.selectblank_table').click(
		function(){
			if($('.bank_box').css('display')=='block'){
				$('.bank_box').css('display','none');
			}else{
				$('.bank_box').css('display','block');
			}
		}
	)
	
	$('.bank_td').click(function(){
		var select_bank=$(this).children('.hide_blank').html();
		$('.selectblank_table span').html(select_bank);
		$('.bank_box').css('display','none');
	});
	
	$('#points').css('display','none');
	$('#points_int').css('display','none');
	
	//滚动条点击事件
	$('.mouth_3').click(function(){
		var id_value=$(this).parent('.time_canvas').siblings('input[type=hidden]').attr('id');
		//alert(id_value);
		$(this).siblings('.slide_circle').animate({left:'162px'},300);
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('td').removeClass('mouth_on');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('td').addClass('mouth_off');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('.text_center').removeClass('mouth_off');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('.text_center').addClass('mouth_on');
		if(id_value=="qx_value"){
			$('#'+id_value).val('3');
		}else{
			$('#'+id_value).val('10%');
		}
	});
	
	$('.mouth_1').click(function(){
		var id_value=$(this).parent('.time_canvas').siblings('input[type=hidden]').attr('id');
		$(this).siblings('.slide_circle').animate({left:'0px'},300);
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('td').removeClass('mouth_on');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('td').addClass('mouth_off');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('.text_left').removeClass('mouth_off');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('.text_left').addClass('mouth_on');
		if(id_value=="qx_value"){
			$('#'+id_value).val('1');
		}else{
			$('#'+id_value).val('8%');
		}
	});
	
	$('.mouth_6').click(function(){
		var id_value=$(this).parent('.time_canvas').siblings('input[type=hidden]').attr('id');
		$(this).siblings('.slide_circle').animate({left:'324px'},300);	
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('td').removeClass('mouth_on');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('td').addClass('mouth_off');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('.text_right').removeClass('mouth_off');
		$(this).parent('.time_canvas').siblings('.borrow_mouth').children().find('.text_right').addClass('mouth_on');
		if(id_value=="qx_value"){
			$('#'+id_value).val('6');
		}else{
			$('#'+id_value).val('12%');
		}
	});
	borrowinfo.init_b_Info();
});
	 	