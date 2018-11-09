var evtlog_tbl;
var event_tableIndex;
var event_maxTableIndex;

// ----------------------Click Events-----------------------------

$(document).on("click","#evtlog_tbl tr",function() {
    var dataRow= $(this).children("td").map(function() {
        return $(this).text();
    }).get();

    //Populate the information 
    $("#event_id").val(dataRow[0]).change();
    $("#evtlog_user_txt").val(dataRow[1]).change();
    $("#evtlog_function_sel").val(dataRow[2]).change();
     
    $("#evtlog_event_sel").val(dataRow[3]).change();       
    
    // $("#event_result").val(dataRow[4]).change();  
    $("#evtlog_detail_txt").val(dataRow[5]).change();  
    // $("#evtlog_date_sel").val(dataRow[6]).change(); 
            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#evtlog_find_btn").click(function() {
    evtlogQuery("query");
})



$("#event_next").click(function() {
    if (event_tableIndex<event_maxTableIndex) {
        event_tableIndex++;
        evtlogDisplayTable(event_tableIndex);
    }  
})


$("#event_previous").click(function() {
    if (event_tableIndex>1) {
        event_tableIndex--;
        evtlogDisplayTable(event_tableIndex);   
    }         
})


$("#event_clear").click(evtlogClearForm);


// $(document).on('mouseup', '[id = event_act_sel]', function () {
//     if ($("#event_act_sel").val() !="")
//     {
//         matrixModal_clearForm();
//         if ($("#matrixModal_card_id").val() !=""){
//             if ($("#event_act_sel").val()  ==  "LCK")
//             {
                
               
//             } 
//             else if ($("#event_act_sel").val()  ==  "UN-LCK")
//             {
                
//             } 
//             else if ($("#event_act_sel").val()  ==  "REFRESH")
//             {
    
//             }
//             event_populateMatrixModal()
//             $("#matrixModal").modal();
//         }
//         else
//             alert("Missing matrix card information!")
        
//     }
    

// })

$("#evtlog_function_sel").change(function() {
    $("#evtlog_event_sel").empty();
    var a = [];
    a.push('<option></option>');

    if ($("#evtlog_function_sel").val() == "PORTMAP") {
        a.push('<option>MAP</option>');
        a.push('<option>UNMAP</option>');

    }
    else if ($("#evtlog_function_sel").val() == "PROV") {
        a.push('<option>NEWCKT</option>');
        a.push('<option>CONN</option>');
        a.push('<option>DISCONN</option>');
    }
    else if ($("#evtlog_function_sel").val() == "USER") {
        a.push('<option>ADD</option>');
        a.push('<option>UPDATE</option>');
        a.push('<option>DELETE</option>');
        a.push('<option>LCK</option>');
        a.push('<option>UNLCK</option>');
        a.push('<option>LOGIN</option>');
        a.push('<option>LOGOUT</option>');


    }
    else if ($("#evtlog_function_sel").val() == "BRDCST") {

    }
    else if ($("#evtlog_function_sel").val() == "ALMADM") {
        a.push('<option>ACK</option>');
        a.push('<option>UNACK</option>');
        a.push('<option>CLR</option>');
    }
    else if ($("#evtlog_function_sel").val() == "PATHADM") {

    }
    else if ($("#evtlog_function_sel").val() == "MXCARD") {
        a.push('<option>LCK</option>');
        a.push('<option>UNLCK</option>');
        a.push('<option>REFRESH</option>');
    }

    document.getElementById("evtlog_event_sel").innerHTML = a.join("");
})

// -------------------Functions-------------------------------------

function evtlogQuery(action) {
    
    $.post("./php/coQueryEventLog.php",
    {     
        act:    action,
        user:	$('#main_currentUser').text(),
        id:		$("#event_id").val(),
        uname:  $("#evtlog_user_txt").val(),
        fnc:    $("#evtlog_function_sel").val(),
        evt:    $("#evtlog_event_sel").val(),
        days:   $("#evtlog_date_sel").val()
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                alert("There is no matching data!");
            }
            else {
                event_tableIndex=0;
                evtlog_tbl = obj['rows'];
                var len = evtlog_tbl.length; 
                event_maxTableIndex = Math.ceil(len/100.0);
                event_tableIndex++;
                evtlogDisplayTable(event_tableIndex);
              
            }  
        } 
    });
}


function evtlogDisplayTable(index) {   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = evtlog_tbl.length;

    if (len>=startIndex) {
        if (len < stopIndex) {
            stopIndex=len;
        }            
        evtlogClearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + evtlog_tbl[i].id + '</td>')  
            a.push('<td style="width:15%">' + evtlog_tbl[i].user + '</td>');
            a.push('<td style="width:20%">' +  evtlog_tbl[i].fnc + '</td>');
            a.push('<td style="width:20%">' +  evtlog_tbl[i].evt + '</td>');
            a.push('<td style="width:23%">' +  evtlog_tbl[i].rslt + '</td>');
            a.push('<td style="display:none">' +  evtlog_tbl[i].detail + '</td>');
            a.push('<td style="width:22%">' +  evtlog_tbl[i].time + '</td>');
        }
        document.getElementById("evtlog_tbl").innerHTML = a.join("");
        $("#evtlog_index_lbl").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function evtlogClearForm() {
    $("#event_id").val("");
    $("#evtlog_user_txt").val("");
    $("#evtlog_function_sel").val("");
    $("#evtlog_event_sel").val("");
    $("#evtlog_date_sel").val("");

    $("#evtlog_detail_txt").val("");
}


function evtlogClearTable() {
    $("#evtlog_tbl").empty();
}




