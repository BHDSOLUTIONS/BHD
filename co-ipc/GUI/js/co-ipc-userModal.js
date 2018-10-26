//$("#userModal").on("hidden.bs.modal", setupUser_clearForm);

// -----------------------Click Events------------

$("#userModal_submit").click(function()	{
	userModal_queryUser($('#userModal_act').val());
	
    /*
    if ($("#userModal_act").val() == "ADD")
    {
        userModal_queryUser('add');
    } 
    else if ($("#userModal_act").val() == "UPDATE")
    {
        userModal_queryUser('upd');
    } 
    else if ($("#userModal_act").val() == "DELETE")
    {
        userModal_queryUser('del');
    } 
    else if ($("#userModal_act").val() == "LOCK")
    {
        userModal_queryUser('lck');
    } 
    else if ($("#userModal_act").val() == "UN-LOCK")
    {
        userModal_queryUser('unlck');
    }
    */
})


$("#userModal_clear").click(userModal_clearForm);


// -------------------Functions-------------------

function userModal_clearForm(){
    $("#userModal_result").text("");

    $("#userModal_user").val("");
    $("#userModal_stat").val("");
    $("#userModal_lastLogin").val("");
    $("#userModal_FN").val("");
    $("#userModal_LN").val("");
    $("#userModal_ssn").val("");
    $("#userModal_tel").val("");
    $("#userModal_email").val("");
    $("#userModal_title").val("");
    $("#userModal_group").val("");
}


function userModal_queryUser(action){
    
    $.post("./php/coQueryUser.php",
    {     
        act:	action,
        user:	$('#main_currentUser').text(),
        id:		$("#userModal_user_id").val(),
        uname:	$("#userModal_user").val(),
        stat:	$("#userModal_stat").val(),
        fname:	$("#userModal_FN").val(),
        lname:	$("#userModal_LN").val(),
        ssn:	$("#userModal_ssn").val(),
        tel:	$("#userModal_tel").val(),
        email:	$("#userModal_email").val(),
        title:	$("#userModal_title").val(),
        ugrp:	$("#userModal_group").val()
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail")
        {
            alert(obj['reason']);
        }
        else
        {
            if (obj['rows'].length == 0)
            {
                if (action == "query")
					alert("No record found");
            }
            else
            {
                setupUser_tableIndex=0;
                setupUser_table = obj['rows'];
                var len = setupUser_table.length; 
                setupUser_maxTableIndex = Math.ceil(len/100.0);
                setupUser_tableIndex++;
                setupUser_displayTable(setupUser_tableIndex);
                setupUser_clearForm();
                $('#userModal').modal('hide');
            }  
        } 
    });
}
