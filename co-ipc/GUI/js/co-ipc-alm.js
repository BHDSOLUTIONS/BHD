
var almArray;
var almTableIndex;
var maxAlmTableIndex;
   
function clearAlmTable() {
    $("#tableAlm").empty();
}
$(document).on("click","#tableAlm tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    $("#alm_id").val(dataRow[0]);
    $("#almId").val(dataRow[1]);
    $("#almAck").val(dataRow[2]);

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


function queryAlm(action){
    
    $.post("./php/coQueryAlm.php",
    {     
        act:action,
        user:"ninh",
        id:$("#alm_id").val(),
        ack : $("#almAck").val(),
        almid : $("#almId").val(),
        remark : $("#almRemark").val() 
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            alert(obj['reason']);
        }else{
            if(obj['rows'].length==0){
                alert("There is no matching data!");
            }
            else{
                almTableIndex=0;
                almArray = obj['rows'];
                var len = almArray.length; 
                maxAlmTableIndex = Math.ceil(len/100.0);
                almTableIndex++;
                displayAlm(almTableIndex);

            }  
        } 
    });
}

function displayAlm(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = almArray.length;

    if(len>=startIndex){
        if(len < stopIndex)
            stopIndex=len;            
        clearAlmTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) {  
            a.push('<tr> <td style="display:none">' + almArray[i].id + '</td>')  
            a.push('<td style="width:10%">' + almArray[i].almid + '</td>');
            a.push('<td style="width:15%">' +  almArray[i].ack + '</td>');
            a.push('<td style="width:5%">' +  almArray[i].sa + '</td>');
            a.push('<td style="width:25%">' +  almArray[i].datetime + '</td>');
            a.push('<td style="width:10%">' +  almArray[i].src + '</td>');
            a.push('<td style="width:10%">' +  almArray[i].type + '</td>');
            a.push('<td style="width:15%">' +  almArray[i].cond + '</td>');
            if( almArray[i].sev == "MIN")
                a.push('<td style="width:10%;background-color:yellow">' +  almArray[i].sev + '</td></tr>');
            else if(almArray[i].sev == "MAJ")
                a.push('<td style="width:10%;background-color:orange">' +  almArray[i].sev + '</td></tr>');
            else if(almArray[i].sev == "CRI")
                a.push('<td style="width:10%;background-color:red">' +  almArray[i].sev + '</td></tr>');
            else if(almArray[i].sev == "NONE")
                a.push('<td style="width:10%;background-color:green">' +  almArray[i].sev + '</td></tr>');
        }
        document.getElementById("tableAlm").innerHTML = a.join("");
        $("#indexAlm").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


$("#clrAlm").click(clearAlmForm);

function clearAlmForm(){
    $("#alm_id").val("");
    $("#almRemark").val("");
    $("#almAct").val("");
    $("#checkAlmInfor").text("");
}



$("#nextAlm").click(function(){
    if(almTableIndex<maxAlmTableIndex){
        almTableIndex++;
        displayAlm(almTableIndex);
    }  
})

$("#previousAlm").click(function(){
    if(almTableIndex>1){
        almTableIndex--;
        displayAlm(almTableIndex);   
    }         
})

$(document).on('mouseup', '[id *= almAct]', function () {
    if($("#almAct").val() == "ACK"){
        $("#checkAlmInfor").text("");
        if(checkAlmInfor4Ack()){
            clearAlmModalForm();
            populateAlmModal();
            $("#almModal").modal();
        }
        else $("#checkAlmInfor").html("Missing alarm information! <br> Or alarm was already acknowledged!")
    }
    else if($("#almAct").val() == "UN-ACK"){
        $("#checkAlmInfor").text("");
        if(checkAlmInfor4UnAck()){
            clearAlmModalForm();
            populateAlmModal();
            $("#almModal").modal();
        }
        else $("#checkAlmInfor").html("Missing alarm information! <br> Or alarm has not been acknowledged yet!")
    }
    else if($("#almAct").val() == "CLR"){
        $("#checkAlmInfor").text("");
        if($("#almId").val() != ""){
            clearAlmModalForm();
            populateAlmModal();
            $("#almModal").modal();
        }
        else $("#checkAlmInfor").html("Missing alarm information!")
    }
})

function populateAlmModal(){
    $("#almIdModal").val($("#almId").val())
    $("#almAckModal").val($("#almAck").val())
    $("#almActModal").val($("#almAct").val())
}

function checkAlmInfor4Ack(){
    if(($("#almId").val() != "")&&($("#almAck").val() == "")){
        return true;
    }
    else return false;
}
function checkAlmInfor4UnAck(){
    if(($("#almId").val() != "")&&($("#almAck").val() == "ACK")){
        return true;
    }
    else return false;
}

