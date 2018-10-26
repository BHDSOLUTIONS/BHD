$("#matrixModal").on("hidden.bs.modal", matrix_clearForm);

// -----------------------Click Events------------

$("#matrixModal_submit").click(function(){
    if ($("#matrixModal_act").val() == "LCK")
    {
        matrixModal_queryMatrix('lck');
    } 
    else if ($("#matrixModal_act").val() == "UN-LCK")
    {
        matrixModal_queryMatrix('unlck');
    } 
    else if ($("#matrixModal_act").val() == "REFRESH")
    {
        matrixModal_queryMatrix('refresh');
    } 
})


$("#matrixModal_clear").click(matrixModal_clearForm);


// -------------------Functions-------------------

function matrixModal_clearForm(){
    $("#matrixModal_result").text("");

    $("#matrixModal_node").val("");
    $("#matrixModal_slot").val("");
    $("#matrixModal_type").val("");
    $("#matrixModal_stat").val("");

}


function matrixModal_queryMatrix(action){
    
    $.post("./php/coQueryMatrix.php",
    {     
        act:   action,
        user:  $('#main_currentUser').text(),
        id:    $("#matrixModal_card_id").val(),
        node:  $("#matrixModal_node").val(),
        slot:  $("#matrixModal_slot").val(),
        type:  $("#matrixModal_type").val(),
        psta:  $("#matrixModal_stat").val()
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
                matrix_tableIndex=0;
                matrix_table = obj['rows'];
                var len = matrix_table.length; 
                matrix_maxTableIndex = Math.ceil(len/100.0);
                matrix_tableIndex++;
                matrix_displayTable(matrix_tableIndex);
                if (action == "lck") $("#matrixModal_result").text("Matrix card is locked successfully!");
                else if (action == "unlck") $("#matrixModal_result").text("Matrix card is un-locked successfully!");
                else if (action == "refresh") $("#matrixModal_result").text("Matrix card is refreshed successfully!");
            }  
        } 
    });
}
