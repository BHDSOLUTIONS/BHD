

$("#userModal_submit").click(function(){
    if($("#userModal_act").val()=="ADD"){
        userModal_query('add');
    } else if($("#userModal_act").val()=="UPDATE"){
        userModal_query('upd');
    } else if($("#userModal_act").val()=="DELETE"){
        userModal_query('del');
    } else if($("#userModal_act").val()=="LOCK"){
        userModal_query('lck');
    } else if($("#userModal_act").val()=="UN-LOCK"){
        userModal_query('unlck');
    }
})
function userModal_clearForm(){
    $("#userModal_result").text("");

    // $("#user_id").val("");
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

$("#userModal_clear").click(userModal_clearForm);


function userModal_query(action){
    
    $.post("../php/coQueryUser.php",
    {     
        act:action,
        user:"ninh",
        id:$("#userModal_user_id").val(),
        uname:$("#userModal_user").val(),
        stat:$("#userModal_stat").val(),
        //lastlogin:$("#userModal_lastLogin").val(),
        fname:$("#userModal_FN").val(),
        lname:$("#userModal_LN").val(),
        ssn:$("#userModal_ssn").val(),
        tel:$("#userModal_tel").val(),
        email:$("#userModal_email").val(),
        title:$("#userModal_title").val(),
        grp:$("#userModal_group").val(),
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            alert(obj['reason']);
        }else{
            if(obj['rows'].length==0){
                alert("There is no matching data!");
            }
            else{
                setupUser_tableIndex=0;
                setupUser_table = obj['rows'];
                var len = setupUser_table.length; 
                setupUser_maxTableIndex = Math.ceil(len/100.0);
                setupUser_tableIndex++;
                setupUser_displayTable(setupUser_tableIndex);
                if(action=="add") $("#userModal_result").text("User is added successfully!");
                else if(action=="del") $("#userModal_result").text("User is deleted successfully!");
                else if(action=="upd") $("#userModal_result").text("User is updated successfully!");
                else if(action=="lck") $("#userModal_result").text("User is locked successfully!");
                else if(action=="unlck") $("#userModal_result").text("User is unlocked successfully!");
            }  
        } 
    });
}