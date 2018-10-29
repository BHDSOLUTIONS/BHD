<?php

include "coCommonFunctions.php";
    

    $act = "";
    if (isset($_POST['act']))
        $act = $_POST['act'];
    
    $user = '';
    if(isset($_POST['user']))
        $user = $_POST['user'];

    $id   ='';
    if(isset($_POST['id']))
    $id = $_POST['id'];

    $fileName = '';
    $fileContent = '';
    if ($_FILES['file']['error'] == UPLOAD_ERR_OK && is_uploaded_file($_FILES['file']['tmp_name'])) 
    { 
        $fileName = $_FILES["file"]["name"];
        $fileContent = file_get_contents($_FILES['file']['tmp_name']); 
    }

    $dbObj = new Db();
	if ($dbObj->rslt == "fail") {
		$result["rslt"] = "fail";
		$result["reason"] = $dbObj->reason;
		echo json_encode($result);
		return;
	}
	$db = $dbObj->con;
	
    if ($act == 'query')
    {
        $result = queryBatch('');
		echo json_encode($result);
		mysqli_close($db);
		return;
    }
	else if ($act == "add") {
		$result = addBatch();
		echo json_encode($result);
		mysqli_close($db);
		return;
    }
    else if ($act == "delete") {
        $result = delBatch();
		echo json_encode($result);
		mysqli_close($db);
		return;
    }
    else if ($act == "queryBats"){
        $result = queryBats($id);
        echo json_encode($result);
		mysqli_close($db);
		return;
    }
    else {
        $result["rslt"] = "fail";
        $result["reason"] = "This action is under development!";

        echo json_encode($result);
		mysqli_close($db);
		return;
    }

    function queryBatch($filename){
        global $db;

		$qry = "select * from t_batch where filename like '%$filename%'";
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

    function queryBats($id){
        global $db;

		$qry = "select * from t_bats where batch_id like '%$id%'";
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

    function addBatch() {
		global $db, $user, $fileName, $fileContent;

		$qry = "INSERT INTO t_batch VALUES ('0','$user','$fileName','$fileContent',now())";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {

            $result =  queryBatch($fileName);
            if ($result["rslt"] == "success")
            {
                $batch_id = $result['rows'][0]['id'];
            
                //Break the text file into lines
                $commandArray = preg_split ('/$\R?^/m', $fileContent);
                for($i=0; $i < count($commandArray); $i++) {
                    $cmd_id = $i+1;
                    $qry = "INSERT INTO t_bats VALUES ('0','$batch_id','$cmd_id','$commandArray[$i]')";
                    // echo $qry.PHP_EOL;
                    $res = $db->query($qry);
                    if (!$res) {
                        $result["rslt"] = "fail";
                        $result["reason"] = mysqli_error($db);
                        goto end;
                    }
                }
                $result = queryBatch('');
            }
        }
		end: return $result;
    }

    function delBatch() {
		global $db, $id;

		$qry = "delete from t_batch where id = '$id'";
		$res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else {
            
            $qry = "delete from t_bats where batch_id = '$id'";
            $res = $db->query($qry);
            if (!$res) {
                $result["rslt"] = "fail";
                $result["reason"] = mysqli_error($db);
            }
		    $result =  queryBatch('');
        }
		return $result;
    }

?>