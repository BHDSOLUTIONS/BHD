var setupFac_table;
var setupFac_tableIndex;
var setupFac_maxTableIndex;

// ----------------------Click Events--------------------------------------------

$(document).on("click","#setupFac_tableFac tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#setupFac_fac_id").val(dataRow[0]);
    $("#setupFac_fac").val(dataRow[1]);
    $("#setupFac_ftyp").val(dataRow[2]);
    $("#setupFac_ort").val(dataRow[3]);
    $("#setupFac_spcfnc").val(dataRow[4]);
    $("#setupFac_portInfor").val(dataRow[5]);
    
    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#setupFac_next").click(function(){
    if (setupFac_tableIndex<setupFac_maxTableIndex){
        setupFac_tableIndex++;
        setupFac_displayTable(setupFac_tableIndex);
    }  
})


$("#setupFac_previous").click(function(){
    if (setupFac_tableIndex>1){
        setupFac_tableIndex--;
        setupFac_displayTable(setupFac_tableIndex);   
    }         
})


$("#setupFac_clear").click(setupFac_clearForm);


$('#setupFac_findFac').click(function() {
	setupFac_queryFac("findFac");
});


$('#setupFac_findFOS').click(function() {
	setupFac_queryFac("findFOS");
});


$(document).on('mouseup', '[id *= setupFac_act]', function () {

    if ($("#setupFac_act").val()  ==  "UPDATE"){
        if ($("#setupFac_fac_id").val() != "")
        {
            facModal_clearForm();   
            setupFac_populateFacModal();
    
            $("#facModal_fac").prop("disabled",false);
            $("#facModal_ftyp").prop("disabled",false);
            $("#facModal_ort").prop("disabled",false);
            $("#facModal_spcfnc").prop("disabled",false);
            $("#facModal_clear").prop("disabled",false);
            $("#facModal_clear").show();
            $("#facModal").modal(); 
        } 
        else 
        {
            alert("Please select a FAC from the LIST OF FACILITIES")
        }
              
    } 
    else if ($("#setupFac_act").val()  ==  "DELETE")
    {
        if ($("#setupFac_fac_id").val() != "")
        {
            facModal_clearForm();   
            setupFac_populateFacModal();
    
            $("#facModal_fac").prop("disabled",true);
            $("#facModal_ftyp").prop("disabled",true);
            $("#facModal_ort").prop("disabled",true);
            $("#facModal_spcfnc").prop("disabled",true);
            $("#facModal_clear").hide();
            $("#facModal").modal();  
        } 
        else 
        {
            alert("Please select a FAC from the LIST OF FACILITIES")
        }
       
    }
    else if ($("#setupFac_act").val()  ==  "ADD")
    {
        setupFac_clearForm(); 
        facModal_clearForm(); 
        $("#facModal_act").val($("#setupFac_act").val()); 
        $("#facModal_fac").prop("disabled",false);
        $("#facModal_ftyp").prop("disabled",false);
        $("#facModal_ort").prop("disabled",false);
        $("#facModal_spcfnc").prop("disabled",false);
        $("#facModal_clear").show();
        $("#facModal").modal(); 
    }
});


// -----------------------------Functions----------------------------

function setupFac_clearTable() {
    $("#setupFac_tableFac").empty();
}


function setupFac_queryFac(action){
    
    $.post("./php/coQueryFac.php",
    {     
        act: action,
        user: $('#main_currentUser').text(),
        fac_id: $("#setupFac_fac_id").val(),
        fac: $("#setupFac_fac").val(),
        ftyp: $("#setupFac_ftyp").val(),
        ort: $("#setupFac_ort").val(),
        spcfnc: $("#setupFac_spcfnc").val()
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
                if (action != "query") {
					alert("No Record Found");
					return;
				}
            }
            setupFac_tableIndex=0;
            setupFac_table = obj['rows'];
            var len = setupFac_table.length; 
            setupFac_maxTableIndex = Math.ceil(len/100.0);
            setupFac_tableIndex++;
            setupFac_displayTable(setupFac_tableIndex);
        } 
    });
}


function setupFac_displayTable(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = setupFac_table.length;

    if (len>=startIndex){
        if (len < stopIndex)
            stopIndex=len;            
        setupFac_clearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + setupFac_table[i].id + '</td>')  
            a.push('<td style="width:40%">' + setupFac_table[i].fac + '</td>');
            a.push('<td style="width:10%">' +  setupFac_table[i].ftyp + '</td>');
            a.push('<td style="width:10%">' +  setupFac_table[i].ort + '</td>');
            a.push('<td style="width:17%">' +  setupFac_table[i].spcfnc + '</td>');
            a.push('<td style="width:20%">' +  setupFac_table[i].port + '</td></tr>');
        }
        document.getElementById("setupFac_tableFac").innerHTML = a.join("");
        $("#setupFac_index").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function setupFac_clearForm(){
    $("#setupFac_fac_id").val("");
    $("#setupFac_fac").val("");
    $("#setupFac_ftyp").val("");
    $("#setupFac_ort").val("");
    $("#setupFac_spcfnc").val("");
    $("#setupFac_portInfor").val("");
    $("#setupFac_act").val("");
    $("#setupFac_checkInputs").text("");
}


function setupFac_populateFacModal(){
    $("#facModal_fac").val($("#setupFac_fac").val());
    $("#facModal_ftyp").val($("#setupFac_ftyp").val());
    $("#facModal_ort").val($("#setupFac_ort").val());
    $("#facModal_spcfnc").val($("#setupFac_spcfnc").val());
    $("#facModal_portInfor").val($("#setupFac_portInfor").val()); 
    $("#facModal_act").val($("#setupFac_act").val()); 

}


function setupFac_checkInputs(){
    if (($("#setupFac_fac").val() != "") && ($("#setupFac_ftyp").val() != ""))
        return true;
    else return false;
}
