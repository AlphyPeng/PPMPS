
<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PPMP_ProcurementPlan.aspx.cs" Inherits="PPMPS.Transaction.PPMP_ProcurementPlan" %>

<asp:Content ID="Styles" ContentPlaceHolderID="globalStyles" runat="server">
</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
        <style>
   @media print {
       body {
           -webkit-print-color-adjust: exact;
               background-color: white;
       }
       #cardPrint, .content{
           background-color: white;
           border-color: white !important;
       }
         .dataTables_wrapper .dataTables_paginate .paginate_button.previous,
            .dataTables_wrapper .dataTables_paginate .paginate_button.next,
            .dataTables_wrapper .dataTables_paginate {
                display: none !important;
            }
        @page {
        size: landscape;
              margin: 10px 0; 
        }
            #printButton,
            #addItems,
            #addProcurement,
            #editProcurement,
            #cancelProcurement,
            #saveProcurement,
            #postPPMP,
            #procurementTitle,
            #listPPMP{
            display: none;
        }
    }
</style>

    <div class="content-header" id="procurementTitle">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                     <h3 class="m-0 font-weight-bold">Procurement</h3>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#" class="font-italic">Transaction / Procurement</a></li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 col" id="listPPMP">
                    <div class="card card-success">
                        <div class="card">
                            <div class="card-header theme-color">
                                <h4 class="card-title mb-1">List of PPMP Codes</h4>
                            </div>
                        </div>
                        <div class="card-body box-profile">

                            <input class="form-control form-control-sidebar mb-2" id="searchPPMPCode" type="text" placeholder="Search by PPMP Code" aria-label="Search">
                            <div id="sidelistCode">
                                <ul class="list-group list-group-unbordered mb-1" id="ulSidelistCode" style="max-height: 100%;">
                                    <li class="list-group-item"></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>


                <div class="col-md-9 col-12" id="cardPrint">
                    <div class="card">
                        <div class="card-header theme-color">
                            <h5 class="card-title">List of Procuments</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-9 col-9">
                                    <div class="row">
                                        <div class="col-md-6 col-6">
                                            <div class="form-group">
                                                <label for="PPMPCode">PPMP Code</label>
                                                <input type="text" class="form-control" id="PPMPCode" readonly />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-6">
                                            <div class="form-group">
                                                <label for="ProgramTitle">Program Title</label>
                                                <input type="text" class="form-control" id="ProgramTitle" placeholder="Enter program title" />
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-6">
                                            <div class="form-group">
                                                <label for="AccountTitle">Account Title</label>
                                                <input type="text" class="form-control" id="AccountTitle" placeholder="Enter account title" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-6">
                                            <div class="form-group">
                                                <label for="Department">Department</label>
                                                <input type="text" class="form-control" id="Department" placeholder="Enter department title" />
                                            </div>
                                        </div>

                                        <div class="col-md-6 col-6">
                                            <div class="form-group">
                                                <label for="DeliverySchedule">Delivery Schedule</label>
                                                <input type="date" class="form-control" id="DeliverySchedule" />
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-6">
                                            <div class="form-group">
                                                <label for="PaymentTerms">Payment Terms</label>
                                                <select id="PaymentTerms" class="form-control">
                                                    <option value="0">Please select terms</option>
                                                    <option value="Cash">Cash</option>
                                                    <option value="Card">Card</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="col-md-12 col-12">
                                            <div class="form-group">
                                                <label for="description">Description</label>
                                                <textarea class="form-control" rows="3" id="description" placeholder="Enter description"></textarea>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="col-md-3 col-3">
                                    <div class="card card-success card-outline" id="summaryCard">
                                        <div class="card-body box-profile">
                                            <h3 class="profile-username text-center">Summary</h3>
                                            <ul class="list-group list-group-unbordered mb-3">
                                                <li class="list-group-item">
                                                    <b>Total Amount</b> <a class="float-right"><span id="totalAmount"></span></a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Total Unit Cost</b> <a class="float-right"><span id="totalUnitCost"></span></a>
                                                </li>
                                                <li class="list-group-item">
                                                    <b>Total Qty</b> <a class="float-right"><span id="totalqty"></span></a>
                                                </li>
                                            </ul>

                                            <a href="#" id="statusTag" class="btn btn-primary btn-block"><b><span id="status"></span></b></a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 table-responsive">
                                <div class="text-left mb-2">
                                    <a class="btn bg-gradient-primary" id="addItems" href="#"><i class="fa fa-solid fa-plus">&nbsp Add Items</i></a>
                                </div>
                                <table class="table table-bordered table-hover dataTable dtr-inline" id="procurementList">
                                    <thead>
                                        <tr>
                                            <th>Line #</th>
                                            <th>Medicine Name</th>
                                            <th>Unit of Issue</th>
                                            <th>Qty</th>
                                            <th>Unit Cost</th>
                                            <th>Amount</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-md-6 text-left mt-4">
                                    <a class="btn bg-gradient-success" id="postPPMP" href="#"><i class="fa fa-solid fa-paper-plane">&nbsp Post</i></a>
                                       <button class="btn bg-gradient-info" id="printButton">Print Section</button>

                                </div>
                                <div class="col-md-6 text-right mt-4">
                                    <a class="btn bg-gradient-primary" id="addProcurement" href="#"><i class="fa fa-solid fa-plus">&nbsp Add</i></a>
                                    <a class="btn bg-gradient-info" id="editProcurement" href="#"><i class="fa fa-solid fa-pen">&nbsp Edit</i></a>
                                    <a class="btn bg-gradient-danger" id="cancelProcurement" href="#"><i class="fa fa-times">&nbsp Cancel</i></a>
                                    <a class="btn bg-gradient-success" id="saveProcurement" href="#"><i class="fa fa-save">&nbsp Save</i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="modal fade" id="itemsModal" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title" id="ModalTitle">Add Items</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="lineItem">Line #</label>
                                <input type="text" class="form-control" id="lineItem" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="itemName">Medicine Name <span class="text-danger">*</span></label>
                                    <select class="form-control" id="itemName" >
                                        <option value="0">Please select medicine</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="unitOfIssue">Unit of Issue</label>
                                <input type="text" class="form-control" id="unitOfIssue" placeholder="Enter unit of Issue" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="qty">Qty</label>
                                <input type="number" class="form-control" id="qty" placeholder="Enter qty" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="unitOfCost">Unit of Cost</label>
                                <input type="number" class="form-control" id="unitOfCost" placeholder="Enter unit of cost" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="amount">Amount</label>
                                <input type="number" class="form-control" id="amount" placeholder="Enter amount" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Cancel</i></button>
                    <a class="btn btn-primary" id="saveItems" href="#"><i class="fa fa-save">&nbsp Save changes</i></a>
                </div>
            </div>
        </div>
    </div>


</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Transaction/PPMP_ProcurementPlan.js"></script>
</asp:Content>
