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
    public partial class PPMP_AllocationPerDistrict : BasePage
    {

        public static AllocationPerDistrictService _allocPerDistrict;

        protected void Page_Load(object sender, EventArgs e)
        {
            _allocPerDistrict = new AllocationPerDistrictService();
        }

        [WebMethod]
        public static string GetPPMP_Codes(string paramAction, string paramOption)
        {
            var code = _allocPerDistrict.PPMP_Codes(paramAction, paramOption);

            return JsonConvert.SerializeObject(code);
        }

        [WebMethod]
        public static string GetPPMP_Headers(string ppmpCodes)
        {
            var data = _allocPerDistrict.GetPPMP_DistrictAllocation_Headers(ppmpCodes);
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AllocateorApproveDistrict(PPMP_AllocationPerDistrictModel allocationPerDistrict)
        {
            _allocPerDistrict.AllocateorApprove(allocationPerDistrict);
        }

    }
}