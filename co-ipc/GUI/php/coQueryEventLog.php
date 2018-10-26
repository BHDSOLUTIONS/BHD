<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryEventLog.php
 * Change history: 
 * 2018-10-10: created (Tracy)
 */


	include "coCommonFunctions.php";


    // Initialize Expected inputs
    $act = "";
	if (isset($_POST['act']))
		$act = $_POST['act'];
		
	$user = "";
	if (isset($_POST['user']))
		$user = $_POST['user'];

	$uname = "";
	if (isset($_POST['uname']))
		$uname = $_POST['uname'];

	$fnc = "";
	if (isset($_POST['fnc']))
		$fnc = $_POST['fnc'];

	$evt = "";
	if (isset($_POST['evt']))
		$evt = $_POST['evt'];

	$days = "";
	if (isset($_POST['date']))
		$typ = $_POST['date'];

	// Dispatch to Functions
	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	
	
	if ($act == "query") {
		$result = queryEvtlog();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "Invalid ACTION";
		echo json_encode($result);
		return;
	}


	/* Functions section */
	function queryEvtlog() {
		global $db, $user, $uname, $fnc, $evt, $days;

		if ($days == "")
			$days = "-30";
		else if ($days == "Last 1 day")
			$days = "-1";
		else if ($days == "Last 5 days")
			$days = "-5";
		else if ($days == "Last 10 days")
			$days = "-10";
		else if ($days == "Last 30 days")
			$days = "-30";
		else
			$days = "-30";
		
		$time = date("Y-m-d H:i:s", strtotime("now " . $days . " days"));
			
		$qry = "SELECT * FROM t_evtlog WHERE user LIKE '%$uname%' AND fnc LIKE '%$fnc%' AND evt LIKE '%$evt%' AND time > '$time'";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            $rows = [];
            $result["rslt"] = "success";
            if ($res->num_rows > 0) {
                while ($row = $res->fetch_assoc()) {
                    $rows[] = $row;
                }
            }
            $result["rows"] = $rows;
        }
		return $result;
		 
    }

	
	
?>
