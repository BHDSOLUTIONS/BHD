var mxc_tbl;
var mxc_tableIndex;
var mxc_maxTableIndex;

// ----------------------Click Events-----------------------------

$(document).on("click","#mxc_tbl tr",function(){
    var dataRow= $(this).children("td").map(function(){
        return $(this).text();
    }).get();

    //Populate the information 
    $("#mxcModal_id_num").val(dataRow[0]).change();
    $("#mxc_node_txt").val(dataRow[1]).change();
    $("#mxc_slot_txt").val(dataRow[2]).change();
     
    $("#mxc_type_sel").val(dataRow[3]).change();       
    $("#mxc_stat_sel").val(dataRow[4]).change();  
       
            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#mxc_find_btn").click(function(){
    mxcQuery("query");
})



$("#mxc_next").click(function(){
    if (mxc_tableIndex<mxc_maxTableIndex) {
        mxc_tableIndex++;
        mxcDisplayTable(mxc_tableIndex);
    }  
})


$("#mxc_previous").click(function(){
    if (mxc_tableIndex>1) {
        mxc_tableIndex--;
        mxcDisplayTable(mxc_tableIndex);   
    }         
})


$("#mxc_clear_btn").click(mxcClearForm);


$(document).on('mouseup', '[id = mxc_act_sel]', function () {
    if ($("#mxc_act_sel").val() !="") {
        mxcModalClearForm();
        if ($("#mxcModal_id_num").val() !="") {
            mxcPopulateModal()
            $("#mxcModal").modal();
        }
        else {
            alert("Please select a CARD from LIST OF MATRIX CARDS")
        }
        
    }

})

// -------------------Functions-------------------------------------

function mxcQuery(action){
    
    $.post("./php/coQueryMatrix.php",
    {     
        act:    action,
        user:   $('#main_currentUser').text(),
        id:     $("#mxcModal_id_num").val(),
        node:   $("#mxc_node_txt").val(),
        slot:   $("#mxc_slot_txt").val(),
        type:   $("#mxc_type_sel").val(),
        stat:   $("#mxc_stat_sel").val(),
        
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                alert("There is no matching data!");
            }
            else {
                mxc_tableIndex=0;
                mxc_tbl = obj['rows'];
                var len = mxc_tbl.length; 
                mxc_maxTableIndex = Math.ceil(len/100.0);
                mxc_tableIndex++;
                mxcDisplayTable(mxc_tableIndex);
              
            }  
        } 
    });
}


function mxcDisplayTable(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = mxc_tbl.length;

    if (len>=startIndex) {
        if (len < stopIndex) {
            stopIndex=len;    
        }        
        mxcClearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + mxc_tbl[i].id + '</td>')  
            a.push('<td style="width:30%">' + mxc_tbl[i].node + '</td>');
            a.push('<td style="width:10%">' +  mxc_tbl[i].slot + '</td>');
            a.push('<td style="width:30%">' +  mxc_tbl[i].type + '</td>');
            a.push('<td style="width:30%">' +  mxc_tbl[i].psta + '</td>');
        }
        document.getElementById("mxc_tbl").innerHTML = a.join("");
        $("#mxc_index_lbl").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function mxcClearForm() {
    $("#mxcModal_id_num").val("");
    $("#mxc_node_txt").val("");
    $("#mxc_slot_txt").val("");
    $("#mxc_type_sel").val("");
    $("#mxc_stat_sel").val("");
    $("#mxc_act_sel").val("");
}


function mxcClearTable() {
    $("#mxc_tbl").empty();
}


function mxcPopulateModal(){
    $("#mxcModal_node_txt").val($("#mxc_node_txt").val());
    $("#mxcModal_slot_txt").val($("#mxc_slot_txt").val());
    $("#mxcModal_type_sel").val($("#mxc_type_sel").val());
    $("#mxcModal_stat_sel").val($("#mxc_stat_sel").val());

    $("#mxcModal_act_txt").val($("#mxc_act_sel").val());
    
}


function mxcCheckInfor(){
    if ($("#mxcModal_id_num").val() != "") {
        return true;
    }
    else {
        return false;
    }
}


