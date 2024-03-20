var programTable;
var Action;
window.programId;
$(document).ready(function () {
    PopulateProgram();
})

function PopulateProgram() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_Program.aspx/GetPrograms',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            programTable = $('#programList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [
                   
                    {
                        "data":"ProgramName"
                    },
                    {
                        "data": "Description",
                        "orderable": false
                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditProgram' onclick=Program_Edit('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeleteProgram' onclick=Program_Delete('" + row.Id + "');><i class='fa fa-times'></i></a>" 
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

function Program_Edit() {
    $('#programList').on('click', '#EditProgram', function () {
        Action = "Edit";

        let data;
        data = programTable.row($(this).closest('tr')).data();
        window.programId = data.Id;
        ClearFields();

        $('#programName').val(data.ProgramName);
        $('#programDescription').val(data.Description);

        $('#programModal').modal('show');
    })
}

function Program_Delete() {
    $('#programList').on('click', '#DeleteProgram', function () {
       
        let data;
        data = programTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Program.aspx/Delete',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.Id }),
                    success: function () {
                        PopulateProgram();
                    }
                })
            }
        })
    })
}

function AddOrEditProgram() {
    let prograName = $('#programName').val();
    let description = $('#programDescription').val();

    if (prograName == "") {
        notification('error', 'This field is required', 'Program Name');
        return false;
    }

    let _program = {};
    _program.ProgramName = prograName;
    _program.Description = description;

    if (Action == "Add") {
        _program.Action = "CREATE"
        $.ajax({
            url: 'PPMP_Program.aspx/AddOrEditProgram',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ programs: _program }),
            success: function () {
                ClearFields();
                PopulateProgram();
                $('#programModal').modal('hide');
                showSweetAlert('success', 'Program', 'Successfully saved!');
            }
        })
    } else {
        _program.Id = window.programId;
        _program.Action = "UPDATE"
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Program.aspx/AddOrEditProgram',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ programs: _program }),
                    success: function () {
                        ClearFields();
                        PopulateProgram();
                        $('#programModal').modal('hide');
                    }
                })
            }
        })
    }
}

$('#saveProgram').click(function () {
    AddOrEditProgram();
})

$('#CreateProgram').click(function () {
    Action = "Add";
    ClearFields();
    $('#programModal').modal('show');
})

function ClearFields() {
    $('#programName').val('');
    $('#programDescription').val('');
}