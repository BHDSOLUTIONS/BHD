// ----------------FACMODAL---------------------------------------------

$("#facModal").on("hidden.bs.modal", facClearForm);

// ---------------Click Events-------------------------

$("#facModal_submit_btn").click(function() {
  facModalQueryFac($("#facModal_act_txt").val());
});

// -----------------Function-------------------------

function facModalClearForm() {
  $("#facModal_fac_txt").val("").change();
  $("#facModal_ftyp_sel").val("").change();
  $("#facModal_ort_sel").val("").change();
  $("#facModal_spcfnc_sel").val("").change();
  $("#facModal_portInfor_txt").val("").change();
  $("#facModal_result_lbl").text("");
  $("#facModal_range_sel").val("");
}
$("#facModal_clear_btn").click(facModalClearForm);

function facModalQueryFac(action) {
  $.post(
    "./php/coQueryFac.php",
    {
      act:    action,
      user:   $("#main_currentUser").text(),
      port:   $("#facModal_portInfor_txt").val(),
      fac_id: $("#fac_id").val(),
      fac:    $("#facModal_fac_txt").val(),
      ftyp:   $("#facModal_ftyp_sel").val(),
      ort:    $("#facModal_ort_sel").val(),
      spcfnc: $("#facModal_spcfnc_sel").val(),
      range:  $("#facModal_range_sel").val()
    },
    function(data, status) {
      var obj = JSON.parse(data);
      if (obj["rslt"] == "fail") {
        alert(obj["reason"]);
      } 
      else {
        fac_tableIndex = 0;
        fac_table = obj["rows"];
        var len = fac_table.length;
        fac_maxTableIndex = Math.ceil(len / 100.0);
        fac_tableIndex++;
        facDisplayTable(fac_tableIndex);
        $("#facModal_result_lbl").text(obj["rslt"]);
      }
    }
  );
}
