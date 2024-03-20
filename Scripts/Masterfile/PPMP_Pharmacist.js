var PharmacistTable;
var Action;
var brgyList = [];
window.Id;
$(document).ready(function () {
    PopulatePharmacist();
    GetDistrictList();
    $('#BarangayDropdown').attr('disabled', true);
})

function PopulatePharmacist() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_Pharmacist.aspx/GetPharmacist',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            PharmacistTable = $('#PharmacistList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [
                    {
                        "data": null,
                        "render": function (data) {
                            return data.FirstName + ' ' + data.MiddleName + ' ' + data.LastName
                        }
                    },
                    {
                        "data": "DistrictName",
                        "orderable": false
                    },
                    {
                        "data": "BarangayName",
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
                        "data": "Address",
                        "orderable": false
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditPharmacist' onclick=Pharmacist_Edit('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeletePharmacist' onclick=Pharmacist_Delete('" + row.Id + "');><i class='fa fa-times'></i></a>"
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

function Pharmacist_Delete() {
    $('#PharmacistList').on('click', '#DeletePharmacist', function () {

        let data;
        data = PharmacistTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to delete this record?', '', 'question', 'Yes delete it!', 'Data successfully delete', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Pharmacist.aspx/Delete',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.Id }),
                    success: function () {
                        PopulatePharmacist();
                    }
                })
            }
        })
    })
}


function Pharmacist_Edit() {
    $('#PharmacistList').on('click', '#EditPharmacist', function () {
        Action = "Edit";

        let data;
        data = PharmacistTable.row($(this).closest('tr')).data();
        window.Id = data.Id;

        ClearFields();
        $('#ContactNo').val(data.ContactNo);
        $('#FirstName').val(data.FirstName);
        $('#MiddleName').val(data.MiddleName);
        $('#LastName').val(data.LastName);
        $('#EmailAddress').val(data.Email);
        $('#txtAddress').val(data.Address);
        $('#districtsDropdown').val(data.DistrictId);
        $('#BarangayDropdown').val(data.BarangayId);

        if (data.BrgyName != null) {
            $('#BarangayDropdown').attr('disabled', false);
            $('#BarangayDropdown').empty();
            $.each(brgyList, function (index, code) {
                var data = code.split(',');
                if (data[2] == $('#districtsDropdown').val()) {
                    $('#BarangayDropdown').append($('<option>', {
                        value: data[0],
                        text: data[1]
                    }));
                }
            });

            $('#BarangayDropdown option').filter(function () {
                return $(this).text() == data.BrgyName;
            }).attr('selected', true);
        };

        $('#programModal').modal('show');
    })
}


function AddOrEditPharmacist() {
    let DistrictId = $('#districtsDropdown').val();
    let BrgyId = $('#BarangayDropdown').val();
    let ContactNo = $('#ContactNo').val();
    let FirstName = $('#FirstName').val();
    let MiddleName = $('#MiddleName').val();
    let LastName = $('#LastName').val();
    let Email = $('#EmailAddress').val();
    let Address = $('#txtAddress').val();
   

    if (FirstName == "") {
        notification('error', 'This field is required', 'First Name');
        return false;
    }
    if (LastName == "") {
        notification('error', 'This field is required', 'Last Name');
        return false;
    }
    if (DistrictId == "0" || DistrictId == undefined) {
        notification('error', 'This field is required', 'District');
        return false;
    }
    if (BrgyId == "0" || BrgyId == undefined) {
        notification('error', 'This field is required', 'Barangay');
        return false;
    }
    if (ContactNo == "") {
        notification('error', 'This field is required', 'Contact No');
        return false;
    }

    let _Pharmacist = {};
    _Pharmacist.DistrictId = DistrictId;
    _Pharmacist.BarangayId = BrgyId;
    _Pharmacist.ContactNo = ContactNo;
    _Pharmacist.FirstName = FirstName;
    _Pharmacist.MiddleName = MiddleName;
    _Pharmacist.LastName = LastName;
    _Pharmacist.Email = Email;
    _Pharmacist.Address = Address;


    if (Action == "Add") {
        _Pharmacist.Action = "CREATE"
        $.ajax({
            url: 'PPMP_Pharmacist.aspx/AddOrEditPharmacist',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ Pharmacists: _Pharmacist }),
            success: function () {
                ClearFields();
                PopulatePharmacist();
                $('#programModal').modal('hide');
                showSweetAlert('success', 'Pharmacist', 'Successfully saved!');
            }
        })
    } else {
        _Pharmacist.Id = window.Id;
        _Pharmacist.Action = "UPDATE"
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully update', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Pharmacist.aspx/AddOrEditPharmacist',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Pharmacists: _Pharmacist }),
                    success: function () {
                        ClearFields();
                        PopulatePharmacist();
                        $('#programModal').modal('hide');
                    }
                })
            }
        })
    }
}

$('#savePharmacist').click(function () {
    AddOrEditPharmacist();
})

$('#CreateProgram').click(function () {
    Action = "Add";
    GetDistrictList();
    ClearFields();
    $('#programModal').modal('show');
})


function GetDistrictList() {
    $.ajax({
        type: "POST",
        url: "PPMP_Pharmacist.aspx/GetDistrictList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            var districtsDropdown = $("[id*=districtsDropdown]");
            var parseData = JSON.parse(r.d)

            districtsDropdown.empty().append('<option selected="selected" value="0">Please select</option>');
            $.each(parseData, function () {
                districtsDropdown.append($("<option></option>").val(this['DistrictId']).html(this['DistrictName']));
            });
        }
    });
}

function GetBarangayList(districtId) {
    $.ajax({
        type: "POST",
        url: "PPMP_Pharmacist.aspx/GetBarangayList",
        data: JSON.stringify({ districtId: districtId }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            var BarangayDropdown = $("[id*=BarangayDropdown]");
            var parseData = JSON.parse(r.d)

            BarangayDropdown.empty().append('<option selected="selected" value="0">Please select</option>');
            $.each(parseData, function () {
                BarangayDropdown.append($("<option></option>").val(this['BarangayId']).html(this['BarangayName']));
            });
        }
    });
}

$('#districtsDropdown').on('change', function () {

    $('#BarangayDropdown').attr('disabled', false);
    let districtId = $("#districtsDropdown").val();
    GetBarangayList(districtId);
});


function ClearFields() {
    $('#districtsDropdown').val(0);
    $('#BarangayDropdown').val(0);
    $('#ContactNo').val('');
    $('#FirstName').val('');
    $('#MiddleName').val('');
    $('#LastName').val('');
    $('#EmailAddress').val('');
    $('#txtAddress').val('');
 }