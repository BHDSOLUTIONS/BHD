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


    // Initialize Expected inputs
    $act = "";
	if (isset($_POST['act']))
		$act = $_POST['act'];
		
	$user = "";
	if (isset($_POST['user']))
		$user = $_POST['user'];

	$ckt_id = 0;
	if (isset($_POST['ckt_id']))
		$ckt_id = $_POST['ckt_id'];

	$ckid = "";
	if (isset($_POST['ckid']))
		$ckid = $_POST['ckid'];
	
	$cls = "";
    if (isset($_POST['cls']))
		$cls = $_POST['cls'];
    
    $adsr = "";
    if (isset($_POST['adsr']))
		$adsr = $_POST['adsr'];
    
    $prot = "";
    if (isset($_POST['prot']))
		$prot = $_POST['prot'];
	
	$ordno = "";
	if (isset($_POST['ordno']))
		$ordno = $_POST['ordno'];
	
	$mlo = "";
	if (isset($_POST['mlo']))
		$mlo = $_POST['mlo'];
	
	$cktcon = 0;
	if (isset($_POST['cktcon']))
		$cktcon = $_POST['cktcon'];
	
	$idx = 0;
	if (isset($_POST['idx']))
		$idx = $_POST['idx'];

	$ctyp = "";
	if (isset($_POST['ctyp']))
		$ctyp = $_POST['ctyp'];
	
	$ffac = "";
	if (isset($_POST['ffac']))
		$ffac = $_POST['ffac'];
	
	$tfac = "";
	if (isset($_POST['tfac']))
		$tfac = $_POST['tfac'];
	
	
	// Dispatch to Functions
	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
		
	if ($act == "query" || $act == "queryCkid") {
		$result = queryCkt("Y");
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "queryOrd") {
		$result = queryOrd();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "queryCktcon") {
		$result = queryCktcon($cktcon);
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "queryFacX") {
		$result = queryFacXY("X");
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "queryFacY") {
		$result = queryFacXY("Y");
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "provNewCkt") {
		$result = provNewCkt();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "provConnect") {
		$result = provConnect();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "provDisconnect") {
		$result = provDisconnect();
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
	function provDisconnect() {
		global $db, $ckt_id, $ckid, $ordno, $ctyp, $cktcon, $idx, $ffac, $tfac, $user;
	
		$evtLog = new Evtlog($user, "PROV", "DISCONNECT");

		// validate inputs
		if ($ckid == "" || $ckt_id == 0) {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing CKID";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		if ($ordno == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing ORDNO";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		if ($ctyp == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing CTYP";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		if ($cktcon == 0) {
			$result["rslt"] = "fail";
			$result["reason"] = "Incorrect CKTCON";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		if ($idx == 0) {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing IDX";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		// locate target cktcon
		$conObj = new Cktcon($cktcon);
		if ($conObj->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $conObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$con = [];
		$numofcon = count($conObj->con);
		for ($i=0; $i<$numofcon; $i++) {
			if ($conObj->con[$i]["idx"] == $idx) {
				$con = $conObj->con[$i];
				break;
			}
		}
		if (count($con) == 0) {
			$result["rslt"] = "fail";
			$result["reason"] = "Invalid IDX";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
			
		// locate target fport and tport
		$fportObj = new Port($con["fp_id"]);
		$tportObj = new Port($con["tp_id"]);
		
		
		// validate state-event
		$sms = new Sms($fportObj->psta, $fportObj->ssta, "SV_DISCON");
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		$fportObj->npsta = $sms->npsta;
		$fportObj->nssta = $sms->nssta;
		
		$sms = new Sms($tportObj->psta, $tportObj->ssta, "SV_DISCON");
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		$tportObj->npsta = $sms->npsta;
		$tportObj->nssta = $sms->nssta;
			
		// update t_ports
		$qry = "UPDATE t_ports SET psta='" . $fportObj->npsta . "',ssta='" . $fportObj->nssta . "',ckt_id=0,cktcon=0,con_idx=0,mp_id=0 WHERE id=" . $fportObj->id;
        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = $qry . ":  " . mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		
		$qry = "UPDATE t_ports SET psta='" . $tportObj->npsta . "',ssta='" . $tportObj->nssta . "',ckt_id=0,cktcon=0,con_idx=0,mp_id=0 WHERE id=" . $tportObj->id;
        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = $qry . ":  " . mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		
		// remove con_idx
		$qry = "DELETE FROM t_cktcon WHERE con=" . $cktcon . " AND idx=" . $idx;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = $qry . ":  " . mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
        $numofcon = $numofcon -1;
        
		// update t_ckts
		if ($numofcon == 0) {
			$qry = "DELETE FROM t_ckts WHERE id=" . $ckt_id;
		}
		else {
			$qry = "UPDATE t_ckts SET ordno='" . $ordno . "',date=now(), cktcon=" . $cktcon . " WHERE id=" . $ckt_id;
		}
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = $qry . ":  " . mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		$evtLog->log("sucess", "provDisconnect");

		if ($numofcon == 0)
			return queryCkt("N");
		else
			return queryCktcon($cktcon);
	}


	function provConnect() {
		global $db, $ckt_id, $ckid, $ordno, $ctyp, $cktcon, $ffac, $tfac, $user;

		$evtLog = new Evtlog($user, "PROV", "CONNECT");
		
		// validate inputs
		if ($ckid == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing CKID";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		if ($ordno == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing ORDNO";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		if ($ffac == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FAC(X)";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		if ($tfac == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FAC(Y)";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		if ($ctyp != "GEN") {
			if ($ctyp == "")
				$result["reason"] = "Missing CTYP";
			else
				$result["reason"] = "CTYP " . $ctyp . " not supported";
			$result["rslt"] = "fail";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		if ($cktcon == 0) {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing CKTCON";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
			
		// validate ckid
		$cktObj = new Ckt($ckid);
		if ($cktObj->rslt == "fail") {
			$evtLog->log($cktObj["rslt"], $cktObj["reason"]);
			return $cktObj;
		}
		$ckt_id = $cktObj->id;
		
		if ($cktcon != $cktObj->cktcon) {
			$result["rslt"] = "fail";
			$result["reason"] = "Incorrect CKTCON";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
			
		// validate ffac, tfac	
		$ffacObj = new Fac($ffac);
		if ($ffacObj->rslt == "fail") {
			$result["rslt"] = $ffacObj->rslt;
			$result["reason"] = $ffacObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$tfacObj = new Fac($tfac);
		if ($tfacObj->rslt == "fail") {
			$result["rslt"] = $tfacObj->rslt;
			$result["reason"] = $tfacObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		// validate fport, tport
		$fportObj = new Port($ffacObj->port_id);
		if ($fportObj->rslt == "fail") {
			$result["rslt"] = $fportObj->rslt;
			$result["reason"] = $fportObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$tportObj = new Port($tfacObj->port_id);
		if ($tportObj->rslt == "fail") {
			$result["rslt"] = $tportObj->rslt;
			$result["reason"] = $tportObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		// validate state-event
		$sms = new Sms($fportObj->psta, $fportObj->ssta, "SV_CONN");
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason . ", ffac: " . $ffac;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		$fportObj->npsta = $sms->npsta;
		$fportObj->nssta = $sms->nssta;
		
		$sms = new Sms($tportObj->psta, $tportObj->ssta, "SV_CONN");
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason . ", tfac: " . $tfac;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		$tportObj->npsta = $sms->npsta;
		$tportObj->nssta = $sms->nssta;
		
		
		$idxObj = getAvailCktconIdx($cktcon);
		if ($idxObj["rslt"] == "fail") {
			$evtLog->log($idxObj["rslt"], $idxObj["reason"]);
			return $idxObj;
		}
		else {
			$idx = $idxObj["idx"];
		}
		
		// setup cktcon
		$qry = "INSERT INTO t_cktcon VALUES(0," . $cktcon . "," . $ckt_id . "," . $idx . ",'" . $ctyp . "'," . $fportObj->id . ",1," . $tportObj->id . ",1)";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = $qry . "\n" . mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		
        // link the fport to ckt_id
        $qry = "UPDATE t_ports SET psta='" . $fportObj->npsta . "',ssta='" . $fportObj->nssta . "',ckt_id=" . $ckt_id;
        $qry .= ",cktcon=" . $cktcon . ",mp_id=0 WHERE id=" . $fportObj->id;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = $qry . "\n" . mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		
        // link the fport to ckt_id
        $qry = "UPDATE t_ports SET psta='" . $tportObj->npsta . "',ssta='" . $tportObj->nssta . "',ckt_id=" . $ckt_id;
        $qry .= ",cktcon=" . $cktcon . ",mp_id=0 WHERE id=" . $tportObj->id;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = $qry . "\n" . mysqli_error($db);
            return $result;
        }
        $evtLog->log("success", "provConnect");
        return queryCktcon($cktcon);
		
	}
	
	
	function provNewCkt() {
		global $db, $ckid, $cls, $adsr, $prot, $ordno, $mlo, $ctyp, $ffac, $tfac, $user;
		
		$evtLog = new EvtLog($user, "PROV", "NEW CKT");
		
		// validate inputs
		if ($ckid == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing CKID";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		if ($ordno == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing ORDNO";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		if ($mlo == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing MLO";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		if ($ffac == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FAC(X)";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		if ($tfac == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FAC(Y)";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
			
		$cktObj = new Ckt($ckid);
		if ($cktObj->rslt == "success") {
			$result["rslt"] = "fail";
			$result["reason"] = "CKID already exists";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		if ($ctyp != "GEN") {
			if ($ctyp == "")
				$result["reason"] = "Missing CTYP";
			else
				$result["reason"] = "CTYP not supported";
			$result["rslt"] = "fail";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
			
		// validate ffac, tfac	
		$ffacObj = new Fac($ffac);
		if ($ffacObj->rslt == "fail") {
			$result["rslt"] = $ffacObj->rslt;
			$result["reason"] = $ffacObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$tfacObj = new Fac($tfac);
		if ($tfacObj->rslt == "fail") {
			$result["rslt"] = $tfacObj->rslt;
			$result["reason"] = $tfacObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		// validate fport, tport
		$fportObj = new Port($ffacObj->port_id);
		if ($fportObj->rslt == "fail") {
			$result["rslt"] = $fportObj->rslt;
			$result["reason"] = $fportObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		// validate state-event
		$sms = new Sms($fportObj->psta, $fportObj->ssta, "SV_CONN");
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		$fportObj->npsta = $sms->npsta;
		$fportObj->nssta = $sms->nssta;
		
		$tportObj = new Port($tfacObj->port_id);
		if ($tportObj->rslt == "fail") {
			$result["rslt"] = $tportObj->rslt;
			$result["reason"] = $tportObj->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}

		$sms = new Sms($tportObj->psta, $tportObj->ssta, "SV_CONN");
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		$tportObj->npsta = $sms->npsta;
		$tportObj->nssta = $sms->nssta;
		
			
		// find next avail cktcon
		$result = getAvailCktcon();
		if ($result["rslt"] == "fail") {
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		$cktcon = $result["cktcon"];
			
        // setup new ckt
		$qry = "INSERT INTO t_ckts values(0,'" . $ckid . "','" . $cls . "','" . $adsr . "','" . $prot . "','" . $ordno . "'";
		$qry .= ",'" . $mlo . "',now()," . $cktcon . ")";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		$ckt_id = $db->insert_id;
		
		// setup new cktcon
		$qry = "INSERT INTO t_cktcon VALUES (0," . $cktcon . "," . $ckt_id . ",1,'" . $ctyp . "'," . $fportObj->id . ",1," . $tportObj->id . ",1)";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		
        // link the fport to ckt_id
        $qry = "UPDATE t_ports SET psta='" . $fportObj->npsta . "',ssta='" . $fportObj->nssta . "',ckt_id=" . $ckt_id;
        $qry .= ",cktcon=" . $cktcon . ",mp_id=0 WHERE id=" . $fportObj->id;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		
        // link the fport to ckt_id
        $qry = "UPDATE t_ports SET psta='" . $tportObj->npsta . "',ssta='" . $tportObj->nssta . "',ckt_id=" . $ckt_id;
        $qry .= ",cktcon=" . $cktcon . ",mp_id=0 WHERE id=" . $tportObj->id;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
            $evtLog->log($result["rslt"], $result["reason"]);
			return $result;
        }
		$evtLog->log("success", "provNewCkt");
		return queryCkt("N");
	}


	function getAvailCktcon() {
		global $db;
		
		$qry = "SELECT MAX(con) from t_cktcon";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
			$result["rslt"] = "success";
			$result["cktcon"] = 1;
			if ($res->num_rows > 0) {
                while ($row = $res->fetch_assoc()) {
                    if ($row["MAX(con)"] != NULL) {
						$result["cktcon"] = $row["MAX(con)"] +1;
					}
                }
			}
		}
        return $result;
	}

	function getAvailCktconIdx($cktcon) {
		global $db;
		
		$qry = "SELECT MAX(idx) FROM t_cktcon WHERE con=" . $cktcon;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
			$result["rslt"] = "success";
			$result["idx"] = 1;
			if ($res->num_rows > 0) {
                while ($row = $res->fetch_assoc()) {
                    if ($row["MAX(idx)"] != NULL) {
						$result["idx"] = $row["MAX(idx)"] +1;
					}
                }
			}
		}
        return $result;
	}

	
	function queryFacXY($ptyp) {
		global $db;
		
		$qry = "SELECT t_facs.fac, t_facs.port FROM t_facs left join t_ports on t_facs.port_id=t_ports.id WHERE t_ports.ptyp='" . $ptyp . "' AND t_ports.psta='SF'";
	
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

		
	
	function queryOrd() {
		global $db, $ordno, $mlo;
		
		$qry = "SELECT t_ckts.id as id, t_ckts.ckid, t_ckts.cls, t_ckts.adsr, t_ckts.prot, t_ckts.ordno, t_ckts.mlo, t_ckts.date,t_ckts.cktcon FROM t_ckts";
		if ($ordno !="" || $mlo != "") {
			if ($ordno != "") {
				$qry .= " WHERE ordno LIKE '%$ordno%'";
				if ($mlo != "") {
					$qry .= " AND cls LIKE '%$mlo%'";
				}
			}
			else if ($mlo != "") {
				$qry .= " WHERE prot LIKE '%$mlo%'";
			}
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
		return $result;
	}
		
	
	function queryCkt($filter) {
		global $db, $ckid, $cls, $adsr, $prot;
		
		$qry = "SELECT t_ckts.id as id, t_ckts.ckid, t_ckts.cls, t_ckts.adsr, t_ckts.prot, t_ckts.ordno, t_ckts.mlo, t_ckts.date,t_ckts.cktcon FROM t_ckts";
		if ($filter == "Y") {
			if ($ckid !="" || $cls != "" || $adsr != "" || $prot != "") {
				if ($ckid != "") {
					$qry .= " WHERE ckid LIKE '%$ckid%'";
					if ($cls != "") {
						$qry .= " AND cls LIKE '%$cls%'";
					}
					if ($adsr != "") {
						$qry .= " AND adsr LIKE '%$adsr%'";
					}
					if ($prot != "") {
						$qry .= " AND prot LIKE '%$prot%'";
					}
				}
				else if ($cls != "" ) {
					$qry .= " WHERE cls LIKE '%$cls%'";
					if ($adsr != "") {
						$qry .= " AND adsr LIKE '%$adsr%'";
					}
					if ($prot != "") {
						$qry .= " AND prot LIKE '%$prot%'";
					}
				}
				else if ($adsr != "") {
					$qry .= " WHERE adsr LIKE '%$adsr%'";
					if ($prot != "") {
						$qry .= " AND prot LIKE '%$prot%'";
					}
				}
				else if ($prot != "") {
					$qry .= " WHERE prot LIKE '%$prot%'";
				}
			}
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
		return $result;
	}

		
	function queryCktcon($cktcon) {
		global $db;
		
		if ($cktcon == 0) {
			$result["rslt"] = "fail";
            $result["reason"] = "Invalid CKTCON";
            return $result;
		}

		$qry = "SELECT t_cktcon.idx, t_cktcon.ctyp, t_facs.fac, t_facs.id, t_facs.port from t_facs, t_cktcon left join t_ports on";
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
						$con["fport"] = $row["port"];
                    }
                    else {
						$con["tfac"] = $row["fac"];
						$con["tport"] = $row["port"];
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
