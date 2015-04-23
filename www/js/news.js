$(document).on("pageinit",function(){
	init_height();
	
	//checkbox初始化未选中
	$('.checkbox_all').each(function(index, element) {
        $(element).attr('checked',false);
    });
		
	$('.credit_list').last().css('border','none');
	
	$('.editor_btn').click(function(){
		$('.credit_list_td2').css('width','6%');
		$('.credit_list_td3').css('width','10.2%');
		$('.credit_list_td3').addClass('unagreen_icon');
		$(this).css('display','none');
		$('.cancel_btn').css('display','block');
		$('.bottom_menu').css('display','none');
		$('.bottom_del').css('display','block');
		})
		
	$('.cancel_btn').click(function(){
		$('.credit_list_td2').css('width','16.2%');
		$('.credit_list_td3').css('width','0');
		$(this).css('display','none');
		$('.editor_btn').css('display','block');
		$('.bottom_menu').css('display','block');
		$('.bottom_del').css('display','none');
		$('.credit_list_td3').removeClass('agreen_icon');
		$('.credit_list_td3').removeClass('unagreen_icon');
		$('.checkbox_all').each(function(index, element) {
             $(element).attr('checked',false);
        });
		})
	
	$('.credit_list_td3').click(function(){
		var str=$(this).css('background-image');
		//alert(str);
		if(str.indexOf('unagreen')>0){
			//$(this).css('background','url(file:///D:/coreamp/htdocs/meng3/youqian/images/agreen_icon.png) no-repeat right center');
			$(this).removeClass('unagreen_icon');
			$(this).addClass('agreen_icon');
			$(this).children().find('.checkbox_all').attr('checked',true);
			}
		else{
			$(this).removeClass('agreen_icon');
			$(this).addClass('unagreen_icon');
			//$(this).css('background','url(file:///D:/coreamp/htdocs/meng3/youqian/images/unagreen_icon.png) no-repeat right center');
			$(this).children().find('.checkbox_all').attr('checked',false);
			}
		})
		
	//全选按钮	
	$('.select_all a').click(function(){
		var flag_on=0;
		var flag_off=0;
		var flag_opt='';
		var img_name='';
		$('.checkbox_all').each(function(index, element){
			var a = $(element).attr('checked');
			if(a !='checked'){
				flag_off=1;
			}else{
				flag_on=1;
			}
		});
		
		if(flag_off==0&&flag_on==1){
			flag_opt=false;
			$('.credit_list_td3').removeClass('agreen_icon');
			$('.credit_list_td3').addClass('unagreen_icon');
		}else{
			flag_opt=true;
			$('.credit_list_td3').removeClass('unagreen_icon');
			$('.credit_list_td3').addClass('agreen_icon');
		}
		
		//$('.credit_list_td3').css('background','url(file:///D:/coreamp/htdocs/meng3/youqian/images/'+img_name+'.png) no-repeat right center');
		$('.checkbox_all').each(function(index, element) {
			 $(element).attr('checked',flag_opt);
		});
	});
		
		
	//删除按钮
	$('.delect_list a').click(function(){
		$('.checkbox_all').each(function(index, element) {
            if($(element).attr('checked')=="checked")
			{
				$(this).parents('.credit_list').remove();
				$('.credit_list').last().css('border','none');
				}
        });
	})
	
});

function init_height(){
	$('.main').each(function(){
		$(this).css('height',wh);
	});
}
