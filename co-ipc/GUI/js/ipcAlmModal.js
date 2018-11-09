// ----------------FACMODAL---------------------------------------------

$("#almModal").on("hidden.bs.modal", almClearForm);
// -----------------------Click Events----------------------------------

$("#almModal_clear_btn").click(almModalClearForm);

$("#almModal_submit_btn").click(function(){
    almModalQueryAlm($("#almModal_act_txt").val());
   
})


// --------------------------Functions-----------------------------

function almModalClearForm() {
    $("#almModal_remark_txt").val("").change();
    $("#almModal_result_txt").text("");
}


function almModalQueryAlm(action) {
    
    $.post("./php/coQueryAlm.php",
    {     
        act:action,
        user:	$('#main_currentUser').text(),
        id:		$("#almModal_id_num").val(),
        ack: 	$("#almModal_ack_txt").val(),
        almid: 	$("#almModal_almId_num").val(),
        cond: 	$("#almModal_cond_txt").val(),
        remark: $("#almModal_remark_txt").val() 
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
                alm_displayTable(alm_tblIndex);
                $("#almModal_result_txt").text(obj['reason']);
                
            }  
        } 
    });
}
