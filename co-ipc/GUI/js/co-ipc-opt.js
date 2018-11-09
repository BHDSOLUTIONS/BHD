
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
            console.log()
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

            document.getElementById("setupFac_act").innerHTML =  optVals["FACILITY"]["ACTION"].join("");

            document.getElementById("pm_act").innerHTML =  optVals["PORTMAP"]["ACTION"].join("");
            document.getElementById("pm_ptyp").innerHTML =  optVals["PORTMAP"]["PTYP"].join("");
            document.getElementById("pm_psta").innerHTML =  optVals["PORTMAP"]["PSTA"].join("");

            document.getElementById("prov_act").innerHTML =  optVals["SVCCONN"]["ACTION"].join("");
            document.getElementById("prov_mlo").innerHTML =  optVals["SVCCONN"]["MLO"].join("");
            document.getElementById("prov_cls").innerHTML =  optVals["SVCCONN"]["CLS"].join("");
            document.getElementById("prov_adsr").innerHTML =  optVals["SVCCONN"]["ADSR"].join("");
            document.getElementById("prov_prot").innerHTML =  optVals["SVCCONN"]["PROT"].join("");

            document.getElementById("wc_tzone").innerHTML =  optVals["WC"]["TZONE"].join("");
            document.getElementById("wc_stat").innerHTML =  optVals["WC"]["STAT"].join("");
            document.getElementById("wc_state").innerHTML =  optVals["WC"]["STATE"].join("");
            document.getElementById("wc_act").innerHTML =  optVals["WC"]["ACTION"].join("");

        }


    })

}