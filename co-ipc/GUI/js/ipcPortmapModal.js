// ----------------PORTMODAL---------------------------------------------
var pmModal_tableArray;
var pmModal_tableIndex;
var pmModal_maxTableIndex;


$("#portmapModal").on("hidden.bs.modal", pmClearForm);

// --------------------------Click Events-------------------

$("#pmModal_submit_btn").click(function() {
    if ($("#pmModal_act_txt").val() == "MAP") {
        pmModalQuery('MAP');
    } 
    else if ($("#pmModal_act_txt").val() == "UNMAP") {
        pmModalQuery('UNMAP');
    }
})


$(document).on("click","#pmModal_tbl tr",function() {
    var dataRow= $(this).children("td").map(function() {
        return $(this).text(); 
    }).get();
    
    //Populate the information 
    $("#pm_fac_id_num").val(dataRow[0]).change();
    $("#pmModal_fac_txt").val(dataRow[1]).change();
    $("#pmModal_ftyp_txt").val(dataRow[2]).change();
    $("#pmModal_ort_txt").val(dataRow[3]).change();
    $("#pmModal_spcfnc_txt").val(dataRow[4]).change();
	$('#pmModal_submit_btn').prop('disabled',false);
    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
    
});


$("#findFacPortModal").click(queryFacPortModal);


// ------------------------Functions-----------------------

function pmModalClearForm() {
    $("#pmModal_node_num").val("").change();
    $("#pmModal_slot_num").val("").change();
    $("#pmModal_pnum_num").val("").change();
    $("#pmModal_ptyp_sel").val("").change();
    $("#pmModal_psta_sel").val("").change();
    $("#pmModal_fac_txt").val("");
    $("#pmModal_ftyp_txt").val("");
    $("#pmModal_ort_txt").val("");
    $("#pmModal_spcfnc_txt").val("");
    $("#pmModal_act_txt").val("");
    $("#pmModal_submit_btn").prop('disabled',true);

    //$("#facPortModal4Find").val("");
    //$("#ftypPortModal4Find").val("");
    
    $("#pmModal_tbl").empty();
    $("#pmModal_index_lbl").text("");
    $("#pmModal_result_btn").text("");

}

function pmModalQuery(action) {

    $.post("./php/coQueryPort.php",
    {
        act:	action,
        user:	$('#main_currentUser').text(),
        node:	$("#pmModal_node_num").val(),
        slot:	$("#pmModal_slot_num").val(),
        pnum:	$("#pmModal_pnum_num").val(),
        ptyp:	$("#pmModal_ptyp_sel").val(),
        psta:	$("#pmModal_psta_sel").val(),
        fac:	$("#pmModal_fac_txt").val(),
        fac_id:	$("#pm_fac_id_num").val(),
        port_id:$("#pm_port_id_num").val(),
        ckt:    ""
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                alert("No record found");
            }
            else {
                pm_tableIndex=0;
                pm_tableArray = obj["rows"];
                var len = pm_tableArray.length; 
                pm_maxTableIndex = Math.ceil(len/100.0);
                pm_tableIndex++;
                
                pmLoadTable(pm_tableIndex);
                if (action  ==  "MAP") {
					$("#pmModal_result_btn").text(obj['rslt']);
					// $('#pmModal_displaytbl').hide();

				}
                else if (action == "UNMAP") {
                    $("#pmModal_result_btn").text(obj['rslt']);
                }
            }
            
        }
    });
}

function pmModalQueryAvailFac() {
	$.post("./php/coQueryFac.php",
	{
		act:	"findAvailFac",
        user:	$('#main_currentUser').text()
	},
	function (data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            $("#resultPortModal").text(obj['reason']);
        }
        else {
            pmModal_tableArray=[]
            pmModal_tableIndex=0;
            var len = obj['rows'].length; 

            //Filter only FAC with no Port
            for(var i=0;i<len;i++) 
            {
                if (obj['rows'][i].port  == "") {
                    pmModal_tableArray.push(obj['rows'][i]);
                }
            }
            pmModal_maxTableIndex = Math.ceil(len/100.0);
            pmModal_tableIndex++;           
            pmModalLoadTable(pmModal_tableIndex);
        } 
    });
}		
		
function queryFacPortModal() {
    $.post("./php/coQueryFac.php",
    {    
        user:	$('#main_currentUser').text(),
        act:    'query',
        fac_id: "",
        fac:    $("#facPortModal4Find").val(),
        ftyp:   $("#ftypPortModal").val(),
        ort:    "",
        spcfnc: ""
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            $("#resultPortModal").text(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                $("#resultPortModal").text("There is no matching data!");
            }
            else {
                facPortModalArray=[]
                facTablePortModalIndex=0;
                var len = obj['rows'].length; 

                //Filter only FAC with no Port
                for(var i=0;i<len;i++)
                {
                    if (obj['rows'][i].port  == "") {
                        facPortModalArray.push(obj['rows'][i]);
                    }
                }
                pmModal_maxTableIndex = Math.ceil(len/100.0);
                pmModal_tableIndex++;           
                pmModalLoadTable(pmModal_tableIndex);
             
            }  
        } 
    });
}


function pmModalLoadTable(index) {   
    
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = pmModal_tableArray.length;

    if (len>=startIndex) {
        if (len < stopIndex) {
            stopIndex=len;
        }          
        pmModalClearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + pmModal_tableArray[i].id + '</td>')  
            a.push('<td style="width:50%">' + pmModal_tableArray[i].fac + '</td>');
            a.push('<td style="width:15%">' +  pmModal_tableArray[i].ftyp + '</td>');
            a.push('<td style="width:15%">' +  pmModal_tableArray[i].ort + '</td>');
            a.push('<td style="width:20%">' +  pmModal_tableArray[i].spcfnc + '</td></tr>');
        }
        document.getElementById("pmModal_tbl").innerHTML = a.join("");
        $("#pmModal_index_lbl").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function pmModalClearTable() {
    $("#pmModal_tbl").empty();
}
