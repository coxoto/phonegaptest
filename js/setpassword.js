// JavaScript Document
$(document).ready(function(){
	init_height();
	password();
	panduan();
	del();
});

function init_height(){
	$('.main').each(function(){
		$(this).css('height',wh);
	});
	
	//设置密码输入框距离顶部的高度
	var keyboardH=$('.num_keyboard').height();
	var marginT=(wh-keyboardH-310)/2;
	$('.setpsw_div').css('margin-top',marginT);
}

function password(){
	$('.num').bind('click',function(){
		var val1 = $("input[name='tran_pass']").val().length;
		var val2 = $("input[name='tran_pass_s']").val().length;
		if($('.setpsw_div_1').css('display')=='block'){
			//alert(val1);
			//alert($("input[name='tran_pass']").val());
			if(val1<6){	
				var val_1=$("input[name='tran_pass']").val();
				var num=$(this).attr('data-value');
				$("input[name='tran_pass']").val(val_1+num);
				$('.inputpsw_div_1').append("<div class='bit1'></div>");
				if(val1==5){
					$('.true_psw_1').css('background','#00a2ff');
					//alert($("input[name='tran_pass']").val());
				}
			} 
		}
		if($('.setpsw_div_2').css('display')=='block'){
			//alert(val1);
			//alert($("input[name='tran_pass']").val());
			if(val2<6){	
				var val_2=$("input[name='tran_pass_s']").val();
				var num=$(this).attr('data-value');
				$("input[name='tran_pass_s']").val(val_2+num);
				$('.inputpsw_div_2').append("<div class='bit2'></div>");
				if(val2==5){
					$('.true_psw_2').css('background','#00a2ff');
					//alert($("input[name='tran_pass_s']").val());
				}
			} 
		}
	});
}
	
	
function del(){
	$('.delete').click(function(){
		if($('.setpsw_div_1').css('display')=='block'){
			var val_1 = $("input[name='tran_pass']").val();
			var s = val_1.substr(0,val_1.length-1);
			$("input[name='tran_pass']").val(s);
			$('.inputpsw_div_1 .bit1').last().remove();
			if(val_1!=5){
				$('.true_psw_1').css('background','#d8d8d8');
				}
		}
		if($('.setpsw_div_2').css('display')=='block'){
			var val_2 = $("input[name='tran_pass_s']").val();
			var s = val_2.substr(0,val_2.length-1);
			$("input[name='tran_pass_s']").val(s);
			$('.inputpsw_div_2 .bit2').last().remove();
			if(val_1!=5){
				$('.true_psw_2').css('background','#d8d8d8');
				}
			}
	})
}

function panduan(){
	$('.true_psw_1').click(function(){
		if($("input[name='tran_pass']").val().length==6){
			$('.setpsw_div_1').css('display','none');
			$('.setpsw_div_2').css('display','block');
			}
		else{
			//alert("请输入6位密码！");
			}
		})
	$('.true_psw_2').click(function(){
		if($("input[name='tran_pass_s']").val().length==6){
			var val_f=$("input[name='tran_pass']").val();
			var val_r=$("input[name='tran_pass_s']").val();
			if(val_f==val_r){
				alert("密码设置成功");
				}
			else{
				alert("两次密码输入不一致,请重新设置密码");
				$('.setpsw_div_1').css('display','block');
				$('.setpsw_div_2').css('display','none');
				$('.inputpsw_div ').html('');
				$('.true_psw').css('background','#d8d8d8');
				$("input[name='tran_pass']").val('');
				$("input[name='tran_pass_s']").val('');
				}
		}
		else{
			
			}
		})
	}