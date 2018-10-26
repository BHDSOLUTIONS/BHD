<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryMatrix.php
 * Change history: 
 * 2018-10-19: created (Thanh)
 */

 	include "coCommonFunctions.php";
  

	/* Initialize expected inputs */
	$act= "";
	if (isset($_POST['act']))
		$act = $_POST['act'];
	$id= "";
	
	if (isset($_POST['id']))
		$id = $_POST['id'];

	$node= "";
	if (isset($_POST['node']))
	    $node = $_POST['node'];

	$slot= "";
	if (isset($_POST['slot']))
		$slot = $_POST['slot'];

	$type= "";
	if (isset($_POST['type']))
		$type = $_POST['type'];

	$pstat= "";
	if (isset($_POST['pstat']))
		$stat = $_POST['pstat'];


	/* Dispatch to functions */
	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	

	if ($act  ==  "query") {
		$result = queryMatrix();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	
	if ($act  ==  "lck") {
		$result = lckMatrix();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	
	if ($act  ==  "unlck") {
		$result = unlckMatrix();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	
	/*if ($act  ==  "refresh") {
		$result = refreshMatrix();
		echo json_encode($result);
		return;
	}
	*/
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	
				
	/* Function section */
	function query($node, $slot, $type, $stat) {
		global $db;
		
		$qry = "SELECT * FROM t_mxc WHERE node LIKE '%$node%%' AND slot LIKE '%$slot%%' AND type LIKE '%$type%%' AND psta LIKE '%$psta%%'";
		
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
	
	
	function queryMatrix() {
		global $db, $id, $node, $slot, $type, $stat;
		
		return query("","","","","");
	}
	
	
	function lckMatrix() {
		global $db, $id, $node, $slot, $type, $pstat, $user;

		$evt = "MC_LOCK";
		$evtLog = new EvtLog($user, "MATRIX CARD", $evt);
		
		$mxc = new Mxc($node, $slot);
		if ($mxc->rslt == "fail") {
			$result["rslt"] = $mxc->rslt;
			$result["reason"] = $mxc->reason;
			$evtLog($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$sms = new Sms($mxc->psta, $mxc->ssta, $evt);
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$qry = "UPDATE t_mxc SET psta='" . $sms->npsta . "',ssta='" . $sms->nssta . "' WHERE node=" . $mxc->node . " AND slot=" . $mxc->slot;	
		$res = $db->query($qry);
		if (!$res) {
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_error($db);
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		else
		{
			$result["rslt"] = "success";
			$result["reason"] = "lckMatrix";
			$evtLog->log($result["rslt"], $result["reason"]);
			return query("","","","");
		}
	}
	

	function unlckMatrix() {
		global $db, $id, $node, $slot, $type, $stat;
		
		$evt = "MC_UNLOCK";
		$evtLog = new EvtLog($user, "MATRIX CARD", $evt); 
		
		$mxc = new Mxc($node, $slot);
		if ($mxc->rslt == "fail") {
			$result["rslt"] = $mxc->rslt;
			$result["reason"] = $mxc->reason;
			$evtLog($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$sms = new Sms($mxc->psta, $mxc->ssta, $evt);
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$qry = "UPDATE t_mxc SET psta = '$sms->npsta', ssta = '$sms->nssta' WHERE node=" . $mxc->node . " AND slot=" . $mxc->slot;	
		$res = $db->query($qry);
		if (!$res) {
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_error($db);
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		else
		{
			$evtLog->log("success", "lckMatrix");
			return query("","","","","");
		}
	}

?>
