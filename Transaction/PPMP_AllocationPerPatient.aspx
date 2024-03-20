<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PPMP_AllocationPerPatient.aspx.cs" Inherits="PPMPS.Transaction.PPMP_AllocationPerPatient" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Allocation per Patient</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Transaction / Allocation per Patient </a></li>
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
                            <h4 class="card-title mb-1">List of Transaction Code</h4>
                        </div>
                        <div class="card-body box-profile">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio1" id="rdPending_allocationPerPatient" value="Pending">
                                            <label class="form-check-label">Pending</label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio1" id="rdApproved_allocationPerPatient" value="Approved">
                                            <label class="form-check-label">Approved</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input class="form-control form-control-sidebar mb-2" id="searchTransactionCode_allocationPerpatient" type="text" placeholder="Enter Transaction Code" aria-label="Search">
                            <div id="sidelistCode">
                                <ul class="list-group list-group-unbordered mb-1" id="ulSidelistCode" style="max-height: 100%;">
                                    <li class="list-group-item"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header theme-color">
                            <h3 class="card-title">Patient Information</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="row">
                                                <div class="col-sm-12 float-sm-right">
                                                    <label for="TransactionCode">Transaction Code</label>
                                                    <input type="text" class="form-control" id="transactionCode" readonly />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="FullName">Full Name</label>
                                                <input type="text" class="form-control" id="fullName" readonly />
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="ContactNo">Contact No.</label>
                                                <input type="text" class="form-control" id="contactNo" readonly />
                                            </div>
                                        </div>

                                        <div class="col-md-8">
                                            <div class="form-group">
                                                <label for="address">Address</label>
                                                <textarea class="form-control" rows="3" id="address" readonly></textarea>
                                            </div>
                                        </div>

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="remarks">Remarks</label>
                                                <textarea class="form-control" rows="3" id="remarks"></textarea>
                                            </div>
                                        </div>
                                        <input type="text" class="form-control" id="txtdistrictId" hidden readonly />
                                        <input type="text" class="form-control" id="txtbrgyId" hidden readonly />
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12 text-left mt-4 mb-4">
                                <div class="row mb-12">
                                    <div class="col-sm-8">
                                        <a class="btn btn-outline-success" id="AddMedicine" href="#"><i class="fa fa-solid fa-plus-square">&nbsp Add Medicine</i></a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 table-responsive">
                                <table class="table table-striped table-responsive-md" id="xMedicineList">
                                    <thead>
                                        <tr>
                                            <th>Medicine Name</th>
                                            <th>Qty</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-md-6 text-left mt-4">
                                    <a class="btn bg-gradient-success" id="postPatient" href="#"><i class="fa fa-solid fa-paper-plane">&nbsp Post</i></a>
                                </div>
                                <div class="col-md-6 text-right mt-4">
                                    <a class="btn bg-gradient-primary" id="addPatient" href="#"><i class="fa fa-solid fa-plus">&nbsp Add</i></a>
                                    <a class="btn bg-gradient-info" id="editPatient" href="#"><i class="fa fa-solid fa-pen">&nbsp Edit</i></a>
                                    <a class="btn bg-gradient-danger" id="cancelPatient" href="#"><i class="fa fa-times">&nbsp Cancel</i></a>
                                    <a class="btn bg-gradient-success" id="savePatient" href="#"><i class="fa fa-save">&nbsp Save</i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="modal fade" id="MedicineModal" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title" id="ModalTitle">Medicine</h5>
                    <button type="button" class="close" id="closemedicineAllocationPerDistrictModal" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="ddlMedicine">Select Medicine <span class="text-danger"> *</span></label>
                                <select class="form-control" id="ddlMedicine" name="ddlMedicine">
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="txtQty">Quantity</label>
                                <input type="text" class="form-control" id="txtQty" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Cancel</i></button>
                    <a class="btn btn-primary" id="SaveMedicine" href="#"><i class="fa fa-save">&nbsp Save</i></a>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="xPatientModal" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title">Patient Information</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <table class="table table-striped table-responsive-md" id="xpatientList">
                            <thead>
                                <tr>
                                    <th>Patient Name</th>
                                    <th>District</th>
                                    <th>Barangay</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Close</i></button>
                </div>
            </div>
        </div>
    </div>



</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Transaction/PPMP_AllocationPerPatient.js"></script>
</asp:Content>
