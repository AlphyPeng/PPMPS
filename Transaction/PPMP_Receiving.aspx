<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PPMP_Receiving.aspx.cs" Inherits="PPMPS.Transaction.PPMP_Receiving" %>

<asp:Content ID="Styles" ContentPlaceHolderID="globalStyles" runat="server">
</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 font-weight-bold">Receiving</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#" class="font-italic">Transaction / Receiving</a></li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header theme-color">
                            <h3 class="card-title">List of Procurements</h3>
                        </div>
                        <div class="card-body">
                            <div class="col-12 table-responsive">
                                <table class="table table-bordered table-hover dataTable dtr-inline" id="procurementRrList">
                                    <thead>
                                        <tr>
                                            <th>PPMP Code</th>
                                            <th>Program Title</th>
                                            <th>Account Title</th>
                                            <th>Department</th>
                                            <th>Deliver Schedule</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="modal fade" id="itemsModal" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title" id="ModalTitle">Procurement Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-bordered table-hover dataTable dtr-inline" id="rrDetails">
                        <thead>
                            <tr>
                                <th>Line #</th>
                                <th>Medicine Name</th>
                                <th>Unit Of Issue</th>
                                <th>Qty</th>
                                <th>Unit Cost</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Close</i></button>
                </div>
            </div>
        </div>
    </div>

     <div class="modal fade" id="assignToSupplier" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
     <div class="modal-dialog modal-md" role="document">
         <div class="modal-content">
             <div class="modal-header theme-color">
                 <h5 class="modal-title" >Assign Procurement</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                 </button>
             </div>
             <div class="modal-body">
                 <div class="form-group">
                     <div class="form-group">
                         <label for="ddlSupplier">Select Supplier <span class="text-danger">*</span></label>
                         <select class="form-control" id="ddlSupplier">
                             <option value="0">Please select supplier</option>
                         </select>
                     </div>
                 </div>
             </div>
             <div class="modal-footer">
                 <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Close</i></button>
                 <a class="btn btn-success" id="btnAssignToSupplier" href="#"><i class="fa fa-save">&nbsp Assign</i></a>
             </div>
         </div>
     </div>
 </div>
</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Transaction/PPMP_ProcurementReceiving.js"></script>
</asp:Content>
