

<?php
    session_start();

    session_unset(); 
    session_destroy();

    $uname=$_POST['uname'];
    
    $db = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
	// $db = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
	if (mysqli_connect_errno())
	{
		$result["rslt"] = "fail";
		$result["reason"] = mysqli_connect_error();
		mysqli_close($db);
		echo json_encode($result);
		return;
	}
    $qry = "update t_users set stat = 'INACTIVE' where uname = '$uname'"; 

    $res = $db->query($qry);
    if (!$res) {
        
        $result["rslt"] = "fail";
        $result["reason"] = mysqli_error($db);
    }
    else {

        $result["rslt"] = "success";

            
    } 

    mysqli_close($db);
    echo json_encode($result);


?>