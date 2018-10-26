

$("#brdcstModal").on("hidden.bs.modal", brdcst_clearForm);

// -----------------------Click Events------------

$("#brdcstModal_submit").unbind("click").click(function(){
    if ($("#brdcstModal_act").val() == "ADD")
    {
        brdcstModal_queryBrdcst('add');
    } 
    else if ($("#brdcstModal_act").val() == "UPD")
    {
        brdcstModal_queryBrdcst('upd');
    } 
    else if ($("#brdcstModal_act").val() == "DEL")
    {
        brdcstModal_queryBrdcst('del');
    } 
   
})


$("#brdcstModal_clear").click(brdcstModal_clearForm);


// -------------------Functions-------------------

function brdcstModal_clearForm(){
    $("#brdcstModal_title").val("");

    $("#brdcstModal_sa").val("");
    $("#brdcstModal_user").val("");
    $("#brdcstModal_detail").val("");
    $("#brdcstModal_result").text("");
}


function brdcstModal_queryBrdcst(action){
    
    $.post("./php/coQueryBroadcast.php",
    {     
        act:    action,
        user:   "ninh",
        id:     $("#brdcstModal_id").val(),
        uname:  $("#brdcstModal_user").val(),
        msg:    $("#brdcstModal_title").val(),
        sa:     $("#brdcstModal_sa").val(),
        detail: $("#brdcstModal_detail").val(),
     
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
                brdcst_tableIndex=0;
                brdcst_table = obj['rows'];
                var len = brdcst_table.length; 
                brdcst_maxTableIndex = Math.ceil(len/100.0);
                brdcst_tableIndex++;
                brdcst_displayTable(brdcst_tableIndex);
                if (action == "add") $("#brdcstModal_result").text("Message is added successfully!");
                else if (action == "upd") $("#brdcstModal_result").text("Message is updated successfully!");
                else if (action == "del") $("#brdcstModal_result").text("Message is deleted successfully!");
            }  
        } 
    });
}