<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryPort.php
 * Change history: 
 * 2018-10-05: created (Ninh)
 */

	include "coCommonFunctions.php";

    /* Initialize Expected inputs */
    $act = "";
    if (isset($_POST['act']))
		$act = $_POST['act'];
    $user = "";
    if (isset($_POST['user']))
		$user = $_POST['user'];
    $port_id = "";
    if (isset($_POST['port_id']))
		$port_id = $_POST['port_id'];
    $pnum = "";
    if (isset($_POST['pnum']))
		$pnum = $_POST['pnum'];
    $ptyp = "";
    if (isset($_POST['ptyp']))
		$ptyp = $_POST['ptyp'];
    $psta = "";
    if (isset($_POST['psta']))
		$psta = $_POST['psta'];
	$node = "";
    if (isset($_POST['node']))
		$node = $_POST['node'];
	$slot = "";
    if (isset($_POST['slot']))
		$slot = $_POST['slot'];
	$fac_id = "";
    if (isset($_POST['fac_id']))
		$fac_id = $_POST['fac_id'];
	$fac = "";
    if (isset($_POST['fac']))
		$fac = $_POST['fac'];
	$ftyp = "";
    if (isset($_POST['ftyp']))
		$ftyp = $_POST['ftyp'];
	$ckid = "";
    if (isset($_POST['ckid']))
		$ckid = $_POST['ckid'];
	
	
	/* Dispatch to Functions */
	
	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	
	if ($act == "query" || $act == "findPort") {
		$result = queryPort($node, $slot, $ptyp, $pnum, $psta);
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "queryNode") {
		$result = pmQueryNode();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "findFac") {
		$result = pmQueryFac($fac);
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "findCkid") {
		$result = pmQueryCkid($ckid);
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "MAP") {
		$result = mapPort($port_id, $fac_id);
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "UNMAP") {
		$result = unmapPort($port_id, $fac_id);
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "QUERYMIO") {
		$result = queryMio();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		mysqli_close($db);
		return;
	}


	/* Functions section */
	function mapPort($port_id, $fac_id) {
		global $db, $user;
		
		$evtLog = new EvtLog($user, "PORTMAP", "MAP"); 
		$result =[];
		if (!($fac_id > 0)) {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FAC";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$map = getMap($port_id, $fac_id, "MAP");
		if ($map["rslt"] == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = "Denied: PORT STAT: " + $map->psta;
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		$node = $map["rows"][0]["node"];
		$slot = $map["rows"][0]["slot"];
		$pnum = $map["rows"][0]["pnum"];
		$ptyp = $map["rows"][0]["ptyp"];
		$port = $node . "-" . $slot . "-" . $ptyp . "-" . $pnum;
		$psta = $map["rows"][0]["psta"];
		$ssta = $map["rows"][0]["ssta"];
		
		$sms = new Sms($psta, $ssta, "PT_MAP");
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason;
			return $result;
		}
		$npsta = $sms->npsta;
		$nssta = $sms->nssta;
		
		$qry = "UPDATE t_ports SET fac_id=" . $fac_id . ", psta='" . $npsta . "', ssta='" . $nssta . "' WHERE id=" . $port_id;
		$res = $db->query($qry);
		$qry = "UPDATE t_facs SET port_id=" . $port_id . ", port='" . $port . "' WHERE id=" . $fac_id;
		$res = $db->query($qry);
		
		$evtLog->log("success", "mapPort");
		return queryPort("", "", "", "", "");
	}


	function unmapPort($port_id, $fac_id) {
		global $db, $user;
		
		$evtLog = new EvtLog($user, "PORTMAP", "UNMAP"); 
		$result =[];
		$map = getMap($port_id, $fac_id, "UNMAP");
		if ($map["rslt"] == "fail") {
			$evtLog->log("fail", $map["reason"]);
			return $map;
		}
		$node = $map["rows"][0]["node"];
		$slot = $map["rows"][0]["slot"];
		$pnum = $map["rows"][0]["pnum"];
		$ptyp = $map["rows"][0]["ptyp"];
		$port = $node . "-" . $slot . "-" . $ptyp . "-" . $pnum;
		$psta = $map["rows"][0]["psta"];
		$ssta = $map["rows"][0]["ssta"];
		
		$sms = new Sms($psta, $ssta, "PT_UNMAP");
		if ($sms->rslt == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $sms->reason;
			return $result;
		}
		$npsta = $sms->npsta;
		$nssta = $sms->nssta;
		
		$qry = "UPDATE t_ports SET fac_id=" . 0 . ", psta='" . $npsta . "', ssta='" . $nssta . "' WHERE id=" . $port_id;
		$res = $db->query($qry);
		$qry = "UPDATE t_facs SET port_id=" . 0 . ", port='' WHERE id=" . $fac_id;
		$res = $db->query($qry);
		
		$evtLog->log("success", "unmapPort");
		
		return queryPort("", "", "", "", "");
	}
	
		
	function getMap($port_id, $fac_id, $typ) {
		global $db;
		
		if ($typ == "MAP")
			$qry = "SELECT * from t_ports, t_facs WHERE t_ports.id=" . $port_id . " AND t_facs.id=" . $fac_id . " AND t_facs.port =''";
 		else
			$qry = "SELECT * from t_ports, t_facs WHERE t_ports.id=" . $port_id . " AND t_facs.id=" . $fac_id . " AND t_facs.port <>''";

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
				$result["reason"] = "Invalid FAC";
			}
		}
		return $result;
	}
		
	
	function pmQueryNode() {
		global $db;

		$qry = "SELECT * FROM t_nodes";
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

	
	function queryPort($node, $slot, $ptyp, $pnum, $psta) {
		global $db;
			
		$qry = "SELECT t_ports.id as id, t_ports.node, t_ports.slot, t_ports.pnum, t_ports.ptyp, t_ports.psta, ";
		$qry .= "t_facs.id as fac_id, t_facs.fac, t_ckts.ckid ";
		$qry .= "FROM t_ports LEFT JOIN t_facs ON t_ports.fac_id = t_facs.id LEFT JOIN t_ckts ON t_ports.ckt_id = t_ckts.id";
		$qry .= " WHERE t_ports.pnum LIKE '%$pnum%%' AND t_ports.ptyp LIKE '%$ptyp%%' AND t_ports.node LIKE '%$node%%'";
		$qry .= " AND t_ports.slot LIKE '%$slot%%' AND t_ports.psta LIKE '%$psta%%'";
        
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
                    if($row["ckid"] == null)
						$row["ckid"] = "";
					if ($row["fac"] == null)
						$row["fac"] = "";
					if ($row["fac_id"] == null)
						$row["fac_id"] = "0";
					$rows[] = $row;
                }
            }
            $result["rows"] = $rows;
		}
		return $result;
	}

	
	function queryMio() {
		global $db, $node, $slot, $ptyp;
		$qry = "SELECT t_ports.id as id, t_ports.node, t_ports.slot, t_ports.pnum, t_ports.ptyp, t_ports.psta, ";
		$qry .= "t_facs.id as fac_id, t_facs.fac, t_ckts.ckid ";
		$qry .= "FROM t_ports LEFT JOIN t_facs ON t_ports.fac_id = t_facs.id LEFT JOIN t_ckts ON t_ports.ckt_id = t_ckts.id";
		$qry .= " WHERE t_ports.ptyp = '$ptyp' AND t_ports.node = '$node'";
		$qry .= " AND t_ports.slot = '$slot'";
        
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
                    if($row["ckid"] == null)
						$row["ckid"] = "";
					if ($row["fac"] == null)
						$row["fac"] = "";
					if ($row["fac_id"] == null)
						$row["fac_id"] = "0";
					$rows[] = $row;
                }
            }
            $result["rows"] = $rows;
		}
		return $result;
	}


	function pmQueryFac($fac) {
		global $db;

		$qry = "SELECT t_ports.id as id, t_ports.node, t_ports.slot, t_ports.pnum, t_ports.ptyp, t_ports.psta, ";
		$qry .= "t_facs.id as fac_id, t_facs.fac, t_ckts.ckid ";
		$qry .= "FROM t_ports LEFT JOIN t_facs ON t_ports.fac_id = t_facs.id LEFT JOIN t_ckts ON t_ports.ckt_id = t_ckts.id";
		$qry .= " WHERE t_facs.fac LIKE '%$fac%%'";
        
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
                    if($row["ckid"] == null)
						$row["ckid"] = "";
					if ($row["fac"] == null)
						$row["fac"] = "";
					if ($row["fac_id"] == null)
						$row["fac_id"] = "0";
					$rows[] = $row;
                }
            }
            $result["rows"] = $rows;
		}
		return $result;
	}

	
	function pmQueryCkid($ckid) {
		global $db;
		
		
		$qry = "SELECT t_ports.id as id, t_ports.node, t_ports.slot, t_ports.pnum, t_ports.ptyp, t_ports.psta, ";
		$qry .= "t_facs.id as fac_id, t_facs.fac, t_ckts.ckid ";
		$qry .= "FROM t_ports LEFT JOIN t_facs ON t_ports.fac_id = t_facs.id LEFT JOIN t_ckts ON t_ports.ckt_id = t_ckts.id";
		$qry .= " WHERE t_ckts.ckid LIKE '%$ckid%%'";
        
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
                    if($row["ckid"] == null)
						$row["ckid"] = "";
					if ($row["fac"] == null)
						$row["fac"] = "";
					if ($row["fac_id"] == null)
						$row["fac_id"] = "0";
					$rows[] = $row;
                }
            }
            $result["rows"] = $rows;
		}
		return $result;
	}


?>
