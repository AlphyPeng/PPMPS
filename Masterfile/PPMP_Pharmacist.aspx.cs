using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_Pharmacist : BasePage
    {
        private static PharmacistService _pharmacistService;
        protected void Page_Load(object sender, EventArgs e)
        {
           _pharmacistService = new PharmacistService();
        }

        [WebMethod]
        public static string GetPharmacist()
        {
            var data = _pharmacistService.GetPharmacist();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AddOrEditPharmacist(PPMP_PharmacistModel Pharmacists)
        {
            _pharmacistService.AddOrEditPharmacist(Pharmacists);
        }

        [WebMethod]
        public static void Delete(int Id)
        {
            _pharmacistService.DeletePharmacist(Id);
        }

        #region Dropdownlist
        [WebMethod]
        public static string GetDistrictList()
        {
            var data = _pharmacistService.GetDistrictList();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static string GetBarangayList(int districtId)
        {
            var data = _pharmacistService.GetBarangayList(districtId);
            return JsonConvert.SerializeObject(data);
        }
        #endregion

    }
}