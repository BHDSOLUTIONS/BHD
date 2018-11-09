$("#mxcModal").on("hidden.bs.modal", mxcClearForm);

// -----------------------Click Events------------

$("#mxcModal_submit_btn").click(function(){
    if ($("#mxcModal_act_txt").val() == "LCK") {
        mxcModalQuery('lck');
    } 
    else if ($("#mxcModal_act_txt").val() == "UN-LCK") {
        mxcModalQuery('unlck');
    } 
    else if ($("#mxcModal_act_txt").val() == "REFRESH") {
        mxcModalQuery('refresh');
    } 
})


$("#mxcModal_clear_btn").click(mxcModalClearForm);


// -------------------Functions-------------------

function mxcModalClearForm(){
    $("#mxcModal_result_lbl").text("");

    $("#mxcModal_node_txt").val("");
    $("#mxcModal_slot_txt").val("");
    $("#mxcModal_type_sel").val("");
    $("#mxcModal_stat_sel").val("");

}


function mxcModalQuery(action){
    
    $.post("./php/coQueryMatrix.php",
    {     
        act:   action,
        user:  $('#main_currentUser').text(),
        id:    $("#mxcModal_id_num").val(),
        node:  $("#mxcModal_node_txt").val(),
        slot:  $("#mxcModal_slot_txt").val(),
        type:  $("#mxcModal_type_sel").val(),
        psta:  $("#mxcModal_stat_sel").val()
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
                mxc_tableIndex=0;
                mxc_tbl = obj['rows'];
                var len = mxc_tbl.length; 
                mxc_maxTableIndex = Math.ceil(len/100.0);
                mxc_tableIndex++;
                mxcDisplayTable(mxc_tableIndex);
                if (action == "lck") {
                    $("#mxcModal_result_lbl").text("Matrix card is locked successfully!");
                }
                else if (action == "unlck") {
                    $("#mxcModal_result_lbl").text("Matrix card is un-locked successfully!");
                }
                else if (action == "refresh") {
                    $("#mxcModal_result_lbl").text("Matrix card is refreshed successfully!");
                }
            }  
        } 
    });
}
