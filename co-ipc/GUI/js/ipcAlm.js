
var alm_tbl;
var alm_tblIndex;
var alm_maxTblIndex;
   
// ---------------------Click Events----------------------------

$(document).on("click","#alm_tbl tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    $("#almModal_id_num").val(dataRow[0]);
    $("#alm_almId_num").val(dataRow[1]);
    $("#alm_ack_txt").val(dataRow[2]);
	$("#alm_cond_txt").val(dataRow[6]);
	$("#alm_remark_txt").val(dataRow[9]);

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#alm_clear").click(almClearForm);


$("#alm_next").click(function(){
    if (alm_tblIndex<alm_maxTblIndex) {
        alm_tblIndex++;
        almDisplayTable(alm_tblIndex);
    }  
})


$("#alm_previous").click(function(){
    if (alm_tblIndex>1) {
        alm_tblIndex--;
        almDisplayTable(alm_tblIndex);   
    }         
})


$(document).on('mouseup', '[id = alm_act_sel]', function () {
    if ($("#alm_act_sel").val()  ==  "ACK") {
        if ($("#alm_almId_num").val() != "") {
			if ($("#alm_ack_txt").val() != "") {
				alert("ALARM already ACKNOWLEDGED");
			}
			else {
				almModal_clearForm();
				almPopulateAlmModal();
				$("#almModal").modal();
			}
        }
        else {
            alert("Please select an ALARM from LIST OF ALARMS");
 
		}
	}
    else if ($("#alm_act_sel").val()  ==  "UN-ACK") {
        if ($("#alm_almId_num").val() != "") {
			if ($("#alm_ack_txt").val() == "") {
				alert("ALARM has not been ACKNOWLEDGED");
			}
			else {
				almModal_clearForm();
				almPopulateAlmModal();
				$("#almModal").modal();
			}
        }
        else {
            alert("Please select an ALARM from LIST OF ALARMS");
		}
	}
    else if ($("#alm_act_sel").val()  ==  "CLR")
    {
        if ($("#alm_almId_num").val() != "")
        {
            almModal_clearForm();
            almPopulateAlmModal();
            $("#almModal").modal();
        }
        else {
            alert("Please select an ALARM from LIST OF ALARMS");
		}
    }
})

// --------------------------Functions---------------------------

function almPopulateAlmModal(){
    $("#almModal_almId_num").val($("#alm_almId_num").val());
    $("#almModal_ack_txt").val($("#alm_ack_txt").val());
    $("#almModal_cond_txt").val($("#alm_cond_txt").val());
    $("#almModal_act_txt").val($("#alm_act_sel").val());
}



function almClearForm(){
    $("#almModal_id_num").val("");
    $("#alm_almId_num").val("");
    $("#alm_ack_txt").val("");
    $("#alm_cond_txt").val("");
    $("#alm_remark_txt").val("");
    $("#alm_act_sel").val("");
    // $("#checkAlmInfor").text("");
}


function almQueryAlm(action){
    
    $.post("./php/coQueryAlm.php",
    {     
        act:    action,
        user:	$('#main_currentUser').text(),
        id:     $("#almModal_id_num").val(),
        ack:    $("#alm_ack_txt").val(),
        almid:  $("#alm_almId_num").val(),
        cond:  	$("#alm_cond_txt").val(),
        remark: $("#alm_remark_txt").val() 
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
                alm_tblIndex=0;
                alm_tbl = obj['rows'];
                var len = alm_tbl.length; 
                alm_maxTblIndex = Math.ceil(len/100.0);
                alm_tblIndex++;
                almDisplayTable(alm_tblIndex);

            }  
        } 
    });
}


function almDisplayTable(index) {   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = alm_tbl.length;

    if (len>=startIndex) {
        if (len < stopIndex)
            stopIndex=len;            
        almClearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + alm_tbl[i].id + '</td>')  
            a.push('<td style="width:10%">' + alm_tbl[i].almid + '</td>');
            a.push('<td style="width:15%">' +  alm_tbl[i].ack + '</td>');
            a.push('<td style="width:5%">' +  alm_tbl[i].sa + '</td>');
            
            a.push('<td style="width:10%">' +  alm_tbl[i].src + '</td>');
            a.push('<td style="width:10%">' +  alm_tbl[i].type + '</td>');
            a.push('<td style="width:15%">' +  alm_tbl[i].cond + '</td>');
            if ( alm_tbl[i].sev  ==  "MIN")
                a.push('<td style="width:10%;background-color:yellow">' +  alm_tbl[i].sev + '</td>');
            else if (alm_tbl[i].sev  ==  "MAJ")
                a.push('<td style="width:10%;background-color:orange">' +  alm_tbl[i].sev + '</td>');
            else if (alm_tbl[i].sev  ==  "CRI")
                a.push('<td style="width:10%;background-color:red">' +  alm_tbl[i].sev + '</td>');
            else if (alm_tbl[i].sev  ==  "NONE")
                a.push('<td style="width:10%;background-color:green">' +  alm_tbl[i].sev + '</td>');
            a.push('<td style="width:25%; word-wrap: break-word">' +  alm_tbl[i].datetime + '</td>');
            a.push('<td style="display:none">' +  alm_tbl[i].remark + '</td></tr>');
        }
        document.getElementById("alm_tbl").innerHTML = a.join("");
        $("#alm_index_lbl").text("From " + (startIndex+1) + " to " + stopIndex);
    } 
}


function almClearTable() {
    $("#alm_tbl").empty();
}
