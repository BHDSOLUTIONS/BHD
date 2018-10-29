// ----------------PORTMODAL---------------------------------------------
var pmModal_tableArray;
var pmModal_tableIndex;
var pmModal_maxTableIndex;


$("#portMapModal").on("hidden.bs.modal", pm_clearForm);

// --------------------------Click Events-------------------

$("#pmModal_submit").click(function(){
    if ($("#pmModal_act").val() == "MAP")
    {
        pmModal_queryPort('MAP');
    } 
    else if ($("#pmModal_act").val() == "UNMAP")
    {
        pmModal_queryPort('UNMAP');
    } 
})


$(document).on("click","#pmModal_tbody tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text(); 
    }).get();
    
    //Populate the information 
    $("#pmModal_fac_id").val(dataRow[0]).change();
    $("#pmModal_fac").val(dataRow[1]).change();
    $("#pmModal_ftyp").val(dataRow[2]).change();
    $("#pmModal_ort").val(dataRow[3]).change();
    $("#pmModal_spcfnc").val(dataRow[4]).change();
	$('#pmModal_submit').prop('disabled',false);
    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
    
});


$("#findFacPortModal").click(queryFacPortModal);


// ------------------------Functions-----------------------

function pmModal_clearForm(){
    $("#pmModal_node").val("").change();
    $("#pmModal_slot").val("").change();
    $("#pmModal_pnum").val("").change();
    $("#pmModal_ptyp").val("").change();
    $("#pmModal_psta").val("").change();
    $("#pmModal_fac").val("");
    $("#pmModal_ftyp").val("");
    $("#pmModal_ort").val("");
    $("#pmModal_spcfnc").val("");
    $("#pmModal_act").val("");
    $("#pmModal_submit").prop('disabled',true);

    //$("#facPortModal4Find").val("");
    //$("#ftypPortModal4Find").val("");
    
    $("#pmModal_tbody").empty();
    $("#pmModal_index").text("");
    $("#pmModal_result").text("");

}

function pmModal_queryPort(action) {

    $.post("./php/coQueryPort.php",
    {
        act:	action,
        user:	$('#main_currentUser').text(),
        node:	$("#pmModal_node").val(),
        slot:	$("#pmModal_slot").val(),
        pnum:	$("#pmModal_pnum").val(),
        ptyp:	$("#pmModal_ptyp").val(),
        psta:	$("#pmModal_psta").val(),
        fac:	$("#pmModal_fac").val(),
        fac_id:	$("#pm_fac_id").val(),
        port_id:$("#pml_port_id").val(),
        ckt:    ""
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else 
        {
            if (obj['rows'].length == 0) 
            {
                alert("No record found");
            }
            else 
            {
                pm_tableIndex=0;
                pm_tableArray = obj["rows"];
                var len = pm_tableArray.length; 
                pm_maxTableIndex = Math.ceil(len/100.0);
                pm_tableIndex++;
                
                pm_loadTable(pm_tableIndex);
                if (action  ==  "MAP") 
                {
					$("#pmModal_result").text(obj['rslt']);
					$('#pmModal_table').hide();

				}
                else if (action == "UNMAP") 
					$("#pmModal_result").text(obj['rslt']);
            }
            
        }
    });
}

function pmModal_queryAvailFac() {
	$.post("./php/coQueryFac.php",
	{
		act:	"findAvailFac",
        user:	$('#main_currentUser').text()
	},
	function (data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail")
        {
            $("#resultPortModal").text(obj['reason']);
        }
        else 
        {
            pmModal_tableArray=[]
            pmModal_tableIndex=0;
            var len = obj['rows'].length; 

            //Filter only FAC with no Port
            for(var i=0;i<len;i++) 
            {
                if (obj['rows'][i].port  == "")
                    pmModal_tableArray.push(obj['rows'][i]);  
            }
            pmModal_maxTableIndex = Math.ceil(len/100.0);
            pmModal_tableIndex++;           
            pmModal_loadTable(pmModal_tableIndex);
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
        if (obj["rslt"] == "fail") 
        {
            $("#resultPortModal").text(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) 
            {
                $("#resultPortModal").text("There is no matching data!");
            }
            else 
            {
                facPortModalArray=[]
                facTablePortModalIndex=0;
                var len = obj['rows'].length; 

                //Filter only FAC with no Port
                for(var i=0;i<len;i++)
                {
                    if (obj['rows'][i].port  == "")
                        facPortModalArray.push(obj['rows'][i]);  
                }
                pmModal_maxTableIndex = Math.ceil(len/100.0);
                pmModal_tableIndex++;           
                pmModal_loadTable(pmModal_tableIndex);
             
            }  
        } 
    });
}


function pmModal_loadTable(index) {   
    
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = pmModal_tableArray.length;

    if (len>=startIndex) 
    {
        if (len < stopIndex)
            stopIndex=len;            
        pmModal_clearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + pmModal_tableArray[i].id + '</td>')  
            a.push('<td style="width:50%">' + pmModal_tableArray[i].fac + '</td>');
            a.push('<td style="width:15%">' +  pmModal_tableArray[i].ftyp + '</td>');
            a.push('<td style="width:15%">' +  pmModal_tableArray[i].ort + '</td>');
            a.push('<td style="width:20%">' +  pmModal_tableArray[i].spcfnc + '</td></tr>');
        }
        document.getElementById("pmModal_tbody").innerHTML = a.join("");
        $("#pmModal_index").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function pmModal_clearTable(){
    $("#pmModal_tbody").empty();
}
