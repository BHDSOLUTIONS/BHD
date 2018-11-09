<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryMatrix.php
 * Change history: 
 * 2018-11-01: created (Thanh)
 */

 	include "coCommonFunctions.php";
  

	/* Initialize expected inputs */
	$act = "";
	if (isset($_POST['act']))
        $act = $_POST['act'];
	
	$id = "";
	if (isset($_POST['id']))
		$id = $_POST['id'];

	$wcname = "";
	if (isset($_POST['wcname']))
		$wcname = $_POST['wcname'];

	$wcc = "";
	if (isset($_POST['wcc']))
	    $wcc = $_POST['wcc'];

	$clli = "";
	if (isset($_POST['clli']))
		$clli = $_POST['clli'];

	$npanxx = "";
	if (isset($_POST['npanxx']))
		$npanxx = $_POST['npanxx'];

	$frloc = "";
	if (isset($_POST['frloc']))
		$frloc = $_POST['frloc'];


    $tzone = "";
	if (isset($_POST['tzone']))
	    $tzone = $_POST['tzone'];

	$stat = "";
	if (isset($_POST['stat']))
		$stat = $_POST['stat'];

	$addr = "";
	if (isset($_POST['addr']))
		$addr = $_POST['addr'];

	$city = "";
	if (isset($_POST['city']))
		$city = $_POST['city'];
		
	$state = "";
	if (isset($_POST['state']))
		$state = $_POST['state'];
		
	$zip = "";
	if (isset($_POST['zip']))
		$zip = $_POST['zip'];

	$gps = "";
	if (isset($_POST['gps']))
		$gps = $_POST['gps'];

	$company = "";
	if (isset($_POST['company']))
		$company = $_POST['company'];
		
	$region = "";
	if (isset($_POST['region']))
		$region = $_POST['region'];

	$area = "";
	if (isset($_POST['area']))
		$area = $_POST['area'];

	$district = "";
	if (isset($_POST['district']))
		$district = $_POST['district'];

	$manager = "";
	if (isset($_POST['manager']))
		$manager = $_POST['manager'];
		
        
	/* Dispatch to functions */
	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	

	if ($act  == "query") {
		$result = queryWc();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	
	if ($act  ==  "update" || $act == "UPDATE") {
		$result = updateWc();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
	
	if ($act  ==  "reset" || $act == "RESET" ) {
		$result = resetWc();
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
	
				
	/* Function section */
	function queryWc() {
		global $db;
		
		$qry = "SELECT * FROM t_wc";
		
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
	

	function updateWc() {
		global $db,$wcname,$wcc,$clli,
				$npanxx,$frloc,$tzone,
				$stat,$addr,$city,$state,
				$zip,$gps,$company,$region,
				$area,$district,$manager,$id;

		if ($id == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing WIRE CENTER ID";
			return $result;	
		}
				
		if ($id == 1) {
			$result["rslt"] = "fail";
			$result["reason"] = "Invalid WIRE CENTER ID";
			return $result;	
		}

		$qry = "UPDATE t_wc SET wcname='$wcname', wcc='$wcc', clli='$clli', npanxx='$npanxx', frloc='$frloc', 
		tzone='$tzone', ipcstat='$stat', loc='$addr', city='$city', state='$state', zip='$zip', gps='$gps', 
		company='$company', region='$region', area='$area', district='$district', manager='$manager' WHERE id='$id'";
		
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            $result = queryWc();
        }
		return $result;
	}


	function resetWc() {
		global $db,$id;
		
		$qry = "UPDATE t_wc as t1 INNER JOIN t_wc as t2 ON t1.id = t2.id+1 SET t1.wcname=t2.wcname, t1.wcc=t2.wcc";
		$qry .= ", t1.clli=t2.clli, t1.npanxx=t2.npanxx, t1.frloc=t2.frloc, t1.ipcmod=t2.ipcmod, t1.ipctyp=t2.ipctyp";
		$qry .= ", t1.ipcstat=t2.ipcstat, t1.termid=t2.termid, t1.loc=t2.loc, t1.city=t2.city, t1.state=t2.state";
		$qry .= ", t1.zip=t2.zip, t1.gps=t2.gps, t1.gw=t2.gw, t1.ipadr=t2.ipadr, t1.iport=t2.iport, t1.netmask=t2.netmask";
		$qry .= ", t1.gateway=t2.gateway, t1.mainthour=t2.mainthour, t1.company=t2.company, t1.region=t2.region, t1.area=t2.area";
		$qry .= ", t1.district=t2.district, t1.manager=t2.manager";

		$res = $db->query($qry);
        if (!$res) {		
            $result["rslt"] = "fail";
			$result["reason"] = mysqli_error($db);
		}
		else {
			$result = queryWc();
		}
		return $result;
	}

?>
