
var cktArray;
var cktTableIndex;
var maxCktTableIndex;

var cktConArray;
var cktConTableIndex;
var maxCktConTableIndex;


$("#submitCkt").click(function(){
    if($("#cktAct").val()=="New CKT"){
        provNewCkt();
    } else if($("#cktAct").val()=="Connect"){
        provConnect();
    } else if($("#cktAct").val()=="Disconnect"){
        provDisconnect();
    }
    $("#cktAct").val("");
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
    clearCktConTable();
    $('#ckt_id').val("");
    $('#cktcon_id').val("");
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

$(document).on("click","#tableCkt tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
	$("#ckt_id").val(dataRow[0]).change();
	$("#ckid").val(dataRow[1]).change();
    $("#cls").val(dataRow[2]).change();
    $("#adsr").val(dataRow[3]).change();
    $("#prot").val(dataRow[4]).change();
    $("#ordno").val(dataRow[5]).change();
    $("#mlo").val(dataRow[6]).change();
    $("#cktcon_id").val(dataRow[8]).change();
    
    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
    
    loadFacX();
    loadFacY();
    
    if ($('#cktcon_id').val() != "")
		queryCktcon($('#cktcon_id').val());
		
});

$(document).on("click","#tableCktCon tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
    $("#ctyp").val(dataRow[1]).change();
    $("#ffac").val(dataRow[2]).change();
    $("#tfac").val(dataRow[3]).change();
    

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});



/* Functions section */



function provNewCkt() {
	
    $.post("./php/coQueryProv.php",
    {     
        act:	"provNewCkt",
        user:	"ninh",
        ckid:	$("#ckid").val(),
        cls:	$("#cls").val(),
        adsr:	$("#adsr").val(),
        prot:	$("#prot").val(),
        ordno:	$("#ordno").val(),
        mlo:	$("#mlo").val(),
        ctyp:	$("#ctyp").val(),
        ffac:	$("#ffac").val(),
        tfac:	$("#tfac").val()
       
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


function clearCktTable() {
	
    $("#tableCkt").empty();
}

function clearCktConTable() {
    $("#tableCktCon").empty();        
}

function loadFacX() {
	
	$.post("./php/coQueryProv.php",
	{
		act:	"queryFacX",
		user:	"ninh"
	},
	function (data, status) {
		var obj = JSON.parse(data);
		if (obj["rslt"] == "fail") {
			alert(obj["reason"]);
		}
		else {
			var a = [];
			for (var i=0; i<obj["rows"].length; i++) {  
				a.push('<option>' + obj["rows"][i].fac + '</option>');
            }
		}
        document.getElementById("ffac").innerHTML = a.join("");
	});
}


function loadFacY() {
	
	$.post("./php/coQueryProv.php",
	{
		act:	"queryFacY",
		user:	"ninh"
	},
	function (data, status) {
		var obj = JSON.parse(data);
		if (obj["rslt"] == "fail") {
			alert(obj["reason"]);
		}
		else {
			var a = [];
			for (var i=0; i<obj["rows"].length; i++) {  
				a.push('<option>' + obj["rows"][i].fac + '</option>');
            }
		}
        document.getElementById("tfac").innerHTML = a.join("");
	});
}


function queryCkt(action) {
    
    $.post("./php/coQueryProv.php",
    {     
        act:	action,
        user:	"ninh",
        ckid:	$("#ckid").val(),
        cls:	$("#cls").val(),
        adsr:	$("#adsr").val(),
        prot:	$("#prot").val(),
        ordno:	$("#ordno").val(),
        mlo:	$("#mlo").val()
       
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
        document.getElementById("tableCkt").innerHTML = a.join("");
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
        document.getElementById("tableCktCon").innerHTML = a.join("");
        //$("#indexCktCon").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


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
    $("#ffac").val("").change();
    $("#tfac").val("").change();
    
    $("#cktAct").val("");
}





