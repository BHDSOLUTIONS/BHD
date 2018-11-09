var fac_table;
var fac_tableIndex;
var fac_maxTableIndex;

// ----------------------Click Events--------------------------------------------

$(document).on("click", "#fac_tbl tr", function() {
  var dataRow = $(this)
    .children("td")
    .map(function() {
      return $(this).text();
    })
    .get();

  //Populate the information
  $("#fac_id_num").val(dataRow[0]);
  $("#fac_fac_txt").val(dataRow[1]);
  $("#fac_ftyp_sel").val(dataRow[2]);
  $("#fac_ort_sel").val(dataRow[3]);
  $("#fac_spcfnc_sel").val(dataRow[4]);
  $("#fac_portInfor_txt").val(dataRow[5]);

  //Add color to the row
  $(this).addClass("addColor"); //add class selected to current clicked row
  $(this).siblings().removeClass("addColor"); //remove class selected from rest of the rows
});

$("#fac_next").click(function() {
  if (fac_tableIndex < fac_maxTableIndex) {
    fac_tableIndex++;
    facDisplayTable(fac_tableIndex);
  }
});

$("#fac_previous").click(function() {
  if (fac_tableIndex > 1) {
    fac_tableIndex--;
    facDisplayTable(fac_tableIndex);
  }
});

$("#fac_clear_btn").click(facClearForm);

$("#fac_findFac_btn").click(function() {
  facQuery("findFac");
});

$("#fac_findFOS_btn").click(function() {
  facQuery("findFOS");
});

$(document).on("mouseup", "[id = fac_act_sel]", function() {
  if ($("#fac_act_sel").val() == "UPDATE") {
    if ($("#fac_id_num").val() != "") {
      facModalClearForm();
      facPopulateModal();

      $("#facModal_fac_txt").prop("disabled", false);
      $("#facModal_ftyp_sel").prop("disabled", false);
      $("#facModal_ort_sel").prop("disabled", false);
      $("#facModal_spcfnc_sel").prop("disabled", false);
      $("#facModal_clear_btn").prop("disabled", false);
      $("#facModal_range_show").hide();
      $("#facModal_clear_btn").show();
      $("#facModal").modal();
    } 
    else {
      alert("Please select a FAC from the LIST OF FACILITIES");
    }
  } 
  else if ($("#fac_act_sel").val() == "DELETE") {
    if ($("#fac_id_num").val() != "") {
      facModalClearForm();
      facPopulateModal();

      $("#facModal_fac_txt").prop("disabled", true);
      $("#facModal_ftyp_sel").prop("disabled", true);
      $("#facModal_ort_sel").prop("disabled", true);
      $("#facModal_spcfnc_sel").prop("disabled", true);
      $("#facModal_range_show").hide();
      $("#facModal_clear_btn").hide();
      $("#facModal").modal();
    } 
    else {
      alert("Please select a FAC from the LIST OF FACILITIES");
    }
  } 
  else if ($("#fac_act_sel").val() == "ADD") {
    facModalClearForm();
    $("#facModal_act_txt").val($("#fac_act_sel").val());
    $("#facModal_fac_txt").prop("disabled", false);
    $("#facModal_ftyp_sel").prop("disabled", false);
    $("#facModal_ort_sel").prop("disabled", false);
    $("#facModal_spcfnc_sel").prop("disabled", false);
    $("#facModal_range_show").show();
    $("#facModal_clear_btn").show();
    $("#facModal").modal();
  }
});

// -----------------------------Functions----------------------------

function facClearTable() {
  $("#fac_tbl").empty();
}

function facQuery(action) {
  $.post(
    "./php/coQueryFac.php",
    {
      act:    action,
      user:   $("#main_currentUser").text(),
      fac_id: $("#fac_id_num").val(),
      fac:    $("#fac_fac_txt").val(),
      ftyp:   $("#fac_ftyp_sel").val(),
      ort:    $("#fac_ort_sel").val(),
      spcfnc: $("#fac_spcfnc_sel").val()
    },
    function(data, status) {
      var obj = JSON.parse(data);
      if (obj["rslt"] == "fail") {
        alert(obj["reason"]);
      } 
      else {
        if (obj["rows"].length == 0) {
          if (action != "query") {
            alert("No Record Found");
            return;
          }
        }
        fac_tableIndex = 0;
        fac_table = obj["rows"];
        var len = fac_table.length;
        fac_maxTableIndex = Math.ceil(len / 100.0);
        fac_tableIndex++;
        facDisplayTable(fac_tableIndex);
      }
    }
  );
}

function facDisplayTable(index) {
  var startIndex = (index - 1) * 100;
  var stopIndex = index * 100;
  var len = fac_table.length;

  if (len >= startIndex) {
    if (len < stopIndex) {
      stopIndex = len;
    }
    facClearTable();
    var a = [];
    for (var i = 0; i < stopIndex; i++) {
      a.push('<tr> <td style="display:none">' + fac_table[i].id + "</td>");
      a.push('<td style="width:40%">' + fac_table[i].fac + "</td>");
      a.push('<td style="width:10%">' + fac_table[i].ftyp + "</td>");
      a.push('<td style="width:10%">' + fac_table[i].ort + "</td>");
      a.push('<td style="width:17%">' + fac_table[i].spcfnc + "</td>");
      a.push('<td style="width:20%">' + fac_table[i].port + "</td></tr>");
    }
    document.getElementById("fac_tbl").innerHTML = a.join("");
    $("#fac_index_lbl").text("From " + (startIndex + 1) + " to " + stopIndex);
  }
}

function facClearForm() {
  $("#fac_id_num").val("");
  $("#fac_fac_txt").val("");
  $("#fac_ftyp_sel").val("");
  $("#fac_ort_sel").val("");
  $("#fac_spcfnc_sel").val("");
  $("#fac_portInfor_txt").val("");
  $("#fac_act_sel").val("");
  $("#facCheckInputs").text("");
}

function facPopulateModal() {
  $("#facModal_fac_txt").val($("#fac_fac_txt").val());
  $("#facModal_ftyp_sel").val($("#fac_ftyp_sel").val());
  $("#facModal_ort_sel").val($("#fac_ort_sel").val());
  $("#facModal_spcfnc_sel").val($("#fac_spcfnc_sel").val());
  $("#facModal_portInfor_txt").val($("#fac_portInfor_txt").val());
  $("#facModal_act_txt").val($("#fac_act_sel").val());
}

function facCheckInputs() {
  if ($("#fac_fac_txt").val() != "" && $("#fac_ftyp_sel").val() != "") {
    return true;
  } 
  else {
    return false;
  }
}
