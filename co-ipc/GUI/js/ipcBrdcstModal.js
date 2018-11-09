

$("#brdcstModal").on("hidden.bs.modal", brdcstClearForm);

// -----------------------Click Events------------

$("#brdcstModal_submit_btn").click(function(){
    brdcstModalQuery($("#brdcstModal_act_txt").val());
})


$("#brdcstModal_clear_btn").click(brdcstModalClearForm);


// -------------------Functions-------------------

function brdcstModalClearForm(){
    var d = new Date();
    $("#brdcstModal_date_txt").val(d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() );
    $("#brdcstModal_user_txt").val("");
    $("#brdcstModal_title_txt").val("");
    $("#brdcstModal_sa_sel").val("");
    $("#brdcstModal_detail_txt").val("");
    $("#brdcstModal_result_lbl").text("");
    $("#brdcstModal_submit_btn").prop("disabled",false);
}


function brdcstModalQuery(action){
    
    $.post("./php/coQueryBroadcast.php",
    {     
        act:    action,
        user:   $("#main_currentUser").text(),
        id:     $("#brdcst_id_num").val(),
        uname:  $("#brdcstModal_user_txt").val(),
        msg:    $("#brdcstModal_title_txt").val(),
        sa:     $("#brdcstModal_sa_sel").val(),
        detail: $("#brdcstModal_detail_txt").val()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            brdcst_tableIndex=0;
            brdcst_tbl = obj['rows'];
            var len = brdcst_tbl.length; 
            brdcst_maxTableIndex = Math.ceil(len/100.0);
            brdcst_tableIndex++;
            brdcstDisplayTable(brdcst_tableIndex);
            $("#brdcstModal_result_lbl").text(obj["rslt"]);
            $("#brdcstModal_title_txt").prop("disabled","disabled");
            $("#brdcstModal_detail_txt").prop("disabled","disabled");
            $("#brdcstModal_sa_sel").prop("disabled","disabled");
            $("#brdcstModal_submit_btn").prop("disabled","disaabled");
        } 
    });
}
