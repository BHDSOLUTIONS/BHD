// ----------------FACMODAL---------------------------------------------


$("#submitFacModal").click(function(){
    if($("#facActModal").val()=="ADD"){
        queryFacModal('add');
    } else if($("#facActModal").val()=="UPDATE"){
        queryFacModal('upd');
    } else if($("#facActModal").val()=="DELETE"){
        queryFacModal('del');
    }
})
function clearFacModalForm(){
    $("#facNumModal").val("").change();
    $("#ftypModal").val("").change();
    $("#ortModal").val("").change();
    $("#spcfncModal").val("").change();
    $("#portInfoModal").val("").change();

    $("#resultFacModal").text("");
}
$("#clrFacModal").click(clearFacModalForm);

function queryFacModal(action){
    
    $.post("./php/coQueryFac.php",
    {     
        act: action,
        user: "ninh",
        fac: $("#facNumModal").val(),
        fac_id: $("#fac_id").val(),
        ftyp: $("#ftypModal").val(),
        ort: $("#ortModal").val(),
        spcfnc: $("#spcfncModal").val()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            $("#resultFacModal").text(obj['reason']);
        }else{
            if(obj['rows'].length==0){
                $("#resultFacModal").text("There is no matching data!");
            }
            else{
                facTableIndex=0;
                facArray = obj['rows'];
                var len = facArray.length; 
                maxFacTableIndex = Math.ceil(len/100.0);
                facTableIndex++;
                displayFac(facTableIndex);
                if(action=="add") $("#resultFacModal").text("Facility is added successfully!");
                else if(action=="del") $("#resultFacModal").text("Facility is deleted successfully!");
                else if(action=="upd") $("#resultFacModal").text("Facility is updated successfully!");
            }  
        } 
    });
}