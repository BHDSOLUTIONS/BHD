

var userArray;
var userTableIndex;
var maxUserTableIndex;


function clearUserTable() {
    $("#tableUser").empty();
}
$(document).on("click","#tableUser tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#user_id").val(dataRow[0]).change();
    $("#userName").val(dataRow[1]).change();
    $("#userStat").val(dataRow[2]).change();
    $("#userLastLogin").val(dataRow[7]).change();       
    $("#userFN").val(dataRow[8]).change();       
    $("#userLN").val(dataRow[9]).change();       
    $("#userSsn").val(dataRow[10]).change();       
    $("#userTel").val(dataRow[3]).change();       
    $("#userEmail").val(dataRow[4]).change();       
    $("#userTitle").val(dataRow[5]).change();       
    $("#userGroup").val(dataRow[6]).change();       
       
    //Add color to the row       
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of        the rows  
});




function queryUser(action){
    
    $.post("./php/coQueryUser.php",
    {     
        act:action,
        user:"ninh",
        id:$("#user_id").val(),
        uname:$("#userName").val(),
        stat:$("#userStat").val(),
        lastlogin:$("#userLastLogin").val(),
        fname:$("#userFN").val(),
        lname:$("#userLN").val(),
        ssn:$("#userSsn").val(),
        tel:$("#userTel").val(),
        email:$("#userEmail").val(),
        title:$("#userTitle").val(),
        grp:$("#userGroup").val(),
        
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
                userTableIndex=0;
                userArray = obj['rows'];
                var len = userArray.length; 
                maxUserTableIndex = Math.ceil(len/100.0);
                userTableIndex++;
                displayUser(userTableIndex);
                if(action=="add") alert("User is added successfully!");
                // else if(action=="del") alert("User is deleted successfully!");
                else if(action=="upd") alert("User is updated successfully!");
            }  
        } 
    });
}
function displayUser(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = userArray.length;

    if(len>=startIndex){
        if(len < stopIndex)
            stopIndex=len;            
        clearUserTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) {  
            a.push('<tr> <td style="display:none">' + userArray[i].id + '</td>')  
            a.push('<td style="width:20%">' + userArray[i].uname + '</td>');
            a.push('<td style="width:10%">' +  userArray[i].stat + '</td>');
            a.push('<td style="width:10%">' +  userArray[i].tel + '</td>');
            a.push('<td style="width:20%">' +  userArray[i].email + '</td>');
            a.push('<td style="width:20%">' +  userArray[i].title + '</td>');
            a.push('<td style="width:20%">' +  userArray[i].grp + '</td>');
            a.push('<td style="display:none">' +  userArray[i].lastlogin + '</td>');
            a.push('<td style="display:none">' +  userArray[i].fname + '</td>');
            a.push('<td style="display:none">' +  userArray[i].lname + '</td>');
            a.push('<td style="display:none">' +  userArray[i].ssn + '</td></tr>');
        }
        document.getElementById("tableUser").innerHTML = a.join("");
        $("#indexUser").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}

$("#nextUser").click(function(){
    if(userTableIndex<maxUserTableIndex){
        userTableIndex++;
        displayUser(userTableIndex);
    }  
})

$("#previousUser").click(function(){
    if(userTableIndex>1){
        userTableIndex--;
        displayUser(userTableIndex);   
    }         
})

$("#findUser1").click(function(){
    queryUser('query');
});

$("#clrUser").click(clearUserForm);

function clearUserForm(){
    $("#user_id").val("");
    $("#userName").val("");
    $("#userStat").val("");
    $("#userLastLogin").val("");
    $("#userFN").val("");
    $("#userLN").val("");
    $("#userSsn").val("");
    $("#userTel").val("");
    $("#userEmail").val("");
    $("#userTitle").val("");
    $("#userGroup").val("");
    $("#checkUserInfor").text("");
}


$(document).on('mouseup', '[id = userAct]', function () {
    if($("#userAct").val() !=""){
        $("#checkUserInfor").text("");

        if($("#userAct").val() == "ADD"){
            clearUserModalForm();
            $("#userActModal").val($("#userAct").val());
            $("#userModal").modal();
        } else{
            if(checkAlarmInfor()){
                clearUserModalForm();
                populateUserModal();
                $("#userModal").modal();

                // if($("#userAct").val()=="UPDATE"){
                //     clearUserModalForm();
                //     populateUserModal();
                //     $("#userModal").modal();
                //     //queryUser('upd');
                // } else if($("#userAct").val()=="DELETE"){
                //     clearUserModalForm();
                //     populateUserModal();
                //     $("#userModal").modal();
                //     //queryUser('del');
                // }  else if($("#userAct").val()=="LOCK"){
                //     clearUserModalForm();
                //     populateUserModal();
                //     $("#userModal").modal();
                    
                // }  else if($("#userAct").val()=="UNLOCK"){
                //     clearUserModalForm();
                //     populateUserModal();
                //     $("#userModal").modal();
                    
                // }
            }
            else  $("#checkUserInfor").html("Missing user information!");
        } 
        
    }
    
    // $("#userAct").val("");
})


function populateUserModal(){
    $("#userNameModal").val($("#userName").val());
    $("#userStatModal").val($("#userStat").val());
    $("#userLastLoginModal").val($("#userLastLogin").val());
    $("#userFNModal").val($("#userFN").val());
    $("#userLNModal").val($("#userLN").val());
    $("#userSsnModal").val($("#userSsn").val());
    $("#userTelModal").val($("#userTel").val());
    $("#userEmailModal").val($("#userEmail").val());
    $("#userTitleModal").val($("#userTitle").val());
    $("#userGroupModal").val($("#userGroup").val());

    $("#userActModal").val($("#userAct").val());


}

function checkAlarmInfor(){
    if($("#user_id").val() != "")
        return true;
    else return false;
}


