
var prov_tableCkt;
var prov_tableCktIndex;
var prov_maxTableCktIndex;

var prov_tableCktCon;
var prov_tableCktConIndex;
var prov_maxTableCktConIndex;


$("#prov_findCkid").click(function(){
    prov_queryCkt('query');
});

$("#prov_findOrd").click(function(){
    prov_queryCkt('queryOrd');
})


$("#prov_clear").click(function(){
    prov_clearForm();
    prov_clearTableCktCon();
   
});


$("#prov_next").click(function(){
    if (prov_tableCktIndex<prov_maxTableCktIndex){
        prov_tableCktIndex++;
        prov_displayTableCkt(prov_tableCktIndex);
    }  
})


$("#prov_previous").click(function(){
    if (prov_tableCktIndex>1){
        prov_tableCktIndex--;
        prov_displayTableCkt(prov_tableCktIndex);   
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

    // Reset prov_cktcon_idx
    $("#prov_cktcon_idx").val("");
    
    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
    
    if ($('#prov_cktcon_id').val() != "")
		prov_queryCktCon($('#prov_cktcon_id').val());
		
});


$(document).on("click","#prov_tableCktCon tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#prov_cktcon_idx").val(dataRow[0]);
	$("#provModal_ctyp").val(dataRow[1]);
	$("#provModal_ffac").val(dataRow[2]);
	$("#provModal_tfac").val(dataRow[3]);
	$("#provModal_discCtyp").val(dataRow[1]);
	$("#provModal_discFfac").val(dataRow[2]);
	$("#provModal_discTfac").val(dataRow[3]);
	if ($('#prov_act').val() == "DISCONN") {
		$('#provModal').modal();
		prov_populateProvModal();
		$("#provModal_newConForm").hide();
		$("#provModal_discConForm").show();
	}

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$(document).on('mouseup', '[id = prov_act]', function () {
    
    if ($("#prov_act").val()  ==  "NEW CKT") 
    {
        provModal_clearForm();
        $("#provModal_act").val($("#prov_act").val());

        provModal_loadFacX();
        provModal_loadFacY();

        $("#provModal_ckid").prop("disabled",false);
        $("#provModal_cls").prop("disabled",false);
        $("#provModal_adsr").prop("disabled",false);
        $("#provModal_prot").prop("disabled",false);
        $("#provModal_ordno").prop("disabled",false);
        $("#provModal_mlo").prop("disabled",false);

        $("#provModal_newConForm").show();
        $("#provModal_discConForm").hide();
        $("#provModal_clear").show();

        $("#provModal").modal();
		prov_clearForm();
    }
    else if ($("#prov_act").val()  ==  "CONN")
    {
        if ($('#prov_ckt_id').val() == "") {
			alert("Please select a CKT from the LIST OF CKTs");
			$('#prov_act').val("");
		}
		else {
            provModal_clearForm();
            prov_populateProvModal();
            provModal_loadFacX();
            provModal_loadFacY();

            $("#provModal_ckid").prop("disabled",true);
            $("#provModal_cls").prop("disabled",true);
            $("#provModal_adsr").prop("disabled",true);
            $("#provModal_prot").prop("disabled",true);
            $("#provModal_ordno").prop("disabled",false);
            $("#provModal_mlo").prop("disabled",true);

            $("#provModal_newConForm").show();
            $("#provModal_discConForm").hide();
            $("#provModal_clear").hide();

            $("#provModal").modal();
        }
    }
    else if ($("#prov_act").val()  ==  "DISCONN") {
        if ($('#prov_ckt_id').val() == "" || $('#prov_cktcon_id').val() == "") {
			alert("Please select a CKT from the LIST OF CKTs");
			$('#prov_act').val("");
		}
		else if ($('#prov_cktcon_idx').val() == "" || $('#prov_cktcon_idx').val() == 0) {
			alert("Please select a CON from the LIST OF CONNECTIONS");
		}
        else {
			prov_populateProvModal();
            
            $("#provModal_ckid").prop("disabled",true);
            $("#provModal_cls").prop("disabled",true);
            $("#provModal_adsr").prop("disabled",true);
            $("#provModal_prot").prop("disabled",true);
            $("#provModal_ordno").prop("disabled",false);
            $("#provModal_mlo").prop("disabled",true);
			$("#provModal_act").prop("disabled",true);

            $("#provModal_newConForm").hide();
            $("#provModal_clear").hide();
			//$("#provModal_discCtyp").val($('#prov_ctyp').val());
			//$("#provModal_discFfac").val($('#prov_ffac').val());
            //$("#provModal_discTfac").val($('#prov_tfac').val());
            $("#provModal_discConForm").show();

            $("#provModal").modal();
        }
    }
   
})


/* Functions section */

function prov_populateProvModal(){
    $("#provModal_ckid").val($("#prov_ckid").val());
    $("#provModal_cls").val($("#prov_cls").val());
    $("#provModal_adsr").val($("#prov_adsr").val());
    $("#provModal_prot").val($("#prov_prot").val());
    $("#provModal_ordno").val($("#prov_ordno").val());
    $("#provModal_mlo").val($("#prov_mlo").val());
    $("#provModal_act").val($("#prov_act").val());
}



function prov_clearTableCkt() {
	
    $("#prov_tableCkt").empty();
}

function prov_clearTableCktCon() {
	
    $("#prov_tableCktCon").empty();
}


function prov_queryCkt(action) {
    
    $.post("./php/coQueryProv.php",
    {     
        act:	action,
        user:	$('#main_currentUser').text(),
        ckid:	$("#prov_ckid").val(),
        cls:	$("#prov_cls").val(),
        adsr:	$("#prov_adsr").val(),
        prot:	$("#prov_prot").val(),
        ordno:	$("#prov_ordno").val(),
        mlo:	$("#prov_mlo").val()
       
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail")
        {
            alert(obj['reason']);
        }
        else
        {
            if (obj['rows'].length == 0)
            {
                alert("There is no matching data!");
            }
            else
            {
                prov_tableCktIndex=0;
                prov_tableCkt = obj['rows'];
                var len = prov_tableCkt.length; 
                prov_maxTableCktIndex = Math.ceil(len/100.0);
                prov_tableCktIndex++;
                prov_displayTableCkt(prov_tableCktIndex);
            }  
        } 
    });
}


function prov_queryCktCon(cktcon_id){
    
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
        else
        {
            if (obj['rows'].length == 0)
            {
                alert("There is no matching data!");
            }
            else
            {
                prov_tableCktConIndex=0;
                prov_tableCktCon = obj['rows'];
                var len = prov_tableCktCon.length; 
                prov_maxTableCktConIndex = Math.ceil(len/100.0);
                prov_tableCktConIndex++;
                prov_displayTableCktCon(prov_tableCktConIndex);
            }  
        } 
    });
}


function prov_displayTableCkt(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = prov_tableCkt.length;

    if (len>=startIndex){
        if (len < stopIndex)
            stopIndex=len;            
        prov_clearTableCkt();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + prov_tableCkt[i].id + '</td>');
            a.push('<td style="width:25%">' + prov_tableCkt[i].ckid + '</td>');
            a.push('<td style="width:10%">' +  prov_tableCkt[i].cls + '</td>');
            a.push('<td style="width:7%">' +  prov_tableCkt[i].adsr + '</td>');
            a.push('<td style="width:7%">' +  prov_tableCkt[i].prot + '</td>');
            a.push('<td style="width:20%">' +  prov_tableCkt[i].ordno + '</td>');
            a.push('<td style="width:7%">' +  prov_tableCkt[i].mlo + '</td>');
            a.push('<td style="width:24%">' +  prov_tableCkt[i].date + '</td>');
            a.push('<td style="display:none">' +  prov_tableCkt[i].cktcon + '</td></tr>');
            
        }
        document.getElementById("prov_tableCkt").innerHTML = a.join("");
        $("#prov_index").text("From " + (startIndex+1) + " to " + stopIndex);
    } 
}


function prov_displayTableCktCon(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = prov_tableCktCon.length;

    if (len>=startIndex)
    {
        if (len < stopIndex)
            stopIndex=len;            
        prov_clearTableCktCon();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="width:10%">' + prov_tableCktCon[i].idx + '</td>')  
            a.push('<td style="width:20%">' +  prov_tableCktCon[i].ctyp + '</td>');
            a.push('<td style="width:35%">' +  prov_tableCktCon[i].ffac + '</td>');
            a.push('<td style="width:35%">' +  prov_tableCktCon[i].tfac + '</td><tr>');
        }
        document.getElementById("prov_tableCktCon").innerHTML = a.join("");
    } 
}


function prov_clearForm(){
    $("#prov_ckid").val("").change();
    $("#prov_cls").val("").change();
    $("#prov_adsr").val("").change();
    $("#prov_prot").val("").change();
    $("#prov_ordno").val("").change();
    $("#prov_mlo").val("").change();
    $("#prov_act").val("");
    $("#prov_ckt_id").val("").change();
    $("#prov_cktcon_id").val("").change();
    $("#prov_cktcon_idx").val("").change();
	prov_clearTableCktCon();
}







