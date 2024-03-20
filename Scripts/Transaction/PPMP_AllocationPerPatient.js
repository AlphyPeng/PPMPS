var xpatientList;
var xmedicineList;
var action;
window.patientId;
window.itemId;
window.xstatus;

$(document).ready(function () {
    $('#rdPending_allocationPerPatient').attr('checked', 'checked');
    InitializeTransactionCode($('#rdPending_allocationPerPatient').val())
    $('#remarks').attr("disabled", true);
    $('#txtdistrictId').val(0);
    $('#txtbrgyId').val(0);
    $('#postPatient').addClass("disable-click");
    $('#editPatient').addClass("disable-click");
    $('#cancelPatient').addClass("disable-click");
    $('#savePatient').addClass("disable-click");
    $('#AddMedicine').addClass("disable-click");

});
$('input[type=radio][name=radio1]').change(function () {
    InitializeTransactionCode(this.value);
});


$('#AddMedicine').click(function () {
    GetMedicineDropDown();
    $('#remarks').attr("disabled", false);
    $('#MedicineModal').modal('show');

})

$('#addPatient').click(function () {
    action = "Add";
    InitializePatientDetails();
    $('#xPatientModal').modal('show');
})


function InitializePatientDetails() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_AllocationPerPatient.aspx/GetPatientsList',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: '{}',
        success: function (data) {
            var result = JSON.parse(data.d);
            xpatientList = $('#xpatientList').DataTable({
                select: true,
                "bDestroy": true,
                data: result,
                columns: [
                    {
                        "data": "FullName"
                    },
                    {
                        "data": "DistrictName",
                    },
                    {
                        "data": "BarangayName",
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='selectPatientId' onclick=OnSelectPatient('" + row.Id + "');><i class='fa fa-check'></i></a>" 
                        },
                        "orderable": false
                    }
                ],
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true,
            });
        }
    });
}

function OnSelectPatient() {
    $('#xpatientList').on('click', '#selectPatientId', function () {
        let data;
        data = xpatientList.row($(this).closest('tr')).data();
        $('#fullName').val(data.FullName);
        $('#contactNo').val(data.ContactNo);
        $('#address').val(data.Address);
        window.patientId = data.Id;
        $('#txtdistrictId').val(data.DistrictId);
        $('#txtbrgyId').val(data.BarangayId);
        window.xstatus = data.Status;
        $.ajax({
            url: 'PPMP_AllocationPerPatient.aspx/GetNextTransactionCode',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: '{}',
            success: function (data) {
                var result = JSON.parse(data.d);
                $('#transactionCode').val(result);
                $('#postPatient').removeClass("disable-click");
                $('#editPatient').removeClass("disable-click");
                $('#cancelPatient').removeClass("disable-click");
                $('#savePatient').removeClass("disable-click");
                $('#AddMedicine').removeClass("disable-click");
                $('#remarks').attr("disabled", false);
                $('#remarks').val("");
                InitializeMedicineDetails("");
            }
        });
        $('#xPatientModal').modal('hide');
    })
}

$('#savePatient').click(function () {

    let transactionCode = $('#transactionCode').val();
    let patientId = window.patientId;
    let remarks = $('#remarks').val();

    let _patient = {};
    _patient.TransactionCode = transactionCode;
    _patient.PatientId = patientId;
    _patient.Remarks = remarks;
    
    if (action == "Add") {
        _patient.Action = "CreatePatientHeader";
        $.ajax({
            url: 'PPMP_AllocationPerPatient.aspx/AddOrEditPatientHeader',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ patients: _patient }),
            success: function (data) {
                window.xstatus = "Pending";
                showSweetAlert('success', 'Patient successfully saved');
            }
        });
    } else {
        _patient.Action = "UpdatePatientHeader";
        $.ajax({
            url: 'PPMP_AllocationPerPatient.aspx/AddOrEditPatientHeader',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ patients: _patient }),
            success: function (data) {
                showSweetAlert('success', 'Patient successfully updated');
            }
        });
    }
})

function InitializeTransactionCode(options) {
    $.ajax({
        url: 'PPMP_AllocationPerPatient.aspx/GetTransactionCodes',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ options: options }),
        success: function (data) {
            var result = JSON.parse(data.d);
            let array = [];

            for (var i = 0; i < result.length; i++) {
                array.push(result[i].TransactionCode)
            }

            $('#sidelistCode #ulSidelistCode li').remove();
            $.each(array, function (index, code) {
                var data = code.split(',');
                $('#sidelistCode #ulSidelistCode').append('<li class="list-group-item"><a href="#" class="transactionList"><b>' + data[0] + '</b></a></li>')
            });
        }
    });
}

$(document).on('click', '.transactionList', function () {
    let code = $(this).text();
    InitializeTransactionHeaders(code);
});

function InitializeTransactionHeaders(code) {
    $.ajax({
        url: 'PPMP_AllocationPerPatient.aspx/GetPatientByTransactionCode',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ transactionCode: code }),
        success: function (data) {
            var result = JSON.parse(data.d);
            if (result[0].Status == "Pending") {
                $('#btnPostAllocation_Program').removeClass("disable-click");
            } else {
                $('#btnPostAllocation_Program').addClass("disable-click");
            }

            $('#fullName').val(result[0].FullName);
            $('#contactNo').val(result[0].ContactNo);
            $('#address').val(result[0].Address);
            $('#transactionCode').val(result[0].TransactionCode);
            $('#remarks').val(result[0].Remarks);
            window.patientId = result[0].PatientId;
            $('#txtdistrictId').val(result[0].DistrictId);
            $('#txtbrgyId').val(result[0].BarangayId);
            InitializeMedicineDetails(result[0].TransactionCode);
            $('#remarks').attr("disabled", true);
            window.xstatus = result[0].Status;

            if (result[0].Status == "Approved") {
                $('#postPatient').addClass("disable-click");
                $('#editPatient').addClass("disable-click");
                $('#cancelPatient').addClass("disable-click");
                $('#savePatient').addClass("disable-click");
                $('#AddMedicine').addClass("disable-click");
            } else if (result[0].Status == "Pending") {
                $('#postPatient').removeClass("disable-click");
                $('#editPatient').removeClass("disable-click");
                $('#cancelPatient').removeClass("disable-click");
                $('#savePatient').removeClass("disable-click");
                $('#AddMedicine').removeClass("disable-click");
            } else if (result[0].Status == "Cancelled") {
                $('#postPatient').addClass("disable-click");
                $('#editPatient').addClass("disable-click");
                $('#cancelPatient').addClass("disable-click");
                $('#savePatient').addClass("disable-click");
                $('#AddMedicine').addClass("disable-click");
            }
        }
    });
};


function InitializeMedicineDetails(transactionCode) {
    $.ajax({
        url: 'PPMP_AllocationPerPatient.aspx/GetMedicineDetails',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ transactionCode: transactionCode }),
        success: function (data) {
            var result = JSON.parse(data.d);

            xmedicineList = $('#xMedicineList').DataTable({
                select: true,
                "bDestroy": true,
                data: result,
                columns: [
                    {
                        "data": "MedicineName"
                    },
                    {
                        "data": "Qty",
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            if (window.xstatus == "Pending") {
                                return "<a href='#' class='text-info' id='EditItem' onclick=EditItemDetails('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                    " <a href='#' class='text-danger' id='DeleteItem' onclick=DeleteItemDetails('" + row.Id + "');><i class='fa fa-times'></i></a>"
                            } else {
                                return "<a href='#' class='text-info disable-click' id='EditItem' onclick=EditItemDetails('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                    " <a href='#' class='text-danger disable-click' id='DeleteItem' onclick=DeleteItemDetails('" + row.Id + "');><i class='fa fa-times'></i></a>"
                            }

                        }
                    },
                ],
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "responsive": true,
            });
        }
    });
}
function EditItemDetails() {
    $('#xMedicineList').on('click', '#EditItem', function () {
        action = "Edit";
       
        let data;
        data = xmedicineList.row($(this).closest('tr')).data();
        window.itemId = data.Id;
        GetMedicineDropDownForEdit($('#txtdistrictId').val(), $('#txtbrgyId').val(), data.StockNo);
        $('#txtQty').val(data.Qty);

        $('#MedicineModal').modal('show');
    })
}
function GetMedicineDropDownForEdit(districtId, brgyId,stockNo) {

    $.ajax({
        type: "POST",
        url: "PPMP_AllocationPerPatient.aspx/GetMedicinePerLocation",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ districtId: districtId, brgyId: brgyId }),
        success: function (r) {
            var ddlMedicine = $("#ddlMedicine");
            var parseData = JSON.parse(r.d)

            ddlMedicine.empty().append('<option selected="selected" value="0">Please select</option>');
            $.each(parseData, function () {
                ddlMedicine.append($("<option></option>").val(this['StockNo']).html(this['MedicineName']));
            });
            $("#ddlMedicine").val(stockNo);
        }
    });
}


function DeleteItemDetails() {
    $('#xMedicineList').on('click', '#DeleteItem', function () {

        let data;
        data = xmedicineList.row($(this).closest('tr')).data();
        let aydi = data.Id;
        let code = data.TransactionCode;
        sweetAlertConfirmation('Are you sure you want to delete this item?', '', 'question', 'Yes delete it!', 'Items successfully deleted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_AllocationPerPatient.aspx/DeleteItem',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: aydi }),
                    success: function (data) {
                        showSweetAlert('success', 'Item successfully deleted');
                        InitializeMedicineDetails(code);
                    }
                });
            }
        })
    })
}
$('#editPatient').click(function () {
    action = "Edit"
    $('#remarks').attr("disabled", false);
})

function GetMedicineDropDown(districtId,brgyId) {

    $.ajax({
        type: "POST",
        url: "PPMP_AllocationPerPatient.aspx/GetMedicinePerLocation",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ districtId: districtId, brgyId: brgyId }),
        success: function (r) {
            var ddlMedicine = $("#ddlMedicine");
            var parseData = JSON.parse(r.d)

            ddlMedicine.empty().append('<option selected="selected" value="0">Please select</option>');
            $.each(parseData, function () {
                ddlMedicine.append($("<option></option>").val(this['StockNo']).html(this['MedicineName']));
            });

        }
    });
}

$('#AddMedicine').click(function () {
    action = "Add"
    $('#txtQty').val('');
    GetMedicineDropDown($('#txtdistrictId').val(), $('#txtbrgyId').val());
    $('#MedicineModal').modal('show');
})


$('#SaveMedicine').click(function () {

    let transactionCode = $('#transactionCode').val();
    let stockNo = $('#ddlMedicine').val(); 
    let qty = $('#txtQty').val();

    if (stockNo == "0" || stockNo == undefined) {
        notification('error', 'This field is required', 'Medicine Name');
        return false;
    }

    let _patient = {};
    _patient.TransactionCode = transactionCode;
    _patient.StockNo = stockNo;
    _patient.Qty = qty;

    if (action == "Add") {
        _patient.Action = "CreatePatientDetails";
        $.ajax({
            url: 'PPMP_AllocationPerPatient.aspx/AddOrEditDetails',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ patients: _patient }),
            success: function (data) {
                showSweetAlert('success', 'Item successfully saved');
                $('#MedicineModal').modal('hide');
                InitializeMedicineDetails(transactionCode);
            }
        });
    } else if (action == "Edit") {
        _patient.Action = "UpdatePatientDetails";
        _patient.Id = window.itemId;
        sweetAlertConfirmation('Are you sure you want to update this item?', '', 'question', 'Yes update it!', 'Items successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_AllocationPerPatient.aspx/AddOrEditDetails',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ patients: _patient }),
                    success: function (data) {
                        showSweetAlert('success', 'Item successfully updated');
                        $('#MedicineModal').modal('hide');
                        InitializeMedicineDetails(transactionCode);
                    }
                });
            }
        })
    }
})


$('#postPatient').click(function () {
    let code = $('#transactionCode').val();
    sweetAlertConfirmation('Are you sure you want to post this transaction?', '', 'question', 'Yes post it!', 'Record successfully posted', '', 'success', function (result) {
        if (result == true) {

            $.ajax({
                url: 'PPMP_AllocationPerPatient.aspx/GetMedicineStocks',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ code: code }),
                success: function (data) {
                    let result = JSON.parse(data.d);

                    let qty = parseInt(result[0].Qty);
                    let onhand = parseInt(result[0].Onhand);

                    if (onhand >= qty) {
                        $.ajax({
                            url: 'PPMP_AllocationPerPatient.aspx/PostTransaction',
                            type: 'POST',
                            contentType: 'application/json; charset=utf8',
                            datatype: 'json',
                            data: JSON.stringify({ transactionCode: code }),
                            success: function (data) {
                                showSweetAlert('success', 'Record successfully posted');
                                RefreshValues_Patient();
                            }
                        });
                    } else {
                        showSweetAlert('error', 'Issued qty greater than stocks this will result to negative stocks', 'Stocks');
                        return false;
                    }
                }
            });
        }
    })
})

$('#cancelPatient').click(function () {
    let code = $('#transactionCode').val();
    sweetAlertConfirmation('Are you sure you want to cancel this transaction?', '', 'question', 'Yes cancel it!', 'Record successfully cancelled', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_AllocationPerPatient.aspx/CancelTransaction',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ transactionCode: code }),
                success: function (data) {
                    showSweetAlert('success', 'Record successfully cancelled');
                }
            });
        }
    })
})

function RefreshValues_Patient() {
    if ($('#rdPending_allocationPerPatient').is(':checked')) {
        InitializeTransactionCode($('#rdPending_allocationPerPatient').val())
    }
    else {
        InitializeTransactionCode($('#rdApproved_allocationPerPatient').val())
    }
    $('#xMedicineList tbody tr').remove();
    $('#xMedicineList_info').remove();
    $('#xMedicineList_paginate').remove();
    $('#postPatient').addClass("disable-click");
    $('#editPatient').addClass("disable-click");
    $('#cancelPatient').addClass("disable-click");
    $('#savePatient').addClass("disable-click");
    $('#AddMedicine').addClass("disable-click");
    $('#fullName').val('');
    $('#contactNo').val('');
    $('#address').val('');
    $('#transactionCode').val('');
    $('#remarks').attr("disabled", true);
    $('#remarks').val('');
};