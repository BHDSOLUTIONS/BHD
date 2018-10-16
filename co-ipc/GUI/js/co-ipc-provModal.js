

$("#submitCktModal").click(function(){
    if ($("#cktActModal").val()=="NEW CKT") {
        //if(checkNewCktInfor())
            provNewCkt();
        //else 
		//	$("#resultProvModal").text("Not enough CKT information!")
    }
    else if ($("#cktActModal").val()=="CONN") {
        //if(checkMapCktInfor())
            provCktcon("provConnect");
        //else 
		//	$("#resultProvModal").text("Not enough FAC information!")
    } 
    else if ($("#cktActModal").val()=="DISCONN") {
        provCktcon("provDisconnect");
    }
    // $("#cktAct").val("");
})


$("#clrCktModal").click(clearProvModalForm);

function checkNewCktInfor(){
    if(($("#ckidModal").val() != "")&&
    ($("#clsModal").val() != "")&&
    ($("#protModal").val() != "")&&
    ($("#ordnoModal").val() !="")&&
    ($("#mloModal").val() != "")&&
    ($("#ctypModal").val() != "")&&
    ($("#ffacModal").val() != "")&&
    ($("#tfacModal").val() != ""))
        return true;
    else return false;
}
function checkMapCktInfor(){
    if(($("#ctypModal").val() != "")&&
    ($("#ffacModal").val() != "")&&
    ($("#tfacModal").val() != ""))
        return true;
    else return false;
}

function clearProvModalForm(){
    $("#ckidModal").val("");
    $("#clsModal").val("");
    $("#adsrModal").val("");
    $("#protModal").val("");
    $("#ordnoModal").val("");
    $("#mloModal").val("");
    $("#ctypModal").val("");
    $("#ffacModal").val("");
    $("#tfacModal").val("");
    $("#resultProvModal").text("");
    
}


function provNewCkt() {
	
    $.post("./php/coQueryProv.php",
    {     
        act:	"provNewCkt",
        user:	"ninh",
        ckid:	$("#ckidModal").val(),
        cls:	$("#clsModal").val(),
        adsr:	$("#adsrModal").val(),
        prot:	$("#protModal").val(),
        ordno:	$("#ordnoModal").val(),
        mlo:	$("#mloModal").val(),
        ctyp:	$("#ctypModal").val(),
        ffac:	$("#ffacModal").val(),
        tfac:	$("#tfacModal").val()
       
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            //$("#resultProvModal").text(obj['reason']);
            alert(obj['reason']);
        }else{
            //if(obj['rows'].length==0){
            //   $("#resultProvModal").text("There is no matching data!");
            //}
            //else{
                cktTableIndex=0;
                cktArray = obj['rows'];
                var len = cktArray.length; 
                maxCktTableIndex = Math.ceil(len/100.0);
                cktTableIndex++;
                displayCkt(cktTableIndex);
                $("#resultProvModal").text(obj["rslt"]);
            //}  
        } 
    });
}


function provCktcon(action) {
	
	var ctyp = $("#ctypModal").val();
	if (action == "provDisconnect")
		ctyp = $("#ctypModal4DisConn").val();
		
    $.post("./php/coQueryProv.php",
    {     
        act:	action,
        user:	"ninh",
        ckt_id:	$("#ckt_id").val(),
        ckid:	$("#ckidModal").val(),
        cls:	$("#clsModal").val(),
        adsr:	$("#adsrModal").val(),
        prot:	$("#protModal").val(),
        ordno:	$("#ordnoModal").val(),
        cktcon: $("#cktcon_id").val(),
        idx:	$("#cktcon_idx").val(),
        mlo:	$("#mloModal").val(),
        ctyp:	ctyp,
        ffac:	$("#ffacModal").val(),
        tfac:	$("#tfacModal").val()
       
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            //$("#resultProvModal").text(obj['reason']);
            alert(obj["reason"]);
        }else{
            //if(obj['rows'].length==0){
                //$("#resultProvModal").text("There is no matching data!");
            //}
            //else{
                cktConTableIndex=0;
                cktConArray = obj['rows'];
                var len = cktConArray.length; 
                maxCktConTableIndex = Math.ceil(len/100.0);
                cktConTableIndex++;
                displayCktCon(cktConTableIndex);
                $("#resultProvModal").text(obj["rslt"]);
            //}  
        } 
    });
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
            a.push('<option></option>');
			for (var i=0; i<obj["rows"].length; i++) {  
				a.push('<option>' + obj["rows"][i].fac + '</option>');
            }
            $("#ffacModal").empty();
            document.getElementById("ffacModal").innerHTML = a.join("");
		}
        
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
            a.push('<option></option>');
			for (var i=0; i<obj["rows"].length; i++) {  
				a.push('<option>' + obj["rows"][i].fac + '</option>');
            }
            $("#tfacModal").empty();
            document.getElementById("tfacModal").innerHTML = a.join("");
		}
       
	});
}



