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


    $act = $_POST['act'];
	$user = $_POST['user'];
	$uname = $_POST['uname'];
	$lname = $_POST['lname'];
	$fname = $_POST['fname'];
	$mi = $_POST['mi'];
	$ssn = $_POST['ssn'];
	$tel = $_POST['tel'];
	$email = $_POST['email'];
	$title = $_POST['title'];
	$grp = $_POST['grp'];
	$pw = $_POST['pw'];

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
		$result = queryUser();
		echo json_encode($result);
		return;
	}

	if ($act == "add") {
		$result = addUser();
		echo json_encode($result);
		return;
	}

	if ($act == "upd") {
		$result = updUser();
		echo json_encode($result);
		return;
	}

	if ($act == "disable") {
		$result = disableUser();
		echo json_encode($result);
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}
	
	function queryUser() {
		global $db, $user;
		
		$qry = "select * FROM t_users"; 

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
        mysqli_close($db);
        return $result;
	}

	
	function addUser() {
		global $db, $user, $uname, $lname, $fname, $mi, $tel, $email, $title, $grp, $pw;
		
        if (userPermission("setuser",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}

		$qry = "INSERT INTO t_users VALUES(0,'" . $uname . "','" . $lname . "','" . $fname . "','" . $mi . "','" . $ssn . "'";
		$qry .= ",'','','','','" . $title . "','" . $tel . "','" . $email . "','INACTIVE','" . $pw . "'";
		$qry .= ",now(),'','','','','','','','','','','','','','','" . $grp . "','','')"; 

        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            $qry = "select * FROM t_users"; 
			$res = $db->query($qry);
			$rows = [];
            if ($res->num_rows > 0) {
				while ($row = $res->fetch_assoc()) {
					$rows[] = $row;
				}  
			}
			$result["rslt"] = "success";
			$result["rows"] = $rows;
        }
        mysqli_close($db);
        return $result;
	}
	
	function updUser() {
		global $db, $user, $uname, $lname, $fname, $mi, $tel, $email, $title, $grp, $pw;
		
        if (userPermission("setuser",$user) == false) {
			$result["rslt"] = "fail";
			$result["reason"] = "Permission Denied";
			return $result;
		}

		$qry = "UPDATE t_users SET ";
		if ($lname != "") {
			$qry .= "lname='" . $lname . "'";
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
		if ($grp != ",grp='" . $grp . "' WHERE uname='" . $uname . "'";
		
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            $qry = "select * FROM t_users"; 
			$res = $db->query($qry);
			$rows = [];
            if ($res->num_rows > 0) {
				while ($row = $res->fetch_assoc()) {
					$rows[] = $row;
				}  
			}
			$result["rslt"] = "success";
			$result["rows"] = $rows;
        }
        mysqli_close($db);
        return $result;
	}

	
?>
