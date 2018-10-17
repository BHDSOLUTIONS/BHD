$(document).ready(function() { 
    
 
});

$("#login").click(function(){

    if($("#newPassword").val() == ""){
        $.post("../php/coQueryLogin.php",
        {    
            act:"login", 
            uname:$("#username").val(),
            pw:$("#password").val()
        },
        function (data, status) {       
            var obj = JSON.parse(data);
            console.log(obj)
            if(obj["rslt"]=="fail"){
                alert(obj['reason']);
            }else{
                if(obj['rows'].length==0){
                    alert("Wrong username or password!");
                }
                else{
                    if(obj['rows'][0].pw == obj['rows'][0].ssn)
                        alert("You are the new employee! Please click on first login to change password!")
                    else
                        window.open("../php/co-ipc-main.php","_self")
                }  
            } 
        });
    } else {
        $.post("../php/coQueryLogin.php",
        {    
            act:"firstlogin", 
            uname:$("#username").val(),
            pw:$("#password").val(),
            newpw:$("#newPassword").val()
        },
        function (data, status) {       
            var obj = JSON.parse(data);
            if(obj["rslt"]=="fail"){
                alert(obj['reason']);
            }else{
                if(obj['rows'].length==0){
                    alert("Wrong username or password!");
                }
                else{
                    window.open("../php/co-ipc-main.php","_self")
                }  
                
            } 
        });
    } 
})

$("#firstlogin").click(function(){
    if($("#firstlogin").text()=="First time login? Click here!"){
        $("#newPassword").val("");
        $("#newpw").show();
        $("#firstlogin").text("Go back!")
    }
    else{
        $("#newPassword").val("");
        $("#newpw").hide();
        $("#firstlogin").text("First time login? Click here!")
    }
       
})