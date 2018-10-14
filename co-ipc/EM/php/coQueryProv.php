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
	$cktcon = $_POST['cktcon'];
	$ctyp = $_POST['ctyp'];
	$ffac = $_POST['ffac'];
	$tfac = $_POST['tfac'];
	
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
	if ($act == "queryCktcon") {
		$result = queryCktcon();
		echo json_encode($result);
		return;
	}
	if ($act == "queryFacX") {
		$result = queryFacXY("X");
		echo json_encode($result);
		return;
	}
	if ($act == "queryFacY") {
		$result = queryFacXY("Y");
		echo json_encode($result);
		return;
	}
	/*
	if ($act == "provNewCkt") {
		$result = provNewCkt();
		echo json_encode($result);
		return;
	}
	*/
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}


	/* Functions section */
	
	/*
	function provNewCkt() {
		global $db, $ckid, $cls, $adsr, $prot, $ordno, $mlo, $ctyp, $ffac, $tfac;
		
		//validate ffac and tfac
		
		$cktqry = "INSERT INTO t_ckts values(0,'" . $ckid . "','" . $cls . "','" . $adsr . "','" . $prot . "','" . $ordno . "','" . $mlo . "'";
	*/
		
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

	function queryFacXY($ptyp) {
		global $db;
		
		$qry = "SELECT t_facs.fac FROM t_facs left join t_ports on t_facs.port_id=t_ports.id WHERE t_ports.ptyp='" . $ptyp . "' AND t_ports.psta='SF'";
	
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

		
	function queryCktcon() {
		global $db, $cktcon;
		
		$qry = "SELECT t_cktcon.idx, t_cktcon.ctyp, t_facs.fac, t_facs.id from t_facs, t_cktcon left join t_ports on";
		$qry .= " (t_cktcon.fp_id=t_ports.id or t_cktcon.tp_id=t_ports.id) where t_cktcon.con =" . $cktcon;
        $qry .= " AND t_facs.id=t_ports.fac_id";
        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            $rows = [];
            $result["rslt"] = "success";
			if ($res->num_rows > 0) {
                $con =[];
                while ($row = $res->fetch_assoc()) {
                    if (count($con) == 0) {
						$con["idx"] = $row["idx"];
						$con["ctyp"] = $row["ctyp"];
						$con["ffac"] = $row["fac"];
                    }
                    else {
						$con["tfac"] = $row["fac"];
						$rows[] = $con;
						$con = [];
					}
                }
            }
            $result["rows"] = $rows;
		}
		return $result;
	}


	
	
?>
