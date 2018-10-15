// ----------------PORTMODAL---------------------------------------------
var facPortModalArray;
var facTablePortModalIndex;
var maxFacTablePortModalIndex;

$("#submitPortModal").click(function(){
    if($("#portActModal").val()=="MAP"){
        queryPortModal('map');
    } else if($("#portActModal").val()=="UN-MAP"){
        queryPortModal('unmap');
    } 
})

$(document).on("click","#tableFacPortModal tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text(); 
    }).get();
    
    //Populate the information 
    $("#facPort_id").val(dataRow[0]).change();
    $("#facPortModal").val(dataRow[1]).change();
    $("#ftypPortModal").val(dataRow[2]).change();

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
    
});

function clearPortModalForm(){
    $("#nodeModal").val("").change();
    $("#slotModal").val("").change();
    $("#pnumModal").val("").change();
    $("#ptypModal").val("").change();
    $("#pstaModal").val("").change();
    $("#facPortModal").val("");
    $("#ftypPortModal").val("");
    
    $("#tableFacPortModal").empty();
    $("#resultPortModal").text("");
}


function queryPortModal(action) {

    $.post("./php/coQueryPort.php",
    {
        act:	action,
        user:	"ninh",
        node:	$("#nodeModal").val(),
        slot:	$("#slotModal").val(),
        pnum:	$("#pnumModal").val(),
        ptyp:	$("#ptypModal").val(),
        psta:	$("#pstaModal").val(),
        fac:	$("#facPortModal").val(),
        fac_id:	$("#facPort_id").val(),
        port_id:$("#port_id").val(),
        ckt:    ""
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            $("#resultPortModal").text(obj['reason']);
        }else{
            if(obj['rows'].length==0){
                $("#resultPortModal").text("There is no matching data!");
            }
            else{
                portTableIndex=0;
                portArray = obj["rows"];
                var len = portArray.length; 
                maxPortTableIndex = Math.ceil(len/100.0);
                portTableIndex++;
                
                displayPort(portTableIndex);
                if(action=="map") $("#resultPortModal").text("Port is mapped successfully!");
                else if(action=="unmap") $("#resultPortModal").text("Port is unmapped successfully!");
            }
            
        }
    });
}

$("#findFacPortModal").click(queryFacPortModal);

function queryFacPortModal(){
    $.post("./php/coQueryFac.php",
    {    
        user:   "ninh", 
        act:    'query',

        fac_id: "",
        fac:    $("#facPortModal").val(),
        ftyp:   $("#ftypPortModal").val(),
        ort:    "",
        spcfnc: ""
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            $("#resultPortModal").text(obj['reason']);
        }else{
            if(obj['rows'].length==0){
                $("#resultPortModal").text("There is no matching data!");
            }
            else{
                facPortModalArray=[]
                facTablePortModalIndex=0;
                var len = obj['rows'].length; 

                //Filter only FAC with no Port
                for(var i=0;i<len;i++){
                    if(obj['rows'][i].port =="")
                    facPortModalArray.push(obj['rows'][i]);  
                }
                maxFacTablePortModalIndex = Math.ceil(len/100.0);
                facTablePortModalIndex++;           
                displayFacPortModal(facTablePortModalIndex);
             
            }  
        } 
    });
}

function displayFacPortModal(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = facPortModalArray.length;

    if(len>=startIndex){
        if(len < stopIndex)
            stopIndex=len;            
        clearFacTablePortModal();
        var a = [];
        for (var i=0; i<stopIndex; i++) {  
            a.push('<tr> <td style="display:none">' + facPortModalArray[i].id + '</td>')  
            a.push('<td style="width:40%">' + facPortModalArray[i].fac + '</td>');
            a.push('<td style="width:10%">' +  facPortModalArray[i].ftyp + '</td>');
            a.push('<td style="width:10%">' +  facPortModalArray[i].ort + '</td>');
            a.push('<td style="width:17%">' +  facPortModalArray[i].spcfnc + '</td>');
            a.push('<td style="width:20%">' +  facPortModalArray[i].port + '</td></tr>');
        }
        document.getElementById("tableFacPortModal").innerHTML = a.join("");
        $("#indexFacPortModal").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}

function clearFacTablePortModal(){
    $("#tableFacPortModal").empty();
}