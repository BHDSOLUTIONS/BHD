

$("#brdcstModal").on("hidden.bs.modal", brdcst_clearForm);

// -----------------------Click Events------------

$("#brdcstModal_submit").click(function(){
    brdcstModal_queryBrdcst($("#brdcstModal_act").val());
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
        user:   $("#main_currentUser").text(),
        id:     $("#brdcst_id").val(),
        uname:  $("#brdcstModal_user").val(),
        msg:    $("#brdcstModal_title").val(),
        sa:     $("#brdcstModal_sa").val(),
        detail: $("#brdcstModal_detail").val()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail")
        {
            alert(obj['reason']);
        }
        else
        {
            brdcst_tableIndex=0;
            brdcst_table = obj['rows'];
            var len = brdcst_table.length; 
            brdcst_maxTableIndex = Math.ceil(len/100.0);
            brdcst_tableIndex++;
            brdcst_displayTable(brdcst_tableIndex);
            $("#brdcstModal_result").text(obj["rslt"]);
        } 
    });
}
