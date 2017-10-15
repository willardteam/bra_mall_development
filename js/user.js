function LoadUserInfo(){
	$.ajax({
        type: "GET",
		url: "/WechatProject/applicant/getpersonalinfo.action",
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


function GetRankText(agentRank){
	var texts = ["一级代理", "二级代理", "三级代理"];
	if(isNaN(agentRank)){
		return "";
	}
	if(agentRank > 3 || agentRank < 1){
		return "";
	}
	return texts[agentRank - 1];
}