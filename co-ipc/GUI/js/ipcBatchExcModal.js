

$("#batchExcModal").on("hidden.bs.modal", batchExcClearForm);

$("#batchExcModal_submit_btn").click(function(){
    batchExcModalAdd()
})

function batchExcModalAdd() {
 
    var file= document.getElementById('batchExcModal_file').files[0];
    if (file.size > 2097152) {
       $("#batchExcModal_result_lbl").text("The file should be lower than 2MB");
    }
    else {
       var data = new FormData();
       data.append("user","ninh")
       data.append("act","add")
       data.append("file",file)   


       $.ajax({
           url: "./php/coQueryBatch.php",
           type: "POST",
           data: data,
           processData: false,
           contentType: false,
       })
       .done(function(data, status){
            var obj = JSON.parse(data);
            if (obj["rslt"] == "fail") {
                alert(obj['reason']);
            }
            else {
                if (obj['rows'].length == 0) {
                    alert("There is no batch file in database!");
                }
                else {
                    var a = [];
                    batchExc_list = obj['rows'];
                    a.push('<option></option>');

                    for (var i=0; i<obj["rows"].length; i++) 
                    {  
                        a.push('<option value = "'+ i +'">' + batchExc_list[i].filename + '</option>');
                    }

                    $("#batchExc_file_sel").empty();
                    document.getElementById("batchExc_file_sel").innerHTML = a.join("");
                    $("#batchExcModal_result_lbl").text("The batch file is added successfully!");
                }  
            } 
       });

    }
}

function batchExcModalClearForm() {
    $("#batchExcModal_file").val("");
}

