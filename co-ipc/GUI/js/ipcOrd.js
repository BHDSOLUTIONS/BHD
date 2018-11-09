// ------------------------Click Event---------------------


$("#ord_addOrd_btn").click(function() {
    
    if($("#ord_no_txt").val() != "" && $("#ord_ot_sel").val() != "" && $("#ord_dd_date").val() != "" && $("#ord_fdd_date").val() != ""
        && $("#ord_wc_sel").val() != "" && $("#ord_pri_sel").val() != "" ) {
        $("#ord_script_txt").append("*ORD{");
        $("#ord_script_txt").append("ORDNO=" + $("#ord_no_txt").val() + ";");
        $("#ord_script_txt").append("OT=" + $("#ord_ot_sel").val() + ";");
        $("#ord_script_txt").append("DD=" + $("#ord_dd_date").val() + ";");
        $("#ord_script_txt").append("FDD=" + $("#ord_fdd_date").val() + ";");
        $("#ord_script_txt").append("WC=" + $("#ord_wc_sel").val() + ";");
        $("#ord_script_txt").append("PRI=" + $("#ord_pri_sel").val() + ";");  
        
        ordDisableOrd();
        ordEnableCkt();
    }
    else {
        alert("All input fields in this row must be filled!")
    }

})


$("#ord_addCkt_btn").click(function() {
    if($("#ord_cktyp_sel").val() != "" && $("#ord_ctid_txt").val() != "" && $("#ord_adsr_sel").val() != "" && $("#ord_oc_sel").val() != ""
        && $("#ord_act_sel").val() != "" ) {
        $("#ord_script_txt").append("CKT{");
        $("#ord_script_txt").append("CTTYPE=" + $("#ord_cktyp_sel").val() + ";");
        $("#ord_script_txt").append("CTID=" + $("#ord_ctid_txt").val() + ";");
        $("#ord_script_txt").append("ADSR=" + $("#ord_adsr_sel").val() + ";");
        $("#ord_script_txt").append("OC=" + $("#ord_oc_sel").val() + ";");
        $("#ord_script_txt").append("ACT=" + $("#ord_act_sel").val() + ";");

        if($("#ord_act_sel").val() == 'I') {
            $("#ord_con_sel").val("IN");
            $("#ord_con_sel").prop("disabled",true);
        }
        else if($("#ord_act_sel").val() == 'O') {
            $("#ord_con_sel").val("OUT");
            $("#ord_con_sel").prop("disabled",true);
        }
        else {
            $("#ord_con_sel").val("");
        }
        
        ordDisableCkt();
        ordEnableCon();

        if($("#ord_act_sel").val() == 'I') {
            $("#ord_con_sel").val("IN");
            $("#ord_con_sel").prop("disabled",true);
        }
        else if($("#ord_act_sel").val() == 'O') {
            $("#ord_con_sel").val("OUT");
            $("#ord_con_sel").prop("disabled",true);
        }
        else {
            $("#ord_con_sel").val("");
        }

        $("#ord_doneCkt_btn").prop("disabled",true);
        $("#ord_doneCon_btn").prop("disabled",true);
    }
    else {
        alert("All input fields in this row must be filled!")
    }
})


$("#ord_addCon_btn").click(function(){
    if($("#ord_con_sel").val() != "" && $("#ord_facId1_txt").val() != "" && $("#ord_facTyp1_txt").val() != "" && $("#ord_frloc1_txt").val() != ""
        && $("#ord_facId2_txt").val() != "" && $("#ord_facTyp2_sel").val() != "" && $("#ord_frloc2_txt").val() != "" ) {
        $("#ord_script_txt").append($("#ord_con_sel").val() + "{");

        $("#ord_script_txt").append("FAC{");
        $("#ord_script_txt").append("TYPE=" + $("#ord_facTyp1_txt").val() + ";");
        $("#ord_script_txt").append("ID=" + $("#ord_facId1_txt").val() + ";");
        $("#ord_script_txt").append("FRLOC=" + $("#ord_frloc1_txt").val() + ";");
        $("#ord_script_txt").append("}");

        $("#ord_script_txt").append("FAC{");
        $("#ord_script_txt").append("TYPE=" + $("#ord_facTyp2_sel").val() + ";");
        $("#ord_script_txt").append("ID=" + $("#ord_facId2_txt").val() + ";");
        $("#ord_script_txt").append("FRLOC=" + $("#ord_frloc2_txt").val() + ";");
        $("#ord_script_txt").append("}");

        $("#ord_script_txt").append("}");

        ordClrCon();
        if($("#ord_act_sel").val() == 'I') {
            $("#ord_con_sel").val("IN");
            $("#ord_con_sel").prop("disabled",true);
        }
        else if($("#ord_act_sel").val() == 'O') {
            $("#ord_con_sel").val("OUT");
            $("#ord_con_sel").prop("disabled",true);
        }
        else {
            $("#ord_con_sel").val("");
            $("#ord_con_sel").prop("disabled",false);
        }

        $("#ord_doneCon_btn").prop("disabled",false);

    }
    else {
        alert("All input fields in this row must be filled!")
    }

})


$("#ord_doneCon_btn").click(function() {
    //Close the CKT part
    $("#ord_script_txt").append("}");
    
    $("#ord_doneCon_btn").prop("disabled",true);
    $("#ord_doneCkt_btn").prop("disabled",false);

    ordClrCon();
    ordDisableCon();

    ordClrCkt();
    ordEnableCkt();


})


$("#ord_doneCkt_btn").click(function(){
    //Close the Order part
    $("#ord_script_txt").append("}%");

    $("#ord_doneCkt_btn").prop("disabled",true);
    $("#ord_saveOrd_btn").prop("disabled",false);

    ordClrCkt();
    ordDisableCkt();
})


$("#ord_clrScript").click(function() {
    ordClearForm();
    ordEnableOrd();
    ordDisableCkt();
    ordDisableCon();

    $("#ord_doneCon_btn").prop("disabled",true);
    $("#ord_doneCkt_btn").prop("disabled",true);
    $("#ord_saveOrd_btn").prop("disabled",true);
})


$("#ord_saveOrd_btn").click(function(){
    if($("#ord_script_txt").html() == "") {
        alert("There is nothing in the ORDER SCRIPT!")
    }
    else {
        ordQuery("add");
    }
})


// -------------------------Function------------------------
function ordQuery(action) {
    $.post("./php/coQueryOrd.php",{
        act:     action,
        user:       "ninh",
        foms:       $("#ord_script_txt").html(),
        ordno:      $("#ord_no_txt").val()
    },
    function(data,status){
        var obj = JSON.parse(data);
        console.log(obj);
        if (obj['rslt'] == 'fail') {
            alert(obj['reason']);
        }
        else {
            if(action == "add") {
                $("#ord_result_lbl").text("Order script is saved successfully!")
            }
        }

    })
}

function ordClearForm() {
    $("#ord_no_txt").val("");
    $("#ord_ot_sel").val("");
    $("#ord_dd_date").val("");
    $("#ord_fdd_date").val("");
    $("#ord_wc_sel").val("");
    $("#ord_pri_sel").val("");

    $("#ord_cktyp_sel").val("");
    $("#ord_ctid_txt").val("");
    $("#ord_adsr_sel").val("");
    $("#ord_oc_sel").val("");
    $("#ord_act_sel").val("");

    $("#ord_con_sel").val("");
    $("#ord_facId1_txt").val("");
    $("#ord_facTyp1_txt").val("");
    $("#ord_frloc1_txt").val("");
    $("#ord_facId2_txt").val("");
    $("#ord_facTyp2_sel").val("");
    $("#ord_frloc2_txt").val("");

    $("#ord_script_txt").html("");
   
}

function ordClrOrd() {
    $("#ord_no_txt").val("");
    $("#ord_ot_sel").val("");
    $("#ord_dd_date").val("");
    $("#ord_fdd_date").val("");
    $("#ord_wc_sel").val("");
    $("#ord_pri_sel").val("");
}


function ordClrCkt() {
    $("#ord_cktyp_sel").val("");
    $("#ord_ctid_txt").val("");
    $("#ord_adsr_sel").val("");
    $("#ord_oc_sel").val("");
    $("#ord_act_sel").val("");
}


function ordClrCon() {
    $("#ord_con_sel").val("");
    $("#ord_facId1_txt").val("");
    $("#ord_facTyp1_txt").val("");
    $("#ord_frloc1_txt").val("");
    $("#ord_facId2_txt").val("");
    $("#ord_facTyp2_sel").val("");
    $("#ord_frloc2_txt").val("");
}


function ordDisableOrd() {
    $("#ord_no_txt").prop("disabled",true);
    $("#ord_ot_sel").prop("disabled",true);
    $("#ord_dd_date").prop("disabled",true);
    $("#ord_fdd_date").prop("disabled",true);
    $("#ord_wc_sel").prop("disabled",true);
    $("#ord_pri_sel").prop("disabled",true);

    $("#ord_addOrd_btn").prop("disabled",true);
}


function ordEnableOrd() {
    $("#ord_no_txt").prop("disabled",false);
    $("#ord_ot_sel").prop("disabled",false);
    $("#ord_dd_date").prop("disabled",false);
    $("#ord_fdd_date").prop("disabled",false);
    $("#ord_wc_sel").prop("disabled",false);
    $("#ord_pri_sel").prop("disabled",false);

    $("#ord_addOrd_btn").prop("disabled",false);
}


function ordDisableCkt() {
    $("#ord_cktyp_sel").prop("disabled",true);
    $("#ord_ctid_txt").prop("disabled",true);
    $("#ord_adsr_sel").prop("disabled",true);
    $("#ord_oc_sel").prop("disabled",true);
    $("#ord_act_sel").prop("disabled",true);

    $("#ord_addCkt_btn").prop("disabled",true);
    
}


function ordEnableCkt() {
    $("#ord_cktyp_sel").prop("disabled",false);
    $("#ord_ctid_txt").prop("disabled",false);
    $("#ord_adsr_sel").prop("disabled",false);
    $("#ord_oc_sel").prop("disabled",false);
    $("#ord_act_sel").prop("disabled",false);

    $("#ord_addCkt_btn").prop("disabled",false);
    
}


function ordDisableCon() {
    $("#ord_con_sel").prop("disabled",true);
    $("#ord_facId1_txt").prop("disabled",true);
    $("#ord_facTyp1_txt").prop("disabled",true);
    $("#ord_frloc1_txt").prop("disabled",true);
    $("#ord_facId2_txt").prop("disabled",true);
    $("#ord_facTyp2_sel").prop("disabled",true);
    $("#ord_frloc2_txt").prop("disabled",true);

    $("#ord_addCon_btn").prop("disabled",true);
    

}


function ordEnableCon() {
    $("#ord_con_sel").prop("disabled",false);
    $("#ord_facId1_txt").prop("disabled",false);
    $("#ord_facTyp1_txt").prop("disabled",false);
    $("#ord_frloc1_txt").prop("disabled",false);
    $("#ord_facId2_txt").prop("disabled",false);
    $("#ord_facTyp2_sel").prop("disabled",false);
    $("#ord_frloc2_txt").prop("disabled",false);

    $("#ord_addCon_btn").prop("disabled",false);
    
}