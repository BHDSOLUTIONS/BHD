

$("#batchModal").on("hidden.bs.modal", batch_clearForm);

$("#batchModal_submit").click(function(){
    batchModal_addBatch("add")
})

function batchModal_addBatch(action){
 
    var file= document.getElementById('batchModal_file').files[0];
    if (file.size > 2097152)
    {
       $("#batchModal_result").text("The file should be lower than 2MB");
    }
    else {
       var data = new FormData();
       data.append("user","ninh")
       data.append("act",action)
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
                    var a = [];
                    batch_list = obj['rows'];
                    a.push('<option></option>');

                    for (var i=0; i<obj["rows"].length; i++) 
                    {  
                        a.push('<option value = "'+ i +'">' + batch_list[i].filename + '</option>');
                    }

                    $("#batch_file").empty();
                    document.getElementById("batch_file").innerHTML = a.join("");
                    $("#batchModal_result").text("The batch file is added successfully!");
                }  
            } 
       });

    }
}

function batchModal_clearForm()
{
    $("#batchModal_file").val("");
}

