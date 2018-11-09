$(document).on("click",".sysview_node button",function() {

    //Add border to the row
    $(this).addClass("addBorder"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addBorder" ); //remove class selected from rest of the rows  

    sysview_nodeIndex = parseInt(this.id.slice(this.id.indexOf("_")+2));
    //change mio and XY to default
    sysview_mioIndex =1;
    $("#sysview_mio1").addClass("addBGColor")
    $("#sysview_mio1").siblings().removeClass("addBGColor")
    sysview_xy ='x';
    $("#sysview_x").addClass("addBGColor")
    $("#sysview_x").siblings().removeClass("addBGColor")

    sysviewQuery();
    
});

$(document).on("click",".sysview_mio a",function() {

    //Add border to the row
    $(this).addClass("addBGColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addBGColor" ); //remove class selected from rest of the rows  

    sysview_mioIndex = parseInt(this.id.slice(this.id.indexOf("_")+4));
    //change XY to default
    sysview_xy='x';
    $("#sysview_x").addClass("addBGColor")
    $("#sysview_x").siblings().removeClass("addBGColor")
    sysviewQuery();
});

$(document).on("click",".sysview_XY a",function() {

    //Add border to the row
    $(this).addClass("addBGColor"); //add class selected to current clicked row
    $(this).siblings().removeClass( "addBGColor" ); //remove class selected from rest of the rows  

    sysview_xy = String(this.id.slice(this.id.indexOf("_")+1));
   
    sysviewQuery();
});

var sysview_nodeIndex;
var sysview_mioIndex;
var sysview_xy;
var sysview_ptyp;
var sysview_port = [];

function sysviewRefeshPage() {
    sysviewQueryNodes();
    sysview_nodeIndex = 1;
    $("#sysview_n1_btn").addClass("addBorder"); 
    $("#sysview_n1_btn").siblings().removeClass("addBorder"); 
    sysview_mioIndex = 1;
    $("#sysview_mio1").addClass("addBGColor")
    $("#sysview_mio1").siblings().removeClass("addBGColor")
    sysview_xy = 'x';
    $("#sysview_x").addClass("addBGColor")
    $("#sysview_x").siblings().removeClass("addBGColor")
    sysviewQuery();
}


function sysviewQueryNodes() {

    $.post("./php/coQueryPort.php",
    {
        act:	"queryNode",
        user:	$("#main_currentUser").text()
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"]  ==  "fail") {
            alert(obj['reason']);
        }
        else {
            var len = obj['rows'].length;
            var rows = obj['rows'];
            for (i=0; i<len; i++) {
                $('#sysview_n' + rows[i].node + '_btn').html("<small>Node " + rows[i].node + "<br>" + rows[i].stat + "<br>" + "Alm: " + rows[i].alm + "<br>" + rows[i].temp + "  |  " + rows[i].volt);
                $('#sysview_n' + rows[i].node + '_btn').addClass("addNodeStyle");
            }
        }
    });
}

function sysviewQuery() {

    $.post("./php/coQueryPort.php",
    {
        act:	"QUERYMIO",
        user:	'ninh',
        node:	sysview_nodeIndex,
        slot:	sysview_mioIndex,
        ptyp:	sysview_xy,
    },
    function (data, status) {
        var obj = JSON.parse(data);
        if (obj["rslt"]  ==  "fail") {
            alert(obj['reason']);
        }
        else {

            $("#sysview_leftPort").empty();
            $("#sysview_rightPort").empty();

            if (obj['rows'].length  ==  0)
                alert("No record found");
            sysview_port = obj["rows"];
            sysviewCreatePort();
        }
    });
}

function sysviewCreatePort() {
    var a =[];
    for (var i=0; i < sysview_port.length/2; i++) {
        var port = sysview_port[i].node + '.' + sysview_port[i].slot + '.' + sysview_port[i].ptyp + '.' + sysview_port[i].pnum;
        a.push('<button type="button" id="sysview_' + sysview_xy + sysview_port[i].id + '">&nbsp' + port + '<br>&nbsp' + sysview_port[i].psta + '<br>&nbsp' + sysview_port[i].fac + '</button>')
        $(document).on("click","#sysview_"+sysview_xy+sysview_port[i].id,function(){
            
        })
    }

    document.getElementById("sysview_leftPort").innerHTML = a.join("");
    

    a = [];
    for (var i=sysview_port.length/2; i < sysview_port.length; i++) {
        var port = sysview_port[i].node + '.' + sysview_port[i].slot + '.' + sysview_port[i].ptyp + '.' + sysview_port[i].pnum;
        a.push('<button type="button" id="sysview_' + sysview_xy + sysview_port[i].id + '">&nbsp' + port + '<br>&nbsp' + sysview_port[i].psta + '<br>&nbsp' + sysview_port[i].fac + '</button>')
        $(document).on("click","#sysview_"+sysview_xy+sysview_port[i].id,function() {
            
        })
    }
    document.getElementById("sysview_rightPort").innerHTML = a.join("");


    for (var i=0; i <sysview_port.length; i++) { 
        $("#sysview_"+sysview_xy+sysview_port[i].id).addClass("addPortStyle");
        if (sysview_port[i].psta == "CONN") {
            $("#sysview_"+sysview_xy+sysview_port[i].id).css("background-color","#7BC63E")
        }
        else if (sysview_port[i].psta == "SF") {
            $("#sysview_"+sysview_xy+sysview_port[i].id).css("background-color","#F75A00")
        }
    }
}