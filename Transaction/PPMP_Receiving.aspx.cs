using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Services;
using System;
using System.Web.Services;
using System.Web.UI;

namespace PPMPS.Transaction
{
    public partial class PPMP_Receiving : BasePage
    {
        private static ProcurementRecievingService _procurementRecievingService;
        private static string _UserId;
        protected void Page_Load(object sender, EventArgs e)
        {
            _procurementRecievingService = new ProcurementRecievingService();
            if (!Page.IsPostBack)
            {
                if (Session["UserName"].ToString() != null)
                {
                    _UserId = Session["UserName"].ToString();
                }
            }
        }
        [WebMethod]
        public static string GetProcurement()
        {
            var data = _procurementRecievingService.Get_ProcurementForRR();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static string GetRrDetails(string code)
        {
            var data = _procurementRecievingService.Get_RR_Details(code);
            return JsonConvert.SerializeObject(data);
        }
        [WebMethod]
        public static void AssignTSupplier(string code, string supplierCode)
        {
            _procurementRecievingService.AssignToSupplier(code, supplierCode);
        }
        [WebMethod]
        public static string GetSupplierList()
        {
            var data = _procurementRecievingService.GetSupplierList();
            return JsonConvert.SerializeObject(data);
        }

    }
}