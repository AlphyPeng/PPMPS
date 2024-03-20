var headerList = [];
var qtyList = [];

$(document).ready(function () {
    GetTotalCount();
    InitializeGrapPerPrograms();
    InitializeGrapPerDistrict();
    InitializeGrapPerHealthCenter();
    InitializeGrapPerPatient();
})

function InitializeGrapPerPrograms() {

    let _home = {};
    _home.Action = 'PROGRAM';

    headerList = [];
    qtyList = [];

    $.ajax({
        url: 'Home.aspx/GraphGeneration',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        async: false,
        data: JSON.stringify({ homeModel: _home }),
        success: function (data) {
            let result = JSON.parse(data.d);
            for (index = 0; index < result.length; index++) {
                headerList.push(result[index].Program);
                qtyList.push(result[index].Qty);
            }
        }
    });

    let ctx = $('#allocationPerProgramsChart').get(0).getContext("2d");
    new Chart(
        ctx,
        {
            type: 'horizontalBar',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            callback: function (label) {
                                if (/\s/.test(label)) {
                                    return label.split(" ");
                                }
                                else {
                                    return label;
                                }
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            },
            data: {
                labels: headerList,
                datasets: [
                    {
                        label: "Qty",
                        backgroundColor: "#17a2b8",
                        data: [qtyList[0], qtyList[1], qtyList[2], qtyList[3], qtyList[4], qtyList[5], qtyList[6], qtyList[7], qtyList[8],
                        qtyList[9], qtyList[10], qtyList[11], qtyList[12], qtyList[13], qtyList[14]],
                        barThickness: 15,
                    },
                ],
            }
        }
    );
}


function InitializeGrapPerDistrict() {
    let _home = {};
    _home.Action = 'DISTRICT';

    headerList = [];
    qtyList = [];

    $.ajax({
        url: 'Home.aspx/GraphGeneration',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        async: false,
        data: JSON.stringify({ homeModel: _home }),
        success: function (data) {
            let result = JSON.parse(data.d);
            for (index = 0; index < result.length; index++) {
                headerList.push(result[index].District);
                qtyList.push(result[index].Qty);
            }
        }
    });

    let ctx = $('#allocationPerDistictChart').get(0).getContext("2d");
    new Chart(
        ctx,
        {
            type: 'bar',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            min: 0,
                            callback: function (label) {
                                if (/\s/.test(label)) {
                                    return label.split(" ");
                                }
                                else {
                                    return label;
                                }
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            },
            data: {
                labels: headerList,
                datasets: [
                    {
                        label: "Qty",
                        backgroundColor: "#28a745",
                        data: [qtyList[0], qtyList[1], qtyList[2], qtyList[3], qtyList[4], qtyList[5], qtyList[6], qtyList[7], qtyList[8],
                        qtyList[9], qtyList[10], qtyList[11], qtyList[12], qtyList[13], qtyList[14]],
                        barThickness: 15,
                    },
                ],
            }
        }
    );
}


function InitializeGrapPerHealthCenter() {
    let _home = {};
    _home.Action = 'HEALTHCENTER';

    headerList = [];
    qtyList = [];

    $.ajax({
        url: 'Home.aspx/GraphGeneration',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        async: false,
        data: JSON.stringify({ homeModel: _home }),
        success: function (data) {
            let result = JSON.parse(data.d);
            for (index = 0; index < result.length; index++) {
                headerList.push(result[index].District);
                qtyList.push(result[index].Qty);
            }
        }
    });

    let ctx = $('#allocationPerHealthCenterChart').get(0).getContext("2d");
    new Chart(
        ctx,
        {
            type: 'horizontalBar',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function (label) {
                                if (/\s/.test(label)) {
                                    return label.split(" ");
                                }
                                else {
                                    return label;
                                }
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            },
            data: {
                labels: headerList,
                datasets: [
                    {
                        label: "Qty",
                        backgroundColor: "#ffc107",
                        data: [qtyList[0], qtyList[1], qtyList[2], qtyList[3], qtyList[4], qtyList[5], qtyList[6], qtyList[7], qtyList[8],
                        qtyList[9], qtyList[10], qtyList[11], qtyList[12], qtyList[13], qtyList[14]],
                        barThickness: 15,
                    },
                ],
            }
        }
    );

}


function InitializeGrapPerPatient() {
    let _home = {};
    _home.Action = 'PATIENT';

    headerList = [];
    qtyList = [];

    $.ajax({
        url: 'Home.aspx/GraphGeneration',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        async: false,
        data: JSON.stringify({ homeModel: _home }),
        success: function (data) {
            let result = JSON.parse(data.d);
            for (index = 0; index < result.length; index++) {
                headerList.push(result[index].District);
                qtyList.push(result[index].Qty);
            }
        }
    });

    let ctx = $('#allocationPerPatientChart').get(0).getContext("2d");
    new Chart(
        ctx,
        {
            type: 'horizontalBar',
            options: {
                animation: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function (label) {
                                if (/\s/.test(label)) {
                                    return label.split(" ");
                                }
                                else {
                                    return label;
                                }
                            },
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 100
                        }
                    }]
                }
            },
            data: {
                labels: headerList,
                datasets: [
                    {
                        label: "Qty",
                        backgroundColor: "#dc3545",
                        data: [qtyList[0], qtyList[1], qtyList[2], qtyList[3], qtyList[4], qtyList[5], qtyList[6], qtyList[7], qtyList[8],
                        qtyList[9], qtyList[10], qtyList[11], qtyList[12], qtyList[13], qtyList[14]],
                        barThickness: 15,
                    },
                ],
            }
        }
    );
}

function GetTotalCount() {

    let _home = {};
    _home.Action = 'TOTAL';

    $.ajax({
        url: 'Home.aspx/GetTotals',
        type: 'POST',
        contentType: 'application/json; charset=utf8',
        datatype: 'json',
        async: false,
        data: JSON.stringify({ homeModel: _home }),
        success: function (data) {
            let result = JSON.parse(data.d);

            $('#header_PerProgram').text(result[0].Qty);
            $('#header_PerDistrict').text(result[1].Qty);
            $('#header_PerHealthCenter').text(result[2].Qty);
            $('#header_PerPatient').text(result[3].Qty);

        }
    });
}