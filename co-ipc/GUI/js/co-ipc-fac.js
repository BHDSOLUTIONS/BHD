var facArray;
var facTableIndex;
var maxFacTableIndex;

function clearFacTable() {
    $("#tableFac").empty();
}
$(document).on("click","#tableFac tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#fac_id").val(dataRow[0]);
    $("#fac").val(dataRow[1]);
    $("#ftyp").val(dataRow[2]);
    $("#ort").val(dataRow[3]);
    $("#spcfnc").val(dataRow[4]);
    $("#portInfo").val(dataRow[5]);
    
    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


function queryFac(action){
    
    $.post("./php/coQueryFac.php",
    {     
        act: action,
        user: "ninh",

        fac_id: $("#fac_id").val(),
        fac: $("#fac").val(),
        ftyp: $("#ftyp").val(),
        ort: $("#ort").val(),
        spcfnc: $("#spcfnc").val()
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
                facTableIndex=0;
                facArray = obj['rows'];
                var len = facArray.length; 
                maxFacTableIndex = Math.ceil(len/100.0);
                facTableIndex++;
                displayFac(facTableIndex);
                if(action=="add") alert("Facility is added successfully!");
                else if(action=="del") alert("Facility is deleted successfully!");
                else if(action=="upd") alert("Facility is updated successfully!");
            }  
        } 
    });
}

function displayFac(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = facArray.length;

    if(len>=startIndex){
        if(len < stopIndex)
            stopIndex=len;            
        clearFacTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) {  
            a.push('<tr> <td style="display:none">' + facArray[i].id + '</td>')  
            a.push('<td style="width:40%">' + facArray[i].fac + '</td>');
            a.push('<td style="width:10%">' +  facArray[i].ftyp + '</td>');
            a.push('<td style="width:10%">' +  facArray[i].ort + '</td>');
            a.push('<td style="width:17%">' +  facArray[i].spcfnc + '</td>');
            a.push('<td style="width:20%">' +  facArray[i].port + '</td></tr>');
        }
        document.getElementById("tableFac").innerHTML = a.join("");
        $("#indexFac").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}

$("#nextFac").click(function(){
    if(facTableIndex<maxFacTableIndex){
        facTableIndex++;
        displayFac(facTableIndex);
    }  
})

$("#previousFac").click(function(){
    if(facTableIndex>1){
        facTableIndex--;
        displayFac(facTableIndex);   
    }         
})

$("#clrFac").click(clearFacForm);

function clearFacForm(){
    $("#fac_id").val("");
    $("#fac").val("");
    $("#ftyp").val("");
    $("#ort").val("");
    $("#spcfnc").val("");
    $("#portInfo").val("");
    $("#facAction").val("");
    $("#checkFacInfor").text("");
}



$('#findFac').click(function() {
	queryFac("findFac");
});

$('#findFOS').click(function() {
	queryFac("findFOS");
});



$(document).on('mouseup', '[id *= facAct]', function () {
    if($("#facAct").val() == "UPDATE"){
        $("#checkFacInfor").text("");
        if(checkFacInfor()){
            clearFacModalForm();   
            populateFacModal();
    
            $("#facNumModal").prop("disabled",false);
            $("#ftypModal").prop("disabled",false);
            $("#ortModal").prop("disabled",false);
            $("#spcfncModal").prop("disabled",false);
            $("#clrFacModal").prop("disabled",false);
            $("#clrFacModal").show();
    
            $("#facModal").modal(); 
        } else {
            $("#checkFacInfor").text("Missing Fac information!")
        }
              
    } 
    else if($("#facAct").val() == "DELETE"){
        $("#checkFacInfor").text("");
        if(checkFacInfor()){
            clearFacModalForm();   
            populateFacModal();
    
            $("#facNumModal").prop("disabled",true);
            $("#ftypModal").prop("disabled",true);
            $("#ortModal").prop("disabled",true);
            $("#spcfncModal").prop("disabled",true);
            $("#clrFacModal").hide();
    
            $("#facModal").modal();  
        } else {
            $("#checkFacInfor").text("Missing Fac information!")
        }
       
    }
    else if($("#facAct").val() == "ADD"){
        $("#checkFacInfor").text("");
        clearFacModalForm(); 
        $("#facActModal").val($("#facAct").val()); 
        // populateFacModal(); 

        $("#facNumModal").prop("disabled",false);
        $("#ftypModal").prop("disabled",false);
        $("#ortModal").prop("disabled",false);
        $("#spcfncModal").prop("disabled",false);
        $("#clrFacModal").show();

        $("#facModal").modal(); 
        $("#facAct").val("");  
    }
    $("#facAct").val("");
});

function populateFacModal(){
    $("#facNumModal").val($("#fac").val());
    $("#ftypModal").val($("#ftyp").val());
    $("#ortModal").val($("#ort").val());
    $("#spcfncModal").val($("#spcfnc").val());
    $("#portInfoModal").val($("#portInfo").val()); 
    $("#facActModal").val($("#facAct").val()); 

}

function checkFacInfor(){
    if(($("#fac").val() != "") && ($("#ftyp").val() != ""))
        return true;
    else return false;
}
