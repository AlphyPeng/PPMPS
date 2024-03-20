<%@ Page Title="Patient Registration" MasterPageFile="~/Site.Master" Language="C#" AutoEventWireup="true" CodeBehind="PPMP_PatientInfo.aspx.cs" Inherits="PPMPS.Masterfile.PPMP_PatientInfo" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 font-weight-bold">Patient Management</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#" class="font-italic">Maintenance / Patient</a></li>
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
                            <h3 class="card-title">List of Patients</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <a class="btn btn-primary float-right mb-4" id="btnAddPatient" href="#"><i class="fa fa-plus">&nbsp Add Patient</i></a>
                                </div>
                                <div class="col-12 table-responsive">
                                    <table class="table table-striped table-responsive-md" id="patientList">
                                        <thead>
                                            <tr>
                                                <th>Patient Name</th>
                                                <th>Birthdate</th>
                                                <th>Contact No</th>
                                                <th>E-mail</th>
                                                <th>Address</th>
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

    <div class="modal fade" id="patientModal" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title" id="ModalTitle">Patient Information</h5>
                    <button type="button" class="close" id="closePatientModal" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label>Patient's Name <span class="text-danger">*</span></label>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input class="form-control" id="txtLastName_Patient" type="text" placeholder="Last Name" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input class="form-control" id="txtFirstName_Patient" type="text" placeholder="First Name" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input class="form-control" id="txtMiddleName_Patient" type="text" placeholder="Middle Name" autocomplete="off" />
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div class="col-md-4">
                            <label>Contact No<span class="text-danger">*</span></label>
                            <div class="form-group">
                                <input class="form-control" type="number" id="txtContactNo_Patient" placeholder="09XXXXXXXXX" autocomplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Date of Birth<span class="text-danger">*</span></label>
                            <div class="form-group">
                                <input class="form-control" type="date" id="birthDate_Patient" autocomplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>E-mail Address</label>
                            <div class="form-group">
                                <input class="form-control" type="text" id="txtEmail_Patient" placeholder="example@example.com" autocomplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>District *</label>
                            <div class="form-group">
                                <select class="form-control" id="selectDistrict">
                                    <option value="0" hidden>Select a District</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label>Barangay *</label>
                            <div class="form-group">
                                <select class="form-control" id="selectBrgy" disabled>
                                    <option value="0" hidden>Select a Barangay</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <label>Address *</label>
                            <div class="form-group">
                                <textarea class="form-control text-break" id="txtAddress" rows="3" placeholder="House No., Subdivision, Street Name" autocomplete="off"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Cancel</i></button>
                     <a class="btn btn-success" id="btnSavePatient" href="#"><i class="fa fa-save">&nbsp Save</i></a>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Masterfile/PPMP_Patient.js"></script>
</asp:Content>
