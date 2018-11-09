
//----------------------Click Events----------------

$("#login_btn").click(function() {

   
    if ($("#login_newPassWord").val() == "") {
        $.post("./php/coQueryLogin.php",
        {    
            act:    "login", 
            uname:  $("#login_username").val(),
            pw:     $("#login_password").val()
        },
        function (data, status) {       
            var obj = JSON.parse(data);
            if (obj["rslt"] == "fail") {
                alert(obj['reason']);
            }
            else {
                $("#main_currentUser").text($('#login_username').val());
                $("#login_username").val("");
                $("#login_password").val("");
                $("#login_newPassWord").val("");
                $("#warning").hide();
                $("#login").hide();
                $("#mainPage").show();
                if($("#mainPage").is(":visible")) {
                    brdcstQuery('query');
                }
           } 
        });
    } 
    else {
        $.post("./php/coQueryLogin.php",
        {    
            act:    "firstLogin", 
            uname:  $("#login_username").val(),
            pw:     $("#login_password").val(),
            login_displayFirstLogin:  $("#login_newPassWord").val()
        },
        function (data, status) {       
            var obj = JSON.parse(data);
            if (obj["rslt"] == "fail") {
                alert(obj['reason']);
            }
            else {
                $("#main_currentUser").text($('#login_username').val());
                $("#login_username").val("");
                $("#login_password").val("");
                $("#login_newPassWord").val("");
                $("#warningp").hide();
                $("#login").hide();
                $("#mainPage").show();
             } 
        });
    } 
})


$("#login_firstLogin").click(function(){
    if ($("#login_firstLogin").text() == "First time login? Click here!") {
        $("#login_newPassWord").val("");
        $("#login_displayFirstLogin").show();
        $("#login_firstLogin").text("Go back!")
    }
    else {
        $("#login_newPassWord").val("");
        $("#login_displayFirstLogin").hide();
        $("#login_firstLogin").text("First time login? Click here!")
    }
       
})
