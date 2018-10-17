
var cktArray;
var cktTableIndex;
var maxCktTableIndex;

var cktConArray;
var cktConTableIndex;
var maxCktConTableIndex;

//$('#cktcontbl').hide();

$("#searchCkt").click(function(){
    queryCkt('query');
});

$("#searchCktCon").click(function(){
    queryCktCon('query');
});

$("#prov_clrCkt").click(function(){
    clearCktForm();
    // clearCktConForm();
    clearCktConTable();
   
});


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

$(document).on("click","#prov_tableCkt tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
	$("#prov_ckt_id").val(dataRow[0]).change();
	$("#prov_ckid").val(dataRow[1]).change();
    $("#prov_cls").val(dataRow[2]).change();
    $("#prov_adsr").val(dataRow[3]).change();
    $("#prov_prot").val(dataRow[4]).change();
    $("#prov_ordno").val(dataRow[5]).change();
    $("#prov_mlo").val(dataRow[6]).change();
    $("#prov_cktcon_id").val(dataRow[8]).change();

    // Refresh cktcon_idx
    $("#prov_cktcon_idx").val("");
    $("#prov_cktcontbl").show();
    
    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
    
    if ($('#prov_cktcon_id').val() != "")
		queryCktcon($('#prov_cktcon_id').val());
		
});

$(document).on("click","#prov_tableCktCon tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
    $("#prov_cktcon_idx").val(dataRow[0]);
    $("#ctypModal4DisConn").val(dataRow[1]);
    $("#ffacModal4DisConn").val(dataRow[2]);
    $("#tfacModal4DisConn").val(dataRow[3]);
    

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$(document).on('mouseup', '[id = prov_cktAct]', function () {
    
    if ($("#prov_cktAct").val() == "NEW CKT") {
        
        //$("#checkProvInfor").text("");
        clearProvModalForm();
        $("#cktActModal").val($("#prov_cktAct").val());

        loadFacX();
        loadFacY();

        $("#ckidModal").prop("disabled",false),
        $("#clsModal").prop("disabled",false),
        $("#adsrModal").prop("disabled",false),
        $("#protModal").prop("disabled",false),
        $("#ordnoModal").prop("disabled",false),
        $("#mloModal").prop("disabled",false),

        $("#cktconModal").show()
        $("#cktconModal4DisConn").hide();
        $("#clrCktModal").show();

        $("#provModal").modal();
		
		clearCktForm();
        clearCktConForm();
        clearCktConTable();
        
    }
    else if($("#prov_cktAct").val() == "CONN"){
        //$("#checkProvInfor").text("");
        if(checkProvInfor4Conn()){
            clearProvModalForm();
            populateProvModal();
            loadFacX();
            loadFacY();

            $("#ckidModal").prop("disabled",true),
            $("#clsModal").prop("disabled",true),
            $("#adsrModal").prop("disabled",true),
            $("#protModal").prop("disabled",true),
            $("#ordnoModal").prop("disabled",false),
            $("#mloModal").prop("disabled",true),

            $("#cktconModal").show()
            $("#cktconModal4DisConn").hide();
            $("#clrCktModal").hide();

            $("#provModal").modal();
        }
        else{
            //$("#checkProvInfor").text("Missing CKT information!")
            alert ("Please select a CKT");
            $("#prov_cktAct").val("");
        }
        
    }
    else if($("#prov_cktAct").val() == "DISCONN"){
        //$("#checkProvInfor").text("");
        if(checkProvInfor4DisConn()){
            clearProvModalForm();
            populateProvModal();
            
            $("#ckidModal").prop("disabled",true),
            $("#clsModal").prop("disabled",true),
            $("#adsrModal").prop("disabled",true),
            $("#protModal").prop("disabled",true),
            $("#ordnoModal").prop("disabled",true),
            $("#mloModal").prop("disabled",true),
    
            $("#cktconModal").hide()
            $("#cktconModal4DisConn").show();
            $("#clrCktModal").hide();
    
            $("#provModal").modal();
        }
        else{
            //$("#checkProvInfor").html("Missing CKT information!<br>And a CKT connection must be chosed")
            alert("Please select a CKT CONNECTION");
            $("#prov_cktAct").val("");
            
        }
        
    }
   
})

/* Functions section */

function populateProvModal(){
    $("#ckidModal").val($("#prov_ckid").val()),
    $("#clsModal").val($("#prov_cls").val()),
    $("#adsrModal").val($("#prov_adsr").val()),
    $("#protModal").val($("#prov_prot").val()),
    $("#ordnoModal").val($("#prov_ordno").val()),
    $("#mloModal").val($("#prov_mlo").val()),
    // $("#ctypModal4DisConn").val($("#ctyp").val()),
    // $("#ffacModal4DisConn").val($("#ffac").val()),
    // $("#tfacModal4DisConn").val($("#tfac").val()),
    $("#cktActModal").val($("#cktAct").val())
}


function checkProvInfor4Conn(){
    if (($("#prov_ckt_id").val() != "") && ($("#prov_cktcon_id").val() != ""))
        return true;
    else
		return false;
}
function checkProvInfor4DisConn(){
    if (($("#prov_ckt_id").val() != "") && ($("#prov_cktcon_id").val() != "") && ($("#prov_cktcon_idx").val() != ""))
        return true;
    else
		return false;
}

function clearCktTable() {
	
    $("#prov_tableCkt").empty();
}

function clearCktConTable() {
    $("#prov_tableCktCon").empty();
    //$("#cktcontbl").hide();
}



function queryCkt(action) {
    
    $.post("./php/coQueryProv.php",
    {     
        act:	action,
        user:	"ninh",
        ckid:	$("#prov_ckid").val(),
        cls:	$("#prov_cls").val(),
        adsr:	$("#prov_adsr").val(),
        prot:	$("#prov_prot").val(),
        ordno:	$("#prov_ordno").val(),
        mlo:	$("#prov_mlo").val()
       
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


function queryCktcon(cktcon_id){
    
    $.post("./php/coQueryProv.php",
    {     
        act:	"queryCktcon",
        user:	"ninh",
        cktcon:	cktcon_id
        
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
                displayCktCon(cktConTableIndex);
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
            a.push('<tr> <td style="display:none">' + cktArray[i].id + '</td>');
            a.push('<td style="width:25%">' + cktArray[i].ckid + '</td>');
            a.push('<td style="width:10%">' +  cktArray[i].cls + '</td>');
            a.push('<td style="width:7%">' +  cktArray[i].adsr + '</td>');
            a.push('<td style="width:7%">' +  cktArray[i].prot + '</td>');
            a.push('<td style="width:20%">' +  cktArray[i].ordno + '</td>');
            a.push('<td style="width:7%">' +  cktArray[i].mlo + '</td>');
            a.push('<td style="width:24%">' +  cktArray[i].date + '</td>');
            a.push('<td style="display:none">' +  cktArray[i].cktcon + '</td></tr>');
            
        }
        document.getElementById("prov_tableCkt").innerHTML = a.join("");
        $("#indexCkt").text("From " + (startIndex+1) + " to " + stopIndex);
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
            a.push('<tr> <td style="width:10%">' + cktConArray[i].idx + '</td>')  
            a.push('<td style="width:20%">' +  cktConArray[i].ctyp + '</td>');
            a.push('<td style="width:35%">' +  cktConArray[i].ffac + '</td>');
            a.push('<td style="width:35%">' +  cktConArray[i].tfac + '</td><tr>');
        }
        document.getElementById("prov_tableCktCon").innerHTML = a.join("");
        //$("#indexCktCon").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function clearCktForm(){
    // $("#ck_id").val("").change();
    $("#prov_ckid").val("").change();
    $("#prov_cls").val("").change();
    $("#prov_adsr").val("").change();
    $("#prov_prot").val("").change();
    $("#prov_ordno").val("").change();
    $("#prov_mlo").val("").change();
    $("#prov_cktAct").val("");
    $("#prov_ckt_id").val("").change();
    $("#prov_cktcon_id").val("").change();
    $("#prov_cktcon_idx").val("").change();
	clearCktConTable();
}

function clearCktConForm(){

    $("#ctyp").val("").change();
    $("#ffac").val("").change();
    $("#tfac").val("").change();
    
}






