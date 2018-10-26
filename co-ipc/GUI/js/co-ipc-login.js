
//----------------------Click Events----------------

$("#login").click(function(){

   
    if ($("#newPassword").val() == ""){
        $.post("./php/coQueryLogin.php",
        {    
            act:"login", 
            uname:$("#username").val(),
            pw:$("#password").val()
        },
        function (data, status) {       
            var obj = JSON.parse(data);
            console.log(obj)
            if (obj["rslt"] == "fail")
            {
                alert(obj['reason']);
            }
            else
            {
                $("#warningPage").hide();
                $("#loginPage").hide();

                $("#main_currentUser").text($('#username').val());
                $("#mainPage").show();
            } 
        });
    } 
    else 
    {
        $.post("./php/coQueryLogin.php",
        {    
            act:"firstlogin", 
            uname:$("#username").val(),
            pw:$("#password").val(),
            newpw:$("#newPassword").val()
        },
        function (data, status) {       
            var obj = JSON.parse(data);
            if (obj["rslt"] == "fail")
            {
                alert(obj['reason']);
            }
            else
            {
                $("#warningPage").hide();
                $("#loginPage").hide();

                $("#main_currentUser").text($('#username').val());
                $("#mainPage").show();
            } 
        });
    } 
})


$("#firstlogin").click(function(){
    if ($("#firstlogin").text() == "First time login? Click here!")
    {
        $("#newPassword").val("");
        $("#newpw").show();
        $("#firstlogin").text("Go back!")
    }
    else
    {
        $("#newPassword").val("");
        $("#newpw").hide();
        $("#firstlogin").text("First time login? Click here!")
    }
       
})
