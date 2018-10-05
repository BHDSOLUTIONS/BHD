<?php /* coQueryFac.php */

    $act=$_POST['act'];
    $fac=$_POST['fac'];
    $ftyp=$_POST['ftyp'];
    $ort=$_POST['ort'];
    $spcfnc=$_POST['spcfnc'];

    $db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
    if (mysqli_connect_errno())
    {
        $result["rslt"] = "fail";
        $result["reason"] = mysqli_connect_error();
    }
    else{
        if($act =="query"){
            $qry = "select id, fac, ftyp, ort, spcfnc, port from t_facs where fac like '%$fac%%' and ftyp like '%$ftyp%%' and ort like '%$ort%%' and spcfnc like '%$spcfnc%%'"; 
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
        }
        mysqli_close($db_ct100);
    }

    echo json_encode($result);
    
?>

