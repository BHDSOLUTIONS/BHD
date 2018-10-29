
var adminAlm_table;
var adminAlm_tableIndex;
var adminAlm_maxTableIndex;
   
// ---------------------Click Events----------------------------

$(document).on("click","#adminAlm_table tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    $("#almModal_id").val(dataRow[0]);
    $("#adminAlm_almId").val(dataRow[1]);
    $("#adminAlm_ack").val(dataRow[2]);
	$("#adminAlm_cond").val(dataRow[6]);
	$("#adminAlm_remark").val(dataRow[9]);

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#adminAlm_clear").click(adminAlm_clearForm);


$("#adminAlm_next").click(function(){
    if (adminAlm_tableIndex<adminAlm_maxTableIndex)
    {
        adminAlm_tableIndex++;
        adminAlm_displayTable(adminAlm_tableIndex);
    }  
})


$("#adminAlm_previous").click(function(){
    if (adminAlm_tableIndex>1)
    {
        adminAlm_tableIndex--;
        adminAlm_displayTable(adminAlm_tableIndex);   
    }         
})


$(document).on('mouseup', '[id *= adminAlm_act]', function () {
    if ($("#adminAlm_act").val()  ==  "ACK") {
        if ($("#adminAlm_almId").val() != "") {
			if ($("#adminAlm_ack").val() != "") {
				alert("ALARM already ACKNOWLEDGED");
			}
			else {
				almModal_clearForm();
				adminAlm_populateAlmModal();
				$("#almModal").modal();
			}
        }
        else {
            alert("Please select an ALARM from LIST OF ALARMS");
		}
	}
    else if ($("#adminAlm_act").val()  ==  "UN-ACK") {
        if ($("#adminAlm_almId").val() != "") {
			if ($("#adminAlm_ack").val() == "") {
				alert("ALARM has not been ACKNOWLEDGED");
			}
			else {
				almModal_clearForm();
				adminAlm_populateAlmModal();
				$("#almModal").modal();
			}
        }
        else {
            alert("Please select an ALARM from LIST OF ALARMS");
		}
	}
    else if ($("#adminAlm_act").val()  ==  "CLR")
    {
        if ($("#adminAlm_almId").val() != "")
        {
            almModal_clearForm();
            adminAlm_populateAlmModal();
            $("#almModal").modal();
        }
        else {
            alert("Please select an ALARM from LIST OF ALARMS");
		}
    }
})

// --------------------------Functions---------------------------

function adminAlm_populateAlmModal(){
    $("#almModal_almId").val($("#adminAlm_almId").val());
    $("#almModal_ack").val($("#adminAlm_ack").val());
    $("#almModal_cond").val($("#adminAlm_cond").val());
    $("#almModal_act").val($("#adminAlm_act").val());
}



function adminAlm_clearForm(){
    $("#almModal_id").val("");
    $("#adminAlm_almId").val("");
    $("#adminAlm_ack").val("");
    $("#adminAlm_cond").val("");
    $("#adminAlm_remark").val("");
    $("#adminAlm_act").val("");
    // $("#checkAlmInfor").text("");
}


function adminAlm_queryAlm(action){
    
    $.post("./php/coQueryAlm.php",
    {     
        act:    action,
        user:	$('#main_currentUser').text(),
        id:     $("#almModal_id").val(),
        ack:    $("#adminAlm_ack").val(),
        almid:  $("#adminAlm_almId").val(),
        cond:  	$("#adminAlm_cond").val(),
        remark: $("#adminAlm_remark").val() 
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
                adminAlm_tableIndex=0;
                adminAlm_table = obj['rows'];
                var len = adminAlm_table.length; 
                adminAlm_maxTableIndex = Math.ceil(len/100.0);
                adminAlm_tableIndex++;
                adminAlm_displayTable(adminAlm_tableIndex);

            }  
        } 
    });
}


function adminAlm_displayTable(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = adminAlm_table.length;

    if (len>=startIndex)
    {
        if (len < stopIndex)
            stopIndex=len;            
        adminAlm_clearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + adminAlm_table[i].id + '</td>')  
            a.push('<td style="width:10%">' + adminAlm_table[i].almid + '</td>');
            a.push('<td style="width:15%">' +  adminAlm_table[i].ack + '</td>');
            a.push('<td style="width:5%">' +  adminAlm_table[i].sa + '</td>');
            
            a.push('<td style="width:10%">' +  adminAlm_table[i].src + '</td>');
            a.push('<td style="width:10%">' +  adminAlm_table[i].type + '</td>');
            a.push('<td style="width:15%">' +  adminAlm_table[i].cond + '</td>');
            if ( adminAlm_table[i].sev  ==  "MIN")
                a.push('<td style="width:10%;background-color:yellow">' +  adminAlm_table[i].sev + '</td>');
            else if (adminAlm_table[i].sev  ==  "MAJ")
                a.push('<td style="width:10%;background-color:orange">' +  adminAlm_table[i].sev + '</td>');
            else if (adminAlm_table[i].sev  ==  "CRI")
                a.push('<td style="width:10%;background-color:red">' +  adminAlm_table[i].sev + '</td>');
            else if (adminAlm_table[i].sev  ==  "NONE")
                a.push('<td style="width:10%;background-color:green">' +  adminAlm_table[i].sev + '</td>');
            a.push('<td style="width:25%; word-wrap: break-word">' +  adminAlm_table[i].datetime + '</td>');
            a.push('<td style="display:none">' +  adminAlm_table[i].remark + '</td></tr>');
        }
        document.getElementById("adminAlm_table").innerHTML = a.join("");
        $("#adminAlm_index").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function adminAlm_clearTable() {
    $("#adminAlm_table").empty();
}
