

$("#wcModal").on("hidden.bs.modal", wcHideModal);   //this calls the function wcHideModal when the wcModal is hidden (closed)

// -----------------------Click Events------------

$("#wcModal_close_btn").click(wcHideModal);         //this event calls the function wcHideModal when the close button is clicked
    
    /*
    function() {          //this calls the
    $("#wc");
    $("#wc_act_sel").val("");
    }
    */

$("#wcModal_submit_btn").click(function() {
    wcModalQuery($('#wcModal_act_txt').val());
})


$("#wcModal_clear_btn").click(wcModalClearForm);


// -------------------Functions-------------------


function wcHideModal() {                //the purpose of this function is to display the most current "updated" record in the wc page
    $("#wc");                           //this calls the WireCenter page through its id
    $("#wc_act_sel").val("");           //this changes the action select field within the wc page to blank
    wcDisplay();                        //this function puts all of the data from record index 1 (not reset) into the wc form
}

function wcModalDisplay(data) {
    var length = data.length;
    $("#wcModal_id_num").val(data[1].id);
    $("#wcModal_name_txt").val(data[1].wcname);
    $("#wcModal_wcc_txt").val(data[1].wcc);
    $("#wcModal_clli_txt").val(data[1].clli);
    $("#wcModal_npanxx_txt").val(data[1].npanxx);
    $("#wcModal_frloc_txt").val(data[1].frloc);
    $("#wcModal_tzone_sel").val(data[1].tzone);
    $("#wcModal_stat_sel").val(data[1].stat);
    $("#wcModal_addr_txt").val(data[1].loc);
    $("#wcModal_city_txt").val(data[1].city);
    $("#wcModal_state_sel").val(data[1].state);
    $("#wcModal_zip_txt").val(data[1].zip);
    $("#wcModal_gps_txt").val(data[1].gps);
    $("#wcModal_company_txt").val(data[1].company);
    $("#wcModal_region_txt").val(data[1].region);
    $("#wcModal_area_txt").val(data[1].area);
    $("#wcModal_district_txt").val(data[1].district);
    $("#wcModal_manager_txt").val(data[1].manager);
    //$("#wcModal_act_txt").val("");

}

function wcModalClearForm() {
    $("#wcModal_id_num").val("");
    $("#wcModal_name_txt").val("");
    $("#wcModal_wcc_txt").val("");
    $("#wcModal_clli_txt").val("");
    $("#wcModal_npanxx_txt").val("");
    $("#wcModal_frloc_txt").val("");
    $("#wcModal_tzone_sel").val("");
    $("#wcModal_stat_sel").val("");
    $("#wcModal_addr_txt").val("");
    $("#wcModal_city_txt").val("");
    $("#wcModal_state_sel").val("");
    $("#wcModal_zip_txt").val("");
    $("#wcModal_gps_txt").val("");
    $("#wcModal_company_txt").val("");
    $("#wcModal_region_txt").val("");
    $("#wcModal_area_txt").val("");
    $("#wcModal_district_txt").val("");
    $("#wcModal_manager_txt").val("");
    $("#wcModal_result_lbl").text("");
    //$("#wcModal_act_txt").val("");
    wcPopulateModal();
    
}

  
function wcPopulateModal() {
  $("#wcModal_act_txt").val($("#wc_act_sel").val());
  
  $("#wcModal_id_num").val($("#wc_id_num").val());
  $("#wcModal_name_txt").val($("#wc_name_txt").val());
  $("#wcModal_wcc_txt").val($("#wc_wcc_txt").val());
  $("#wcModal_clli_txt").val($("#wc_clli_txt").val());
  $("#wcModal_npanxx_txt").val($("#wc_npanxx_txt").val());
  $("#wcModal_frloc_txt").val($("#wc_frloc_txt").val());
  $("#wcModal_tzone_sel").val($("#wc_tzone_sel").val());
  $("#wcModal_stat_sel").val($("#wc_stat_sel").val());
  $("#wcModal_addr_txt").val($("#wc_addr_txt").val());
  $("#wcModal_city_txt").val($("#wc_city_txt").val());
  $("#wcModal_state_sel").val($("#wc_state_sel").val());
  $("#wcModal_zip_txt").val($("#wc_zip_txt").val());
  $("#wcModal_gps_txt").val($("#wc_gps_txt").val());
  $("#wcModal_company_txt").val($("#wc_company_txt").val());
  $("#wcModal_region_txt").val($("#wc_region_txt").val());
  $("#wcModal_area_txt").val($("#wc_area_txt").val());
  $("#wcModal_district_txt").val($("#wc_district_txt").val());
  $("#wcModal_manager_txt").val($("#wc_manager_txt").val());
}


function wcModalQuery(action){
  
    $.post("./php/coQueryWc.php",
    {     
        act:        action,
        user:       $('#main_currentUser').text(),
        id:         $("#wcModal_id_num").val(),
        wcname:     $("#wcModal_name_txt").val(),
        wcc:        $("#wcModal_wcc_txt").val(),
        clli:       $("#wcModal_clli_txt").val(),
        npanxx:     $("#wcModal_npanxx_txt").val(),
        frloc:      $("#wcModal_frloc_txt").val(),
        tzone:      $("#wcModal_tzone_sel").val(),
        stat:       $("#wcModal_stat_sel").val(),
        addr:       $("#wcModal_addr_txt").val(),
        city:       $("#wcModal_city_txt").val(),
        state:      $("#wcModal_state_sel").val(),
        zip:        $("#wcModal_zip_txt").val(),
        gps:        $("#wcModal_gps_txt").val(),
        company:    $("#wcModal_company_txt").val(),
        region:     $("#wcModal_region_txt").val(),
        area:       $("#wcModal_area_txt").val(),
        district:   $("#wcModal_district_txt").val(),
        manager:    $("#wcModal_manager_txt").val()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            debugger
            alert(obj['reason']);
        }
        else {
               wcData = obj['rows'];
                wcDisplay(wcData);

                if (action == "UPDATE") {
                    wcDisplay(wcData);
                    $("#wcModal_result_lbl").text("Update is successful")
                }
                else if (action == "RESET") {
                    wcDisplayReset(wcData);
                    $("#wcModal_result_lbl").text("Reset is successful")
                }

        } 
    });
}
