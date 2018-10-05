<?php /* coQueryAlm.php */
    $act = $_POST['act'];
    //$act="query";

	if ($act == "query") {
		queryAlm();
		return;
	}
	if ($act == "add") {
    // addAlm() is not being used here
	// 	addAlm();
		return;
	}
	else {
 		$result["rslt"] = "fail";
		$result["reason"] = "ACTION " . $act . " is under development or not supported";
		echo json_encode($result);
		return;
	}
	
	function queryAlm() {
		global $ack, $sa, $date, $sev, $cond;
		$db_ct100 = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
		if (mysqli_connect_errno())
		{
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_connect_error();
			echo json_encode($result);
			return;
		}

        if ( $ack == '')
                $qry = "select id, almid, ack,sa, date, time, src, type, cond, sev, psta, ssta,descr  FROM t_alms  where sa like '%$sa%%' and date like '%$date%%' and sev like '%$sev%%' and cond like '%$cond%%' "; 
        else if ( $sa == '') 
                $qry = "select id, almid, ack,sa, date, time, src, type, cond, sev, psta, ssta,descr  FROM t_alms  where ack like '%$ack%%' and date like '%$date%%' and sev like '%$sev%%' and cond like '%$cond%%' "; 
        else if ( $date == '')
                $qry = "select id, almid, ack,sa, date, time, src, type, cond, sev, psta, ssta,descr  FROM t_alms  where ack like '%$ack%%' and sa like '%$sa%%' and sev like '%$sev%%' and cond like '%$cond%%' "; 
        else if ( $sev == '')
                $qry = "select id, almid, ack,sa, date, time, src, type, cond, sev, psta, ssta,descr  FROM t_alms  where ack like '%$ack%%' and sa like '%$sa%%' and date like '%$date%%' and cond like '%$cond%%' "; 
        else if ( $cond == '')
                $qry = "select id, almid, ack,sa, date, time, src, type, cond, sev, psta, ssta,descr  FROM t_alms  where ack like '%$ack%%' and sa like '%$sa%%' and date like '%$date%%' and sev like '%$sev%%' "; 
        else
                $qry = "select id, almid, ack,sa, date, time, src, type, cond, sev, psta, ssta,descr  FROM t_alms  where ack like '%$ack%%' and sa like '%$sa%%' and date like '%$date%%' and sev like '%$sev%%' and cond like '%$cond%%' "; 
        
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
   
	function addAlm() {
		global $almid, $ack, $sa, $date, $time, $src, $type, $cond, $sev, $psta, $ssta, $descr;
		//$db_ct100 = mysqli_connect("localhost", "root", "Qaz!2345", "co5k");
		$db_ct100 = mysqli_connect("localhost", "ninh", "c0nsulta", "co5k");
		if (mysqli_connect_errno())
		{
			$result["rslt"] = "fail";
			$result["reason"] = mysqli_connect_error();
			echo json_encode($result);
			return;
		}

        /*
		$qry = "insert into t_alms values(0,'";
		if ($type != "") {
		  $qry .= $type  . "','";
		  if ($sa != "") {
		     $qry  .= $sa  . "','";
		     if ($src  != "") {
			$qry .= $src  . "','";
			if ($sev  != "") {
		           $qry .= $sev . "'";
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
		       } else { $result["rslt"] = "fail"; $result["reason"] = "Invalid src :" . $src ; }
		   } else { $result["rslt"] = "fail"; $result["reason"] = "Invalid sa :" . $sa; }
		} else { $result["rslt"] = "fail"; $result["reason"] = "Invalid type :" . $type;
		}
        */

		echo json_encode($result);
		mysqli_close($db_ct100);
	}
	
?>
