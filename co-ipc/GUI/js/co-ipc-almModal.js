// ----------------FACMODAL---------------------------------------------

$("#almModal").on("hidden.bs.modal", adminAlm_clearForm);
// -----------------------Click Events----------------------------------

$("#almModal_clear").click(almModal_clearForm);

$("#almModal_submit").click(function(){
    if ($("#almModal_act").val() == "ACK")
    {
        almModal_queryAlm('ACK');
       
    } else if ($("#almModal_act").val() == "UN-ACK")
    {
        almModal_queryAlm('UN-ACK');
    } else if ($("#almModal_act").val() == "CLR")
    {
        almModal_queryAlm('CLR');
    }
})


// --------------------------Functions-----------------------------

function almModal_clearForm(){
    $("#almModal_remark").val("").change();
    $("#almModal_result").text("");
}


function almModal_queryAlm(action){
    
    $.post("./php/coQueryAlm.php",
    {     
        act:action,
        user:	$('#main_currentUser').text(),
        id:		$("#almModal_id").val(),
        ack: 	$("#almModal_ack").val(),
        almid: 	$("#almModal_almId").val(),
        almid: 	$("#almModal_cond").val(),
        remark: $("#almModal_remark").val() 
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail"){
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
                adminAlm_tableIndex=0;
                adminAlm_table = obj['rows'];
                var len = adminAlm_table.length; 
                adminAlm_maxTableIndex = Math.ceil(len/100.0);
                adminAlm_tableIndex++;
                adminAlm_displayTable(adminAlm_tableIndex);
                if (action == "ack") 
                    $("#almModal_result").text("The alarm is acknowledged successfully!");
                else if (action == "unack") 
                    $("#almModal_result").text("The alarm is unacknowledged successfully!");
                else if (action == "clr") 
                    $("#almModal_result").text("The alarm is cleared successfully!");

            }  
        } 
    });
}
