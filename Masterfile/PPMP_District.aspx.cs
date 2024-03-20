using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_District : BasePage
    {
        private static LocationService _locationService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _locationService = new LocationService();   
        }

        [WebMethod]
        public static string GetDistrict()
        {
            var data = _locationService.GetDistrict();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AddOrEditDistrict(PPMP_LocationModel locations)
        {
            _locationService.AddOrEditDistrict(locations);
        }

        [WebMethod]
        public static void Delete(int Id)
        {
            _locationService.DeleteDistrict(Id);
        }
    }
}