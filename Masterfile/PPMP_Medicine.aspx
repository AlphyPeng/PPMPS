<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PPMP_Medicine.aspx.cs" Inherits="PPMPS.Masterfile.PPMP_Medicine" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 font-weight-bold">Medicine Management</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#" class="font-italic">Maintenance / Medicine</a></li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card ">
                        <div class="card-header theme-color">
                            <h3 class="card-title">List of Medicines</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <a class="btn btn-primary float-right mb-4" id="btnAddMedicine" href="#"><i class="fa fa-plus">&nbsp Add Medicine</i></a>
                                </div>
                                <div class="col-12 table-responsive">
                                    <table class="table table-striped table-responsive-md" id="medicineList">
                                        <thead>
                                            <tr>
                                                <th>Stock Number</th>
                                                <th>Batch/Lot Number</th>
                                                <th>Brand</th>
                                                <th>Medicine Name</th>
                                                <th>Description</th>
                                                <th>Unit</th>
                                                <th>ThresHold</th>
                                                <th>Quantity</th>
                                                <th>Expiry Date</th>
                                                <th>Remarks</th>
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
        </div>
    </section>

    <div class="modal fade" id="medicineModal" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title" id="ModalTitle">Medicine Information</h5>
                    <button type="button" class="close" id="closeMedicineModal" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <label>Stock Number <span class="text-danger"> *</span></label>
                            <div class="form-group">
                                <input class="form-control" id="txtStockNo_Medicine" type="text" readonly />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Batch/Lot Number <span class="text-danger"> *</span></label>
                            <div class="form-group">
                                <input class="form-control" id="txtBatchNo_Medicine" type="text" placeholder="Batch Number" autocomplete="off" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Brand <span class="text-danger"> *</span></label>
                            <div class="form-group">
                                <input class="form-control" id="txtBrand_Medicine" type="text" placeholder="Brand"  autocomplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Medicine Name <span class="text-danger"> *</span></label>
                            <div class="form-group">
                                <input class="form-control" id="txtMedicineName_Medicine" type="text" placeholder="Medicine Name"  autocomplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Unit <span class="text-danger"> *</span></label>
                            <div class="form-group">
                                <input class="form-control" id="txtUnit_Medicine" type="text" placeholder="Unit"  autocomplete="off" />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Quantity <span class="text-danger"> *</span></label>
                            <div class="form-group">
                                <input class="form-control" id="txtQty_Medicine" type="number" placeholder="Quantity"  autocomplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Expiry Date <span class="text-danger"> *</span></label>
                            <div class="form-group">
                                <input class="form-control" type="date" id="expiryDate_Medicine"  autocomplete="off"/>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <label>Description</label>
                            <div class="form-group">
                                <textarea class="form-control text-break" id="txtDescription_Medicine" rows="3" placeholder="Description"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label>Remarks</label>
                            <div class="form-group">
                                <textarea class="form-control text-break" id="txtRemarks_Medicine" rows="3" placeholder="Remarks"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Cancel</i></button>
                    <a class="btn btn-success" id="saveMedicine" href="#"><i class="fa fa-save">&nbsp Save</i></a>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Masterfile/PPMP_Medicine.js"></script>
</asp:Content>
