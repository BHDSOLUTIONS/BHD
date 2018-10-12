
$(document).ready(function() { 
    queryFac('query');
 
});
$("#menuFacSet").click(function(){
    clearFacForm()
    queryFac('query');
})

$("#menuPortMap").click(function(){
    clearPortForm();
    queryPort('query');
})



$("#menuProv").click(function(){
    clearCktForm();
    clearCktConForm();
    queryCkt('query');
})

$("#menuAlm").click(function(){
    clearAlmForm()
    queryAlm('query');
})
$("#menuUserSet").click(function(){
    clearUserForm()
    queryUser('query');
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
