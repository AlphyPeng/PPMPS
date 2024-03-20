 <%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="PPMP_Pharmacist.aspx.cs" Inherits="PPMPS.Masterfile.PPMP_Pharmacist" %>
<asp:Content ID="Styles" ContentPlaceHolderID="globalStyles" runat="server">
</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0 font-weight-bold">Pharmacist Management</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#" class="font-italic">Maintenance / Pharmacist</a></li>
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
                            <h3 class="card-title">List of Pharmacists</h3>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <a class="btn btn-primary float-right mb-4" id="CreateProgram" href="#"><i class="fa fa-plus">&nbsp Add Pharmacist</i></a>
                                </div>
                                <div class="col-12 table-responsive">
                                    <table class="table table-striped table-responsive-md" id="PharmacistList">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>District Name</th>
                                                <th>Barangay Name</th>
                                                <th>Contact No</th>
                                                <th>Email</th>
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

    <div class="modal fade" id="programModal" data-backdrop="static" data-keyword="false" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header theme-color">
                    <h5 class="modal-title" id="ModalTitle">Pharmacist Information</h5>
                    <button type="button" class="close" id="closeProgramModal" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label>Pharmacist's Name <span class="text-danger">*</span></label>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input class="form-control" id="FirstName" type="text" placeholder="Last Name" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input class="form-control" id="MiddleName" type="text" placeholder="First Name" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <input class="form-control" id="LastName" type="text" placeholder="Middle Name" autocomplete="off" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label for="districtsDropdown">District <span class="text-danger">*</span></label>
                                    <select class="form-control" id="districtsDropdown" name="districtsDropdown">
                                    </select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="BarangayDropdown">Barangay <span class="text-danger">*</span></label>
                                    <select class="form-control" id="BarangayDropdown" name="BarangayDropdown">
                                    </select>
                                </div>

                                <div class="form-group col-md-4">
                                    <label for="ContactNo">Contact No <span class="text-danger">*</span></label>
                                    <input type="number" class="form-control" id="ContactNo" placeholder="Enter Contact No"  autocomplete="off"/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="EmailAddress">Email Address</label>
                                    <input type="text" class="form-control" id="EmailAddress" placeholder="Enter Email Address"  autocomplete="off"/>
                                </div>
                                <div class="col-md-12">
                                    <label>Address</label>
                                    <div class="form-group">
                                        <textarea class="form-control text-break" id="txtAddress" rows="3" placeholder="Address" autocomplete="off"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-default" data-dismiss="modal"><i class="fa fa-trash">&nbsp Cancel</i></button>
                     <a class="btn btn-success" id="savePharmacist" href="#"><i class="fa fa-save">&nbsp Save</i></a>
                </div>
            </div>
        </div>
    </div>

</asp:Content>

<asp:Content ID="Scripts" ContentPlaceHolderID="globalScripts" runat="server">
    <script src="../Scripts/Masterfile/PPMP_Pharmacist.js"></script>
</asp:Content>

