function WriteProList() {
	var html = "";
	$("#btn-lastpage").removeAttr("disabled");
	$("#btn-nextpage").removeAttr("disabled");
	if(typeof(pro_list) == "undefined" || pro_list.length == 0){
		html += "<div class=\"weui-msg\">";
		html += "<div class=\"weui-msg__icon-area\"><i class=\"weui-icon-warn weui-icon_msg\"></i></div>";
		html += "<div class=\"weui-msg__text-area\">";
		html += "<h2 class=\"weui-msg__title\">加载失败</h2>";
		html += "<p class=\"weui-msg__desc\">加载产品列表失败，请刷新页面</p>";
		html += "</div>";
		html += "<div class=\"weui-msg__opr-area\">";
		html += "<p class=\"weui-btn-area\">";
		html += "<a href=\"javascript:location.reload(true);\" class=\"weui-btn weui-btn_primary\">刷新</a>";
		html += "</p>";
		html += "</div>";
		html += "</div>";
		$("#btn-lastpage").attr("disabled", "disabled");
		$("#btn-nextpage").attr("disabled", "disabled");
	}else{
		for(i in pro_list){
			var price = pro_list[i].goodsPrice / 100;
			var item = "";
			if(i % 2 == 0){
				item += "<div class=\"weui-row weui-no-gutter\">";
			}
			item += "<div class=\"weui-col-50\">";
			item += "<div class=\"ui-pro\" id=\"pro-" + pro_list[i].goodsId + "\">";
			item += "<div class=\"ui-pro_img\">";
			item += "<a href=\"" + pro_list[i].goodsPage + "\"><img src=\"" + pro_list[i].goodsPic + "\"></a>";
			item += "</div>";
			item += "<a href=\"" + pro_list[i].goodsPage + "\"><h5 class=\"ui-pro_name\">" + pro_list[i].goodsName + "</h5></a>";
			item += "<p class=\"ui-pro_price\">￥" + price + "</p>";
			item += "</div>";
			item += "</div>";
			if(i % 2 == 1){
				item += "</div>";
			}
			html += item;
		}
		if(current_page == 1){
			$("#btn-lastpage").attr("disabled", "disabled");
		}
		if(current_page == last_page){
			$("#btn-nextpage").attr("disabled", "disabled");
		}
	}
	$("#pro-list").html(html);
}

function LoadProList(pn, ps){
	var post_data = {
		"pn": pn,
		"ps": ps
	};
	$.ajax({
        type: "POST",
		url: "http://" + window.location.host +"/Eclipse/P20170710/product-list.json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(post_data),
        dataType: "json",
        success: function (data) {
        	if(data.error_code != 0){
				$.alert(data.error_msg, "提示");
				return;
        	}
        	pro_list = data.list;
        	current_page = data.current_page;
        	last_page = data.last_page;
        	WriteProList();
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
    });
}


function NextPage(){
	if(current_page >= last_page){
		return;
	}
	LoadProList(current_page + 1, 10);
}

function LastPage(){
	if(current_page <= 1){
		return;
	}
	LoadProList(current_page - 1, 10);
}