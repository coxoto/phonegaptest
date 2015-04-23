// JavaScript Document
$(document).ready(function(){
	$('.agreen_img').toggle(function(){
		$('.agreen_img').removeClass('unagreen_icon');
		$('.agreen_img').addClass('agreen_icon');
		},function(){
		$('.agreen_img').removeClass('agreen_icon');
		$('.agreen_img').addClass('unagreen_icon');
		})
	
	$('.selectblank_table').click(
		function(){
			if($('.bank_box').css('display')=='block'){
				$('.bank_box').css('display','none');
			}
			else
			{
				$('.bank_box').css('display','block');
				}
		}
	)
	
	$('.bank_td').click(function(){
		var select_bank=$(this).children('.hide_blank').html();
		$('.selectblank_table span').html(select_bank);
		$('.bank_box').css('display','none');
		})
});


