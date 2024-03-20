using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace PPMPS.Transaction
{
    public partial class PPMP_AllocationPerHealthCenter : BasePage
    {
        private static AllocationPerHealthCenterService _perHeathCenterService;
       
        protected void Page_Load(object sender, EventArgs e)
        {
            _perHeathCenterService = new AllocationPerHealthCenterService();
             
        }

        [WebMethod]
        public static string GetPPMP_Codes(string paramAction, string paramOption)
        {
            string UserName = HttpContext.Current.Session["UserName"] as string;

            var code = _perHeathCenterService.PPMP_Codes(paramAction, paramOption, UserName);

            return JsonConvert.SerializeObject(code);
        }


        [WebMethod]
        public static string GetPPMP_Headers(string ppmpCodes)
        {
            var data = _perHeathCenterService.GetHealthCenterAllocationHeaders(ppmpCodes);
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AllocateHealthCenter(string PpmpCode)
        {
            _perHeathCenterService.HealthCenterApprove(PpmpCode);
        }
    }
}
