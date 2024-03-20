<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ForgotPassword.aspx.cs" Inherits="PPMPS.ForgotPassword" %>

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
                <div class="card-header text-center">
                    <a href="#" class="h1"><b>PPMP</b></a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

                    <div class="input-group mb-3">
                        <input type="email" class="form-control" placeholder="Email" />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary btn-block">Request new password</button>
                        </div>
                    </div>
                    <p class="mt-3 mb-1">
                        <a href="<% Response.Write(ResolveUrl("~/Login.aspx")); %>">Login</a>
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
