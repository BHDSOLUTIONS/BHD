<?php
/*
 * Copy Right @ 2018
 * BHD Solutions, LLC.
 * Project: CO-IPC
 * Filename: coQueryUser.php
 * Change history: 
 * 2018-16-05: created (Thanh)
 */
    session_start();
    
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
    
    if($act == "login"){
        $qry = "select * FROM t_users where uname = '$uname' and pw = '$pw'"; 
  
        $res = $db->query($qry);
        if (!$res) {
           
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            
            $rows = [];
            if ($res->num_rows == 1) {
                while ($row = $res->fetch_assoc()) {
                    $rows[] = $row;
                }  
                $qry = "update t_users set stat = 'ACTIVE', lastlogin=now() where uname = '$uname' and pw= '$pw'"; 
      
                $res = $db->query($qry);
                if (!$res) {
                   
                    $result["rslt"] = "fail";
                    $result["reason"] = mysqli_error($db);
                }
                else
                {
                    $result["rslt"] = "success";
                    $result["rows"] = $rows;

                    $_SESSION['uname'] = $uname;
                    $_SESSION['password'] = $pw;

                }
                
            }
            
            
        }
        mysqli_close($db);
        echo json_encode($result);
    }
    else if($act =="firstlogin"){
        $qry = "select * FROM t_users where uname = '$uname' and pw = '$pw'";

        $res = $db->query($qry);
        if (!$res) {
           
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else{
            $rows = [];
            // echo '<pre>'; print_r($res); echo '</pre>';
            if ($res->num_rows > 0) {
                if($res->num_rows == 1){
                    while ($row = $res->fetch_assoc()) {
                        $rows[] = $row;
                    }  
                    if($rows[0]['pw'] == $rows[0]['ssn']){
                        $qry = "update t_users set pw = '$newpw', stat = 'ACTIVE', lastlogin=now() where uname = '$uname' and pw= '$pw'"; 
      
                        $res = $db->query($qry);
                        if (!$res) {
                           
                            $result["rslt"] = "fail";
                            $result["reason"] = mysqli_error($db);
                        }
                        else {
                            $rows = [];
                            
                            $result["rslt"] = "success";
                            $result["rows"] = $rows;

                            $_SESSION['uname'] = $uname;
                            $_SESSION['password'] = $newpw;
                                
                        } 
                        
                    }
                    else{
                        $result["rslt"] = "fail";
                        $result["reason"] = "This is not your first time login!";
                    }
                }
                else{
                    $result["rslt"] = "fail";
                    $result["reason"] = "There are duplicated accounts with this username and password!";
                }
                
            }
            else{

                $result["rslt"] = "fail";
                $result["reason"] = "Wrong username and password!";
            }
        }
      
        mysqli_close($db);
        echo json_encode($result);
    }
   

?>
