
<?php	
	
	include './html/ipcHeader.html';
	include './html/ipcWarning.html';
	include './html/ipcLogin.html';

	include './html/ipcMainBegin.html';
	include './html/ipcFac.html';
	include './html/ipcPortmap.html';
	include './html/ipcSvc.html';
	include './html/ipcAlm.html';
	include './html/ipcUser.html';
	include './html/ipcMxc.html';
	include './html/ipcEvtLog.html';
	include './html/ipcBrdcst.html';
	include './html/ipcBatchExc.html';
	include './html/ipcOrd.html';
	include './html/ipcSysView.html';
	include './html/ipcWc.html';
	include './html/ipcWcModal.html';
	include './html/ipcMainEnd.html';
	include './html/ipcFacModal.html';
	include './html/ipcPortmapModal.html';
	include './html/ipcSvcModal.html';
	include './html/ipcAlmModal.html';
	include './html/ipcUserModal.html';
	include './html/ipcMxcModal.html';
	include './html/ipcBrdcstModal.html';
	include './html/ipcBatchExcModal.html';
	include './html/ipcFooter.html';
	
?>

<script>

$(document).ready(function() { 

	sysviewRefeshPage();
	opt_queryOpt("queryOpt");
	if ($("main_currentUser").text() == '')
	{
		$("#warning").show();
		$("#login").hide();
		$("#mainPage").hide();

	}
	else
	{
		$("#warning").hide();
		$("#login").hide();
		$("#mainPage").show();
	}

});

$("#warning_continue_btn").click(function(){
    $("#warning").hide();
    $("#login").show();
	$("#mainPage").hide();
})

</script>


