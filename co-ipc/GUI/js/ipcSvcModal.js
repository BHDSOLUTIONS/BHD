
$("#svcModal").on("hidden.bs.modal", svcModalClearForm);

// ---------------------------Click Events-----------------------

$("#svcModal_submit_btn").click(function(){
    if ($("#svcModal_act_txt").val() == "NEW CKT") {
        svcModalNewCkt();
    }
    else if ($("#svcModal_act_txt").val() == "CONN") {
        svcModalQueryCktCon("provConnect");
    } 
    else if ($("#svcModal_act_txt").val() == "DISCONN") {
        svcModalQueryCktCon("provDisconnect");
    }
})


$("#svcModal_clear_btn").click(svcModalClearForm);


// -------------------------Functions-------------------

function svcModalClearForm(){
    $("#svcModal_ckid_txt").val("");
    $("#svcModal_ckid_txt").prop("disabled",false);
    $("#svcModal_cls_sel").val("");
    $("#svcModal_cls_sel").prop("disabled",false);
    $("#svcModal_adsr_sel").val("");
    $("#svcModal_adsr_sel").prop("disabled",false);
    $("#svcModal_prot_sel").val("");
    $("#svcModal_prot_sel").prop("disabled",false);
    $("#svcModal_ordno_txt").val("");
    $("#svcModal_ordno_txt").prop("disabled",false);
    $("#svcModal_mlo_sel").val("");
    $("#svcModal_mlo_sel").prop("disabled",false);
    $("#svcModal_ctyp_sel").val("");
    $("#svcModal_ctyp_sel").prop("disabled",false);
    $("#svcModal_ffac_sel").val("");
    $("#svcModal_ffac_sel").prop("disabled",false);
    $("#svcModal_tfac_sel").val("");
    $("#svcModal_tfac_sel").prop("disabled",false);
    $("#svcModal_discCtyp_txt").val("");
    $("#svcModal_discFfac_txt").val("");
    $("#svcModal_discTfac_txt").val("");
    $("#svcModal_result_txt").text("");
}


function svcModalNewCkt() {
	
    $.post("./php/coQueryProv.php",
    {     
        act:	"provNewCkt",
        user:	$('#main_currentUser').text(),
        ckid:	$("#svcModal_ckid_txt").val(),
        cls:	$("#svcModal_cls_sel").val(),
        adsr:	$("#svcModal_adsr_sel").val(),
        prot:	$("#svcModal_prot_sel").val(),
        ordno:	$("#svcModal_ordno_txt").val(),
        mlo:	$("#svcModal_mlo_sel").val(),
        ctyp:	$("#svcModal_ctyp_sel").val(),
        ffac:	$("#svcModal_ffac_sel").val(),
        tfac:	$("#svcModal_tfac_sel").val(),
        ckt_id:	$("#svc_ckt_id_num").val(),
        cktcon: $("#svc_cktcon_id_num").val(),
        idx:	$("#svc_cktcon_idx_num").val()
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            //$("#svcModal_result_txt").text(obj['reason']);
            alert(obj['reason']);
        }
        else {
            svc_tableCktIndex=0;
            svc_tblCkt = obj['rows'];
            var len = svc_tblCkt.length; 
            svc_maxTableCktIndex = Math.ceil(len/100.0);
            svc_tableCktIndex++;
            svcDisplayTableCkt(svc_tableCktIndex);
            $("#svcModal_result_txt").text(obj["rslt"]);
        } 
    });
}


function svcModalQueryCktCon(action) {
	
	if (action == "provConnect") {
		ctyp = $('#svcModal_ctyp_sel').val();
		ffac = $('#svcModal_ffac_sel').val();
		tfac = $('#svcModal_tfac_sel').val();
	}
	else {
		ctyp = $('#svcModal_discCtyp_txt').val();
		ffac = $('#svcModal_discFfac_txt').val();
		tfac = $('#svcModal_discTfac_txt').val();
	}
	
	$.post("./php/coQueryProv.php",
    {     
        act:	action,
        user:	$('#main_currentUser').text(),
        ckid:	$("#svcModal_ckid_txt").val(),
        cls:	$("#svcModal_cls_sel").val(),
        adsr:	$("#svcModal_adsr_sel").val(),
        prot:	$("#svcModal_prot_sel").val(),
        ordno:	$("#svcModal_ordno_txt").val(),
        mlo:	$("#svcModal_mlo_sel").val(),
        ctyp:	ctyp,
        ffac:	ffac,
        tfac:	tfac,
		ckt_id:	$("#svc_ckt_id_num").val(),
        cktcon: $("#svc_cktcon_id_num").val(),
        idx:	$("#svc_cktcon_idx_num").val()
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj["reason"]);
        }
        else {
			$("#svcModal_result_txt").text(obj["rslt"]);
            if (obj["rows"].length > 0) {
				svc_tableCktConIndex = 0;
				svc_tblCktCon = obj['rows'];
				var len = svc_tblCktCon.length; 
				maxCktConTableIndex = Math.ceil(len/100.0);
				svc_tableCktConIndex++;
				svcDisplayTableCktCon(svc_tableCktConIndex);
			}
			else {
				svcModalClearForm();
				svcQueryCkt('query');
			}
			$('#svc_act_sel').val("");
        } 
    });
}


function svcModalLoadFacX() {
	
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
        else {
            var a = [];
            a.push('<option></option>');

            for (var i=0; i<obj["rows"].length; i++) 
            {  
				a.push('<option value=' + obj["rows"][i].fac + '>' + obj["rows"][i].fac + ': (' + obj["rows"][i].port + ')</option>');
            }

            $("#svcModal_ffac_sel").empty();
            document.getElementById("svcModal_ffac_sel").innerHTML = a.join("");
		}
        
	});
}


function svcModalLoadFacY() {
	
	$.post("./php/coQueryProv.php",
	{
		act:	"queryFacY",
        user:	$('#main_currentUser').text()
	},
	function (data, status) {
		var obj = JSON.parse(data);
        if (obj["rslt"]  ==  "fail") {
			alert(obj["reason"]);
		}
        else {
            var a = [];
            a.push('<option></option>');
            for (var i=0; i<obj["rows"].length; i++) 
            {  
				a.push('<option value=' + obj["rows"][i].fac + '>' + obj["rows"][i].fac + ': (' + obj["rows"][i].port + ')</option>');
            }
            $("#svcModal_tfac_sel").empty();
            document.getElementById("svcModal_tfac_sel").innerHTML = a.join("");
		}
       
	});
}



