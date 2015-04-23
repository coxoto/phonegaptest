// JavaScript Document
$(document).ready(function(e){
    init_bind();
});

function init_bind(){
	$(".borrow_menu a").bind('click',function(){
		$(".br_m_now").removeClass();
		$(this).addClass('br_m_now');
		var aid = $(this).attr('id');
		var did = aid.replace('m_','');
		$('.br_list').css('display','none');
		$('.br_'+did).css('display','block');
	});
}
