var reportsTable, activeModule = 'PROGRAM';

$(document).ready(function () {
    LoadTable(activeModule);
    
});

$('#linkProgram').click(function () {
    $('#perProgram_Reports').removeClass('hidden');
    $('#perDistrict_Reports').addClass('hidden');
    $('#perHealthCenter_Reports').addClass('hidden');
    $('#perPatient_Reports').addClass('hidden');
    activeModule = 'PROGRAM';
    $('#reportsTable').DataTable().clear().destroy();
    LoadTable(activeModule);
});

$('#linkDistrict').click(function () {
    $('#perProgram_Reports').addClass('hidden');
    $('#perDistrict_Reports').removeClass('hidden');
    $('#perHealthCenter_Reports').addClass('hidden');
    $('#perPatient_Reports').addClass('hidden');
    activeModule = 'DISTRICT';
    $('#reportsTable').DataTable().clear().destroy();
    LoadTable(activeModule);
});

$('#linkHealthCenter').click(function () {
    $('#perProgram_Reports').addClass('hidden');
    $('#perDistrict_Reports').addClass('hidden');
    $('#perHealthCenter_Reports').removeClass('hidden');
    $('#perPatient_Reports').addClass('hidden');
    activeModule = 'HEALTHCENTER';
    $('#reportsTable').DataTable().clear().destroy();
    LoadTable(activeModule);
});

$('#linkPatient').click(function () {
    $('#perProgram_Reports').addClass('hidden');
    $('#perDistrict_Reports').addClass('hidden');
    $('#perHealthCenter_Reports').addClass('hidden');
    $('#perPatient_Reports').removeClass('hidden');
    activeModule = 'PATIENT';
    $('#reportsTable').DataTable().clear().destroy();
    LoadTable(activeModule);
});

$('#linkForecast').click(function () {
    $('#perProgram_Reports').addClass('hidden');
    $('#perDistrict_Reports').addClass('hidden');
    $('#perHealthCenter_Reports').addClass('hidden');
    $('#perPatient_Reports').removeClass('hidden');
    $('#perForecast_Reports').removeClass('hidden');
    activeModule = 'FORECAST';
    $('#reportsTable').DataTable().clear().destroy();
    LoadTable(activeModule);
});


$('#btnDownload_Reports').click(function () {

    let _reports = {};
    _reports.Module = activeModule;
    _reports.Action = activeModule;

    $.ajax({
        url: 'PPMP_Reports.aspx/GetReportData',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ reports: _reports }),
        success: function (data) {
            let parseData = JSON.parse(data.d);

            if (parseData.length > 0) {
                var bytes = Base64ToBytes(parseData[1]);
                var blob = new Blob([bytes], { type: "application/octetstream" });
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob, 'PPMP_' + activeModule + '_Report.xlsx');
                } else {
                    showSweetAlert('success', 'Report Download', 'Successfully downloaded!');
                    var url = window.URL || window.webkitURL;
                    link = url.createObjectURL(blob);
                    var a = $("<a />");
                    a.attr("download", 'PPMP_' + activeModule + '_Report.xlsx');
                    a.attr("href", link);
                    $("body").append(a);
                    a[0].click();
                    $("body").remove(a);

                }
            }
        }
    });
});

function LoadTable(module) {

    let _reports = {};
    _reports.Action = module;

    RemoveHiddenCols(module);

    if (module == 'PROGRAM') {
        $.ajax({
            url: 'PPMP_Reports.aspx/GetReportList',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ reports: _reports }),
            success: function (data) {
                var result = JSON.parse(data.d);
                reportsTable = $('#reportsTable').DataTable({
                    "bDestroy": true,
                    data: result,
                    columns: [
                        {
                            "data": "LineItem"
                        },
                        {
                            "data": "ProgramTitle",
                        },
                        {
                            "data": "AccountTitle"
                        },
                        {
                            "data": "ItemName"
                        },
                        {
                            "data": "UnitOfIssue"
                        },
                        {
                            "data": "Qty"
                        },
                        {
                            "data": "Program"
                        },
                        {
                            "data": "Status"
                        }
                    ],
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                });
            }
        });
    } 
    if (module == 'DISTRICT') {
        $.ajax({
            url: 'PPMP_Reports.aspx/GetReportList',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ reports: _reports }),
            success: function (data) {
                var result = JSON.parse(data.d);
                reportsTable = $('#reportsTable').DataTable({
                    "bDestroy": true,
                    data: result,
                    columns: [
                        {
                            "data": "LineItem"
                        },
                        {
                            "data": "ProgramTitle",
                        },
                        {
                            "data": "AccountTitle"
                        },
                        {
                            "data": "ItemName"
                        },
                        {
                            "data": "UnitOfIssue"
                        },
                        {
                            "data": "Qty"
                        },
                        {
                            "data": "Program"
                        },
                        {
                            "data": "District"
                        },
                        {
                            "data": "Status"
                        }
                    ],
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                });
            }
        });
    }
    if (module == 'HEALTHCENTER') {
        $.ajax({
            url: 'PPMP_Reports.aspx/GetReportList',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ reports: _reports }),
            success: function (data) {
                var result = JSON.parse(data.d);
                reportsTable = $('#reportsTable').DataTable({
                    "bDestroy": true,
                    data: result,
                    columns: [
                        {
                            "data": "LineItem"
                        },
                        {
                            "data": "ItemName"
                        },
                        {
                            "data": "UnitOfIssue"
                        },
                        {
                            "data": "Qty"
                        },
                        {
                            "data": "District"
                        },
                        {
                            "data": "Barangay"
                        },
                        {
                            "data": "Status"
                        }
                    ],
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                });
            }
        });
    }
    if (module == 'PATIENT') {
        $.ajax({
            url: 'PPMP_Reports.aspx/GetReportList',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ reports: _reports }),
            success: function (data) {
                var result = JSON.parse(data.d);
                reportsTable = $('#reportsTable').DataTable({
                    "bDestroy": true,
                    data: result,
                    columns: [
                        {
                            "data": "LineItem"
                        },
                        {
                            "data": "Patient",
                        },
                        {
                            "data": "ItemName"
                        },
                        {
                            "data": "Qty"
                        },
                        {
                            "data": "Status"
                        }
                    ],
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                });
            }
        });
    }
    if (module == 'FORECAST') {
        $.ajax({
            url: 'PPMP_Reports.aspx/GetReportList',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ reports: _reports }),
            success: function (data) {
                var result = JSON.parse(data.d);
                reportsTable = $('#reportsTable').DataTable({
                    "bDestroy": true,
                    data: result,
                    columns: [
                        {
                            "data": "LineItem"
                        },
                        {
                            "data": "ItemName",
                        },
                        {
                            "data": "Year"
                        },
                        {
                            "data": "TotalQty"
                        },
                        {
                            "data": "AvgPerDay"
                        },
                        {
                            "data": "DaysRecorded"
                        },
                        {
                            "data": "Forecast"
                        }
                    ],
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                });
            }
        });
    }
}

function RemoveHiddenCols(module) {

    if (module == 'PROGRAM') {
        $('.program').removeClass('hidden');
        $('.district').addClass('hidden');
        $('.healthCenter').addClass('hidden');
        $('.patientRow').addClass('hidden');
        $('.forecastRow').addClass('hidden');
    }
    if (module == 'DISTRICT') {
        $('.program').addClass('hidden');
        $('.district').removeClass('hidden');
        $('.healthCenter').addClass('hidden');
        $('.patientRow').addClass('hidden');
        $('.forecastRow').addClass('hidden');
    }
    if (module == 'HEALTHCENTER') {
        $('.program').addClass('hidden');
        $('.district').addClass('hidden');
        $('.healthCenter').removeClass('hidden');
        $('.patientRow').addClass('hidden');
        $('.forecastRow').addClass('hidden');
    }
    if (module == 'PATIENT') {
        $('.program').addClass('hidden');
        $('.district').addClass('hidden');
        $('.healthCenter').addClass('hidden');
        $('.patientRow').removeClass('hidden');
        $('.forecastRow').addClass('hidden');
    }
    if(module == 'FORECAST') {
        $('.program').addClass('hidden');
        $('.district').addClass('hidden');
        $('.healthCenter').addClass('hidden');
        $('.patientRow').addClass('hidden');
        $('.forecastRow').removeClass('hidden');
    }
};

function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};