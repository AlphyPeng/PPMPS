var rrTablve;
var rrItemsTable;
window.PPMP_Code_RR;
$(document).ready(function () {
    InitializeProcurementData();
    GetSupplierList();
})

function InitializeProcurementData() {
    $.ajax({
        type: 'POST',
        url: 'PPMP_Receiving.aspx/GetProcurement',
        data: '{}',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            rrTable = $('#procurementRrList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [

                    {
                        "data": "PPMPCode"
                    },
                    {
                        "data": "ProgramTitle",
                        "orderable": false
                    },
                    {
                        "data": "AccountTitle",
                        "orderable": false
                    },
                    {
                        "data": "Department",
                        "orderable": false
                    },
                    {
                        "data": "DeliverySchedule",
                        "orderable": false

                    },
                    {
                        "data": null,
                        "render": function (data, row) {
                            return "<a href='#' class='text-info ' id='ShowItem' onclick=ShowDetails('" + row.Id + "');><i class='fa fa-eye'></i></a>" +
                                " <a href='#' class='text-primary ' id='ApprovedPO' onclick=ApprovedPO_Details('" + row.Id + "');><i class='fas fa fa-paper-plane'></i></a>"

                        },
                        "orderable": false
                    },
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

function ApprovedPO_Details() {
    $('#procurementRrList').on('click', '#ApprovedPO', function () {

        let data;
        data = rrTable.row($(this).closest('tr')).data();
        window.PPMP_Code_RR = data.PPMPCode;
        $('#assignToSupplier').modal('show');
    })
}

function GetSupplierList() {
    $.ajax({
        type: "POST",
        url: "PPMP_Receiving.aspx/GetSupplierList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            var supplierDdl = $("#ddlSupplier");
            var parseData = JSON.parse(r.d)

            supplierDdl.empty().append('<option selected="selected" value="0">Please select supplier</option>');
            $.each(parseData, function () {
                supplierDdl.append($("<option></option>").val(this['SupplierCode']).html(this['SupplierName']));
            });

        }
    });
}


$('#btnAssignToSupplier').click(function () {

    let supplierCode = $("#ddlSupplier").val();
    sweetAlertConfirmation('Are you sure you want to assign this record to selected supplier?', '', 'question', 'Yes assign it!', 'Data successfully assigned', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_Receiving.aspx/AssignTSupplier',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ code: window.PPMP_Code_RR, supplierCode: supplierCode }),
                success: function () {
                    $('#assignToSupplier').modal('hide');
                    InitializeProcurementData();
                }
            })
        }
    })
})

function ShowDetails() {
    $('#procurementRrList').on('click', '#ShowItem', function () {
        let data;
        data = rrTable.row($(this).closest('tr')).data();
        let code = data.PPMPCode;
        $.ajax({
            url: 'PPMP_Receiving.aspx/GetRrDetails',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ code: code }),
            success: function (data) {
                let result = JSON.parse(data.d);
                rrItemsTable = $('#rrDetails').DataTable({
                    "bDestroy": true,
                    data: result,
                    columns: [

                        {
                            "data": "LineItem",
                            "orderable":false
                        },
                        {
                            "data": "ItemName",
                            "orderable": false
                        },
                        {
                            "data": "UnitOfIssue",
                            "orderable": false
                        },
                        {
                            "data": "Qty",
                            "orderable": false
                        },
                        {
                            "data": "UnitCost",
                            "orderable": false

                        },
                        {
                            "data": "Amount",
                            "orderable": false
                        },
                    ],
                    "paging": true,
                    "lengthChange": false,
                    "searching": false,
                    "ordering": true,
                    "info": true,
                    "autoWidth": false,
                    "responsive": true,
                });
                $('#itemsModal').modal('show');
            }
        })
    })
}

