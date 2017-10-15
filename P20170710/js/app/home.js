function LoadInvitedList(pn, ps){
	var post_data = {
		"pn": pn,
		"ps": ps
	};
	$.ajax({
        type: "POST",
		url: "http://localhost/Eclipse/P20170710/home-invited-list.json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(post_data),
        dataType: "json",
        success: function (data) {
        	if(data.error_code != 0){
				$.alert(data.error_msg, "提示");
				return;
        	}
        	agents = data.agents;
        	current_page = data.current_page;
        	last_page = data.last_page;
        	WriteInvitedList();
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
    });
}

function WriteInvitedList(){
	var html = "";
	$("#btn-lastpage").removeAttr("disabled");
	$("#btn-nextpage").removeAttr("disabled");
	if(agents.length == 0){
		html += "<div class=\"weui-msg\">";
		html += "<div class=\"weui-msg__icon-area\"><i class=\"weui-icon-warn weui-icon_msg-primary\"></i></div>";
		html += "<div class=\"weui-msg__text-area\">";
		html += "<h2 class=\"weui-msg__title\">您的推荐列表为空</h2>";
		html += "</div>";
		html += "</div>";
		$("#btn-lastpage").attr("disabled", "disabled");
		$("#btn-nextpage").attr("disabled", "disabled");
	}else{
		for(i in agents){
			var item = "<div class=\"weui-form-preview__item\">";
			item += "<p>" + agents[i].agentName + "(" + agents[i].agentId + ")" + "</p>";
			item += "</div>";
			html += item;
		}
		if(current_page == 1){
			$("#btn-lastpage").attr("disabled", "disabled");
		}
		if(current_page == last_page){
			$("#btn-nextpage").attr("disabled", "disabled");
		}
	}
	$("#invited-list").html(html);
}

function LoadUserInfo(){
	$.ajax({
        type: "GET",
		url: "http://localhost/Eclipse/P20170710/info.json",
        dataType: "json",
        success: function (data) {
        	if(data.error_code != 0){
				$.alert(data.error_msg, "提示");
				return;
        	}
        	var info = data.info;
        	$("#user-portrait img").attr("src", info.headimgurl);
        	$("#user-name").html("<h2>" + info.agentName + "(" + info.agentId + ")</h2>");
        	$("#user-rank").html(GetRankText(info.agentRank));
        	$("#user-addr").html(info.agentAddr);
        	$("#user-rcmd").html("推荐人：" + info.recommender + "(" + info.recommenderId + ")");
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
    });
}

function NextPage(){
	if(current_page == last_page){
		return;
	}
	LoadInvitedList(current_page + 1, 10);
}

function LastPage(){
	if(current_page == 1){
		return;
	}
	LoadInvitedList(current_page - 1, 10);
}