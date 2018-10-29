// ----------------FACMODAL---------------------------------------------

$("#facModal").on("hidden.bs.modal", setupFac_clearForm);

// ---------------Click Events-------------------------

$("#facModal_submit").click(function(){

    facModal_queryFac( $('#facModal_act').val() ); 

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
        fac_id: $("#setupFac_id").val(),
        fac: 	$("#facModal_fac").val(),
        ftyp: 	$("#facModal_ftyp").val(),
        ort: 	$("#facModal_ort").val(),
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
            setupFac_tableIndex=0;
            setupFac_table = obj['rows'];
            var len = setupFac_table.length; 
            setupFac_maxTableIndex = Math.ceil(len/100.0);
            setupFac_tableIndex++;
            setupFac_displayTable(setupFac_tableIndex);
        } 
    });
}
