var itemTable;
var lastNumber;
var totalUnitCost;
var totalAmount;
var isOnload = false;
window.itemId;
$(document).ready(function () {
    ClearFields();
    isOnload = true;
    Initialize_PPMP_Codes();
    if ($('#status').text() == "") {
        $('#statusTag').hide();
    }

    $('#procurementList').DataTable({});
    $('#addItems').addClass("disable-click");
    $('#postPPMP').addClass("disable-click");
    $('#saveProcurement').addClass("disable-click");
    GetMedicineList();
})

function GetMedicineList() {
    $.ajax({
        type: "POST",
        url: "PPMP_ProcurementPlan.aspx/GetMedicineList",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (r) {
            var medicineDropdown = $("#itemName");
            var parseData = JSON.parse(r.d)

            medicineDropdown.empty().append('<option selected="selected" value="0">Please select</option>');
            $.each(parseData, function () {
                medicineDropdown.append($("<option></option>").val(this['StockNo']).html(this['MedicineName']));
            });

        }
    });
}
function Initialize_PPMP_Codes() {
    $.ajax({
        url: 'PPMP_ProcurementPlan.aspx/GetPPMP_Codes',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: '{}',
        success: function (data) {
            var result = JSON.parse(data.d);
            let code = result[0].PPMPCode

            let array = [];

            for (var i = 0; i < result.length; i++) {
                array.push(result[i].PPMPCode + "," + result[i].DeliverySchedule)
            }

            $('#sidelistCode #ulSidelistCode li').remove();
            $.each(array, function (index, code) {
                var data = code.split(',');
                $('#sidelistCode #ulSidelistCode').append('<li class="list-group-item"><a href="#" class="ppmpCodes"><b>' + data[0] + '</b></a> <span class="float-right"><small>Delivery Date : ' + data[1] + '</small> </span></li>')
            });

            if (isOnload == true) {
                InitHeaders(code);
                isOnload = false;
            }
        }
    });
}
$("#searchPPMPCode").on("keyup", function () {
    var value = this.value.toLowerCase().trim();
    $("#ulSidelistCode li").show().filter(function () {
        return $(this).text().toLowerCase().trim().indexOf(value) == -1;
    }).hide();
});
$('#addProcurement').on('click', function () {
    Action = "Add";
    $.ajax({
        url: 'PPMP_ProcurementPlan.aspx/GetNextPPMPCode',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: '{}',
        success: function (data) {
            var result = JSON.parse(data.d);
            $('#postPPMP').addClass("disable-click");
            $('#printProcurement').addClass("disable-click");
            $('#editProcurement').addClass("disable-click");
            $('#cancelProcurement').removeClass("disable-click");
            $('#saveProcurement').removeClass("disable-click");
            EnableFields();
            $('#PPMPCode').val(result);
        }
    });
});

$('#cancelProcurement').click(function () {
    let code = $('#PPMPCode').val();
    sweetAlertConfirmation('Are you sure you want to cancel this transaction?', '', 'question', 'Yes cancel it!', 'Transaction successfully cancelled', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_ProcurementPlan.aspx/CancelHeader',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ code: code }),
                success: function (data) {
                    var result = JSON.parse(data.d);
                    isOnload = true;
                    InitHeaders(code);
                }
            });
        }
    })
})

$('#editProcurement').click(function () {
    Action = "Edit";
    $("#PPMPCode").prop('disabled', true);
    $("#ProgramTitle").prop('disabled', false);
    $("#AccountTitle").prop('disabled', false);
    $("#Department").prop('disabled', false);
    $("#DeliverySchedule").prop('disabled', false);
    $("#PaymentTerms").prop('disabled', false);
    $("#description").prop('disabled', false);
    $('#postPPMP').removeClass("disable-click");
    $('#printProcurement').addClass("disable-click");
    $('#editProcurement').removeClass("disable-click");
    $('#cancelProcurement').removeClass("disable-click");
    $('#saveProcurement').removeClass("disable-click");
})

$('#saveProcurement').click(function () {
    AddOrEditHeader();
})

$('#postPPMP').click(function () {
    let code = $('#PPMPCode').val();
    let totalCost = $('#totalUnitCost').text();
    let totalAmount = $('#totalAmount').text();
    let totalQty = $('#totalqty').text();
    sweetAlertConfirmation('Are you sure you want to post this transaction?', '', 'question', 'Yes post it!', 'Transaction successfully posted', '', 'success', function (result) {
        if (result == true) {
            $.ajax({
                url: 'PPMP_ProcurementPlan.aspx/UpdateStatus',
                type: 'POST',
                contentType: 'application/json; charset=utf8',
                datatype: 'json',
                data: JSON.stringify({ code: code, totalCost: totalCost, totalAmount: totalAmount, qty: parseInt(totalQty) }),
                success: function (data) {
                    var result = JSON.parse(data.d);
                    isOnload = true;
                    InitHeaders(code);
                }
            });
        }
    })
})

function AddOrEditHeader() {
    let ppmpCode = $('#PPMPCode').val();
    let programTitle = $('#ProgramTitle').val();
    let accountTitle = $('#AccountTitle').val();
    let department = $('#Department').val();
    let deliverySchedule = $('#DeliverySchedule').val();
    let paymentTerms = $('#PaymentTerms').val();
    let description = $('#description').val();

    let _header = {};
    _header.PPMPCode = ppmpCode;
    _header.ProgramTitle = programTitle;
    _header.AccountTitle = accountTitle;
    _header.Department = department;
    _header.DeliverySchedule = deliverySchedule;
    _header.PaymentTerms = paymentTerms;
    _header.Description = description;

    if (Action == "Add") {
        _header.Action = "Add_Header"
        $.ajax({
            url: 'PPMP_ProcurementPlan.aspx/AddorEditHeader',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ model: _header }),
            success: function () {
                $('#lineItem').val('0001');
                $("#lineItem").prop('disabled', true);
                showSweetAlert('success', 'Procurement Plan', 'Successfully saved!');
                $('#itemsModal').modal('show');
                Initialize_PPMP_Codes();
                $('#addItems').removeClass("disable-click");
                $('#postPPMP').removeClass("disable-click");
                $('#saveProcurement').addClass("disable-click");
                $('#editProcurement').removeClass("disable-click");
            }
        })
    } else {
        _header.Action = "Update_Header"
        sweetAlertConfirmation('Are you sure you want to update this transaction?', '', 'question', 'Yes update it!', 'Transaction successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_ProcurementPlan.aspx/AddorEditHeader',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ model: _header }),
                    success: function () {
                        ClearFields();
                        PopuplateDetails();
                    }
                })
            }
        })

    }
}


$('#addItems').click(function () {
    Action = "Add";
    if (lastNumber == "" || lastNumber == undefined) {
        $('#lineItem').val('0001');
        $("#lineItem").prop('disabled', true);
    } else {
        let current = lastNumber;
        current = parseInt(current) + 1;
        $('#lineItem').val(("0000" + current).slice(-4));
        $("#lineItem").prop('disabled', true);
    }
    $('#itemsModal').modal('show');
})


$(document).on('click', '.ppmpCodes', function () {
    let code = $(this).text();
    InitHeaders(code);
});

function InitHeaders(code) {
    $.ajax({
        url: 'PPMP_ProcurementPlan.aspx/GetPPMP_Headers',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ code: code }),
        success: function (data) {
            var result = JSON.parse(data.d);
            ClearFields();
            $('#PPMPCode').val(result[0].PPMPCode);
            $('#ProgramTitle').val(result[0].ProgramTitle);
            $('#AccountTitle').val(result[0].AccountTitle);
            $('#Department').val(result[0].Department);
            $('#DeliverySchedule').val(result[0].DeliverySchedule);
            $('#PaymentTerms').val(result[0].PaymentTerms);
            $('#description').val(result[0].Description);
            $('#status').text(result[0].Status);
            $('#statusTag').show();

            if (result[0].Status == "Received") {
                $('#postPPMP').addClass("disable-click");
                $('#editProcurement').addClass("disable-click");
                $('#cancelProcurement').addClass("disable-click");
                $('#saveProcurement').addClass("disable-click");
                $('#printProcurement').removeClass("disable-click");
                $('#statusTag').removeClass('btn btn-danger btn-block');
                $('#statusTag').removeClass('btn btn-success btn-block');
                $('#statusTag').removeClass('btn btn-info btn-block');
                $('#statusTag').addClass('btn btn-success btn-block');
                $('#addItems').addClass("disable-click");
            } else if (result[0].Status == "Pending") {
                $('#postPPMP').removeClass("disable-click");
                $('#editProcurement').removeClass("disable-click");
                $('#cancelProcurement').removeClass("disable-click");
                $('#saveProcurement').addClass("disable-click");
                $('#printProcurement').removeClass("disable-click");
                $('#statusTag').removeClass('btn btn-danger btn-block');
                $('#statusTag').removeClass('btn btn-info btn-block');
                $('#statusTag').removeClass('btn btn-success btn-block');
                $('#statusTag').addClass('btn btn-warning btn-block');
                if (lastNumber == "" || lastNumber == undefined) {
                    $('#lineItem').val('0001');
                    $("#lineItem").prop('disabled', true);
                } else {
                    let current = lastNumber;
                    current = parseInt(current) + 1;
                    $('#lineItem').val(("0000" + current).slice(-4));
                    $("#lineItem").prop('disabled', true);
                }
                $('#addItems').removeClass("disable-click");
            } else if (result[0].Status == "Cancelled") {
                $('#postPPMP').addClass("disable-click");
                $('#editProcurement').addClass("disable-click");
                $('#cancelProcurement').addClass("disable-click");
                $('#saveProcurement').addClass("disable-click");
                $('#printProcurement').removeClass("disable-click");
                $('#statusTag').removeClass('btn btn-warning btn-block');
                $('#statusTag').removeClass('btn btn-success btn-block');
                $('#statusTag').removeClass('btn btn-info btn-block');
                $('#statusTag').addClass('btn btn-danger btn-block');
                $('#addItems').addClass("disable-click");
            } else if (result[0].Status == "Posted") {
                $('#postPPMP').addClass("disable-click");
                $('#editProcurement').addClass("disable-click");
                $('#cancelProcurement').addClass("disable-click");
                $('#saveProcurement').addClass("disable-click");
                $('#printProcurement').removeClass("disable-click");
                $('#statusTag').removeClass('btn btn-danger btn-block');
                $('#statusTag').removeClass('btn btn-success btn-block');
                $('#statusTag').addClass('btn btn-info btn-block');
                $('#addItems').addClass("disable-click");
            }
            PopuplateDetails(result[0].PPMPCode);
        }
    });
}

function PopuplateDetails(code) {
    let status = $('#status').text();
    $.ajax({
        type: 'POST',
        url: 'PPMP_ProcurementPlan.aspx/GetDetails',
        data: JSON.stringify({ code: code }),
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        success: function (data) {
            var result = JSON.parse(data.d);
            itemTable = $('#procurementList').DataTable({
                "bDestroy": true,
                data: result,
                columns: [

                    {
                        "data": "LineItem",
                        "orderable": false
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
                    {
                        "data": null,
                        "render": function (data, row) {
                            if (status == "Pending") {
                                return "<a href='#' class='text-info' id='EditItem' onclick=EditItemDetails('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                    " <a href='#' class='text-danger' id='DeleteItem' onclick=DeleteItemDetails('" + row.Id + "');><i class='fa fa-times'></i></a>"
                            } else {
                                return "<a href='#' class='text-info disable-click' id='EditItem' onclick=EditItemDetails('" + row.Id + "');><i class='fa fa-edit'></i></a>" +
                                    " <a href='#' class='text-danger disable-click' id='DeleteItem' onclick=DeleteItemDetails('" + row.Id + "');><i class='fa fa-times'></i></a>"
                            }

                        }
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
            GetTotals(code);
        }
    });
}
function EditItemDetails() {
    $('#procurementList').on('click', '#EditItem', function () {
        Action = "Edit";

        let data;
        data = itemTable.row($(this).closest('tr')).data();
        window.itemId = data.Id;
        ClearFieldDetails();

        $('#lineItem').val(data.LineItem);
        $('#itemName').val(data.StockNo);
        $('#unitOfIssue').val(data.UnitOfIssue);
        $('#qty').val(data.Qty);
        $('#unitOfCost').val(data.UnitCost);
        $('#amount').val(data.Amount);

        $('#itemsModal').modal('show');
    })
}
function DeleteItemDetails() {
    $('#procurementList').on('click', '#DeleteItem', function () {
        Action = "Edit";

        let data;
        data = itemTable.row($(this).closest('tr')).data();
        window.itemId = data.Id;
        let code = $('#PPMPCode').val();
        sweetAlertConfirmation('Are you sure you want to delete this item?', '', 'question', 'Yes delete it!', 'Item successfully deleted', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_ProcurementPlan.aspx/DeleteDetails',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ code: code, lineNo: data.LineItem }),
                    success: function () {
                        ClearFieldDetails();
                        PopuplateDetails(code);
                        $('#itemsModal').modal('hide');
                        $('#addItems').removeClass("disable-click");
                    }
                })
            }
        })
    })
}
function GetTotals(code) {
    $.ajax({
        url: 'PPMP_ProcurementPlan.aspx/GetTotals',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        data: JSON.stringify({ code: code }),
        success: function (data) {
            var result = JSON.parse(data.d);
            $('#totalUnitCost').text(result[0].Total);
            $('#totalAmount').text(result[1].Total);
            $('#totalqty').text(result[2].Total);
        }
    });
}

function ClearFields() {
    $('#PPMPCode').val('');
    $("#PPMPCode").prop('disabled', true);

    $('#ProgramTitle').val('');
    $("#ProgramTitle").prop('disabled', true);

    $('#AccountTitle').val('');
    $("#AccountTitle").prop('disabled', true);

    $('#Department').val('');
    $("#Department").prop('disabled', true);

    $('#DeliverySchedule').val('');
    $("#DeliverySchedule").prop('disabled', true);

    $('#PaymentTerms').val(0);
    $("#PaymentTerms").prop('disabled', true);

    $('#description').val('');
    $("#description").prop('disabled', true);

    $('#totalUnitCost').text('');
    $('#totalAmount').text('');
    $('#totalQty').text('');
    $("#statusTag").hide();
}

function EnableFields() {
    $('#PPMPCode').val('');
    $("#PPMPCode").prop('disabled', true);

    $('#ProgramTitle').val('');
    $("#ProgramTitle").prop('disabled', false);

    $('#AccountTitle').val('');
    $("#AccountTitle").prop('disabled', false);

    $('#Department').val('');
    $("#Department").prop('disabled', false);

    $('#DeliverySchedule').val('');
    $("#DeliverySchedule").prop('disabled', false);

    $('#PaymentTerms').val(0);
    $("#PaymentTerms").prop('disabled', false);

    $('#description').val('');
    $("#description").prop('disabled', false);

    $('#totalUnitCost').text('');
    $('#totalAmount').text('');
    $('#totalqty').text('');
    $("#statusTag").hide();

    $('#procurementList').dataTable().fnClearTable();
}

function DisabledField() {
    $('#PPMPCode').val('');
    $("#PPMPCode").prop('disabled', true);

    $('#ProgramTitle').val('');
    $("#ProgramTitle").prop('disabled', true);

    $('#AccountTitle').val('');
    $("#AccountTitle").prop('disabled', true);

    $('#Department').val('');
    $("#Department").prop('disabled', true);

    $('#DeliverySchedule').val('');
    $("#DeliverySchedule").prop('disabled', true);

    $('#PaymentTerms').val(0);
    $("#PaymentTerms").prop('disabled', true);

    $('#description').val('');
    $("#description").prop('disabled', true);

    $('#totalUnitCost').text('');
    $('#totalAmount').text('');
    $('#totalqty').text('');
    $("#statusTag").hide();

    $('#procurementList').dataTable().fnClearTable();
}

$('#saveItems').click(function () {
    AddOrEditDetails();
})

function AddOrEditDetails() {
    let ppmpCode = $('#PPMPCode').val();
    let lineItem = $('#lineItem').val();
    let itemName = $('#itemName').val();
    let unitOfIssue = $('#unitOfIssue').val();
    let qty = $('#qty').val();
    let unitOfCost = $('#unitOfCost').val();
    let amount = $('#amount').val();


    let _details = {};
    _details.PPMPCode = ppmpCode;
    _details.LineItem = lineItem;
    _details.StockNo = itemName;
    _details.UnitOfIssue = unitOfIssue;
    _details.Qty = qty;
    _details.UnitCost = unitOfCost;
    _details.Amount = amount;

    if (Action == "Add") {
        _details.Action = "Add"
        $.ajax({
            url: 'PPMP_ProcurementPlan.aspx/AddorEditDetails',
            type: 'POST',
            contentType: 'application/json; charset=utf8',
            datatype: 'json',
            data: JSON.stringify({ model: _details }),
            success: function () {
                lastNumber = _details.LineItem;
                ClearFieldDetails();
                $('#addItems').show();
                PopuplateDetails(_details.PPMPCode);
                showSweetAlert('success', 'Item', 'Successfully saved!');
                $('#itemsModal').modal('hide');
            }
        })
    } else {
        _details.Id = window.itemId;
        _details.Action = "Edit"
        sweetAlertConfirmation('Are you sure you want to update this item?', '', 'question', 'Yes update it!', 'Item successfully updated', '', 'success', function (result) {
            if (result == true) {
                $.ajax({
                    url: 'PPMP_ProcurementPlan.aspx/AddorEditDetails',
                    type: 'POST',
                    contentType: 'application/json; charset=utf8',
                    datatype: 'json',
                    data: JSON.stringify({ model: _details }),
                    success: function () {
                        ClearFieldDetails();
                        PopuplateDetails(_details.PPMPCode);
                        $('#itemsModal').modal('hide');
                    }
                })
            }
        })

    }
}
function ClearFieldDetails() {
    $('#lineItem').val('');
    $('#itemName').val('');
    $('#unitOfIssue').val('');
    $('#qty').val('');
    $('#unitOfCost').val('');
    $('#amount').val('');
}

// Printing
$("#printButton").click(function () {
    // Clone the section and remove buttons
    var contentSection = $(".content").clone();
    contentSection.find(".btn").remove();

    // Iterate over input fields and append their values to the cloned section
    contentSection.find("input").each(function () {
        var $this = $(this);
        $this.attr("value", $this.val());
    });

//    // Create a new window and print the cloned section
//    var printWindow = window.open('', '_blank');
//    printWindow.document.body.innerHTML = contentSection[0].outerHTML;
//    printWindow.print();
//});


// Add a click event handler to the print button
$("#printButton").click(function () {
    // remove action column
    $('#procurementList').DataTable().column(6).visible(false);

    window.print();

    // restore the action column
    $('#procurementList').DataTable().column(6).visible(true);
});
