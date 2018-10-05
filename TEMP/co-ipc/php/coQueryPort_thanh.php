<?php /* coQueryPort.php */
    
    $act=$_POST['act'];
    $node=$_POST['node'];
    $slot=$_POST['slot'];
    $pnum = $_POST['pnum'];
    $ptyp=$_POST['ptyp'];
    $psta=$_POST['psta'];
    $fac=$_POST['fac'];
    $ckt=$_POST['ckt'];

    $db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
    if (mysqli_connect_errno())
    {
        $result["rslt"] = "fail";
        $result["reason"] = mysqli_connect_error();
    }
    else {
       if($act=="query"){
            $qry = "select t_ports.id, t_ports.node, t_ports.slot, t_ports.pnum, t_ports.ptyp, t_ports.psta, t_facs.fac, t_ckts.ckid FROM t_ports LEFT JOIN t_facs ON t_ports.fac_id = t_facs.id LEFT JOIN t_ckts ON t_ports.ckt_id = t_ckts.id where t_ports.node like '%$node%%' and t_ports.slot like '%$slot%%' and t_ports.pnum like '%$pnum%%' and t_ports.ptyp like '%$ptyp%%' and t_ports.psta like '%$psta%%'";
            
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