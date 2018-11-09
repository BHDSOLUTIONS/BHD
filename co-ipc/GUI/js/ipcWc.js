
// WC OBJ //
var wc = {
    act :       $("#wc_act_sel"),
    id:         $("#wc_id_num"),
    wcname:     $("#wc_wcname_txt"),
    wcc:        $("#wc_wcc_txt"),
    clli:       $("#wc_clli_txt"),
    npanxx:     $("#wc_npanxx_txt"),
    frloc:      $("#wc_frloc_txt"),
    tzone:      $("#wc_tzone_sel"),
    stat:       $("#wc_stat_sel"),
    addr:       $("#wc_addr_txt"),
    city:       $("#wc_city_txt"),
    state:      $("#wc_state_sel"),
    zip:        $("#wc_zip_txt"),
    gps:        $("#wc_gps_txt"),
    company:    $("#wc_company_txt"),
    region:     $("#wc_region_txt"),
    area:       $("#wc_area_txt"),
    district:   $("#wc_district_txt"),
    manager:    $("#wc_manager_txt"),
    tblRows:    [],


    displayForm: function() {
        this.id.val(this.tblRows[1].id);
        this.wcname.val(this.tblRows[1].wcname);
        this.wcc.val(this.tblRows[1].wcc);
        this.clli.val(this.tblRows[1].clli);
        this.npanxx.val(this.tblRows[1].npanxx);
        this.frloc.val(this.tblRows[1].frloc);
        this.tzone.val(this.tblRows[1].tzone);
        this.stat.val(this.tblRows[1].stat);
        this.addr.val(this.tblRows[1].loc);
        this.city.val(this.tblRows[1].city);
        this.state.val(this.tblRows[1].state);
        this.zip.val(this.tblRows[1].zip);
        this.gps.val(this.tblRows[1].gps);
        this.company.val(this.tblRows[1].company);
        this.region.val(this.tblRows[1].region);
        this.area.val(this.tblRows[1].area);
        this.district.val(this.tblRows[1].district);
        this.manager.val(this.tblRows[1].manager);
    }
}

// WCMODAL OBJ //
var wcModal = {
    modal:      $("#wcModal"),
    act :       $("#wcModal_act_txt"),
    id:         $("#wcModal_id_num"),
    wcname:     $("#wcModal_wcname_txt"),
    wcc:        $("#wcModal_wcc_txt"),
    clli:       $("#wcModal_clli_txt"),
    npanxx:     $("#wcModal_npanxx_txt"),
    frloc:      $("#wcModal_frloc_txt"),
    tzone:      $("#wcModal_tzone_sel"),
    stat:       $("#wcModal_stat_sel"),
    addr:       $("#wcModal_addr_txt"),
    city:       $("#wcModal_city_txt"),
    state:      $("#wcModal_state_sel"),
    zip:        $("#wcModal_zip_txt"),
    gps:        $("#wcModal_gps_txt"),
    company:    $("#wcModal_company_txt"),
    region:     $("#wcModal_region_txt"),
    area:       $("#wcModal_area_txt"),
    district:   $("#wcModal_district_txt"),
    manager:    $("#wcModal_manager_txt"),
    result:     $("#wcModal_result_lbl"),
    submitBtn:  $("#wcModal_submit_btn"),
    closeBtn:   $("#wcModal_close_btn"),
    cancelBtn:  $("#wcModal_clear_btn"),
    tblRows:     [],

    displayForm: function() {
        this.id.val(this.tblRows[1].id);
        this.wcname.val(this.tblRows[1].wcname);
        this.wcc.val(this.tblRows[1].wcc);
        this.clli.val(this.tblRows[1].clli);
        this.npanxx.val(this.tblRows[1].npanxx);
        this.frloc.val(this.tblRows[1].frloc);
        this.tzone.val(this.tblRows[1].tzone);
        this.stat.val(this.tblRows[1].stat);
        this.addr.val(this.tblRows[1].loc);
        this.city.val(this.tblRows[1].city);
        this.state.val(this.tblRows[1].state);
        this.zip.val(this.tblRows[1].zip);
        this.gps.val(this.tblRows[1].gps);
        this.company.val(this.tblRows[1].company);
        this.region.val(this.tblRows[1].region);
        this.area.val(this.tblRows[1].area);
        this.district.val(this.tblRows[1].district);
        this.manager.val(this.tblRows[1].manager);
    },

    resetForm: function() {
        this.wcname.val(this.tblRows[0].wcname);
        this.wcc.val(this.tblRows[0].wcc);
        this.clli.val(this.tblRows[0].clli);
        this.npanxx.val(this.tblRows[0].npanxx);
        this.frloc.val(this.tblRows[0].frloc);
        this.tzone.val(this.tblRows[0].tzone);
        this.stat.val(this.tblRows[0].stat);
        this.addr.val(this.tblRows[0].loc);
        this.city.val(this.tblRows[0].city);
        this.state.val(this.tblRows[0].state);
        this.zip.val(this.tblRows[0].zip);
        this.gps.val(this.tblRows[0].gps);
        this.company.val(this.tblRows[0].company);
        this.region.val(this.tblRows[0].region);
        this.area.val(this.tblRows[0].area);
        this.district.val(this.tblRows[0].district);
        this.manager.val(this.tblRows[0].manager);
    },

    disableForm: function() {
        this.act.prop("disabled","disabled");
        this.wcname.prop("disabled","disabled");
        this.wcc.prop("disabled","disabled");
        this.clli.prop("disabled","disabled");
        this.npanxx.prop("disabled","disabled");
        this.frloc.prop("disabled","disabled");
        this.tzone.prop("disabled","disabled");
        this.stat.prop("disabled","disabled");
        this.addr.prop("disabled","disabled");
        this.city.prop("disabled","disabled");
        this.state.prop("disabled","disabled");
        this.zip.prop("disabled","disabled");
        this.gps.prop("disabled","disabled");
        this.company.prop("disabled","disabled");
        this.region.prop("disabled","disabled");
        this.area.prop("disabled","disabled");
        this.district.prop("disabled","disabled");
        this.manager.prop("disabled","disabled");
        this.cancelBtn.hide();
    },

    enableForm: function() {
        this.act.prop("disabled",false);
        this.wcname.prop("disabled",false);
        this.wcc.prop("disabled",false);
        this.clli.prop("disabled",false);
        this.npanxx.prop("disabled",false);
        this.frloc.prop("disabled",false);
        this.tzone.prop("disabled",false);
        this.stat.prop("disabled",false);
        this.addr.prop("disabled",false);
        this.city.prop("disabled",false);
        this.state.prop("disabled",false);
        this.zip.prop("disabled",false);
        this.gps.prop("disabled",false);
        this.company.prop("disabled",false);
        this.region.prop("disabled",false);
        this.area.prop("disabled",false);
        this.district.prop("disabled",false);
        this.manager.prop("disabled",false);
        this.cancelBtn.show();
    }
}

// WC Events Handling
$(document).on('mouseup', '[id = wc_act_sel]', function () {
    
    if (wc.id.val() != "") {
        if (wc.act.val()  ==  "UPDATE") {
            wcModal.act.val(wc.act.val());
            wcModal.id.val(wc.id.val());
            wcModal.displayForm();            
            wcModal.modal.modal();
        } 
        else if ($("#wc_act_sel").val()  ==  "RESET") {
            wcModal.act.val(wc.act.val());
            wcModal.id.val(wc.id.val());
            wcModal.tblRows = wc.tblRows;
            wcModal.resetForm();
            wcModal.disableForm();
            wcModal.modal.modal();
        } 
    }   
});


// WCMODAL Events Handling
wcModal.submitBtn.click(function () {
    if (wcModal.id.val() != "") {
        wcModalQuery(wcModal.act.val()); 
    }
    else {
        alert ("Missing WC ID");
    }
});

wcModal.cancelBtn.click(function() {
    wcModal.displayForm();
})

wcModal.modal.on("hidden.bs.modal", function(){
    wc.act.val("");
    wcModal.result.text("");
});


// Ajax Functions
function wcQuery(action) {
    
    $.post("./php/coQueryWc.php",
    {     
        act:        action,
        user:       $("#main_currentUser").text(),
        id:         wc.id.val(),
        wcname:     wc.wcname.val(),
        wcc:        wc.wcc.val(),
        clli:       wc.clli.val(),
        npanxx:     wc.npanxx.val(),
        frloc:      wc.frloc.val(),
        tzone:      wc.tzone.val(),
        stat:       wc.stat.val(),
        addr:       wc.addr.val(),
        city:       wc.city.val(),
        state:      wc.state.val(),
        zip:        wc.zip.val(),
        gps:        wc.gps.val(),
        company:    wc.company.val(),
        region:     wc.region.val(),
        area:       wc.area.val(),
        district:   wc.district.val(),
        manager:    wc.manager.val()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            alert(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                if (action != "query") {
					alert("No Record Found");
					return;
				}
            }
            else {
                wc.tblRows = obj['rows'];
                wcModal.tblRows = wc.tblRows;
                wc.displayForm();
            }
        } 
    });
}


function wcModalQuery(action) {
    
    $.post("./php/coQueryWc.php",
    {     
        act:        action,
        user:       $("#main_currentUser").text(),
        id:         wcModal.id.val(),
        wcname:     wcModal.wcname.val(),
        wcc:        wcModal.wcc.val(),
        clli:       wcModal.clli.val(),
        npanxx:     wcModal.npanxx.val(),
        frloc:      wcModal.frloc.val(),
        tzone:      wcModal.tzone.val(),
        stat:       wcModal.stat.val(),
        addr:       wcModal.addr.val(),
        city:       wcModal.city.val(),
        state:      wcModal.state.val(),
        zip:        wcModal.zip.val(),
        gps:        wcModal.gps.val(),
        company:    wcModal.company.val(),
        region:     wcModal.region.val(),
        area:       wcModal.area.val(),
        district:   wcModal.district.val(),
        manager:    wcModal.manager.val()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail") {
            wcModal.result.text(obj['reason']);
        }
        else {
            if (obj['rows'].length == 0) {
                if (action != "query") {
					wcModal.result.text("No Record Found");
					return;
				}
            }
            else {
                wcModal.tblRows = obj['rows'];
                wcModal.displayForm();
                wcModal.result.text(obj['rslt']);
                wc.tblRows = wcModal.tblRows;
                wc.act.val();
                wc.displayForm();
            }
        } 
    });
}
