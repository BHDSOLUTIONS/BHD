<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryBroadcast.php
 * Change history: 
 * 2018-10-10: created (Tracy)
 */


	include "coCommonFunctions.php";


    // Initialize Expected inputs
    $act = "";
	if (isset($_POST['act']))
		$act = $_POST['act'];
		
    // login username
	$user = "";
	if (isset($_POST['user']))
		$user = $_POST['user'];

	$uname = "";
	if (isset($_POST['uname']))
		$uname = $_POST['uname'];

	$sa = "";
	if (isset($_POST['sa']))
		$sa = $_POST['sa'];

	$id = "";
	if (isset($_POST['id']))
		$id = $_POST['id'];

	$stamp = 0 ;
	if (isset($_POST['stamp']))
		$id = $_POST['stamp'];

	$wcc = "";
	if (isset($_POST['wcc']))
		$wcc = $_POST['wcc'];

	$frm_id = "";
	if (isset($_POST['frm_id']))
		$frm_id = $_POST['frm_id'];

	$msg = "";
	if (isset($_POST['msg']))
		$msg = $_POST['msg'];

	$detail = "";
	if (isset($_POST['detail']))
		$detail = $_POST['detail'];

    
	// Dispatch to Functions
	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	
	
	if ($act == "query" || $act == "find") {
		$result = queryBroadcast($uname, $sa);
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	else if ($act == "ADD") {
		$result = addBroadcast();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	else if ($act == "DELETE") {
		$result = delBroadcast();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	else if ($act == "UPDATE") {
		$result = updBroadcast();
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

	function queryBroadcast($uname, $sa) {
		global $db, $user;

		$qry = "SELECT * FROM t_brdcst WHERE user LIKE '%$uname%' AND sa LIKE '%$sa%' ORDER BY date DESC";
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

	
	function addBroadcast() {
		global $db, $user, $stamp, $date, $wcc, $frm_id, $sa, $msg, $detail;

		$qry = "INSERT INTO t_brdcst VALUES (0,0,'" . $user . "', now(),'','', '" .  $sa . "','" .  $msg . "','" .  $detail . "')";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            // return result with query for data
		    $result =  queryBroadcast("", "");
        }
		return $result;
    }

	function delBroadcast() {
		global $db, $user, $stamp, $date, $wcc, $frm_id, $sa, $msg, $detail, $uname;

        if($uname != $user ) {
            // Check for authorized user - only the user who has added the Broadcast - can delete the broadcast
            // if not - others can not delete the Broadcast
            $result["rslt"] = "fail";
            $result["reason"] = "Unauthorized users : You can not delete this Broadcast";
		    return $result;

        }

		$qry = "DELETE FROM t_brdcst WHERE user LIKE '%$uname%' AND sa LIKE '%$sa%' ";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            // return result with query for data
		    $result =  queryBroadcast("", "");
        }
		return $result;
    }

	function updBroadcast() {
		global $db, $user, $stamp, $date, $wcc, $frm_id, $sa, $msg, $detail, $uname, $id;

        if($uname != $user ) {
            // Check for authorized user - only the user who has added the Broadcast - can delete the broadcast
            // if not - others can not delete the Broadcast
            $result["rslt"] = "fail";
            $result["reason"] = "Unauthorized users : You can not update this Broadcast";
		    return $result;

        }

		$qry = "UPDATE t_brdcst SET date=now(), wcc='" . $wcc . "' , frm_id='" . $frm_id . "' , sa='" . $sa . "' ,
        msg='" . $msg . "' , detail='" . $detail . "'  WHERE id=" . $id ;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            // return result with query for data
		    $result =  queryBroadcast("", "");
        }
		return $result;
    }
	
?>
