// JavaScript Document
var cont_list;
var cred_list;
var show_flag = 1;
var d_cid = 0;
var creditinfo = {
	ContactList:'',
	CreditList:'',
	charlist:Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'),
	credit_money:Array('0','500','2000','5000','10000','30000'),
	InitInfo:function(){	// 初始化数据
		if(parseInt(userinfo.uid) <= 0){
			window.location.href = "login.html";
		}
		$.ajax({
			url: WWW_URL+'/creditindex',
			type: 'post',
			dataType: 'jsonp',
			jsonp: 'qianCallback',
			async: false,
			data: {mobileuid:userinfo.uid},
			success:function(data){
				cont_list = data.contacts;
				cred_list = data.friends;
				if(show_flag == 1){
					creditinfo.ShowContacts();
					show_flag = 0;
				}
			},
		});
	},
	// 调整授信额度按钮位置
	UpdatePos:function(a_num){
		$(".btn_now").removeClass('btn_now');
		$(".money_select").removeClass('money_select');
		$("#m_text_"+a_num).addClass('money_select');
		$("#m_btn_"+a_num).addClass('btn_now');
		var line_length = a_num * 101;
		$(".line_up").animate({width:line_length+"px"},300);
		$(".btn_over").each(function(index, element){
	       $(this).removeClass('btn_over'); 
    	});
		for(var i=0; i<a_num;i++){
			$("#m_btn_"+i).addClass('btn_over');
		}
	},
	ShowContacts:function(){		// 显示通讯录列表
		this.ShowLastList(cont_list);
	},
	ShowFriends:function(){		// 显示已授信列表
		this.ShowLastList(cred_list);
	},
	ShowLastList:function(lastlist){	// 显示最终列表
		var list_html = '';
		var charval = '';
		var is_first = 1;
		$.each(lastlist, function(index,val){
			var f_char = val.firstchar.toUpperCase();
			var credit_val = parseInt(val.amount)?'￥'+parseInt(val.amount):'未授信';
			if(charval != f_char){
				charval = f_char;
				if(is_first != 1){
					list_html += '</table>';
				}else{
					is_first = 0;
				}
				list_html +=  '<div class="char_border"><div class="c_f_char" id="char_0"><span>'+f_char+'</span></div></div>';
				list_html +=  '<table cellpadding="0" cellspacing="0" class="c_f_tab c_f_tab_a">';
				list_html +=  '<tr>';
                list_html +=  '<td class="c_f_name c_f_first");" onClick="showdetailpage(\''+val.id+'\');">'+val.truename+'</td>';
                list_html +=  '<td class="c_f_info c_f_first" onClick="showdetailpage(\''+val.id+'\');"><span id="show_cid_'+val.id+'">'+credit_val+'</span><input id="cd_money_'+val.id+'" type="hidden" value="'+parseInt(val.amount)+'" /></td>';
                list_html +=  '<td class="c_f_opt c_f_first"><div class="adjust_btn">调整</div><input type="hidden" class="c_id" value="'+val.id+'"></td>';
                list_html +=  '</tr>';
			}else{
				list_html +=  '<tr>';
                list_html +=  '<td class="c_f_name c_f_first" onClick="showdetailpage(\''+val.id+'\');">'+val.truename+'</td>';
                list_html +=  '<td class="c_f_info c_f_first" onClick="showdetailpage(\''+val.id+'\');"><span id="show_cid_'+val.id+'">'+credit_val+'</span><input id="cd_money_'+val.id+'" type="hidden" value="'+parseInt(val.amount)+'" /></td>';
                list_html +=  '<td class="c_f_opt c_f_first"><div class="adjust_btn">调整</div><input type="hidden" class="c_id" value="'+val.id+'"></td>';
                list_html +=  '</tr>';
			}
		});
		if(is_first == 0){
			list_html += '</table>';
		}
		$(".c_f_list").html(list_html);
		this.BindEvent();
	},
	UpdateCharPos:function(){
		var bh = $(window).scrollTop();
		var th = $(".c_top").innerHeight();	// 顶部高度
		$(".char_border").each(function(index, element){
			var ch = $(this).offset().top;		// 字母框距离顶部的高度
			var pv = ch-bh;		// 字母框当前的位置差
			var p_out = th+38;	// 超过这个高度，停止浮动
			var p_hid = pv-38;	// 低于th这个高度，部分显示
			
			if(pv<th){
				$(this).find('.c_f_char').css('position','fixed');
				$(this).find('.c_f_char').css('top',th+'px');
			}else if(pv>p_out){
				$(this).find('.c_f_char').css('position','inherit');
				$(this).find('.c_f_char').css('top','');
			}else if(pv>th){
				var cid = $(this).find('.c_f_char').attr('id');
				cid = cid.replace('char_','');
				p_cid = cid -1;
				if(cid>0){
					$(this).find('.c_f_char').css('position','fixed');
					$(this).find('.c_f_char').css('top',pv+'px');
					$("#char_"+p_cid).css('top',p_hid+'px');
				}
			}else{
				
			}
		});
	},
	DoCredit:function(){	// 授信
		var c_cid = $('#u_cid').val();
		var c_num = $(".c_m_btn .btn_now").attr('id');
		c_num = c_num.replace('m_btn_','');
		var c_money = this.credit_money[c_num];
		
		$.ajax({
			url: InterfaceList.U_Domain+InterfaceList.U_DoCredit,
			type: 'post',
			dataType: 'jsonp',
			jsonp: 'qianCallback',
			async: false,
			data: {mobileuid:userinfo.uid,contact_id:c_cid,amount:c_money},
			success:function(data){
				if(data.status == '1'){
					if(c_num == 0){
						var m_text = "未授信";
					}else{
						var m_text = "￥"+c_money;
					}
					$("#show_cid_"+c_cid).html(m_text);
					$("#cd_money_"+c_cid).val(c_money);
					
					creditinfo.HidCreditform();
					creditinfo.InitInfo();
				}else{
					alert("请重新提交或联系管理员");
				}
			}
		});		
	},
	HidCreditform:function(){
		$('.adjust_box').animate({bottom:-434},300);
		$('.credit_body').removeClass('blur');
		$('.site_top').removeClass('blur');
	},
	BindEvent:function(){	// 绑定通讯录列表位置及调整授信金额事件
		charFloat();
		changePos();
		adjust();
		adjust_quota();
	}
}

$(document).ready(function(e){
    searchAct();
	creditinfo.BindEvent();
	charlistPos();
	creditinfo.InitInfo();
	change_credit();
});

function searchAct(){
	var sp = 600;
	$(".cs_border").bind('click',function(){
		var input_w = $(".cs_border").width();
		if(input_w > 110){
			input_w = input_w - 58;
		}else{
			input_w = 52;
		}
		$(".cs_input").animate({left:"55px"},sp,function(){
			$('.cs_input').css('width',input_w+"px");
		});
		$('.bg_search').css('display','block');
		$('.cs_input').focus();
		
		$(".site_top").animate({marginTop:"-128px"},sp);
		$(".c_top").animate({paddingTop:"40px"},sp);
		$(".credit_body").animate({paddingTop:"115px"},sp);
		
		$(".c_f_char").animate({top:"115px"},sp);		// 同步通讯录字母位置
	});
	
	$(".bg_search").bind('click',function(){
		$('.cs_input').css('width',"52px");
		$(".cs_input").animate({left:"50%"},sp);
		$(this).css('display','none');
		
		$(".site_top").animate({marginTop:"0px"},sp);
		$(".c_top").animate({paddingTop:"128px"},sp);
		$(".credit_body").animate({paddingTop:"203px"},sp);
		
		$(".c_f_char").animate({top:"203px"},sp);		// 同步通讯录字母位置
	});
}

function charFloat(){
	$(window).scroll(function(){
		creditinfo.UpdateCharPos();
	});
}



function charlistPos(){		// 侧边栏字母列表定位
	if(wh>896){
		var pval = (wh-896)/2 + 203;
	}else{
		var pval = 203;
	}
	$(".charlist").css('top',pval+'px');
}

function changePos(){	// 侧边栏绑定定位
	$(".charlist a").bind('click',function(){
		var aid = $(this).attr('id');
		aid = aid.replace('btn_','');
		var ch = $("#char_"+aid).parent('.char_border').offset().top;
		$(window).scrollTop(ch-203);
		creditinfo.UpdateCharPos();
	});
}

//调整按钮
function adjust(){
	$('.st_share').toggle(function(){
		$('.adjust_btn').css('display','inline-table');
		$('.c_f_opt').css('width','90px');
		$('.c_f_opt').css('padding-right','10px');
	},function(){
		$('.adjust_btn').css('display','none');
		$('.c_f_opt').css('width','');
		$('.c_f_opt').css('padding-right','');
	})
}

//调整授信额度
function adjust_quota(){
	$('.adjust_btn').click(function(){
		$('.adjust_box').animate({bottom:0},300);
		var moneylist = new Array();
		moneylist['0'] = 0;moneylist['500'] = 1; moneylist['2000'] = 2; moneylist['5000'] = 3; moneylist['10000'] = 4; moneylist['30000'] = 5;
		var credit_name=$(this).parents('tr').find('.c_f_name').html();
		var credit_step=$(this).parents('tr').find('.c_f_info input').val();
		var credit_cid =$(this).parents('tr').find('.c_id').val();
		creditinfo.UpdatePos(moneylist[credit_step]);

		$('.credit_body').addClass('blur');
		$('.site_top').addClass('blur');
		$('.credit_name').html(credit_name);
		$('#u_cid').attr('value',credit_cid);
	});
	
	$('.adjust_close').click(function(){
		creditinfo.HidCreditform();
	});
	
	$(".c_m_btn a").click(function(){
		var a_id = $(this).attr('id');
		var on_id = $(".btn_now").attr('id');
		if(a_id != on_id){
			var a_num = a_id.replace('m_btn_','');
			creditinfo.UpdatePos(a_num);
		}
	});
}

// 页面顶部按钮切换
function change_credit(){
	$('.st_title a').click(function(){
		$('.st_title a').removeClass('st_menu_now');
		$(this).addClass('st_menu_now');
	})
	
}

function showdetailpage(cid){
	d_cid = cid;
	changepage('personal_credit.html?cid='+cid,'slide','');
}