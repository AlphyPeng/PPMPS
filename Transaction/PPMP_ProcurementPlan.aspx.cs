using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Transaction
{
    public partial class PPMP_ProcurementPlan : BasePage
    {
        private static ProcurementPlanService _procurementPlanService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _procurementPlanService = new ProcurementPlanService();
        }

        #region Headers
        [WebMethod]
        public static string GetNextPPMPCode()
        {
            var code = _procurementPlanService.Generate_TransactionNo();

            return JsonConvert.SerializeObject(code);
        }

        [WebMethod]
        public static string GetPPMP_Codes()
        {
            var data = _procurementPlanService.Get_PPMP_CodeLists();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static string GetPPMP_Headers(string code)
        {
            var data = _procurementPlanService.Get_PPMP_Header(code);
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static string GetTotals(string code)
        {
            var data = _procurementPlanService.Get_Totals(code);
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AddorEditHeader(PPMP_ProcurementPlanModel model)
        {
            _procurementPlanService.AddOrEditHeader(model);
        }

        [WebMethod]
        public static void CancelHeader(string code)
        {
            _procurementPlanService.CancelHeader(code);
        }

        [WebMethod]
        public static void UpdateStatus(string code, decimal totalCost, decimal totalAmount, int qty)
        {
            _procurementPlanService.UpdateStatus(code, totalCost, totalAmount, qty);
        }
        #endregion

        #region Details
        [WebMethod]
        public static string GetDetails(string code)
        {
            var data = _procurementPlanService.GetDetails(code);
            return JsonConvert.SerializeObject(data);
        }
        [WebMethod]
        public static string GetMedicineList()
        {
            var data = _procurementPlanService.GetMedicineList();
            return JsonConvert.SerializeObject(data);
        }
        [WebMethod]
        public static void AddorEditDetails(PPMP_ProcurementPlanModel model)
        {
            _procurementPlanService.AddOrEditDetails(model);
        }
        [WebMethod]
        public static void DeleteDetails(string code, string lineNo)
        {
            _procurementPlanService.DeleteDetails(code, lineNo);
        }
        #endregion
    }
}