var matrix_table;
var matrix_tableIndex;
var matrix_maxTableIndex;

// ----------------------Click Events-----------------------------

$(document).on("click","#matrix_table tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#matrixModal_card_id").val(dataRow[0]).change();
    $("#matrix_node").val(dataRow[1]).change();
    $("#matrix_slot").val(dataRow[2]).change();
     
    $("#matrix_type").val(dataRow[3]).change();       
    $("#matrix_stat").val(dataRow[4]).change();  
       
            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#matrix_find").click(function(){
    matrix_queryMatrix("query");
})



$("#matrix_next").click(function(){
    if (matrix_tableIndex<matrix_maxTableIndex)
    {
        matrix_tableIndex++;
        matrix_displayTable(matrix_tableIndex);
    }  
})


$("#matrix_previous").click(function(){
    if (matrix_tableIndex>1)
    {
        matrix_tableIndex--;
        matrix_displayTable(matrix_tableIndex);   
    }         
})


$("#matrix_clear").click(matrix_clearForm);


$(document).on('mouseup', '[id = matrix_act]', function () {
    if ($("#matrix_act").val() !="")
    {
        matrixModal_clearForm();
        if ($("#matrixModal_card_id").val() !=""){
            if ($("#matrix_act").val()  ==  "LCK")
            {
                
               
            } 
            else if ($("#matrix_act").val()  ==  "UN-LCK")
            {
                
            } 
            else if ($("#matrix_act").val()  ==  "REFRESH")
            {
    
            }
            matrix_populateMatrixModal()
            $("#matrixModal").modal();
        }
        else
            alert("Missing matrix card information!")
        
    }
    

})

// -------------------Functions-------------------------------------

function matrix_queryMatrix(action){
    
    $.post("./php/coQueryMatrix.php",
    {     
        act:    action,
        user:   $('#main_currentUser').text(),
        id:     $("#matrixModal_card_id").val(),
        node:   $("#matrix_node").val(),
        slot:   $("#matrix_slot").val(),
        type:   $("#matrix_type").val(),
        stat:   $("#matrix_stat").val(),
        
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
                matrix_tableIndex=0;
                matrix_table = obj['rows'];
                var len = matrix_table.length; 
                matrix_maxTableIndex = Math.ceil(len/100.0);
                matrix_tableIndex++;
                matrix_displayTable(matrix_tableIndex);
              
            }  
        } 
    });
}


function matrix_displayTable(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = matrix_table.length;

    if (len>=startIndex)
    {
        if (len < stopIndex)
            stopIndex=len;            
        matrix_clearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + matrix_table[i].id + '</td>')  
            a.push('<td style="width:30%">' + matrix_table[i].node + '</td>');
            a.push('<td style="width:10%">' +  matrix_table[i].slot + '</td>');
            a.push('<td style="width:30%">' +  matrix_table[i].type + '</td>');
            a.push('<td style="width:30%">' +  matrix_table[i].psta + '</td>');
        }
        document.getElementById("matrix_table").innerHTML = a.join("");
        $("#matrix_index").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function matrix_clearForm(){
    $("#matrixModal_card_id").val("");
    $("#matrix_node").val("");
    $("#matrix_slot").val("");
    $("#matrix_type").val("");
    $("#matrix_stat").val("");

    $("#matrix_act").val("");
}


function matrix_clearTable() {
    $("#matrix_table").empty();
}


function matrix_populateMatrixModal(){
    $("#matrixModal_node").val($("#matrix_node").val());
    $("#matrixModal_slot").val($("#matrix_slot").val());
    $("#matrixModal_type").val($("#matrix_type").val());
    $("#matrixModal_stat").val($("#matrix_stat").val());

    $("#matrixModal_act").val($("#matrix_act").val());
    
}


function matrix_checkInfor(){
    if ($("#matrixModal_card_id").val() != "")
        return true;
    else return false;
}


