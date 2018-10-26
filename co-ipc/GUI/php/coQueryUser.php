<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryUser.php
 * Change history: 
 * 2018-10-05: created (Thanh)
 */

	include "coCommonFunctions.php";


    // initialize expected inputs
    $id = "";
	if (isset($_POST['id']))
		$id = $_POST['id'];

    $act = "";
	if (isset($_POST['act']))
		$act = $_POST['act'];
	
    $user = "";
	if (isset($_POST['user']))
		$user = $_POST['user'];

    $stat = "";
	if (isset($_POST['stat']))
		$stat = $_POST['stat'];

    $uname = "";
	if (isset($_POST['uname']))
		$uname = $_POST['uname'];

    $lname = "";
	if (isset($_POST['lname']))
		$lname = $_POST['lname'];

    $fname = "";
	if (isset($_POST['fname']))
		$fname = $_POST['fname'];

    $mi = "";
	if (isset($_POST['mi']))
		$mi = $_POST['mi'];

    $ssn = "";
	if (isset($_POST['ssn']))
		$ssn = $_POST['ssn'];

    $tel = "";
	if (isset($_POST['tel']))
		$tel = $_POST['tel'];

    $email = "";
	if (isset($_POST['email']))
		$email = $_POST['email'];

    $title = "";
	if (isset($_POST['title']))
		$title = $_POST['title'];

    $ugrp = "";
	if (isset($_POST['ugrp']))
		$ugrp = $_POST['ugrp'];


	// Dispatch to Functions
	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	
	
	if ($act == "query" || $act == "findUser") {
		$result = queryUser();
		echo json_encode($result);
		mysqli_close($db);
        return;
	}
	
	if ($act == "findNameSsn") {
		$result = queryUserName();
		echo json_encode($result);
		mysqli_close($db);
        return;
	}
	
	if ($act == "findTelEmail") {
		$result = queryUserTel();
		echo json_encode($result);
		mysqli_close($db);
        return;
	}
	
	if ($act == "findTitleGrp") {
		$result = queryUserGrp();
		echo json_encode($result);
		mysqli_close($db);
        return;
	}
	
	if ($act == "add" || $act == "ADD") {
		$result = addUser();
		echo json_encode($result);
		mysqli_close($db);
        return;
	}

	if ($act == "upd" || $act == "UPDATE") {
		$result = updUser();
		echo json_encode($result);
		mysqli_close($db);
        return;
	}

	if ($act == "disable" || $act == "DISABLE") {
		$result = disableUser();
		echo json_encode($result);
		mysqli_close($db);
        return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = $act . " is under development or not supported";
		echo json_encode($result);
		mysqli_close($db);
        return;
	}
	
	
	// Functions section
	function queryUser() {
		global $db, $user, $uname, $stat;
		
		$qry = "SELECT t_users.id, t_users.uname, t_users.stat, t_users.lastlogin, t_users.lname, t_users.fname, t_users.mi";
		$qry .= ", t_users.ssn, t_users.tel, t_users.email, t_users.title, t_users.grp, t_grp.ugrp FROM t_users left join t_grp on";
		$qry .= " t_users.grp=t_grp.id";

		if ($uname != "") {
			$qry .= " WHERE t_users.uname LIKE '%$uname%'";
			if ($stat != "") {
				$qry .= " AND t_users.stat LIKE '%$stat%'";
			}
		}
		else if ($stat != "") {
			$qry .= " WHERE t_users.stat LIKE '%$stat%'";
		}
		
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
        return $result;
	}


	function queryUserTel() {
		global $db, $user, $tel, $email;
		
		$qry = "SELECT t_users.id, t_users.uname, t_users.stat, t_users.lastlogin, t_users.lname, t_users.fname, t_users.mi";
		$qry .= ", t_users.ssn, t_users.tel, t_users.email, t_users.title, t_users.grp, t_grp.ugrp FROM t_users left join t_grp on";
		$qry .= " t_users.grp=t_grp.id";
		 
		if ($tel != "") {
			$qry .= " WHERE t_users.tel LIKE '%$tel%'";
			if ($email != "") {
				$qry .= " AND t_users.email LIKE '%$email%'";
			}
		}
		else if ($email != "") {
			$qry .= " WHERE t_users.email LIKE '%$email%'";
		}
		
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
        return $result;
	}


	function queryUserGrp() {
		global $db, $user, $title, $ugrp;
		
		$qry = "SELECT t_users.id, t_users.uname, t_users.stat, t_users.lastlogin, t_users.lname, t_users.fname, t_users.mi";
		$qry .= ", t_users.ssn, t_users.tel, t_users.email, t_users.title, t_users.grp, t_grp.ugrp FROM t_users left join t_grp on";
		$qry .= " t_users.grp=t_grp.id";
		 
		if ($title != "") {
			$qry .= " WHERE t_users.title LIKE '%$title%'";
			if ($ugrp != "") {
				$qry .= " AND t_grp.ugrp LIKE '%$ugrp%'";
			}
		}
		else if ($ugrp != "") {
			$qry .= " WHERE t_grp.ugrp LIKE '%$ugrp%'";
		}
		
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
        return $result;
	}

	

	function queryUserName() {
		global $db, $user, $lname, $fname;
		
		$qry = "SELECT t_users.id, t_users.uname, t_users.stat, t_users.lastlogin, t_users.lname, t_users.fname, t_users.mi";
		$qry .= ", t_users.ssn, t_users.tel, t_users.email, t_users.title, t_users.grp, t_grp.ugrp FROM t_users left join t_grp on";
		$qry .= " t_users.grp=t_grp.id";
		 
		if ($lname != "") {
			$qry .= " WHERE t_users.lname LIKE '%$lname%'";
			if ($fname != "") {
				$qry .= " AND t_users.fname LIKE '%$fname%'";
			}
		}
		else if ($fname != "") {
			$qry .= " WHERE t_users.fname LIKE '%$fname%'";
		}
		
        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
			$result["sql"] = $qry;
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
			$result["sql"] = $qry;
        }
        return $result;
	}

	
	function addUser() {
		global $db, $act, $user, $uname, $lname, $fname, $mi, $ssn, $tel, $email, $title, $ugrp;
		
		
		if ($user == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing USER";
			return $result;
		}
		
		$evtLog = new EvtLog($user, "USERS", $act);
 			
        /*
         * if (userPermission("setuser",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}
		*/

		if ($uname == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing UNAME";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
 			
		if ($lname == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing LNAME";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
 			
		if ($fname == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing FNAME";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
 			
		if ($ssn == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing SSN";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
 			
		if ($tel == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing TEL";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
 			
		if ($email == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing EMAIL";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
 			
		if ($title == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing TITLE";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
 			
		if ($ugrp == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing GROUP";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		else {
			$grp = getGrpId($ugrp);
			if ($grp["rslt"] == "fail") {
				$result["rslt"] = "fail";
				$result["reason"] = $grp["reason"];
				$evtLog->log($result["rslt"], $result["reason"]);
				return $result;
			}
			$grpId = $grp["id"];
		}

		$qry = "INSERT INTO t_users VALUES(0,'" . $uname . "','" . $lname . "','" . $fname . "','" . $mi . "','" . $ssn . "'";
		$qry .= ",'','','','','" . $title . "','" . $tel . "','" . $email . "','INACTIVE','" . $ssn . "'";
		$qry .= ",now(),'','','','','','','','','','','','','','','" . $grpId . "',null,null)"; 

        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
			$evtLog->log($result["rslt"], $result["reason"]);
        }
        else {
            $qry = "SELECT t_users.id, t_users.uname, t_users.stat, t_users.lastlogin, t_users.lname, t_users.fname, t_users.mi";
			$qry .= ", t_users.ssn, t_users.tel, t_users.email, t_users.title, t_users.grp, t_grp.ugrp FROM t_users left join t_grp on";
			$qry .= " t_users.grp=t_grp.id";

			$res = $db->query($qry);
			$rows = [];
            if ($res->num_rows > 0) {
				while ($row = $res->fetch_assoc()) {
					$rows[] = $row;
				}  
			}
			$result["rslt"] = "success";
			$result["rows"] = $rows;
			$evtLog->log("success", "addUser");
		}
        return $result;
	}
	
	function updUser() {
		global $db, $act, $user, $uname, $lname, $fname, $mi, $ssn, $tel, $email, $title, $ugrp;
		
		if ($user == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing USER";
			return $result;
		}
		
		$evtLog = new EvtLog($user, "USERS", $act);
 			
        /*if (userPermission("setuser",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}*/

		if ($uname == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing UNAME";
			$evtLog->log($result["rslt"], $result["reason"]);
        	return $result;
		}
			
		$grp = getGrpId($ugrp);
		if ($grp["rslt"] == "fail") {
			$result["rslt"] = "fail";
			$result["reason"] = $grp["reason"];
			$evtLog->log($result["rslt"], $result["reason"]);
        	return $result;
		}
		$grpId = $grp["id"];
		
		$qry = "UPDATE t_users SET grp=" . $grpId;
		
		
		if ($lname != "") {
			$qry .= ",lname='" . $lname . "'";
		}
		if ($fname != "") {
			$qry .= ",fname='" . $fname . "'";
		}
		if ($mi != "") {
			$qry .= ",mi='" . $mi . "'";
		}
		if ($ssn != "") {
			$qry .= ",ssn='" . $ssn . "'";
		}
		if ($title != "") {
			$qry .= ",title='" . $title . "'";
		}
		if ($tel != "") {
			$qry .= ",tel='" . $tel . "'";
		}
		if ($email != "") {
			$qry .= ",email='" . $email . "'";
		}
		
		$qry .= " WHERE uname='" . $uname . "'";
		
		
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        	$evtLog->log($result["rslt"], $result["reason"]);
        }
        else {
            $qry = "SELECT t_users.id, t_users.uname, t_users.stat, t_users.lastlogin, t_users.lname, t_users.fname, t_users.mi";
			$qry .= ", t_users.ssn, t_users.tel, t_users.email, t_users.title, t_users.grp, t_grp.ugrp FROM t_users left join t_grp on";
			$qry .= " t_users.grp=t_grp.id";

			$res = $db->query($qry);
			$rows = [];
            if ($res->num_rows > 0) {
				while ($row = $res->fetch_assoc()) {
					$rows[] = $row;
				}  
			}
			$result["rslt"] = "success";
			$result["rows"] = $rows;
        	$evtLog->log("success", "updUser");
        }
        return $result;
	}


	function getGrpId($ugrp) {
		global $db;
		
		$qry = "SELECT id FROM t_grp WHERE ugrp='" . $ugrp . "'";
		$res = $db->query($qry);
		$rows = [];
        if ($res->num_rows > 0) {
			while ($row = $res->fetch_assoc()) {
				$rows[] = $row;
			}  
			$grp["rslt"] = "success";
			$grp["id"] = $rows[0]["id"];
		}
		else {
			$grp["rslt"] = "fail";
			$grp["reason"] = "Invalid ugrp";
		}
		return $grp;
	}
	
		
	
?>
