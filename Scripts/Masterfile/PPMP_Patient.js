var patientsTable;
var isEdit, activeDistrict;
var brgyList = [];
window.activeId;

$(document).ready(function () {
    LoadPatientTable();
    LoadDropdown('DROPDOWN_DISTRICT');
    LoadDropdown('DROPDOWN_BRGY');
});

$('#btnAddPatient').on('click', function () {
    isEdit = 0;
    $('#selectDistrict').val(0);
    $('#selectBarangay').val(0);
    $('#patientModal').modal('show');
    ClearFields();
});

$('#closePatientModal').on('click', function () {
    $('#patientModal').modal('hide');
});

$('#selectDistrict').on('change', function () {

    $('#selectBrgy').attr('disabled', false);
    $('#selectBrgy').empty().append('<option selected hidden disabled>Select a Barangay</option>');
    $.each(brgyList, function (index, code) {
        var data = code.split(',');
        if (data[2] == $('#selectDistrict').val()) {
            $('#selectBrgy').append($('<option>', {
                value: data[0],
                text: data[1]
            }));
        }
    });
});

$('#btnSavePatient').on('click', function () {

    let lastName = $('#txtLastName_Patient').val();
    let firstName = $('#txtFirstName_Patient').val();
    let middleName = $('#txtMiddleName_Patient').val();
    let birthDate = $('#birthDate_Patient').val();
    let contactNo = $('#txtContactNo_Patient').val();
    let email = $('#txtEmail_Patient').val();
    let address = $('#txtAddress').val();


    if (firstName == "") {
        notification('error', 'This field is required', 'First Name');
        return false;
    }
    if (lastName == "") {
        notification('error', 'This field is required', 'Last Name');
        return false;
    }
    if (birthDate == "") {
        notification('error', 'This field is required', 'Birth Date');
        return false;
    }
    if (contactNo == "") {
        notification('error', 'This field is required', 'Contact No');
        return false;
    }

    let _patientInfo = {};
    _patientInfo.LastName = lastName;
    _patientInfo.FirstName = firstName;
    _patientInfo.MiddleName = middleName;
    _patientInfo.BirthDate = birthDate;
    _patientInfo.ContactNo = contactNo;
    _patientInfo.Email = email;
    _patientInfo.Address = address;
    _patientInfo.DistrictId = $('#selectDistrict').val();
    _patientInfo.BrgyId = $('#selectBrgy').val();

    if (isEdit == 0) {
        _patientInfo.Action = "CREATE";
        $.ajax({
            url: 'PPMP_PatientInfo.aspx/AddorEditPatient',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ patient: _patientInfo }),
            success: function () {
                LoadPatientTable();
                ClearFields();
                $('#patientModal').modal('hide');
                showSweetAlert('success', 'Patient', 'Successfully saved!');
            }
        });
    }
    else {
        _patientInfo.Action = "UPDATE";
        _patientInfo.Id = window.activeId;
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_PatientInfo.aspx/AddorEditPatient',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ patient: _patientInfo }),
                    success: function () {
                        LoadPatientTable();
                        ClearFields();
                        $('#patientModal').modal('hide');
                    }
                });
            }
        })
    }
});

function Patient_Edit() {
    $('#patientList').on('click', '#EditPatient', function () {
        isEdit = 1;

        let data;
        data = patientsTable.row($(this).closest('tr')).data();

        $('#patientModal').modal('show');

        ClearFields();
        window.activeId = data.Id;
        $('#txtLastName_Patient').val(data.LastName);
        $('#txtFirstName_Patient').val(data.FirstName);
        $('#txtMiddleName_Patient').val(data.MiddleName);
        $('#birthDate_Patient').val(data.BirthDate);
        $('#txtContactNo_Patient').val(data.ContactNo);
        $('#txtEmail_Patient').val(data.Email);
        $('#txtAddress').val(data.Address);
        $('#selectDistrict').val(data.DistrictId);

        if (data.BrgyName != null) { 
            $('#selectBrgy').attr('disabled', false);
            $('#selectBrgy').empty();
            $.each(brgyList, function (index, code) {
                var data = code.split(',');
                if (data[2] == $('#selectDistrict').val()) {
                    $('#selectBrgy').append($('<option>', {
                        value: data[0],
                        text: data[1]
                    }));
                }
            });

            $('#selectBrgy option').filter(function () {
                return $(this).text() == data.BrgyName;
            }).attr('selected', true);
        };
    })
}

function Patient_Delete() {
    $('#patientList').on('click', '#DeletePatient', function () {

        let data;
        data = patientsTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to delete this record?', '', 'question', 'Yes delete it!', 'Data successfully deleted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_PatientInfo.aspx/Delete',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.Id }),
                    success: function () {
                        LoadPatientTable();
                    }
                })
            }
        })
    })
}

function LoadPatientTable() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_PatientInfo.aspx/GetPatientList',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            patientsTable = $('#patientList').DataTable({
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
                        "data": "BirthDate",
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
                        "data": null,
                        "render": function (data, row) {
                            return data.Address + ' ' + data.BrgyName + ', ' + data.DistrictName
                        },
                        "orderable": false
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditPatient' onclick=Patient_Edit('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeletePatient' onclick=Patient_Delete('" + row.Id + "');><i class='fa fa-times'></i></a>"
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

function ClearFields() {
    $('#txtLastName_Patient').val('');
    $('#txtFirstName_Patient').val('');
    $('#txtMiddleName_Patient').val('');
    $('#birthDate_Patient').val('');
    $('#txtContactNo_Patient').val('');
    $('#txtEmail_Patient').val('');
    $('#txtAddress').val('');
    $('#selectDistrict').val(0);
    $('#selectBarangay').val(0);
};

function LoadDropdown(_action) {
    $.ajax({
        url: 'PPMP_PatientInfo.aspx/LoadDropdownList',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ action: _action }),
        success: function (data) {
            var result = JSON.parse(data.d);
            let array = [];

            if (_action == "DROPDOWN_DISTRICT") {
                for (var i = 0; i < result.length; i++) {
                    array.push(result[i].DistrictId + ',' + result[i].DistrictName)
                }

                $('#selectDistrict').val(0);
                $.each(array, function (index, code) {
                    var data = code.split(',');
                    $('#selectDistrict').append($('<option>', {
                        value: data[0],
                        text: data[1]
                    }));
                });
            }
            else if (_action == "DROPDOWN_BRGY") {
                for (var i = 0; i < result.length; i++) {
                    brgyList.push(result[i].BrgyId + ',' + result[i].BrgyName + ',' + result[i].DistrictId)
                }
            }

        }
    })
};