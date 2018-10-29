
$("#provModal").on("hidden.bs.modal", provModal_clearForm);

// ---------------------------Click Events-----------------------

$("#provModal_submit").click(function(){
    if ($("#provModal_act").val() == "NEW CKT") 
    {
        provModal_newCkt();
    }
    else if ($("#provModal_act").val() == "CONN") 
    {
        provModal_cktCon("provConnect");
    } 
    else if ($("#provModal_act").val() == "DISCONN") 
    {
        provModal_cktCon("provDisconnect");
    }
})


$("#provModal_clear").click(provModal_clearForm);


// -------------------------Functions-------------------

function provModal_clearForm(){
    $("#provModal_ckid").val("");
    $("#provModal_ckid").prop("disabled",false);
    $("#provModal_cls").val("");
    $("#provModal_cls").prop("disabled",false);
    $("#provModal_adsr").val("");
    $("#provModal_adsr").prop("disabled",false);
    $("#provModal_prot").val("");
    $("#provModal_prot").prop("disabled",false);
    $("#provModal_ordno").val("");
    $("#provModal_ordno").prop("disabled",false);
    $("#provModal_mlo").val("");
    $("#provModal_mlo").prop("disabled",false);
    $("#provModal_ctyp").val("");
    $("#provModal_ctyp").prop("disabled",false);
    $("#provModal_ffac").val("");
    $("#provModal_ffac").prop("disabled",false);
    $("#provModal_tfac").val("");
    $("#provModal_tfac").prop("disabled",false);
    $("#provModal_discCtyp").val("");
    $("#provModal_discFfac").val("");
    $("#provModal_discTfac").val("");
    $("#provModal_result").text("");
}


function provModal_newCkt() {
	
    $.post("./php/coQueryProv.php",
    {     
        act:	"provNewCkt",
        user:	$('#main_currentUser').text(),
        ckid:	$("#provModal_ckid").val(),
        cls:	$("#provModal_cls").val(),
        adsr:	$("#provModal_adsr").val(),
        prot:	$("#provModal_prot").val(),
        ordno:	$("#provModal_ordno").val(),
        mlo:	$("#provModal_mlo").val(),
        ctyp:	$("#provModal_ctyp").val(),
        ffac:	$("#provModal_ffac").val(),
        tfac:	$("#provModal_tfac").val(),
        ckt_id:	$("#prov_ckt_id").val(),
        cktcon: $("#prov_cktcon_id").val(),
        idx:	$("#prov_cktcon_idx").val()
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail"){
            //$("#provModal_result").text(obj['reason']);
            alert(obj['reason']);
        }
        else
        {
            prov_tableCktIndex=0;
            prov_tableCkt = obj['rows'];
            var len = prov_tableCkt.length; 
            prov_maxTableCktIndex = Math.ceil(len/100.0);
            prov_tableCktIndex++;
            prov_displayTableCkt(prov_tableCktIndex);
            $("#provModal_result").text(obj["rslt"]);
        } 
    });
}


function provModal_cktCon(action) {
	
	if (action == "provConnect") {
		ctyp = $('#provModal_ctyp').val();
		ffac = $('#provModal_ffac').val();
		tfac = $('#provModal_tfac').val();
	}
	else {
		ctyp = $('#provModal_discCtyp').val();
		ffac = $('#provModal_discFfac').val();
		tfac = $('#provModal_discTfac').val();
	}
	
	$.post("./php/coQueryProv.php",
    {     
        act:	action,
        user:	$('#main_currentUser').text(),
        ckid:	$("#provModal_ckid").val(),
        cls:	$("#provModal_cls").val(),
        adsr:	$("#provModal_adsr").val(),
        prot:	$("#provModal_prot").val(),
        ordno:	$("#provModal_ordno").val(),
        mlo:	$("#provModal_mlo").val(),
        ctyp:	ctyp,
        ffac:	ffac,
        tfac:	tfac,
		ckt_id:	$("#prov_ckt_id").val(),
        cktcon: $("#prov_cktcon_id").val(),
        idx:	$("#prov_cktcon_idx").val()
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail")
        {
            alert(obj["reason"]);
        }
        else
        {
			$("#provModal_result").text(obj["rslt"]);
            if (obj["rows"].length > 0) {
				prov_tableCktConIndex = 0;
				prov_tableCktCon = obj['rows'];
				var len = prov_tableCktCon.length; 
				maxCktConTableIndex = Math.ceil(len/100.0);
				prov_tableCktConIndex++;
				prov_displayTableCktCon(prov_tableCktConIndex);
			}
			else {
				provModal_clearForm();
				prov_queryCkt('query');
			}
			$('#prov_act').val("");
        } 
    });
}


function provModal_loadFacX() {
	
	$.post("./php/coQueryProv.php",
	{
		act:	"queryFacX",
        user:	$('#main_currentUser').text()
	},
	function (data, status) {
		var obj = JSON.parse(data);
		if (obj["rslt"]  ==  "fail") {
			alert(obj["reason"]);
		}
        else 
        {
            var a = [];
            a.push('<option></option>');

            for (var i=0; i<obj["rows"].length; i++) 
            {  
				a.push('<option>' + obj["rows"][i].fac + '</option>');
            }

            $("#provModal_ffac").empty();
            document.getElementById("provModal_ffac").innerHTML = a.join("");
		}
        
	});
}


function provModal_loadFacY() {
	
	$.post("./php/coQueryProv.php",
	{
		act:	"queryFacY",
        user:	$('#main_currentUser').text()
	},
	function (data, status) {
		var obj = JSON.parse(data);
        if (obj["rslt"]  ==  "fail") 
        {
			alert(obj["reason"]);
		}
        else 
        {
            var a = [];
            a.push('<option></option>');
            for (var i=0; i<obj["rows"].length; i++) 
            {  
				a.push('<option>' + obj["rows"][i].fac + '</option>');
            }
            $("#provModal_tfac").empty();
            document.getElementById("provModal_tfac").innerHTML = a.join("");
		}
       
	});
}



