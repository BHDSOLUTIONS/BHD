$("#userModal").on("hidden.bs.modal", userClearForm);

// -----------------------Click Events------------

$("#userModal_submit_btn").click(function()	{
	userModalQuery($('#userModal_act_txt').val());
	
})


$("#userModal_clear_btn").click(userModalClearForm);


// -------------------Functions-------------------

function userModalClearForm() {
    $("#userModal_result_lbl").text("");

    $("#userModal_user_txt").val("");
    $("#userModal_stat_txt").val("");
    $("#userModal_lastLogin_time").val("");
    $("#userModal_FN_txt").val("");
    $("#userModal_LN_txt").val("");
    $("#userModal_ssn_txt").val("");
    $("#userModal_tel").val("");
    $("#userModal_email").val("");
    $("#userModal_title_txt").val("");
    $("#userModal_group_sel").val("");
}


function userModalQuery(action) {
    
    $.post("./php/coQueryUser.php",
    {     
        act:	action,
        user:	$('#main_currentUser').text(),
        id:		$("#userModal_id_num").val(),
        uname:	$("#userModal_user_txt").val(),
        stat:	$("#userModal_stat_txt").val(),
        fname:	$("#userModal_FN_txt").val(),
        lname:	$("#userModal_LN_txt").val(),
        ssn:	$("#userModal_ssn_txt").val(),
        tel:	$("#userModal_tel").val(),
        email:	$("#userModal_email").val(),
        title:	$("#userModal_title_txt").val(),
        ugrp:	$("#userModal_group_sel").val()
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                if (action == "query") {
                    alert("No record found");
                }
            }
            else {
                user_tableIndex=0;
                user_tbl = obj['rows'];
                var len = user_tbl.length; 
                user_maxTableIndex = Math.ceil(len/100.0);
                user_tableIndex++;
                userDisplayTable(user_tableIndex);
                $("#userModal_result_lbl").text("success");
                
            }  
        } 
    });
}
