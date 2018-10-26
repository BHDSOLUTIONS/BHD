<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryFac.php
 * Change history: 
 * 2018-10-05: created (Ninh)
 */

 	include "coCommonFunctions.php";
  
    $act = "";
    if (isset($_POST['act']))
		$act = $_POST['act'];
		
    $user = "";
    if (isset($_POST['user']))
		$user = $_POST['user'];
	$fac_id = 0;

	if (isset($_POST['fac_id']))
	    $fac_id = $_POST['fac_id'];
    
    $fac = "";
    if (isset($_POST['fac']))
		$fac = $_POST['fac'];
    
    $ftyp = "";
    if (isset($_POST['ftyp']))
		$ftyp = $_POST['ftyp'];
    
    $ort = "";
    if (isset($_POST['ort']))
		$ort = $_POST['ort'];
		
	$spcfnc = "";
	if (isset($_POST['spcfnc']))
		$spcfnc = $_POST['spcfnc'];


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
		$result = queryFac("$act");
		echo json_encode($result);
		return;
	}
	
	if ($act == "findAvailFac") {
		$result = queryFac($act);
		echo json_encode($result);
		return;
	}

	if ($act == "findFac") {
		$result = queryFac($act);
		echo json_encode($result);
		return;
	}

	if ($act == "findFOS") {
		$result = queryFac($act);
		echo json_encode($result);
		return;
	}
	
	if ($act == "ADD" ) {
		$result = addFac();
		echo json_encode($result);
		return;
	}
	
	if ($act == "UPDATE") {
		$result = updFac();
		echo json_encode($result);
		return;
	}
	
	if ($act == "DELETE") {
		$result = delFac();
		echo json_encode($result);
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	
			
		
	function queryFac($act) {
		global $db, $fac, $ftyp, $ort, $spcfnc;
		
		if ($act == "query")
			$qry = "SELECT * FROM t_facs";
        else if ($act == "findAvailFac")
			$qry = "SELECT * FROM t_facs WHERE port_id=0";
		else if ($act == "findFac")
			$qry = "SELECT * FROM t_facs WHERE fac LIKE '%$fac%%'";
		else if ($act == "findFOS")
			$qry = "SELECT * FROM t_facs WHERE ftyp LIKE '%$ftyp%%' AND ort LIKE '%$ort%%' AND spcfnc LIKE '%$spcfnc%%'"; 
        else {
	 		$result["rslt"] = "fail";
			$result["reason"] = "ACTION " . $act . " is not supported";
			mysqli_close($db);
			return $result;
		}
		
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
		mysqli_close($db);
		return $result;
	}
   
	function addFac() {
		global $db, $act, $fac_id, $fac, $ftyp, $ort, $spcfnc;
		
		$qry = "insert into t_facs values(0,'";
		if ($fac != "") {
			$qry .= $fac . "','";
			if ($ftyp != "") {
				$qry .= $ftyp . "','";
				if ($ort != "") {
					$qry .= $ort . "','";
					if ($spcfnc != "") {
						$qry .= $spcfnc . "'";
					}
					else {
						$qry .= "'";
					}
					$qry .= ",'',0)";
					$res = $db->query($qry);
					if (!$res) {
						$result["rslt"] = "fail";
						$result["reason"] = mysqli_error($db);
					}
					else {
						$qry = "select * FROM t_facs";
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
					}
				}
				else {
					$result["rslt"] = "fail";
					$result["reason"] = "Invalid ORT:" . $ort;
				}
			}
			else {
				$result["rslt"] = "fail";
				$result["reason"] = "Invalid FTYP:" . $ftyp;
			}
		}
		else {
			$result["rslt"] = "fail";
			$result["reason"] = "Invalid FAC:" . $fac;
		}
		mysqli_close($db);
		return $result;
	}


	function updFac() {
		global $db, $act, $fac_id, $fac, $ftyp, $ort, $spcfnc;
		
		if ($ftyp != "" || $ort != "" || $spcfnc != "") {
			$qry = "UPDATE t_facs SET ";
			if ($ftyp != "") {
				$qry .= "ftyp='" . $ftyp . "'";
				if ($ort != "") {
					$qry .= ",ort='" . $ort . "'";
					if ($spcfnc != "") {
						$qry .= ",spcfnc='" . $spcfnc . "'";
					}
				}
			}
			else if ($ort != "") {
				$qry .= "ort='" . $ort . "'";
				if ($spcfnc != "") {
					$qry .= ", spcfn='" . $spcfnc . "'";
				}
			}
			else if ($spcfnc != "") {
				$qry .= "spcfnc='" . $spcfnc . "'";
			}
			$qry .= " where fac='" . $fac . "'";
			$res = $db->query($qry);
			
			$qry = "select * FROM t_facs";
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
		}
		else {
			$result["rslt"] = "fail";
			$result["reason"] = "Nothing to update";
		}
		mysqli_close($db);
		return $result;
	}

	
	function delFac() {
		global $db, $act, $fac_id, $fac, $ftyp, $ort, $spcfnc;
		
		if ($fac == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FAC";
			mysqli_close($db);
			return $result;
		}
			
		$qry = "delete from t_facs where fac='" . $fac . "'";
		$res = $db->query($qry);
		if (!$res) {
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_error($db);
		}
		else {
			$qry = "select * FROM t_facs";
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
		}
		mysqli_close($db);
		return $result;

	}
	
	
?>
