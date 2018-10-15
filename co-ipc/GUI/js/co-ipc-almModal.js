// ----------------FACMODAL---------------------------------------------


$("#submitAlmModal").click(function(){
    if($("#almActModal").val()=="ACK"){
        queryAlmModal('ack');
       
    } else if($("#almActModal").val()=="UN-ACK"){
        queryAlmModal('unack');
    } else if($("#almActModal").val()=="CLR"){
        queryAlmModal('clr');
    }
})
function clearAlmModalForm(){
    $("#almRemarkModal").val("").change();
    $("#resultAlmModal").text("");
}
$("#clrAlmModal").click(clearAlmModalForm);

function queryAlmModal(action){
    
    $.post("./php/coQueryAlm.php",
    {     
        act:action,
        user:"ninh",
        id:$("#alm_id").val(),
        ack : $("#almAckModal").val(),
        almid : $("#almIdModal").val(),
        remark : $("#almRemarkModal").val() 
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            $("#resultAlmModal").text(obj['reason']);
        }else{
            if(obj['rows'].length==0){
                $("#resultAlmModal").text("There is no matching data!");
            }
            else{
                almTableIndex=0;
                almArray = obj['rows'];
                var len = almArray.length; 
                maxAlmTableIndex = Math.ceil(len/100.0);
                almTableIndex++;
                displayAlm(almTableIndex);
                if(action=="ack") $("#resultAlmModal").text("The alarm is acknowledged successfully!");
                else if(action=="unack") $("#resultAlmModal").text("The alarm is unacknowledged successfully!");
                else if(action=="clr") $("#resultAlmModal").text("The alarm is cleared successfully!");

            }  
        } 
    });
}
