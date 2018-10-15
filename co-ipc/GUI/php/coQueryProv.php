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

	class Fac {
		public $id;
		public $fac;
		public $ftyp;
		public $ort;
		public $spcfnc;
		public $port_id;
		public $rslt;
		public $reason;
		
		public function __construct($fac) {
			global $db;
			
			$qry = "SELECT * FROM t_facs WHERE fac='" . $fac . "' LIMIT 1";
			$res = $db->query($qry);
			if (!$res) {
				$this->rslt = "fail";
				$this->reason = mysqli_error($db);
			}
			else {
				$rows = [];
				if ($res->num_rows > 0) {
					while ($row = $res->fetch_assoc()) {
						$rows[] = $row;
					}
					$this->rslt = "success";
					$this->fac = $rows[0]["fac"];
					$this->ftyp = $rows[0]["ftyp"];
					$this->ort = $rows[0]["ort"];
					$this->spcfnc = $rows[0]["spcfnc"];
					$this->port_id = $rows[0]["port_id"];
					if ($this->port_id == 0) {
						$this->rslt = "fail";
						$this->reason = "FAC not yet mapped";
					}
				}
				else {
					$this->rslt = "fail";
					$this->reason = "FAC not exist";
				}
			}
		}
			
	}
	
	class Port {
		public $id;
		public $node;
		public $slot;
		public $ptyp;
		public $pnum;
		public $psta;
		public $ssta;
		public $substa;
		public $fac_id;
		public $ckt_id;
		public $ckcon;
		public $mp_id;
		public $npsta;
		public $nssta;
		public $rslt;
		public $reason;
		
		
		public function __construct($port_id) {
			global $db;
			
			$qry = "SELECT * FROM t_ports WHERE id='" . $port_id . "' LIMIT 1";
			$res = $db->query($qry);
			if (!$res) {
				$this->rslt = "fail";
				$this->reason = mysqli_error($db);
			}
			else {
				$rows = [];
				if ($res->num_rows > 0) {
					while ($row = $res->fetch_assoc()) {
						$rows[] = $row;
					}
					$this->rslt = "success";
					$this->id = $rows[0]["id"];
					$this->node = $rows[0]["node"];
					$this->slot = $rows[0]["slot"];
					$this->ptyp = $rows[0]["ptyp"];
					$this->pnum = $rows[0]["pnum"];
					$this->psta = $rows[0]["psta"];
					$this->ssta = $rows[0]["ssta"];
					$this->substa = $rows[0]["substa"];
					$this->fac_id = $rows[0]["fac_id"];
					$this->ckt_id = $rows[0]["ckt_id"];
					$this->cktcon = $rows[0]["cktcon"];
					$this->mp_id = $rows[0]["mp_id"];
					if ($this->fac_id == 0) {
						$this->rslt = "fail";
						$this->reason = "PORT not yet mapped";
					}
				}
				else {
					$this->rslt = "fail";
					$this->reason = "FAC not exist";
				}
			}
		}

	}
	
	class ckt {
		public $id;
		public $ckid;
		public $cls;
		public $adsr;
		public $prot;
		public $ordno;
		public $mlo;
		public $date;
		public $cktcon;
		public $user;
		public $rslt;
		public $reason;
		
		public function __construct($ckid) {
			global $db;
			
			$qry = "SELECT * FROM t_ckts WHERE ckid='" . $ckid . "' LIMIT 1";
			$res = $db->query($qry);
			if (!$res) {
				$this->rslt = "fail";
				$this->reason = mysqli_error($db);
			}
			else {
				$rows = [];
				if ($res->num_rows > 0) {
					while ($row = $res->fetch_assoc()) {
						$rows[] = $row;
					}
					$this->rslt = "success";
					$this->id = $rows[0]["id"];
					$this->ckid = $rows[0]["ckid"];
					$this->cls = $rows[0]["cls"];
					$this->adsr = $rows[0]["adsr"];
					$this->ordno = $rows[0]["ordno"];
					$this->mlo = $rows[0]["mlo"];
					$this->date = $rows[0]["date"];
					$this->cktcon = $rows[0]["cktcon"];
				}
				else {
					$this->rslt = "fail";
					$this->reason = "CKID not exist";
				}
			}
		}

	}

	


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
	if (mysqli_connect_errno()) {
		$result["rslt"] = "fail";
		$result["reason"] = mysqli_connect_error();
		echo json_encode($result);
		return;
	}
	
	if ($act == "query") {
		$result = queryCkt($ckid);
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	if ($act == "queryCktcon") {
		$result = queryCktcon();
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
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}


	/* Functions section */
	
	function provNewCkt() {
		global $db, $ckid, $cls, $adsr, $prot, $ordno, $mlo, $ctyp, $ffac, $tfac, $user;
		
		//validate ffac and tfac and ckid
		$ffacObj = new Fac($ffac);
		if ($ffacObj->rslt == "fail") {
			$result["rslt"] = $ffacObj->rslt;
			$result["reason"] = $ffacObj->reason;
			return $result;
		}
		
		$tfacObj = new Fac($tfac);
		if ($tfacObj->rslt == "fail") {
			$result["rslt"] = $tfacObj->rslt;
			$result["reason"] = $tfacObj->reason;
			return $result;
		}
		
		$cktObj = new Ckt($ckid);
		if ($cktObj->rslt == "success") {
			$result["rslt"] = "fail";
			$result["reason"] = "CKID already exists";
			return $result;
		}
		
		$fportObj = new Port($ffacObj->port_id);
		if ($fportObj->rslt == "fail") {
			$result["rslt"] = $fportObj->rslt;
			$result["reason"] = $fportObj->reason;
			return $result;
		}

		$tportObj = new Port($tfacObj->port_id);
		if ($tportObj->rslt == "fail") {
			$result["rslt"] = $tportObj->rslt;
			$result["reason"] = $tportObj->reason;
			return $result;
		}

		$result = getSms($fportObj->psta, $fportObj->ssta, "SV_CONN");
		if ($result["rslt"] == "fail") {
			return $result;
		}
		else {
			$fportObj->npsta = $result["rows"][0]["npsta"];
			$fportObj->nssta = $result["rows"][0]["nssta"];
		}

		$result = getSms($tportObj->psta, $tportObj->ssta, "SV_CONN");
		if ($result["rslt"] == "fail") {
			return $result;
		}
		else {
			$tportObj->npsta = $result["rows"][0]["npsta"];
			$tportObj->nssta = $result["rows"][0]["nssta"];
		}

		// find next avail cktcon
		$result = getAvailCktcon();
		if ($result["rslt"] == "fail") {
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
            return $result;
        }
		$ckt_id = $db->insert_id;
		
		// setup new cktcon
		$qry = "INSERT INTO t_cktcon VALUES (0," . $cktcon . "," . $ckt_id . ",0,'" . $ctyp . "'," . $fportObj->id . ",0," . $tportObj->id . ",0)";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
            return $result;
        }
		
        // link the fport to ckt_id
        $qry = "UPDATE t_ports SET psta='" . $fportObj->npsta . "',ssta='" . $fportObj->nssta . "',ckt_id=" . $ckt_id;
        $qry .= ",cktcon=" . $cktcon . ",mp_id=0 WHERE id=" . $fportObj->id;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
            return $result;
        }
		
        // link the fport to ckt_id
        $qry = "UPDATE t_ports SET psta='" . $tportObj->npsta . "',ssta='" . $tportObj->nssta . "',ckt_id=" . $ckt_id;
        $qry .= ",cktcon=" . $cktcon . ",mp_id=0 WHERE id=" . $tportObj->id;
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
            return $result;
        }
		
		return queryCkt();

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
		global $db;
		
		
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
