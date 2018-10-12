<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryProv.php
 * Change history: 
 * 2018-10-10: created (Ninh)
 */

	include "coCommonFunctions.php";

    ///Expected inputs
    $act = $_POST['act'];
    $user = $_POST['user'];
    $ckid = $_POST['ckid'];
    $cls = $_POST['cls'];
    $adsr = $_POST['adsr'];
    $prot = $_POST['prot'];
	$ordno = $_POST['ordno'];
	$mlo = $_POST['mlo'];
	
	//$db = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
	$db = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
	if (mysqli_connect_errno())
	{
		$result["rslt"] = "fail";
		$result["reason"] = mysqli_connect_error();
		mysqli_close($db);
		echo json_encode($result);
		return;
	}
	
	if ($act == "query") {
		$result = queryCkt();
		echo json_encode($result);
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}


	
	function getSms($psta, $ssta, $evt) {
		global $db;

		$qry = "SELECT * FROM t_sms WHERE evt='" . $evt . "' AND psta='" . $psta . "' AND ssta='" . $ssta . "'";
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
            else {
				$result["rslt"] = "fail";
				$result["reason"] = "Invalid SMS";
			}
		}
		return $result;
	}
	
		
	
	function queryCkt() {
		global $db, $ckid;
		
		
		$qry = "SELECT t_ckts.id as id, t_ckts.ckid, t_ckts.cls, t_ckts.adsr, t_ckts.prot, t_ckts.ordno, t_ckts.mlo, ";
		$qry .= "t_ckts.date,t_ckts.cktcon FROM t_ckts";
        
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
