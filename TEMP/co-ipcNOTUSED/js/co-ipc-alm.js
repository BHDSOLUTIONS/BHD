
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

// function clearAlmForm(){
//     $("#searchAlmAck").val("");
//     $("#searchAlmSa").val("");
//     $("#searchAlmDate").val("");
//     $("#searchAlmTime").val("");
//     $("#searchAlmSrc").val("");
//     $("#searchAlmType").val("");
//     $("#searchAlmCond").val("");
//     $("#searchAlmSev").val("");
// }

// $("#clrAlm").click(clearAlmForm);


$("#clrAlm").click(clearAlmForm);

function clearAlmForm(){
    $("#almRemark").val("");
    $("#almAct").val("");
}

$("#submitAlm").click(function(){
    
    if($("#almAct").val()=="ack"){
        queryAlm("ack");
    }else if($("#almAct").val()=="unack"){
        queryAlm("unack");
    }
})

// $("#nextFac").click(function(){
//     if(facTableIndex<maxFacTableIndex){
//         facTableIndex++;
//         displayFac(facTableIndex);
//     }  
// })

// $("#previousFac").click(function(){
//     if(facTableIndex>1){
//         facTableIndex--;
//         displayFac(facTableIndex);   
//     }         
// })







