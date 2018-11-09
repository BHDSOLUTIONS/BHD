 ///-----------------PORT MAP--------------------------------------

 var pm_tableArray;
 var pm_tableIndex;
 var pm_maxTableIndex;

//  -------------------------Click Events-------------------------

 $(document).on("click","#pm_tbl tr",function() {
     var dataRow= $(this).children("td").map(function() {
         return $(this).text(); 
     }).get();
     

     //Populate the information 
     $("#pm_port_id_num").val(dataRow[0]).change();
     $("#pm_fac_id_num").val(dataRow[1]).change();
     $("#pm_node_num").val(dataRow[2]).change();
     $("#pm_slot_num").val(dataRow[3]).change();
     $("#pm_pnum_num").val(dataRow[4]).change();
     $("#pm_ptyp_sel").val(dataRow[5]).change();
     $("#pm_psta_sel").val(dataRow[6]).change();
     $("#pm_fac_txt").val(dataRow[7]).change();
     $("#pm_ckid_btn").val(dataRow[8]).change();

     //Add color to the row
     $(this).addClass("addColor"); //add class selected to current clicked row
     $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
     
 });
 
 
$("#pm_cancel_btn").click(function() {
	pmClearForm();
});


$('#pm_findFac_btn').click(function() {
	
	pmQuery("findFac");
});


$('#pm_findCkid_btn').click(function() {
	pmQuery("findCkid");
});


$('#pm_findPort_btn').click(function() {
	pmQuery("findPort");
});


$("#pm_next").click(function() {
    if (pm_tableIndex < pm_maxTableIndex) {
        pm_tableIndex++;
        pmLoadTable(pm_tableIndex);
    }
    
});


$("#pm_prev").click(function() {
    if (pm_tableIndex > 1) {
        pm_tableIndex--;
        pmLoadTable(pm_tableIndex);   
    }
});


$(document).on('mouseup', '[id=pm_act_sel]', function () {
    
    if ($("#pm_act_sel").val()  ==  "MAP") {
        if ($('#pm_port_id_num').val() > 0) {
            if ($('#pm_fac_id_num').val() > 0) {
				alert("This PORT is already MAPPED");
			}
			else {
				pmModalClearForm(); 
				pmPopulateModal();
				$('#pmModal_submit_btn').prop('disabled',true);
				$("#pmModal_displaytbl").show();
				pmModalQueryAvailFac();
				$("#portmapModal").modal();
			}
        }
        else {
            alert("Please select a PORT from LIST OF PORTS");
			$('#pm_act_sel').val("");
        }
              
    } 
    else if ($("#pm_act_sel").val()  ==  "UNMAP") {
        if ($('#pm_port_id_num').val() > 0) {
			if ($('#pm_fac_id_num').val() > 0) {
				pmModalClearForm(); 
				pmPopulateModal();
				$('#pmModal_submit_btn').prop('disabled',false);
				$("#pmModal_displaytbl").hide();
				$("#portmapModal").modal();
			}
			else {
				alert("This PORT has not been MAPPED");
				$('#pm_act_sel').val("");
			}	  
        }
        else {
            alert("Please select a PORT from LIST OF PORTS");
			$('#pm_act_sel').val("");
            
        }      
    }

});


// -------------------Functions-------------------------------

 function pmClearTable() {
     $("#pm_tbl").empty();
 }


 function pmQuery(action) {

    $.post("./php/coQueryPort.php",
    {
        act:	action,
        user:	$('#main_currentUser').val(),
        node:	$("#pm_node_num").val(),
        slot:	$("#pm_slot_num").val(),
        pnum:	$("#pm_pnum_num").val(),
        ptyp:	$("#pm_ptyp_sel").val(),
        psta:	$("#pm_psta_sel").val(),
        fac:	$("#pm_fac_txt").val(),
        fac_id:	$("#pm_fac_id_num").val(),
        port_id:$("#pm_port_id_num").val(),
        ckid:   $('#pm_ckid_btn').val()
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"]  ==  "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length  ==  0) {
                alert("No record found");
            }
            else {
                pm_tableIndex=0;
                pm_tableArray = obj["rows"];
                var len = pm_tableArray.length; 
                pm_maxTableIndex = Math.ceil(len/100.0);
                pm_tableIndex++;
                pmLoadTable(pm_tableIndex);
            }
        }
    });
}


function pmLoadTable(index) {
    
    var startIndex = (index-1)*100;
    var stopIndex = index *100;
    var len = pm_tableArray.length;

    if (len >= startIndex) {

        pmClearTable();
        if (len < stopIndex) {
            stopIndex=len;
        }
        var a = [];
        for (var i=startIndex; i<stopIndex; i++) {
            if (pm_tableArray[i].fac  ==  null) pm_tableArray[i].fac = "";
            if (pm_tableArray[i].ckt  ==  null) pm_tableArray[i].cktid = "";
            a.push('<tr> <td style="display:none">' + pm_tableArray[i].id + '</td>') 
            a.push('<td style="display:none">' + pm_tableArray[i].fac_id + '</td>')   
            a.push('<td style="width:10%">' + pm_tableArray[i].node + '</td>');
            a.push('<td style="width:10%">' + pm_tableArray[i].slot + '</td>');
            a.push('<td style="width:10%">' + pm_tableArray[i].pnum + '</td>');
            a.push('<td style="width:10%">' + pm_tableArray[i].ptyp + '</td>');
            a.push('<td style="width:10%">' + pm_tableArray[i].psta + '</td>');
            a.push('<td style="width:25%">' + pm_tableArray[i].fac + '</td>');
            a.push('<td style="width:25%">' + pm_tableArray[i].ckid + '</td></tr>');
        }
        document.getElementById("pm_tbl").innerHTML = a.join("");
        $("#pm_index_lbl").text("From "+(startIndex+1)+" to "+stopIndex);
    }   
}


function pmPopulateModal() {

    $("#pmModal_node_num").val($("#pm_node_num").val());
    $("#pmModal_slot_num").val($("#pm_slot_num").val());
    $("#pmModal_pnum_num").val( $("#pm_pnum_num").val());
    $("#pmModal_ptyp_sel").val( $("#pm_ptyp_sel").val());
    $("#pmModal_psta_sel").val( $("#pm_psta_sel").val());
    $("#pmModal_fac_txt").val($("#pm_fac_txt").val());
    $("#pmModal_act_txt").val($("#pm_act_sel").val()); 
}


function pmClearForm() {
    $("#pm_node_num").val("");
    $("#pm_slot_num").val("");
    $("#pm_pnum_num").val("");
    $("#pm_ptyp_sel").val("");
    $("#pm_psta_sel").val("");
    $("#pm_fac_txt").val("");
    $("#pm_ckid_btn").val("");
    $("#pm_port_id_num").val("");
    $("#pm_fac_id_num").val("");
    $("#pm_act_sel").val("");
}


