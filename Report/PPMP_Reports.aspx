<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PPMP_Reports.aspx.cs" Inherits="PPMPS.Report.PPMP_Reports" %>

<asp:Content ID="Styles" ContentPlaceHolderID="globalStyles" runat="server">
</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Report Generation </h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Reports </a></li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <div class="card card-success">
                        <div class="card-header theme-color">
                            <h4 class="card-title mb-1">List of Reports</h4>
                        </div>
                        <div class="card-body">
                            <div class="nav flex-column nav-tabs h-100" id="vert-tabs-tab" role="tablist" aria-orientation="vertical">
                                <a class="nav-link active" id="linkProgram" data-toggle="pill" href="#vert-tabs-home" role="tab" aria-controls="vert-tabs-home" aria-selected="true">Per Program</a>
                                <a class="nav-link" id="linkDistrict" data-toggle="pill" href="#vert-tabs-profile" role="tab" aria-controls="vert-tabs-profile" aria-selected="false">Per District</a>
                                <a class="nav-link" id="linkHealthCenter" data-toggle="pill" href="#vert-tabs-messages" role="tab" aria-controls="vert-tabs-messages" aria-selected="false">Per Health Center</a>
                                <a class="nav-link" id="linkPatient" data-toggle="pill" href="#vert-tabs-settings" role="tab" aria-controls="vert-tabs-settings" aria-selected="false">Per Patient</a>
                                <a class="nav-link" id="linkForecast" data-toggle="pill" href="#vert-tabs-settings" role="tab" aria-controls="vert-tabs-settings" aria-selected="false">Yearly Forecast</a>
                            </div>
                        </div>
                        <div id="sidelistCode">
                            <ul class="list-group list-group-unbordered mb-1" id="ulSidelistCode" style="max-height: 100%;">
                                <li class="list-group-item"></li>
                            </ul>
                        </div>
                    </div>
                </div>



                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header theme-color">
                            <h3 class="card-title">List of Items</h3>
                        </div>
                        <div class="card-body">
                            <div class="col-12 table-responsive">
                                <table class="table table-striped table-responsive-md" id="reportsTable">
                                    <thead>
                                        <tr>
                                            <th>Line #</th>
                                            <th class="program">Program Title</th>
                                            <th class="program">Account Title</th>
                                            <th class="program">Item Name</th>
                                            <th class="program">Unit Of Issue</th>
                                            <th class="program">Qty</th>
                                            <th class="program">Program</th>
                                            <th class="program">Status</th>

                                            <th class="district">Program Title</th>
                                            <th class="district">Account Title</th>
                                            <th class="district">Item Name</th>
                                            <th class="district">Unit Of Issue</th>
                                            <th class="district">Qty</th>
                                            <th class="district">Program</th>
                                            <th class="district">District</th>
                                            <th class="district">Status</th>

                                            <th class="healthCenter">Item Name</th>
                                            <th class="healthCenter">Unit Of Issue</th>
                                            <th class="healthCenter">Qty</th>
                                            <th class="healthCenter">District</th>
                                            <th class="healthCenter">Barangay</th>
                                            <th class="healthCenter">Status</th>

                                            <th class="patientRow">Patient Name</th>
                                            <th class="patientRow">Item Name</th>
                                            <th class="patientRow">Qty</th>
                                            <th class="patientRow">Status</th>

                                            <th class="forecastRow">Item Name</th>
                                            <th class="forecastRow">Year</th>
                                            <th class="forecastRow">Total Qty</th>
                                            <th class="forecastRow">Avg Per Day</th>
                                            <th class="forecastRow">Day Recorded</th>
                                            <th class="forecastRow">Safety Stocks</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-md-6 text-left mt-4">
                                    <a class="btn btn-outline-success" id="btnDownload_Reports" href="#"><i class="fa fa-solid fa-download">&nbsp Download</i></a>
                                </div>
                                <div class="col-md-6 text-right mt-4">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Report/PPMP_Report.js"></script>
</asp:Content>
