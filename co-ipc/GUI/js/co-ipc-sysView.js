$(document).on("click",".sysView_node button",function(){

    //Add border to the row
    $(this).addClass("addBorder"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addBorder" ); //remove class selected from rest of the rows  

    sysView_nodeIndex = parseInt(this.id.slice(this.id.indexOf("_")+2));
    //change mio and XY to default
    sysView_mioIndex =1;
    $("#sysView_mio1").addClass("addBGColor")
    $("#sysView_mio1").siblings().removeClass("addBGColor")
    sysView_xy ='x';
    $("#sysView_x").addClass("addBGColor")
    $("#sysView_x").siblings().removeClass("addBGColor")

    sysView_queryPort();
    
});

$(document).on("click",".sysView_mio a",function(){

    //Add border to the row
    $(this).addClass("addBGColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addBGColor" ); //remove class selected from rest of the rows  

    sysView_mioIndex = parseInt(this.id.slice(this.id.indexOf("_")+4));
    //change XY to default
    sysView_xy='x';
    $("#sysView_x").addClass("addBGColor")
    $("#sysView_x").siblings().removeClass("addBGColor")
    sysView_queryPort();
});

$(document).on("click",".sysView_XY a",function(){

    //Add border to the row
    $(this).addClass("addBGColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addBGColor" ); //remove class selected from rest of the rows  

    sysView_xy = String(this.id.slice(this.id.indexOf("_")+1));
   
    sysView_queryPort();
});

var sysView_nodeIndex;
var sysView_mioIndex;
var sysView_xy;
var sysView_ptyp;
var sysView_port = [];

function sysView_refeshPage(){
    sysView_nodeIndex = 1;
    $("#sysView_n1").addClass("addBorder"); 
    $("#sysView_n1").siblings().removeClass("addBorder"); 
    sysView_mioIndex = 1;
    $("#sysView_mio1").addClass("addBGColor")
    $("#sysView_mio1").siblings().removeClass("addBGColor")
    sysView_xy = 'x';
    $("#sysView_x").addClass("addBGColor")
    $("#sysView_x").siblings().removeClass("addBGColor")
    sysView_queryPort();
}


function sysView_queryPort() {

    $.post("./php/coQueryPort.php",
    {
        act:	"QUERYMIO",
        user:	'ninh',
        node:	sysView_nodeIndex,
        slot:	sysView_mioIndex,
        ptyp:	sysView_xy,
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"]  ==  "fail") {
            alert(obj['reason']);
        }
        else {

            $("#sysView_leftPort").empty();
            $("#sysView_rightPort").empty();

            if (obj['rows'].length  ==  0)
                alert("No record found");
            sysView_port = obj["rows"];
            sysView_createPort();
        }
    });
}

function sysView_createPort() {
    var a =[];
    for (var i=0; i < sysView_port.length/2; i++) {
        a.push('<button type="button" id="sysView_'+sysView_xy+sysView_port[i].id+'">&nbsp'+sysView_port[i].pnum+'<br>&nbsp'+sysView_port[i].psta+'<br>&nbsp'+sysView_port[i].fac+'</button>')
        $(document).on("click","#sysView_"+sysView_xy+sysView_port[i].id,function(){
            
        })
    }

    document.getElementById("sysView_leftPort").innerHTML = a.join("");
    

    a =[];
    for (var i=sysView_port.length/2; i < sysView_port.length; i++) {
        a.push('<button type="button" id="sysView_'+sysView_xy+sysView_port[i].id+'">&nbsp'+sysView_port[i].pnum+'<br>&nbsp'+sysView_port[i].psta+'<br>&nbsp'+sysView_port[i].fac+'</button>')
        $(document).on("click","#sysView_"+sysView_xy+sysView_port[i].id,function(){
            
        })
    }
    document.getElementById("sysView_rightPort").innerHTML = a.join("");


    for (var i=0; i <sysView_port.length; i++) { 
        $("#sysView_"+sysView_xy+sysView_port[i].id).addClass("addPortStyle");
        if (sysView_port[i].psta == "CONN") {
            $("#sysView_"+sysView_xy+sysView_port[i].id).css("background-color","#7BC63E")
        }
        else if (sysView_port[i].psta == "SF") {
            $("#sysView_"+sysView_xy+sysView_port[i].id).css("background-color","#F75A00")
        }
    }
}