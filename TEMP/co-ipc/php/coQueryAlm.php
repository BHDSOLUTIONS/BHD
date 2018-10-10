<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryAlm.php
 * Change history: 
 * 09-27-2018: created (Tracy)
 */

	include "coCommonFunctions.php";
 
    $act = $_POST['act'];
    $ack = $_POST['ack'];
    $almid = $_POST['almid'];
    $descr = $_POST['descr'];
    $user = $_POST['user'];
    
    //test data
    //$act="ack";
	//$ack="NINH";
	//$almid = 1;
	//$descr = "ABC";
	
	//$db = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
	$db = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
	if (mysqli_connect_errno()) {
		$result["rslt"] = "fail";
		$result["reason"] = mysqli_connect_error();
		mysqli_close($db);
		echo json_encode($result);
		return;
	}
	
	if ($act == "query") {
		$result = queryAlm();
		echo json_encode($result);
		return;
	}
	
	if ($act == "ack") {
		$result = ackAlm($ack);
		echo json_encode($result);
		return;
	}


	
	function queryAlm() {
		global $db, $user;
        
        if (userPermission("almadm",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}
		
        $qry = "select *  FROM t_alms"; 
        $res = $db->query($qry);
        if (!$res) {
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_error($db);
		}
		else {
			$rows = [];
			if ($res->num_rows > 0) {
				while ($row = $res->fetch_assoc()) {
                       $rows[] = $row;
				}  
				$result["rslt"] = "success";
				$result["rows"] = $rows;
			}
        }
		mysqli_close($db);
		return $result;
	}


	function ackAlm() {
		global $db, $almid, $ack, $descr;
		
        //validate $ack: check user permission for acknowledge alarm
        if (userPermission("almadm",$ack) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}

		if ($descr == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing Remark";
			return $result;
		}
			
		$qry = "UPDATE t_alms SET ack='" . $ack . "', cond='ACK', descr='" . "' WHERE almid=" . $almid;
		$res = $db->query($qry);
		if (!$res) {
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_error($db);
		}
		else {
			$qry = "select *  FROM t_alms"; 
			$res = $db->query($qry);
			$rows = [];
			if ($res->num_rows > 0) {
				while ($row = $res->fetch_assoc()) {
					$rows[] = $row;
				}
				$result["rslt"] = "success";
				$result["rows"] = $rows;
			}
		}
		mysqli_close($db);
		return $result;
	}
		 

	function unackAlm() {
		global $db, $almid, $ack, $descr;
		
        //validate $ack: check user permission for acknowledge alarm
        if (userPermission("almadm",$ack) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}
		if ($descr == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing Remark";
			return $result;
		}
			
		$qry = "UPDATE t_alms SET ack='" . $ack . "', cond='ACK', descr='" . "' WHERE almid=" . $almid;
		$res = $db->query($qry);
		if (!$res) {
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_error($db);
		}
		else {
			$qry = "select *  FROM t_alms"; 
			$res = $db->query($qry);
			$rows = [];
			if ($res->num_rows > 0) {
				while ($row = $res->fetch_assoc()) {
					$rows[] = $row;
				}
				$result["rslt"] = "success";
				$result["rows"] = $rows;
			}
		}
		mysqli_close($db);
		return $result;
	}
		 
/*
	function userPermission($fnc, $user) {
		//temporary permit all users
		return true;
	}
*/
?>
