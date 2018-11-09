
function opt_queryOpt(action) {

    $.post("./php/coQueryOpt.php", {
        act:  action,
        user: "ninh"
    }, function(data, status) {
        var obj = JSON.parse(data);
        if (obj['rslt'] == "fail")
            alert(obj['reason'])
        else {
            var  optVals = [];
            for (var i=0; i<obj['rows'].length; i++) 
            {  
                
                var tabName = obj['rows'][i]['fnc'];
                var selName = obj['rows'][i]['opt'];
                var optVal = obj['rows'][i]['optval'];
    
                if (!(tabName in optVals)) {
                    optVals[tabName] = [];
                    
                }
                if (!(selName in optVals[tabName])) {
                    optVals[tabName][selName] = [];
                   
                }
                if(optVals[tabName][selName].length == ""){
                    optVals[tabName][selName].push('<option></option>');
                }

                optVals[tabName][selName].push('<option>' + optVal + '</option>')
                
            }

            document.getElementById("fac_act_sel").innerHTML =  optVals["FACILITY"]["ACTION"].join("");

            document.getElementById("pm_act_sel").innerHTML =  optVals["PORTMAP"]["ACTION"].join("");
            document.getElementById("pm_ptyp_sel").innerHTML =  optVals["PORTMAP"]["PTYP"].join("");
            document.getElementById("pm_psta_sel").innerHTML =  optVals["PORTMAP"]["PSTA"].join("");

            document.getElementById("svc_act_sel").innerHTML =  optVals["SVCCONN"]["ACTION"].join("");
            document.getElementById("svc_mlo_sel").innerHTML =  optVals["SVCCONN"]["MLO"].join("");
            document.getElementById("svc_cls_sel").innerHTML =  optVals["SVCCONN"]["CLS"].join("");
            document.getElementById("svc_adsr_sel").innerHTML =  optVals["SVCCONN"]["ADSR"].join("");
            document.getElementById("svc_prot_sel").innerHTML =  optVals["SVCCONN"]["PROT"].join("");

            document.getElementById("wc_tzone_sel").innerHTML =  optVals["WC"]["TZONE"].join("");
            document.getElementById("wc_stat_sel").innerHTML =  optVals["WC"]["STAT"].join("");
            document.getElementById("wc_state_sel").innerHTML =  optVals["WC"]["STATE"].join("");
            document.getElementById("wc_act_sel").innerHTML =  optVals["WC"]["ACTION"].join("");
            document.getElementById("wcModal_tzone_sel").innerHTML =  optVals["WC"]["TZONE"].join("");
            document.getElementById("wcModal_stat_sel").innerHTML =  optVals["WC"]["STAT"].join("");
            document.getElementById("wcModal_state_sel").innerHTML =  optVals["WC"]["STATE"].join("");

        }

    })
}