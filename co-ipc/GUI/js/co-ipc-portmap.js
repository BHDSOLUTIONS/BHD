 ///-----------------PORT MAP--------------------------------------

 var portArray;
 var portTableIndex;
 var maxPortTableIndex;
 $(document).on("click","#tablePort tr",function(){
     var dataRow= $(this).children("td").map(function(){
         return $(this).text(); 
     }).get();
     

     //Populate the information 
     $("#node").val(dataRow[2]).change();
     $("#slot").val(dataRow[3]).change();
     $("#pnum").val(dataRow[4]).change();
     $("#sel-ptyp").val(dataRow[5]).change();
     $("#sel-psta").val(dataRow[6]).change();
     $("#facNum").val(dataRow[7]).change();
     $("#ckt").val(dataRow[8]).change();
     $("#port_id").val(dataRow[0]).change();
     $("#fac_id_P").val(dataRow[1]).change();
     

     //Add color to the row
     $(this).addClass("addColor"); //add class selected to current clicked row
     $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
     
 });
 
 function clearPortTable(){
     $("#tablePort").empty();
 }

 function queryPort(action) {

    $.post("./php/coQueryPort.php",
    {
        act:	action,
        user:	"ninh",
        node:	$("#node").val(),
        slot:	$("#slot").val(),
        pnum:	$("#pnum").val(),
        ptyp:	$("#sel-ptyp").val(),
        psta:	$("#sel-psta").val(),
        fac:	$("#facNum").val(),
        fac_id:	$("#fac_id_P").val(),
        port_id:$("#port_id").val()
        // ckt:$("#ckt").val(),
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

$("#searchPort").click(function(){
    queryPort('query')
});

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


$(document).on('mouseup', '[id*=portAction]', function () {
    if($("#portAction").val()=="Map"){
        clearFacModalForm();
        queryFacModal();
        $("#facModal").modal();
    }
});

$("#submitPort").click(function(){
    if($("#portAction").val()=="Map"){
        queryPort('map');
        
    } else if($("#portAction").val()=="Unmap"){
        queryPort('unmap');
      
    } 
    $("#portAction").val("");
})

$("#clrPort").click(clearPortForm)

function clearPortForm(){
    $("#node").val("").change();
    $("#slot").val("").change();
    $("#pnum").val("").change();
    $("#sel-ptyp").val("").change();
    $("#sel-psta").val("").change();
    $("#facNum").val("").change();
    $("#ckt").val("").change();
    $("#port_id").val("").change();
    $("#fac_id_P").val("").change();
    $("#portAction").val("").change();
}

$('#findFacNum').click(function() {
	alert("here");
	queryPort("findFac");
});

$('#findCkid').click(function() {
	queryPort("findCkid");
});

$('#findPort').click(function() {
	queryPort("findPort");
});

