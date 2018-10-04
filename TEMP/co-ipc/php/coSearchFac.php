<?php /* coSearchFac.php */

    $fac=$_POST['fac'];
    $ftyp=$_POST['ftyp'];
    $ort=$_POST['ort'];
    $spcfnc=$_POST['spcfnc'];

    //$db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
    $db_ct100 = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
    if (mysqli_connect_errno())
    {
        $result["rslt"] = "fail";
        $result["reason"] = mysqli_connect_error();
    }
    else{
        $qry = "select t_facs.fac, t_facs.ftyp, t_facs.ort, t_facs.spcfnc, t_facs.port from t_facs where t_facs.fac like '%$fac%%' and t_facs.ftyp like '%$ftyp%%' and t_facs.ort like '%$ort%%' and t_facs.spcfnc like '%$spcfnc%%'"; 

        $res = $db_ct100->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db_ct100);
        }
        else {
            $rows = array();
            if ($res->num_rows == NULL) {
                $result["rslt"] = "fail";
                $result["reason"] = "There is no matching data!";
            }
            else
            {
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

