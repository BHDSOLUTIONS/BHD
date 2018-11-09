var brdcst_tbl;
var brdcst_tableIndex;
var brdcst_maxTableIndex;

var msgTitle;

// ----------------------Click Events-----------------------------

$(document).on("click","#brdcst_tbl tr",function() {
    var dataRow= $(this).children("td").map(function() {
        return $(this).text();
    }).get();

    //Populate the information 
    $("#brdcst_id_num").val(dataRow[0]).change();
    $("#brdcst_user_txt").val(dataRow[1]).change();
    $("#brdcst_sa_sel").val(dataRow[2]).change();    
    $("#brdcst_title_txt").val(dataRow[3]).change();
    msgTitle = dataRow[3];
    $("#brdcst_detail_txt").val(dataRow[4]).change();
    $("#brdcst_date_txt").val(dataRow[5]).change();
       
            
    $(this).addClass("addColor"); //add class selected to current clicked row       
    $(this).siblings().removeClass( "addColor" ); //remove class selected from rest of the rows  
});


$("#brdcst_find_btn").click(function() {
    brdcstQuery("find");
});



$("#brdcst_next").click(function() {
    if (brdcst_tableIndex<brdcst_maxTableIndex) {
        brdcst_tableIndex++;
        brdcstDisplayTable(brdcst_tableIndex);
    }  
});


$("#brdcst_previous").click(function(){
    if (brdcst_tableIndex>1) {
        brdcst_tableIndex--;
        brdcstDisplayTable(brdcst_tableIndex);   
    }         
});


$("#brdcst_clear_btn").click(function() {
    brdcstClearForm();
});


$(document).on('mouseup', '[id = brdcst_act_sel]', function () {
    if ($("#brdcst_act_sel").val() != "") {
        brdcstModalClearForm();
    
        if ($("#brdcst_act_sel").val()  ==  "ADD") {

            $("#brdcstModal_user_txt").val($("#main_currentUser").text());
            $("#brdcstModal_act_txt").val($("#brdcst_act_sel").val());
            $("#brdcstModal_title_txt").prop("disabled",false);
            $("#brdcstModal_sa_sel").prop("disabled",false);
            $("#brdcstModal_detail_txt").prop("disabled",false);
            $("#brdcstModal").modal();
            
        } 
        else if ($("#brdcst_act_sel").val()  ==  "UPDATE") {
            if ($("#brdcst_id_num").val() !="") {
                $("#brdcstModal_title_txt").prop("disabled",false);
                $("#brdcstModal_sa_sel").prop("disabled",false);
                $("#brdcstModal_detail_txt").prop("disabled",false);
                brdcstPopulateModal();
                $("#brdcstModal").modal();
            }
            else {
                alert("Please select a MSG from the LIST OF NOTICICATIONS");
                brdcstClearForm();
			}
        } 
        else if ($("#brdcst_act_sel").val()  ==  "DELETE") {

            if ($("#brdcst_id_num").val() !="") {
                $("#brdcstModal_title_txt").prop("disabled",true);
                $("#brdcstModal_sa_sel").prop("disabled",true);
                $("#brdcstModal_detail_txt").prop("disabled",true);
                brdcstPopulateModal()
                $("#brdcstModal").modal();;
            }
            else {
                alert("Please select a MSG from the LIST OF NOTICICATIONS")
                brdcstClearForm();
			}
        }
    }
    

});

// -------------------Functions-------------------------------------

function brdcstQuery(action){
    
    $.post("./php/coQueryBroadcast.php",
    {     
        act:    action,
        user:   $("#main_currentUser").text(),
        uname:  $("#brdcst_user_txt").val(),
        sa:     $("#brdcst_sa_sel").val()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                if (action == "find") {
					alert("No Record Found");
					return;
				}
			}
			brdcst_tableIndex=0;
			brdcst_tbl = obj['rows'];
			var len = brdcst_tbl.length; 
			brdcst_maxTableIndex = Math.ceil(len/100.0);
            brdcst_tableIndex++;
			brdcstDisplayTable(brdcst_tableIndex);
        } 
    });
};


function brdcstDisplayTable(index){   
    var startIndex=(index-1)*100;
    var stopIndex = index *100;
    var len = brdcst_tbl.length;

    if (len>=startIndex) {
        if (len < stopIndex)
            stopIndex=len;            
        brdcstClearTable();
        var a = [];
        for (var i=0; i<stopIndex; i++) 
        {  
            a.push('<tr> <td style="display:none">' + brdcst_tbl[i].id + '</td>')  
            
            a.push('<td style="width:20%">' +  brdcst_tbl[i].user + '</td>');
            a.push('<td style="width:5%">' +  brdcst_tbl[i].sa + '</td>');
            a.push('<td style="width:50%">' +  brdcst_tbl[i].msg + '</td>');
            a.push('<td style="display:none">' +  brdcst_tbl[i].detail + '</td>');
            a.push('<td style="width:25%">' + brdcst_tbl[i].date + '</td></tr>');
        }
        document.getElementById("brdcst_tbl").innerHTML = a.join("");
        $("#brdcst_index_lbl").text("From "+(startIndex+1)+" to "+stopIndex);
    } 
}


function brdcstClearForm() {
    $("#brdcst_id_num").val("");
    $("#brdcst_date_txt").val("");
    $("#brdcst_user_txt").val("");
    $("#brdcst_sa_sel").val("");
    $("#brdcst_title_txt").val("");
    $("#brdcst_detail_txt").val("");
    $("#brdcst_act_sel").val("");
}


function brdcstClearTable() {
    $("#brdcst_tbl").empty();
}


function brdcstPopulateModal(){
    $("#brdcstModal_user_txt").val($("#brdcst_user_txt").val());
    $("#brdcstModal_sa_sel").val($("#brdcst_sa_sel").val());
    $("#brdcstModal_title_txt").val(msgTitle);
    $("#brdcstModal_detail_txt").val($("#brdcst_detail_txt").val());
    $("#brdcstModal_act_txt").val($("#brdcst_act_sel").val());
    
}


function brdcstCheckInfor(){
    if ($("#brdcst_id_num").val() != "")
        return true;
    else return false;
}


