// ----------------------Click Events--------------------------------------------

$("#wc_clear").click(wc_clearForm);


$(document).on('mouseup', '[id *= wc_act]', function () {
    if($("#wc_id").val() !="") {
        if ($("#wc_act").val()  ==  "UPDATE"){
            wc_queryWc("update")
        } 
        else if ($("#wc_act").val()  ==  "RESET")
        {
            wc_queryWc("reset")
        } 
    }
    else {
        alert("There is no wire center information!")
    }
   
});

// -----------------------------Functions----------------------------


function wc_queryWc(action){
    
    $.post("./php/coQueryWc.php",
    {     
        act: action,
        user: 'ninh',
        id: $("#wc_id").val(),
        wcname: $("#wc_name").val(),
        wcc: $("#wc_wcc").val(),
        clli: $("#wc_clli").val(),
        npanxx: $("#wc_npanxx").val(),
        frloc: $("#wc_frloc").val(),
        tzone: $("#wc_tzone").val(),
        stat: $("#wc_stat").val(),
        addr: $("#wc_addr").val(),
        city: $("#wc_city").val(),
        state: $("#wc_state").val(),
        zip: $("#wc_zip").val(),
        gps: $("#wc_gps").val(),
        company: $("#wc_company").val(),
        region: $("#wc_region").val(),
        area: $("#wc_area").val(),
        district: $("#wc_district").val(),
        manager: $("#wc_manager").val()
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
            else {
                wc_displayWc(obj['rows'])

                if(action=="update") $("#wc_result").text("Update is successful")
                else if(action == "reset") $("#wc_result").text("Reset is successful")
            }

        } 
    });
}


function wc_displayWc(data){
    var length = data.length;
    $("#wc_id").val(data[length-1].id);
    $("#wc_name").val(data[length-1].wcname);
    $("#wc_wcc").val(data[length-1].wcc);
    $("#wc_clli").val(data[length-1].clli);
    $("#wc_npanxx").val(data[length-1].npanxx);
    $("#wc_frloc").val(data[length-1].frloc);
    $("#wc_tzone").val(data[length-1].tzone);
    $("#wc_stat").val(data[length-1].stat);

    $("#wc_addr").val(data[length-1].addr);
    $("#wc_city").val(data[length-1].city);
    $("#wc_state").val(data[length-1].state);
    $("#wc_zip").val(data[length-1].zip);
    $("#wc_gps").val(data[length-1].gps);

    $("#wc_company").val(data[length-1].company);
    $("#wc_region").val(data[length-1].region);
    $("#wc_area").val(data[length-1].area);
    $("#wc_district").val(data[length-1].district);
    $("#wc_manager").val(data[length-1].manager);

    $("#wc_act").val("");

}


function wc_clearForm(){
    $("#wc_id").val("");
    $("#wc_name").val("");
    $("#wc_wcc").val("");
    $("#wc_clli").val("");
    $("#wc_npanxx").val("");
    $("#wc_frloc").val("");
    $("#wc_tzone").val("");
    $("#wc_stat").val("");

    $("#wc_addr").val("");
    $("#wc_city").val("");
    $("#wc_state").val("");
    $("#wc_zip").val("");
    $("#wc_gps").val("");

    $("#wc_company").val("");
    $("#wc_region").val("");
    $("#wc_area").val("");
    $("#wc_district").val("");
    $("#wc_manager").val("");

    $("#wc_result").text("");
    $("#wc_act").val("");
}
