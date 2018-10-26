var setupUser_table;
var setupUser_tableIndex;
var setupUser_maxTableIndex;


// ----------------------Click Events-----------------------------

$(document).on("click","#setupUser_table tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#userModal_user_id").val(dataRow[0]).change();
    $("#setupUser_user").val(dataRow[1]).change();
    $("#setupUser_stat").val(dataRow[2]).change();
     
    $("#setupUser_title").val(dataRow[3]).change();       
    $("#setupUser_group").val(dataRow[4]).change();  
    
    $("#setupUser_tel").val(dataRow[5]).change();       
    $("#setupUser_email").val(dataRow[6]).change();  
    
    $("#setupUser_lastLogin").val(dataRow[7]).change();       
    $("#setupUser_FN").val(dataRow[8]).change();       
    $("#setupUser_LN").val(dataRow[9]).change();       
    $("#setupUser_ssn").val(dataRow[10]).change();       
            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#setupUser_findUser").click(function(){
    setupUser_queryUser("findUser");
})


$("#setupUser_findNameSsn").click(function(){
    setupUser_queryUser("findNameSsn");
})


$("#setupUser_findTelEmail").click(function(){
    setupUser_queryUser("findTelEmail");
})


$("#setupUser_findTitleGrp").click(function(){
    setupUser_queryUser("findTitleGrp");
})


$("#setupUser_next").click(function(){
    if (setupUser_tableIndex<setupUser_maxTableIndex)
    {
        setupUser_tableIndex++;
        setupUser_displayTable(setupUser_tableIndex);
    }  
})


$("#setupUser_previous").click(function(){
    if (setupUser_tableIndex>1)
    {
        setupUser_tableIndex--;
        setupUser_displayTable(setupUser_tableIndex);   
    }         
})


$("#setupUser_clear").click(setupUser_clearForm);


$(document).on('mouseup', '[id = setupUser_act]', function () {
    if ($("#setupUser_act").val() !="")
    {
        // $("#setupUser_checkInfor").text("");

        if ($("#setupUser_act").val()  ==  "ADD")
        {
            userModal_clearForm();
            $("#userModal_act").val($("#setupUser_act").val());
            $("#userModal").modal();
        } 
        else
        {
            if (setupUser_checkInfor())
            {
                userModal_clearForm();
                setupUser_populateUserModal();
                $("#userModal").modal();

                // if ($("#setupUser_act").val() == "UPDATE"){
                //     userModal_clearForm();
                //     setupUser_populateUserModal();
                //     $("#userModal").modal();
                //     //setupUser_queryUser('upd');
                // } else if ($("#setupUser_act").val() == "DELETE"){
                //     userModal_clearForm();
                //     setupUser_populateUserModal();
                //     $("#userModal").modal();
                //     //setupUser_queryUser('del');
                // }  else if ($("#setupUser_act").val() == "LOCK"){
                //     userModal_clearForm();
                //     setupUser_populateUserModal();
                //     $("#userModal").modal();
                    
                // }  else if ($("#setupUser_act").val() == "UNLOCK"){
                //     userModal_clearForm();
                //     setupUser_populateUserModal();
                //     $("#userModal").modal();
                    
                // }
            }
            else  
                alert("Missing user information!");
        } 
        
    }
    
    // $("#setupUser_act").val("");
})

// -------------------Functions-------------------------------------

function setupUser_queryUser(action){
    
    $.post("./php/coQueryUser.php",
    {     
        act:	action,
        user:	$('#main_currentUser').text(),
        id:		$("#userModal_user_id").val(),
        uname:	$("#setupUser_user").val(),
        stat:	$("#setupUser_stat").val(),
        lastlogin:	$("#setupUser_lastLogin").val(),
        fname:	$("#setupUser_FN").val(),
        lname:	$("#setupUser_LN").val(),
        ssn:	$("#setupUser_ssn").val(),
        tel:	$("#setupUser_tel").val(),
        email:	$("#setupUser_email").val(),
        title:	$("#setupUser_title").val(),
        ugrp:	$("#setupUser_group").val()
        
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
                alert("No record found");
            }
            else
            {
                setupUser_tableIndex = 0;
                setupUser_table = obj['rows'];
                var len = setupUser_table.length; 
                setupUser_maxTableIndex = Math.ceil(len/100.0);
                setupUser_tableIndex++;
                setupUser_displayTable(setupUser_tableIndex);
            }  
        } 
    });
}


function setupUser_displayTable(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = setupUser_table.length;

    if (len >= startIndex)
    {
        if (len < stopIndex)
            stopIndex=len;            
        setupUser_clearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + setupUser_table[i].id + '</td>')  
            a.push('<td style="width:20%">' + setupUser_table[i].uname + '</td>');
            a.push('<td style="width:15%">' +  setupUser_table[i].stat + '</td>');
            a.push('<td style="width:20%">' +  setupUser_table[i].title + '</td>');
            a.push('<td style="width:20%">' +  setupUser_table[i].ugrp + '</td>');
            a.push('<td style="width:25%">' +  setupUser_table[i].tel + '</td>');
            a.push('<td style="display:none">' +  setupUser_table[i].email + '</td>');
            a.push('<td style="display:none">' +  setupUser_table[i].lastlogin + '</td>');
            a.push('<td style="display:none">' +  setupUser_table[i].fname + '</td>');
            a.push('<td style="display:none">' +  setupUser_table[i].lname + '</td>');
            a.push('<td style="display:none">' +  setupUser_table[i].ssn + '</td></tr>');
        }
        document.getElementById("setupUser_table").innerHTML = a.join("");
        $("#setupUser_index").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function setupUser_clearForm(){
    $("#userModal_user_id").val("");
    $("#setupUser_user").val("");
    $("#setupUser_stat").val("");
    $("#setupUser_lastLogin").val("");
    $("#setupUser_FN").val("");
    $("#setupUser_LN").val("");
    $("#setupUser_ssn").val("");
    $("#setupUser_tel").val("");
    $("#setupUser_email").val("");
    $("#setupUser_title").val("");
    $("#setupUser_group").val("");
    $("#setupUser_act").val("");
}


function setupUser_clearTable() {
    $("#setupUser_table").empty();
}


function setupUser_populateUserModal(){
    $("#userModal_user").val($("#setupUser_user").val());
    $("#userModal_stat").val($("#setupUser_stat").val());
    $("#userModal_lastLogin").val($("#setupUser_lastLogin").val());
    $("#userModal_FN").val($("#setupUser_FN").val());
    $("#userModal_LN").val($("#setupUser_LN").val());
    $("#userModal_ssn").val($("#setupUser_ssn").val());
    $("#userModal_tel").val($("#setupUser_tel").val());
    $("#userModal_email").val($("#setupUser_email").val());
    $("#userModal_title").val($("#setupUser_title").val());
    $("#userModal_group").val($("#setupUser_group").val());

    $("#userModal_act").val($("#setupUser_act").val());


}


function setupUser_checkInfor(){
    if ($("#userModal_user_id").val() != "")
        return true;
    else return false;
}


