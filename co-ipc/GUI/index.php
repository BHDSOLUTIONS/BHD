
<?php	
	session_start();

	include './html/co-ipc-header.html';
	include './html/co-ipc-warning.html';
	include './html/co-ipc-login.html';

	include './html/co-ipc-menu.html';
	include './html/co-ipc-fac.html';
	include './html/co-ipc-portmap.html';
	include './html/co-ipc-prov.html';
	include './html/co-ipc-alarm.html';
	include './html/co-ipc-user.html';
	include './html/co-ipc-matrix.html';
	include './html/co-ipc-event.html';
	include './html/co-ipc-brdcst.html';
	include './html/co-ipc-batch.html';
	include './co-ipc-closeContainerTag.html';
	include './html/co-ipc-facModal.html';
	include './html/co-ipc-portMapModal.html';
	include './html/co-ipc-provModal.html';
	include './html/co-ipc-almModal.html';
	include './html/co-ipc-userModal.html';
	include './html/co-ipc-matrixModal.html';
	include './html/co-ipc-brdcstModal.html';
	include './html/co-ipc-batchModal.html';
	include './html/co-ipc-footer.html';
	
?>

<script>

var main_currentUser;
$(document).ready(function() { 

	setupFac_queryFac('query');
	main_currentUser = '<?php echo ($_SESSION['uname']) ?>'
	
	if (main_currentUser =='')
	{
		$("#warningPage").show();
		$("#loginPage").hide();

		$("#mainPage").hide();

	}
	else
	{
		$("#warningPage").hide();
		$("#loginPage").hide();
		$("#main_currentUser").text(main_currentUser);
		$("#mainPage").show();
	}

});

$("#continue").click(function(){
    $("#warningPage").hide();
    $("#loginPage").show();
	$("#mainPage").hide();
})


// var timeSinceLastInterAct = 0;

// $(document).mousemove(function() {
// 	timeSinceLastMove= new Date();
// });

// $(document).keyup(function() {

//     timeSinceLastMove= new Date();
// });
</script>


