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

	$range ="";
	if (isset($_POST['range']))
		$range = $_POST['range'];

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
		if ($range == ""){
			$result = addFac($fac);
		} 
		else {
			$result = addFacs();
		}
		// In this case, $db is reused multiple times before close
		mysqli_close($db);
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
   
	function addFac($fac) {
		global $db, $ftyp, $ort, $spcfnc;
		
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
		
		// mysqli_close($db);
		return $result;
	}


	function addFacs(){
		global $fac, $range;

		//last dash position
		$dashPos = strrpos($fac,'-');  
		//In case there is no dash in Fac
		if($dashPos == "") 
    		$dashPos = -1;
		// string length of fac
		$facLength= strlen($fac) -1; 	 

		// Initialize postion of digits
		$digitFirstPos=-1;
		$digitLastPos=-1;

		for($i = $facLength; $i > $dashPos; $i--) {
			if ( is_numeric($fac[$i])) {
				if ($digitLastPos == -1) {
					$digitLastPos = $i;
					$digitFirstPos = $i;
				}          
				else if ($i == ($digitFirstPos -1))
					$digitFirstPos = $i;
			}
		}
		
		if ($digitLastPos == -1)
		{
			$result["rslt"] = "fail";
			$result["reason"] = "There is no digit in the last block of fac string!";
		}
		else {
			
			$digitNum = $digitLastPos - $digitFirstPos + 1;

			$startValue = (int)(substr($fac, $digitFirstPos, $digitNum)); 
			$maxValue = pow(10, $digitNum)-1; 
			
			$maxRange = $maxValue - $startValue +1; 

			//convert $range from string to int number
			$rangeFac = (int)$range;
			if ($rangeFac > $maxRange) {
				$result["rslt"] = "fail";
				$result["reason"] = "The range is too big. The maximum range is ".$maxRange."!";
			}
			else {
				for ($i=0; $i < $rangeFac ; $i++) {
					//update the digit number
					$currentValue = $startValue + $i; 
					//convert to string format
					$digitString = str_pad($currentValue,$digitNum,"0",STR_PAD_LEFT); 
					//replace the digitString into fac
					$updatedFac = substr_replace($fac,$digitString, $digitFirstPos, $digitNum); 
					$result = addFac($updatedFac); 
					if ($result['rslt'] == "fail"){
						$result['stopIndex'] = $i;
						break;
					}
					

				}
			}

		}

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
		global $db, $act, $fac_id, $fac, $ftyp, $ort, $spcfnc, $port;
		
		if ($fac == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FAC";
			mysqli_close($db);
			return $result;
		}
		
		if ($port == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Denied. FAC is currently mapped";
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
