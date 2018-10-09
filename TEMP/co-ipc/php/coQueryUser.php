<?php /* coQueryUser.php */
    $act = $_POST['act'];


	if ($act == "query") {
		queryUser();
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}
	
	function queryUser() {
		
		$db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
		// $db_ct100 = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
		if (mysqli_connect_errno())
		{
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_connect_error();
			echo json_encode($result);
			return;
		}


        $qry = "select id, user, stat,lastlogin, fname, lname, ssn, tel, email, title, ugrp FROM t_users  where id like '%%%' and user like '%%%' and stat like '%%%' and lastlogin like '%%%' and fname like '%%%' and lname like '%%%' and ssn like '%%%' and tel like '%%%' and email like '%%%' and title like '%%%' and ugrp like '%%%'"; 

        $res = $db_ct100->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db_ct100);
        }
        else {
            $rows = array();
            while ($row = $res->fetch_assoc()) {
                $rows[] = $row;
            }  
            $result["rslt"] = "success";
            $result["rows"] = $rows;
        }
        echo json_encode($result);
        mysqli_close($db_ct100);
	}

	
?>
