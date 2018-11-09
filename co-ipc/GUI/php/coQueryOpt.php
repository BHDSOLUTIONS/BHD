<?php

    include "coCommonFunctions.php";
    $user = "";
    if (isset($_POST['user']))
        $user = $_POST['user'];

    $act = "";
    if (isset($_POST['act']))
        $act = $_POST['act'];

    $dbObj = new Db();
    if ($dbObj->rslt == "fail") {
        $result["rslt"] = "fail";
        $result["reason"] = $dbObj->reason;
        echo json_encode($result);
        return;
    }
    $db = $dbObj->con;

    if ($act == "queryOpt")
    {
        $result = queryOpt();
        mysqli_close($db);
        echo json_encode($result);
        
    }
    else if ($act == "queryFtyp")
    {   
        $result = queryFtyp();
        mysqli_close($db);
        echo json_encode($result);
        
    }

    function queryOpt () {
        global $db;
        $qry = "select * from t_options";
        
        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db);
        }
        else
        {
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

    function queryFtyp () {
        $qry = "select * from t_ftyp";
        $res = $db->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = $dbObj->reason;
        }
        else
        {
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
    

?>