var allocationPerHealthCenterTable, data, activePPMPCode;


$(document).ready(function () {
    $('#rdPending_allocationPerHealthCenter').attr('checked', 'checked');
    _option = $('#rdPending_allocationPerHealthCenter').val();
    LoadPPMPCodest("READ_LIST_CODE", _option);
});

$("#searchPPMPCode_allocationPerHealthCenter").on("keyup", function () {
    var value = this.value.toLowerCase().trim();
    $("#ulSidelistCode li").show().filter(function () {
        return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
});

$('input[type=radio][name=radio1]').change(function () {
    _option = this.value;
    LoadPPMPCodest("READ_LIST_CODE", this.value);
});

function LoadPPMPCodest(_paramAction) {
  

    var _UserName = '<%= Session["UserName"] %>';
    $.ajax({
        url: 'PPMP_AllocationPerHealthCenter.aspx/GetPPMP_Codes',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ paramAction: _paramAction, paramOption: _option, UserName: _UserName }),
        success: function (data) {
            var result = JSON.parse(data.d);
            let array = [];

                for (var i = 0; i < result.length; i++) {
                    array.push(result[i].PpmpCode)
                }

                $('#sidelistCode #ulSidelistCode li').remove();
                $.each(array, function (index, code) {
                    var data = code.split(',');
                    $('#sidelistCode #ulSidelistCode').append('<li class="list-group-item"><a href="#" class="ppmpCodes_HealthCenterAllocation"><b>' + data[0] + '</b></a></li>')
                });
           
        }
    });
}


$(document).on('click', '.ppmpCodes_HealthCenterAllocation', function () {
    let ppmpCode = $(this).text();
    InitAllocationHeaders_perHealthCenter(ppmpCode);
    activePPMPCode = ppmpCode;
});


function InitAllocationHeaders_perHealthCenter(ppmpCodes) {
    $.ajax({
        url: 'PPMP_AllocationPerHealthCenter.aspx/GetPPMP_Headers',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ ppmpCodes: ppmpCodes }),
        success: function (data) {
            var result = JSON.parse(data.d);
            if (result[0].Status == "Pending") {
                $('#btnPostAllocation_HealthCenter').removeClass("disable-click");
            } else {
                $('#btnPostAllocation_HealthCenter').addClass("disable-click");
            }

            $('#PPMPCode_AllocPerHealthCenter').val(result[0].PpmpCode);
            $('#ProgramTitle_AllocPerHealthCenter').val(result[0].ProgramTitle);
            $('#AccountTitle_AllocPerHealthCenter').val(result[0].AccountTitle);

            allocationPerHealthCenterTable = $('#HealthCenterAllocationList').DataTable({
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
                        "data": "Qty",
                    },
                    {
                        "data": "HealthCenter",
                    },
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
};

$('#btnPostAllocation_HealthCenter').click(function () {
    let PpmpCode = $('#PPMPCode_AllocPerHealthCenter').val();
    sweetAlertConfirmation('Are you sure you want to post this record?', '', 'question', 'Yes post it!', 'Data successfully posted', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_AllocationPerHealthCenter.aspx/AllocateHealthCenter',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ PpmpCode: PpmpCode }),
                success: function () {
                    $('#programModal').modal('hide');
                    showSweetAlert('success', 'Health Center', 'Successfully Approve!');
                    RefreshValues_HealthCenter();
                }
            })
        }
    })
});

function RefreshValues_HealthCenter() {
    LoadPPMPCodest("READ_LIST_CODE", _option);
    $('#HealthCenterAllocationList tbody tr').remove();
    $('#HealthCenterAllocationList_info').remove();
    $('#HealthCenterAllocationList_paginate').remove();
    $('#PPMPCode_AllocPerHealthCenter').val('');
    $('#ProgramTitle_AllocPerHealthCenter').val('');
    $('#AccountTitle_AllocPerHealthCenter').val('');
    $('#btnPostAllocation_HealthCenter').addClass("disable-click");
};