using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web;
using System.Web.Services;

namespace PPMPS.Transaction
{
    public partial class PPMP_AllocationPerPatient : BasePage
    {
        public static AllocationPerPatientsService _allocationPerPatientsService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _allocationPerPatientsService = new AllocationPerPatientsService();
        }

        [WebMethod]
        public static string GetNextTransactionCode()
        {
            var code = _allocationPerPatientsService.Generate_TransactionNo();
            return JsonConvert.SerializeObject(code);
        }

        [WebMethod]
        public static string GetPatientsList()
        {
            string UserName = HttpContext.Current.Session["UserName"] as string;

            var Patients = _allocationPerPatientsService.GetPatients(UserName);
            return JsonConvert.SerializeObject(Patients);
        }
        [WebMethod]
        public static string GetPatientByTransactionCode(string transactionCode)
        {
            var Patients = _allocationPerPatientsService.GetPatientByTransactionCode(transactionCode);
            return JsonConvert.SerializeObject(Patients);
        }

        [WebMethod]
        public static void AddOrEditPatientHeader(PPMP_AllocationPerPatientModel patients)
        {
            _allocationPerPatientsService.AddOrEditPatientHeader(patients);
        }

        [WebMethod]
        public static string GetTransactionCodes(string options)
        {
            string UserName = HttpContext.Current.Session["UserName"] as string;

            var code = _allocationPerPatientsService.GetTransactionCodes(options, UserName);
            return JsonConvert.SerializeObject(code);
        }

        [WebMethod]
        public static string GetMedicinePerLocation(int districtId, int brgyId)
        {
            var data = _allocationPerPatientsService.GetMedicinePerLocation(districtId, brgyId);
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AddOrEditDetails(PPMP_AllocationPerPatientModel patients)
        {
            _allocationPerPatientsService.AddOrEditDetails(patients);
        }

        [WebMethod]
        public static string GetMedicineDetails(string transactionCode)
        {
            var data = _allocationPerPatientsService.GetMedicineDetails(transactionCode);
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void DeleteItem(int Id)
        {
            _allocationPerPatientsService.DeleteItem(Id);
        }
        [WebMethod]
        public static void PostTransaction(string transactionCode)
        {
            _allocationPerPatientsService.PostTransaction(transactionCode);
        }

        [WebMethod]
        public static void CancelTransaction(string transactionCode)

        {
            _allocationPerPatientsService.CancelTransaction(transactionCode);
        }

        [WebMethod]
        public static string GetMedicineStocks(string code)
        {
            var data = _allocationPerPatientsService.CheckMedicineStocks(code);
            return JsonConvert.SerializeObject(data);
        }
    }
}