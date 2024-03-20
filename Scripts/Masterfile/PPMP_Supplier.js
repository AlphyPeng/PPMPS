var SupplierTable;
var Action;

window.Id;
$(document).ready(function () {
    PopulateSupplier();
})

function PopulateSupplier() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_Supplier.aspx/GetSupplier',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: '{}',
        success: function (data) {
            var result = JSON.parse(data.d);
           
            SupplierTable = $('#SupplierList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [
                    {
                        "data": "SupplierCode"
                    },
                    {
                        "data": "SupplierName",
                        "orderable": false
                    },
                    {
                        "data": "ContactNo",
                        "orderable": false
                    },
                    {
                        "data": "Email",
                        "orderable": false
                    },
                    {
                        "data": "ContactPerson",
                        "orderable": false
                    },
                    {
                        "data": "SupplierAddress",
                        "orderable": false
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditSupplier' onclick=Supplier_Edit('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeleteSupplier' onclick=Supplier_Delete('" + row.Id + "');><i class='fa fa-times'></i></a>"
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
}


function AddOrEditSupplier() {
   
    let SupplierName = $('#SupplierName').val();
    let ContactNo = $('#ContactNo').val();
    let ContactName = $('#ContactName').val();
    let EmailAddress = $('#EmailAddress').val();
    let CompanyAddress = $('#CompanyAddress').val();

    if (SupplierName == "") {
        notification('error', 'This field is required', 'Supplier Name');
        return false;
    }
    if (ContactNo == "") {
        notification('error', 'This field is required', 'Contact No');
        return false;
    }
    if (ContactName == "") {
        notification('error', 'This field is required', 'Contact Name');
        return false;
    }

    let _Supplier = {};
    
    _Supplier.SupplierName = SupplierName;
    _Supplier.ContactNo = ContactNo;
    _Supplier.ContactPerson = ContactName;
    _Supplier.Email = EmailAddress;
    _Supplier.SupplierAddress = CompanyAddress;


    if (Action == "Add") {
        _Supplier.Action = "CREATE"
        $.ajax({
            url: 'PPMP_Supplier.aspx/AddOrEditSupplier',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ suppliers: _Supplier }),
            success: function () {
                ClearFields();
                PopulateSupplier();
                $('#programModal').modal('hide');
                showSweetAlert('success', 'Supplier', 'Successfully saved!');
            }
        })

    } else {
        _Supplier.Id = window.SupplierId;
        _Supplier.Action = "UPDATE";
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes delete it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Supplier.aspx/AddOrEditSupplier',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ suppliers: _Supplier }),
                    success: function () {
                        ClearFields();
                        PopulateSupplier();
                        $('#programModal').modal('hide');
                    }
                })
            }
        })
       
    }
}
$('#SaveSupplier').click(function () {
    AddOrEditSupplier();
})



function Supplier_Edit() {
    $('#SupplierList').on('click', '#EditSupplier', function () {
        Action = "Edit";

        let data;
        data = SupplierTable.row($(this).closest('tr')).data();
        window.SupplierId = data.Id;
        ClearFields();

        $('#SupplierName').val(data.SupplierName);
        $('#ContactNo').val(data.ContactNo);
        $('#EmailAddress').val(data.Email);
        $('#ContactName').val(data.ContactPerson);
        $('#CompanyAddress').val(data.SupplierAddress);

        $('#programModal').modal('show');

    })

}


function Supplier_Delete() {
    $('#SupplierList').on('click', '#DeleteSupplier', function () {

        let data;
        data = SupplierTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to delete this record?', '', 'question', 'Yes delete it!', 'Data successfully deleted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Supplier.aspx/Delete',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.Id }),
                    success: function () {
                        PopulateSupplier();
                    }
                })
            }
        })
    })
}

$('#CreateSupplier').click(function () {
    Action = "Add";
    ClearFields();
    $('#programModal').modal('show');

})


function ClearFields() {
    $('#SupplierName').val('');
    $('#ContactNo').val('');
    $('#EmailAddress').val('');
    $('#ContactName').val('');
    $('#CompanyAddress').val('');
}