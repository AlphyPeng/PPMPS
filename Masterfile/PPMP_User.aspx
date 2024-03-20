<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Site.Master" CodeBehind="PPMP_User.aspx.cs" Inherits="PPMPS.Masterfile.PPMP_User" %>

<asp:Content ID="Styles" ContentPlaceHolderID="globalStyles" runat="server">
</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 font-weight-bold">User Management</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#" class="font-italic">Maintenance / Users</a></li>
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
                            <h3 class="card-title">List of Users</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <a class="btn btn-primary float-right mb-4" id="CreateUser" href="#"><i class="fa fa-plus">&nbsp Create User</i></a>
                                </div>
                                <div class="col-12 table-responsive">
                                    <table class="table table-striped table-responsive-md" id="userList">
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Roles</th>
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

    <div class="modal fade" id="userModal" data-backdrop="static" data-keyword="false" style="overflow: hidden;" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title" id="ModalTitle">User Information</h5>
                    <button type="button" class="close" id="closeUserModal" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="userName">User Name <span class="text-danger"> *</span></label>
                                <input type="text" class="form-control" id="userName" placeholder="Enter user name" autoComplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="userDescription">Select Roles <span class="text-danger"> *</span></label>
                                <select id="ddlRoles" class="form-control"  data-placeholder="Select a role" style="width: 100%;" >
                                    <option value="0">Please select roles</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input hidden />
                            </div>
                        </div>

                          <div class="col-md-6">
                              <div class="form-group">
                                  <label for="districtsDropdown">District</label>
                                    <select class="form-control" id="districtsDropdown" name="districtsDropdown">
                                         <option value="0">Please select district</option>
                                    </select>
                              </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="BarangayDropdown">Barangay</label>
                                    <select class="form-control" id="BarangayDropdown" name="BarangayDropdown">
                                            <option value="0">Please select barangay</option>
                                    </select>
                                </div>
                            </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="password">Password <span class="text-danger"> *</span></label>
                                <input type="password" class="form-control" id="password" placeholder="Enter password" autoComplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="confirmpassword">Confirm Password </label>
                                <input type="password" class="form-control" id="confirmpassword" placeholder="Confirm password" autoComplete="off"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="card ">
                                <div class="card-header theme-color">
                                    <h3 class="card-title">Modules</h3>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label>Maintenance</label>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optMedicine">
                                                    <label for="optMedicine" class="custom-control-label">Medicine</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optPatient">
                                                    <label for="optPatient" class="custom-control-label">Patient</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optProgram">
                                                    <label for="optProgram" class="custom-control-label">Programs</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optPharmacist">
                                                    <label for="optPharmacist" class="custom-control-label">Pharmacist</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optSupplier">
                                                    <label for="optSupplier" class="custom-control-label">Supplier</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optLocation">
                                                    <label for="optLocation" class="custom-control-label">Location</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optUsers">
                                                    <label for="optUsers" class="custom-control-label">User Management</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <label>Transactions</label>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optProcurementPlan">
                                                    <label for="optProcurementPlan" class="custom-control-label">Procurement</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optRR">
                                                    <label for="optRR" class="custom-control-label">Receiving</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optAllocationProgram">
                                                    <label for="optAllocationProgram" class="custom-control-label">Program</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optAllocationDistrict">
                                                    <label for="optAllocationDistrict" class="custom-control-label">District</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optAllocationHealthCenter">
                                                    <label for="optAllocationHealthCenter" class="custom-control-label">Health Center</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optAllocationPatient">
                                                    <label for="optAllocationPatient" class="custom-control-label">Per Patient</label>
                                                </div>
                                                <div class="custom-control custom-checkbox">
                                                    <input class="custom-control-input" type="checkbox" id="optReports">
                                                    <label for="optReports" class="custom-control-label">Reports</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Cancel</i></button>
                    <a class="btn btn-success" id="saveUser" href="#"><i class="fa fa-save">&nbsp Save</i></a>
                </div>
            </div>
        </div>
    </div>


</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Masterfile/PPMP_User.js"></script>
</asp:Content>
