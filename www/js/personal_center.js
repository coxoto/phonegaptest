// JavaScript Document
$(document).ready(function(){
	init_height();
	
	//点击设置按钮&&点击区域回到中间页面
	$('.set_btn').click(function(){
		$('.set_center').css('height',wh-40+'px');
		$('.set_center').css('display','block');
		$('.set_center').animate({left:0},300);
		$('.center_middle').animate({left:460},300,function(){
			$('.center_middle').on('click',function(){
			$('.center_middle').animate({left:0},300);
			$('.set_center').animate({left:-460},300,function(){
				$('.center_middle').off('click');
				});
			});
		});
	});
	
	//点击分享按钮
	$('.share_btn').click(function(){
		share_btn();
	});
	
	//关闭分享
	$('.share_bottom').click(function(){
		$('.share_center').animate({bottom:-370},300,function(){
			$('.share_center').css('display','none');
			$('.center_middle').removeClass('blur');
		});
	});
	initpdata();
	
	$('.empty_share_btn').click(function(){
		share_btn();	
	})
	
})

function init_height(){
	$('.main').each(function(){
		$(this).css('height',wh-226);
	});
	
	$('.p_text').css('height',wh-906);
	$('.p_text').css('line-height',wh-906+'px');
	//var img_h=$('.p_top_box').height();
	
	$('.pc_bj').css('height',wh-495+'px');
}

//图表自动设置高度
function chart(){
	
	var snum_array = new Array();
	var h_array=0;
	var i=0;
	$('.support_num').each(function(index, element) {
        var s_num=$(element).html().replace('人','');
        snum_array[i]=s_num;
		//alert(snum_array[i].length)
		if(snum_array[i].length>2){
			$(this).addClass('support_num_d');
		}
		i++;
		
		if(s_num!=0){
			$('.p_chart_list').removeClass('dis_none');
			$('.empty_share').addClass('dis_none');
		}
    });
	var num_max=Math.max.apply(Math,snum_array);
	var num_min=Math.min.apply(Math,snum_array);
	pre=240/num_max;
	if(num_max>0){
		$('.support_num').each(function(index, element) {
			var s_num=$(element).html().replace('人','');
			h_array=s_num*pre;
			$(element).parents('table').children().find('.support_chart').css('height',h_array);
			$(element).parents('table').children().find('.support_chart').parent('td').css('height',h_array+12+'px');
			if(h_array==0){
				$(element).parents('table').children().find('.support_chart').css('height','12px');
				$(element).parents('table').children().find('.support_chart').parent('td').css('height','24px');
			}else if(h_array<12){
				$(element).parents('table').children().find('.support_chart').css('height','12px');
				$(element).parents('table').children().find('.support_chart').parent('td').css('height','24px');
			}
		});	
	}
	
}

function initpdata(){
	$("#set_u_name").text(userinfo.username);
	if(parseInt(userinfo.uid) <= 0){
		window.location.href = "login.html";
	}
	$.ajax({
			url: WWW_URL+'/mycenter',
			type: 'POST',
			dataType: 'jsonp',
			jsonp: 'qianCallback',
			data: {mobileuid:userinfo.uid},
			success:function(data){
				console.log(data);
				$("#credit_p_num").html(data.credit_counts);
				$("#credit_all_money").html(data.credit_money);
				$("#credit_5").html(data.credit_500+"人");
				$("#credit_20").html(data.credit_2000+"人");
				$("#credit_50").html(data.credit_5000+"人");
				$("#credit_100").html(data.credit_10000+"人");
				$("#credit_300").html(data.credit_30000+"人");
				
				$("#money_in_num").html(data.moneyin_notrepay);
				$("#money_out_num").html(data.moneyout_notreturn);
				$("#collect_num").html(data.collecting_count);
				chart();
			}
		});
}

function share_btn(){
	$('.share_center').css('display','block');
	$('.share_center').animate({bottom:0},300);
	$('.center_middle').addClass('blur');	
}