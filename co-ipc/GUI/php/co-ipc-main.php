

<?php

session_start();

include '../html/co-ipc-menu.html';
include '../html/co-ipc-fac.html';
include '../html/co-ipc-portmap.html';
include '../html/co-ipc-prov.html';
include '../html/co-ipc-alarm.html';
include '../html/co-ipc-user.html';
include '../co-ipc-closeContainerTag.html';
include '../html/co-ipc-facModal.html';
include '../html/co-ipc-portMapModal.html';
include '../html/co-ipc-provModal.html';
include '../html/co-ipc-almModal.html';
include '../html/co-ipc-userModal.html';
include '../html/co-ipc-footer.html';
?>
<script>
    var currentUser= '<?php echo $_SESSION['uname'] ?>' ;
    $("#logout").click(function(){
        $.post("coQueryLogout.php",
        {
            uname: currentUser
        },function(data,status){
            var obj = JSON.parse(data);
            if(obj["rslt"]=="fail"){
                alert(obj['reason']);
            }else{
                 window.open("../index.html","_self")
            }
        }
    )});
</script>