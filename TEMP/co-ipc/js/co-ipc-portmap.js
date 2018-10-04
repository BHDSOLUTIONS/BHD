 ///-----------------PORT MAP--------------------------------------

 var portArray;
 var tableIndex;
 var maxTableIndex;
 $(document).on("click","#tablePort tr",function(){
     var dataRow= $(this).children("td").map(function(){
         return $(this).text();
     }).get();
     

     //Populate the information 
     $("#node").val(dataRow[0]).change();
     $("#slot").val(dataRow[1]).change();
     $("#pnum").val(dataRow[2]).change();
     $("#sel-ptyp").val(dataRow[3]).change();
     $("#sel-psta").val(dataRow[4]).change();
     $("#fac").val(dataRow[5]).change();
     $("#ckt").val(dataRow[6]).change();
     

     //Add color to the row
     $(this).addClass("addColor"); //add class selected to current clicked row
     $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows
     
 });
 
 function clearPortTable(){
     $("#tablePort").empty();
 }
 function queryPort() {
    tableIndex=0;
    maxTableIndex=0;
    portArray={};

    $.post("./php/coQueryPort.php",
    {
        port: "all" 
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            alert(obj['reason']);
        }else{

            portArray = obj;
            var len = portArray['rows'].length; 
            maxTableIndex = Math.ceil(len/100.0);
            tableIndex++;
            
            displayPort(tableIndex);
        }
    });
}

function displayPort(index){
    
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = portArray['rows'].length;
    if(len>=startIndex){

        clearPortTable();
        if(len < stopIndex)
            stopIndex=len;
        var a = [];
        for (var i=startIndex; i<stopIndex; i++) {
            if(portArray['rows'][i].fac == null) portArray['rows'][i].fac = "";
            if(portArray['rows'][i].ckt == null) portArray['rows'][i].cktid = "";
            a.push('<tr> <td style="width:10%">' + portArray['rows'][i].node + '</td>');
            a.push('<td style="width:10%">' + portArray['rows'][i].slot + '</td>');
            a.push('<td style="width:10%">' + portArray['rows'][i].pnum + '</td>');
            a.push('<td style="width:10%">' + portArray['rows'][i].ptyp + '</td>');
            a.push('<td style="width:10%">' + portArray['rows'][i].psta + '</td>');
            a.push('<td style="width:25%">' + portArray['rows'][i].fac + '</td>');
            a.push('<td style="width:25%">' + portArray['rows'][i].cktid + '</td></tr>');
        }
        document.getElementById("tablePort").innerHTML = a.join("");
    }
   
}
    


$("#next").click(function(){
    if(tableIndex<maxTableIndex){
        tableIndex++;
        displayPort(tableIndex);
    }
    
})
$("#previous").click(function(){
    if(tableIndex>1){
        tableIndex--;
        displayPort(tableIndex);   
    }
         
})

 $("#facid").change(function(){

     if($("#facid").val()>0){
         $("#unmap").attr("disabled",false);
         $("#map").attr("disabled",true);
     }
     else{
         $("#unmap").attr("disabled",true);
         $("#map").attr("disabled",false);
     }
 })

