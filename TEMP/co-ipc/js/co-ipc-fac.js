
var facArray;
var facTableIndex;
var maxFacTableIndex;


function clearFacTable() {
    $("#tableFac").empty();
}
$(document).on("click","#tableFac tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
    $("#fac").val(dataRow[1]).change();
    $("#sel-ftyp").val(dataRow[2]).change();
    $("#sel-ort").val(dataRow[3]).change();
    $("#sel-spcfnc").val(dataRow[4]).change();
    $("#portInfo").val(dataRow[5]).change();
    $("#fac_id").val(dataRow[0]).change();

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});




function queryFac(action){
    
    $.post("./php/coQueryFac.php",
    {     
        act:action,
        fac:$("#fac").val(),
        ftyp:$("#sel-ftyp option:selected").text(),
        ort:$("#sel-ort option:selected").text(),
        spcfnc:$("#sel-spcfnc option:selected").text()
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
                facTableIndex=0;
                facArray = obj['rows'];
                var len = facArray.length; 
                maxFacTableIndex = Math.ceil(len/100.0);
                facTableIndex++;
                displayFac(facTableIndex);
                if(action=="add") alert("Facility is added successfully!");
                else if(action=="del") alert("Facility is deleted successfully!");
                else if(action=="upd") alert("Facility is updated successfully!");
            }  
        } 
    });
}

function displayFac(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = facArray.length;

    if(len>=startIndex){
        if(len < stopIndex)
            stopIndex=len;            
        clearFacTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) {  
            a.push('<tr> <td style="display:none">' + facArray[i].id + '</td>')  
            a.push('<td style="width:40%">' + facArray[i].fac + '</td>');
            a.push('<td style="width:10%">' +  facArray[i].ftyp + '</td>');
            a.push('<td style="width:10%">' +  facArray[i].ort + '</td>');
            a.push('<td style="width:17%">' +  facArray[i].spcfnc + '</td>');
            a.push('<td style="width:20%">' +  facArray[i].port + '</td></tr>');
        }
        document.getElementById("tableFac").innerHTML = a.join("");
        $("#indexFac").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}

$("#nextFac").click(function(){
    if(facTableIndex<maxFacTableIndex){
        facTableIndex++;
        displayFac(facTableIndex);
    }  
})

$("#previousFac").click(function(){
    if(facTableIndex>1){
        facTableIndex--;
        displayFac(facTableIndex);   
    }         
})

$("#searchFac").click(function(){
    queryFac('query');
});

$("#clrFac").click(clearFacForm);

function clearFacForm(){
    $("#fac").val("").change();
    $("#sel-ftyp").val("").change();
    $("#sel-ort").val("").change();
    $("#sel-spcfnc").val("").change();
    $("#portInfo").val("").change();
    $("#fac_id").val("").change();
    $("#facAction").val("");
}

$("#submitFac").click(function(){
    if($("#facAction").val()=="Add"){
        queryFac('add');
    } else if($("#facaction").val()=="Update"){
        queryFac('upd');
    } else if($("#facaction").val()=="Delete"){
        queryFac('del');
    }
    $("#facAction").val("");
})






