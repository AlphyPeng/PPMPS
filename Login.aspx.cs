using PPMPS.Common;
using PPMPS.Services;
using System;
using System.Linq;
using System.Web.UI;

namespace PPMPS
{
    public partial class Login : Page
    {
        private static UserService _userService;
        private PPMP_PasswordHelper _passwordHelper;
        protected void Page_Load(object sender, EventArgs e)
        {
            _userService = new UserService();
            _passwordHelper = new PPMP_PasswordHelper();
        }

        protected void btnLogin(object sender, EventArgs e)
        {
            var _user  = userName.Value;
            var _password  = password.Value;

            var users = _userService.GetUsersByUserName(_user);

            if(users.Any())
            {
                var checkPassword = _passwordHelper.DecodeFrom64(users[0].Password);
                if(checkPassword != _password) {
                    ShowAlert("error", "Invalid username or password");
                }
                else
                {
                    PPMP_Helpers.UserName = users[0].UserName;
                    Session["UserCode"] = Convert.ToString(users[0].UserName);
                    Session["UserName"] = Convert.ToString(users[0].UserName);
                    Session["RoleName"] = Convert.ToString(users[0].RoleName);
                    Response.Redirect("Home.aspx");
                }
            }
            else
            {
                ShowAlert("error", "Please input username and password");
            }
        }

        private void ShowAlert(string type, string message)
        {
            string script = "window.onload = function() { notification('"+ type + "', '"+ message + "', ''); };";
            ClientScript.RegisterStartupScript(this.GetType(), "notification", script, true);
        }
    }
}