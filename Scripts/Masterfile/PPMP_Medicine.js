var isEdit;
var medicineTable;
window.patientId;

$(document).ready(function () {
    LoadMedicineTable();
});

$('#btnAddMedicine').on('click', function () {
    $('#medicineModal').modal('show');
    ClearFields();
    isEdit = 0;
    $.ajax({
        url: 'PPMP_Medicine.aspx/GetNextStockNo',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: '{}',
        success: function (data) {
            var result = JSON.parse(data.d);
            $('#txtStockNo_Medicine').val(result);
        }
    });

});

$('#closeMedicineModal').on('click', function () {
    $('#medicineModal').modal('hide');
});

$('#saveMedicine').on('click', function () {

    let stockNo = $('#txtStockNo_Medicine').val();
    let batchNo = $('#txtBatchNo_Medicine').val();
    let brand = $('#txtBrand_Medicine').val();
    let medicineName = $('#txtMedicineName_Medicine').val();
    let unit = $('#txtUnit_Medicine').val();
    let qty = $('#txtQty_Medicine').val();
    let expiryDate = $('#expiryDate_Medicine').val();
    
   
    let description = $('#txtDescription_Medicine').val();
    let stockAvailability = $('#txtStockAvailability_Medicine').val();
 
    let remarks = $('#txtRemarks_Medicine').val();


    if (batchNo == "") {
        notification('error', 'This field is required', 'Lot Number');
        return false;
    }
    if (brand == "") {
        notification('error', 'This field is required', 'Brand');
        return false;
    }
    if (medicineName == "") {
        notification('error', 'This field is required', 'Medicine Name');
        return false;
    }
    if (unit == "") {
        notification('error', 'This field is required', 'Unit');
        return false;
    }
    if (qty == "") {
        notification('error', 'This field is required', 'Qty');
        return false;
    }
    if (expiryDate == "") {
        notification('error', 'This field is required', 'Expiry Date');
        return false;
    }

    let _medicineInfo = {};
    _medicineInfo.StockNo = stockNo;
    _medicineInfo.Unit = unit;
    _medicineInfo.Quantity = qty;
    _medicineInfo.MedicineName = medicineName;
    _medicineInfo.Brand = brand;
    _medicineInfo.Description = description;
    _medicineInfo.StockAvailability = stockAvailability;
    _medicineInfo.BatchNo = batchNo;
    _medicineInfo.ExpiryDate = expiryDate;
    _medicineInfo.Remarks = remarks;

    if (isEdit == 0) {
        _medicineInfo.Action = "CREATE";
        $.ajax({
            url: 'PPMP_Medicine.aspx/AddOrEditMedicine',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ medicine: _medicineInfo }),
            success: function () {
                LoadMedicineTable();
                $('#medicineModal').modal('hide');
                showSweetAlert('success', 'Medicine', 'Successfully saved!');
            }
        });
    }
    else {
        _medicineInfo.Action = "UPDATE";
        _medicineInfo.Id = window.patientId;
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Medicine.aspx/AddOrEditMedicine',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ medicine: _medicineInfo }),
                    success: function () {
                        LoadMedicineTable();
                        $('#medicineModal').modal('hide');
                    }
                });
            }
        })
    }
});

function LoadMedicineTable() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_Medicine.aspx/GetMedicineList',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            medicineTable = $('#medicineList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [
                    {
                        "data": "StockNo"
                    },
                    {
                        "data": "BatchNo",
                        "orderable": false
                    },
                    {
                        "data": "Brand",
                        "orderable": false
                    },

                    {
                        "data": "MedicineName",
                        "orderable": false
                    },
                    {
                        "data": "Description",
                        "orderable": false
                    },
                    {
                        "data": "Unit",
                        "orderable": false
                    },
                    {
                        "data": "ThresHold",
                        "orderable": false
                    },
                    {
                        "data": "Quantity",
                        "orderable": false
                    },
                    {
                        "data": "ExpiryDate",
                        "orderable": false
                    },
                    {
                        "data": "Remarks",
                        "orderable": false
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditMedicine' onclick=Medicine_Edit('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeleteMedicine' onclick=Medicine_Delete('" + row.Id + "');><i class='fa fa-times'></i></a>"
                        },
                        "orderable": false
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
};

function Medicine_Edit() {
    $('#medicineList').on('click', '#EditMedicine', function () {
        isEdit = 1;

        let data;
        data = medicineTable.row($(this).closest('tr')).data();

        $('#medicineModal').modal('show');

        ClearFields();
        window.patientId = data.Id;

        $('#txtQty_Medicine').val(data.Quantity);
        $('#txtBrand_Medicine').val(data.Brand);
        $('#txtMedicineName_Medicine').val(data.MedicineName);
        $('#txtDescription_Medicine').val(data.Description);
        $('#txtBatchNo_Medicine').val(data.BatchNo);

        let d = new Date(data.ExpiryDate);
        let datestring = d.getFullYear().toString().padStart(4, '0') + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
        $('#expiryDate_Medicine').val(datestring);
        $('#txtRemarks_Medicine').val(data.Remarks);
        $('#txtUnit_Medicine').val(data.Unit);
        $('#txtStockNo_Medicine').val(data.StockNo);
    })
}

function Medicine_Delete() {
    $('#medicineList').on('click', '#DeleteMedicine', function () {
        let data;
        data = medicineTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to delete this record?', '', 'question', 'Yes delete it!', 'Data successfully deleted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Medicine.aspx/DeleteMedicine',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.Id }),
                    success: function () {
                        LoadMedicineTable();
                    }
                })
            }
        })
    })

   
}


function ClearFields() {
    $('#txtQty_Medicine').val('');
    $('#txtBrand_Medicine').val('');
    $('#txtMedicineName_Medicine').val('');
    $('#txtDescription_Medicine').val('');
    $('#txtBatchNo_Medicine').val('');
    $('#expiryDate_Medicine').val('');
    $('#txtRemarks_Medicine').val('');
    $('#txtUnit_Medicine').val('');
};