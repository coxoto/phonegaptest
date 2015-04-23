$(document).on("pageinit",function(){
	init_height();
	
	//checkbox初始化未选中
	$('.checkbox_all').each(function(index, element) {
        $(element).attr('checked',false);
    });
	
	$('.credit_list').last().css('border','none');
	
	$('.editor_btn').click(function(){
		$('.borrow_list_td1').css('width','77.35%');
		$('.borrow_list_td3').css('width','10.2%');
		$('.borrow_list_td3').addClass('unagreen_icon');
		$(this).css('display','none');
		$('.cancel_btn').css('display','block');
		$('.bottom_menu').css('display','none');
		$('.bottom_del').css('display','block');
		})
		
	$('.cancel_btn').click(function(){
		$('.borrow_list_td1').css('width','87.55%');
		$('.borrow_list_td2').css('width','12.45%');
		$('.borrow_list_td3').css('width','0%');
		$(this).css('display','none');
		$('.editor_btn').css('display','block');
		$('.bottom_menu').css('display','block');
		$('.bottom_del').css('display','none');
		//$('.borrow_list_td3').css('background','url(file:///D:/coreamp/htdocs/meng3/youqian/images/unagreen_icon.png) no-repeat right center');
		$('.borrow_list_td3').removeClass('agreen_icon');
		$('.borrow_list_td3').removeClass('unagreen_icon');
		$('.checkbox_all').each(function(index, element) {
             $(element).attr('checked',false);
        });
		})
	
	$('.borrow_list_td3').click(function(){
		
		var str=$(this).css('background-image');
		if(str.indexOf('unagreen')>0){
			$(this).removeClass('unagreen_icon');
			$(this).addClass('agreen_icon');
			$(this).children().find('.checkbox_all').attr('checked',true);
			}
		else{
			$(this).removeClass('agreen_icon');
			$(this).addClass('unagreen_icon');
			$(this).children().find('.checkbox_all').attr('checked',false);
			}
		})
		
	//全选按钮	
	$('.select_all a').click(function(){
		var flag_on = 0; 
		var flag_off = 0;
		var flag_opt = '';
		
		$('.checkbox_all').each(function(index, element) {
            var a = $(element).attr('checked');
			if(a != 'checked'){
				flag_off = 1;
			}else{
				flag_on = 1;
			}
        });
		if((flag_on == 1) && (flag_off == 0)){
			flag_opt = false;
			$('.borrow_list_td3').removeClass('agreen_icon');
			$('.borrow_list_td3').addClass('unagreen_icon');
		}else{
			flag_opt = true;
			$('.borrow_list_td3').removeClass('unagreen_icon');
			$('.borrow_list_td3').addClass('agreen_icon');
		}
		//$('.borrow_list_td3').css('background','url(file:///D:/coreamp/htdocs/meng3/youqian/images/'+img_name+'.png) no-repeat right center');
		$('.checkbox_all').each(function(index, element) {
			 $(element).attr('checked',flag_opt);
		});
	})
		
		
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
