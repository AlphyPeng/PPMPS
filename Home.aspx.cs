using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS
{
    public partial class Home : System.Web.UI.Page
    {
        public static HomeService _homeService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _homeService = new HomeService();
        }


        [WebMethod]
        public static string GraphGeneration(PPMP_HomeModel homeModel)
        {
            var data = _homeService.GetList(homeModel);

            return JsonConvert.SerializeObject(data);

        }


        [WebMethod]
        public static string GetTotals(PPMP_HomeModel homeModel)
        {

            var data = _homeService.Get_Totals(homeModel);

            return JsonConvert.SerializeObject(data);
        }
    }
}