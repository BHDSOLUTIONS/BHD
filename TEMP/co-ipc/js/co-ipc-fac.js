/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */

$(document).on("click","#displayMenu",function(){
   
    if($('#menu').css('display') == 'block')
        $('#menu').css('display','none')
    else 
        $('#menu').css('display','block')
  
});
    
   

function clearFacTable() {
    $("#tableFac").empty();
}
$(document).on("click","#tableFac tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
    $("#fac").val(dataRow[0]).change();
    $("#sel-ftyp").val(dataRow[1]).change();
    $("#sel-ort").val(dataRow[2]).change();
    $("#sel-spcfnc").val(dataRow[3]).change();

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
    
});


$(document).ready(function() {  
    
    queryFac("query");
    queryPort();
});

// $("#loadFac").click(function(){
    
//     queryFac();
// })


function queryFac(action) {
    $.post("./php/coQueryFac.php",
    {
        act: action,
        fac:$("#fac").val(),
        ftyp:$("#sel-ftyp option:selected").text(),
        ort:$("#sel-ort option:selected").text(),
        spcfnc:$("#sel-spcfnc option:selected").text()
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            alert(obj['reason']);
        }else{
			var a = [];
            var len = obj['rows'].length; 
            if (len > 0) {
				clearFacTable();
				for (var i=0; i<len; i++) {    
					a.push('<tr> <td style="width:40%">' + obj['rows'][i].fac + '</td>');
					a.push('<td style="width:10%">' + obj['rows'][i].ftyp + '</td>');
					a.push('<td style="width:10%">' + obj['rows'][i].ort + '</td>');
					a.push('<td style="width:17%">' + obj['rows'][i].spcfnc + '</td>');
					a.push('<td style="width:20%">' + obj['rows'][i].port + '</td></tr>');
				}
				document.getElementById("tableFac").innerHTML = a.join("");
			}
		}
    });
}

$('#addFac').click(function() {
	queryFac("add");
});


$("#searchFac").click(function(){
    clearFacTable();
    $.post("./php/coSearchFac.php",
    {      
        fac:$("#fac").val(),
        ftyp:$("#sel-ftyp option:selected").text(),
        ort:$("#sel-ort option:selected").text(),
        spcfnc:$("#sel-spcfnc option:selected").text()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            alert(obj['reason']);
        }else{
            var tbody = $('#tableFac');
            var len = obj['rows'].length;   
            for (i=0; i<len; i++) {
                var tr = $('<tr/>').appendTo(tbody);
                tr.append('<td style="width:40%">' + obj['rows'][i].fac + '</td>');
                tr.append('<td style="width:10%">' + obj['rows'][i].ftyp + '</td>');
                tr.append('<td style="width:10%">' + obj['rows'][i].ort + '</td>');
                tr.append('<td style="width:17%">' + obj['rows'][i].spcfnc + '</td>');
                tr.append('<td style="width:20%">' + obj['rows'][i].port + '</td>');
            }
        }
        
    });
    
})

  












