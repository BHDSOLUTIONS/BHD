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
 
    //Initialize expected inputs
    $act = "";
    if (isset($_POST['act']))
		$act = $_POST['act'];
    
    $id = "";
    if (isset($_POST['id']))
		$id = $_POST['id'];
    
	$ack = "";
    if (isset($_POST['ack']))
		$ack = $_POST['ack'];
    
    $almid = "";
    if (isset($_POST['almid']))
		$almid = $_POST['almid'];
    
    $remark = "";
    if (isset($_POST['remark']))
		$remark = $_POST['remark'];
    
    $user = "";
    if (isset($_POST['user']))
		$user = $_POST['user'];
    

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
		$result = queryAlm();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	
	if ($act == "ACK") {
		$result = ackAlm();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}

	if ($act == "UN-ACK") {
		$result = unackAlm();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}

	if ($act == "CLR") {
		$result = clrAlm();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}


	
	function queryAlm() {
		global $db, $user;
        
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
			}
			$result["rslt"] = "success";
			$result["rows"] = $rows;
        }
		return $result;
	}


	function ackAlm() {
		global $db, $id, $almid, $ack, $remark, $user;
		
        //validate $ack: check user permission for acknowledge alarm
        if (userPermission("almadm",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}

		if ($id == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Invalid ID";
			return $result;
		}
			
		if ($remark == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing REMARK";
			return $result;
		}
			
		if ($cond != "NEW" || $cond != "UN-ACK") {
			$result["rslt"] = "fail";
			$result["reason"] = "ALARM CONDITION must be NEW or UNACK";
			return $result;
		}
	
		$qry = "UPDATE t_alms SET ack='" . $user . "', cond='ACK', remark='" . $remark . "' WHERE id=" . $id;
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
			}
			$result["rslt"] = "success";
			$result["rows"] = $rows;
		}
		return $result;
	}
		 

	function unackAlm() {
		global $db, $id, $almid, $ack, $remark, $user;
		
        //validate $ack: check user permission for acknowledge alarm
        if (userPermission("almadm",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}
		
		if ($id == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Invalid ID";
			return $result;
		}
			
		if ($ack == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "ALARM has not been ACKNOWLEDGED";
			return $result;
		}
			
		if ($remark == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing REMARK";
			return $result;
		}
			
		if ($cond != "ACK") {
			$result["rslt"] = "fail";
			$result["reason"] = "ALARM CONDITION must be ACK";
			return $result;
		}

		$qry = "UPDATE t_alms SET ack='', cond='UN-ACK', remark=concat('" . $remark . "',remark) WHERE id=" . $id;
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
			}
			$result["rslt"] = "success";
			$result["rows"] = $rows;
		}
		return $result;
	}
		 

	function clrAlm() {
		global $db, $id, $almid, $ack, $remark, $user;
		
        //validate $ack: check user permission for acknowledge alarm
        if (userPermission("almadm", $user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}
		
		if ($id == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Invalid ID";
			return $result;
		}
			
		if ($ack == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "ALARM must be ACKNOWLEDGED first";
			return $result;
		}
			
		if ($remark == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing REMARK";
			return $result;
		}
		
		if ($cond != "SYS-CLR") {
			$result["rslt"] = "fail";
			$result["reason"] = "ALARM CONDITION must be SYS-CLR";
			return $result;
		}
			
		$qry = "UPDATE t_alms SET ack='', cond='CLEARED', sev='NONE', remark=concat('" . $remark . "',remark) WHERE id=" . $id;
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
			}
			$result["rslt"] = "success";
			$result["rows"] = $rows;
		}
		return $result;
	}
		 

?>
