using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_Barangay : BasePage
    {
        private static LocationService _locationService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _locationService = new LocationService();
        }

        [WebMethod]
        public static string GetBarangay()
        {
            var data = _locationService.GetBarangay();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static string GetDistrictList()
        {
            var data = _locationService.GetDistrict();
            return JsonConvert.SerializeObject(data);
           
        }

        [WebMethod]
        public static void AddOrEditBarangay(PPMP_LocationModel locations)
        {
            _locationService.AddOrEditBarangay(locations);
        }

        [WebMethod]
        public static void Delete(int Id)
        {
            _locationService.DeleteBarangay(Id);
        }

    }
}