﻿<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PPMP_AllocationPerHealthCenter.aspx.cs" Inherits="PPMPS.Transaction.PPMP_AllocationPerHealthCenter" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Allocation per Health Center</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Transaction / Allocation per Health Center </a></li>
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
                        <h4 class="card-title mb-1">List of PPMP Codes</h4>
                    </div>
                    <div class="card-body box-profile">
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="radio1" id="rdPending_allocationPerHealthCenter" value="Pending">
                                        <label class="form-check-label">Pending</label>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="radio1" id="rdApproved_allocationHealthCenter" value="Approved">
                                        <label class="form-check-label">Approved</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input class="form-control form-control-sidebar mb-2" id="searchPPMPCode_allocationPerHealthCenter" type="text" placeholder="Enter PPMP Code" aria-label="Search">
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
                        <h3 class="card-title">List of Health Center</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="PPMPCode">PPMP Code</label>
                                            <input type="text" class="form-control" id="PPMPCode_AllocPerHealthCenter" readonly />
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="ProgramTitle">Program Title</label>
                                            <input type="text" class="form-control" id="ProgramTitle_AllocPerHealthCenter"readonly />
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="AccountTitle">Account Title</label>
                                            <input type="text" class="form-control" id="AccountTitle_AllocPerHealthCenter" readonly/>
                                        </div>
                                    </div>
                                   
                                </div>

                            </div>
                            
                        </div>

                        <div class="col-12 table-responsive">
                            <table class="table table-striped table-responsive-md" id="HealthCenterAllocationList">
                                <thead>
                                    <tr>
                                        <th>Line #</th>
                                        <th>Item Name</th>
                                        <th>Unit of Issue</th>
                                        <th>Qty</th>
                                        <th>Health Center</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-md-6 text-left mt-4">
                                <a class="btn btn-outline-success disable-click" id="btnPostAllocation_HealthCenter" href="#"><i class="fa fa-solid fa-thumbs-o-up">Approve</i></a>
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

    <div class="modal fade" id="HealthCenterModal" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title" id="ModalTitle">Health Care Allocation</h5>
                    <button type="button" class="close" id="closeHealthCenterModal" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <label for="spnPrescriptionName">Item Name</label>                          
                        </div>
                        <div class="col-md-1">
                            <span>:</span> 
                        </div>
                        <div class="col-md-8">
                            <span id="spnPrescriptionName"></span>&nbsp;<span id="spnUnitOfIssue"></span>
                        </div>
                        <div class="col-md-3">
                            <label for="spnQuantity">Quantity</label> 
                        </div>
                        <div class="col-md-1">
                            <span>:</span>
                        </div>
                        <div class="col-md-8">
                            <span id="spnQuantity"></span>
                        </div>
                        <div class="col-md-3">
                            <label for="spnProgram">Program</label>
                        </div>
                        <div class="col-md-1">
                            <span>:</span>
                        </div>
                        <div class="col-md-8">
                            <span id="spnProgram"></span>
                        </div>
                        <div class="col-md-3">
                            <label for="ddlDistrict">Assign To</label> 
                        </div>
                        <div class="col-md-1">
                            <span>:</span>
                        </div>

                        <div class="col-md-8">
                            <div class="form-group">
                                <select class="form-control" id="selectDistrict">
                                </select>
                            </div>
                        </div>
                            
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Cancel</i></button>
                    <a class="btn btn-primary" id="btnSaveHealthCenterAllocation" href="#"><i class="fa fa-save">&nbsp Save</i></a>
                </div>

            </div>


        </div>

    </div>


</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Transaction/PPMP_AllocationPerHealthCenter.js"></script>
</asp:Content>
