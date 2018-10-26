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
    $remark = $_POST['remark'];
    $user = $_POST['user'];
    

	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	
	
	if ($act == "query") {
		$result = queryAlm();
		echo json_encode($result);
		return;
	}
	
	if ($act == "ACK") {
		$result = ackAlm();
		echo json_encode($result);
		return;
	}

	if ($act == "UN-ACK") {
		$result = unackAlm();
		echo json_encode($result);
		return;
	}

	if ($act == "CLR") {
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
		global $db, $almid, $ack, $remark, $user;
		
        //validate $ack: check user permission for acknowledge alarm
        if (userPermission("almadm",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}

		if ($remark == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing Remark";
			return $result;
		}
			
		$qry = "UPDATE t_alms SET ack='" . $user . "', cond='ACK', remark='" . $remark . "' WHERE almid=" . $almid;
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
		global $db, $almid, $ack, $remark, $user;
		
        //validate $ack: check user permission for acknowledge alarm
        if (userPermission("almadm",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}
		
		if ($ack == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Un-Ack not possible";
			return $result;
		}
			
		if ($remark == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing Remark";
			return $result;
		}
			
		$qry = "UPDATE t_alms SET ack='', cond='UN-ACK', remark=concat('" . $remark . "',remark) WHERE almid=" . $almid;
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
		 

?>
