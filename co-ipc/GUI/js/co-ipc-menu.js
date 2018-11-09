

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
            $("#warningPage").show();
            $("#loginPage").hide();
            $("#main_currentUser").text("");
            $("#mainPage").hide();
			brdcst_clearForm();
			pm_clearForm();
			prov_clearForm();
			prov_clearTableCktCon();
			setupFac_clearForm();
			matrix_clearForm();
			batch_clearForm();
			adminAlm_clearForm();
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



$("#menuFacSet").click(function(){
    setupFac_clearForm()
    setupFac_queryFac('query');
})


$("#menuPortMap").click(function(){
    pm_clearForm()
    pm_queryPort("query");
})


$("#menuProv").click(function(){
    prov_clearForm();
    // clearCktConForm();
    prov_queryCkt('query');
})


$("#menuAlm").click(function(){
    adminAlm_clearForm()
    adminAlm_queryAlm('query');
})


$("#menuUserSet").click(function(){
    setupUser_clearForm()
    setupUser_queryUser('query');
})

$("#menuMatrix").click(function(){
    matrix_clearForm()
    matrix_queryMatrix('query');
})


$("#menuEvent").click(function(){
    event_clearForm()
    event_queryEvent('query');
})

$("#menuBrdcst").click(function(){
    brdcst_clearForm()
    brdcst_queryBrdcst('query');
})

$("#menuBatch").click(function(){
    batch_clearForm()
    batch_queryBatch('query');
})

$("#menuSysView").click(function(){
    sysView_refeshPage();
})

$("#menuWcSet").click(function(){
    wc_clearForm();
})

$(document).on("click","#displayMenu",function(){
   
    if ($('#menu').css('display')  ==  'block')
    {    
        $("#menu").hide()     
    }
    else 
    {
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
