using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_PatientInfo : BasePage
    {
        private static PatientService _patientService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _patientService = new PatientService();
        }

        [WebMethod]
        public static void AddorEditPatient(PPMP_PatientModel patient)
        {
            _patientService.AddOrEdit(patient);
        }

        [WebMethod]
        public static string GetPatientList()
        {
            var data = _patientService.GetPatients();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void Delete(int Id)
        {
            _patientService.Delete(Id);
        }

        [WebMethod]
        public static string LoadDropdownList(string action)
        {
            var data = _patientService.GetDropdown(action);
            return JsonConvert.SerializeObject(data);
        }
    }
}