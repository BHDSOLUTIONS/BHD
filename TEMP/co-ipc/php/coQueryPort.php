<?php /* coQueryPort.php date:2018-10-05*/
  
    ///Hello chu Ninh
    $act = $_POST['act'];
    $port_id = $_POST['port_id'];
    $pnum = $_POST['pnum'];
    $ptyp = $_POST['ptyp'];
    $psta = $_POST['psta'];
	$node = $_POST['node'];
	$slot = $_POST['slot'];
	$fac = $_POST['fac'];
	$ftyp = $_POST['ftyp'];
	
	if ($act == "query") {
		$result = queryPort();
		echo json_encode($result);
		return;
	}
	if ($act == "map") {
		mapPort();
		return;
	}
	if ($act == "unmap") {
		unmapPort();
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}


	function mapPort() {
		global $port_id, $fac_id;
		
		$qry = "SELECT * from t_ports, t_facs WHERE t_port.id=" . $port_id . " AND t_facs.id=" . $fac_id;
        $res = $db_ct100->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db_ct100);
=======
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
>>>>>>> 90731cf1c32e5f893e4ddb7083ab3dcca8ceacb9
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
		mysqli_close($db_ct100);
		return $result;
	}
	
	
	
	function queryPort() {
		global $port_id, $pnum, $ptyp, $node, $slot, $psta;
		
		//$db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
		$db_ct100 = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
		if (mysqli_connect_errno())
		{
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_connect_error();
			return $result;
		}
		
		$qry = "SELECT t_ports.node, t_ports.slot, t_ports.pnum, t_ports.ptyp, t_ports.psta, t_facs.fac, t_ckts.ckid ";
		$qry .= "FROM t_ports LEFT JOIN t_facs ON t_ports.fac_id = t_facs.id LEFT JOIN t_ckts ON t_ports.ckt_id = t_ckts.id";
		$qry .= " WHERE t_ports.pnum LIKE '%$pnum%%' AND t_ports.ptyp LIKE '%$ptyp%%' AND t_ports.node=" . $node;
		$qry .= " AND t_ports.slot LIKE '%$slot%%' AND t_ports.psta LIKE '%$psta%%'";
        
        $res = $db_ct100->query($qry);
        if (!$res) {
            $result["rslt"] = "fail";
            $result["reason"] = mysqli_error($db_ct100);
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
		mysqli_close($db_ct100);
		return $result;
	}


?>
