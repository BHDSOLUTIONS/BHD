// ------------------------Click Event---------------------


$("#ord_addOrd").click(function(){
    
    if($("#ord_no").val() != "" && $("#ord_ot").val() != "" && $("#ord_dd").val() != "" && $("#ord_fdd").val() != ""
        && $("#ord_wc").val() != "" && $("#ord_pri").val() != "" )
    {
        $("#ord_script").append("*ORD{");
        $("#ord_script").append("ORDNO=" + $("#ord_no").val() + ";");
        $("#ord_script").append("OT=" + $("#ord_ot").val() + ";");
        $("#ord_script").append("DD=" + $("#ord_dd").val() + ";");
        $("#ord_script").append("FDD=" + $("#ord_fdd").val() + ";");
        $("#ord_script").append("WC=" + $("#ord_wc").val() + ";");
        $("#ord_script").append("PRI=" + $("#ord_pri").val() + ";");  
        
        ord_disableOrd();
        ord_enableCkt();
    }
    else
    {
        alert("All input fields in this row must be filled!")
    }

})


$("#ord_addCkt").click(function(){
    if($("#ord_cktyp").val() != "" && $("#ord_ctid").val() != "" && $("#ord_adsr").val() != "" && $("#ord_oc").val() != ""
        && $("#ord_act").val() != "" )
    {
        $("#ord_script").append("CKT{");
        $("#ord_script").append("CTTYPE=" + $("#ord_cktyp").val() + ";");
        $("#ord_script").append("CTID=" + $("#ord_ctid").val() + ";");
        $("#ord_script").append("ADSR=" + $("#ord_adsr").val() + ";");
        $("#ord_script").append("OC=" + $("#ord_oc").val() + ";");
        $("#ord_script").append("ACT=" + $("#ord_act").val() + ";");

        if($("#ord_act").val() == 'I') {
            $("#ord_con").val("IN");
            $("#ord_con").prop("disabled",true);
        }
        else if($("#ord_act").val() == 'O') {
            $("#ord_con").val("OUT");
            $("#ord_con").prop("disabled",true);
        }
        else 
        {
            $("#ord_con").val("");
        }
        
        ord_disableCkt();
        ord_enableCon();

        if($("#ord_act").val() == 'I') {
            $("#ord_con").val("IN");
            $("#ord_con").prop("disabled",true);
        }
        else if($("#ord_act").val() == 'O') {
            $("#ord_con").val("OUT");
            $("#ord_con").prop("disabled",true);
        }
        else 
        {
            $("#ord_con").val("");
        }

        $("#ord_doneCkt").prop("disabled",true);
        $("#ord_doneCon").prop("disabled",true);
    }
    else
    {
        alert("All input fields in this row must be filled!")
    }
})


$("#ord_addCon").click(function(){
    if($("#ord_con").val() != "" && $("#ord_facId1").val() != "" && $("#ord_facTyp1").val() != "" && $("#ord_frloc1").val() != ""
        && $("#ord_facId2").val() != "" && $("#ord_facTyp2").val() != "" && $("#ord_frloc2").val() != "" )
    {
        $("#ord_script").append($("#ord_con").val() + "{");

        $("#ord_script").append("FAC{");
        $("#ord_script").append("TYPE=" + $("#ord_facTyp1").val() + ";");
        $("#ord_script").append("ID=" + $("#ord_facId1").val() + ";");
        $("#ord_script").append("FRLOC=" + $("#ord_frloc1").val() + ";");
        $("#ord_script").append("}");

        $("#ord_script").append("FAC{");
        $("#ord_script").append("TYPE=" + $("#ord_facTyp2").val() + ";");
        $("#ord_script").append("ID=" + $("#ord_facId2").val() + ";");
        $("#ord_script").append("FRLOC=" + $("#ord_frloc2").val() + ";");
        $("#ord_script").append("}");

        $("#ord_script").append("}");

        ord_clrCon();
        if($("#ord_act").val() == 'I') {
            $("#ord_con").val("IN");
            $("#ord_con").prop("disabled",true);
        }
        else if($("#ord_act").val() == 'O') {
            $("#ord_con").val("OUT");
            $("#ord_con").prop("disabled",true);
        }
        else 
        {
            $("#ord_con").val("");
            $("#ord_con").prop("disabled",false);
        }

        $("#ord_doneCon").prop("disabled",false);

    }
    else
    {
        alert("All input fields in this row must be filled!")
    }

})


$("#ord_doneCon").click(function(){
    //Close the CKT part
    $("#ord_script").append("}");
    
    $("#ord_doneCon").prop("disabled",true);
    $("#ord_doneCkt").prop("disabled",false);

    ord_clrCon();
    ord_disableCon();

    ord_clrCkt();
    ord_enableCkt();


})


$("#ord_doneCkt").click(function(){
    //Close the Order part
    $("#ord_script").append("}%");

    $("#ord_doneCkt").prop("disabled",true);
    $("#ord_saveOrd").prop("disabled",false);

    ord_clrCkt();
    ord_disableCkt();
})


$("#ord_clrScript").click(function(){
    ord_clearForm();
    ord_enableOrd();
    ord_disableCkt();
    ord_disableCon();

    $("#ord_doneCon").prop("disabled",true);
    $("#ord_doneCkt").prop("disabled",true);
    $("#ord_saveOrd").prop("disabled",true);
})


$("#ord_saveOrd").click(function(){
    if($("#ord_script").html() == "")
        alert("There is nothing in the ORDER SCRIPT!")
    else
        ord_queryOrd("add");
})


// -------------------------Function------------------------
function ord_queryOrd(action) {
    $.post("./php/coQueryOrd.php",{
        act:     action,
        user:       "ninh",
        foms:       $("#ord_script").html(),
        ordno:      $("#ord_no").val()
    },
    function(data,status){
        var obj = JSON.parse(data);
        console.log(obj);
        if (obj['rslt'] == 'fail') {
            alert(obj['reason']);
        }
        else
        {
            if(action == "add") {
                $("#ord_result").text("Order script is saved successfully!")
            }
        }

    })
}

function ord_clearForm() {
    $("#ord_no").val("");
    $("#ord_ot").val("");
    $("#ord_dd").val("");
    $("#ord_fdd").val("");
    $("#ord_wc").val("");
    $("#ord_pri").val("");

    $("#ord_cktyp").val("");
    $("#ord_ctid").val("");
    $("#ord_adsr").val("");
    $("#ord_oc").val("");
    $("#ord_act").val("");

    $("#ord_con").val("");
    $("#ord_facId1").val("");
    $("#ord_facTyp1").val("");
    $("#ord_frloc1").val("");
    $("#ord_facId2").val("");
    $("#ord_facTyp2").val("");
    $("#ord_frloc2").val("");

    $("#ord_script").html("");
   
}

function ord_clrOrd() {
    $("#ord_no").val("");
    $("#ord_ot").val("");
    $("#ord_dd").val("");
    $("#ord_fdd").val("");
    $("#ord_wc").val("");
    $("#ord_pri").val("");
}


function ord_clrCkt() {
    $("#ord_cktyp").val("");
    $("#ord_ctid").val("");
    $("#ord_adsr").val("");
    $("#ord_oc").val("");
    $("#ord_act").val("");
}


function ord_clrCon() {
    $("#ord_con").val("");
    $("#ord_facId1").val("");
    $("#ord_facTyp1").val("");
    $("#ord_frloc1").val("");
    $("#ord_facId2").val("");
    $("#ord_facTyp2").val("");
    $("#ord_frloc2").val("");
}


function ord_disableOrd() {
    $("#ord_no").prop("disabled",true);
    $("#ord_ot").prop("disabled",true);
    $("#ord_dd").prop("disabled",true);
    $("#ord_fdd").prop("disabled",true);
    $("#ord_wc").prop("disabled",true);
    $("#ord_pri").prop("disabled",true);

    $("#ord_addOrd").prop("disabled",true);
}


function ord_enableOrd() {
    $("#ord_no").prop("disabled",false);
    $("#ord_ot").prop("disabled",false);
    $("#ord_dd").prop("disabled",false);
    $("#ord_fdd").prop("disabled",false);
    $("#ord_wc").prop("disabled",false);
    $("#ord_pri").prop("disabled",false);

    $("#ord_addOrd").prop("disabled",false);
}


function ord_disableCkt() {
    $("#ord_cktyp").prop("disabled",true);
    $("#ord_ctid").prop("disabled",true);
    $("#ord_adsr").prop("disabled",true);
    $("#ord_oc").prop("disabled",true);
    $("#ord_act").prop("disabled",true);

    $("#ord_addCkt").prop("disabled",true);
    
}


function ord_enableCkt() {
    $("#ord_cktyp").prop("disabled",false);
    $("#ord_ctid").prop("disabled",false);
    $("#ord_adsr").prop("disabled",false);
    $("#ord_oc").prop("disabled",false);
    $("#ord_act").prop("disabled",false);

    $("#ord_addCkt").prop("disabled",false);
    
}


function ord_disableCon() {
    $("#ord_con").prop("disabled",true);
    $("#ord_facId1").prop("disabled",true);
    $("#ord_facTyp1").prop("disabled",true);
    $("#ord_frloc1").prop("disabled",true);
    $("#ord_facId2").prop("disabled",true);
    $("#ord_facTyp2").prop("disabled",true);
    $("#ord_frloc2").prop("disabled",true);

    $("#ord_addCon").prop("disabled",true);
    

}


function ord_enableCon() {
    $("#ord_con").prop("disabled",false);
    $("#ord_facId1").prop("disabled",false);
    $("#ord_facTyp1").prop("disabled",false);
    $("#ord_frloc1").prop("disabled",false);
    $("#ord_facId2").prop("disabled",false);
    $("#ord_facTyp2").prop("disabled",false);
    $("#ord_frloc2").prop("disabled",false);

    $("#ord_addCon").prop("disabled",false);
    
}