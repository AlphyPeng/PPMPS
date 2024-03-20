var BarangayTable;
var Action;

window.BarangayId;
$(document).ready(function () {
    PopulateBarangay();
    GetDistrictList();
})

function PopulateBarangay() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_Barangay.aspx/GetBarangay',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            BarangayTable = $('#BarangayList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [
                    {
                        "data": "DistrictName"
                    },
                    {
                        "data": "BarangayName",
                        "orderable": false
                    },
                    {
                        "data": "BarangayDescription",
                        "orderable": false
                    }, {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info' id='EditBarangay' onclick=Barangay_Edit('" + row.BarangayId + "');><i class='fa fa-edit'></i></a>" +
                                " <a href='#' class='text-danger' id='DeleteBarangay' onclick=Barangay_Delete('" + row.BarangayId + "');><i class='fa fa-times'></i></a>"
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


function GetDistrictList() {
    $.ajax({
        type: "POST",
        url: "PPMP_Barangay.aspx/GetDistrictList",
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

function Barangay_Edit() {
    $('#BarangayList').on('click', '#EditBarangay', function () {
        Action = "Edit";

        let data;
        data = BarangayTable.row($(this).closest('tr')).data();
        window.BarangayId = data.BarangayId;

        ClearFields();
        $('#districtsDropdown').val(data.DistrictId);
        $('#barangayName').val(data.BarangayName);
        $('#BarangayDescription').val(data.BarangayDescription);
        $('#programModal').modal('show');
    })

}

function Barangay_Delete() {
    $('#BarangayList').on('click', '#DeleteBarangay', function () {

        let data;
        data = BarangayTable.row($(this).closest('tr')).data();
        sweetAlertConfirmation('Are you sure you want to delete this record?', '', 'question', 'Yes delete it!', 'Data successfully delete', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Barangay.aspx/Delete',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ Id: data.BarangayId }),
                    success: function () {
                        PopulateBarangay();
                    }
                })
            }
        })

    })
}

function AddOrEditBarangay() {
    let DistrictId = $('#districtsDropdown').val();
    let BarangayName = $('#barangayName').val();
    let BarangayDescription = $('#BarangayDescription').val();


    if (DistrictId == undefined || DistrictId == "0") {
        notification('error', 'This field is required', 'District');
        return false;
    }
    if (BarangayName == "") {
        notification('error', 'This field is required', 'Barangay');
        return false;
    }

    let _Barangay = {};
    _Barangay.DistrictId = DistrictId;
    _Barangay.BarangayName = BarangayName;
    _Barangay.BarangayDescription = BarangayDescription;

    if (Action == "Add") {
        _Barangay.Action = "BARANGAY_CREATE"
        $.ajax({
            url: 'PPMP_Barangay.aspx/AddOrEditBarangay',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ locations: _Barangay }),
            success: function () {
                ClearFields();
                PopulateBarangay();
                $('#programModal').modal('hide');
                showSweetAlert('success', 'Barangay', 'Successfully saved!');
            }
        })
    } else {
        _Barangay.BarangayId = window.BarangayId;
        _Barangay.Action = "BARANGAY_UPDATE"
        sweetAlertConfirmation('Are you sure you want to update this record?', '', 'question', 'Yes update it!', 'Data successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_Barangay.aspx/AddOrEditBarangay',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ locations: _Barangay }),
                    success: function () {
                        ClearFields();
                        PopulateBarangay();
                        $('#programModal').modal('hide');
                    }
                })
            }
        })

    }
}

$('#saveBarangay').click(function () {
    AddOrEditBarangay();
})

$('#CreateBrgy').click(function () {
    Action = "Add";
    GetDistrictList();
    ClearFields();
    $('#programModal').modal('show');

})

function ClearFields() {
    $('#districtName').val(0);
    $('#barangayName').val('');
    $('#BarangayDescription').val('');
}
