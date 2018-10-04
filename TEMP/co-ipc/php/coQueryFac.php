<?php /* coQueryFac.php */
    // asfsdf
    $act = $_POST['act'];
    $fac = $_POST['fac'];
    $ftyp = $_POST['ftyp'];
    $ort = $_POST['ort'];
    $spcfnc = $_POST['spcfnc'];

	if ($act == "query") {
		queryFac();
		return;
	}
	if ($act == "add") {
		addFac();
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}
	
	function queryFac() {
		global $act, $fac, $ftyp, $ort, $spcnfc;
		//$db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
		$db_ct100 = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
		if (mysqli_connect_errno())
		{
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_connect_error();
			echo json_encode($result);
			return;
		}
         
        
        $qry = "select id, fac, ftyp, ort, spcfnc, port from t_facs where fac like '%$fac%%' and ftyp like '%$ftyp%%' and ort like '%$ort%%' and spcfnc like '%$spcfnc%%'"; 
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
		echo json_encode($result);
		mysqli_close($db_ct100);
	}
   
	function addFac() {
		global $act, $fac, $ftyp, $ort, $spcnfc;
		//$db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
		$db_ct100 = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
		if (mysqli_connect_errno())
		{
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_connect_error();
			echo json_encode($result);
			return;
		}
		$qry = "insert into t_facs values(0,'";
		if ($fac != "") {
			$qry .= $fac . "','";
			if ($ftyp != "") {
				$qry .= $ftyp . "','";
				if ($ort != "") {
					$qry .= $ort . "','";
					if ($spcfnc != "") {
						$qry .= $spcfnc . "'";
					}
					else {
						$qry .= "'";
					}
					$qry .= ",'',0)";
					$res = $db_ct100->query($qry);
					if (!$res) {
						$result["rslt"] = "fail";
						$result["reason"] = mysqli_error($db_ct100);
					}
					else {
						$qry = "select * FROM t_facs";
						$res = $db_ct100->query($qry);
						if (!$res) {
							$result["rslt"] = "fail";
							$result["reason"] = mysqli_error($db_ct100);
						}
						else {
							$rows = [];
							if ($res->num_rows > 0) {
								while ($row = $res->fetch_assoc()) {
									$rows[] = $row;
								}
								$result["rslt"] = "success";
								$result["rows"] = $rows;
							}
						}
					}
				}
				else {
					$result["rslt"] = "fail";
					$result["reason"] = "Invalid ORT:" . $ort;
				}
			}
			else {
				$result["rslt"] = "fail";
				$result["reason"] = "Invalid FTYP:" . $ftyp;
			}
		}
		else {
			$result["rslt"] = "fail";
			$result["reason"] = "Invalid FAC:" . $fac;
		}
		echo json_encode($result);
		mysqli_close($db_ct100);
	}
	
?>
