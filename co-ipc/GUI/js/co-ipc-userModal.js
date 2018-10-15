

$("#submitUserModal").click(function(){
    if($("#userActModal").val()=="ADD"){
        queryUserModal('add');
    } else if($("#userActModal").val()=="UPDATE"){
        queryUserModal('upd');
    } else if($("#userActModal").val()=="DELETE"){
        queryUserModal('del');
    }
})
function clearUserModalForm(){
    $("#resultUserModal").text("");

    // $("#user_id").val("");
    $("#userNameModal").val("");
    $("#userStatModal").val("");
    $("#userLastLoginModal").val("");
    $("#userFNModal").val("");
    $("#userLNModal").val("");
    $("#userSsnModal").val("");
    $("#userTelModal").val("");
    $("#userEmailModal").val("");
    $("#userTitleModal").val("");
    $("#userGroupModal").val("");
}

$("#clrUserModal").click(clearUserModalForm);


function queryUserModal(action){
    
    $.post("./php/coQueryUser.php",
    {     
        act:action,
        user:"ninh",
        id:$("#user_id").val(),
        uname:$("#userNameModal").val(),
        stat:$("#userStatModal").val(),
        lastlogin:$("#userLastLoginModal").val(),
        fname:$("#userFNModal").val(),
        lname:$("#userLNModal").val(),
        ssn:$("#userSsnModal").val(),
        tel:$("#userTelModal").val(),
        email:$("#userEmailModal").val(),
        title:$("#userTitleModal").val(),
        grp:$("#userGroupModal").val(),
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            $("#resultUserModal").text(obj['reason']);
        }else{
            if(obj['rows'].length==0){
                $("#resultUserModal").text("There is no matching data!");
            }
            else{
                userTableIndex=0;
                userArray = obj['rows'];
                var len = userArray.length; 
                maxUserTableIndex = Math.ceil(len/100.0);
                userTableIndex++;
                displayUser(userTableIndex);
                if(action=="add") $("#resultUserModal").text("User is added successfully!");
                 else if(action=="del") $("#resultUserModal").text("User is deleted successfully!");
                else if(action=="upd") $("#resultUserModal").text("User is updated successfully!");
            }  
        } 
    });
}