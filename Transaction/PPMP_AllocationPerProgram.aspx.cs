using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Transaction
{
    public partial class PPMP_AllocationPerProgram : BasePage
    {
        private static AllocationPerProgramService _AllocationPerProgram;

        protected void Page_Load(object sender, EventArgs e)
        {
            _AllocationPerProgram = new AllocationPerProgramService();
        }


        [WebMethod]
        public static string GetPPMP_Codes(string paramAction, string paramOption)
        {
            var code = _AllocationPerProgram.GetPPMP_Codes(paramAction, paramOption);

            return JsonConvert.SerializeObject(code);
        }

        [WebMethod]
        public static string GetPPMP_Headers(string ppmpCodes)
        {
            var data = _AllocationPerProgram.GetPPMP_ProgramAllocation_Headers(ppmpCodes);
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AllocateorApproveProcurement(PPMP_AllocationPerProgramModel allocationPerProgram)
        {
            _AllocationPerProgram.AllocateorApprove(allocationPerProgram);
        }


        [WebMethod]
        public static string GetTotals_AllocationPerProgram(string code)
        {
            var data = _AllocationPerProgram.Get_Totals(code);
            return JsonConvert.SerializeObject(data);
        }
    }
}