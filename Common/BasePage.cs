using System;
using System.Web;
using System.Web.UI;

namespace PPMPS.Common
{
    public class BasePage: Page
    {
        protected override void OnPreRender(EventArgs e)
        {
            base.OnPreRender(e);
            AutoRedirect();
            //CheckIfValidUrl();
        }

        public void AutoRedirect()
        {
            int milliSecondsTimeOut = (this.Session.Timeout * 60000);
            var script = @"
                <script type='text/javascript'>
                    intervalSet = window.setInterval('Redirect()'," + milliSecondsTimeOut.ToString() + @");
                    function Redirect(){
                        window.location.href='/Login.aspx';
                    }
                    </script>
            ";
            ClientScript.RegisterClientScriptBlock(this.GetType(), "Redirect", script);
        }

        public void CheckIfValidUrl()
        {
            string referer = HttpContext.Current.Request.ServerVariables["HTTP_REFERER"];
            if (string.IsNullOrEmpty(referer))
            {
                HttpContext.Current.Session["UserName"] = null;
                HttpContext.Current.Session["Roles"] = null;
                HttpContext.Current.Response.Redirect("~/Login.aspx");
            }
        }
    }
}