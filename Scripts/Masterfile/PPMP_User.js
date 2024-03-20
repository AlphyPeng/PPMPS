var userTable;
var Action;
var brgyList = [];

window.userId;
$(document).ready(function () {
    PopulateUsers();
    PopulateRoles();
    LoadDropdown('DROPDOWN_DISTRICT');
    LoadDropdown('DROPDOWN_BRGY');
    $("#districtsDropdown").attr("disabled", true);
    $("#BarangayDropdown").attr("disabled", true);
})

function PopulateRoles() {
    $.ajax({
        url: 'PPMP_User.aspx/GetRoles',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: '{}',
        success: function (data) {
            var parseData = JSON.parse(data.d);

            for (var i = 0; i < parseData.length; i++) {
                var item = parseData[i];
                var option = new Option(item.RoleName, item.Id, false, false);
                $("#ddlRoles").append(option);
            }

        }
    })
}

function ClearFields() {
    $("#ddlRoles").val(0);
    $("#userName").val('');
    $("#password").val('');
    $("#confirmpassword").val('');
    $("#districtsDropdown").val(0);
    $("#BarangayDropdown").val(0);
}
function ClearRoles() {
    $("#optMedicine").prop("checked", false);
    $("#optPatient").prop("checked", false);
    $("#optProgram").prop("checked", false);
    $("#optPharmacist").prop("checked", false);
    $("#optSupplier").prop("checked", false);
    $("#optLocation").prop("checked", false);
    $("#optUsers").prop("checked", false);

    $("#optForecasting").prop("checked", false);
    $("#optProcurementPlan").prop("checked", false);
    $("#optRR").prop("checked", false);
    $("#optAllocationProgram").prop("checked", false);
    $("#optAllocationDistrict").prop("checked", false);
    $("#optAllocationHealthCenter").prop("checked", false);
    $("#optAllocationPatient").prop("checked", false);

    $("#optReports").prop("checked", false);
}

$('#ddlRoles').on('change', function () {
    let roles = $(this).find(":selected").text();

    if (roles == "Admin") {
        $("#optMedicine").prop("checked", true);
        $("#optPatient").prop("checked", true);
        $("#optProgram").prop("checked", true);
        $("#optPharmacist").prop("checked", true);
        $("#optSupplier").prop("checked", true);
        $("#optLocation").prop("checked", true);
        $("#optUsers").prop("checked", true);

        $("#optProcurementPlan").prop("checked", true);
        $("#optRR").prop("checked", true);
        $("#optAllocationProgram").prop("checked", true);
        $("#optAllocationDistrict").prop("checked", true);
        $("#optAllocationHealthCenter").prop("checked", true);
        $("#optAllocationPatient").prop("checked", true);

        $("#optReports").prop("checked", true);
    } else if (roles == "Program Manager") {
        ClearRoles();
        $("#optProcurementPlan").prop("checked", true);
        $("#optReports").prop("checked", true);
    } else if (roles == "Procurement Staff") {
        ClearRoles();
        $("#optRR").prop("checked", true);
        $("#optReports").prop("checked", true);
    } else if (roles == "Health Depository Staff") {
        ClearRoles();
        $("#optAllocationProgram").prop("checked", true);
        $("#optReports").prop("checked", true);
    } else if (roles == "District Pharmacist") {
        ClearRoles();
        $("#optAllocationHealthCenter").prop("checked", true);
        $("#optReports").prop("checked", true);

    }
    else if (roles == "Health Center Staff") {
        ClearRoles();
        $("#optAllocationPatient").prop("checked", true);
        $("#optReports").prop("checked", true);

    }

    RoleValidation(roles);


});

function PopulateUsers() {

    $.ajax({
        type: 'POST',
        url: 'PPMP_User.aspx/GetUsers',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            userTable = $('#userList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [

                    {
                        "data": "UserName"
                    },
                    {
                        "data": "RoleName",
                        "orderable": false
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditUser' onclick=User_Edit('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeleteUser' onclick=User_Delete('" + row.Id + "');><i class='fa fa-times'></i></a>"
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

function User_Edit() {
    $('#userList').on('click', '#EditUser', function () {
        Action = "Edit";

        let data;
        data = userTable.row($(this).closest('tr')).data();
        window.userId = data.Id;
        ClearFields();

        $.ajax({
            url: 'PPMP_User.aspx/GetUserById',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ Id: window.userId }),
            success: function (data) {
                let permissions = JSON.parse(data.d);

                $('#userName').val(permissions[0].UserName);
                $('#password').val(permissions[0].Password);
                $('#confirmpassword').val(permissions[0].Password);
                $('#ddlRoles').val(permissions[0].RoleId);
                $('#districtsDropdown').val(permissions[0].DistrictId);
                $("#districtsDropdown").attr("disabled", false);
                $("#BarangayDropdown").attr("disabled", false);

                ClearRoles();

                if (permissions[0].BarangayName != null) {
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
                        return $(this).text() == permissions[0].BarangayName;
                    }).attr('selected', true);
                };



                let result = permissions[0].Modules.split(',');

                for (var i = 0; i < result.length; i++) {
                    if (result[i] == "M001") {
                        $("#optMedicine").prop("checked", true);
                    }
                    if (result[i] == "M002") {
                        $("#optPatient").prop("checked", true);
                    }
                    if (result[i] == "M003") {
                        $("#optProgram").prop("checked", true);
                    }
                    if (result[i] == "M004") {
                        $("#optPharmacist").prop("checked", true);
                    }
                    if (result[i] == "M005") {
                        $("#optSupplier").prop("checked", true);
                    }
                    if (result[i] == "M006" || result[i] == "M007") {
                        $("#optLocation").prop("checked", true);
                    }
                    if (result[i] == "M008" || result[i] == "M009") {
                        $("#optUsers").prop("checked", true);
                    }

                    if (result[i] == "T001") {
                        $("#optProcurementPlan").prop("checked", true);
                    }
                    if (result[i] == "T002") {
                        $("#optRR").prop("checked", true);
                    }
                    if (result[i] == "T003") {
                        $("#optAllocationProgram").prop("checked", true);
                    }
                    if (result[i] == "T004") {
                        $("#optAllocationDistrict").prop("checked", true);
                    }
                    if (result[i] == "T005") {
                        $("#optAllocationHealthCenter").prop("checked", true);
                    }
                    if (result[i] == "T006") {
                        $("#optAllocationPatient").prop("checked", true);
                    }

                    if (result[i] == "R001") {
                        $("#optReports").prop("checked", true);
                    }
                }

                let roles = $('#ddlRoles').find(":selected").text();

                RoleValidation(roles);



                $('#userModal').modal('show');
            }
        })

    })
}

function User_Delete() {
    $('#userList').on('click', '#DeleteUser', function () {

        let data;
        data = userTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to delete this record?', '', 'question', 'Yes delete it!', 'Data successfully delete', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_User.aspx/Delete',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.Id }),
                    success: function () {
                        PopulateUsers();
                    }
                })
            }
        })
    })
}

function AddOrEditUser() {
    let userName = $('#userName').val();
    let password = $('#password').val();
    let confirmPassword = $('#confirmpassword').val();
    let ddlRoles = $('#ddlRoles').val();

    let medicine = $("#optMedicine").is(':checked');
    let patient = $("#optPatient").is(':checked');
    let program = $("#optProgram").is(':checked');
    let pharmacist = $("#optPharmacist").is(':checked');
    let supplier = $("#optSupplier").is(':checked');
    let location = $("#optLocation").is(':checked');
    let users = $("#optUsers").is(':checked');

    let forecasting = $("#optForecasting").is(':checked');
    let procurement = $("#optProcurementPlan").is(':checked');
    let rr = $("#optRR").is(':checked');
    let allocationProgram = $("#optAllocationProgram").is(':checked');
    let allocationDistrict = $("#optAllocationDistrict").is(':checked');
    let allocationHealthCenter = $("#optAllocationHealthCenter").is(':checked');
    let allocationPatient = $("#optAllocationPatient").is(':checked');

    let reports = $("#optReports").is(':checked');
    let districtId = $("#districtsDropdown").val() || 0;
    let barangayId = $("#BarangayDropdown").val() || 0;



    let arrayModule = [];

    if (medicine == true) {
        arrayModule.push("M001");
    }
    if (patient == true) {
        arrayModule.push("M002");
    }
    if (program == true) {
        arrayModule.push("M003");
    }
    if (pharmacist == true) {
        arrayModule.push("M004");
    }
    if (supplier == true) {
        arrayModule.push("M005");
    }
    if (location == true) {
        arrayModule.push("M006");
        arrayModule.push("M007");
    }
    if (users == true) {
        arrayModule.push("M008");
        arrayModule.push("M009");
    }

    if (procurement == true) {
        arrayModule.push("T001");
    }
    if (rr == true) {
        arrayModule.push("T002");
    }
    if (allocationProgram == true) {
        arrayModule.push("T003");
    }
    if (allocationDistrict == true) {
        arrayModule.push("T004");
    }
    if (allocationHealthCenter == true) {
        arrayModule.push("T005");
    }
    if (allocationPatient == true) {
        arrayModule.push("T006");
    }

    if (reports == true) {
        arrayModule.push("R001");
    }
    if (userName == "") {
        notification('error', 'This field is required', 'User Name');
        return false;
    }
    if (ddlRoles == "" || ddlRoles == "0") {
        notification('error', 'This field is required', 'Roles');
        return false;
    }
    if (password != confirmPassword) {
        showSweetAlert('error', 'Password and Confirm password do not match!', 'Password');
        return false;
    }

    let _user = {};
    _user.UserName = userName;
    _user.Password = password;
    _user.RoleId = ddlRoles;
    _user.Modules = arrayModule.toString();
    _user.barangayId = barangayId;
    _user.districtId = districtId;

    if (Action == "Add") {
        _user.Action = "CREATE"
        $.ajax({
            url: 'PPMP_User.aspx/AddOrEditRoles',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ user: _user }),
            success: function () {
                ClearFields();
                PopulateUsers();
                $('#userModal').modal('hide');
                showSweetAlert('success', 'Program', 'Successfully saved!');
            }
        })
    } else {
        _user.Id = window.userId;
        _user.Action = "UPDATE"
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_User.aspx/AddOrEditRoles',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ user: _user }),
                    success: function () {
                        ClearFields();
                        PopulateUsers();
                        $('#userModal').modal('hide');
                    }
                })
            }
        })

    }
}

$('#saveUser').click(function () {
    AddOrEditUser();
})

$('#CreateUser').click(function () {
    Action = "Add";
    ClearFields();
    $('#userModal').modal('show');
})



function RoleValidation(role, BarangayName) {
    if (role == "District Pharmacist") {
        $("#districtsDropdown").attr("disabled", false);
        $("#BarangayDropdown").attr("disabled", true);


    } else if (role == "Health Center Staff") {
        $("#districtsDropdown").attr("disabled", false);
        $("#BarangayDropdown").attr("disabled", true);

    } else {
        $("#districtsDropdown").attr("disabled", true);
        $("#BarangayDropdown").attr("disabled", true);
        $("#districtsDropdown").prop("selectedIndex", 0).val();
        $("#BarangayDropdown").prop("selectedIndex", 0).val();
    }
};

$('#districtsDropdown').on('change', function () {

    var role = $('#ddlRoles :selected').text();

    if (role == "District Pharmacist") {
        $('#BarangayDropdown').attr('disabled', true);


    } else if (role == "Health Center Staff") {

        $('#BarangayDropdown').attr('disabled', false);
        $('#BarangayDropdown').empty().append('<option selected hidden disabled>Select a Barangay</option>');
        $.each(brgyList, function (index, code) {
            var data = code.split(',');
            if (data[2] == $('#districtsDropdown').val()) {
                $('#BarangayDropdown').append($('<option>', {
                    value: data[0],
                    text: data[1]
                }));
            }
        });

    } else {

        $('#districtsDropdown').attr('disabled', true);
        $('#BarangayDropdown').attr('disabled', true);
    }
});


function LoadDropdown(_action) {
    $.ajax({
        url: 'PPMP_User.aspx/LoadDropdownList',
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

                $('#districtsDropdown').val(0);
                $.each(array, function (index, code) {
                    var data = code.split(',');
                    $('#districtsDropdown').append($('<option>', {
                        value: data[0],
                        text: data[1]
                    }));
                });
            }
            else if (_action == "DROPDOWN_BRGY") {
                for (var i = 0; i < result.length; i++) {
                    brgyList.push(result[i].BarangayId + ',' + result[i].BarangayName + ',' + result[i].DistrictId)
                }
            }

        }
    })
};