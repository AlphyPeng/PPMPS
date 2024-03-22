var allocationPerDistrictTable, data, activePPMPCode;

$(document).ready(function () {
    $('#rdPending_allocationPerDistrict').attr('checked', 'checked');
    _option = $('#rdPending_allocationPerDistrict').val();
    LoadPPMPCodes_allocationPerDistrict("READ_LIST_CODE", _option);
    LoadPPMPCodes_allocationPerDistrict("READ_DISTRICTLIST", _option);
});

$('input[type=radio][name=radio1]').change(function () {
    _option = this.value;
    LoadPPMPCodes_allocationPerDistrict("READ_LIST_CODE", this.value);
});

function LoadPPMPCodes_allocationPerDistrict(_paramAction) {
    $.ajax({
        url: 'PPMP_AllocationPerDistrict.aspx/GetPPMP_Codes',
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
                    $('#sidelistCode #ulSidelistCode').append('<li class="list-group-item"><a href="#" class="ppmpCodes_DistrictAllocation"><b>' + data[0] + '</b></a></li>')
                });
            }
            else if (_paramAction == "READ_DISTRICTLIST") {
                for (var i = 0; i < result.length; i++) {
                    array.push(result[i].DistrictId + ',' + result[i].DistrictName)
                }
                $('#selectDistrict').empty().append('<option selected hidden disabled>Select a District</option>');
                $.each(array, function (index, code) {
                    data = code.split(',');
                    $('#selectDistrict').append($('<option>', {
                        value: data[0],
                        text: data[1]
                    }));
                    $('#selectDistrictToAll').append($('<option>', {
                        value: data[0],
                        text: data[1]
                    }));             
                });
            }
        }
    });
}

$(document).on('click', '.ppmpCodes_DistrictAllocation', function () {
    let ppmpCode = $(this).text();
    InitAllocationHeaders_perDistrict(ppmpCode);
    activePPMPCode = ppmpCode;
});

function InitAllocationHeaders_perDistrict(ppmpCodes) {
    $.ajax({
        url: 'PPMP_AllocationPerDistrict.aspx/GetPPMP_Headers',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ ppmpCodes: ppmpCodes }),
        success: function (data) {
            var result = JSON.parse(data.d);
            if (result[0].Status == "Pending") {
                $('#btnPostAllocation_District').removeClass("disable-click");
                $('#btnAssignToAll_District').removeClass("disable-click");
            }
            else {
                $('#btnPostAllocation_District').addClass("disable-click");
                $('#btnAssignToAll_District').addClass("disable-click");
            }

            $('#PPMPCode_AllocPerDistict').val(result[0].PPMPCode);
            $('#ProgramTitle_AllocPerDistict').val(result[0].ProgramTitle);
            $('#AccountTitle_AllocPerDistict').val(result[0].AccountTitle);

            allocationPerDistrictTable = $('#procurementList_AllocationPerDistrict').DataTable({
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
                                return "<a href='#' id='btnEditAllocateDistrict' onclick=editAllocation_PerDistrict('" + data.Id + "');>" + data.ItemName + "</a>"
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
                        "data": "ProgramId",
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            if (data.DistrictId == '0') {
                                return '-';
                            }
                            else {
                                return data.DistrictId;
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
        }
    });
};

function editAllocation_PerDistrict() {

    $('#procurementList_AllocationPerDistrict').on('click', '#btnEditAllocateDistrict', function () {
        $('#medicineAllocationPerDistrictModal').modal('show');
        data = "";
        data = allocationPerDistrictTable.row($(this).closest('tr')).data();
        if (data.ProgramId != '-') {
            $('#selectDistrict option').filter(function () {
                return $(this).text() == data.DistrictId;
            }).attr('selected', true);
        }
        else {
            $('#selectDistrict').attr('selectedIndex', 0);
        }

        $('#spnPrescriptionName').text(data.ItemName);
        $('#spnUnitOfIssue').text(data.UnitOfIssue);
        $('#spnQuantity').text(data.Qty);
        $('#spnProgram').text(data.ProgramId);

    });

};

$('#closemedicineAllocationPerDistrictModal').click(function () {
    $('#medicineAllocationPerDistrictModal').modal('hide');
});


$('#btnSaveDistrictAllocation').click(function () {

    let _allocPerDistrict = {};
    _allocPerDistrict.Action = 'ALLOCATE';
    _allocPerDistrict.LineItem = data.LineItem;
    _allocPerDistrict.PPMPCode = data.PPMPCode;
    _allocPerDistrict.ItemName = data.ItemName;
    _allocPerDistrict.Program = data.Program;
    _allocPerDistrict.DistrictId = $('#selectDistrict').val();
    sweetAlertConfirmation('Are you sure you want to assign this district?', '', 'question', 'Yes assigned it!', 'Data successfully assigned', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_AllocationPerDistrict.aspx/AllocateorApproveDistrict',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ allocationPerDistrict: _allocPerDistrict }),
                success: function (data) {
                    $('#medicineAllocationPerDistrictModal').modal('hide');
                    showSweetAlert('success', 'District Allocation', 'Successfully allocated!');
                    InitAllocationHeaders_perDistrict(activePPMPCode);
                }
            });
        }
    })
    
});

$('#btnPostAllocation_District').click(function () {
    if (_option == 'Pending') {
        let _allocPerDistrict = {};
        _allocPerDistrict.Action = 'APPROVE_CODE';
        _allocPerDistrict.PPMPCode = activePPMPCode;
        sweetAlertConfirmation('Are you sure you want to post this record?', '', 'question', 'Yes post it!', 'Data successfully posted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_AllocationPerDistrict.aspx/AllocateorApproveDistrict',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ allocationPerDistrict: _allocPerDistrict }),
                    success: function (data) {
                        showSweetAlert('success', 'District Allocation Approval', 'Successfully approved!');
                        RefreshValues_District();
                    }
                });
            }
        })
    }
});

$('#btnAssignToAll_District').on('click', function () {
    $('#allocateAllModal_District').modal('show');
});


$('#closedistrictAllocationModal').on('click', function () {
    $('#allocateAllModal_District').modal('hide');
});

$('#btnSaveAllocationToAll').on('click', function () {

    let _allocPerDistrict = {};
    _allocPerDistrict.Action = 'ALLOCATE_ALL';
    _allocPerDistrict.PPMPCode = $('#PPMPCode_AllocPerDistict').val();
    _allocPerDistrict.DistrictId = $('#selectDistrictToAll').val();

    activePPMPCode = $('#PPMPCode_AllocPerDistict').val();
    sweetAlertConfirmation('Are you sure you want to assign this program?', '', 'question', 'Yes, assign it!', 'Data successfully assigned', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_AllocationPerDistrict.aspx/AllocateorApproveDistrict',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ allocationPerDistrict: _allocPerDistrict }),
                success: function (data) {
                    $('#allocateAllModal_District').modal('hide');
                    showSweetAlert('success', 'Medicine Allocation', 'Successfully allocated!');
                    InitAllocationHeaders_perDistrict(activePPMPCode);
                }
            });
        }
    })
});


$("#searchPPMPCode_perDistrict").on("keyup", function () {
    var value = this.value.toLowerCase().trim();
    $("#ulSidelistCode li").show().filter(function () {
        return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
});

function RefreshValues_District() {
    LoadPPMPCodes_allocationPerDistrict("READ_LIST_CODE", _option);
    $('#procurementList_AllocationPerDistrict tbody tr').remove();
    $('#procurementList_AllocationPerDistrict_info').remove();
    $('#procurementList_AllocationPerDistrict_paginate').remove();
    $('#PPMPCode_AllocPerDistict').val('');
    $('#ProgramTitle_AllocPerDistict').val('');
    $('#AccountTitle_AllocPerDistict').val('');
    $('#btnPostAllocation_District').addClass("disable-click");
    $('#btnAssignToAll_District').addClass("disable-click");
};


// Print 
$("#printButton").click(function () {

    window.print();
});

//aw
