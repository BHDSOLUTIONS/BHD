var event_table;
var event_tableIndex;
var event_maxTableIndex;

// ----------------------Click Events-----------------------------

$(document).on("click","#event_table tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#event_id").val(dataRow[0]).change();
    $("#event_user").val(dataRow[1]).change();
    $("#event_function").val(dataRow[2]).change();
     
    $("#event_event").val(dataRow[3]).change();       
    
    // $("#event_result").val(dataRow[4]).change();  
    $("#event_detail").val(dataRow[5]).change();  
    // $("#event_date").val(dataRow[6]).change(); 
            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#event_find").click(function(){
    event_queryEvent("query");
})



$("#event_next").click(function(){
    if (event_tableIndex<event_maxTableIndex)
    {
        event_tableIndex++;
        event_displayTable(event_tableIndex);
    }  
})


$("#event_previous").click(function(){
    if (event_tableIndex>1)
    {
        event_tableIndex--;
        event_displayTable(event_tableIndex);   
    }         
})


$("#event_clear").click(event_clearForm);


// $(document).on('mouseup', '[id = event_act]', function () {
//     if ($("#event_act").val() !="")
//     {
//         matrixModal_clearForm();
//         if ($("#matrixModal_card_id").val() !=""){
//             if ($("#event_act").val()  ==  "LCK")
//             {
                
               
//             } 
//             else if ($("#event_act").val()  ==  "UN-LCK")
//             {
                
//             } 
//             else if ($("#event_act").val()  ==  "REFRESH")
//             {
    
//             }
//             event_populateMatrixModal()
//             $("#matrixModal").modal();
//         }
//         else
//             alert("Missing matrix card information!")
        
//     }
    

// })

$("#event_function").change(function(){
    $("#event_event").empty();
    var a = [];
    a.push('<option></option>');

    if ($("#event_function").val() == "PORTMAP")
    {
        a.push('<option>MAP</option>');
        a.push('<option>UNMAP</option>');

    }
    else if ($("#event_function").val() == "PROV")
    {
        a.push('<option>NEWCKT</option>');
        a.push('<option>CONN</option>');
        a.push('<option>DISCONN</option>');
    }
    else if ($("#event_function").val() == "USER")
    {
        a.push('<option>ADD</option>');
        a.push('<option>UPDATE</option>');
        a.push('<option>DELETE</option>');
        a.push('<option>LCK</option>');
        a.push('<option>UNLCK</option>');
        a.push('<option>LOGIN</option>');
        a.push('<option>LOGOUT</option>');


    }
    else if ($("#event_function").val() == "BRDCST")
    {

    }
    else if ($("#event_function").val() == "ALMADM")
    {
        a.push('<option>ACK</option>');
        a.push('<option>UNACK</option>');
        a.push('<option>CLR</option>');
    }
    else if ($("#event_function").val() == "PATHADM")
    {

    }
    else if ($("#event_function").val() == "MXCARD")
    {
        a.push('<option>LCK</option>');
        a.push('<option>UNLCK</option>');
        a.push('<option>REFRESH</option>');
    }

    document.getElementById("event_event").innerHTML = a.join("");
})

// -------------------Functions-------------------------------------

function event_queryEvent(action){
    
    $.post("./php/coQueryEventLog.php",
    {     
        act:            action,
        user:	$('#main_currentUser').text(),
        id:		$("#event_id").val(),
        uname:  $("#event_user").val(),
        fnc:    $("#event_function").val(),
        evt:    $("#event_event").val(),
        days:   $("#event_date").val()
        
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
                alert("There is no matching data!");
            }
            else
            {
                event_tableIndex=0;
                event_table = obj['rows'];
                var len = event_table.length; 
                event_maxTableIndex = Math.ceil(len/100.0);
                event_tableIndex++;
                event_displayTable(event_tableIndex);
              
            }  
        } 
    });
}


function event_displayTable(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = event_table.length;

    if (len>=startIndex)
    {
        if (len < stopIndex)
            stopIndex=len;            
        event_clearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + event_table[i].id + '</td>')  
            a.push('<td style="width:15%">' + event_table[i].user + '</td>');
            a.push('<td style="width:20%">' +  event_table[i].fnc + '</td>');
            a.push('<td style="width:20%">' +  event_table[i].evt + '</td>');
            a.push('<td style="width:23%">' +  event_table[i].rslt + '</td>');
            a.push('<td style="display:none">' +  event_table[i].detail + '</td>');
            a.push('<td style="width:22%">' +  event_table[i].time + '</td>');
        }
        document.getElementById("event_table").innerHTML = a.join("");
        $("#event_index").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function event_clearForm(){
    $("#event_id").val("");
    $("#event_user").val("");
    $("#event_function").val("");
    $("#event_event").val("");
    $("#event_date").val("");

    $("#event_detail").val("");
}


function event_clearTable() {
    $("#event_table").empty();
}




