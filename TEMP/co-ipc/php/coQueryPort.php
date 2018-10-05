<?php /* coQueryPort.php */
    ///Hello chu Ninh
    //Hi co Thu
    $port = $_POST['port'];

    //$db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
    $db_ct100 = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
    if (mysqli_connect_errno())
    {
        $result["rslt"] = "fail";
        $result["reason"] = mysqli_connect_error();
    }

    else {
        if ($port != "all") {
            $result["rslt"] = "failed";
            $result["reason"] = "is under development";
        }
        else {
            $qry = "select t_ports.node, t_ports.slot, t_ports.pnum, t_ports.ptyp, t_ports.psta, t_facs.fac, t_ckts.ckid FROM t_ports LEFT JOIN t_facs ON t_ports.fac_id = t_facs.id LEFT JOIN t_ckts ON t_ports.ckt_id = t_ckts.id";

            $res = $db_ct100->query($qry);
            if (!$res) {
                $result["rslt"] = "fail";
                $result["reason"] = mysqli_error($db_ct100);
            }
            else {
               
                if ($res->num_rows == NULL) {
                    $result["rslt"] = "fail";
                    $result["reason"] = "There is no facility in the database!";
                }
                else{
                    $rows = array();
                    while ($row = $res->fetch_assoc()) {
                        $rows[] = $row;
                    }
                    $result["rslt"] = "success";
                    $result["rows"] = $rows;
                }
                
            }
            
        }
        mysqli_close($db_ct100);
    }
    echo json_encode($result);

?>
