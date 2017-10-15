function LoadAppList(pn, ps){
	if(pn == pageData.apply.current_page && ps == pageData.apply.page_size && pageData.apply.list.length > 0) {
		return;
	}
	var post_data = {
		"pn": pn,
		"ps": ps
	};
	$.ajax({
        type: "POST",
		url: "http://" + window.location.host + "/Eclipse/P20170710/admin-applicant-list.json",//获取列表地址
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(post_data),
        dataType: "json",
        success: function (data) {
			if(data.error_code != 0){
				$.toast(data.error_msg, "cancel");
				return;
			}
			pageData.apply.list = data.data;
			pageData.apply.current_page = data.current_page;
			pageData.apply.last_page = data.last_page;
			WriteAppList();
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
    });
}

function LoadOdrList(pn, ps){
	if(pn == pageData.order.current_page && ps == pageData.order.page_size && pageData.order.list.length > 0) {
		return;
	}
	var post_data = {
		"pn": pn,
		"ps": ps
	};
	$.ajax({
        type: "POST",
		url: "http://" + window.location.host + "/Eclipse/P20170710/admin-order-list.json",//获取列表地址
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(post_data),
        dataType: "json",
        success: function (data) {
			if(data.error_code != 0){
				return;
			}
			pageData.order.list = data.list;
			pageData.order.current_page = data.current_page;
			pageData.order.last_page = data.last_page;
			WriteOdrList();
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
    });
}

function WriteAppList(){
	var html = "";
	$("#btn-lastpage").removeAttr("disabled");
	$("#btn-nextpage").removeAttr("disabled");
	$("#tab1").removeClass("weuix-wechat_bg");
	var app_list = pageData.apply.list;
	if(app_list.length == 0){
		html += "<div class=\"weui-msg\">";
		html += "<div class=\"weui-msg__icon-area\"><i class=\"weui-icon-warn weui-icon_msg-primary\"></i></div>";
		html += "<div class=\"weui-msg__text-area\">";
		html += "<h2 class=\"weui-msg__title\">当前申请的用户：无</h2>";
		html += "</div>";
		html += "</div>";
		$("#btn-lastpage").attr("disabled", "disabled");
		$("#btn-nextpage").attr("disabled", "disabled");
	}else{
		$("#tab1").addClass("weuix-wechat_bg");
		for(var i in app_list){
			var item = "<div class=\"weuix-shadow\" id=\"app-" + app_list[i].applyId + "\">";
			item += "<div class=\"weui-form-preview\">";
			item += "<div class=\"weui-form-preview__bd\">";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">姓名</label>";
			item += "<span class=\"weui-form-preview__value\">" + app_list[i].agentName + "</span>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">地址</label>";
			item += "<span class=\"weui-form-preview__value\">" + app_list[i].agentAddr + "</span>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">推荐人</label>";
			item += "<span class=\"weui-form-preview__value\">" + app_list[i].recommender +"</span>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">申请等级</label>";
			item += "<span class=\"weui-form-preview__value\"><input class=\"weui-input weuix-input-select\" id=\"rank-" + app_list[i].applyId +"\" type=\"text\" value=\"" + GetRankText(app_list[i].agentRank) + "\" data-values=\"" + app_list[i].agentRank + "\" readonly></span>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">手机号</label>";
			item += "<span class=\"weui-form-preview__value\">" + app_list[i].agentPhone +"</span>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">申请时间</label>";
			item += "<span class=\"weui-form-preview__value\">" + app_list[i].createTime +"</span>";
			item += "</div>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__ft\">";
			item += "<button type=\"submit\" class=\"weui-form-preview__btn weui-form-preview__btn_primary\" onclick=\"Access('" + app_list[i].applyId + "')\">同意</button>";
			item += "<button type=\"submit\" class=\"weui-form-preview__btn weui-form-preview__btn_default\" onclick=\"Reject('" + app_list[i].applyId + "')\">拒绝</button>";
			item += "</div>";
			item += "</div>";
			item += "</div>";
			html += item;
		}
		if(pageData.apply.current_page == 1){
			$("#btn-lastpage").attr("disabled", "disabled");
		}
		if(pageData.apply.current_page == pageData.apply.last_page){
			$("#btn-nextpage").attr("disabled", "disabled");
		}
	}
	$("#tab1").html(html);
	$("#tab1 input").select({
		title: "分配代理等级",
		items: [
			{
				"title": "一级代理",
				"value": "1"
			},
			{
				"title": "二级代理",
				"value": "2"
			},
			{
				"title": "三级代理",
				"value": "3"
			}
		]
	});
}

function WriteOdrList(){
	var html = "";
	$("#btn-lastpage").removeAttr("disabled");
	$("#btn-nextpage").removeAttr("disabled");
	$("#tab2").removeClass("weuix-wechat_bg");
	var odr_list = pageData.order.list;
	if(odr_list.length == 0){
		html += "<div class=\"weui-msg\">";
		html += "<div class=\"weui-msg__icon-area\"><i class=\"weui-icon-warn weui-icon_msg-primary\"></i></div>";
		html += "<div class=\"weui-msg__text-area\">";
		html += "<h2 class=\"weui-msg__title\">当前订单：无</h2>";
		html += "</div>";
		html += "</div>";
	}else{
		$("#tab2").addClass("weuix-wechat_bg");
		for(var i in odr_list){
			var item = "<div class=\"weuix-shadow\" id=\"odr-" + odr_list[i].orderId + "\">";
			item += "<div class=\"weui-form-preview\">";
			item += "<div class=\"weui-form-preview__hd\">";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">订货人</label>";
			item += "<em class=\"weui-form-preview__value\">" + odr_list[i].agentName + "(" + odr_list[i].agentId + ")" + "</em>";
			item += "</div>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__bd\">";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">地址</label>";
			item += "<span class=\"weui-form-preview__value\">" + odr_list[i].agentAddr + "</span>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">电话</label>";
			item += "<span class=\"weui-form-preview__value\">" + odr_list[i].agentPhone +"</span>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">订购产品</label>";
			item += "<span class=\"weui-form-preview__value\">" + odr_list[i].goodsName + "</span>";
			item += "</div>";
			item += "<div class=\"weui-form-preview__item\">";
			item += "<label class=\"weui-form-preview__label\">数量</label>";
			item += "<span class=\"weui-form-preview__value\">" + odr_list[i].orderNum +"</span>";
			item += "</div>";
			
			for(j in odr_list[i].goodsScale){
				item += "<div class=\"weui-form-preview__item\">";
				item += "<label class=\"weui-form-preview__label\">" + odr_list[i].goodsScale[j].scaleType + "</label>";
				item += "<span class=\"weui-form-preview__value\">" + odr_list[i].goodsScale[j].scaleName +"</span>";
				item += "</div>";
			}
			
			item += "</div>";
			item += "<div class=\"weui-form-preview__ft\">";
			item += "<button type=\"submit\" class=\"weui-form-preview__btn weui-form-preview__btn_primary\" onclick=\"DoAction('" + odr_list[i].orderId + "', 1)\">已处理</button>";
			item += "<button type=\"submit\" class=\"weui-form-preview__btn weui-form-preview__btn_default\" onclick=\"DoAction('" + odr_list[i].orderId + "', 0)\">已忽略</button>";
			item += "</div>";
			item += "</div>";
			item += "</div>";
			html += item;
		}
		if(pageData.order.current_page == 1){
			$("#btn-lastpage").attr("disabled", "disabled");
		}
		if(pageData.order.current_page == pageData.order.last_page){
			$("#btn-nextpage").attr("disabled", "disabled");
		}
	}
	$("#tab2").html(html);
}

function Access(applyId){
	var post_data = {
		"applyId": applyId,
		"action": "access",
		"agentRank": $("#rank-" + applyId).attr("data-values")
	};
	_action(post_data);
}

function Reject(applyId){
	var post_data = {
		"applyId": applyId,
		"action": "reject"
	};
	_action(post_data);
}

function _action(post_data){
	$.ajax({
        type: "POST",
		url: "http://" + window.location.host + "/Eclipse/P20170710/admin-applicant-result.json",//操作地址
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(post_data),
        dataType: "json",
        success: function (data) {
			if(data.error_code != 0){
				$.alert(data.error_msg, "错误");
				return;
			}
			$.toast("成功");
			$("#app-" + post_data.applyId).remove();
			if($("#tab1").html().length == 0){
				$("#tab1").removeClass("weuix-wechat_bg");
				var html = "<div class=\"weui-msg\">";
				html += "<div class=\"weui-msg__icon-area\"><i class=\"weui-icon-warn weui-icon_msg-primary\"></i></div>";
				html += "<div class=\"weui-msg__text-area\">";
				html += "<h2 class=\"weui-msg__title\">当前申请的用户：无</h2>";
				html += "</div>";
				html += "</div>";
				$("#tab1").html(html);
				return;
			}
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
	});
}


function DoAction(order_id, action) {
	var post_data = {
		"orderId": order_id,
		"action": action
	};
	$.ajax({
        type: "POST",
		url: "http://" + window.location.host + "/Eclipse/P20170710/admin-order-result.json",//操作地址
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(post_data),
        dataType: "json",
        success: function (data) {
			if(data.error_code != 0){
				$.alert(data.error_msg, "错误");
				return;
			}
			$.toast("成功");
			$("#odr-" + post_data.orderId).remove();
			if($("#tab2").html().length == 0){
				$("#tab2").removeClass("weuix-wechat_bg");
				var html = "<div class=\"weui-msg\">";
				html += "<div class=\"weui-msg__icon-area\"><i class=\"weui-icon-warn weui-icon_msg-primary\"></i></div>";
				html += "<div class=\"weui-msg__text-area\">";
				html += "<h2 class=\"weui-msg__title\">当前订单：无</h2>";
				html += "</div>";
				html += "</div>";
				$("#tab2").html(html);
			}
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
	});
}

function LastPage(){
	switch(pageData.active) {
	case "#tab2":
		if(pageData.order.current_page <= 1){
			return;
		}
		LoadOdrList(pageData.order.current_page - 1, pageData.order.page_size);
		break;
	default:
		if(pageData.apply.current_page <= 1){
			return;
		}
		LoadAppList(pageData.apply.current_page - 1, pageData.apply.page_size);
	}
}

function NextPage(){
	switch(pageData.active) {
	case "#tab2":
		if(pageData.order.current_page >= pageData.order.last_page){
			return;
		}
		LoadOdrList(pageData.order.current_page + 1, pageData.order.page_size);
		break;
	default:
		if(pageData.apply.current_page >= pageData.apply.last_page){
			return;
		}
		LoadAppList(pageData.apply.current_page + 1, pageData.apply.page_size);
	}
}