
var svc_tblCkt;
var svc_tableCktIndex;
var svc_maxTableCktIndex;

var svc_tblCktCon;
var svc_tableCktConIndex;
var svc_maxTableCktConIndex;


$("#svc_findCkid_btn").click(function(){
    svcQueryCkt('queryCkid');
});

$("#svc_findOrd_btn").click(function(){
    svcQueryCkt('queryOrd');
})


$("#svc_clear_btn").click(function(){
    svcClearForm();
    svcClearTableCktCon();
   
});


$("#svc_next").click(function(){
    if (svc_tableCktIndex<svc_maxTableCktIndex) {
        svc_tableCktIndex++;
        svcDisplayTableCkt(svc_tableCktIndex);
    }  
})


$("#svc_previous").click(function(){
    if (svc_tableCktIndex>1) {
        svc_tableCktIndex--;
        svcDisplayTableCkt(svc_tableCktIndex);   
    }         
})


$(document).on("click","#svc_tblCkt tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
	$("#svc_ckt_id_num").val(dataRow[0]).change();
	$("#svc_ckid_txt").val(dataRow[1]).change();
    $("#svc_cls_sel").val(dataRow[2]).change();
    $("#svc_adsr_sel").val(dataRow[3]).change();
    $("#svc_prot_sel").val(dataRow[4]).change();
    $("#svc_ordno_txt").val(dataRow[5]).change();
    $("#svc_mlo_sel").val(dataRow[6]).change();
    $("#svc_cktcon_id_num").val(dataRow[8]).change();

    // Reset svc_cktcon_idx_num
    $("#svc_cktcon_idx_num").val("");
    
    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
    
    if ($('#svc_cktcon_id_num').val() != "")
		svcQueryCktCon($('#svc_cktcon_id_num').val());
		
});


$(document).on("click","#svc_tblCktCon tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#svc_cktcon_idx_num").val(dataRow[0]);
	$("#svcModal_ctyp_sel").val(dataRow[1]);
	$("#svcModal_ffac_sel").val(dataRow[2]);
	$("#svcModal_tfac_sel").val(dataRow[3]);
	$("#svcModal_discCtyp_txt").val(dataRow[1]);
	$("#svcModal_discFfac_txt").val(dataRow[2]);
	$("#svcModal_discTfac_txt").val(dataRow[3]);
	if ($('#svc_act_sel').val() == "DISCONN") {
		$('#svcModal').modal();
		svcPopulateModal();
		$("#svcModal_newConForm").hide();
		$("#svcModal_discConForm").show();
	}

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$(document).on('mouseup', '[id = svc_act_sel]', function () {
    
    if ($("#svc_act_sel").val()  ==  "NEW CKT") {
        svcModalClearForm();
        $("#svcModal_act_txt").val($("#svc_act_sel").val());

        svcModalLoadFacX();
        svcModalLoadFacY();

        $("#svcModal_ckid_txt").prop("disabled",false);
        $("#svcModal_cls_sel").prop("disabled",false);
        $("#svcModal_adsr_sel").prop("disabled",false);
        $("#svcModal_prot_sel").prop("disabled",false);
        $("#svcModal_ordno_txt").prop("disabled",false);
        $("#svcModal_mlo_sel").prop("disabled",false);

        $("#svcModal_newConForm").show();
        $("#svcModal_discConForm").hide();
        $("#svcModal_clear_btn").show();

        $("#svcModal").modal();
		svcClearForm();
    }
    else if ($("#svc_act_sel").val()  ==  "CONN") {
        if ($('#svc_ckt_id_num').val() == "") {
			alert("Please select a CKT from the LIST OF CKTs");
			$('#svc_act_sel').val("");
		}
		else {
            svcModalClearForm();
            svcPopulateModal();
            svcModalLoadFacX();
            svcModalLoadFacY();

            $("#svcModal_ckid_txt").prop("disabled",true);
            $("#svcModal_cls_sel").prop("disabled",true);
            $("#svcModal_adsr_sel").prop("disabled",true);
            $("#svcModal_prot_sel").prop("disabled",true);
            $("#svcModal_ordno_txt").prop("disabled",false);
            $("#svcModal_mlo_sel").prop("disabled",true);

            $("#svcModal_newConForm").show();
            $("#svcModal_discConForm").hide();
            $("#svcModal_clear_btn").hide();

            $("#svcModal").modal();
        }
    }
    else if ($("#svc_act_sel").val()  ==  "DISCONN") {
        if ($('#svc_ckt_id_num').val() == "" || $('#svc_cktcon_id_num').val() == "") {
			alert("Please select a CKT from the LIST OF CKTs");
			$('#svc_act_sel').val("");
		}
		else if ($('#svc_cktcon_idx_num').val() == "" || $('#svc_cktcon_idx_num').val() == 0) {
			alert("Please select a CON from the LIST OF CONNECTIONS");
		}
        else {
			svcPopulateModal();
            
            $("#svcModal_ckid_txt").prop("disabled",true);
            $("#svcModal_cls_sel").prop("disabled",true);
            $("#svcModal_adsr_sel").prop("disabled",true);
            $("#svcModal_prot_sel").prop("disabled",true);
            $("#svcModal_ordno_txt").prop("disabled",false);
            $("#svcModal_mlo_sel").prop("disabled",true);
			$("#svcModal_act_txt").prop("disabled",true);

            $("#svcModal_newConForm").hide();
            $("#svcModal_clear_btn").hide();
			//$("#svcModal_discCtyp_txt").val($('#svc_ctyp').val());
			//$("#svcModal_discFfac_txt").val($('#svc_ffac').val());
            //$("#svcModal_discTfac_txt").val($('#svc_tfac').val());
            $("#svcModal_discConForm").show();

            $("#svcModal").modal();
        }
    }
   
})


/* Functions section */

function svcPopulateModal(){
    $("#svcModal_ckid_txt").val($("#svc_ckid_txt").val());
    $("#svcModal_cls_sel").val($("#svc_cls_sel").val());
    $("#svcModal_adsr_sel").val($("#svc_adsr_sel").val());
    $("#svcModal_prot_sel").val($("#svc_prot_sel").val());
    $("#svcModal_ordno_txt").val($("#svc_ordno_txt").val());
    $("#svcModal_mlo_sel").val($("#svc_mlo_sel").val());
    $("#svcModal_act_txt").val($("#svc_act_sel").val());
}



function svcClearTableCkt() {
	
    $("#svc_tblCkt").empty();
}

function svcClearTableCktCon() {
	
    $("#svc_tblCktCon").empty();
}


function svcQueryCkt(action) {
    
    $.post("./php/coQueryProv.php",
    {     
        act:	action,
        user:	$('#main_currentUser').text(),
        ckid:	$("#svc_ckid_txt").val(),
        cls:	$("#svc_cls_sel").val(),
        adsr:	$("#svc_adsr_sel").val(),
        prot:	$("#svc_prot_sel").val(),
        ordno:	$("#svc_ordno_txt").val(),
        mlo:	$("#svc_mlo_sel").val()
       
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                if (action == "queryCkid" || action == "queryOrd") {
					alert("No Record Found");
					return;
				}
			}
            svc_tableCktIndex=0;
            svc_tblCkt = obj['rows'];
            var len = svc_tblCkt.length; 
            svc_maxTableCktIndex = Math.ceil(len/100.0);
            svc_tableCktIndex++;
            svcDisplayTableCkt(svc_tableCktIndex);
        } 
    });
}


function svcQueryCktCon(cktcon_id){
    
    $.post("./php/coQueryProv.php",
    {     
        act:	"queryCktcon",
        user:	$('#main_currentUser').text(),
        cktcon:	cktcon_id
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail"){
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                alert("There is no matching data!");
            }
            else {
                svc_tableCktConIndex=0;
                svc_tblCktCon = obj['rows'];
                var len = svc_tblCktCon.length; 
                svc_maxTableCktConIndex = Math.ceil(len/100.0);
                svc_tableCktConIndex++;
                svcDisplayTableCktCon(svc_tableCktConIndex);
            }  
        } 
    });
}


function svcDisplayTableCkt(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = svc_tblCkt.length;

    if (len>=startIndex) {
        if (len < stopIndex)
            stopIndex=len;            
        svcClearTableCkt();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + svc_tblCkt[i].id + '</td>');
            a.push('<td style="width:25%">' + svc_tblCkt[i].ckid + '</td>');
            a.push('<td style="width:10%">' +  svc_tblCkt[i].cls + '</td>');
            a.push('<td style="width:7%">' +  svc_tblCkt[i].adsr + '</td>');
            a.push('<td style="width:7%">' +  svc_tblCkt[i].prot + '</td>');
            a.push('<td style="width:20%">' +  svc_tblCkt[i].ordno + '</td>');
            a.push('<td style="width:7%">' +  svc_tblCkt[i].mlo + '</td>');
            a.push('<td style="width:24%">' +  svc_tblCkt[i].date + '</td>');
            a.push('<td style="display:none">' +  svc_tblCkt[i].cktcon + '</td></tr>');
            
        }
        document.getElementById("svc_tblCkt").innerHTML = a.join("");
        $("#svc_index_lbl").text("From " + (startIndex+1) + " to " + stopIndex);
    } 
}


function svcDisplayTableCktCon(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = svc_tblCktCon.length;

    if (len>=startIndex) {
        if (len < stopIndex) {
            stopIndex=len;   
        }         
        svcClearTableCktCon();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="width:5%">' + svc_tblCktCon[i].idx + '</td>')  
            a.push('<td style="width:11%">' +  svc_tblCktCon[i].ctyp + '</td>');
            a.push('<td style="width:42%">' +  svc_tblCktCon[i].ffac + ' (' + svc_tblCktCon[i].fport + ') </td>');
            a.push('<td style="width:42%">' +  svc_tblCktCon[i].tfac + ' (' + svc_tblCktCon[i].tport + ') </td><tr>');
        }
        document.getElementById("svc_tblCktCon").innerHTML = a.join("");
    } 
}


function svcClearForm(){
    $("#svc_ckid_txt").val("").change();
    $("#svc_cls_sel").val("").change();
    $("#svc_adsr_sel").val("").change();
    $("#svc_prot_sel").val("").change();
    $("#svc_ordno_txt").val("").change();
    $("#svc_mlo_sel").val("").change();
    $("#svc_act_sel").val("");
    $("#svc_ckt_id_num").val("").change();
    $("#svc_cktcon_id_num").val("").change();
    $("#svc_cktcon_idx_num").val("").change();
	svcClearTableCktCon();
}







