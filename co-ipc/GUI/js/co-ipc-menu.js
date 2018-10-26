

$(window).resize(checkWinSize)

// ---------------------Click Events-----------------------


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