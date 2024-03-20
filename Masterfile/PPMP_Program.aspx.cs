using Newtonsoft.Json;
using PPMPS.Common;
using PPMPS.Models;
using PPMPS.Services;
using System;
using System.Web.Services;

namespace PPMPS.Masterfile
{
    public partial class PPMP_Program : BasePage
    {
        private static ProgramService _programService;
        protected void Page_Load(object sender, EventArgs e)
        {
            _programService = new ProgramService();
        }

        [WebMethod]
        public static string GetPrograms()
        {
            var data = _programService.GetPrograms();
            return JsonConvert.SerializeObject(data);
        }

        [WebMethod]
        public static void AddOrEditProgram(PPMP_ProgramModel programs)
        {
            _programService.AddOrEdit(programs);
        }

        [WebMethod]
        public static void Delete(int Id)
        {
            _programService.Delete(Id);
        }
    }
}