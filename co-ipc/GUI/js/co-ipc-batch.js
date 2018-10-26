
var batch_list;
// ----------------------Click Events-----------------------------

$(document).on("click","#batch_table tr",function(){            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});




$(document).on('mouseup', '[id = batch_act]', function () {
    if ($("#batch_act").val() !="")
    {
        // batchModal_clearForm();   
        if ($("#batch_act").val()  ==  "UPLOAD")
        {
            batchModal_clearForm();
            // $("#batchModal").modal();
            $('#batchModal').modal();
            
        }
        else if ($("#batch_act").val()  ==  "DELETE")
        {
            if ($("#batch_id").val() != "")
                batch_queryBatch('delete');
            else 
                alert("No information of the batch file picked!")
            
            batch_clearForm();
        }
        
    }

})

$("#batch_file").change(function(){
    var index = $("#batch_file").val();
    $("#batch_id").val(batch_list[index].id)
    batch_queryBatch("queryBats")
    // batch_displayTable(index);
})

// -------------------Functions-------------------------------------

function batch_queryBatch(action){

    $.ajax({
        url: "./php/coQueryBatch.php",
        type: "POST",
        data: {
            user: 'ninh',
            act: action,
            id:  $("#batch_id").val()
        },
    })
    .done(function(data, status){
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail")
        {
            alert(obj['reason']);
        }
        else
        {
            if (obj['rows'].length == 0)
            {
                alert("There is no batch file in database!");
            }
            else
            {
                if (action == "queryBats") {
                    $("#batch_table").empty();
                    var a = [];
                    var length = obj['rows'].length;
                    for (var i=0; i<length; i++) 
                    {  
                        a.push('<tr> <td style="display:none">' + obj['rows'][i].id + '</td>')  
                        a.push('<td style="display:none">' + obj['rows'][i].batch_id + '</td>')
                        a.push('<td style="width:5%">' +  obj['rows'][i].cmd_id + '</td>');
                        a.push('<td style="width:95%; word-wrap: break-word">' + obj['rows'][i].cmd + '</td></tr>');
                    }
                    document.getElementById("batch_table").innerHTML = a.join("");
                    
                }
                else if (action == "query" || action == "delete"){
                    var a = [];
                    batch_list = obj['rows'];
                    a.push('<option></option>');

                    for (var i=0; i<obj["rows"].length; i++) 
                    {  
                        a.push('<option value = "'+ i +'">' + batch_list[i].filename + '</option>');
                    }

                    $("#batch_file").empty();
                    document.getElementById("batch_file").innerHTML = a.join("");
                    if (action == "delete")
                        $("#batch_result").text("The batch file is deleted successfully!");
                }
                
              
            }  
        } 
    });

}


function batch_clearForm(){
    $("#batch_act").val("");
    $("#batch_file").val("");
    $("#batch_table").empty();
    $("#batch_id").val("");
    // $("#batch_table").empty();
}

function batch_displayTable(index){   
    var a = [];
    a.push('<tr> <td style="width:5%">' + batch_list[index].id + '</td>')  
    a.push('<td style="width:95%; word-wrap: break-word">' +  batch_list[index].content + '</td></tr>');
    document.getElementById("batch_table").innerHTML = a.join("");  
}
