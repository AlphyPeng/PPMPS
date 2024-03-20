var roleTable;
var Action;

window.roleId;
$(document).ready(function () {
    PopulateRole();
})

function PopulateRole() {

    $.ajax({
        type: 'POST',
        url: 'PPMP_Roles.aspx/GetRoles',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            roleTable = $('#rolesList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [

                    {
                        "data": "RoleName"
                    },
                    {
                        "data": "Description",
                        "orderable": false
                    }, {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditRole' onclick=Role_Edit('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeleteRole' onclick=Role_Delete('" + row.Id + "');><i class='fa fa-times'></i></a>"
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

function Role_Edit() {
    $('#rolesList').on('click', '#EditRole', function () {
        Action = "Edit";

        let data;
        data = roleTable.row($(this).closest('tr')).data();
        window.roleId = data.Id;
        ClearFields();

        $('#roleName').val(data.RoleName);
        $('#roleDescription').val(data.Description);

        $('#roleModal').modal('show');
    })
}

function Role_Delete() {
    $('#rolesList').on('click', '#DeleteRole', function () {

        let data;
        data = roleTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to delete this record?', '', 'question', 'Yes delete it!', 'Data successfully deleted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Roles.aspx/Delete',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.Id }),
                    success: function () {
                        PopulateRole();
                    }
                })
            }
        })
    })
}

function AddOrEditRole() {
    let roleName = $('#roleName').val();
    let description = $('#roleDescription').val();

    if (roleName == "") {
        notification('error', 'This field is required', 'Role Name');
        return false;
    }

    let _role = {};
    _role.RoleName = roleName;
    _role.Description = description;

    if (Action == "Add") {
        _role.Action = "CREATE"
        $.ajax({
            url: 'PPMP_Roles.aspx/AddOrEditRoles',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ roles: _role }),
            success: function () {
                ClearFields();
                PopulateRole();
                $('#roleModal').modal('hide');
                showSweetAlert('success', 'Program', 'Successfully saved!');
            }
        })
    } else {
        _role.Id = window.roleId;
        _role.Action = "UPDATE"
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Roles.aspx/AddOrEditRoles',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ roles: _role }),
                    success: function () {
                        ClearFields();
                        PopulateRole();
                        $('#roleModal').modal('hide');
                    }
                })
            }
        })
    }
}

$('#saveRole').click(function () {
    AddOrEditRole();
})

$('#CreateRoles').click(function () {
    Action = "Add";
    ClearFields();
    $('#roleModal').modal('show');
})

function ClearFields() {
    $('#roleName').val('');
    $('#roleDescription').val('');
}