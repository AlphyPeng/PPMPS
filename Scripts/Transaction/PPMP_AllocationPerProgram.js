var allocationPerProgramTable, data;

$(document).ready(function () {
    $('#rdPending_allocationPerProgram').attr('checked', 'checked');
    _option = $('#rdPending_allocationPerProgram').val();
    LoadPPMPCodes_allocationPerProgram("READ_LIST_CODE", _option);
    LoadPPMPCodes_allocationPerProgram("READ_PROGRAMLIST", _option);
});

$('input[type=radio][name=radio1]').change(function () {
    _option = this.value;
    LoadPPMPCodes_allocationPerProgram("READ_LIST_CODE", this.value);
});


function LoadPPMPCodes_allocationPerProgram(_paramAction) {
    $.ajax({
        url: 'PPMP_AllocationPerProgram.aspx/GetPPMP_Codes',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ paramAction: _paramAction, paramOption: _option }),
        success: function (data) {
            var result = JSON.parse(data.d);
            let array = [];

            if (_paramAction == "READ_LIST_CODE") {
                for (var i = 0; i < result.length; i++) {
                    array.push(result[i].PPMPCode)
                }

                $('#sidelistCode #ulSidelistCode li').remove();
                $.each(array, function (index, code) {
                    var data = code.split(',');
                    $('#sidelistCode #ulSidelistCode').append('<li class="list-group-item"><a href="#" class="ppmpCodes_ProgramAllocation"><b>' + data[0] + '</b></a></li>')
                });
            }
            else if (_paramAction == "READ_PROGRAMLIST") {
                for (var i = 0; i < result.length; i++) {
                    array.push(result[i].ProgramId + ',' + result[i].ProgramTitle)
                }
                $('#selectProgram').empty().append('<option selected hidden disabled>Select a Program</option>');
                $.each(array, function (index, code) {
                    var data = code.split(',');
                    $('#selectProgram').append($('<option>', {
                        value: data[0],
                        text: data[1]
                    }));
                    $('#selectProgramToAll').append($('<option>', {
                        value: data[0],
                        text: data[1]
                    }));             
                });
            }
        }
    });
}

$(document).on('click', '.ppmpCodes_ProgramAllocation', function () {
    let ppmpCode = $(this).text();
    InitAllocationHeaders(ppmpCode);
});

function InitAllocationHeaders(ppmpCodes) {
    $.ajax({
        url: 'PPMP_AllocationPerProgram.aspx/GetPPMP_Headers',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ ppmpCodes: ppmpCodes }),
        success: function (data) {
            var result = JSON.parse(data.d);
            if (result[0].Status == "Pending") {
                $('#btnPostAllocation_Program').removeClass("disable-click");
                $('#btnAssignToAll_Program').removeClass("disable-click");

            }
            else {
                $('#btnPostAllocation_Program').addClass("disable-click");
                $('#btnAssignToAll_Program').addClass("disable-click");
            }

            $('#PPMPCode_AllocationPerProgram').val(result[0].PPMPCode);
            $('#ProgramTitle_AllocationPerProgram').val(result[0].ProgramTitle);
            $('#AccountTitle_AllocationPerProgram').val(result[0].AccountTitle);

            allocationPerProgramTable = $('#procurementList_AllocationPerProgram').DataTable({
                "bDestroy": true,
                data: result,
                columns: [
                    {
                        "data": "LineItem"
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            if (data.Status == 'Approved') {
                                return data.ItemName
                            }
                            else {
                                return "<a href='#' id='btnEditAllocateProgram' onclick=editAllocation('" + data.Id + "');>" + data.ItemName + "</a>"
                            }
                        }
                    },
                    {
                        "data": "UnitOfIssue"
                    },
                    {
                        "data": "Qty",
                    },
                    {
                        "data": "UnitCost",
                    },
                    {
                        "data": "Amount",
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            if (data.ProgramId == '0') {
                                return '-';
                            }
                            else {
                                return data.ProgramId;
                            }
                        }
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

            GetTotals(result[0].PPMPCode);

        }
    });
};

function editAllocation() {
    $('#procurementList_AllocationPerProgram').on('click', '#btnEditAllocateProgram', function () {
        $('#medicineAllocationPerProgramModal').modal('show');
        data = "";
        data = allocationPerProgramTable.row($(this).closest('tr')).data();
        if (data.ProgramId != '-') {
            $('#selectProgram option').filter(function () {
                return $(this).text() == data.ProgramId;
            }).attr('selected', true);
        }
        else {
            $('#selectProgram').attr('selectedIndex', 0);
        }
        $('#spnPrescriptionName').text(data.ItemName);
        $('#spnUnitOfIssue').text(data.UnitOfIssue);
        $('#spnQuantity').text(data.Qty);
    });
};

$('#closeprogramAllocationModal').click(function () {
    $('#medicineAllocationPerProgramModal').modal('hide');
});

$('#btnSaveMedicineAllocation').click(function () {

    let _allocPerProgram = {};
    _allocPerProgram.Action = 'ALLOCATE';
    _allocPerProgram.LineItem = data.LineItem;
    _allocPerProgram.PPMPCode = data.PPMPCode;
    _allocPerProgram.ItemName = data.ItemName;
    _allocPerProgram.ProgramId = $('#selectProgram').val();

    let activePPMPCode = data.PPMPCode;
    sweetAlertConfirmation('Are you sure you want to assign this program?', '', 'question', 'Yes assigned it!', 'Data successfully assigned', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_AllocationPerProgram.aspx/AllocateorApproveProcurement',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ allocationPerProgram: _allocPerProgram }),
                success: function (data) {
                    $('#medicineAllocationPerProgramModal').modal('hide');
                    showSweetAlert('success', 'Medicine Allocation', 'Successfully allocated!');
                    InitAllocationHeaders(activePPMPCode);
                }
            });
        }
    })
});

$('#btnPostAllocation_Program').click(function () {
    if (_option == 'Pending') {
        let _allocPerProgram = {};
        _allocPerProgram.Action = 'APPROVE_CODE';
        _allocPerProgram.PPMPCode = $('#PPMPCode_AllocationPerProgram').val();
        sweetAlertConfirmation('Are you sure you want to post this record?', '', 'question', 'Yes post it!', 'Data successfully posted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_AllocationPerProgram.aspx/AllocateorApproveProcurement',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ allocationPerProgram: _allocPerProgram }),
                    success: function (data) {
                        showSweetAlert('success', 'Procurement Approval', 'Successfully approved!');
                        RefreshValues_Program();
                    }
                });
            }
        })
    }
});


$('#btnAssignToAll_Program').on('click', function () {
    $('#allocateAllModal_Program').modal('show');
});


$('#closeprogramAllocationModal').on('click', function () {
    $('#allocateAllModal_Program').modal('hide');
});

$('#btnSaveAllocationToAll').on('click', function () {

    let _allocPerProgram = {};
    _allocPerProgram.Action = 'ALLOCATE_ALL';
    _allocPerProgram.PPMPCode = $('#PPMPCode_AllocationPerProgram').val();
    _allocPerProgram.ProgramId = $('#selectProgramToAll').val();

    let activePPMPCode = _allocPerProgram.PPMPCode;
    sweetAlertConfirmation('Are you sure you want to assign this program?', '', 'question', 'Yes, assign it!', 'Data successfully assigned', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_AllocationPerProgram.aspx/AllocateorApproveProcurement',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ allocationPerProgram: _allocPerProgram }),
                success: function (data) {
                    $('#allocateAllModal_Program').modal('hide');
                    showSweetAlert('success', 'Medicine Allocation', 'Successfully allocated!');
                    InitAllocationHeaders(activePPMPCode);
                }
            });
        }
    })
});

function GetTotals(code) {
    $.ajax({
        url: 'PPMP_AllocationPerProgram.aspx/GetTotals_AllocationPerProgram',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ code: code }),
        success: function (data) {
            var result = JSON.parse(data.d);
            $('#totalUnitCost_AllocPerProg').text(result[0].TotalUnitCost);
            $('#totalAmount_AllocPerProg').text(result[0].TotalAmount);
            $('#totalqty_AllocPerProg').text(result[0].Total);
        }
    });
}

$("#searchPPMPCode_perProgram").on("keyup", function () {
    var value = this.value.toLowerCase().trim();
    $("#ulSidelistCode li").show().filter(function () {
        return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
});

function RefreshValues_Program() {
    LoadPPMPCodes_allocationPerProgram("READ_LIST_CODE", _option);
    $('#procurementList_AllocationPerProgram tbody tr').remove();
    $('#procurementList_AllocationPerProgram_info').remove();
    $('#procurementList_AllocationPerProgram_paginate').remove();
    $('#totalUnitCost_AllocPerProg').text('');
    $('#totalAmount_AllocPerProg').text('');
    $('#totalqty_AllocPerProg').text('');
    $('#PPMPCode_AllocationPerProgram').val('');
    $('#ProgramTitle_AllocationPerProgram').val('');
    $('#AccountTitle_AllocationPerProgram').val('');
    $('#btnPostAllocation_Program').addClass("disable-click");
    $('#btnAssignToAll_Program').addClass("disable-click");
};

// Print 
$("#printButton").click(function () {

    window.print();
});


