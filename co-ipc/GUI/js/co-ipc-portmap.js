 ///-----------------PORT MAP--------------------------------------

 var pm_tableArray;
 var pm_tableIndex;
 var pm_maxTableIndex;

 $(document).on("click","#pm_table tr",function() {
     var dataRow= $(this).children("td").map(function() {
         return $(this).text(); 
     }).get();
     

     //Populate the information 
     $("#pmModal_port_id").val(dataRow[0]).change();
     $("#pmModal_fac_id").val(dataRow[1]).change();
     $("#pm_node").val(dataRow[2]).change();
     $("#pm_slot").val(dataRow[3]).change();
     $("#pm_pnum").val(dataRow[4]).change();
     $("#pm_ptyp").val(dataRow[5]).change();
     $("#pm_psta").val(dataRow[6]).change();
     $("#pm_fac").val(dataRow[7]).change();
     $("#pm_ckid").val(dataRow[8]).change();

     //Add color to the row
     $(this).addClass("addColor"); //add class selected to current clicked row
     $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
     
 });
 
 
 function pm_clearTable() {
     $("#pm_table").empty();
 }


 function pm_queryPort(action) {

    $.post("./php/coQueryPort.php",
    {
        act:	action,
        user:	"ninh",
        node:	$("#pm_node").val(),
        slot:	$("#pm_slot").val(),
        pnum:	$("#pm_pnum").val(),
        ptyp:	$("#pm_ptyp").val(),
        psta:	$("#pm_psta").val(),
        fac:	$("#pm_fac").val(),
        fac_id:	$("#pmModal_fac_id").val(),
        port_id:$("#pmModal_port_id").val(),
        ckt:    ""
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if(obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0){
                alert("No record found");
            }
            else{
                pm_tableIndex=0;
                pm_tableArray = obj["rows"];
                var len = pm_tableArray.length; 
                pm_maxTableIndex = Math.ceil(len/100.0);
                pm_tableIndex++;
                pm_loadTable(pm_tableIndex);
            }
        }
    });
}


function pm_loadTable(index){
    
    var startIndex = (index-1)*100;
    var stopIndex = index *100;
    var len = pm_tableArray.length;

    if (len >= startIndex) {

        pm_clearTable();
        if(len < stopIndex)
            stopIndex=len;
        var a = [];
        for (var i=startIndex; i<stopIndex; i++) {
            if (pm_tableArray[i].fac == null) pm_tableArray[i].fac = "";
            if (pm_tableArray[i].ckt == null) pm_tableArray[i].cktid = "";
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
        document.getElementById("pm_table").innerHTML = a.join("");
        $("#pm_index").text("From "+(startIndex+1)+" to "+stopIndex);
    }   
}


$("#pm_next").click(function() {
    if (pm_tableIndex < pm_maxTableIndex) {
        pm_tableIndex++;
        pm_loadTable(pm_tableIndex);
    }
    
});


$("#pm_prev").click(function() {
    if (pm_tableIndex > 1) {
        pm_tableIndex--;
        pm_loadTable(pm_tableIndex);   
    }
});


$(document).on('mouseup', '[id*=pm_act]', function () {
    
    if ($("#pm_act").val() == "MAP") {
        if ($('#pmModal_port_id').val() > 0) {
            if ($('#pmModal_fac_id').val() > 0) {
				alert("PORT already MAPPED");
			}
			else {
				pmModal_clearForm(); 
				pmModal_populateForm();
				$('#pmModal_submit').prop('disabled',true);
				$("#pmModal_table").show();
				pmModal_queryAvailFac();
				$("#portMapModal").modal();
			}
        }
        else{
            alert("Missing PORT");
			$('#pm_act').val("");
        }
              
    } 
    else if ($("#pm_act").val() == "UN-MAP") {
        if ($('#pmModal_port_id').val() > 0) {
			if ($('#pmModal_fac_id').val() > 0) {
				pmModal_clearForm(); 
				pmModal_populateForm();
				$('#pmModal_submit').prop('disabled',false);
				$("#pmModal_table").hide();
				$("#portMapModal").modal();
			}
			else {
				alert("Missing FAC");
				$('#pm_act').val("");
			}	  
        }
        else{
            alert("Missing PORT");
			$('#pm_act').val("");
            
        }      
    }

});


function pmModal_populateForm() {

    $("#pmModal_node").val($("#pm_node").val());
    $("#pmModal_slot").val($("#pm_slot").val());
    $("#pmModal_pnum").val( $("#pm_pnum").val());
    $("#pmModal_ptyp").val( $("#pm_ptyp").val());
    $("#pmModal_psta").val( $("#pm_psta").val());
    $("#pmModal_fac").val($("#pm_fac").val());
    $("#pmModal_act").val($("#pm_act").val()); 
}


function pm_clearForm() {
    $("#pm_node").val("");
    $("#pm_slot").val("");
    $("#pm_pnum").val("");
    $("#pm_ptyp").val("");
    $("#pm_psta").val("");
    $("#pm_fac").val("");
    $("#pm_ckid").val("");
    $("#pmModal_port_id").val("");
    $("#pmModal_fac_id").val("");
    $("#pm_act").val("");
}


$("#pm_cancel").click(function() {
	pm_clearForm();
});


$('#pm_findFac').click(function() {
	
	pm_queryPort("findFac");
});


$('#pm_findCkid').click(function() {
	pm_queryPort("findCkid");
});


$('#pm_findPort').click(function() {
	pm_queryPort("findPort");
});

