<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="PPMPS.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>PPMP</title>
    <asp:PlaceHolder ID="mainStyles" runat="server">
        <webopt:BundleReference ID="styles" runat="server" Path="~/bundles/styles"></webopt:BundleReference>
    </asp:PlaceHolder>
</head>
<body class="hold-transition login-page">
    <form runat="server">
        <div class="login-box">
            <div class="card card-outline card-success">
                <div class="card-header text-center" id="logo">
                    <img src="<%= ResolveUrl("~/Content/Images/QC_Health_Dept_Logo.png") %>" style="height:100px;"/>
                </div>
                <div class="card-body">
                    <div class="text-center">
                       <h2><b>PPMP</b></h2> 
                    </div>
                    <p class="login-box-msg">Sign in to start your session</p>
                    <div class="input-group mb-3">
                        <input type="text" runat="server" id="userName" class="form-control" placeholder="Username"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" runat="server" id="password" class="form-control" placeholder="Password" />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-8">
                        </div>
                        <div class="col-4">
                            <asp:Button ID="btnLoginId" runat="server" CssClass="btn btn-primary btn-block" Text="Sign In" OnClick="btnLogin" />
                        </div>
                    </div>
                    <p class="mb-1">
                        <%--<a href="<% Response.Write(ResolveUrl("~/ForgotPassword.aspx")); %>">I forgot my password</a>--%>
                    </p>
                </div>
            </div>
        </div>
    </form>
    <asp:PlaceHolder ID="mainScripts" runat="server">
        <%: Scripts.Render("~/bundles/adminlte") %>
    </asp:PlaceHolder>

</body>
</html>
