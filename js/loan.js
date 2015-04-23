// JavaScript Document
$(document).ready(function(){
	var wh = window.innerHeight;
	var show_h = (wh - 138)/2;
	var t_pos = show_h +40-34;
	var min_h = show_h-256;
	if(min_h<0){
		var t_btn_pos = 5;
	}else if(min_h<68){
		var t_btn_pos = show_h-256;
	}else{
		var t_btn_pos = (show_h-256)/2+40;
	}
	
	var b_pos = show_h + 98;
	var b_pos_end = show_h + 40;
	var b_btn_pos = (show_h-256)/2
	
	$(".loan_top_div").css('top','-'+t_pos+'px');
	$(".loan_top_div").css('height',t_pos+'px');
	$(".loan_top").css('paddingTop',t_btn_pos+'px');
	$(".loan_top_div").css('display','block');
	$(".loan_bottom_div").css('top',wh+'px');
	$(".loan_bottom_div").css('display','block');

	$('.loan_top_div').animate({top:0},350,function(){
		$('.loan_top').animate({paddingTop:t_btn_pos+15},80,function(){
			$('.loan_top').animate({paddingTop:t_btn_pos},100);
		});
	});
	
	$('.loan_bottom').css('marginTop',b_btn_pos+'px');
	$('.loan_bottom_div').animate({top:b_pos_end},350,function(){
		$('.loan_bottom').animate({marginTop:b_btn_pos-15},80,function(){
			$('.loan_bottom').animate({marginTop:b_btn_pos},100);
		});
	});
});