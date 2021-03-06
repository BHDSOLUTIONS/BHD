
<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryLogout.php
 * Change history: 
 * 2018-10-16: created (Thanh)
 */
 
    include "coCommonFunctions.php";
    
    //session_start();

	$user = "";
	if(isset($_POST['user']))
		$user = $_POST['user'];

    
  	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	
   
    $evtLog = new EvtLog($user,"USERS","LOGOUT");
   
    $qry = "update t_users set stat = 'INACTIVE' where uname = '$user'"; 

    $res = $db->query($qry);
    if (!$res) {
        
        $result["rslt"] = "fail";
        $result["reason"] = mysqli_error($db);
    }
    else {
		if ($db->affected_rows == 0) {
			$result["rslt"] = "fail";
			$result["reason"] = "Invalid USER";
		}
		else {
			$result["rslt"] = "success";
			$result["reason"] = "userLogout";
		}
    }
    $evtLog->log($result["rslt"], $result["reason"]);
    mysqli_close($db);
    echo json_encode($result);
    
    //session_unset(); 
    //session_destroy();


?>
