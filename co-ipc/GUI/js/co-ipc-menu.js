
$(document).ready(function() { 
    setupFac_query('query');
 
});
$("#menuFacSet").click(function(){
    setupFac_clearForm()
    setupFac_query('query');
})
$("#menuPortMap").click(function(){
    pm_clearForm();
    pm_queryPort('query');
})
$("#menuProv").click(function(){
    clearCktForm();
    // clearCktConForm();
    queryCkt('query');
})

$("#menuAlm").click(function(){
    adminAlm_clearForm()
    adminAlm_query('query');
})
$("#menuUserSet").click(function(){
    setupUser_clearForm()
    setupUser_query('query');
})

$(document).on("click","#displayMenu",function(){
   
    if($('#menu').css('display') == 'block'){    
        $("#menu").hide()     
    }
    else {
        $("#menu").show()
    }
});

$(window).resize(checkWinSize)
$("#mainView").click(checkWinSize);

function checkWinSize(){
    if (window.matchMedia('(max-width: 1100px)').matches) {
        $("#menu").hide()
    } else {
        $("#menu").show()
    }
}  
