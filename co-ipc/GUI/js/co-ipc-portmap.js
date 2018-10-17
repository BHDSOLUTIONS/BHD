 ///-----------------PORT MAP--------------------------------------

 var portArray;
 var portTableIndex;
 var maxPortTableIndex;

 $(document).on("click","#tablePort tr",function(){
     var dataRow= $(this).children("td").map(function(){
         return $(this).text(); 
     }).get();
     

     //Populate the information 
     $("#port_id").val(dataRow[0]).change();
     $("#facPort_id").val(dataRow[1]).change();
     $("#node").val(dataRow[2]).change();
     $("#slot").val(dataRow[3]).change();
     $("#pnum").val(dataRow[4]).change();
     $("#ptyp").val(dataRow[5]).change();
     $("#psta").val(dataRow[6]).change();
     $("#facPort").val(dataRow[7]).change();
     $("#ckt").val(dataRow[8]).change();

     

     //Add color to the row
     $(this).addClass("addColor"); //add class selected to current clicked row
     $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
     
 });
 
 function clearPortTable(){
     $("#tablePort").empty();
 }

 function queryPort(action) {

    $.post("../php/coQueryPort.php",
    {
        act:	action,
        user:	currentUser,
        node:	$("#node").val(),
        slot:	$("#slot").val(),
        pnum:	$("#pnum").val(),
        ptyp:	$("#ptyp").val(),
        psta:	$("#psta").val(),
        fac:	$("#facPort").val(),
        fac_id:	$("#fac_id_P").val(),
        port_id:$("#port_id").val(),
        ckt:    ""
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
                portTableIndex=0;
                portArray = obj["rows"];
                var len = portArray.length; 
                maxPortTableIndex = Math.ceil(len/100.0);
                portTableIndex++;
                
                displayPort(portTableIndex);
                if(action=="map") alert("Port is mapped successfully!");
                else if(action=="unmap") alert("Port is unmapped successfully!");
            }
            
        }
    });
}


function displayPort(index){
    
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = portArray.length;

    if(len>=startIndex){

        clearPortTable();
        if(len < stopIndex)
            stopIndex=len;
        var a = [];
        for (var i=startIndex; i<stopIndex; i++) {
            if(portArray[i].fac == null) portArray[i].fac = "";
            if(portArray[i].ckt == null) portArray[i].cktid = "";
            a.push('<tr> <td style="display:none">' + portArray[i].id + '</td>') 
            a.push('<td style="display:none">' + portArray[i].fac_id + '</td>')   
            a.push('<td style="width:10%">' + portArray[i].node + '</td>');
            a.push('<td style="width:10%">' + portArray[i].slot + '</td>');
            a.push('<td style="width:10%">' + portArray[i].pnum + '</td>');
            a.push('<td style="width:10%">' + portArray[i].ptyp + '</td>');
            a.push('<td style="width:10%">' + portArray[i].psta + '</td>');
            a.push('<td style="width:25%">' + portArray[i].fac + '</td>');
            a.push('<td style="width:25%">' + portArray[i].cktid + '</td></tr>');
        }
        document.getElementById("tablePort").innerHTML = a.join("");
        $("#indexPort").text("From "+(startIndex+1)+" to "+stopIndex);
    }   
}


$("#nextPort").click(function(){
    if(portTableIndex<maxPortTableIndex){
        portTableIndex++;
        displayPort(portTableIndex);
    }
    
})
$("#previousPort").click(function(){
    if(portTableIndex>1){
        portTableIndex--;
        displayPort(portTableIndex);   
    }
         
})

$(document).on('mouseup', '[id*=portAct]', function () {
    if($("#portAct").val() == "MAP"){
        $("#checkPortInfor").text("");
        if(checkPortInfor4Map()){
            clearPortModalForm(); 
            populatePortModal();
    
            $("#facPortModal").prop("disabled",false);
            $("#find_facPortModal").show();
            // $("#ftyp_PortModal").show();
            // $("#find_FacPortModal").show();
            // $("#table_FacPortModal").show();
            // $("#show_PreviousNextPortModal").show();
            $("#clrPortModal").show();
    
            queryFacPortModal();
    
            $("#portMapModal").modal();
        }
        else{
            $("#checkPortInfor").html("Missing Port information! <br> FAC number is not required");
        }
              
    } 
    else if($("#portAct").val() == "UN-MAP"){
        $("#checkPortInfor").text("");
        if(checkPortInfor4UnMap()){
            clearPortModalForm(); 
            populatePortModal();
            $("#find_facPortModal").hide();
    
            $("#clrPortModal").hide();
               
            // $("#facPortModal").prop("disabled",true);
            $("#portMapModal").modal();  
        }
        else{
            $("#checkPortInfor").html("Missing Port or FAC information!");
        }
        
    }
    
});


function populatePortModal(){

    $("#nodeModal").val($("#node").val());
    $("#slotModal").val($("#slot").val());
    $("#pnumModal").val( $("#pnum").val());
    $("#ptypModal").val( $("#ptyp").val());
    $("#pstaModal").val( $("#psta").val());

    $("#facPortModal").val($("#facPort").val());
    $("#portActModal").val($("#portAct").val()); 


}

function checkPortInfor4Map(){
    if(($("#node").val() !="")&&
    ($("#slot").val() !="")&&
    ($("#pnum").val() !="")&&
    ($("#ptyp").val() !="")&&
    ($("#psta").val() !="")&&
    ($("#facPort").val() =="")){
        return true;

    }
    else{
        return false;
    }
}
function checkPortInfor4UnMap(){
    if(($("#node").val() !="")&&
    ($("#slot").val() !="")&&
    ($("#pnum").val() !="")&&
    ($("#ptyp").val() !="")&&
    ($("#psta").val() !="")&&
    ($("#facPort").val() != "")){
        return true;

    }
    else{
        return false;
    }
}

$("#clrPort").click(clearPortForm)

function clearPortForm(){
    $("#node").val("");
    $("#slot").val("");
    $("#pnum").val("");
    $("#ptyp").val("");
    $("#psta").val("");
    $("#facPort").val("");
    $("#ckt").val("");
    $("#port_id").val("");
    $("#facPort_id").val("");
    $("#portAct").val("");
    $("#checkPortInfor").text("");
}

$('#findfacPort').click(function() {
	
	queryPort("findFac");
});

$('#findCkid').click(function() {
	queryPort("findCkid");
});

$('#findPort').click(function() {
	queryPort("findPort");
});

