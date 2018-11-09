<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryLogin.php
 * Change history: 
 * 2018-10-16: created (Thanh)
 */

    include "coCommonFunctions.php";
    
   
	$uname = "";
	if(isset($_POST['uname']))
		$uname = $_POST['uname'];

	$pw = "";
	if(isset($_POST['pw']))
		$pw = $_POST['pw'];

    $act = "";
    if(isset($_POST['act']))
        $act = $_POST['act'];

    $newpw = "";
    if(isset($_POST['newpw']))
        $newpw = $_POST['newpw'];


 	$dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	
   
    if ($act == "login") {
		$result = userLogin();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}
    
    /*if($act =="firstlogin"){
		$result = userFirstLogin();
		echo json_encode($result);
		mysqli_close($db);
		return;
	}*/
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "Invalid ACTION";
		echo json_encode($result);
		return;
	}



	function userLogin() {
		global $db, $uname, $pw, $newpw;
		
        $evtLog = new EvtLog($uname,"USERS","LOGIN");
        if ($uname == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing Username";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
		if ($pw == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing Password";
			$evtLog->log($result["rslt"], $result["reason"]);
			return $result;
		}
		
        $qry = "SELECT * FROM t_users WHERE uname = '$uname' and pw = '$pw'"; 
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
                $id = $rows[0]["id"];
                if ($rows[0]["ssn"] == $rows[0]["pw"]) {
					if ($newpw == "") {
						$result["rslt"] = "fail";
						$result["reason"] = "Please use First Time Login and provide NEW PASSWORD";
						$evtLog->log($result["rslt"], $result["reason"]);
						return $result;
					}
					else {
						$qry = "UPDATE t_users set stat='ACTIVE',lastlogin=now(),login=now(),pw='" . $newpw . "',pwdate=now() WHERE id=" . $id;
					}
				}
				else {
					$qry = "UPDATE t_users set stat = 'ACTIVE', lastlogin=login, login=now() WHERE id=" . $id; 
				}
                $res = $db->query($qry);
                if (!$res) {
                   
                    $result["rslt"] = "fail";
                    $result["reason"] = mysqli_error($db);
                }
                else {
                    $result["rslt"] = "success";
                    $result["reason"] = "userLogin";
				}   
            }
            else {
				$result["rslt"] = "fail";
				$result["reason"] = "Invalid USERNAME or PASSWORD";
			}
        }
		$evtLog->log($result["rslt"], $result["reason"]);
		return $result;
    }
        

	/*
	function userFirstLogin() {
		global $db, $uname, $pw, $newpw;
		
		$evtLog = new EvtLog($uname,"USERS","FIRST-LOGIN");
		
		if ($uname == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing USERNAME";
			return $result;
		}
		
		if ($pw == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing PASSWORD";
			return $result;
		}
		
		if ($newpw == "") {
			$result["rslt"] = "fail";
			$result["reason"] = "Missing NEW PASSWORD";
			return $result;
		}
			
		
        $qry = "SELECT * FROM t_users where uname = '$uname' and pw = '" . $pw . "'";
        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else{
            $rows = [];
            if ($res->num_rows > 0) {
                while ($row = $res->fetch_assoc()) {
                    $rows[] = $row;
                }
                $id = $rows[0]["id"]; 
                $qry = "UPDATE t_users SET pw = '$newpw', stat = 'ACTIVE', lastlogin=now(), login=now() WHERE id=" . $id; 
      
                $res = $db->query($qry);
                if (!$res) {
                    $result["rslt"] = "fail";
                    $result["reason"] = mysqli_error($db);
                }
                else {
                    $result["rslt"] = "success";
                    $result["reason"] = "userFirstLogin";
                } 
			}
			else{
				$result["rslt"] = "fail";
                $result["reason"] = "Invalid UserName or Password";
			}
        }
        $evtLog->log($result["rslt"], $result["reason"]);
		return $result;
	}*/
   

?>
