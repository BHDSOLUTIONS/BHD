

$(window).resize(checkWinSize)

// ---------------------Click Events-----------------------

$("#logout").click(function () {
	
    $.post("./php/coQueryLogout.php",
    {    
        user:	$("#main_currentUser").text()
    },
    function (data, status) {       
        var obj = JSON.parse(data);
        if (obj["rslt"] == "fail")
        {
            alert(obj['reason']);
        }
        else
        {
            $("#warning").show();
            $("#login").hide();
            $("#main_currentUser").text("");
            $("#mainPage").hide();
			brdcstClearForm();
			pm_clearForm();
			svcClearForm();
			svcClearTableCktCon();
			fac_clearForm();
			mxcClearForm();
			batchExcClearForm();
			alm_clearForm();
			setupUser_clearForm();
			event_clearForm();
        } 
    });
});


$("#configMenu").click(function(){
    $("#configSubMenu").toggle();
   
})

$("#provMenu").click(function(){
    $("#provSubMenu").toggle();
})


$("#maintnMenu").click(function(){
    $("#maintnSubMenu").toggle();
})
$("#adminMenu").click(function(){
    $("#adminSubMenu").toggle();
})

$("#reportMenu").click(function(){
    $("#reportSubMenu").toggle();
})



$("#menu_fac").click(function(){
    facClearForm()
    facQuery('query');
})


$("#menu_portmap").click(function(){
    pmClearForm()
    pmQuery("query");
})


$("#menu_svc").click(function(){
    svcClearForm();
    // clearCktConForm();
    svcQueryCkt('query');
})


$("#menu_alm").click(function(){
    almClearForm()
    almQueryAlm('query');
})


$("#menu_user").click(function(){
    userClearForm()
    userQuery('query');
})

$("#menu_mxc").click(function(){
    mxcClearForm()
    mxcQuery('query');
})


$("#menu_evtlog").click(function(){
    evtlogClearForm()
    evtlogQuery('query');
})

$("#menu_brdcst").click(function(){
    brdcstClearForm()
    brdcstQuery('query');
})

$("#menu_batch").click(function(){
    batchExcClearForm()
    batchExcQuery('query');
})

$("#menu_sysview").click(function(){
    sysviewRefeshPage();
})

$("#menu_wc").click(function(){
    //wc.clearForm();
    wcQuery('query');
})


$("#menu_ord").click(function(){
    ordClearForm();
    ordEnableOrd();
    ordDisableCkt();
    ordDisableCon();

    $("#ord_doneCkt_btn").prop("disabled",true);
    $("#ord_doneCon_btn").prop("disabled",true);
    $("#ord_saveOrd_btn").prop("disabled",true);
   
})

$(document).on("click","#displayMenu",function(){
   
    if ($('#menu').css('display')  ==  'block') {    
        $("#menu").hide()     
    }
    else {
        $("#menu").show()
    }
});

$("#mainView").click(checkWinSize);


// -----------------Functions---------------------------------

function checkWinSize(){
    if (window.matchMedia('(max-width: 1100px)').matches) {
        $("#menu").hide()
    } else {
        $("#menu").show()
    }
}  
