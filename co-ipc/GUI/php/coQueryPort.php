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

    ///Expected inputs
    $act = $_POST['act'];
    $user = $_POST['user'];
    $port_id = $_POST['port_id'];
    $pnum = $_POST['pnum'];
    $ptyp = $_POST['ptyp'];
    $psta = $_POST['psta'];
	$node = $_POST['node'];
	$slot = $_POST['slot'];
	$fac_id = $_POST['fac_id'];
	$fac = $_POST['fac'];
	$ftyp = $_POST['ftyp'];
	
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
	
	if ($act == "query" || $act == "findPort") {
		$result = queryPort($node, $slot, $ptyp, $pnum, $psta);
		echo json_encode($result);
		return;
	}
	if ($act == "findFac") {
		$result = pmQueryFac($fac);
		echo json_encode($result);
		return;
	}
	if ($act == "findCkid") {
		$result = pmQueryCkid($ckid);
		echo json_encode($result);
		return;
	}
	if ($act == "map") {
		$result = mapPort($port_id, $fac_id);
		echo json_encode($result);
		return;
	}
	if ($act == "unmap") {
		$result = unmapPort($port_id, $fac_id);
		echo json_encode($result);
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}


	function mapPort($port_id, $fac_id) {
		global $db;
		
		$result =[];
		if (!($fac_id > 0)) {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FAC";
			return $result;
		}
		
		$map = getMap($port_id, $fac_id, "map");
		if ($map["rslt"] == "fail") {
			$result = $map;
			mysqli_close($db);
			return;
		}
		
		$node = $map["rows"][0]["node"];
		$slot = $map["rows"][0]["slot"];
		$pnum = $map["rows"][0]["pnum"];
		$ptyp = $map["rows"][0]["ptyp"];
		$port = $node . "-" . $slot . "-" . $ptyp . "-" . $pnum;
		$psta = $map["rows"][0]["psta"];
		$ssta = $map["rows"][0]["ssta"];
		$evt = "PT_MAP";
		$sms = getSms($psta, $ssta, $evt);
		if ($sms["rslt"] == "fail") {
			$result = $sms;
			mysqli_close($db);
			return;
		}
			
		$npsta = $sms["rows"][0]["npsta"];
		$nssta = $sms["rows"][0]["nssta"];
		$qry = "UPDATE t_ports SET fac_id=" . $fac_id . ", psta='" . $npsta . "', ssta='" . $nssta . "' WHERE id=" . $port_id;
		$res = $db->query($qry);
		$qry = "UPDATE t_facs SET port_id=" . $port_id . ", port='" . $port . "' WHERE id=" . $fac_id;
		$res = $db->query($qry);
				
		return queryPort("", "", "", "", "");
	}

	function unmapPort($port_id, $fac_id) {
		global $db;
		
		$result =[];
		$map = getMap($port_id, $fac_id, "unmap");
		if ($map["rslt"] == "fail") {
			mysqli_close($db);
			return $map;
		}
		$node = $map["rows"][0]["node"];
		$slot = $map["rows"][0]["slot"];
		$pnum = $map["rows"][0]["pnum"];
		$ptyp = $map["rows"][0]["ptyp"];
		$port = $node . "-" . $slot . "-" . $ptyp . "-" . $pnum;
		$psta = $map["rows"][0]["psta"];
		$ssta = $map["rows"][0]["ssta"];
		$evt = "PT_UNMAP";
		
		$sms = getSms($psta, $ssta, $evt);
		
		if ($sms["rslt"] == "fail") {
			mysqli_close($db);
			return $sms;
		}
		$npsta = $sms["rows"][0]["npsta"];
		$nssta = $sms["rows"][0]["nssta"];
		$qry = "UPDATE t_ports SET fac_id=" . 0 . ", psta='" . $npsta . "', ssta='" . $nssta . "' WHERE id=" . $port_id;
		$res = $db->query($qry);
		$qry = "UPDATE t_facs SET port_id=" . 0 . ", port='' WHERE id=" . $fac_id;
		$res = $db->query($qry);
				
		return queryPort("", "", "", "", "");
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
	
		
	function getMap($port_id, $fac_id, $typ) {
		global $db;
		
		if ($typ == "map")
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
