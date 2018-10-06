

var facModalArray;
var facModalIndex;
var maxModalIndex;

$(document).on("click","#tableFacModal tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();
    //Populate the information 
    $("#facNum").val(dataRow[1]).change();
   
    $("#fac_id_P").val(dataRow[0]).change();

    //Add color to the row
    $(this).addClass("addColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});
function queryFacModal(){
    $.post("./php/coQueryFac.php",
    {     
        act:'query',
        fac:"",
        ftyp:'',
        ort:'',
        spcfnc:''
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if(obj["rslt"]=="fail"){
            alert(obj['reason']);
        }else{
            if(obj['rows'].length==0){
                alert("There is no matching data!");
            }
            else{
                facModalArray=[];
                facModalIndex=0;
                var len = obj['rows'].length; 
                for(var i=0;i<len;i++){
                    if(obj['rows'][i].port =="")
                        facModalArray.push(obj['rows'][i]);  
                }
                maxModalIndex = Math.ceil(len/100.0);
                facModalIndex++;
                
                displayFacModal(facTableIndex);
                
            }  
        } 
    });
}

$("#openFacModal").click(function(){
    queryFacModal();
})


function clearFacModalTable(){
    $("#tableFacModal").empty();
}
function displayFacModal(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = facModalArray.length;

    console.log(startIndex)
    console.log(stopIndex)
    console.log(len)
    if(len>=startIndex){
        if(len < stopIndex)
            stopIndex=len;            
        clearFacModalTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) {  
            a.push('<tr> <td style="display:none">' + facModalArray[i].id + '</td>')  
            a.push('<td style="width:60%">' + facModalArray[i].fac + '</td>');
            a.push('<td style="width:20%">' +  facModalArray[i].ftyp + '</td></tr>');

        }
        document.getElementById("tableFacModal").innerHTML = a.join("");
        // $("#indexFac").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}
   
// $("#nextFac").click(function(){
//     if(facTableIndex<maxFacTableIndex){
//         facTableIndex++;
//         displayFac(facTableIndex);
//     }  
// })

// $("#previousFac").click(function(){
//     if(facTableIndex>1){
//         facTableIndex--;
//         displayFac(facTableIndex);   
//     }         
// })