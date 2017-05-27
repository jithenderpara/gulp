$(document).ready(function () {

    $('#trackTableId').hide();
    $('#fromdate').datepicker();
    $('#todate').datepicker();

    $('#phaseType').on('change', function () {
        if ($(this).val() == "") {
            alert('Please select campaign');
            return false;
        }

        $('#trackTableId').show();
        getCampaignsListFunc($(this).val(), $('#fromdate').val(), $('#todate').val());

    });

    $('#getDetails').click(function () {
        var fromDate = $('#fromdate').val();
        var toDate = $('#todate').val();
        if ($('#phaseType').val() == "") {
            alert('Please select campaign');
            return false;
        }
        if (fromDate != "" && toDate != "") {
            $('#trackTableId').show();

            getCampaignsListFunc($('#phaseType').val(), fromDate, toDate);
        } else {
            alert('Please select dates');
        }
    });

    $('#Export').click(function (e) {
        e.preventDefault();
        var d = new Date();
        var randDate = d.getDate() + d.getTime();
        downloadExcelOpen("KarvyWealth-Report-2015-CampaignList-" + $('#phaseType').val() + "-" + randDate);
    });


});

function getCampaignsListFunc(phaseTypeVal, fromDate, toDate) {

    var getCampaignParams = { "InputStr": '19~' + fromDate + '~' + toDate + '~ ~' + phaseTypeVal + '' }
    var getCampaignCall = AjaxCall(getCampaignParams, "GetData", null);
    console.log(getCampaignCall);
    var campListdestroy = $('#trackTableId').dataTable();
    campListdestroy.fnDestroy();
    var data = JSON.parse(getCampaignCall);
    if (data.length <= 0) {
        $('#trackTableId tbody').html('<tr><td colspan="8">No Tracking List Found!!</td></tr>');
    } else {
        $('#trackTableId tbody').html('');
        var content = "";
        for (i = 0; i < data.length; i++) {

            // if(data[i]["Campaigns"]  == phaseTypeVal){

            content += '<tr><td>' + data[i]["ID"] + '</td><td>' + data[i]["Name"] + '</td><td>' + data[i]["EmailID"] + '</td>' +
                 '<td>' + data[i]["Location"] + '</td><td>' + data[i]["Mobile"] + '</td><td>' + data[i]["InterestedIn"] + '</td>' +
                 '<td>' + data[i]["LeadSource"] + '</td><td>' + data[i]["URL"] + '</td></tr>';
            //}//end of if condition
        }// end of forloop
        $('#trackTableId tbody').append(content);
        $('#trackTableId').DataTable({
            "order": [[3, "desc"]],
            "dom": '<"top"iflp<"clear">>rt<"bottom"iflp<"clear">>'
        });
        $('#trackTableId_filter,#trackTableId_info').hide();
        $('.bottom .dataTables_filter, .bottom .dataTables_length').hide();
    }

}

function downloadExcelOpen(filename) {

    var params = '{"Filename": "' + filename + '", "frmDate": "' + $('#fromdate').val() + '", "toDate": "' + $('#todate').val() + '", "phase": "", "campaign": "' + $('#phaseType').val() + '"}';
    console.log(JSON.stringify(params));
    $.ajax({
        type: "POST",
        url: "/Data/Sites/1/skins/karvywealth/ExportExcel.aspx/ExportToExcelForYourMoneyCantTalk",
        data: params,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(data.d);
            window.open("/Data/Sites/1/skins/karvywealth/OpenDownloadFiles.aspx?Id=" + data.d + "");
        },
        error: function (data) {
            console.log("error--file");
        }
    });
}