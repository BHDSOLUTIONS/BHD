var brdcst_table;
var brdcst_tableIndex;
var brdcst_maxTableIndex;

var msgTitle;

// ----------------------Click Events-----------------------------

$(document).on("click","#brdcst_table tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#brdcstModal_id").val(dataRow[0]).change();
   
    $("#brdcst_user").val(dataRow[1]).change();
     
    $("#brdcst_sa").val(dataRow[2]).change();    
    msgTitle = dataRow[3]  
    $("#brdcst_detail").val(dataRow[4]).change();
    $("#brdcst_date").val(dataRow[5]).change();
       
            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#brdcst_find").click(function(){
    brdcst_queryBrdcst("query");
})



$("#brdcst_next").click(function(){
    if (brdcst_tableIndex<brdcst_maxTableIndex)
    {
        brdcst_tableIndex++;
        brdcst_displayTable(brdcst_tableIndex);
    }  
})


$("#brdcst_previous").click(function(){
    if (brdcst_tableIndex>1)
    {
        brdcst_tableIndex--;
        brdcst_displayTable(brdcst_tableIndex);   
    }         
})


$("#brdcst_clear").click(brdcst_clearForm);


$(document).on('mouseup', '[id = brdcst_act]', function () {
    if ($("#brdcst_act").val() !="")
    {
        brdcstModal_clearForm();
    
        if ($("#brdcst_act").val()  ==  "ADD")
        {

            $("#brdcstModal_user").val($("#main_currentUser").text());
            $("#brdcstModal_act").val($("#brdcst_act").val());

            $("#brdcstModal_title").prop("disabled",false)
            $("#brdcstModal_sa").prop("disabled",false)
            $("#brdcstModal_detail").prop("disabled",false)

            $("#brdcstModal").modal();
            
        } 
        else if ($("#brdcst_act").val()  ==  "UPD")
        {
            if ($("#brdcstModal_id").val() !=""){
                $("#brdcstModal_title").prop("disabled",false)
                $("#brdcstModal_sa").prop("disabled",false)
                $("#brdcstModal_detail").prop("disabled",false)
                brdcst_populateBrdcstModal()
                $("#brdcstModal").modal();
            }
            else
                alert("Missing message information!")
        } 
        else if ($("#brdcst_act").val()  ==  "DEL") {

            if ($("#brdcstModal_id").val() !=""){
                $("#brdcstModal_title").prop("disabled",true)
                $("#brdcstModal_sa").prop("disabled",true)
                $("#brdcstModal_detail").prop("disabled",true)
                brdcst_populateBrdcstModal()
                $("#brdcstModal").modal();
            }
            else
                alert("Missing message information!")
        }
    }
    

})

// -------------------Functions-------------------------------------

function brdcst_queryBrdcst(action){
    
    $.post("./php/coQueryBroadcast.php",
    {     
        act:    action,
        user:   "ninh",
        uname:  $("#brdcst_user").val(),
        sa:     $("#brdcst_sa").val(),
       
        
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
                brdcst_tableIndex=0;
                brdcst_table = obj['rows'];
                var len = brdcst_table.length; 
                brdcst_maxTableIndex = Math.ceil(len/100.0);
                brdcst_tableIndex++;
                brdcst_displayTable(brdcst_tableIndex);
              
            }  
        } 
    });
}


function brdcst_displayTable(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = brdcst_table.length;

    if (len>=startIndex)
    {
        if (len < stopIndex)
            stopIndex=len;            
        brdcst_clearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + brdcst_table[i].id + '</td>')  
            
            a.push('<td style="width:20%">' +  brdcst_table[i].user + '</td>');
            a.push('<td style="width:5%">' +  brdcst_table[i].sa + '</td>');
            a.push('<td style="width:50%">' +  brdcst_table[i].msg + '</td>');
            a.push('<td style="display:none">' +  brdcst_table[i].detail + '</td>');
            a.push('<td style="width:25%">' + brdcst_table[i].date + '</td></tr>');
        }
        document.getElementById("brdcst_table").innerHTML = a.join("");
        $("#brdcst_index").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function brdcst_clearForm(){
    $("#brdcstModal_id").val("");
    $("#brdcst_date").val("");
    $("#brdcst_user").val("");
    $("#brdcst_sa").val("");
    $("#brdcst_detail").val("");

    $("#brdcst_act").val("");
}


function brdcst_clearTable() {
    $("#brdcst_table").empty();
}


function brdcst_populateBrdcstModal(){
    $("#brdcstModal_user").val($("#brdcst_user").val());
    $("#brdcstModal_sa").val($("#brdcst_sa").val());
    $("#brdcstModal_title").val(msgTitle);
    $("#brdcstModal_detail").val($("#brdcst_detail").val());
   
    $("#brdcstModal_act").val($("#brdcst_act").val());
    
}


function brdcst_checkInfor(){
    if ($("#brdcstModal_id").val() != "")
        return true;
    else return false;
}


