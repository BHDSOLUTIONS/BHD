
var batchExc_list = [];
// ----------------------Click Events-----------------------------

$(document).on("click","#batchExc_tbl tr",function() {            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});




$(document).on('mouseup', '[id = batchExc_act_sel]', function () {
    if ($("#batchExc_act_sel").val() !="") {
        // batchExcModalClearForm();   
        if ($("#batchExc_act_sel").val()  ==  "UPLOAD") {
            batchExcModalClearForm();
            // $("#batchExcModal").modal();
            $('#batchExcModal').modal();
            
        }
        else if ($("#batchExc_act_sel").val()  ==  "DELETE") {
            if ($("#batchExc_id_num").val() != "") {
                batchExcQuery('delete');
            }
            else {
                alert("No information of the batch file picked!")
            }
            
            batchExcClearForm();
        }
        
    }

})

$("#batchExc_file_sel").change(function() {
    if (batchExc_list.length > 0) {
		var index = $("#batchExc_file_sel").val();
		$("#batchExc_id_num").val(batchExc_list[index].id);
		batchExcQuery("queryBats");
	}
    // batchExcDisplayTable(index);
})

// -------------------Functions-------------------------------------

function batchExcQuery(action){

    $.ajax({
        url: "./php/coQueryBatch.php",
        type: "POST",
        data: {
            user: 'ninh',
            act: action,
            id:  $("#batchExc_id_num").val()
        },
    })
    .done(function(data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (action == "queryBats") {
                $("#batchExc_tbl").empty();
                var a = [];
                var length = obj['rows'].length;
                for (var i=0; i<length; i++) 
                {  
                    a.push('<tr> <td style="display:none">' + obj['rows'][i].id + '</td>')  
                    a.push('<td style="display:none">' + obj['rows'][i].batchExc_id_num + '</td>')
                    a.push('<td style="width:5%">' +  obj['rows'][i].cmd_id + '</td>');
                    a.push('<td style="width:95%; word-wrap: break-word">' + obj['rows'][i].cmd + '</td></tr>');
                }
                document.getElementById("batchExc_tbl").innerHTML = a.join("");
                
            }
            else if (action == "query" || action == "delete") {
                var a = [];
                batchExc_list = obj['rows'];
                a.push('<option>Select a batch file</option>');

                for (var i=0; i<obj["rows"].length; i++) 
                {  
                    a.push('<option value = "'+ i +'">' + batchExc_list[i].filename + '</option>');
                }

                $("#batchExc_file_sel").empty();
                document.getElementById("batchExc_file_sel").innerHTML = a.join("");
                if (action == "delete") {
                    $("#batchExc_result_lbl").text("The batch file is deleted successfully!");
                }
            }
  
        } 
    });

}


function batchExcClearForm(){
    $("#batchExc_act_sel").val("");
    $("#batchExc_file_sel").val("");
    $("#batchExc_tbl").empty();
    $("#batchExc_id_num").val("");
    $("#batchExc_result_lbl").text("");
    // $("#batchExc_tbl").empty();
}

function batchExcDisplayTable(index){   
    var a = [];
    a.push('<tr> <td style="width:5%">' + batchExc_list[index].id + '</td>')  
    a.push('<td style="width:95%; word-wrap: break-word">' +  batchExc_list[index].content + '</td></tr>');
    document.getElementById("batchExc_tbl").innerHTML = a.join("");  
}
