var DistrictTable;
var Action;

window.DistrictId;
$(document).ready(function () {
    PopulateDistrict();
})

function PopulateDistrict() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_District.aspx/GetDistrict',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            DistrictTable = $('#DistrictList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [

                    {
                        "data": "DistrictName"
                       
                    },
                    {
                        "data": "DistrictDescription",
                         "orderable": false
                    }, {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditDistrict' onclick=District_Edit('" + row.DistrictId + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeleteDistrict' onclick=District_Delete('" + row.DistrictId + "');><i class='fa fa-times'></i></a>"
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

function District_Edit() {
    $('#DistrictList').on('click', '#EditDistrict', function () {
        Action = "Edit";

        let data;
        data = DistrictTable.row($(this).closest('tr')).data();
        window.DistrictId = data.DistrictId;
        ClearFields();

        $('#districtName').val(data.DistrictName);
        $('#districtDescription').val(data.DistrictDescription);
        $('#programModal').modal('show');

    })

}


function District_Delete() {
    $('#DistrictList').on('click', '#DeleteDistrict', function () {

        let data;
        data = DistrictTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to delete this record?', '', 'question', 'Yes delete it!', 'Data successfully deleted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_District.aspx/Delete',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.DistrictId }),
                    success: function () {
                        PopulateDistrict();
                    }
                })
            }
        })
    })
}

function AddOrEditDistrict() {
    let DistrictName = $('#districtName').val();
    let DistrictDescription = $('#districtDescription').val();


    if (DistrictName == "") {
        notification('error', 'This field is required', 'District Name');
        return false;
    }

    let _district = {};
    _district.DistrictName = DistrictName;
    _district.DistrictDescription = DistrictDescription;

    if (Action == "Add") {
        _district.Action = "DISTRICT_CREATE"
        $.ajax({
            url: 'PPMP_District.aspx/AddOrEditDistrict',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ locations: _district }),
            success: function () {
                ClearFields();
                PopulateDistrict();
                $('#programModal').modal('hide');
                showSweetAlert('success', 'District', 'Successfully saved!');
            }
        })
    } else {
        _district.DistrictId = window.DistrictId;
        _district.Action = "DISTRICT_UPDATE"
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_District.aspx/AddOrEditDistrict',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ locations: _district }),
                    success: function () {
                        ClearFields();
                        PopulateDistrict();
                        $('#programModal').modal('hide');
                    }
                })
            }
        })
    }
}

$('#saveDistrict').click(function () {
    AddOrEditDistrict();
})

$('#CreateDistrict').click(function () {
    Action = "Add";
    ClearFields();
    $('#programModal').modal('show');
})

function ClearFields() {
    $('#districtName').val('');
    $('#districtDescription').val('');
}