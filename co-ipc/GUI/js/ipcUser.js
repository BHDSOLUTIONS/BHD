var user_tbl;
var user_tableIndex;
var user_maxTableIndex;


// ----------------------Click Events-----------------------------

$(document).on("click","#user_tbl tr",function() {
    var dataRow= $(this).children("td").map(function() {
        return $(this).text();
    }).get();

    //Populate the information 
    $("#userModal_id_num").val(dataRow[0]).change();
    $("#user_user_txt").val(dataRow[1]).change();
    $("#user_stat_sel").val(dataRow[2]).change();
     
    $("#user_title_txt").val(dataRow[3]).change();       
    $("#user_group_sel").val(dataRow[4]).change();  
    
    $("#user_tel").val(dataRow[5]).change();       
    $("#user_email").val(dataRow[6]).change();  
    
    $("#user_lastLogin_txt").val(dataRow[7]).change();       
    $("#user_FN_txt").val(dataRow[8]).change();       
    $("#user_LN_txt").val(dataRow[9]).change();       
    $("#user_ssn_txt").val(dataRow[10]).change();       
            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#user_findUser_btn").click(function() {
    userQuery("findUser");
})


$("#user_findNameSsn_btn").click(function() {
    userQuery("findNameSsn");
})


$("#user_findTelEmail_btn").click(function() {
    userQuery("findTelEmail");
})


$("#user_findTitleGrp_btn").click(function() {
    userQuery("findTitleGrp");
})


$("#user_next").click(function() {
    if (user_tableIndex<user_maxTableIndex) {
        user_tableIndex++;
        userDisplayTable(user_tableIndex);
    }  
})


$("#user_previous").click(function() {
    if (user_tableIndex>1) {
        user_tableIndex--;
        userDisplayTable(user_tableIndex);   
    }         
})


$("#user_clear_btn").click(userClearForm);


$(document).on('mouseup', '[id = user_act_sel]', function () {
    if ($("#user_act_sel").val() !="") {
        // $("#userCheckInfor").text("");

        if ($("#user_act_sel").val()  ==  "ADD") {
            userModalClearForm();
            $("#userModal_act_txt").val($("#user_act_sel").val());
            $("#userModal").modal();
        } 
        else {
            if (userCheckInfor()) {
                userModalClearForm();
                userPopulateModal();
                $("#userModal").modal();
            }
            else {
                alert("Missing user information!");
            }
        } 
        
    }
    
    // $("#user_act_sel").val("");
})

// -------------------Functions-------------------------------------

function userQuery(action) {
    
    $.post("./php/coQueryUser.php",
    {     
        act:	    action,
        user:	    $('#main_currentUser').text(),
        id:		    $("#userModal_id_num").val(),
        uname:	    $("#user_user_txt").val(),
        stat:	    $("#user_stat_sel").val(),
        lastlogin:	$("#user_lastLogin_txt").val(),
        fname:	    $("#user_FN_txt").val(),
        lname:	    $("#user_LN_txt").val(),
        ssn:	    $("#user_ssn_txt").val(),
        tel:	    $("#user_tel").val(),
        email:	    $("#user_email").val(),
        title:	    $("#user_title_txt").val(),
        ugrp:	    $("#user_group_sel").val()
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                alert("No record found");
            }
            else {
                user_tableIndex = 0;
                user_tbl = obj['rows'];
                var len = user_tbl.length; 
                user_maxTableIndex = Math.ceil(len/100.0);
                user_tableIndex++;
                userDisplayTable(user_tableIndex);
                
            }  
        } 
    });
}


function userDisplayTable(index) {   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = user_tbl.length;

    if (len >= startIndex) {
        if (len < stopIndex) {
            stopIndex=len;
        }            
        userClearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + user_tbl[i].id + '</td>')  
            a.push('<td style="width:20%">' + user_tbl[i].uname + '</td>');
            a.push('<td style="width:15%">' +  user_tbl[i].stat + '</td>');
            a.push('<td style="width:20%">' +  user_tbl[i].title + '</td>');
            a.push('<td style="width:20%">' +  user_tbl[i].ugrp + '</td>');
            a.push('<td style="width:25%">' +  user_tbl[i].tel + '</td>');
            a.push('<td style="display:none">' +  user_tbl[i].email + '</td>');
            a.push('<td style="display:none">' +  user_tbl[i].lastlogin + '</td>');
            a.push('<td style="display:none">' +  user_tbl[i].fname + '</td>');
            a.push('<td style="display:none">' +  user_tbl[i].lname + '</td>');
            a.push('<td style="display:none">' +  user_tbl[i].ssn + '</td></tr>');
        }
        document.getElementById("user_tbl").innerHTML = a.join("");
        $("#user_index_lbl").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function userClearForm() {
    $("#userModal_id_num").val("");
    $("#user_user_txt").val("");
    $("#user_stat_sel").val("");
    $("#user_lastLogin_txt").val("");
    $("#user_FN_txt").val("");
    $("#user_LN_txt").val("");
    $("#user_ssn_txt").val("");
    $("#user_tel").val("");
    $("#user_email").val("");
    $("#user_title_txt").val("");
    $("#user_group_sel").val("");
    $("#user_act_sel").val("");
}


function userClearTable() {
    $("#user_tbl").empty();
}


function userPopulateModal() {
    $("#userModal_user_txt").val($("#user_user_txt").val());
    $("#userModal_stat_txt").val($("#user_stat_sel").val());
    $("#userModal_lastLogin_time").val($("#user_lastLogin_txt").val());
    $("#userModal_FN_txt").val($("#user_FN_txt").val());
    $("#userModal_LN_txt").val($("#user_LN_txt").val());
    $("#userModal_ssn_txt").val($("#user_ssn_txt").val());
    $("#userModal_tel").val($("#user_tel").val());
    $("#userModal_email").val($("#user_email").val());
    $("#userModal_title_txt").val($("#user_title_txt").val());
    $("#userModal_group_sel").val($("#user_group_sel").val());

    $("#userModal_act_txt").val($("#user_act_sel").val());


}


function userCheckInfor() {
    if ($("#userModal_id_num").val() != "") {
        return true;
    }
    else {
        return false;
    }
}


