
var cktArray;
var cktTableIndex;
var maxCktTableIndex;

var cktConArray;
var cktConTableIndex;
var maxCktConTableIndex;


function clearCktTable() {
    $("#tableCkt").empty();
}
function clearCktConTable() {
    $("#tableCktCon").empty();
}

$(document).on("click","#tableCkt tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
    $("#ckid").val(dataRow[1]).change();
    $("#cls").val(dataRow[2]).change();
    $("#adsr").val(dataRow[3]).change();
    $("#prot").val(dataRow[4]).change();
    $("#ordno").val(dataRow[5]).change();
    $("#mlo").val(dataRow[0]).change();

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});

$(document).on("click","#tableCktCon tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
    $("#ctyp").val(dataRow[1]).change();
    $("#facx").val(dataRow[2]).change();
    $("#facy").val(dataRow[3]).change();
    

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});



function queryCkt(action){
    
    $.post("./php/coQueryCkt.php",
    {     
        act:action,
        user:"ninh",
        ckid:$("#ckid").val(),
        cls:$("#cls").val(),
        adsr:$("#adsr").val(),
        prot:$("#prot").val(),
        ordno:$("#ardno").val(),
        mlo:$("#mlo").val(),
       
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
                cktTableIndex=0;
                cktArray = obj['rows'];
                var len = cktArray.length; 
                maxCktTableIndex = Math.ceil(len/100.0);
                cktTableIndex++;
                displayCkt(cktTableIndex);
                // if(action=="add") alert("Facility is added successfully!");
                // else if(action=="del") alert("Facility is deleted successfully!");
                // else if(action=="upd") alert("Facility is updated successfully!");
            }  
        } 
    });
}


function queryCktCon(action){
    
    $.post("./php/coQueryCkt.php",
    {     
        act:action,
        user:"ninh",
        ctyp:$("#ctyp").val(),
        fp_id:$("#facx").val(),
        tp_id:$("#facy").val()
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
                cktConTableIndex=0;
                cktConArray = obj['rows'];
                var len = cktConArray.length; 
                maxCktConTableIndex = Math.ceil(len/100.0);
                cktConTableIndex++;
                displayFac(cktConTableIndex);
                // if(action=="add") alert("Facility is added successfully!");
                // else if(action=="del") alert("Facility is deleted successfully!");
                // else if(action=="upd") alert("Facility is updated successfully!");
            }  
        } 
    });
}

function displayCkt(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = cktArray.length;

    if(len>=startIndex){
        if(len < stopIndex)
            stopIndex=len;            
        clearCktTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) {  
            a.push('<tr> <td style="display:none">' + cktArray[i].id + '</td>')  
            a.push('<td style="width:40%">' + cktArray[i].ckid + '</td>');
            a.push('<td style="width:10%">' +  cktArray[i].cls + '</td>');
            a.push('<td style="width:10%">' +  cktArray[i].adsr + '</td>');
            a.push('<td style="width:17%">' +  cktArray[i].prot + '</td>');
            a.push('<td style="width:20%">' +  cktArray[i].ordno + '</td>');
            a.push('<td style="width:20%">' +  cktArray[i].date + '</td></tr>');
        }
        document.getElementById("tableCkt").innerHTML = a.join("");
        $("#indexCkt").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}
function displayCktCon(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = cktConArray.length;

    if(len>=startIndex){
        if(len < stopIndex)
            stopIndex=len;            
        clearCktConTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) {  
            a.push('<tr> <td style="display:none">' + cktConArray[i].id + '</td>')  
            a.push('<td style="width:20%">' + cktConArray[i].cktcon + '</td>');
            a.push('<td style="width:20%">' +  cktConArray[i].ctyp + '</td>');
            a.push('<td style="width:30%">' +  cktConArray[i].fp_id + '</td>');
            a.push('<td style="width:30%">' +  cktConArray[i].tp_id + '</td><tr>');

        }
        document.getElementById("tableCktCon").innerHTML = a.join("");
        $("#indexCktCon").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}

$("#nextCkt").click(function(){
    if(cktTableIndex<maxCktTableIndex){
        cktTableIndex++;
        displayCkt(cktTableIndex);
    }  
})

$("#previousCkt").click(function(){
    if(cktTableIndex>1){
        cktTableIndex--;
        displayCkt(cktTableIndex);   
    }         
})

$("#nextCktCon").click(function(){
    if(cktConTableIndex<maxCktConTableIndex){
        cktConTableIndex++;
        displayCktCon(cktConTableIndex);
    }  
})

$("#previousCktCon").click(function(){
    if(cktConTableIndex>1){
        cktConTableIndex--;
        displayCktCon(cktConTableIndex);   
    }         
})


$("#searchCkt").click(function(){
    queryCkt('query');
});
$("#searchCktCon").click(function(){
    queryCktCon('query');
});


$("#clrCkt").click(function(){
    clearCktForm();
    clearCktConForm();
});

function clearCktForm(){
    // $("#ck_id").val("").change();
    $("#ckid").val("").change();
    $("#cls").val("").change();
    $("#adsr").val("").change();
    $("#prot").val("").change();
    $("#ordno").val("").change();
    $("#mlo").val("").change();


    $("#cktAct").val("");
}

function clearCktConForm(){
    $("cktcon_id").val("").change();
    $("#cktcon").val("").change();
    $("#ctyp").val("").change();
    $("#facx").val("").change();
    $("#facy").val("").change();
    
    $("#cktAct").val("");
}

$("#submitCkt").click(function(){
    if($("#cktAct").val()=="New CKT"){
        queryFac('newckt');
    } else if($("#cktAct").val()=="Connect"){
        queryFac('con');
    } else if($("#cktAct").val()=="Dis-connect"){
        queryFac('discon');
    }
    $("#cktAct").val("");
})






