

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
    $("#userId").val(dataRow[0]).change();
    $("#userName").val(dataRow[1]).change();
    $("#userStat").val(dataRow[2]).change();
    $("#userLastLogin").val(dataRow[3]).change();
    $("#userFN").val(dataRow[4]).change();
    $("#userLN").val(dataRow[5]).change();
    $("#userSsn").val(dataRow[6]).change();
    $("#userTel").val(dataRow[7]).change();
    $("#userEmail").val(dataRow[8]).change();
    $("#userTitle").val(dataRow[9]).change();
    $("#userGroup").val(dataRow[10]).change();

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});




function queryUser(action){
    
    $.post("./php/coQueryUser.php",
    {     
        act:action,
        id:$("#userId").val(),
        id:$("#userName").val(),
        id:$("#userStat").val(),
        id:$("#userLastLogin").val(),
        id:$("#userFN").val(),
        id:$("#userLN").val(),
        id:$("#userSsn").val(),
        id:$("#userTel").val(),
        id:$("#userEmail").val(),
        id:$("#userTitle").val(),
        id:$("#userGroup").val(),
        
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
                // if(action=="add") alert("Facility is added successfully!");
                // else if(action=="del") alert("Facility is deleted successfully!");
                // else if(action=="upd") alert("Facility is updated successfully!");
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
            a.push('<tr> <td>' + userArray[i].id + '</td>')  
            a.push('<td>' + userArray[i].user + '</td>');
            a.push('<td>' +  userArray[i].stat + '</td>');
            a.push('<td>' +  userArray[i].lastlogin + '</td>');
            a.push('<td>' +  userArray[i].fname + '</td>');
            a.push('<td>' +  userArray[i].lname + '</td>');
            a.push('<td>' +  userArray[i].ssn + '</td>');
            a.push('<td>' +  userArray[i].tel + '</td>');
            a.push('<td>' +  userArray[i].email + '</td>');
            a.push('<td>' +  userArray[i].title + '</td>');
            a.push('<td>' +  userArray[i].ugrp + '</td></tr>');
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

$("#searchUser1").click(function(){
    queryUser('query');
});

$("#clrUser").click(clearUserForm);

function clearUserForm(){

    $("#userId").val("");
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
}

$("#submitUser").click(function(){
    if($("#userAct").val()=="Add"){
        queryUser('add');
    } else if($("#userAct").val()=="Upd"){
        queryUser('upd');
    } else if($("#userAct").val()=="Del"){
        queryUser('del');
    }  else if($("#userAct").val()=="Lck"){
        queryUser('lck');
    }  else if($("#userAct").val()=="Unlck"){
        queryUser('unlck');
    }
    $("#userAct").val("");
})









