function WriteVoteList(vote_selector) {
	var html = "";
	var voted_list = [];
	$("#btn-lastpage").removeAttr("disabled");
	$("#btn-nextpage").removeAttr("disabled");
	$("#vote-list-01").empty();
	$("#vote-list-02").empty();
	if(typeof(vote_list) == "undefined"){
		html += "<div class=\"weui-msg\">";
		html += "<div class=\"weui-msg__icon-area\"><i class=\"weui-icon-warn weui-icon_msg\"></i></div>";
		html += "<div class=\"weui-msg__text-area\">";
		html += "<h2 class=\"weui-msg__title\">加载失败</h2>";
		html += "<p class=\"weui-msg__desc\">加载投票列表失败，请刷新页面</p>";
		html += "</div>";
		html += "<div class=\"weui-msg__opr-area\">";
		html += "<p class=\"weui-btn-area\">";
		html += "<a href=\"javascript:location.reload(true);\" class=\"weui-btn weui-btn_primary\">刷新</a>";
		html += "</p>";
		html += "</div>";
		html += "</div>";
		$("#btn-lastpage").attr("disabled", "disabled");
		$("#btn-nextpage").attr("disabled", "disabled");
	}else if(vote_list.length == 0) {
		html += "<div class=\"weui-msg\">";
		html += "<div class=\"weui-msg__icon-area\"><i class=\"weui-icon-warn weui-icon_msg-parimary\"></i></div>";
		html += "<div class=\"weui-msg__text-area\">";
		html += "<h2 class=\"weui-msg__title\">提示</h2>";
		html += "<p class=\"weui-msg__desc\">当前地区可投票列表为空</p>";
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
		for(i in vote_list){
			var item = "";
			if(i % 2 == 0) {
				item += "<div class=\"weui-row weui-no-gutter\">";
			}
			
			item += "<div class=\"weui-col-50\">";
			item += "<div class=\"weuix-vote\" id=\"vote-" + vote_list[i].agentId + "\">";
			item += "<a href=\"javascript:;\">";
			item += "<div class=\"weuix-vote_img\">";
			item += "<img src=\"" + vote_list[i].headimgurl + "\">";
			item += "</div>";
			item += "</a>";
			item += "<a href=\"javascript:;\"><h5 class=\"weuix-vote_title\">" + vote_list[i].agentName + "</h5></a>";
			item += "<div class=\"weui-flex\">";
			item += "<div class=\"weui-flex__item no-wrap-hidden\">";
			item += "<p class=\"weuix-vote_text\">" + vote_list[i].agentAddr + "</p>";
			item += "</div>";
			item += "<div>";
			item += "<p class=\"weuix-vote_text\" id=\"vcount-" + vote_list[i].agentId + "\">" + vote_list[i].agentVotes + " 票</p>";
			item += "</div>";
			item += "</div>";
			var button_text = "投票";
			if(vote_list[i].isVoted) {
				voted_list.push(vote_list[i].agentId);
				button_text = "已投票";
			}
			item += "<button class=\"weui-btn weuix-btn_vote weui-btn_primary\" id=\"btn-vote-" + vote_list[i].agentId + "\" onclick=\"DoVote('" + vote_list[i].agentId + "')\">" + button_text + "</button>";
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
	$("#" + vote_selector).html(html);
	for(i in voted_list){
		$("#btn-vote-" + voted_list[i]).attr("disabled", "disabled");
	}
}

function LoadVoteList(pn, ps){
	var post_data = {
		"pn": pn,
		"ps": ps,
		"type": district_type,
		"district": district
	};
	$.ajax({
        type: "POST",
		url: "http://" + window.location.host +"/Eclipse/P20170710/vote-list.json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(post_data),
        dataType: "json",
        success: function (data) {
        	if(data.error_code != 0){
				$.alert(data.error_msg, "提示");
				return;
        	}
        	$("#vote-district").attr("value", data.info.districtName || "");
        	$("#vote-district").attr("data-values", data.info.district || "");
        	vote_list = data.list;
        	current_page = data.current_page;
        	last_page = data.last_page;
        	if(district_type == 1) {
	        	WriteVoteList("vote-list-01");
        	}else{
        		WriteVoteList("vote-list-02");
        	}
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
    });
}

function DoVote(agent_id) {
	$("#btn-vote-" + agent_id).attr("disabled", "disabled");
	var post_data = {
		"agentId": agent_id
	};
	$.ajax({
        type: "POST",
		url: "http://" + window.location.host +"/Eclipse/P20170710/vote-result.json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(post_data),
        dataType: "json",
        success: function (data) {
        	if(data.error_code == 0){
				$.toast("成功投票");
				$("#vcount-" + agent_id).html(data.agentVotes + " 票");
				$("#btn-vote-" + agent_id).html("已投票");
        	}else if(data.error_code == 1){
				$.toast(data.error_msg);
				$("#btn-vote-" + agent_id).html("已投票");
        	}else{
				$.toast(data.error_msg);
				$("#btn-vote-" + agent_id).removeAttr("disabled");
        	}
        },
        error: function (data) {
			$.alert("提交失败", "提示");
			return;
        }
    });
}


function LastPage(){
	if(current_page == 1){
		return;
	}
	LoadVoteList(current_page - 1, page_size);
}

function NextPage(){
	if(current_page == last_page){
		return;
	}
	LoadVoteList(current_page + 1, page_size);
}