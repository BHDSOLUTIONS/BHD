// ----------------FACMODAL---------------------------------------------

$("#facModal").on("hidden.bs.modal", setupFac_clearForm);

// ---------------Click Events-------------------------

$("#facModal_submit").click(function(){

    facModal_queryFac( $('#facModal_act').val() ); 

    /*
    if ($("#facModal_act").val() == "ADD")
    {
        facModal_queryFac('add');
    } 
    else if ($("#facModal_act").val() == "UPDATE")
    {
        facModal_queryFac('upd');
    } 
    else if ($("#facModal_act").val() == "DELETE")
    {
        facModal_queryFac('del');
        
    }
    */

})


// -----------------Function-------------------------

function facModal_clearForm(){
    $("#facModal_fac").val("").change();
    $("#facModal_ftyp").val("").change();
    $("#facModal_ort").val("").change();
    $("#facModal_spcfnc").val("").change();
    $("#facModal_portInfor").val("").change();

    $("#facModal_result").text("");
}
$("#facModal_clear").click(facModal_clearForm);


function facModal_queryFac(action){
    
    $.post("./php/coQueryFac.php",
    {     
        act: action,
        user:	$('#main_currentUser').text(),
        fac: $("#facModal_fac").val(),
        fac_id: $("#facModal_id").val(),
        ftyp: $("#facModal_ftyp").val(),
        ort: $("#facModal_ort").val(),
        spcfnc: $("#facModal_spcfnc").val()
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
                setupFac_tableIndex=0;
                setupFac_table = obj['rows'];
                var len = setupFac_table.length; 
                setupFac_maxTableIndex = Math.ceil(len/100.0);
                setupFac_tableIndex++;
                setupFac_displayTable(setupFac_tableIndex);
                if (action == "ADD") $("#facModal_result").text("Facility is added successfully!");
                else if (action == "DELETE") $("#facModal_result").text("Facility is deleted successfully!");
                else if (action == "UPDATE") $("#facModal_result").text("Facility is updated successfully!");
            }  
        } 
    });
}
